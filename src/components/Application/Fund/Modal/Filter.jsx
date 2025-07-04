import React from "react";
import "../css/RightSideOpenModal.css";
import { IoFilter } from "react-icons/io5";

function Filter() {
  return (
    <>
      <div className="demo-content">
        <button
          type="button"
          className="badge text-sm fw-semibold border border-neutral-800 text-neutral-800 bg-transparent px-20 py-9 radius-4 text-white"
          data-bs-toggle="modal"
          data-bs-target="#rightModal"
        >
          Filter <IoFilter />
        </button>
      </div>

      <div
        className="modal right fade"
        id="rightModal"
        tabIndex="-1"
        aria-labelledby="rightModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title fw-semibold" id="rightModalLabel">
                Filter By
              </span>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="my-2">
                <span
                  className="text-sm fw-semibold mb-10"
                  id="rightModalLabel"
                >
                  Bank
                </span>
                <select
                  className="form-select form-select-sm "
                  value="Select Status"
                >
                  <option value="Select Status" disabled>
                    Select Bank
                  </option>
                  <option value="Paid">BOB</option>
                  <option value="Pending">AU</option>
                  <option value="Pending">HDFC</option>
                  <option value="Pending">SBI</option>
                </select>
              </div>
              <div className="my-24">
                <span
                  className="text-sm fw-semibold mb-10"
                  id="rightModalLabel"
                >
                  Select Date Range
                </span>
                <div className="col-12 mt-4">
                  <label className="form-label">From</label>
                  <input type="date" name="#0" className="form-control" />
                </div>
                <div className="col-12 mt-4">
                  <label className="form-label">To</label>
                  <input type="date" name="#0" className="form-control" />
                </div>
              </div>
              <div className="my-2">
                <span
                  className="text-sm fw-semibold mb-10"
                  id="rightModalLabel"
                >
                  Status
                </span>
                <select
                  className="form-select form-select-sm "
                  value="Select Status"
                >
                  <option value="Select Status" disabled>
                    Select Status
                  </option>
                  <option value="Paid">Active</option>
                  <option value="Pending">Inactive</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
