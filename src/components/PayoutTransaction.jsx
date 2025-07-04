import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, NavLink } from "react-router-dom";
import { Search } from "lucide-react";
import { ChevronsRight } from "lucide-react";

const PayoutTransaction = () => {
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("token");

  const API = `${import.meta.env.VITE_APP_API_KEY}/service/payout/report`;

  useEffect(() => {
    setLoading(true);
    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include if required
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        if (data.statuscode === "TXN") {
          setUser(data.data);
        } else {
          throw new Error("Unexpected response format");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [API, token]);

  const filteredUsers = user.filter((user) => {
    const matchesSearch =
      searchTerm === "" ||
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mobile?.includes(searchTerm);
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const getPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
      </div>
      <div className="card-body">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User Details</th>
                <th>Beneficiary Details</th>
                <th>Reference Details</th>
                <th>Amount/Commission</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((data) => (
                  <tr key={data.id}>
                    <td>
                      {data.id}
                      <br />
                      {data.created_at}
                    </td>
                    <td>
                      <Link to="#" className="text-primary-600">
                        {data.name}
                        {data.user_id}
                      </Link>
                    </td>
                    <td>
                      Name -
                      <br />
                      Account- {data.number}
                      <br />
                      Bank - {data.Profit}
                    </td>
                    <td>
                      Remitter -
                      <br />
                      bank Ref-
                      <br />
                      pay ID - {data.Profit}
                      <br />
                      Via -{data.via}
                    </td>

                    <td>
                      Amount - {data.amount}
                      <br />
                      Charge- {data.charge}
                      <br />
                      Profit - {data.Profit}
                    </td>
                    <td>
                      <NavLink
                        to="action-view-profile"
                        className="btn btn-sm btn-primary-600"
                      >
                        Action
                      </NavLink>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No results found</td>
                </tr>
              )}
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
                className="page-link"
                to="#"
                onClick={() => handlePageChange(currentPage - 1)}
                style={{
                  pointerEvents: currentPage === 1 ? "none" : "auto",
                  opacity: currentPage === 1 ? 0.5 : 1,
                }}
              >
                <Icon icon="ep:d-arrow-left" />
              </Link>
            </li>
            {getPageNumbers().map((number) => (
              <li className="page-item" key={number}>
                <Link
                  className={`page-link ${
                    currentPage === number ? "bg-primary-600 text-white" : ""
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
                className="page-link"
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

export default PayoutTransaction;
