import React, { useState } from "react";
import "flatpickr/dist/flatpickr.min.css";
import { toast,  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddPayoutModal({onSuccess}) {
  const [formData, setFormData] = useState({
    upi_id: "",
    name: "",
    mobile: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const token = sessionStorage.getItem("token");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const addUser = async () => {
    const { name, upi_id, mobile } = formData;

    // Basic validation
    if (!name || !upi_id || !mobile) {
      toast.error("Please fill all required fields.");
      return;
    }

    // Validate mobile number
    if (!/^\d{10}$/.test(mobile)) {
      toast.error("Enter a valid 10-digit mobile number.");
      return;
    }

    const API = `${import.meta.env.VITE_APP_API_KEY}/service/upi-payout`;
    if (!import.meta.env.VITE_APP_API_KEY) {
      console.error("API key is missing from environment variables.");
      return;
    }

    setIsLoading(true);

    try {
      const formPayload = new FormData();
      formPayload.append("type", "addupiid");
      formPayload.append("upi_id", upi_id);
      formPayload.append("name", name);
      formPayload.append("mobile", mobile);
      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formPayload,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        if (responseData.statuscode === "ERR") {
          toast.error(responseData.message);
        } else if (responseData.statuscode === "TXN") {
          toast.success(responseData.message);
          document.querySelector('[data-bs-dismiss="modal"]').click();
          onSuccess?.()
          setFormData({
            upi_id: "",
            name: "",
            mobile: "",
          });
          // Close the modal
        }
      } else {
        toast.error("Failed to add user. Please try again.");
      }
    } catch (error) {
      const errorMessage = error?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <button
        type="button"
        className="btn btn-primary text-sm btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#addBankModal"
      >
        <i className="ri-add-line pe-4" />
        Add UPI
      </button>
      <div
        className="modal right fade"
        id="addBankModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        
              <form>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <span
                        className="modal-title fw-semibold"
                        id="rightModalLabel"
                      >
                        UPI Transfer
                      </span>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                      ></button>
                    </div>
                    <div className="modal-body">
                      {" "}
                      {/* Added modal-body wrapper */}
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="mb-20">
                            <label
                              htmlFor="name"
                              className="form-label fw-semibold text-primary-light text-sm mb-8"
                            >
                              Name
                              <span className="text-danger-600">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control radius-8"
                              id="name"
                              placeholder="Enter Name"
                              value={formData.name}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="mb-20">
                            <label
                              htmlFor="upi_id"
                              className="form-label fw-semibold text-primary-light text-sm mb-8"
                            >
                              UPI ID <span className="text-danger-600">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control radius-8"
                              id="upi_id"
                              placeholder="Enter UPI ID"
                              value={formData.upi_id}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="col-sm-12">
                          <div className="mb-20">
                            <label
                              htmlFor="mobile"
                              className="form-label fw-semibold text-primary-light text-sm mb-8"
                            >
                              Mobile
                            </label>
                            <input
                              type="tel"
                              className="form-control radius-8"
                              id="mobile"
                              placeholder="Enter Mobile Number"
                              value={formData.mobile}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>{" "}
                    {/* End of modal-body */}
                    <div className="modal-footer">
                      {" "}
                      {/* Changed to modal-footer for proper spacing */}
                      <button
                        type="button"
                        className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                        onClick={addUser}
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
        
      </div>
    </>
  );
}

export default AddPayoutModal;
