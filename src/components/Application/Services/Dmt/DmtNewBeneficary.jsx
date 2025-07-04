import React from "react";

function DmtNewBeneficary() {
  return (
    <>
      <div className="">
        <button
          type="button"
          className="text-sm badge fw-bold btn-primary-600  radius-4 rounded-full px-20 py-11   text-sm fw-semibold "
          data-bs-toggle="modal"
          data-bs-target="#dmtNewBeneficiary"
        >
          New Beneficiary
        </button>
      </div>

      <div
        className="modal right fade"
        id="dmtNewBeneficiary"
        tabIndex="-1"
        aria-labelledby="rightModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title fw-semibold" id="rightModalLabel">
                Beneficiary Details{" "}
              </span>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="my-20">
                <label
                  htmlFor="bank"
                  className="form-label fw-semibold text-primary-light text-sm mb-8"
                >
                  Bank Name <span className="text-danger-600">*</span>
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control radius-8"
                    id="bank"
                    placeholder="Enter Device Info"
                  />
                </div>
              </div>
              <div className="my-20">
                <label
                  htmlFor="ifsc"
                  className="form-label fw-semibold text-primary-light text-sm mb-8"
                >
                  IFSC Code <span className="text-danger-600">*</span>
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control radius-8"
                    id="ifsc"
                    placeholder="Enter Aadhar Number"
                  />
                </div>
              </div>

              <div className="my-20">
                <label
                  htmlFor="bankAccount"
                  className="form-label fw-semibold text-primary-light text-sm mb-8"
                >
                  Bank Account <span className="text-danger-600">*</span>
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control radius-8"
                    id="bankAccount"
                    placeholder="Enter Aadhar Number"
                  />
                </div>
              </div>

              <div className="my-20">
                <label
                  htmlFor="BeneficiaryName"
                  className="form-label fw-semibold text-primary-light text-sm mb-8  "
                >
                  Beneficiary Name
                  <span className="text-danger-600">*</span>
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control radius-8"
                    id="BeneficiaryName"
                    placeholder="Enter Aadhar Number"
                  />
                </div>
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
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DmtNewBeneficary;
