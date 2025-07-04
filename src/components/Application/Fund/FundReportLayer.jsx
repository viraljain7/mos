import { useState, useEffect } from "react";
import { Button, Form, Table, Pagination, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { Search } from "lucide-react";
import FilterAllFundModal from "./Modal/FilterAllFundReport";

const FundReportLayer = () => {
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });
  const [filters, setFilters] = useState({
    bank: "",
    status: "",
    from_date: "",
    to_date: "",
    search: "",
  });
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("token");
  const API = `${import.meta.env.VITE_APP_API_KEY}/fund/transaction`;

  const fetchTransactions = async (page = 1) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("type", "fundreport");
      formData.append(
        "filters",
        JSON.stringify({
          ...filters,
          page,
          limit: pagination.per_page,
        })
      );

      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.statuscode === "TXN") {
        setTransactions(data.data.data);
        setPagination({
          current_page: data.data.current_page,
          last_page: data.data.last_page,
          per_page: data.data.per_page,
          total: data.data.total,
        });
      } else {
        toast.error(data.message || "Failed to fetch transactions");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters, pagination.per_page]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      fetchTransactions(page);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Reset to first page when filters change
    setPagination((prev) => ({ ...prev, current_page: 1 }));
  };

  const handleItemsPerPageChange = (value) => {
    setPagination((prev) => ({
      ...prev,
      per_page: Number(value),
      current_page: 1, // Reset to first page when changing items per page
    }));
  };

  return (
    <div className="card">
      <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-3">
        <div className="d-flex flex-wrap align-items-center gap-3">
          <div className="d-flex align-items-center gap-2">
            <span>Show</span>
            <Form.Select
              className="w-auto"
              size="sm"
              value={pagination.per_page}
              onChange={(e) => handleItemsPerPageChange(e.target.value)}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </Form.Select>
          </div>
          <div className="icon-field">
            <Form.Control
              type="text"
              size="sm"
              className="w-auto"
              placeholder="Search"
              value={filters.search}
              onChange={(e) =>
                handleFilterChange({
                  ...filters,
                  search: e.target.value,
                })
              }
            />
            <span className="icon">
              <Search size={18} />
            </span>
          </div>
        </div>
        <div className="d-flex flex-wrap align-items-center gap-3">
          <Button variant="success" size="sm">
            Export
          </Button>
          <FilterAllFundModal
            onApplyFilters={handleFilterChange}
            currentFilters={filters}
          />
        </div>
      </div>

      <div className="card-body">
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <div className="table-responsive scroll-sm">
              <Table striped hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User Details</th>
                    <th>Reference Details</th>
                    <th>Amount</th>
                    <th>Remark</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length > 0 ? (
                    transactions.map((txn) => (
                      <TransactionRow key={txn.id} transaction={txn} />
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No transactions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>

            {pagination.total > 0 && (
              <AdvancedPagination
                currentPage={pagination.current_page}
                totalPages={pagination.last_page}
                totalItems={pagination.total}
                itemsPerPage={pagination.per_page}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

const TransactionRow = ({ transaction }) => (
  <tr className="fw-semibold">
    <td>
      {transaction.id}
      <br />
      <small className="text-muted">{transaction.created_at}</small>
    </td>
    <td>
      {transaction.user?.name} <br />
      <span className="badge text-sm fw-semibold text-neutral-800 bg-neutral-300 px-10 py-2 radius-4">
        {transaction.user?.role?.name}
      </span>
    </td>
    <td>
      Bank: {transaction.fundbank?.name} <br />
      Account: {transaction.fundbank?.account} <br />
      Ref: {transaction?.ref_id}
    </td>
    <td className="align-middle">
      <span className="badge text-sm fw-semibold text-lilac-600 bg-lilac-100 px-20 py-9 radius-4">
        {transaction.amount}
      </span>
    </td>
    <td className="align-middle">{transaction.remark}</td>
    <td className="text-center align-middle">
      <StatusBadge status={transaction.status} />
    </td>
  </tr>
);

const StatusBadge = ({ status }) => {
  const statusClasses = {
    approved: "bg-success-focus text-success-main",
    rejected: "bg-danger-focus text-danger-main",
    pending: "bg-warning-focus text-warning-main",
  };

  return (
    <span
      className={`${
        statusClasses[status] || ""
      } px-16 py-4 rounded-pill fw-medium text-sm`}
    >
      {status}
    </span>
  );
};

const AdvancedPagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisiblePages);
    let endPage = Math.min(totalPages, currentPage + halfVisiblePages);

    if (currentPage - halfVisiblePages < 1) {
      endPage = Math.min(totalPages, maxVisiblePages);
    }

    if (currentPage + halfVisiblePages > totalPages) {
      startPage = Math.max(1, totalPages - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  // Calculate showing X to Y of Z entries
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mt-24">
      <div className="d-flex align-items-center gap-2">
        <span className="text-muted">
          Showing {startItem} to {endItem} of {totalItems} entries
        </span>
      </div>

      <Pagination className="mb-0">
        <Pagination.First
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />

        {pages.map((page, index) =>
          page === "..." ? (
            <Pagination.Ellipsis key={`ellipsis-${index}`} disabled />
          ) : (
            <Pagination.Item
              key={page}
              active={page === currentPage}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Pagination.Item>
          )
        )}

        <Pagination.Next
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default FundReportLayer;
