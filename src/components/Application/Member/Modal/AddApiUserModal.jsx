import React, { useCallback, useEffect, useState } from "react";
import { toast,  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddApiUserModel({ updateList }) {
  const [apiType, setApiType] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    dob: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    shopname: "",
    aadharcard: "",
    pancard: "",
    scheme_id: "",
    role_id: "4",
  });
  const clearFormData = () => {
    setFormData({
      name: "",
      mobile: "",
      email: "",
      dob: "",
      address: "",
      state: "",
      city: "",
      pincode: "",
      shopname: "",
      aadharcard: "",
      pancard: "",
      scheme_id: "",
      role_id: "4",
    });
  };

  const [isLoading, setIsLoading] = useState(false);
  const token = sessionStorage.getItem("token");
  const API = `${import.meta.env.VITE_APP_API_KEY}/member/create`;

  const personalField = [
    { label: "Name", id: "name", type: "text" },
    { label: "Mobile", id: "mobile", type: "text" },
    { label: "Email", id: "email", type: "email" },
    { label: "DOB", id: "dob", type: "date" },
    { label: "Address", id: "address", type: "text" },
    { label: "State", id: "state", type: "text" },
    { label: "City", id: "city", type: "text" },
    { label: "Pincode", id: "pincode", type: "text" },
  ];

  const businessField = [
    { label: "Shop Name", id: "shopname", type: "text" },
    { label: "Aadhar Card", id: "aadharcard", type: "text" },
    { label: "PAN Card", id: "pancard", type: "text" },
  ];

  const validateForm = () => {
    const requiredFields = [
      "name",
      "mobile",
      "email",
      "dob",
      "address",
      "state",
      "city",
      "pincode",
      "shopname",
      "aadharcard",
      "pancard",
      "scheme_id",
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        toast.warn(`Please fill in the ${field.replace("_", " ")}`);
        return false;
      }
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const addLabel = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const formPayload = new FormData();
      Object.keys(formData).forEach((key) => {
        formPayload.append(key, formData[key]);
      });

      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formPayload,
      });

      const responseData = await response.json();


      if (response.ok && responseData.statuscode === "TXN") {
        // alert("Done")
        toast.success(responseData.message);
        clearFormData();
        updateList();
        //close modal
        document.querySelector('[data-bs-dismiss="modal"]').click();
      } else {
        toast.error(responseData.message || "Failed to add API.");
      }
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const APIType = `${import.meta.env.VITE_APP_API_KEY}/master/scheme`;

  const getApiType = useCallback(async () => {
    if (!import.meta.env.VITE_APP_API_KEY) {
      console.error("API key is missing from environment variables.");
      return;
    }

    try {
      const listData = new FormData();
      listData.append("type", "list");

      const response = await fetch(APIType, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: listData,
      });

      const responseData = await response.json();
      if (response.ok && responseData.statuscode === "TXN") {
        setApiType(
          responseData.data.map((item) => ({ id: item.id, name: item.name }))
        );
      } else {
        toast.error(responseData.message || "Failed to fetch API type.");
      }
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred.");
    }
  }, [APIType, token]);

  useEffect(() => {
    getApiType();
  }, [getApiType]);
  return (
    <>
      {/* <ToastContainer /> */}
      <button
        type="button"
        className="btn btn-primary text-sm btn-sm d-flex align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#addAPIModal"
      >
        {" "}
        <i className="ri-add-line" />
        Add Api User
      </button>

      <div
        className="modal fade"
        id="addAPIModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content radius-16 bg-base">
            <div className="card h-100">
              <div className="card-body p-16">
                <form className="row gy-3 needs-validation" onSubmit={addLabel}>
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body row gy-3">
                        <div className="col-md-12">
                          <label
                            htmlFor="scheme_id"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                          >
                            Scheme
                          </label>
                          <select
                            className="form-control form-select radius-8"
                            id="scheme_id"
                            value={formData.scheme_id}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Type</option>
                            {apiType.map((data) => (
                              <option value={data.id} key={data.id}>
                                {data.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="col-lg-12 my-16">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="card-title mb-0">
                          PERSONAL INFORMATION
                        </h5>
                      </div>
                      <div className="card-body row gy-3">
                        {personalField.map((field) => (
                          <div className="col-md-3 col-sm-6" key={field.id}>
                            <label htmlFor={field.id} className="form-label">
                              {field.label}
                            </label>
                            <input
                              type={field.type}
                              id={field.id}
                              className="form-control"
                              value={formData[field.id]}
                              onChange={handleInputChange}
                              placeholder={`Enter ${field.label}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Business Information */}
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="card-title mb-0">
                          BUSINESS INFORMATION
                        </h5>
                      </div>
                      <div className="card-body row gy-3">
                        {businessField.map((field) => (
                          <div className="col-md-4 col-sm-6" key={field.id}>
                            <label htmlFor={field.id} className="form-label">
                              {field.label}
                            </label>
                            <input
                              type={field.type}
                              id={field.id}
                              className="form-control"
                              value={formData[field.id]}
                              onChange={handleInputChange}
                              placeholder={`Enter ${field.label}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-body row gy-3">
                        <div className="col-12 gap-3 d-flex">
                          <button
                            type="button"
                            className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-40 py-11 radius-8"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={clearFormData}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn btn-primary-600 text-md px-40 py-11 radius-8"
                            type="submit"
                            disabled={isLoading}
                          >
                            {isLoading ? "Submitting..." : "Submit"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddApiUserModel;
