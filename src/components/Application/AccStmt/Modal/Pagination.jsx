import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  className = "",
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisiblePages = 5;

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
      const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;

      if (currentPage <= maxPagesBeforeCurrent) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrent;
        endPage = currentPage + maxPagesAfterCurrent;
      }
    }

    // First page with ellipsis if needed
    if (startPage > 1) {
      pages.push(
        <PageButton
          key={1}
          page={1}
          isActive={1 === currentPage}
          onClick={() => handlePageClick(1)}
        />
      );
      if (startPage > 2) {
        pages.push(
          <li className="page-item disabled" key="start-ellipsis">
            <span className="page-link bg-light">...</span>
          </li>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageButton
          key={i}
          page={i}
          isActive={i === currentPage}
          onClick={() => handlePageClick(i)}
        />
      );
    }

    // Last page with ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <li className="page-item disabled" key="end-ellipsis">
            <span className="page-link bg-light">...</span>
          </li>
        );
      }
      pages.push(
        <PageButton
          key={totalPages}
          page={totalPages}
          isActive={totalPages === currentPage}
          onClick={() => handlePageClick(totalPages)}
        />
      );
    }

    return pages;
  };

  const PageButton = ({ page, isActive, onClick }) => (
    <li className="page-item">
      <button
        className={`page-link fw-medium radius-4 border-0 px-3 py-2 d-flex align-items-center justify-content-center h-32-px w-32-px ${
          isActive ? "bg-primary text-white" : "bg-base-50"
        } `}
        onClick={onClick}
      >
        {page}
      </button>
    </li>
  );

  return (
    <div className={`d-flex flex-wrap align-items-center justify-content-between gap-2 mt-24 ${className} `}>
      <span className="text-black">
        Showing {indexOfFirstItem + 1} to {indexOfLastItem} of {totalItems} entries
      </span>

      <ul className="pagination d-flex flex-wrap align-items-center gap-1 justify-content-center m-0">
        {/* First Page */}
        <li className="page-item">
          <button
            onClick={() => handlePageClick(1)}
            className="page-link text-secondary-light fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px me-8 w-32-px bg-base"
            disabled={currentPage === 1}
          >
            <ChevronsLeft size={16} />
          </button>
        </li>

        {/* Previous Page */}
        <li className="page-item">
          <button
            className="page-link text-secondary-light fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px me-8 w-32-px bg-base"
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={16} />
          </button>
        </li>

        {/* Page Numbers */}
        {renderPageNumbers()}

        {/* Next Page */}
        <li className="page-item">
          <button
            className="page-link text-secondary-light fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px me-8 w-32-px bg-base"
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={16} />
          </button>
        </li>

        {/* Last Page */}
        <li className="page-item">
          <button
            className="page-link text-secondary-light fw-medium radius-4 border-0 px-10 py-10 d-flex align-items-center justify-content-center h-32-px me-8 w-32-px bg-base"
            onClick={() => handlePageClick(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight size={20} />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;