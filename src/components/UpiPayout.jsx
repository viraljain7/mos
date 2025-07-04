import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { ChevronsLeft, ChevronsRight, Search } from "lucide-react";

//UpiPayoutLayer
const UpiPayoutLayer = () => {
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Select Status");

  const API = `${import.meta.env.VITE_APP_API_KEY}/member/retailer`;

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        if (data.statuscode === "TXN") {
          setUser(data.data);
        }
      });
  }, [API]);

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

  return (
    <div className="card">
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
          <select
            className="form-select form-select-sm w-auto"
            value={statusFilter}
            onChange={(e) => handleStatusFilter(e.target.value)}
          >
            <option value="Select Status" disabled>
              Select Status
            </option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>

          <button
            type="button"
            className="btn btn-primary text-sm btn-sm "
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <Icon
              icon="fa6-regular:square-plus"
              className="icon text-lg line-height-1 mx-4"
            />
            Add Bank
          </button>
        </div>
      </div>
      {/* toggle Hide */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog modal-dialog-centered">
          <div className="modal-content radius-16 bg-base">
            <div className="row gy-4">
              <div className="col-lg-12">
                <div className="card h-100">
                  <div className="card-body p-24">
                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="pills-edit-profile"
                        role="tabpanel"
                        aria-labelledby="pills-edit-profile-tab"
                        tabIndex={0}
                      >
                        <form action="#">
                          <div className="row">
                            {/* Bank Name */}
                            <div className="col-sm-6">
                              <div className="mb-20">
                                <label
                                  htmlFor="depart"
                                  className="form-label fw-semibold text-primary-light text-sm mb-8"
                                >
                                  Bank Name
                                  <span className="text-danger-600">
                                    *
                                  </span>{" "}
                                </label>
                                <select
                                  className="form-control radius-8 form-select"
                                  id="depart"
                                  defaultValue="Select Event Title"
                                >
                                  <option value="Select Event Title" disabled>
                                    Select bank
                                  </option>
                                  <option value="Enter Event Title">SBI</option>
                                  <option value="Enter Event Title One">
                                    HDFC
                                  </option>
                                  <option value="Enter Event Title Two">
                                    AU
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="mb-20">
                                <label
                                  htmlFor="email"
                                  className="form-label fw-semibold text-primary-light text-sm mb-8"
                                >
                                  IFSC Code{" "}
                                  <span className="text-danger-600">*</span>
                                </label>
                                <input
                                  type="tel"
                                  className="form-control radius-8"
                                  id="email"
                                  placeholder="Enter IFSC Code"
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="mb-20">
                                <label
                                  htmlFor="number"
                                  className="form-label fw-semibold text-primary-light text-sm mb-8"
                                >
                                  Account Number
                                </label>
                                <input
                                  type="tel"
                                  className="form-control radius-8"
                                  id="number"
                                  placeholder="Enter Account Number"
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="mb-20">
                                <label
                                  htmlFor="number"
                                  className="form-label fw-semibold text-primary-light text-sm mb-8"
                                >
                                  Account Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control radius-8"
                                  id="number"
                                  placeholder="Enter Account Name"
                                />
                              </div>
                            </div>

                            <div className="col-sm-12">
                              <div className="mb-20">
                                <label
                                  htmlFor="desc"
                                  className="form-label fw-semibold text-primary-light text-sm mb-8"
                                >
                                  Mobile
                                </label>
                                <input
                                  type="tel"
                                  className="form-control radius-8"
                                  id="desc"
                                  placeholder="Enter Mobile Number"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-center gap-3">
                            <button
                              type="button"
                              className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                            >
                              Save
                            </button>
                          </div>

                          {/*  */}

                          {/*  */}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* toggle Hide */}
      <div className="card-body">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">
                  <div className="form-check style-check d-flex align-items-center">
                    <label className="form-check-label" htmlFor="checkAll">
                      Verify
                    </label>
                  </div>
                </th>
                <th scope="col">Account Name</th>
                <th scope="col">Bank Name</th>
                <th scope="col">Account Number</th>
                <th scope="col">IFSC</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((data) => (
                <tr key={data.id}>
                  <td>
                    <div className="form-switch switch-primary d-flex align-items-center gap-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="yes"
                        defaultChecked={true}
                      />
                    </div>
                  </td>
                  <td>
                    <Link to="#" className="text-primary-600">
                      {data.name}
                    </Link>
                  </td>
                  <td>parent</td>

                  <td>
                    <div className="d-flex align-items-center">
                      <h6 className="text-md mb-0 fw-medium flex-grow-1">
                        {data.mobile}
                      </h6>
                    </div>
                  </td>

                  <td>
                    <span className="btn rounded-pill btn-info-100 text-info-600  radius-4 px-10 py-4 text-sm ">
                      {data.role.name}
                    </span>
                  </td>
                  {/* <td>
                                        <NavLink to="action-view-profile" className="btn btn-sm btn-primary-600">
                                            Action
                                        </NavLink>
                                    </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
                  className={`page-link fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px me-8 w-32-px ${
                    currentPage === number
                      ? "bg-primary-600 text-white"
                      : "bg-primary-50 text-secondary-light"
                  }`}
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
  );
};

export default UpiPayoutLayer;
