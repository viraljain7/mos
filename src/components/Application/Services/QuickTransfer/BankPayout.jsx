import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AddBankUserLayer from "../Modal/AddBankModal";
import { BadgeAlert, BadgeCheck, Search, Trash2 } from "lucide-react";
import BankPayoutTransferModal from "../Modal/BankPayoutTransferModal";
import { useDispatch } from "react-redux";
import { setBankId } from "../../../../rtk/features/QuickTransfer/BankPayoutSlice";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

function BankPayout() {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Select Status");
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
  }, [getUserData]); //dep : getUserData

  // Filter users based on search and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchTerm === "" ||
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.account?.toLowerCase().includes(searchTerm.toLowerCase());
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

  const deleteUser = async (id) => {
    const API = `${import.meta.env.VITE_APP_API_KEY}/service/payout`;
    try {
      if (!window.confirm("Are you sure you want to delete this slider?"))
        return;
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

  const verifyHandler = async (id) => {
    const API = `${import.meta.env.VITE_APP_API_KEY}/service/payout`;
    try {
      const formPayload = new FormData();

      formPayload.append("type", "payoutverify");
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
          toast.success(responseData.message);
          getUserData();
        }else{
          toast.error(responseData.message);

        }
      
      }
    } catch (error) {
      toast.error("error", error);
    }
  };

  return (
    <div
      className="tab-pane fade"
      id="pills-change-password"
      role="tabpanel"
      aria-labelledby="pills-change-password-tab"
      tabIndex="0"
    >
      {/*  start */}
      <div className="row gap-3">
        <div className="col-sm-12 d-flex flex-wrap align-items-center justify-content-between gap-3">
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
                      <Link to="#" className="text-primary-600 fw-bold">
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
                    <td className="d-flex align-items-center cursor-pointer">
                      {data.is_verified === "1" ? (
                        <Link
                          to="#"
                          className="w-32-px h-32-px me-8 bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center justify-content-center"
                        >
                          <BadgeCheck size={30} className="p-4" />
                        </Link>
                      ) : (
                        <Link
                          className="w-32-px h-32-px me-8 bg-warning-100 text-warning-900  rounded-circle d-inline-flex align-items-center justify-content-center"
                          role="alert"
                        >
                          <BadgeAlert
                            className="p-4"
                            size={30}
                            onClick={() => verifyHandler(data.id)}
                          />
                        </Link>
                      )}
                    </td>
                    <td className="mx-4 ">
                      <BankPayoutTransferModal
                        bankID={() => dispatch(setBankId(data.id))}
                        updateList={getUserData}
                        userData={users}
                      />

                      <Link
                        to="#"
                        className="w-32-px h-32-px me-8 bg-danger-focus text-danger-main rounded-circle d-inline-flex align-items-center justify-content-center"
                        onClick={() => deleteUser(data.id)}
                      >
                        <Trash2 className="p-4" size={30} />
                      </Link>
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

      {/* end */}
    </div>
  );
}

export default BankPayout;
