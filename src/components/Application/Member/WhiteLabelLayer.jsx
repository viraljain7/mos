import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import MemberShimmerUi from "./Shimmer/MemberShimmerUI";
import { Search } from "lucide-react";
import MemberActionBtnModal from "./Modal/MemberActionBtnModal";
import { useDispatch } from "react-redux";
import { setMemberUserID } from "../../../rtk/features/MemberUserId/MemberUserIdSlice";
import Pagination from "../AccStmt/Modal/Pagination";
import { toast } from "react-toastify";
import AddNewAgent from "./Modal/AddNewAgent";

//white label member
const WhiteLabelLayer = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Select Status");

  const API = `${import.meta.env.VITE_APP_API_KEY}/member/whitelabel`;
  const token = sessionStorage.getItem("token");

  const fetchWhiteLabelData = useCallback(() => {
    fetch(API, {
      method: "GET", // Default method is GET, but it's good to specify explicitly
      headers: {
        Authorization: `Bearer ${token}`, // Add the Authorization header
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statuscode === "TXN") {
          setUser(data.data);
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }, [API, token]); // Dependencies: API

  useEffect(() => {
    fetchWhiteLabelData();
  }, [fetchWhiteLabelData]);

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
  const toggleHandler = useCallback(
    async (userId) => {
      const API_URL = `${import.meta.env.VITE_APP_API_KEY}/member/transaction`;
      if (!userId) {
        toast.error("Please enter a User ID");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("type", "status");
        formData.append("user_id", userId);

        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const data = await response.json();

        if (response.ok && data.statuscode === "TXN") {
          toast.success(data.message || "Status retrieved successfully");
          fetchWhiteLabelData(); // Refresh the data after successful status change
        } else {
          throw new Error(data.message || "Failed to fetch transactions");
        }
      } catch (error) {
        toast.error(error.message);
        console.error("API Error:", error);
      }
    },
    [fetchWhiteLabelData]
  );

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
          <Link
            to="#"
            className="btn btn-sm btn-success px-20 py-6 radius-4 d-inline-flex align-items-center gap-1"
          >
            <Icon icon="solar:download-linear" className="text-xl" />
            Export
          </Link>
          <select
            className="form-select form-select-sm w-auto"
            value={statusFilter}
            onChange={(e) => handleStatusFilter(e.target.value)}
          >
            <option value="Select Status">Select Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>

          <AddNewAgent
            role_name="Whitelabel"
            updateList={fetchWhiteLabelData}
          />
        </div>
      </div>
      <div className="card-body">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">
                  <div className="form-check style-check d-flex align-items-center">
                    <label className="form-check-label" htmlFor="checkAll">
                      Status
                    </label>
                  </div>
                </th>
                <th scope="col">Name</th>
                <th scope="col">Parent</th>
                <th scope="col">Mobile</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <MemberShimmerUi />
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No data found
                  </td>
                </tr>
              ) : (
                currentItems.map((data) => (
                  <tr key={data.id}>
                    <td>
                      <div className="form-switch switch-primary d-flex align-items-center gap-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="yes"
                          checked={data.status === "active"}
                          onChange={() => toggleHandler(data.id)}
                        />
                      </div>
                    </td>
                    <td>
                      <Link to="#" className="text-primary-600  fw-semibold">
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
                    <td>
                      <MemberActionBtnModal
                        onClick={() => {
                          dispatch(setMemberUserID(Number(data.id)));
                          localStorage.setItem("userId", Number(data.id));
                        }}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={filteredUsers.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default WhiteLabelLayer;
