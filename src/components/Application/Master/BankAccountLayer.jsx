import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, NavLink } from "react-router-dom";
import { toast,  } from "react-toastify";
import AddBankAccModal from "./Modal/AddBankAccModal";
import ShimmerUI from "./Shimmer/BankAccShimmerUI";
import { ChevronsLeft, ChevronsRight, Search, Trash2 } from "lucide-react";
import Pagination from "../AccStmt/Modal/Pagination";

// BankAccountLayer

const BankAccountLayer = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const token = sessionStorage.getItem("token");

  const API = `${import.meta.env.VITE_APP_API_KEY}/master/bank`;

  // Filter users based on search and status
  const filteredUsers = user.filter((user) => {
    const matchesSearch =
      searchTerm === "" ||
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.account?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.ifsc?.toLowerCase().includes(searchTerm.toLowerCase()) 
  
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
    formData.append("bank_id", id); // Append updated name here

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
    fetchSchemeData();
  }, [fetchSchemeData]);

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
                  {[10, 25, 50, 100].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
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
        

            <AddBankAccModal updateList={fetchSchemeData} />
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive scroll-sm">
            <table className="table bordered-table sm-table mb-0">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Account</th>
                  <th scope="col">IFSC</th>
                  <th scope="col">Status</th>
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
                        <Link to="#" className="text-primary-600  fw-semibold">
                          {data.name}
                        </Link>
                      </td>

                      <td>{data.account}</td>

                      <td>{data.ifsc}</td>

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

                      <td className=" d-flex gap-2 ">
                        {/*EditModal */}
                        {/* <EditModal id={data.id} /> */}
                        <NavLink
                          to="action-view-profile"
                          className="w-32-px h-32-px me-8 bg-danger-focus text-danger-main rounded-circle d-inline-flex align-items-center justify-content-center"
    
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                        >
                          <Trash2 size={18} />
                        </NavLink>
                      </td>
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

export default BankAccountLayer;
