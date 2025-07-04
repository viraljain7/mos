import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

// import { ToastContainer } from "react-toastify";
import DeleteSliderModal from "./Modal/DeleteSliderModal";
import AddSlider from "./Modal/AddSliderModal";
import ShimmerUI from "./Shimmer/SliderMasterShimmerUI";
import { ChevronsLeft, ChevronsRight, Search } from "lucide-react";

// SliderMasterLayer

const SliderMasterLayer = () => {
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Select Status");
  const [isLoading, setIsLoading] = useState(true); // Introduce loading state

  const API = `${import.meta.env.VITE_APP_API_KEY}/master/slider`;
  const API_BASE_URL=  import.meta.env.VITE_APP_IMAGE_KEY ;

  const token = sessionStorage.getItem("token");

  // Filter users based on search and status
  const filteredUsers = user.filter((user) => {
    const matchesSearch =
      searchTerm === "" ||
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mobile?.includes(searchTerm);
    const matchesStatus =
      statusFilter === "Select Status" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Generate page numbers
  const getPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

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

  // Handle status filter
  const handleStatusFilter = (value) => {
    setStatusFilter(value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const fetchSchemeData = useCallback(async () => {
    setIsLoading(true); // Set loading to true before fetching data
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
            {/* <select
                            className="form-select form-select-sm w-auto"
                            value={statusFilter}
                            onChange={(e) => handleStatusFilter(e.target.value)}
                        >
                            <option value="Select Status" disabled>
                                Select Status
                            </option>
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                        </select> */}

            <AddSlider updateList={fetchSchemeData} />
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
                  <th scope="col">Image</th>
                  <th scope="col ">Action</th>
                </tr>
              </thead>
              {/* ?dynamic Data */}
              <tbody>
                {isLoading ? (
                  <ShimmerUI />
                ) : currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
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

                      <td>{data.type}</td>

                      <td>
                        {" "}
                        <img
                          src={`${API_BASE_URL}${data.path}`}
                          alt={data.path}
                          className="w-60-px h-60-px rounded-circle flex-shrink-0 me-12 overflow-hidden"
                        />
                      </td>

                      <td>
                        <DeleteSliderModal id={data.id} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mt-24">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default SliderMasterLayer;
