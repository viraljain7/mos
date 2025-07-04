import React from "react";

function CityBankOnboard({ showNextPage }) {
  const onBoardClickHandler = () => {
    showNextPage();
    document.querySelector(".closeBtn").click();
  };
  const personalField = [
    { label: "Title", id: "title", type: "text" },
    { label: "First Name", id: "firstname", type: "text" },
    { label: "Last Name", id: "lastname", type: "text" },
    { label: "Mobile", id: "mobile", type: "text" },
    { label: "Email", id: "email", type: "email" },
    { label: "DOB", id: "dob", type: "date" },
    { label: "Address", id: "address", type: "text" },
    { label: "State", id: "state", type: "text" },
    { label: "City", id: "city", type: "text" },
    { label: "Pincode", id: "pincode", type: "text" },
    { label: "Aadhar Card", id: "aadharcard", type: "text" },
    { label: "PAN Card", id: "pancard", type: "text" },
  ];

  const businessField = [
    { label: "Contact Name", id: "contactname", type: "text" },
    { label: "Legal Name", id: "legalname", type: "text" },
    { label: "Contact Mobile", id: "contactmobile", type: "tel" },
    { label: "Alternate Contact No", id: "alternatecontactno", type: "tel" },
    { label: "Contact Email", id: "contactemail", type: "email" },
    { label: "Brand Name", id: "brandname", type: "tel" },
    { label: "Business Type", id: "businesstype", type: "text" },
    { label: "Category", id: "category", type: "text" },
    { label: "Establish Year", id: "establishyear", type: "date" },
    { label: "Registered Pincode", id: "registeredpincode", type: "text" },
    { label: "Business City", id: "businesscity", type: "text" },
    { label: "Business State", id: "businessstate", type: "text" },
    { label: "Registered Address", id: "registeredaddress", type: "text" },
    { label: "Agreement Date", id: "agreementdate", type: "date" },
  ];

  const bankField = [
    { label: "IFSC", id: "ifsc", type: "text" },
    { label: "Bank", id: "bank", type: "text" },
    { label: "Account Number", id: "accountNumber", type: "text" },
    { label: "Account Type", id: "accounttype", type: "text" },
  ];

  const documentField = [
    {
      label: "Passbook",
      id: "Passbook",
      type: "file",
      text: "Please make sure that passbook pic should be clear and straight",
    },
    {
      label: "Aadhar Pic",
      id: "Aadharpic",
      type: "file",
      text: "Please make sure that aadhar pic contain front side and back side both",
    },
    {
      label: "PAN Pic",
      id: "Panpic",
      type: "file",
      text: "Please make sure that PAN pic should be clear and straight",
    },
  ];
  return (
    <>
      <div className="">
        <button
          type="button"
          className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
          data-bs-toggle="modal"
          data-bs-target="#rightModal"
        >
          Onboard
        </button>
      </div>

      <div
        className="modal right fade "
        id="rightModal"
        tabIndex="-1"
        aria-labelledby="rightModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content overflow-x-hidden">
            <div className="modal-header">
              <span className="modal-title fw-semibold" id="rightModalLabel">
                Onboard
              </span>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            {/* Personal Information */}
            <div className="col-lg-12 my-16">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">PERSONAL INFORMATION</h5>
                </div>
                <div className="card-body row gy-3">
                  {personalField.map((field) => (
                    <div className="col-sm-4 " key={field.id}>
                      <label htmlFor={field.id} className="form-label">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        id={field.id}
                        className="form-control"
                        placeholder={`Enter ${field.label}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="col-lg-12 my-16">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">BUSINESS INFORMATION</h5>
                </div>
                <div className="card-body row gy-3">
                  {businessField.map((field) => (
                    <div className="col-sm-4" key={field.id}>
                      <label htmlFor={field.id} className="form-label">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        id={field.id}
                        className="form-control"
                        placeholder={`Enter ${field.label}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bank Information */}
            <div className="col-lg-12 my-16">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">BANK INFORMATION</h5>
                </div>
                <div className="card-body row gy-3">
                  {bankField.map((field) => (
                    <div className="col-sm-6" key={field.id}>
                      <label htmlFor={field.id} className="form-label">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        id={field.id}
                        className="form-control"
                        placeholder={`Enter ${field.label}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bank Information */}
            <div className="col-lg-12 my-16">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">DOCUMENT INFORMATION</h5>
                </div>
                <div className="card-body row gy-3">
                  {documentField.map((field) => (
                    <div className="col-sm-6" key={field.id}>
                      {/* Dynamic Label */}
                      <label htmlFor={field.id} className="form-label">
                        {field.label}
                      </label>
                      {/* File Input with Unique ID */}
                      <input
                        type={field.type}
                        className="form-control"
                        id={field.id} // Use the unique ID from the field object
                        // onChange={(e) => handleFileChange(e, field.id)} // Pass the field ID to the handler
                      />
                      <p className="text-sm mt-4">{field.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary closeBtn"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onBoardClickHandler}
              >
                Onboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CityBankOnboard;
