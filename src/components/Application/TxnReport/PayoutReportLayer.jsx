import React, { useCallback, useEffect, useMemo, useState } from "react";

import { toast,  } from "react-toastify";
import FilterModal from "./Modal/FilterModal";
import {  Search } from "lucide-react";
import ExportBtn from "./Modal/ExportBtn";
import Pagination from "../AccStmt/Modal/Pagination";

const PayoutReportLayer = () => {
  const [user, setUser] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Select Status");
  const [bankFilter, setBankFilter] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [isLoading, setIsLoading] = useState(false);

  const token = sessionStorage.getItem("token");
  const API = `${import.meta.env.VITE_APP_API_KEY}/service/payout/report`;

  const fetchUserData = useCallback(
    async (filters = {}) => {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("type", "report");

        // Add filters if they exist
        if (Object.keys(filters).length > 0) {
          formData.append("filter", JSON.stringify(filters));
        }

        const response = await fetch(API, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const data = await response.json();
        console.log("User data:", data);

        if (data.statuscode === "TXN") {
          setUser(data.data);
          setFilteredUsers(data.data);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to fetch transactions");
      } finally {
        setIsLoading(false);
      }
    },
    [token, API],
  );

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleApplyFilter = () => {
    const filters = {};

    if (bankFilter && bankFilter !== "") {
      filters.bank = bankFilter;
    }

    if (statusFilter && statusFilter !== "Select Status") {
      filters.status = statusFilter.toLowerCase();
    }

    if (dateRange.from) {
      filters.from_date = dateRange.from;
    }

    if (dateRange.to) {
      filters.to_date = dateRange.to;
    }

    if (searchTerm) {
      filters.search = searchTerm;
    }

    setCurrentPage(1);
    fetchUserData(filters);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

// use krna padega
const searchedUsers = useMemo(() => {
  if (!searchTerm) return filteredUsers;
  
  return filteredUsers.filter((user) => {
    return (
      user.user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.user.mobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.number?.toLowerCase().includes(searchTerm.toLowerCase()) 
     
    );
  });
}, [filteredUsers, searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchedUsers.slice(indexOfFirstItem, indexOfLastItem);

  const getPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setBankFilter("All");
    setDateRange({ from: "", to: "" });
    setCurrentPage(1);

    fetchUserData();
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
              disabled={isLoading}
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
              onKeyPress={(e) => e.key === "Enter" && handleApplyFilter()}
            />
            <span className="icon">
              <Search size={18} />
            </span>
          </div>
        </div>
        <div className="d-flex flex-wrap align-items-center gap-3">
          <button
            className="btn btn-sm btn-outline-secondary px-20 py-6 radius-4 d-inline-flex align-items-center gap-1"
            onClick={handleResetFilters}
            disabled={isLoading}
          >
            Reset Filters
          </button>
          <ExportBtn
            isLoading={isLoading}
            fileName="All_transactions_report"
            csvData={currentItems}
          />
          <FilterModal
            title="Transaction Filters"
            banks={["Bank of baroda", "AU", "HDFC", "SBI"]}
            statuses={["success", "pending", "failed"]}
            onFilterApply={handleApplyFilter}
            onChangeBank={setBankFilter}
            onChangeStatus={setStatusFilter}
            onChangeDateRange={setDateRange}
            selectedBank={bankFilter}
            selectedStatus={statusFilter}
            dateRange={dateRange}
          />
        </div>
      </div>

      <div className="card-body">
        {isLoading ? (
          <div className="text-center py-5">Loading transactions...</div>
        ) : currentItems.length === 0 ? (
          <div className="text-center py-5">
            {currentItems.length === 0 && (
              <>
                <p>No transactions match your filters</p>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={handleResetFilters}
                >
                  Clear all filters
                </button>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="table-responsive scroll-sm">
              <table className="table striped-table sm-table mb-0">
                <thead>
                  <tr>
                    <th scope="col">Order Id</th>
                    <th scope="col">User Details</th>
                    <th scope="col">Bank Details</th>
                    <th scope="col">Via</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((data) => (
                    <tr key={data.id}>
                      <td className="fw-bold">
                        {data.id}
                        <br />
                        {data.created_at}
                      </td>
                      <td className="fw-bold">
                        {data.user.name}  <br />
                        
                        {data.user.mobile} <br />
                        
                      </td>

                      <td>
                        BN <br/>
                        {data.number}   <br />
                        BRN

                      </td>

                      <td className="fw-bold">
                        {data.via}
                      </td>

                      <td className="">
                      <span className="badge text-sm fw-semibold text-lilac-600 bg-lilac-100 px-20 py-9 radius-4 text-white m-2">
                      Amount { data.amount}
                        </span> <br/>
                        <span className="badge text-sm fw-semibold text-success-600 bg-success-100 px-20 py-9 radius-4 text-white m-2">
                        Charge { data.charge}
                        </span>
                      </td>

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
                    
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
            currentPage={currentPage}
            totalItems={searchedUsers.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
          </>
        )}
      </div>
    </div>
  );
};

export default PayoutReportLayer;
