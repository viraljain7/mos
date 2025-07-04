import React from "react";

function Booking() {
  return (
    <div>
      <div className="row gy-4">
        <div className="col-lg-12">
          <div className="card h-100">
            <div className="card-body p-24">
              <ul
                className="nav border-gradient-tab nav-pills mb-20 d-inline-flex  justify-content-center"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link d-flex align-items-center gap-2 fw-semibold text-primary-light radius-4 px-16 py-10 active"
                    id="pills-bus-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-bus"
                    type="button"
                    role="tab"
                    aria-controls="pills-bus"
                    aria-selected="true"
                  >
                    <img
                      className="w-10 h-10 object-fit-cover"
                      src="./assets/images/services/bus.png"
                      alt="Uploaded Preview"
                    />
                    Bus
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link d-flex align-items-center gap-2 fw-semibold text-primary-light radius-4 px-16 py-10"
                    id="pills-train-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-train"
                    type="button"
                    role="tab"
                    aria-controls="pills-train"
                    aria-selected="false"
                    tabIndex={-1}
                  >
                    <img
                      className="w-10 h-10 object-fit-cover"
                      src="./assets/images/services/train.png"
                      alt="Uploaded Preview"
                    />
                    Train
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link d-flex align-items-center gap-2 fw-semibold text-primary-light radius-4 px-16 py-10"
                    id="pills-flight-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-flight"
                    type="button"
                    role="tab"
                    aria-controls="pills-flight"
                    aria-selected="false"
                    tabIndex={-1}
                  >
                    <img
                      className="w-10 h-10 object-fit-cover"
                      src="./assets/images/services/flight.png"
                      alt="Uploaded Preview"
                    />
                    Flight
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link d-flex align-items-center gap-2 fw-semibold text-primary-light radius-4 px-16 py-10"
                    id="pills-hotel-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-hotel"
                    type="button"
                    role="tab"
                    aria-controls="pills-hotel"
                    aria-selected="false"
                    tabIndex={-1}
                  >
                    <img
                      className="w-10 h-10 object-fit-cover"
                      src="./assets/images/services/hotel.png"
                      alt="Uploaded Preview"
                    />
                    Hotel
                  </button>
                </li>
              </ul>

              <div className="tab-content" id="pills-tabContent">
                {/* Bus */}
                <div
                  className="tab-pane fade show active"
                  id="pills-bus"
                  role="tabpanel"
                  aria-labelledby="pills-bus-tab"
                  tabIndex={0}
                >
                  <div className="row  mb-20">
                    {/* From Station Input */}
                    <div className="col-sm ">
                      <div className="">
                        <label
                          htmlFor="from-Station"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          From Station{" "}
                          <span className="text-danger-600">*</span>
                        </label>
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control radius-8"
                            id="from-Station"
                            placeholder="From Station"
                          />
                        </div>
                      </div>
                    </div>
                    {/* swap */}
                    <div className=" d-flex justify-content-center align-items-end col-sm-1  ">
                      <label htmlFor=""></label>
                      <div
                        className="position-relative border rounded-full d-flex justify-content-center align-items-center cursor-pointer"
                        style={{
                          width: "40px",
                          height: "40px",
                        }}
                      >
                        {" "}
                        <img
                          className="w-4 h-4 "
                          src="./assets/images/services/swap.png"
                          alt="Uploaded Preview"
                        />{" "}
                      </div>
                    </div>
                    {/* To Station Input */}
                    <div className="col-sm">
                      <div className="">
                        <label
                          htmlFor="toStation"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          To Station <span className="text-danger-600">*</span>
                        </label>
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control radius-8"
                            id="toStation"
                            placeholder="To Station"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    {/* Travel Date Input */}
                    <div className="col-sm-12">
                      <div className="mb-20">
                        <label
                          htmlFor="travelDate"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Travel Date <span className="text-danger-600">*</span>
                        </label>
                        <div className="position-relative">
                          <input
                            type="date"
                            className="form-control radius-8"
                            id="travelDate"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="d-flex align-items-center justify-content-center gap-3">
                    <button
                      type="button"
                      className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                    >
                      Search
                    </button>
                  </div>
                </div>
                {/* Train */}
                <div
                  className="tab-pane fade"
                  id="pills-train"
                  role="tabpanel"
                  aria-labelledby="pills-train-tab"
                  tabIndex={0}
                >
                  {/* Row 1 */}
                  <div className="row mb-20">
                    {/* From Station Input */}
                    <div className="col-sm">
                      <label
                        htmlFor="fromStation"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        From Station <span className="text-danger-600">*</span>
                      </label>
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="fromStation"
                          placeholder="From Station"
                        />
                      </div>
                    </div>
                    {/* swap */}
                    <div className="col-sm-1 d-flex justify-content-center align-items-end ">
                      <label htmlFor=""></label>
                      <div
                        className="position-relative border rounded-full d-flex justify-content-center align-items-center cursor-pointer"
                        style={{
                          width: "40px",
                          height: "40px",
                        }}
                      >
                        {" "}
                        <img
                          className="w-4 h-4 "
                          src="./assets/images/services/swap.png"
                          alt="Uploaded Preview"
                        />{" "}
                      </div>
                    </div>
                    {/* To Station Input */}
                    <div className="col-sm">
                      <label
                        htmlFor="to-Station"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        To Station <span className="text-danger-600">*</span>
                      </label>
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="to-Station"
                          placeholder="To Station"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="row mb-20">
                    {/* Travel Date Input */}
                    <div className="col-sm-6">
                      <label
                        htmlFor="travelDate"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Travel Date <span className="text-danger-600">*</span>
                      </label>
                      <div className="position-relative">
                        <input
                          type="date"
                          className="form-control radius-8"
                          id="travelDate"
                        />
                      </div>
                    </div>

                    {/* Passenger Input */}
                    <div className="col-sm-6">
                      <label
                        htmlFor="passenger"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Passenger <span className="text-danger-600">*</span>
                      </label>
                      <div className="position-relative">
                        <input
                          min="0"
                          type="number"
                          className="form-control radius-8"
                          id="passenger"
                          placeholder="Enter Number of Passengers"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="row mb-20">
                    {/* Train Class Input */}
                    <div className="col-sm-12">
                      <label
                        htmlFor="trainClass"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Train Class <span className="text-danger-600">*</span>
                      </label>
                      <select
                        className="form-control radius-8 form-select"
                        id="trainClass"
                        defaultValue="Select Class"
                      >
                        <option value="Select Class" disabled>
                          Select Class
                        </option>
                        <option value="First Class">First Class</option>
                        <option value="Second Class">Second Class</option>
                        <option value="Sleeper Class">Sleeper Class</option>
                        <option value="AC 3 Tier">AC 3 Tier</option>
                        <option value="AC 2 Tier">AC 2 Tier</option>
                        <option value="AC 1 Tier">AC 1 Tier</option>
                      </select>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="d-flex align-items-center justify-content-center gap-3">
                    <button
                      type="button"
                      className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                    >
                      Search
                    </button>
                  </div>
                </div>
                {/* Flight */}
                <div
                  className="tab-pane fade"
                  id="pills-flight"
                  role="tabpanel"
                  aria-labelledby="pills-flight-tab"
                  tabIndex={0}
                >
                  {/* Row 1 */}
                  <div className="row mb-20">
                    {/* From Input */}
                    <div className="col-sm">
                      <label
                        htmlFor="flight-from"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        From <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control radius-8"
                        id="flight-from"
                        placeholder="Enter departure city"
                      />
                    </div>
                    {/* swap */}
                    <div className="col-sm-1 d-flex justify-content-center align-items-end ">
                      <label htmlFor=""></label>
                      <div
                        className="position-relative border rounded-full d-flex justify-content-center align-items-center cursor-pointer"
                        style={{
                          width: "40px",
                          height: "40px",
                        }}
                      >
                        {" "}
                        <img
                          className="w-4 h-4 "
                          src="./assets/images/services/swap.png"
                          alt="Uploaded Preview"
                        />{" "}
                      </div>
                    </div>

                    {/* To Input */}
                    <div className="col-sm">
                      <label
                        htmlFor="flight-to"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        To <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control radius-8"
                        id="flight-to"
                        placeholder="Enter destination city"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="row mb-20">
                    {/* Departure Date Input */}
                    <div className="col-sm-6">
                      <label
                        htmlFor="flight-departure-date"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Departure Date{" "}
                        <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control radius-8"
                        id="flight-departure-date"
                      />
                    </div>

                    {/* Flight Type Dropdown */}
                    <div className="col-sm-6">
                      <label
                        htmlFor="flight-cabin-class"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Cabin Class <span className="text-danger-600">*</span>
                      </label>
                      <select
                        className="form-control radius-8 form-select"
                        id="flight-cabin-class"
                        defaultValue="Select Cabin Class"
                      >
                        <option value="Select Cabin Class" disabled>
                          Select Cabin Class
                        </option>
                        <option value="Economy">Economy</option>
                        <option value="Premium Economy">Premium Economy</option>
                        <option value="Business">Business</option>
                        <option value="First Class">First Class</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="row mb-20">
                    {/* Adults Input */}
                    <div className="col-sm-6">
                      <label
                        htmlFor="flight-adults"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Adults <span className="text-danger-600">*</span>
                      </label>
                      <input
                        min="0"
                        type="number"
                        className="form-control radius-8"
                        id="flight-adults"
                        placeholder="Enter number of adults"
                      />
                    </div>

                    {/* Children Input */}
                    <div className="col-sm-6">
                      <label
                        htmlFor="flight-children"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Children <span className="text-danger-600">*</span>
                      </label>
                      <input
                        min="0"
                        type="number"
                        className="form-control radius-8"
                        id="flight-children"
                        placeholder="Enter number of children"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="d-flex align-items-center justify-content-center gap-3">
                    <button
                      type="button"
                      className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                    >
                      Search
                    </button>
                  </div>
                </div>
                {/* Hotel */}
                <div
                  className="tab-pane fade"
                  id="pills-hotel"
                  role="tabpanel"
                  aria-labelledby="pills-hotel-tab"
                  tabIndex={0}
                >
                  {/* Row 1 */}
                  <div className="row mb-20">
                    {/* City Name/Hotel Name Input */}
                    <div className="col-sm-12">
                      <label
                        htmlFor="hotel-city-name"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        City Name/Hotel Name{" "}
                        <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control radius-8"
                        id="hotel-city-name"
                        placeholder="Enter city or hotel name"
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="row mb-20">
                    {/* Check-in Date Input */}
                    <div className="col-sm-6">
                      <label
                        htmlFor="hotel-checkin-date"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Check-in Date <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control radius-8"
                        id="hotel-checkin-date"
                      />
                    </div>

                    {/* Check-out Date Input */}
                    <div className="col-sm-6">
                      <label
                        htmlFor="hotel-checkout-date"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Check-out Date{" "}
                        <span className="text-danger-600">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control radius-8"
                        id="hotel-checkout-date"
                      />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="row mb-20">
                    {/* Adults Input */}
                    <div className="col-sm-6">
                      <label
                        htmlFor="hotel-adults"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Adults <span className="text-danger-600">*</span>
                      </label>
                      <input
                        min="0"
                        type="number"
                        className="form-control radius-8"
                        id="hotel-adults"
                        placeholder="Enter number of adults"
                      />
                    </div>

                    {/* Children Input */}
                    <div className="col-sm-6">
                      <label
                        htmlFor="hotel-children"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Children <span className="text-danger-600">*</span>
                      </label>
                      <input
                        min="0"
                        type="number"
                        className="form-control radius-8"
                        id="hotel-children"
                        placeholder="Enter number of children"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="d-flex align-items-center justify-content-center gap-3">
                    <button
                      type="button"
                      className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                    >
                      Search
                    </button>
                  </div>
                </div>
                {/* hello world */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
