import React from "react";
import "./css/ComingSoon.css";
import DomesticTransferLayer from "./Dmt/DomesticTransferLayer";
import FinoSuvidha from "./Dmt/FinoSuvidha";

const Dmt = () => {
  return (
    <div className="row gy-4">
      <div className="col-lg-12">
        <div className="card h-100">
          <div className="card-body p-24">
            <ul
              className="nav border-gradient-tab nav-pills mb-20 d-inline-flex"
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link d-flex align-items-center gap-2 fw-semibold text-primary-light radius-4 px-16 py-10 active"
                  id="pills-dmt-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-dmt-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-dmt-profile"
                  aria-selected="true"
                >
                  <img
                    className="w-10 h-10 object-fit-cover"
                    src="./assets/images/services/dmt.png"
                    alt="Uploaded Preview"
                  />
                  Domestic Money Transfer
                </button>
              </li>

              <li className="nav-item" role="presentation">
                <button
                  className="nav-link d-flex align-items-center gap-2 fw-semibold text-primary-light radius-4 px-16 py-10"
                  id="pills-fino-suvidha-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-fino-suvidha"
                  type="button"
                  role="tab"
                  aria-controls="pills-fino-suvidha"
                  aria-selected="false"
                  tabIndex={-1}
                >
                  <img
                    className="w-10 h-10 object-fit-cover"
                    src="./assets/images/services/bg-blank.png"
                    alt="Uploaded Preview"
                  />
                  Fino Suvidha
                </button>
              </li>
            </ul>

            <div className="tab-content" id="pills-tabContent">
              {/* DMT */}
              <DomesticTransferLayer />

              {/* Finosuvidha */}
              <FinoSuvidha />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dmt;
