import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import FilterModal from "./Modal/FilterModal";
import { Search } from "lucide-react";
import Pagination from "./Modal/Pagination";

const CreditLedgerLayer = () => {
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Select Status");
  const token = sessionStorage.getItem("token");
  const API = `${import.meta.env.VITE_APP_API_KEY}/statement/main`;

  const fetchUserData = useCallback(() => {
    // const formData = new FormData();
    // formData.append("type", "allusers");  // Append form data key-value pairs

    fetch(API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token here
        // Do not add 'Content-Type' when sending FormData; it will be set automatically
      },
      // body: formData,  // Pass the FormData directly as the body
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statuscode === "TXN") {
          setUser(data.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [API, token]); // Dependencies: API

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Filter users based on search and status
  const filteredUsers = user.filter((data) => {
    const matchesSearch =
      searchTerm === "" ||
      data?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      data?.product?.toLowerCase().includes(searchTerm.toLowerCase());
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

  const handleSwitchChange = (id) => {
    const formData = new FormData();
    formData.append("type", "status");
    formData.append("api_id", id); // Append updated name here

    fetch(`${API}`, {
      // Use the correct URL for the update endpoint
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token here
        // Do not add 'Content-Type' when sending FormData; it will be set automatically
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statuscode === "TXN") {
          toast.success(data.message);

          fetchUserData(); // Re-fetch data to reflect the changes
        } else {
          toast.error("Error updating the user.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Something went wrong!");
      });
  };

  return (
    <div className="card">
      {/* <ToastContainer /> */}
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
            className="btn btn-sm btn-success   px-20 py-6 radius-4 d-inline-flex align-items-center gap-1"
          >
            <Icon icon="solar:download-linear" className="text-xl" />
            Export
          </Link>
          <FilterModal />
        </div>
      </div>
      <div className="card-body">
        <div className="table-responsive scroll-sm">
          <table className="table basic-border-table sm-table mb-0">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Descritpion</th>
                <th scope="col">Status</th>
                <th scope="col">Op Balance</th>
                <th scope="col">Credit</th>
                <th scope="col">Debit</th>
                <th scope="col">Cl Balance</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((data) => (
                <tr key={data.id}>
                  <td>
                    <span className="fw-bold">
                      {data.created_at?.split(" ")[0]}
                    </span>{" "}
                    <br />
                    <span className="fw-bold">
                      {data.created_at?.split(" ")[1]}
                    </span>
                  </td>
                  <td className="fw-bold">
                    <span className="fw-bold">{data?.user?.name}</span> {""}
                    <span className="badge fw-semibold btn-info-100 text-info-600  radius-8 px-14 py-6 text-sm fw-normal">
                      {data?.user?.role?.name}
                    </span>{" "}
                    <br /> Remarks: Release refund | Amount: {data.amount}{" "}
                    <br />
                    {data.product} | Mob: {data.number}
                  </td>
                  {/* <td>
                    <span className="text-primary">{data.product}</span>
                  </td>
                  <td>Mob: {data.number}</td> */}
                  <td>
                    {data.status === "success" ? (
                      <span className="bg-success-focus text-success-main px-16 py-4 rounded-pill fw-medium text-sm">
                        Success
                      </span>
                    ) : data.status === "pending" ? (
                      <span className="bg-warning-focus text-warning-main px-16 py-4 rounded-pill fw-medium text-sm">
                        Pending
                      </span>
                    ) : (
                      <span className="bg-danger-focus text-danger-main px-16 py-4 rounded-pill fw-medium text-sm">
                        Failed
                      </span>
                    )}
                  </td>

                  <td className="fw-bold"> {data.opening_balance}</td>
                  <td className={"text-success fw-bold"}>
                    {data.trans_type === "credit" ? `+ ${data.amount}` : `0`}
                  </td>
                  <td className={"text-danger fw-bold"}>
                    {data.trans_type === "debit" ? `- ${data.amount}` : `0`}
                  </td>
                  <td className="fw-bold"> {data.closing_balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* pagination */}

        <Pagination
          currentPage={currentPage}
          totalItems={filteredUsers.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
        {/* pagination */}
      </div>
    </div>
  );
};

export default CreditLedgerLayer;