import React from "react";
import { IoFilter } from "react-icons/io5";

const FilterModal = ({
  title = "Filter By",
  banks = [],
  statuses = [],
  onFilterApply,
  onChangeBank,
  onChangeStatus,
  onChangeDateRange,
  selectedBank = "",
  selectedStatus = "Select Status",
  dateRange = { from: "", to: "" },
}) => {
  const handleResetFilters = () => {
    onChangeBank("");
    onChangeStatus("Select Status");
    onChangeDateRange({ from: "", to: "" });
  };

  return (
    <>
      <div className="demo-content">
        <button
          type="button"
          className="badge text-sm fw-semibold border border-neutral-800 text-neutral-800 bg-transparent px-20 py-9 radius-4"
          data-bs-toggle="modal"
          data-bs-target="#filterModal"
        >
          Filter <IoFilter />
        </button>
      </div>

      <div
        className="modal right fade"
        id="filterModal"
        tabIndex="-1"
        aria-labelledby="filterModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title fw-semibold" id="filterModalLabel">
                {title}
              </span>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {/* Bank Filter */}
              <div className="mb-3">
                <label className="form-label">Bank</label>
                <select
                  className="form-select"
                  value={selectedBank}
                  onChange={(e) => onChangeBank(e.target.value)}
                >
                  <option value="">All Banks</option>
                  {banks.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={selectedStatus}
                  onChange={(e) => onChangeStatus(e.target.value)}
                >
                  <option value="Select Status">All Statuses</option>
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range Filter */}
              <div className="mb-3">
                <label className="form-label">Date Range</label>
                <div className="row g-2">
                  <div className="col-6">
                    <label className="form-label small">From</label>
                    <input
                      type="date"
                      className="form-control"
                      value={dateRange.from}
                      onChange={(e) =>
                        onChangeDateRange({ ...dateRange, from: e.target.value })
                      }
                      max={dateRange.to || undefined}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label small">To</label>
                    <input
                      type="date"
                      className="form-control"
                      value={dateRange.to}
                      onChange={(e) =>
                        onChangeDateRange({ ...dateRange, to: e.target.value })
                      }
                      min={dateRange.from || undefined}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleResetFilters}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  onFilterApply();
                  document.getElementById('filterModal')?.classList.remove('show');
                  document.querySelector('.modal-backdrop')?.remove();
                }}
                  data-bs-toggle="modal"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterModal;