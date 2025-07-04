import React from "react";

const CmsLayer = () => {
  return (
    <div className="row gy-4">
      <div className="col-lg-12">
        <div className="card h-100">
          <div className="card-body p-24">
            {/* option1 */}
            <ul
              className="nav border-gradient-tab nav-pills mb-20 d-inline-flex"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link d-flex align-items-center gap-2 fw-semibold text-primary-light radius-4 px-16 py-10 active"
                  id="pills-airtel-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-airtel"
                  type="button"
                  role="tab"
                  aria-controls="pills-airtel"
                  aria-selected="true"
                >
                  <img
                    className="w-10 h-10 object-fit-cover"
                    src="./assets/images/services/datacard.png"
                    alt="Uploaded Preview"
                  />
                  Airtel
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link d-flex align-items-center gap-2 fw-semibold text-primary-light radius-4 px-16 py-10"
                  id="pills-fino-cms-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-fino-cms"
                  type="button"
                  role="tab"
                  aria-controls="pills-fino-cms"
                  aria-selected="false"
                  tabIndex={-1}
                >
                  <img
                    className="w-10 h-10 object-fit-cover"
                    src="./assets/images/services/bg-blank.png"
                    alt="Uploaded Preview"
                  />
                  Fino CMS
                </button>
              </li>

              <li className="nav-item" role="presentation">
                <button
                  className="nav-link d-flex align-items-center gap-2 fw-semibold text-primary-light radius-4 px-16 py-10"
                  id="pills-zupee-cms-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-zupee-cms"
                  type="button"
                  role="tab"
                  aria-controls="pills-zupee-cms"
                  aria-selected="false"
                  tabIndex={-1}
                >
                  <img
                    className="w-10 h-10 object-fit-cover"
                    src="./assets/images/services/bg-blank.png"
                    alt="Uploaded Preview"
                  />
                  Zupee CMS
                </button>
              </li>
            </ul>

            {/* option2 */}

            <div className="tab-content" id="pills-tabContent">
              {/* Mobile Recharge Form */}
              <div
                className="tab-pane fade show active"
                id="pills-airtel"
                role="tabpanel"
                aria-labelledby="pills-airtel-tab"
                tabIndex={0}
              >
                {/* Mobile Operator Select Input */}
                <div className="col-sm-12">
                  <div className="mb-20">
                    <label
                      htmlFor="mobileOperator"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      Mobile Operator
                      <span className="text-danger-600">*</span>
                    </label>
                    <select
                      className="form-control radius-8 form-select"
                      id="mobileOperator"
                      defaultValue="Select Mobile Operator"
                    >
                      <option value="Select Mobile Operator" disabled>
                        Select Mobile Operator
                      </option>
                      <option value="Airtel">Airtel</option>
                      <option value="Jio">Jio</option>
                      <option value="Vodafone Idea">Vodafone Idea</option>
                      <option value="BSNL">BSNL</option>
                      <option value="MTNL">MTNL</option>
                    </select>
                  </div>
                </div>

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

                {/* Recharge Amount Input */}
                <div className="mb-20">
                  <label
                    htmlFor="rechargeAmount"
                    className="form-label fw-semibold text-primary-light text-sm mb-8"
                  >
                    Recharge Amount <span className="text-danger-600">*</span>
                  </label>
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control radius-8"
                      id="rechargeAmount"
                      placeholder="Enter Recharge Amount"
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
                  <button
                    type="button"
                    className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                  >
                    Pay
                  </button>
                </div>

                <iframe
                  className="my-20 "
                  title="YouTube Video"
                  width="100%"
                  height="600"
                  src={`https://www.youtube.com/embed/S7XpTAnSDL4`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  //   allowFullScreen
                ></iframe>
              </div>

              {/* Fino CMS */}
              <div
                className="tab-pane fade"
                id="pills-fino-cms"
                role="tabpanel"
                aria-labelledby="pills-fino-cms-tab"
                tabIndex="0"
              >
                {/* coming soon template */}
                <div className="coming-soon-container d-flex align-items-center justify-content-center h-100 bg-base">
                  {/* Spinner Loader */}
                  <div className="spinner-container text-center">
                    <div
                      className="spinner-border text-primary mb-4"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <h1 className="display-3 fw-bold text-primary animate__animated animate__fadeIn">
                      Coming Soon
                    </h1>
                    <p className="lead text-muted animate__animated animate__fadeInUp text-primary-light">
                      We're working hard to bring you something amazing. Stay
                      tuned!
                    </p>
                  </div>
                </div>

                {/* coming soon template */}
              </div>

              {/* Zupee CMS */}
              <div
                className="tab-pane fade"
                id="pills-zupee-cms"
                role="tabpanel"
                aria-labelledby="pills-zupee-cms-tab"
                tabIndex="0"
              >
                {/* coming soon template */}
                <div className="coming-soon-container d-flex align-items-center justify-content-center h-100 bg-base">
                  {/* Spinner Loader */}
                  <div className="spinner-container text-center">
                    <div
                      className="spinner-border text-primary mb-4"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <h1 className="display-3 fw-bold text-primary animate__animated animate__fadeIn">
                      Coming Soon
                    </h1>
                    <p className="lead text-muted animate__animated animate__fadeInUp text-primary-light">
                      We're working hard to bring you something amazing. Stay
                      tuned!
                    </p>
                  </div>
                </div>

                {/* coming soon template */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CmsLayer;
