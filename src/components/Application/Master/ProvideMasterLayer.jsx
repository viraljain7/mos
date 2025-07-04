import React, { useCallback, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast,  } from "react-toastify";
import ShimmerUI from "./Shimmer/ProvideMasterShimmerUI";
import {  Eye, Search } from "lucide-react";
import AddProviderModal from "./Modal/AddProviderModal";
import Pagination from "../AccStmt/Modal/Pagination";

const ProvideMasterLayer = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Select Status");
  const token = sessionStorage.getItem("token");
  const [APIS, setAPIS] = useState([]);

  const API = `${import.meta.env.VITE_APP_API_KEY}/master/provider`;

  const fetchAPISOptions = useCallback(() => {
    const formData = new FormData();
    formData.append("type", "apis");

    fetch(`${API}`, {
      // Use the correct URL for the update endpoint
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setAPIS(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        // alert("Something went wrong!");
      });
  }, [API, token]);

  // Filter users based on search and status
  const filteredUsers = user.filter((user) => {
    const matchesSearch =
      searchTerm === "" ||
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.type?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch ;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);



  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };



  const handleSwitchChange = async (id) => {
    const formData = new FormData();
    formData.append("type", "status");
    formData.append("provider_id", id); // Append updated name here

    try {
      const response = await fetch(`${API}`, {
        // Use the correct URL for the update endpoint
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        // Handle HTTP errors
        console.error(`HTTP error! status: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.statuscode === "TXN") {
        toast.success(data.message);

        // Re-fetch data to reflect the changes
        fetchSchemeData();
      } else {
        toast.error("Error updating the user.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Something went wrong while updating!");
    }
  };

  const fetchSchemeData = useCallback(async () => {
    const formData = new FormData();
    formData.append("type", "list"); // Append form data key-value pairs

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // Pass the FormData directly as the body
      });

      if (!response.ok) {
        // Handle non-2xx responses
        console.error(`HTTP error! status: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.statuscode === "TXN") {
        setUser(data.data);
        setLoading(false);
      } else {
        console.error("Unexpected response:", data);
      }
    } catch (error) {
      console.error("Error while fetching scheme data:", error.message);
      setLoading(false);
    }
  }, [API, token]); // Dependencies: API

  useEffect(() => {
    fetchAPISOptions();
  }, [fetchAPISOptions]);

  useEffect(() => {
    fetchSchemeData();
  }, [fetchSchemeData]);

  // Find API name by ID
  const getApiNameById = (apiId) => {
    const api = APIS.find((api) => api.id === apiId);
    return api ? api.name : "Select API";
  };

  const handleApiChange = async (providerId, newApiId) => {
    const formData = new FormData();
    formData.append("type", "changeapi");
    formData.append("provider_id", providerId);
    formData.append("api_id", newApiId);

    try {
      const response = await fetch(`${API}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.statuscode === "TXN") {
          toast.success(data.message || "API updated successfully");
          fetchSchemeData(); // Refresh the list
        } else {
          toast.error(data.message || "Failed to update API");
        }
      } else {
        toast.error(data.message || "Failed to update API");
      }
    } catch (error) {
      console.error("Error updating API:", error);
      toast.error("Error updating API");
    }
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <div className="card">
        {/* filter,search bar */}
        <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div className="d-flex flex-wrap align-items-center gap-3">
            <div className="d-flex align-items-center gap-2">
              <span>Show</span>
              <select
                className="form-select form-select-sm w-auto"
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(e.target.value)}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <div className="icon-field">
              <input
                type="text"
                name="#0"
                className="form-control form-control-sm w-auto"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
              />
              <span className="icon">
                <Search size={18} />
              </span>
            </div>
          </div>
          <div className="d-flex flex-wrap align-items-center gap-3">
          

            <AddProviderModal updateList={fetchSchemeData} />
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive scroll-sm">
            <table className="table bordered-table sm-table mb-0">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Status</th>
                  <th scope="col">API</th>
                  <th scope="col ">Action</th>
                </tr>
              </thead>
              {/* ?dynamic Data */}
              <tbody>
                {loading ? (
                  <ShimmerUI />
                ) : currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      <div>No data found</div>
                    </td>
                  </tr>
                ) : (
                  currentItems.map((data) => (
                    <tr key={data.id}>
                      <td>{data.id}</td>

                      <td>
                        <Link to="#" className="text-primary-600 fw-semibold">
                          {data.name}
                        </Link>
                      </td>

                      <td>{data.type}</td>

                      <td>
                        <div className="form-switch switch-primary d-flex align-items-center gap-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="yes"
                            checked={data.status === "1"}
                            onChange={() => handleSwitchChange(data.id)}
                          />
                        </div>
                      </td>

                      <td>
                        <select
                          className="form-select form-select-sm w-auto"
                          value={data.api_id || ""}
                          onChange={(e) =>
                            handleApiChange(data.id, e.target.value)
                          }
                        >
                          <option value="">
                            {getApiNameById(data.api_id)}
                          </option>
                          {APIS.map((api) => (
                            <option value={api.id} key={api.id}>
                              {api.name}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className=" d-flex gap-2 ">
                        {/*EditModal */}
                        {/* <EditModal id={data.id} /> */}
                        <NavLink
                          to="action-view-profile"
                          className="w-32-px h-32-px me-8  bg-success-focus text-success-600 bg-hover-success-200 rounded-circle d-inline-flex align-items-center justify-content-center"
    
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                        >
                          <Eye size={18} />
                        </NavLink>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          {/* <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mt-24">
            <span>
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, filteredUsers.length)} of{" "}
              {filteredUsers.length} entries
            </span>
            <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
              <li className="page-item">
                <Link
                  className="page-link text-secondary-light fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px me-8 w-32-px bg-base"
                  to="#"
                  onClick={() => handlePageChange(currentPage - 1)}
                  style={{
                    pointerEvents: currentPage === 1 ? "none" : "auto",
                    opacity: currentPage === 1 ? 0.5 : 1,
                  }}
                >
                  <ChevronsLeft size={18} />
                </Link>
              </li>
              {getPageNumbers().map((number) => (
                <li className="page-item" key={number}>
                  <Link
                    className={`page-link fw - medium radius - 4 border - 0 px - 10 py - 10 d - flex align - items - center justify - content - center h - 32 - px me - 8 w - 32 - px ${
                      currentPage === number
                        ? "bg-primary-600 text-white"
                        : "bg-primary-50 text-secondary-light"
                    } `}
                    to="#"
                    onClick={() => handlePageChange(number)}
                  >
                    {number}
                  </Link>
                </li>
              ))}
              <li className="page-item">
                <Link
                  className="page-link text-secondary-light fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px me-8 w-32-px bg-base"
                  to="#"
                  onClick={() => handlePageChange(currentPage + 1)}
                  style={{
                    pointerEvents: currentPage === totalPages ? "none" : "auto",
                    opacity: currentPage === totalPages ? 0.5 : 1,
                  }}
                >
                  <ChevronsRight size={20} />
                </Link>
              </li>
            </ul>
          </div> */}

          <Pagination
            currentPage={currentPage}
            totalItems={filteredUsers.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default ProvideMasterLayer;
