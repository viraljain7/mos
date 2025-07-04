import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

function FinoSuvidha() {
  const [activeScreen, setActiveScreen] = useState("first"); // Track active screen
  const [outsider, setOutsider] = useState(false); // For ThirdScreen modal logic

  // Function to handle screen navigation
  const handleNext = () => {
    const screenOrder = ["first", "second", "third", "final"];
    const currentIndex = screenOrder.indexOf(activeScreen);
    if (currentIndex < screenOrder.length - 1) {
      setActiveScreen(screenOrder[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const screenOrder = ["first", "second", "third", "final"];
    const currentIndex = screenOrder.indexOf(activeScreen);
    if (currentIndex > 0) {
      setActiveScreen(screenOrder[currentIndex - 1]);
    }
  };
  return (
    <div
      className="tab-pane fade"
      id="pills-fino-suvidha"
      role="tabpanel"
      aria-labelledby="pills-fino-suvidha-tab"
      tabIndex="0"
    >
      {/* Logo */}
      <div className="w-full h-120-px d-flex align-items-center justify-content-between bg-base">
        <img
          src="https://s3-alpha-sig.figma.com/img/1a3c/a781/2ccf14225216363d75d03af765fba2f8?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=iEet2koYsNtH2d~WYiVcuYPXF9R7jwG0SY8kNRtwotZ3YtukVN1WFHc7ZshCdPpm8JkSyfjXEpi4nC0kaUWpFGJXdUyGZR~Cf9nFji9db4nlue7~7gfW-16xf1zKR7xYxlmW3zExFM6up4GTw6mNzb82VSFeTAIwrGJvmDrNGaSA4Om66d4PNGGbxLMBWS8IX5UCnNHhPBzQBN6acSneiTmmXI~FyChlk~guC3p38oZkassY~HkZAIDJJw-oNqVk-I4SngLaTbNUKOwG9rHzzwEpW5k-~kv-kALlfUZV6e1lOCkC6S5bdt0ZyPdSocWSbPa5ZGkc7kUPY9J6YoHwgQ"
          alt="image_icon"
          className="img-fluid w-0-px h-44-px"
        />
        <img
          src="assets/images/nexalogo.webp"
          alt="image_icon"
          className="img-fluid w-0-px h-44-px "
        />
      </div>

      {activeScreen === "first" && <FirstScreen handleNext={handleNext}/>}
        {activeScreen === "second" && <SecondScreen handleNext={handleNext} />}
        {activeScreen === "third" && (
          <ThirdScreen outsider={outsider} setOutsider={setOutsider} handleNext={handleNext} handlePrevious={handlePrevious} />
        )}
        {activeScreen === "final" && <FinalScreen />}

      {/* footer */}
      <div
        className="row mt-32 mx-auto w-full py-4"
        style={{ backgroundColor: "#413B6B" }}
      >
        <p className="card-text text-white text-sm">
          Terms & Condition Disclaimer Sitemap. <br />
          Copyright © 2018, Fino Paytech Limited All Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default FinoSuvidha;

const FirstScreen = ({handleNext}) => {
  return (
    <div>
      {/*------------------ Main Container----------------------------- */}
      {/* background */}
      <div
        className="h-200-px d-flex align-items-center justify-content-center "
        style={{ backgroundColor: "#413B6B" }}
      ></div>

      <div className="mt-16">
        {/* search box */}
        <form className="navbar-search w-full">
          <input
            type="text"
            className="bg-base h-40-px w-full"
            name="search"
            placeholder="Search"
          />
          <Icon icon="ion:search-outline" className="icon" />
          <button
            type="button"
            className="btn  border text-white  text-md px-56 py-8 radius-8 mx-16"
            style={{ backgroundColor: "#413B6B" }}
          >
            Search
          </button>
        </form>

        {/* cards */}
        <div className="row mt-32 mx-auto w-full ">
          <div onClick={handleNext} className="col-xxl-3 col-sm-6  border-2">
            <div className="card h-100 radius-12 cursor-pointer ">
              <img
                src="https://imgs.search.brave.com/bVjA0sFiAyg6VitEtl10j5pOrGz1Km2olIXb38Y65Z0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzYxLzA2LzI3/LzM2MF9GXzYxMDYy/Nzk2X05GODdHUG5X/VjBmUTJMaG9ZTmx5/amV2MFBvY1J3Wmo5/LmpwZw"
                className="card-img-top"
                alt=""
              />
              <div className="card-body ">
                <p className="card-text text-neutral-600 text-sm py-10">
                Click Here to Open Account
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SecondScreen = ({handleNext}) => {
  return (
    <>
      <div className="row w-100 h-75">
        <div className="col-8 ">
          <div className="card h-100 radius-12 w-full d-flex justify-content-center align-items-center ">
            <img
              src="https://imgs.search.brave.com/GgeEQLjGiOY4YOZCPKIRPgOu7obktk8QHGC8EQ1L0RY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9yb3VuZC11c2Vy/LWljb24taXNvbGF0/ZWQtd2hpdGUtYmFj/a2dyb3VuZC1ibGFj/ay13aGl0ZS0zZC1y/ZW5kZXJpbmdfNjMx/MzUtMzg5My5qcGc_/c2VtdD1haXNfaHli/cmlkJnc9NzQw"
              alt=""
              className="w-25  rounded-circle img-fluid"
            />
            <button
              type="button"
              onClick={handleNext}
              className="btn text-white border  text-md px-56 py-12 radius-8 w-25 mt-32"
              style={{
                background: "#413B6B",
              }}
            >
              E-KYC
            </button>
          </div>
        </div>
        <div className="col-4 ">
          <div>
            <p
              style={{
                background: "#413B6B",
              }}
              className="fw-bold text-white text-center py-10"
            >
              Features & Benefits
            </p>

            <ul
              className="text-white text-sm p-20  "
              style={{
                background: "#6B668C",
              }}
            >
              <li>Specially designed product for remittance customers</li>
              <li>No minimum balance requirement</li>
              <li>No Debit Card facility</li>
              <li>Instant funds transfer to any Bank using IMPS facility</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

const ThirdScreen = ({ outsider, setOutsider,handleNext,handlePrevious }) => {
  const [activeTab, setActiveTab] = useState("pills-home"); // Track active tab

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <>
      <div className="card-body p-24 pt-10">
        <ul
          style={{ backgroundColor: "#F1EFFF" }}
          className="nav text-black bordered-tab border border-top-0 border-start-0 border-end-0 d-inline-flex nav-pills mb-16"
          id="pills-tab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link px-16 py-10 ${
                activeTab === "pills-home" ? "active" : ""
              }`}
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected={activeTab === "pills-home"}
              onClick={() => handleTabClick("pills-home")}
            >
              Products
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link px-16 py-10 ${
                activeTab === "pills-details" ? "active" : ""
              }`}
              id="pills-details-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-details"
              type="button"
              role="tab"
              aria-controls="pills-details"
              aria-selected={activeTab === "pills-details"}
              onClick={() => handleTabClick("pills-details")}
            >
              Customer Profile
            </button>
          </li>
        </ul>

        <div className="tab-content" id="pills-tabContent">
          {/* Product */}
          <div
            className={`tab-pane fade ${
              activeTab === "pills-home" ? "show active" : ""
            }`}
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
            tabIndex={0}
          >
            <div className="d-flex mt-36">
              <ul className="d-flex gap-2 bg-custom list-unstyled p-2 text-black">
                <li className="form-check d-flex align-items-center ">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="radio1"
                    value="option1"
                  />
                  <label className="form-check-label " htmlFor="radio1">
                    UID
                  </label>
                </li>
                <li className="form-check d-flex align-items-center ">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="radio2"
                    value="option2"
                  />
                  <label className="form-check-label" htmlFor="radio2">
                    VID
                  </label>
                </li>
              </ul>
            </div>
            <div className="mt-32  ">
                <label htmlFor="mobileNumber">
                  Aadhaar Number
                  <span className="text-danger-500">*</span>
                </label>
                <div className="col-sm-10 d-flex gap-4">

                <input
                  type="text"
                  className="form-control radius-8 w-50"
                  id="mobileNumber"
                  placeholder="8585 5858 5858 5858"
                />

                <button
                  className="text-white  btn"
                  style={{ background: "#413B6B" }}
                  type="button"
                >
                  <img
                    src="https://i.ibb.co/5xzB85yn/fingerprint-outline-variant.png"
                    alt="fingerprint-outline-variant"
                    border="0"
                    className="w-10 h-8 text-white"
                    style={{ filter: "invert(100%)" }}
                  />
                </button>
              </div>
            </div>

            <div className="form-check d-flex align-items-center mt-32">
              <input
                className="form-check-input"
                type="checkbox"
                name="agree"
                id="agree"
              />
              <label className="form-check-label" htmlFor="agree">
                I hereby give my consent to Fino Payments Bank to obtain my
                details stored with UIDAI for authentication and e-KYC purpose.
                Fino Payments Bank Limited has informed me that my identity
                information would only be used for account opening request and
                for DBT seeding (only if I have given consent for seeding my
                account with Fino Payments Bank Limited) purpose and that my
                Aadhaar biometrics will not be stored with the Bank
              </label>
            </div>
            <div className="d-flex justify-content-end mt-32">
              <button
                type="button"
                className="btn text-white border  text-md px-56 py-12 radius-8 mt-32"
                style={{
                  background: "#413B6B",
                }}
                onClick={handlePrevious}
              >
                Previous
              </button>
            </div>
            <div className="d-flex justify-content-end mt-32">
              <p>
                <span className="fw-bold">Note:</span> Field Marked With *are
                Mandatory
              </p>
            </div>
          </div>

          {/* Customer */}
          <div
            className={`tab-pane fade ${
              activeTab === "pills-details" ? "show active" : ""
            }`}
            id="pills-details"
            role="tabpanel"
            aria-labelledby="pills-details-tab"
            tabIndex={0}
          >
            <div className="row mt-36">
              <div className="col-md-10">
                {/* radio Btn */}
                <div className="d-flex gap-6">
                  <div className="bg-neutral-200 px-10 py-12 radius-8">
                    <span className="form-check checked-dark d-flex align-items-center gap-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="Designation"
                        id="mr"
                        defaultChecked={true}
                      />
                      <label
                        className="form-check-label line-height-1 fw-medium text-secondary-light"
                        htmlFor="mr"
                      >
                        Mr.
                      </label>
                    </span>
                  </div>
                  <div className="bg-neutral-200 px-10 py-12 radius-8">
                    <span className="form-check checked-dark d-flex align-items-center gap-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="Designation"
                        id="mrs"
                      />
                      <label
                        className="form-check-label line-height-1 fw-medium text-secondary-light"
                        htmlFor="mrs"
                      >
                        Mrs.
                      </label>
                    </span>
                  </div>
                  <div className="bg-neutral-200 px-10 py-12 radius-8">
                    <span className="form-check checked-dark d-flex align-items-center gap-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="Designation"
                        id="ms"
                      />
                      <label
                        className="form-check-label line-height-1 fw-medium text-secondary-light"
                        htmlFor="ms"
                      >
                        Ms.
                      </label>
                    </span>
                  </div>
                </div>

                {/* FullName */}
                <div className="row mt-16">
                  <div className="col-sm-4">
                    <label className="form-label">First Name   <span className="text-danger-500">*</span></label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control wizard-required"
                        placeholder="Tanmay"
                        required
                        disabled
                      />
                      <div className="wizard-form-error" />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <label className="form-label">Middle Name  </label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control wizard-required"
                        placeholder="Enter Middle Name"
                        required
                      />
                      <div className="wizard-form-error" />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <label className="form-label">Last Name <span className="text-danger-500">*</span></label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control wizard-required"
                        placeholder="Rawat"
                        disabled
                        required
                      />
                      <div className="wizard-form-error" />
                    </div>
                  </div>
                </div>

                {/* Gender DOB */}
                <div className="row mt-16 ">
                  <div className="col-sm-4">
                    <label htmlFor="" className="form-label">
                      Gender <span className="text-danger-500">*</span>
                    </label>
                    <div className="d-flex gap-2 ">
                      <div className="bg-neutral-200  px-10 py-12 radius-8">
                        <span className="form-check checked-dark d-flex align-items-center gap-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="male"
                            defaultChecked={true}
                          />
                          <label
                            className="form-check-label line-height-1 fw-medium text-secondary-light"
                            htmlFor="male"
                          >
                            Male
                          </label>
                        </span>
                      </div>

                      <div className="bg-neutral-200 px-10 py-12 radius-8">
                        <span className="form-check checked-dark d-flex align-items-center gap-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="female"
                          />
                          <label
                            className="form-check-label line-height-1 fw-medium text-secondary-light"
                            htmlFor="female"
                          >
                            Female
                          </label>
                        </span>
                      </div>
                      <div className="bg-neutral-200 px-10 py-12 radius-8">
                        <span className="form-check checked-dark d-flex align-items-center gap-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="gender"
                            id="tg"
                          />
                          <label
                            className="form-check-label line-height-1 fw-medium text-secondary-light"
                            htmlFor="tg"
                          >
                            TG
                          </label>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <label className="form-label">Date of Birth <span className="text-danger-500">*</span></label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control wizard-required"
                        placeholder="18,12,2003"
                        required
                        disabled
                      />
                      <div className="wizard-form-error" />
                    </div>
                  </div>
                </div>

                {/* Mobile Email */}
                <div className="row mt-16">
                  <div className="col-sm-4">
                    <label className="form-label">Mobile Number</label>
                    <div className="input-group">
                      <span className="input-group-text bg-base">+91</span>
                      <input
                        type="number"
                        className="form-control flex-grow-1"
                        placeholder="9559889898"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <label className="form-label">Email ID</label>
                    <div className="input-group">
                      <span className="input-group-text bg-base">@</span>
                      <input
                        type="text"
                        className="form-control flex-grow-1"
                        placeholder="Email ID"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 h-full">
                {/* radio Btn */}
                <img
                  src="assets/images/auth/envelop-icon.png"
                  alt=""
                  className=" w-full h-full img-thumbnail"
                />
              </div>
            </div>

            {/* father/husband, mother, religion, pep, education */}
            <div className="row mt-16">
              <div className="col-sm-3">
                <label className="form-label">Father/Husband Name <span className="text-danger-500">*</span></label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control wizard-required"
                    placeholder="Kishor Kumar Rawat"
                    disabled
                    required
                  />
                  <div className="wizard-form-error" />
                </div>
              </div>
              <div className="col-sm-3">
                <label className="form-label">Mother Maiden Name <span className="text-danger-500">*</span></label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control wizard-required"
                    required
                  />
                  <div className="wizard-form-error" />
                </div>
              </div>

        
              <div className=" col-sm-3 d-flex align-items-start flex-wrap gap-20 flex-column">
                <label htmlFor="" className="form-label">
                  PEP Deduction<span className="text-danger-500">*</span>
                </label>
                <div className="form-check checked-primary d-flex align-items-center gap-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="pepDeduction"
                    id="pepNo"
                  />
                  <label
                    className="form-check-label line-height-1 fw-medium text-secondary-light"
                    htmlFor="pepNo"
                  >
                    No
                  </label>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="pepDeduction"
                    id="pepYes"
                  />
                  <label
                    className="form-check-label line-height-1 fw-medium text-secondary-light"
                    htmlFor="pepYes"
                  >
                    Yes
                  </label>
                </div>
              </div>
              <div className="col-sm-3">
                <label className="form-label">Religion <span className="text-danger-500">*</span></label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control wizard-required"
                    placeholder=""
                    required
                  />
                  <div className="wizard-form-error" />
                </div>
              </div>
              <div className="col-sm-3 mt-16">
                <label className="form-label">Education<span className="text-danger-500">*</span></label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control wizard-required"
                    placeholder=""
                    required
                  />
                  <div className="wizard-form-error" />
                </div>
              </div>
            </div>

            {/* country, martial, occupation, income */}
            <div className="row mt-16">
              <div className="col-sm-3">
                <label className="form-label">Country<span className="text-danger-500">*</span></label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control wizard-required"
                    placeholder=""
                    required
                  />
                  <div className="wizard-form-error" />
                </div>
              </div>
              <div className="col-sm-3">
                <label className="form-label">Martial Status<span className="text-danger-500">*</span></label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control wizard-required"
                    placeholder=""
                    required
                  />
                  <div className="wizard-form-error" />
                </div>
              </div>

              <div className="col-sm-3">
                <label className="form-label">Select Occupation<span className="text-danger-500">*</span></label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control wizard-required"
                    placeholder=""
                    required
                  />
                  <div className="wizard-form-error" />
                </div>
              </div>

              <div className="col-sm-3">
                <label className="form-label">Annual Income<span className="text-danger-500">*</span></label>
                <div className="input-group ">
                  <select
                    className="form-select input-group-text w-200-px flex-grow-0"
                    defaultValue="Select Country"
                  >
                    <option value="" disabled>
                      Select Income
                    </option>
                    <option value="Less than 1 Lac">Less than 1 Lac</option>
                    <option value="1Lac - 2Lac">1Lac - 2Lac</option>
                    <option value="2Lac - 3Lac">2Lac - 3Lac</option>
                    <option value="3Lac- 5Lac">3Lac- 5Lac</option>
                    <option value="5Lac - 7Lac">5Lac - 7Lac</option>
                    <option value="7Lac - 10Lac">7Lac - 10Lac</option>
                    <option value="More than 10Lac">More than 10Lac</option>
                  </select>
                </div>
              </div>
            </div>

            {/*Communication Address*/}
            <div className="row mt-16">
              <div className="col-sm-12">
                <h6 className="form-label fs-5" style={{color: "#413B6B",}}>Communication Address</h6>
                <div className="form-check d-flex align-items-center ">
                  <input
                    className="form-check-input align-start"
                    type="checkbox"
                    name="sameAddress"
                    id="sameAddress"
                  />
                  <label className="form-check-label" htmlFor="sameAddress">
                    Communication address same as Aadhaar Address
                  </label>
                </div>
                <div className="form-check d-flex align-items-start ">
                  <input
                    className="form-check-input align-start"
                    type="checkbox"
                    name="diffAddress"
                    id="diffAddress"
                  />
                  <label className="form-check-label" htmlFor="diffAddress">
                    Communication address different from Aadhaar Address
                  </label>
                </div>
              </div>
            </div>
            {/* Address 1 ,2 3 */}
            <div className="row mt-16">
              <div className="col-sm-4">
                <label className="form-label">Address 1<span className="text-danger-500">*</span></label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control wizard-required"
                    required
                  />
                  <div className="wizard-form-error" />
                </div>
              </div>
              <div className="col-sm-4">
                <label className="form-label">Address 2</label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control wizard-required"
                    required
                  />
                  <div className="wizard-form-error" />
                </div>
              </div>

              <div className="col-sm-4">
                <label className="form-label">Address 3</label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control wizard-required"
                    required
                  />
                  <div className="wizard-form-error" />
                </div>
              </div>
            </div>
            {/* Landmark, pincode, country */}
            <div className="row mt-16">
              <div className="col-sm-4">
                <label className="form-label">Landmark </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control wizard-required"
                    required
                  />
                  <div className="wizard-form-error" />
                </div>
              </div>
              <div className="col-sm-4">
                <label className="form-label">Pin Code <span className="text-danger-500">*</span></label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control wizard-required"
                    required
                  />
                  <div className="wizard-form-error" />
                </div>
              </div>

              <div className="col-sm-4">
                <label className="form-label">Country<span className="text-danger-500">*</span> </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control wizard-required"
                    required
                  />
                  <div className="wizard-form-error" />
                </div>
              </div>
            </div>

            <div className="row mt-20">
              <h6 htmlFor="" className="form-label fs-5" style={{color: "#413B6B",}}>
                Other Details
              </h6>
              <div className=" col-sm-12 d-flex align-items-center flex-wrap ">
                <div className="form-check checked-primary d-flex align-items-center gap-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="taxStatus"
                    id="pan"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalEdit"
                    onChange={() => setOutsider(false)} // Reset outsider when PAN is selected
                  />
                  <label
                    className="form-check-label line-height-1 fw-medium text-secondary-light"
                    htmlFor="pan"
                  >
                    PAN
                  </label>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="taxStatus"
                    id="form60"
                    onChange={() => setOutsider(false)} // Reset outsider when Form 60 is selected
                  />
                  <label
                    className="form-check-label line-height-1 fw-medium text-secondary-light"
                    htmlFor="form60"
                    id="pills-vertical-details-tab"
                    data-bs-toggle="modal" // Changed from "pill" to "modal"
                    data-bs-target="#exampleModal" // Points to a modal ID
                    type="button"
                    role="button" // Changed from "tab" to "button"
                    aria-controls="exampleModal" // Matches modal ID
                    aria-selected="false"
                  >
                    Form 60
                  </label>

                  <li
                    style={{
                      background: "#F3F1FF",
                    }}
                    className="text-white border  radius-4 px-16 py-8 text-black text-sm line-height-1 fw-medium list-unstyled w-fit"
                  >
                    FATCA Declaration
                  </li>

                  <li className="text-white border text-decoration-underline  radius-4 px-16 py-8 text-black text-sm line-height-1 fw-medium list-unstyled w-fit">
                    (I am an Indian resident paying taxes only in India)
                  </li>
                </div>
              </div>

              <div className=" col-sm-12 d-flex align-items-center flex-wrap  mt-12">
                <div className="form-check checked-primary d-flex align-items-center gap-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="residentStatus"
                    id="residentIndia"
                    onChange={() => setOutsider(false)} // India resident, no extra fields
                  />
                  <label
                    className="form-check-label line-height-1 fw-medium text-secondary-light"
                    htmlFor="residentIndia"
                  >
                    I am tax resident of India
                  </label>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="residentStatus"
                    id="residentOutside"
                    onChange={() => setOutsider(true)} // Outside India, show extra fields
                  />
                  <label
                    className="form-check-label line-height-1 fw-medium text-secondary-light"
                    htmlFor="residentOutside"
                  >
                    I am tax resident of outside India
                  </label>
                </div>
                <div className="col-sm-12 mt-12">
                  <label
                    className="form-check-label line-height-2 fw-medium text-secondary-light"
                    htmlFor="horizontal1"
                  >
                    I understand that the Bank is relying on this information
                    for the purpose of determining my status in compliance with
                    FATCA/CRS. The Bank is not able to offer any tax advice on
                    FATCA/CRS or its impact. I shall seek advice from
                    professional tax advisor for any tax questions. I certify
                    that I provide the information on this form and to the best
                    of my knowledge and belief the certification is true,
                    correct, and complete including the taxpayer identification
                    number/functional equivalent number of the applicant.
                  </label>
                </div>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="d-flex justify-content-center mt-32">
                <button
                  type="button"
                  className="btn text-white border  text-md px-56 py-12 radius-8 mt-32"
                  style={{
                    background: "#413B6B",
                  }}
                  onClick={handleNext}
                >
                  Submit
                </button>
              </div>
            </div>

            {/* PAN CARD */}
            <div className="row mt-40">
              <div className="col-sm-4">
                <div className="col">
                  <label className="form-label">PAN Number<span className="text-danger-500">*</span></label>
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control wizard-required"
                      required
                    />
                    <div className="wizard-form-error" />
                  </div>
                </div>
                <div className="col">
                  <label className="form-label">PAN Name<span className="text-danger-500">*</span></label>
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control wizard-required"
                      required
                    />
                    <div className="wizard-form-error" />
                  </div>
                </div>
                <div className="col">
                  <label className="form-label">PAN DOB<span className="text-danger-500">*</span></label>
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control wizard-required"
                      required
                    />
                    <div className="wizard-form-error" />
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <img
                  src="https://mybillbook.in/blog/wp-content/uploads/2024/02/pan-card.webp"
                  className="img-thumbnail"
                />
              </div>
            </div>
            <div className="row mt-16">
              <h6 className="form-label fs-5" style={{color: "#413B6B",}}>Nominee Details</h6>
              <div className="col-sm-4">
                <label className="form-label">Nominee Name<span className="text-danger-500">*</span></label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control wizard-required"
                    required
                  />
                  <div className="wizard-form-error" />
                </div>
              </div>
              <div className="col-sm-4">
                <label className="form-label">Nominee DOB<span className="text-danger-500">*</span></label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control wizard-required"
                    required
                  />
                  <div className="wizard-form-error" />
                </div>
              </div>

              <div className="col-sm-4">
                <label className="form-label">Relation with Customer<span className="text-danger-500">*</span> </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control wizard-required"
                    required
                  />
                  <div className="wizard-form-error" />
                </div>
              </div>

              <div className="row mt-12">
                <div className="col-sm-8">
                  <label className="form-label">Address<span className="text-danger-500">*</span> </label>
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control wizard-required"
                      required
                    />
                    <div className="wizard-form-error" />
                  </div>
                </div>
                <div className="col-sm-4 d-flex align-items-center">
                  <div className="form-check d-flex align-items-center ">
                    <input
                      className="form-check-input align-start"
                      type="checkbox"
                      name="diffAddress"
                      id="diffAddress"
                    />
                    <label className="form-check-label" htmlFor="diffAddress">
                      Same as Customer
                    </label>
                  </div>
                </div>
              </div>

              <div className="row mt-12">
                <li>
                  “Nomination under section 45ZA of the Banking Regulation Act,
                  1949, and Rule 2(1) of the Banking Companies (Nomination)
                  Rules, 1985 in respect of Bank Deposit.
                </li>
                <li>
                  I/We nominate the following person to whom in the event of
                  my/our death, the deposit in the account(s), particulars where
                  of are given below, may be returned to Fino Payments Bank
                  Branch.”
                </li>
              </div>

              <div className="row mt-12">
                <h6 htmlFor="" className="form-label fs-5" style={{color: "#413B6B",}}>
                  Profile
                </h6>
                <div className="col-sm-3">
                  <label htmlFor="" className="form-label">
                    Profile
                  </label>
                  <div className="d-flex gap-2 ">
                    <div className="bg-neutral-200  px-10 py-12 radius-8">
                      <span className="form-check checked-dark d-flex align-items-center gap-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="profile"
                          id="smart"
                          defaultChecked={true}
                        />
                        <label
                          className="form-check-label line-height-1 fw-medium text-secondary-light"
                          htmlFor="smart"
                        >
                          Smart
                        </label>
                      </span>
                    </div>

                    <div className="bg-neutral-200 px-10 py-12 radius-8">
                      <span className="form-check checked-dark d-flex align-items-center gap-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="profile"
                          id="feature"
                        />
                        <label
                          className="form-check-label line-height-1 fw-medium text-secondary-light"
                          htmlFor="feature"
                        >
                          Feature
                        </label>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <label htmlFor="" className="form-label">
                    Household
                  </label>
                  <div className="d-flex gap-2 ">
                    <div className="bg-neutral-200  px-10 py-12 radius-8">
                      <span className="form-check checked-dark d-flex align-items-center gap-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="household"
                          id="own"
                          defaultChecked={true}
                        />
                        <label
                          className="form-check-label line-height-1 fw-medium text-secondary-light"
                          htmlFor="own"
                        >
                          Own
                        </label>
                      </span>
                    </div>

                    <div className="bg-neutral-200 px-10 py-12 radius-8">
                      <span className="form-check checked-dark d-flex align-items-center gap-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="household"
                          id="family"
                        />
                        <label
                          className="form-check-label line-height-1 fw-medium text-secondary-light"
                          htmlFor="family"
                        >
                          Family
                        </label>
                      </span>
                    </div>

                    <div className="bg-neutral-200 px-10 py-12 radius-8">
                      <span className="form-check checked-dark d-flex align-items-center gap-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="household"
                          id="rented"
                        />
                        <label
                          className="form-check-label line-height-1 fw-medium text-secondary-light"
                          htmlFor="rented"
                        >
                          Rented
                        </label>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-sm-5">
                  <label htmlFor="" className="form-label">
                    Own Vehicle
                  </label>
                  <div className="d-flex gap-2 ">
                    <div className="bg-neutral-200  px-10 py-12 radius-8">
                      <span className="form-check checked-dark d-flex align-items-center gap-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="vehicle"
                          id="twoWheelers"
                          defaultChecked={true}
                        />
                        <label
                          className="form-check-label line-height-1 fw-medium text-sm text-secondary-light"
                          htmlFor="twoWheelers"
                        >
                          2Wheelers
                        </label>
                      </span>
                    </div>

                    <div className="bg-neutral-200 px-10 py-12 radius-8">
                      <span className="form-check checked-dark d-flex align-items-center gap-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="vehicle"
                          id="threeWheelers"
                        />
                        <label
                          className="form-check-label line-height-1 fw-medium text-sm text-secondary-light"
                          htmlFor="threeWheelers"
                        >
                          3Wheelers
                        </label>
                      </span>
                    </div>

                    <div className="bg-neutral-200 px-10 py-12 radius-8">
                      <span className="form-check checked-dark d-flex align-items-center gap-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="vehicle"
                          id="fourWheelers"
                        />
                        <label
                          className="form-check-label line-height-1 fw-medium text-sm text-secondary-light"
                          htmlFor="fourWheelers"
                        >
                          4Wheelers
                        </label>
                      </span>
                    </div>
                    <div className="bg-neutral-200 px-10 py-12 radius-8">
                      <span className="form-check checked-dark d-flex align-items-center gap-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="vehicle"
                          id="none"
                        />
                        <label
                          className="form-check-label line-height-1 fw-medium text-sm text-secondary-light"
                          htmlFor="none"
                        >
                          None
                        </label>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-16">
              <div className="col-sm-4">
                <label className="form-label">Select Category</label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control wizard-required"
                    required
                  />
                  <div className="wizard-form-error" />
                </div>
              </div>
              <div className="col-sm-4">
                <label className="form-label">
                  Earning Members in Household
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control wizard-required"
                    required
                  />
                  <div className="wizard-form-error" />
                </div>
              </div>

              <div className="col-sm-4">
                <label className="form-label">
                  Total Family Income(Per Annum){" "}
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control wizard-required"
                    required
                  />
                  <div className="wizard-form-error" />
                </div>
              </div>
            </div>

            <div className="row mt-16">
              <h6 className="form-label fs-5" style={{color: "#413B6B",}}>Initial Funding</h6>

              <div className="col-sm-4">
                <label className="form-label">
                  <span className="fw-bold">Available Limit for Product:</span>
                  <span className="text-secondary-light">
                    ₹25(Max.), ₹25(Min.) Amount (RS)<span className="text-danger-500">*</span>
                  </span>
                </label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control wizard-required"
                    required
                  />
                  <div className="wizard-form-error" />
                </div>
              </div>
              <div className="col-sm-8 d-flex justify-content-end">
                <button
                  type="button"
                  className="btn text-white border  text-md px-40 py-6 radius-8 mt-32"
                  style={{
                    background: "#413B6B",
                  }}
                  onClick={handleNext}
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="row mt-16">
              <div className="col-sm-12 mt-12 d-flex align-items-center">
                <div className="form-check d-flex align-items-start ">
                  <input
                    className="form-check-input align-start"
                    type="checkbox"
                    name="sweepConsent"
                    id="sweepConsent"
                  />
                  <label className="form-check-label" htmlFor="sweepConsent">
                    I hereby give my consent to Fino Payments Bank for enabling
                    a sweep account facility with Suryoday Small Finance Bank
                    linked with my Fino Bank account. I confirm that the product
                    features have been explained to me in detail and I agree
                    with the same. I also provide my explicit consent to Fino
                    Payments Bank for sharing my KYC information with SSFB.
                  </label>
                </div>
              </div>
              <div className="col-sm-12 mt-12 d-flex align-items-center">
                <div className="form-check d-flex align-items-start ">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="termsConsent"
                    id="termsConsent"
                  />

                  <label className="form-check-label" htmlFor="termsConsent">
                    I accept the <span className="text-decoration-underline fw-semibold" style={{color:"#413B6B"}}>Terms & Conditions</span>  and hereby give my consent
                    to Fino Payments Bank to obtain my details stored with UIDAI
                    for authentication and e-KYC purpose. Fino Payments Bank
                    Ltd. has informed me that my identity information would only
                    be used for Account Opening, DBT seeding and e-Sign purpose,
                    and also informed me that my Aadhaar biometrics will not be
                    stored with the bank.
                  </label>
                </div>
              </div>
            </div>
            <div className="row mt-16">
              <h6 className="form-label fs-5" style={{color: "#413B6B",}}>Authentication</h6>
              <div className="col-sm-4">
                <label className="form-label">Enter Fino Activation Code</label>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control wizard-required"
                    required
                  />
                  <p className="text-sm">
                    Not Received Activation Code yet?{" "}
                    <span className="fw-bold">Resend</span>
                  </p>
                  <div className="wizard-form-error" />
                </div>
              </div>
              <div className="col-sm-2 d-flex align-items-center ">
                <div className="position-relative gap-2">
                  <button
                    className="text-white btn"
                    style={{ background: "#413B6B" }}
                    type="button"
                  >
                    180 sec
                  </button>
                </div>
              </div>
              
              <div className="col-sm-4 d-flex align-items-center ">
                <div className="position-relative gap-2">
                  <button
                    className="text-white  btn"
                    style={{ background: "#413B6B" }}
                    type="button"
                  >
                    <img
                      src="https://i.ibb.co/5xzB85yn/fingerprint-outline-variant.png"
                      alt="fingerprint-outline-variant"
                      border="0"
                      className="w-10 h-8 text-white"
                      style={{ filter: "invert(100%)" }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* PAN option-1 */}
      <div
        className="modal fade"
        id="exampleModalEdit"
        tabIndex={-1}
        aria-labelledby="exampleModalEditLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl ">
          <div className="modal-content radius-16 bg-base">
            <div className="modal-header py-16 px-24 border border-top-0 border-start-0 border-end-0">
              <div className=" row d-flex align-items-center flex-wrap  mt-12">
                <div className="form-check checked-primary d-flex align-items-center gap-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="modalResidentStatus"
                    id="modalResidentIndia"
                    checked={!outsider}
                    onChange={() => setOutsider(false)}
                  />
                  <label
                    className="form-check-label line-height-1 fw-medium text-secondary-light"
                    htmlFor="modalResidentIndia"
                  >
                    I am tax resident of India
                  </label>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="modalResidentStatus"
                    id="modalResidentOutside"
                    checked={outsider}
                    onChange={() => setOutsider(true)}
                  />
                  <label
                    className="form-check-label line-height-1 fw-medium text-secondary-light"
                    htmlFor="modalResidentOutside"
                  >
                    I am tax resident of outside India
                  </label>
                </div>
                <div className="row mt-12">
                  {outsider && (
                    <>
                      <div className="col-sm-6">
                        <label className="form-label">Country of Birth<span className="text-danger-500">*</span></label>
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control wizard-required"
                            required
                          />
                          <div className="wizard-form-error" />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label">Country Name<span className="text-danger-500">*</span></label>
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control wizard-required"
                            required
                          />
                          <div className="wizard-form-error" />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label">
                          Tax Identification Number<span className="text-danger-500">*</span>
                        </label>
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control wizard-required"
                            required
                          />
                          <div className="wizard-form-error" />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label">
                          Identification Type<span className="text-danger-500">*</span>
                        </label>
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control wizard-required"
                            required
                          />
                          <div className="wizard-form-error" />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label">Address Type<span className="text-danger-500">*</span> </label>
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control wizard-required"
                            required
                          />
                          <div className="wizard-form-error" />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <label htmlFor="" className="form-label">
                          Address for Tax Purpose<span className="text-danger-500">*</span>
                        </label>
                        <div className="form-check checked-primary d-flex align-items-center gap-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="addressType"
                            id="permanent"
                          />
                          <label
                            className="form-check-label line-height-1 fw-medium text-secondary-light"
                            htmlFor="permanent"
                          >
                            Permanent
                          </label>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="addressType"
                            id="communication"
                          />
                          <label
                            className="form-check-label line-height-1 fw-medium text-secondary-light"
                            htmlFor="communication"
                          >
                            Communication
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="col-sm-12 mt-12">
                  <label
                    className="form-check-label line-height-2 fw-medium text-secondary-light"
                    htmlFor="horizontal1"
                  >
                    I understand that the Bank is relying on this information
                    for the purpose of determining my status in compliance with
                    FATCA/CRS. The Bank is not able to offer any tax advice on
                    FATCA/CRS or its impact. I shall seek advice from
                    professional tax advisor for any tax questions. I certify
                    that I provide the information on this form and to the best
                    of my knowledge and belief the certification is true,
                    correct, and complete including the taxpayer identification
                    number/functional equivalent number of the applicant.
                  </label>
                </div>
              </div>
            </div>

            <div className="col-sm-12">
              <div className="d-flex justify-content-center my-32">
                <button
                  type="button"
                  className="btn text-white border  text-md px-56 py-12 radius-8 mt-32"
                  style={{
                    background: "#413B6B",
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form 60*/}
      <div
        className="modal fade "
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl ">
          <div className="modal-content radius-16 bg-base">
            <div className="modal-body py-16 px-24 border border-top-0 border-start-0 border-end-0">
              <p className="text-center fw-bold text-blank fs-5">
                Income-tax Rules, 1962 <br />
                FORM No. 60 <br />
                [See second proviso to rule 114B]
              </p>
              <p className="text-center fw-bold text-blank fs-5">
                Form for declaration to be filed by an individual or a person
                (not being a company <br /> or firm) who does not have a
                permanent account number and who enters into any
                <br /> transaction specified in rule 114B
              </p>
              <div className="row ">
                <div className="col-sm-4">
                  <label className="form-label">01. First Name</label>
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control wizard-required"
                      required
                    />
                    <div className="wizard-form-error" />
                  </div>
                </div>
                <div className="col-sm-4">
                  <label className="form-label">Middle Name</label>
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control wizard-required"
                      required
                    />
                    <div className="wizard-form-error" />
                  </div>
                </div>
                <div className="col-sm-4">
                  <label className="form-label">Surname</label>
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control wizard-required"
                      required
                    />
                    <div className="wizard-form-error" />
                  </div>
                </div>
              </div>
              <div className="row mt-12">
                <div className="col-sm-8">
                  {" "}
                  <label className="form-label">
                    02. Date of Birth/Incorporation of Declarant:
                  </label>
                </div>
                <div className="col-sm-4">
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control wizard-required"
                      required
                    />
                    <div className="wizard-form-error" />
                  </div>
                </div>
              </div>
              <div className="row mt-12">
                <div className="col-sm-12">
                  <div className="position-relative">
                    <label className="form-label">
                      03. Father’s/Husband’s Name (in case of individual):
                    </label>
                    <input
                      type="text"
                      className="form-control wizard-required"
                      required
                    />
                    <div className="wizard-form-error" />
                  </div>
                </div>
              </div>
              <div className="row mt-12">
                <div className="col-sm-12">
                  <div className="position-relative">
                    <label className="form-label">04. Address:</label>
                    <input
                      type="text"
                      className="form-control wizard-required"
                      required
                    />
                    <div className="wizard-form-error" />
                  </div>
                </div>
              </div>
              <div className="row mt-12">
                <div className="col-sm-4">
                  <label className="form-label">05. Town/City</label>
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control wizard-required"
                      required
                    />
                    <div className="wizard-form-error" />
                  </div>
                </div>
                <div className="col-sm-4">
                  <label className="form-label">06. District</label>
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control wizard-required"
                      required
                    />
                    <div className="wizard-form-error" />
                  </div>
                </div>
                <div className="col-sm-4">
                  <label className="form-label">07. State</label>
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control wizard-required"
                      required
                    />
                    <div className="wizard-form-error" />
                  </div>
                </div>
              </div>
              <div className="row mt-12">
                <div className="col-sm-4">
                  <label className="form-label">08. Pincode</label>
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control wizard-required"
                      required
                    />
                    <div className="wizard-form-error" />
                  </div>
                </div>
                <div className="col-sm-4">
                  <label className="form-label">09. Mobile Number <span className="text-danger-500">*</span></label>
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control wizard-required"
                      required
                    />
                    <div className="wizard-form-error" />
                  </div>
                </div>
              </div>
              <div className="row mt-12">
                <div className="col-sm-8">
                  {" "}
                  <label className="form-label">
                    10. Amount of Transaction (RS.)<span className="text-danger-500">*</span>
                  </label>
                </div>
                <div className="col-sm-4">
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control wizard-required"
                      placeholder="Rs. 25"
                      required
                    />
                    <div className="wizard-form-error" />
                  </div>
                </div>
              </div>
              <div className="row mt-12">
                <div className="col-sm-8">
                  {" "}
                  <label className="form-label">11. Date of Transaction</label>
                </div>
                <div className="col-sm-4">
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control wizard-required"
                      required
                    />
                    <div className="wizard-form-error" />
                  </div>
                </div>
              </div>
              <div className="row mt-12">
                <div className="col-sm-4">
                  {" "}
                  <label className="form-label">12. Mode of Transaction</label>
                </div>
                <div className="col-sm-4">
                  <div className="position-relative gap-2 d-flex">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="agree"
                      id="agree"
                    />
                    <label className="form-check-label" htmlFor="agree">
                      Cash
                    </label>

                    <div className="wizard-form-error" />
                  </div>
                </div>
              </div>
              <div className="row mt-12">
                <div className="col-sm-8">
                  {" "}
                  <label className="form-label">
                    13. Aadhaar Number issued by UIDAI (if available)
                  </label>
                </div>
                <div className="col-sm-4">
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control wizard-required"
                      required
                    />
                    <div className="wizard-form-error" />
                  </div>
                </div>
              </div>
              <div className="row mt-12">
                <div className="col-sm-4">
                  {" "}
                  <label className="form-label">14. If applied for PAN</label>
                </div>
                <div className="col-sm-4">
                  <div className="position-relative gap-2 d-flex">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="agree"
                      id="agree"
                    />
                    <label className="form-check-label" htmlFor="agree">
                      yes
                    </label>

                    <input
                      className="form-check-input"
                      type="radio"
                      name="agree"
                      id="agree"
                    />
                    <label className="form-check-label" htmlFor="agree">
                      no
                    </label>
                  </div>
                </div>

                <div className="row">
                  <div className="row mt-12">
                    <div className="col-sm-8">
                      {" "}
                      <label className="form-label">
                        a). Agricultural income (Rs.)<span className="text-danger-500">*</span>
                      </label>
                    </div>
                    <div className="col-sm-4">
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control wizard-required"
                          required
                        />
                        <div className="wizard-form-error" />
                      </div>
                    </div>
                  </div>

                  <div className="row mt-12">
                    <div className="col-sm-8">
                      {" "}
                      <label className="form-label">
                        b) Other than agricultural income (Rs.)<span className="text-danger-500">*</span>
                      </label>
                    </div>
                    <div className="col-sm-4">
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control wizard-required"
                          required
                        />
                        <div className="wizard-form-error" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-12">
                <label className="form-label">
                  15. Details of document being produced in support of identity
                  in Column 1
                </label>
                <div className="row d-flex justify-content-between">
                  <div className="col-sm-4">
                    <label className="form-label">Document Code</label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control wizard-required"
                        required
                      />
                      <div className="wizard-form-error" />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <label className="form-label">
                      Document identification number
                    </label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control wizard-required"
                        required
                      />
                      <div className="wizard-form-error" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <label className="form-label">
                      Name and address of the authority issuing the document <span className="text-danger-500">*</span>
                    </label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control wizard-required"
                        required
                      />
                      <div className="wizard-form-error" />
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="row mt-12">
                <label className="form-label">
                  16. Details of document being produced in support of identity
                  in Column 4 to 13
                </label>
                <div className="row d-flex justify-content-between">
                  <div className="col-sm-4">
                    <label className="form-label">Document Code</label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control wizard-required"
                        required
                      />
                      <div className="wizard-form-error" />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <label className="form-label">
                      Document identification number
                    </label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control wizard-required"
                        required
                      />
                      <div className="wizard-form-error" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <label className="form-label">
                      Name and address of the authority issuing the document <span className="text-danger-500">*</span>
                    </label>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control wizard-required"
                        required
                      />
                      <div className="wizard-form-error" />
                    </div>
                  </div>
                </div>

                <div className="row mx-auto">
                  <p className="form-label fw-bold text-center fs-4">
                    Declaration
                  </p>

                  <div className="row d-flex align-items-center">
                    I,
                    <div className="col-sm-10">
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control wizard-required"
                          required
                        />
                        <div className="wizard-form-error" />
                      </div>
                    </div>
                    do hereby declare
                    <div className="row">
                      that what is stated above is true to the best of my
                      knowledge and belief. I further declare that I do not have
                      a Permanent Account Number and my/our estimated total
                      income (including income of spouse, minor child etc. as
                      per section 64 of the Income-tax Act, 1961) computed in
                      accordance with the provisions of Income-tax Act, 1961 for
                      the financial year in which the above transaction is held
                      will be less than the maximum amount not chargeable to
                      tax.
                    </div>
                  </div>

                  <div className="row d-flex align-items-center mt-16">
                    Verified today, the
                    <div className="col-sm-4">
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control wizard-required"
                          required
                        />
                        <div className="wizard-form-error" />
                      </div>
                    </div>
                    Day of
                    <div className="col-sm-4">
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control wizard-required"
                          required
                        />
                        <div className="wizard-form-error" />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-16">
                    Date
                    <div className="col-sm-4">
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control wizard-required"
                          required
                        />
                        <div className="wizard-form-error" />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-16">
                    Place
                    <div className="col-sm-4">
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control wizard-required"
                          required
                        />
                        <div className="wizard-form-error" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* row */}
                <div className=" mt-32 d-flex justify-content-end">
                  <p className=" fs-4 fw-bold ">Signature of The Declaration</p>
                </div>

                <div className="row mt-16 mx-auto">
                  {/*  */}
                  <p>
                    Instructions: Documents which can be produced in support of
                    the address are:-
                  </p>
                  <ol style={{ listStyle: "i" }}>
                    <li>Aadhaar Card</li>
                    <li>Ration Card</li>
                    <li>Passport</li>
                    <li> Driving License</li>
                    <li>Identity card issued by any institution</li>
                    <li>
                      Copy of the electricity bill or telephone showing
                      residential address
                    </li>
                    <li>
                      Any document or communication issued by any authority of
                      Central Government, State Government, or local bodies
                      showing residential address.
                    </li>
                    <li>
                      Any other documentary evidence in support of his address
                      given in the declaration.
                    </li>
                  </ol>
                </div>

                <div className="row mt-16 d-flex justify-content-center">
                  <div className="d-flex justify-content-between col-sm-4 gap-4">
                    <button
                      className="btn text-white border fw-bold  text-md px-56 py-12 radius-8 mt-32"
                      style={{ background: "#B8B7BD" }}
                      type="button"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Cancle
                    </button>
                    <button
                      className="btn text-white border  fw-bold text-md px-56 py-12 radius-8 mt-32"
                      style={{ background: "#413B6B" }}
                      type="button"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const FinalScreen = () => {
  return (
    <>
      <ul
          style={{ backgroundColor: "#F1EFFF" }}
          className="nav text-black bordered-tab border border-top-0 border-start-0 border-end-0 d-inline-flex nav-pills mb-16"
          id="pills-tab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link px-16 py-10 ${
                 "pills-home" 
              }`}
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
            
            >
              Products
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={`nav-link px-16 py-10 ${
                 ""
              }`}
              id="pills-details-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-details"
              type="button"
              role="tab"
              aria-controls="pills-details"
              
            >
              Customer Profile
            </button>
          </li>
        </ul>
      <div className="w-full h-full">
        <div
          className="d-flex flex-column justify-content-center align-items-center line-height-1"
          style={{ color: "#413B6B" }}
        >
          <h6 style={{ color: "#413B6B" }}>Welcome to FINO Payments Bank</h6>
          <p>Date/Time: 23,10,2024 / 16:57:10</p>
          <p>A/c. No : 22122109673</p>
          <p>Cust Id : 123456789</p>
          <p>SMS sent to customer's registered Mobile Number</p>
          <button
            className="btn text-white border  fw-bold text-md px-56 py-12 radius-8 mt-32"
            style={{ background: "#413B6B" }}
            type="button"
          >
            Okay
          </button>
        </div>
      </div>
    </>
  );
};
