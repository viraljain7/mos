import React from "react";
import { Link } from "react-router-dom";
import EkycVerification from "./EkycVerification";
import DmtNewBeneficary from "./DmtNewBeneficary";
//dont use this
function DomesticTransferLayer() {
  return (
    <div
      className="tab-pane fade show active"
      id="pills-dmt-profile"
      role="tabpanel"
      aria-labelledby="pills-dmt-tab"
      tabIndex={0}
    >
      {/* Mobile Number Input */}
      <div className="mb-20">
        <label
          htmlFor="mobileNumber"
          className="form-label fw-semibold text-primary-light text-sm mb-8"
        >
          Mobile Number <span className="text-danger-600">*</span>
        </label>
        <div className="position-relative">
          <input
            type="text"
            className="form-control radius-8"
            id="mobileNumber"
            placeholder="Enter Mobile Number"
          />
        </div>
      </div>

      <div className="mt-40 table-responsive scroll-sm">
        <table className="table basic-border-table mb-20 sm-table">
          <thead>
            <tr>
              <th>Mobile </th>
              <th>Total Limit</th>
              <th>Remaining Limit</th>
              <th>Used Limit</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr className="fw-bold">
              <td>
                <Link to="#" className="text-primary-600">
                  9009001234
                </Link>
              </td>
              <td> ₹ 25000</td>
              <td> ₹ 12000</td>
              <td> ₹ 13000</td>
              <td>
                <DmtNewBeneficary />
                {/* <EkycVerification /> */}
                 {/* E-KYC for new user */}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-20 table-responsive scroll-sm">
        <table className="table bordered-table sm-table mb-0">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Account Details</th>
              <th scope="col" className="d-flex justify-content-center px-8">
                Action
              </th>
              <th scope="col">Account Details</th>
              <th scope="col">Account Details</th>
            </tr>
          </thead>
          {/* ?dynamic Data */}
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}

export default DomesticTransferLayer;
