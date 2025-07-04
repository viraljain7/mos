import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast,  } from "react-toastify";

/**
 * UserPermissionLayer Component
 * 
 * This component displays and manages user permissions in a tabular format.
 * It fetches permission data from an API, groups them by type, and allows
 * bulk selection/deselection of permissions.
 */
const UserPermissionLayer = () => {
  // State for storing permission data
  const [permissions, setPermissions] = useState([]);
  // Loading state for API calls
  const [isLoading, setIsLoading] = useState(true);
  // Get user ID from Redux store
  const userId = useSelector((state) => state.MemberUserId.value)||  localStorage.getItem('userId');
  


  // API endpoint and token from local storage
  const API = `${import.meta.env.VITE_APP_API_KEY}/master/permission`;
  const token = sessionStorage.getItem("token");

  /**
   * Group permissions by their type (section) for better organization
   * This transforms the flat permissions array into an object where
   * each key is a permission type and value is an array of permissions
   */
  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.type]) {
      acc[permission.type] = [];
    }
    acc[permission.type].push(permission);
    return acc;
  }, {});

  /**
   * Filter and transform grouped permissions into an array of sections
   * Each section has a type and its associated permission items
   * We filter out any empty sections
   */
  const filteredGroups = Object.entries(groupedPermissions)
    .map(([type, items]) => ({
      type,
      items
    }))
    .filter((section) => section.items.length > 0);

  // Alias for filtered groups for clearer usage in the component
  const currentGroups = filteredGroups;

  /**
   * Fetch permission data from the API
   * This function is memoized with useCallback to prevent unnecessary recreations
   */
  const fetchPermissionData = useCallback(async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("type", "get");
    formData.append("user_id", userId);

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Check if the API response is successful
      if (data.statuscode === "TXN") {
        setPermissions(data.data);
      } else {
        console.error("Unexpected response:", data);
      }
    } catch (error) {
      console.error("Error while fetching permission data:", error.message);
    } finally {
      setIsLoading(false);
    }
  }, [API, token, userId]);

  // Fetch permissions when component mounts
  useEffect(() => {
    fetchPermissionData();
  }, [fetchPermissionData]);

  const SavePermissionHandler = async () => {
    setIsLoading(true);
    
    try {
      // Prepare the permissions data for the API
      const permissionsToUpdate = permissions.map(permission => ({
        permission_id: permission.id,
        is_allowed: permission.is_allowed || false
      }));
  
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "update",
          user_id: userId,
          permissions: permissionsToUpdate
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Check if the API response is successful
      if (data.statuscode === "TXN") {
        // Show success message (you might want to use toast here)
        toast.success(data.message||"Permissions updated successfully");
        console.log("Permissions updated successfully:", data);



        // Optionally refresh the permissions data
        // await fetchPermissionData();
      } else {
        toast.error(data.message||"Unexpected response:",data);


        // Show error message
        throw new Error(data.message || "Failed to update permissions");
      }
    } catch (error) {
      console.error("Error while saving permissions:", error.message);

      // Show error message to user (you might want to use toast here)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    
    {/* <ToastContainer autoClose={5000} /> */}
      {/* Main permission table card */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table bordered-table sm-table mb-0">
              <thead>
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col" className="d-flex justify-content-between">
                    <span>Permissions</span>

                    <div className="d-flex align-items-center gap-16">
                    {/* "Select All" toggle switch */}
                    <span className="inline-block align-items-center gap-16 bg-primary-50 py-8 px-16 rounded justify-content-end">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`perm-All-Select`}
                        role="switch"
                        // Checked if all permissions in all groups are allowed
                        checked={currentGroups.every((group) =>
                          group.items.every((permission) => permission.is_allowed),
                        )}
                        // Toggle all permissions on/off
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          currentGroups.forEach((group) => {
                            group.items.forEach((permission) => {
                              permission.is_allowed = isChecked;
                            });
                          });
                          setPermissions([...permissions]);
                        }}
                      />{" "}
                      <label
                        htmlFor={`perm-All-Select`}
                        className="mb-0 cursor-pointer"
                      >
                        Select All
                      </label>
                    </span>
                    <button className="btn btn-primary py-6 px-20 rounded"
                    onClick={
                      SavePermissionHandler
                    }>
                      Save
                    </button>

                    </div>

                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Loading state */}
                {isLoading ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </td>
                  </tr>
                ) : 
                /* Empty state */
                currentGroups.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4">
                      No permissions found
                    </td>
                  </tr>
                ) : 
                /* Render permission groups */
                currentGroups.map((group) => (
                  <tr key={group.type}>
                    {/* Group header with toggle for entire category */}
                    <td className="">
                      <span className="d-flex align-items-center gap-16 bg-primary-50 p-8 rounded justify-content-center fw-semibold">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id={`perm-${group.type}`}
                          // Checked if all permissions in this group are allowed
                          checked={group.items.every(
                            (permission) => permission.is_allowed,
                          )}
                          // Toggle all permissions in this group
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            group.items.forEach((permission) => {
                              permission.is_allowed = isChecked;
                            });
                            setPermissions([...permissions]);
                          }}
                        />{" "}
                        <label htmlFor={`perm-${group.type}`}>
                          {group.type}
                        </label>
                      </span>
                    </td>
                    
                    {/* Individual permissions in this group */}
                    <td>
                      <div className="d-flex flex-wrap gap-16" style={{ maxWidth: "850px" }}>
                        {group.items.map((permission) => (
                          <span
                            key={permission.id}
                            className="d-flex align-items-center gap-8 bg-primary-50 p-8 rounded justify-content-start"
                            style={{ flex: "0 0 calc(32%)" }}
                          >
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`perm-${permission.id}`}
                              role="switch"
                              checked={permission.is_allowed || false}
                              // Toggle individual permission
                              onChange={(e) => {
                                const isChecked = e.target.checked;
                                permission.is_allowed = isChecked;
                                setPermissions([...permissions]);
                              }}
                            />
                            <label
                              htmlFor={`perm-${permission.id}`}
                              className="mb-0 cursor-pointer"
                            >
                              {permission.name}
                            </label>
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPermissionLayer;