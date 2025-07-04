import React, { useState } from "react";
import CityBankOnboard from "./Modal/CityBankOnboard";

const AepsLayer = () => {
  const [onBoard, setOnBoard] = useState(false);
  const showNextPage = () => {
    setOnBoard(true);
  };
  return (
    <>
      {onBoard ? (
        <div className="row gy-4 ">
          <div className="col-lg-12 ">
            <div className="card h-100">
              <div className="card-body p-24 ">
                {/* option1 */}
                <ul
                  className="nav border-gradient-tab nav-pills mb-20 d-inline-flex"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link d-flex align-items-center gap-2 fw-semibold text-primary-light radius-4 px-16 py-10 active"
                      id="pills-aeps-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-aeps"
                      type="button"
                      role="tab"
                      aria-controls="pills-aeps"
                      aria-selected="true"
                    >
                      <img
                        className="w-10 h-10 object-fit-cover"
                        src="./assets/images/services/datacard.png"
                        alt="Uploaded Preview"
                      />
                      AEPS
                    </button>
                  </li>

                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link d-flex align-items-center gap-2 fw-semibold text-primary-light radius-4 px-16 py-10"
                      id="pills-auth-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-auth"
                      type="button"
                      role="tab"
                      aria-controls="pills-auth"
                      aria-selected="false"
                      tabIndex={-1}
                    >
                      <img
                        className="w-10 h-10 object-fit-cover"
                        src="./assets/images/services/auth.png"
                        alt="Uploaded Preview"
                      />
                      AUTHENTICATE
                    </button>
                  </li>

                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link d-flex align-items-center gap-2 fw-semibold text-primary-light radius-4 px-16 py-10"
                      id="pills-withdraw-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-withdraw"
                      type="button"
                      role="tab"
                      aria-controls="pills-withdraw"
                      aria-selected="false"
                      tabIndex={-1}
                    >
                      <img
                        className="w-10 h-10 object-fit-cover"
                        src="./assets/images/services/withdraw.png"
                        alt="Uploaded Preview"
                      />
                      WITHDRAW
                    </button>
                  </li>

                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link d-flex align-items-center gap-2 fw-semibold text-primary-light radius-4 px-16 py-10"
                      id="pills-enquiry-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-enquiry"
                      type="button"
                      role="tab"
                      aria-controls="pills-enquiry"
                      aria-selected="false"
                      tabIndex={-1}
                    >
                      <img
                        className="w-10 h-10 object-fit-cover"
                        src="./assets/images/services/enquiry.png"
                        alt="Uploaded Preview"
                      />
                      ENQUIRY
                    </button>
                  </li>

                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link d-flex align-items-center gap-2 fw-semibold text-primary-light radius-4 px-16 py-10"
                      id="pills-mini-statement-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-mini-statement"
                      type="button"
                      role="tab"
                      aria-controls="pills-mini-statement"
                      aria-selected="false"
                      tabIndex={-1}
                    >
                      <img
                        className="w-10 h-10 object-fit-cover"
                        src="./assets/images/services/statement.png"
                        alt="Uploaded Preview"
                      />
                      MINI STATEMENT
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link d-flex align-items-center gap-2 fw-semibold text-primary-light radius-4 px-16 py-10"
                      id="pills-aadharpay-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-aadharpay"
                      type="button"
                      role="tab"
                      aria-controls="pills-aadharpay"
                      aria-selected="false"
                      tabIndex={-1}
                    >
                      <img
                        className="w-10 h-10 object-fit-cover"
                        src="./assets/images/services/aadhar.png"
                        alt="Uploaded Preview"
                      />
                      AADHARPAY
                    </button>
                  </li>
                </ul>

                <div className="tab-content" id="pills-tabContent">
                  {/* Aeps Form */}
                  <div
                    className="tab-pane fade show active"
                    id="pills-aeps"
                    role="tabpanel"
                    aria-labelledby="pills-aeps-tab"
                    tabIndex={0}
                  >
                    <div className="col-sm-12">
                      {/* Mobile Number Input */}
                      <div className="mb-20">
                        <label
                          htmlFor="mobileNumber"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Mobile Number{" "}
                          <span className="text-danger-600">*</span>
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

                      {/* Email Input */}
                      <div className="mb-20">
                        <label
                          htmlFor="email"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Email <span className="text-danger-600">*</span>
                        </label>
                        <div className="position-relative">
                          <input
                            type="email"
                            className="form-control radius-8"
                            id="email"
                            placeholder="Enter Email Address"
                          />
                        </div>
                      </div>

                      {/* Firm Name Input */}
                      <div className="mb-20">
                        <label
                          htmlFor="firmName"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Firm Name <span className="text-danger-600">*</span>
                        </label>
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control radius-8"
                            id="firmName"
                            placeholder="Enter Firm Name"
                          />
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="d-flex align-items-center justify-content-center gap-3">
                        <button
                          type="button"
                          className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                        >
                          Cancel
                        </button>

                        <CityBankOnboard showNextPage={showNextPage} />
                      </div>
                    </div>
                  </div>

                  {/* withdraw */}
                  <div
                    className="tab-pane fade"
                    id="pills-withdraw"
                    role="tabpanel"
                    aria-labelledby="pills-withdraw-tab"
                    tabIndex={0}
                  >
                    {/* Row 1 */}
                    <div className="row mb-20 ">
                      {/* Amount Input */}
                      <div className="col-sm-12 mb-20">
                        <label
                          htmlFor="amount"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Amount <span className="text-danger-600">*</span>
                        </label>
                        <div className="position-relative">
                          <input
                            type="number"
                            className="form-control radius-8"
                            id="amount"
                            placeholder="Enter Amount"
                          />
                        </div>
                      </div>

                      {/* Remark Input */}
                      <div className="col-sm-12">
                        <label
                          htmlFor="remark"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Remark <span className="text-danger-600">*</span>
                        </label>
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control radius-8"
                            id="remark"
                            placeholder="Enter Remark"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="d-flex align-items-center justify-content-center gap-3">
                      <button
                        type="button"
                        className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                      >
                        Withdraw Now
                      </button>
                    </div>
                  </div>

                  {/* enquiry */}
                  <div
                    className="tab-pane fade"
                    id="pills-enquiry"
                    role="tabpanel"
                    aria-labelledby="pills-enquiry-tab"
                    tabIndex={0}
                  >
                    {/* Row 1 */}
                    <div className="row mb-20 ">
                      {/* Remark Input */}
                      <div className="col-sm-12">
                        <label
                          htmlFor="remark"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Remark <span className="text-danger-600">*</span>
                        </label>
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control radius-8"
                            id="remark"
                            placeholder="Enter Remark"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="d-flex align-items-center justify-content-center gap-3">
                      <button
                        type="button"
                        className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                      >
                        Enquiry Now
                      </button>
                    </div>
                  </div>
                  {/* mini Statement */}
                  <div
                    className="tab-pane fade"
                    id="pills-mini-statement"
                    role="tabpanel"
                    aria-labelledby="pills-mini-statement-tab"
                    tabIndex={0}
                  >
                    {/* Row 1 */}
                    <div className="row mb-20 ">
                      {/* Remark Input */}
                      <div className="col-sm-12">
                        <label
                          htmlFor="remark"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Remark <span className="text-danger-600">*</span>
                        </label>
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control radius-8"
                            id="remark"
                            placeholder="Enter Remark"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="d-flex align-items-center justify-content-center gap-3">
                      <button
                        type="button"
                        className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                      >
                        Get Statement
                      </button>
                    </div>
                  </div>

                  {/* AadharPay */}
                  <div
                    className="tab-pane fade"
                    id="pills-aadharpay"
                    role="tabpanel"
                    aria-labelledby="pills-aadharpay-tab"
                    tabIndex={0}
                  >
                    {/* Row 1 */}
                    <div className="row mb-20 ">
                      {/* Amount Input */}
                      <div className="col-sm-12 mb-20">
                        <label
                          htmlFor="amount"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Amount <span className="text-danger-600">*</span>
                        </label>
                        <div className="position-relative">
                          <input
                            type="number"
                            className="form-control radius-8"
                            id="amount"
                            placeholder="Enter Amount"
                          />
                        </div>
                      </div>

                      {/* Remark Input */}
                      <div className="col-sm-12">
                        <label
                          htmlFor="remark"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Remark <span className="text-danger-600">*</span>
                        </label>
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control radius-8"
                            id="remark"
                            placeholder="Enter Remark"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="d-flex align-items-center justify-content-center gap-3">
                      <button
                        type="button"
                        className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row gy-4 ">
          <OnBoardGuide showNextPage={showNextPage} />
        </div>
      )}
    </>
  );
};
export default AepsLayer;

const OnBoardGuide = ({ showNextPage }) => {
  return (
    <div className="col">
      <div className="card h-100 p-0">
        <div className="card-header border-bottom bg-base py-16 px-24">
          <h6 className="text-lg fw-semibold mb-0">AEPS Onboarding</h6>
          <p className="mt-16 mb-0">
            Welcome to the AEPS Onboarding Process! Please follow the
            instructions below to get started:
          </p>
        </div>
        <div className="card-body p-24">
          <ul className="list-group radius-8">
            <li className="list-group-item border text-secondary-light p-16 bg-base border-bottom-0">
              1. Ensure that you have all the necessary documents and
              information ready for onboarding.
            </li>
            <li className="list-group-item border text-secondary-light p-16 bg-base border-bottom-0">
              2. Click the "ONBOARD" button to initiate the onboarding process.
            </li>
            <li className="list-group-item border text-secondary-light p-16 bg-base border-bottom-0">
              3. Follow the on-screen instructions to complete the onboarding.
            </li>
            <li className="list-group-item border text-secondary-light p-16 bg-base border-0">
              4. If you encounter any issues, please contact support for
              assistance.
            </li>
            <li className="list-group-item border text-danger p-16 bg-base border-0">
              Note: Check whether you have uploaded the chequebook in the
              profile section.
            </li>
            <li className="list-group-item border text-secondary-light p-16 bg-base border-0">
              Once you are ready, click the button below to begin.
            </li>
          </ul>
          <div className="d-flex align-items-center justify-content-center m-4">
            <CityBankOnboard showNextPage={showNextPage} />
          </div>
        </div>
      </div>
    </div>
  );
};
