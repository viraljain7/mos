import React from "react";
import MobileRecharge from "./Recharge/MobileRecharge";
import DTH from "./Recharge/DTH";
import FASTAG from "./Recharge/FASTAG";
import { FaMobileScreen } from "react-icons/fa6";
import { MdOutlineCable } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
const Recharge = () => {
  return (
    <div className="row gy-4">
      <div className="col-lg-12">
        <div className="card h-100">
          <div className="card-body p-24">
            {/* option1 */}
            <ul
              className="nav border-gradient-tab nav-pills mb-20 d-inline-flex justify-content-center "
              id="pills-tab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link d-flex align-items-center gap-2 fw-semibold text-primary-light radius-4 px-16 py-10 active"
                  id="pills-mobile-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-mobile-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-mobile-profile"
                  aria-selected="true"
                ><FaMobileScreen size={36} />
                  Mobile
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link d-flex align-items-center gap-2 fw-semibold text-primary-light radius-4 px-16 py-10"
                  id="pills-dth-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-dth"
                  type="button"
                  role="tab"
                  aria-controls="pills-dth"
                  aria-selected="false"
                  tabIndex={-1}
                >
                  <MdOutlineCable size={36} />

                  DTH
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link d-flex align-items-center gap-2 fw-semibold text-primary-light radius-4 px-16 py-10"
                  id="pills-fastag-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-fastag"
                  type="button"
                  role="tab"
                  aria-controls="pills-fastag"
                  aria-selected="false"
                  tabIndex={-1}
                >
                <FaShippingFast size={36} />
                  FASTag
                </button>
              </li>
            </ul>

            <div className="tab-content" id="pills-tabContent">
              {/* Mobile Recharge Form */}
              <MobileRecharge />

              {/* DTH */}
              <DTH/>

              {/* Fastag */}
            <FASTAG/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Recharge;
