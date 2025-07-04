import React, { useEffect, useState } from "react";
import { toast,  } from "react-toastify";

// Helper function to inspect FormData
const inspectFormData = (formData) => {
  const entries = {};
  for (const [key, value] of formData.entries()) {
    entries[key] = value;
  }
  return entries;
};

export default function DefaultPermissionLayer() {
    const [permissionList, setPermissionList] = useState([]);
    const [roleList, setRoleList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const token = sessionStorage.getItem("token");
    const API = `${import.meta.env.VITE_APP_API_KEY}`;

    const [formData, setFormData] = useState({
        role: "",
        permission: "",
    });

    const handleInputChange = (e) => {  
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const fetchInitialData = async () => {
        setIsLoading(true);
        try {
            await Promise.all([fetchPermissionData(), fetchRolesData()]);
        } catch (error) {
            toast.error("Failed to load initial data");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPermissionData = async () => {
        try {
            const formPayload = new FormData();
            formPayload.append("type", "all");

            const response = await fetch(`${API}/master/permission`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formPayload,
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.json();
            if (responseData.statuscode === "ERR") {
                throw new Error(responseData.message);
            }
            setPermissionList(responseData.data);
        } catch (error) {
            console.error("Permission fetch error:", error);
            throw error;
        }
    };

    const fetchRolesData = async () => {
        try {
            const formPayload = new FormData();
            formPayload.append("type", "roles");

            const response = await fetch(`${API}/member/transaction`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formPayload,
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const responseData = await response.json();
            if (responseData.statuscode === "ERR") {
                throw new Error(responseData.message);
            }
            setRoleList(responseData.data);
        } catch (error) {
            console.error("Roles fetch error:", error);
            throw error;
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, []);


    const [roleData, setRoleData] = useState({
        role: "",
    });

    const permissionHandler = async () => {
        if (!formData.role || !formData.permission) {
            toast.error("Please select both role and permission");
            return;
        }

        setIsSubmitting(true);
        try {
            const formPayload = new FormData();
            formPayload.append("type", "adddefault");
            formPayload.append("role_id", formData.role);
            formPayload.append("permission_id", formData.permission);


            const response = await fetch(`${API}/master/permission`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formPayload,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseData = await response.json();

            if (responseData.statuscode === "ERR") {
                throw new Error(responseData.message);
            }

            toast.success(responseData.message || "Permission added successfully");
            setFormData({ role: "", permission: "" });
        } catch (error) {
            console.error("Submission error:", error);
            toast.error(error.message || "Failed to add permission");
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleRolePermissionChange = async (e) => { 
        const { id, value } = e.target;
        const selectedRole = value; // This is the new value

        // Update state immediately
        setRoleData(prev => ({ ...prev, [id]: selectedRole }));

            try {
                console.log("is",selectedRole);
                const formPayload = new FormData();
                formPayload.append("type", "roleswithpermission");
                formPayload.append("role_id", selectedRole);
                // console.log("formPayload", inspectFormData(formPayload));
                const response = await fetch(`${API}/master/permission`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formPayload,
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const responseData = await response.json();
                if (responseData.statuscode === "ERR") {
                    throw new Error(responseData.message);
                }else{
                    setRolePermissionList(responseData.data);
                }
            } catch (error) {
                console.error("Role permission fetch error:", error);
            }
      }


      const [rolePermissionList, setRolePermissionList] = useState([]);

    return (
        <>
            {/* <ToastContainer /> */}

        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title mb-0">Default Permission</h6>
                        </div>
                        <div className="card-body">
                            <div className="row gy-3">
                                <div className="col-12">
                                    <label
                                        htmlFor="role"
                                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                                    >
                                        Role
                                        <span className="text-danger-600">*</span>
                                    </label>
                                    <select
                                        className="form-control radius-8 form-select"
                                        id="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        disabled={isLoading || isSubmitting}
                                    >
                                        <option value="">Select Role</option>
                                        {roleList.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-12">
                                    <label
                                        htmlFor="permission"
                                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                                    >
                                        Permission
                                        <span className="text-danger-600">*</span>
                                    </label>
                                    <select
                                        className="form-control radius-8 form-select"
                                        id="permission"
                                        value={formData.permission}
                                        onChange={handleInputChange}
                                        disabled={isLoading || isSubmitting}
                                    >
                                        <option value="">Select Permission</option>
                                        {permissionList.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="d-flex align-items-center justify-content-center gap-3 mt-36 mt-24">
                                    <button
                                        type="button"
                                        className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                                        disabled={isSubmitting}
                                        onClick={() => setFormData({ role: "", permission: "" })}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                                        onClick={permissionHandler}
                                        disabled={isLoading || isSubmitting}
                                    >
                                        {isSubmitting ? "Processing..." : "Submit"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div className="card mt-24">
                        <div className="card-header">
                            <h6 className="card-title mb-0">Role Permission</h6>
                        </div>
                        <div className="card-body">
                            <div className="row gy-3">
                                <div className="col-12">
                                    <label
                                        htmlFor="role"
                                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                                    >
                                        Role
                                        <span className="text-danger-600">*</span>
                                    </label>
                                    <select
                                        className="form-control radius-8 form-select"
                                        id="role"
                                        value={roleData.role}
                                        onChange={handleRolePermissionChange}
                                        disabled={isLoading || isSubmitting}
                                    >
                                        <option value="">Select Role</option>
                                        {roleList.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                

                                
                            </div>
                        </div>
                    </div>
                    {/*  */}
                </div>
                {/*  */}
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h6 className="card-title mb-0">Role Permission List</h6>
                        </div>
                        <div className="card-body">
                            <div className="row ">
                                {rolePermissionList.map((item) => (
                                    <div key={item} className="col-6 ">
                                        <p>{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>


        

        


        </>

    );
}