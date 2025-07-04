import React, { useState } from "react";
import "flatpickr/dist/flatpickr.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddBankAccModal({ updateList }) {
  const [formData, setFormData] = useState({
    bankName: "",
    ifsc: "",
    accountNumber: "",
    branchName: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const token = sessionStorage.getItem("token");

  const handleInputChange = (e, index) => {
    const { id, value } = e.target;

    // Update static fields
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const clearFormData = () => {
    setFormData({
      bankName: "",
      ifsc: "",
      accountNumber: "",
      branchName: "",
    });
  };

  const addUser = async () => {
    const { bankName, ifsc, accountNumber, branchName } = formData;

    // Basic validation
    if (!bankName || !ifsc || !accountNumber || !branchName) {
      toast.error("Please fill all required fields.");
      return;
    }

    const API = `${import.meta.env.VITE_APP_API_KEY}/master/bank`;
    if (!import.meta.env.VITE_APP_API_KEY) {
      console.error("API key is missing from environment variables.");
      return;
    }

    setIsLoading(true);

    try {
      const formPayload = new FormData();
      formPayload.append("type", "addbank");
      formPayload.append("name", bankName);
      formPayload.append("account", accountNumber);
      formPayload.append("ifsc", ifsc);
      formPayload.append("branch", branchName);

      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formPayload,
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.statuscode === "ERR") {
          toast.error(responseData.message);
        } else if (responseData.statuscode === "TXN") {
          toast.success(responseData.message);
          clearFormData();

          updateList();

          // Close modal after successful addition
          document.querySelector('[data-bs-dismiss="modal"]').click();
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
      <button
        type="button"
        className="btn btn-primary text-sm btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#addBankModal"
      >
        <i className="ri-add-line pe-4" />
        Add Bank
      </button>
      <div
        className="modal fade"
        id="addBankModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content radius-16 bg-base">
            <div className="card h-100">
              <div className="card-body p-24">
                <form>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="bankName"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Bank Name
                          <span className="text-danger-600">*</span>
                        </label>
                        <select
                          className="form-control radius-8 form-select"
                          id="bankName"
                          value={formData.bankName}
                          onChange={handleInputChange}
                        >
                          <option value="" disabled>
                            Select bank
                          </option>
                          <option value="SBI">SBI</option>
                          <option value="HDFC">HDFC</option>
                          <option value="AU">AU</option>
                          <option value="ICICI">ICICI</option>
                          <option value="BOB">BOB</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="ifsc"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          IFSC Code <span className="text-danger-600">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="ifsc"
                          placeholder="Enter IFSC Code"
                          value={formData.ifsc}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="accountNumber"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Account Number
                          <span className="text-danger-600">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="accountNumber"
                          placeholder="Enter Account Number"
                          value={formData.accountNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="branchName"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Branch Name
                          <span className="text-danger-600">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="branchName"
                          placeholder="Enter Branch Name"
                          value={formData.branchName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-center gap-3">
                    <button
                      type="button"
                      className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={clearFormData}
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddBankAccModal;
