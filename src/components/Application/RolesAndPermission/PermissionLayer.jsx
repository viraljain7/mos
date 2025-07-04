import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import { ToastContainer } from "react-toastify";
import {  Search } from "lucide-react";
import PermissionShimmerUi from "./Shimmer/PermissionShimmerUi";
import Pagination from "../AccStmt/Modal/Pagination";
import AddPermissionModal from "./Modal/AddPermissionModal";


const PermissionLayer = () => {
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Introduce loading state

  const API = `${import.meta.env.VITE_APP_API_KEY}/master/permission`;

  const token = sessionStorage.getItem("token");

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



  const fetchPermissionData = useCallback(async () => {
    setIsLoading(true); // Set loading to true before fetching data
    const formData = new FormData();
    formData.append("type", "all"); // Append form data key-value pairs

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
      } else {
        console.error("Unexpected response:", data);
      }
    } catch (error) {
      console.error("Error while fetching scheme data:", error.message);
    } finally {
      setIsLoading(false); // Set loading to false after data is fetched
    }
  }, [API, token]); // Dependencies: API

  useEffect(() => {
    fetchPermissionData();
  }, [fetchPermissionData]);

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
            <AddPermissionModal/>

          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive scroll-sm">
            <table className="table bordered-table sm-table mb-0">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Slug</th>
                  <th scope="col">Type</th>
                </tr>
              </thead>
              {/* ?dynamic Data */}
              <tbody>
                {isLoading ? (
                  <PermissionShimmerUi />
                ) : currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No data found
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

                        <td>{data.slug}</td>
                      <td>{data.type}</td>


                    
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
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

export default PermissionLayer;
