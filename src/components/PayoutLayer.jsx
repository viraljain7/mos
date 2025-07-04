import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import AddBankUserLayer from "./Modal/AddBankModal";
import { toast } from "react-toastify";
import { useCallback } from "react";
import { ChevronsLeft, ChevronsRight, Search } from "lucide-react";

//PayoutLayer
const PayoutLayer = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Select Status");
  const [userPaymentInfo, setUserPaymentInfo] = useState([]);
  const token = sessionStorage.getItem("token");

  const getUserData = useCallback(async () => {
    const API = `${import.meta.env.VITE_APP_API_KEY}/service/payout`;

    try {
      const formPayload = new FormData();

      formPayload.append("type", "payoutlist");

      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data',
        },
        body: formPayload,
      });

      if (response.ok) {
        const responseData = await response.json();

        if (responseData.statuscode === "TXN") {
          setUsers(responseData.data);
        }
      }
    } catch (error) {
      toast.error("api error", error);
    }
  }, [token]);

  useEffect(() => {
    getUserData();
  }, [getUserData]); //users

  // Filter users based on search and status
  const filteredUsers = users.filter((user) => {
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

  const paymentFetch = async (id) => {
    const API = `${import.meta.env.VITE_APP_API_KEY}/service/payout`;

    try {
      const formPayload = new FormData();

      formPayload.append("type", "payoutget");
      formPayload.append("type", "transaction");

      formPayload.append("payout_id", id);
      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data',
        },
        body: formPayload,
      });

      if (response.ok) {
        const responseData = await response.json();

        if (responseData.statuscode === "TXN") {
          setUserPaymentInfo(responseData.data);
        }
      }
    } catch (error) {
      toast.error("error", error);
    }
  };

  const deleteUser = async (id) => {
    const API = `${import.meta.env.VITE_APP_API_KEY}/service/payout`;
    try {
      const formPayload = new FormData();

      formPayload.append("type", "payoutdelete");
      formPayload.append("payout_id", id);
      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data',
        },
        body: formPayload,
      });

      if (response.ok) {
        const responseData = await response.json();

        if (responseData.status === "TXN") {
          toast.success(responseData.message);
          getUserData();
        }
      }
    } catch (error) {
      toast.error("error", error);
    }
  };

  const makePayment = async () => {
    const API = `${import.meta.env.VITE_APP_API_KEY}/service/payout`;
    try {
      const formPayload = new FormData();

      formPayload.append("type", "transaction");
      formPayload.append("payout_id", userPaymentInfo.id);
      formPayload.append("amount", userPaymentInfo.amount);
      formPayload.append("mode", userPaymentInfo.mode);

      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formPayload,
      });

      if (response.ok) {
        const responseData = await response.json();

        if (responseData.status === "TXN") {
          toast.success(responseData.message);
          getUserData();
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="row gy-4">
        <div className="col-lg-12">
          <div className="card h-100">
            <div className="card-body p-24">
              <ul
                className="nav border-gradient-tab nav-pills mb-20 d-inline-flex"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link d-flex align-items-center px-24 active"
                    id="pills-payout-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-payout"
                    type="button"
                    role="tab"
                    aria-controls="pills-payout"
                    aria-selected="true"
                  >
                    Payout
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link d-flex align-items-center px-24"
                    id="pills-bank-payout-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-bank-payout"
                    type="button"
                    role="tab"
                    aria-controls="pills-bank-payout"
                    aria-selected="false"
                    tabIndex={-1}
                  >
                    Bank Payout
                  </button>
                </li>
              </ul>

              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-edit-profile"
                  role="tabpanel"
                  aria-labelledby="pills-edit-profile-tab"
                  tabIndex={0}
                >
                  {/* code */}
                </div>

                {/* Bank Payout */}
                <div
                  className="tab-pane fade"
                  id="pills-bank-payout"
                  role="tabpanel"
                  aria-labelledby="pills-bank-payout-tab"
                  tabIndex="0"
                >
                  {/* Bank Payout Details */}
                  <div className="col-sm-12">
                    <div className="mb-20">
                      <label
                        htmlFor="depart"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Bank Name
                        <span className="text-danger-600">*</span>{" "}
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
                        <option value="Enter Event Title One">HDFC</option>
                        <option value="Enter Event Title Two">AU</option>
                      </select>
                    </div>
                  </div>
                  {/*  */}
                  <div className="mb-20">
                    <label
                      htmlFor="mobile"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      Mobile No. <span className="text-danger-600">*</span>
                    </label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control radius-8"
                        id="mobile"
                        placeholder="Enter Mobile Number"
                      />
                    </div>
                  </div>
                  <div className="mb-20">
                    <label
                      htmlFor="amount"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      Amount <span className="text-danger-600">*</span>
                    </label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control radius-8"
                        id="amount"
                        placeholder="Enter Amount"
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-center gap-3">
                    <button
                      type="button"
                      className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

            {/* </> */}
            <AddBankUserLayer updateUser={() => getUserData} />
            {/* <></> */}
          </div>
        </div>

        <div className="card-body">
          <div className="table-responsive scroll-sm">
            <table className="table bordered-table sm-table mb-0">
              <thead>
                <tr>
                  <th scope="col">Pay ID</th>
                  <th scope="col">Account Name</th>
                  <th scope="col">Bank Name</th>
                  <th scope="col">Account Number</th>
                  <th scope="col">IFSC</th>
                  <th scope="col">
                    <div className="form-check style-check d-flex align-items-center ">
                      <label className="form-check-label" htmlFor="checkAll">
                        Verify
                      </label>
                    </div>
                  </th>
                  <th scope="col px-20 py-11 d-flex align-items-center justify-content-center bg-info-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((data) => (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>
                      <Link to="#" className="text-primary-600">
                        {data.name}
                      </Link>
                    </td>
                    <td>{data.bank}</td>

                    <td>
                      <div className="d-flex align-items-center">
                        <h6 className="text-md mb-0 fw-medium flex-grow-1">
                          {data.account}
                        </h6>
                      </div>
                    </td>

                    <td>
                      <h6 className="text-md mb-0 fw-medium flex-grow-1">
                        {data.ifsc}
                      </h6>
                    </td>
                    <td className="d-flex align-items-center ">
                      {data.is_verified === "1" ? (
                        <div
                          className="alert alert-success bg-success-100 btn rounded-pill   radius-8 text-sm"
                          role="alert"
                        >
                          <div className="d-flex align-items-center ">
                            <Icon
                              icon="akar-icons:double-check"
                              className="icon text-xl"
                            />
                          </div>
                        </div>
                      ) : (
                        <div
                          className="alert alert-warning bg-warning-100 text-warning-600 border-warning-100 btn rounded-pill   radius-8 text-sm "
                          role="alert"
                        >
                          <Icon
                            icon="mdi:alert-circle-outline"
                            className="icon text-xl"
                          />
                        </div>
                      )}
                      {/* <VerifyTick /> */}
                    </td>
                    <td className="mx-4 ">
                      <button
                        type="button"
                        className="btn rounded-pill btn-info-100 text-info-600 radius-8 text-sm "
                        data-bs-toggle="modal"
                        data-bs-target="#paymentModal"
                        onClick={() => paymentFetch(data.id)}
                      >
                        <Icon
                          icon="material-symbols:payments-outline"
                          className="icon text-xl"
                        />
                      </button>
                      <button
                        type="button"
                        className="btn rounded-pill btn-danger-100 text-danger-600 radius-8 text-sm"
                        onClick={() => deleteUser(data.id)}
                      >
                        <Icon
                          icon="material-symbols:restore-from-trash"
                          className="icon text-xl"
                        />
                      </button>
                    </td>
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

      {/*paymentModal */}
      <div
        className="modal fade"
        id="paymentModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content radius-16 bg-base">
            <div className="card h-100">
              <div className="card-body p-24">
                <form>
                  <div className="row">
                    {/* Bank Name */}
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="bankName"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Bank Name
                          <span className="text-danger-600">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="ifsc"
                          placeholder="Enter IFSC Code"
                          value={userPaymentInfo.bank}
                          disabled
                        />
                      </div>
                    </div>

                    {/* IFSC Code */}
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="ifsc"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          IFSC Code <span className="text-danger-600">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="ifsc"
                          placeholder="Enter IFSC Code"
                          value={userPaymentInfo.ifsc}
                          disabled
                        />
                      </div>
                    </div>

                    {/* Account Number */}
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="accountNumber"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Account Number
                          <span className="text-danger-600">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="accountNumber"
                          placeholder="Enter Account Number"
                          value={userPaymentInfo.account}
                          disabled
                        />
                      </div>
                    </div>

                    {/* Account Name */}
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="accountName"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Account Name
                          <span className="text-danger-600">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="accountName"
                          placeholder="Enter Account Name"
                          value={userPaymentInfo.name}
                          disabled
                        />
                      </div>
                    </div>
                    {/* Mode */}
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="bankName"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Payment Mode
                          <span className="text-danger-600">*</span>
                        </label>
                        <select
                          className="form-control radius-8 form-select"
                          id="bankName"
                        >
                          <option value="" disabled>
                            Select Mode
                          </option>
                          <option value="IMPS">IMPS</option>
                          <option value="IMPS">IMPS</option>
                          <option value="RTGS">RTGS</option>
                        </select>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="mobile"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Amount
                        </label>
                        <input
                          type="tel"
                          className="form-control radius-8"
                          id="mobile"
                          placeholder="Enter Amount"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Action Buttons */}
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
                      onClick={makePayment}
                    >
                      Pay
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PayoutLayer;
