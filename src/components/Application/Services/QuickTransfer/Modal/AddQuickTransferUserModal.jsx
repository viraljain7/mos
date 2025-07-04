import React, { useCallback, useEffect, useMemo, useState } from "react";
import "flatpickr/dist/flatpickr.min.css";
import { toast,  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddQuickTransferUserModal({ onSuccess }) {
  const [formData, setFormData] = useState({
    bankName: "",
    ifsc: "",
    accountNumber: "",
    accountName: "",
    mobile: "",
  });

  const [bankList, setBankList] = useState([]);
  const token = sessionStorage.getItem("token");

  const fetchBankList = useCallback(async () => {
    const formData = new FormData();
    formData.append("type", "allbanks");

    const response = await fetch(
      `${import.meta.env.VITE_APP_API_KEY}/service/payout`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    if (response.ok) {
      const data = await response.json();
      if (data.statuscode === "TXN") {
        setBankList(data.data);
      } else {
        console.error("Unexpected status code:", data.statuscode);
      }
    } else {
      console.error("Failed to fetch bank accounts:", response.status);
    }
  }, [token]);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchBankList();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "bankName") {
      // Find the selected bank in bankList
      const selectedBank = bankList.find((bank) => bank.name === value);

      setFormData((prev) => ({
        ...prev,
        [id]: value,
        ifsc: selectedBank ? selectedBank.ifsc : "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const addUser = async () => {
    const { bankName, ifsc, accountNumber, accountName, mobile } = formData;

    // Basic validation
    if (!bankName || !ifsc || !accountNumber || !accountName || !mobile) {
      toast.error("Please fill all required fields.");
      return;
    }

    // Validate mobile number
    if (!/^\d{10}$/.test(mobile)) {
      toast.error("Enter a valid 10-digit mobile number.");
      return;
    }

    const API = `${import.meta.env.VITE_APP_API_KEY}/service/payout`;
    if (!import.meta.env.VITE_APP_API_KEY) {
      console.error("API key is missing from environment variables.");
      return;
    }

    setIsLoading(true);

    try {
      const formPayload = new FormData();
      formPayload.append("type", "addbank");
      formPayload.append("bank_name", bankName);
      formPayload.append("ifsc", ifsc);
      formPayload.append("account_number", accountNumber);
      formPayload.append("account_name", accountName);
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
        if (responseData.statuscode === "ERR") {
          toast.error(responseData.message);
        } else if (responseData.statuscode === "TXN") {
          toast.success(responseData.message);
          onSuccess?.();
          document.querySelector('[data-bs-dismiss="modal"]').click();

          setFormData({
            bankName: "",
            ifsc: "",
            accountNumber: "",
            accountName: "",
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

  // Memoized bank options to prevent unnecessary re-renders
  const bankOptions = useMemo(() => {
    return bankList.map((bank, index) => (
      <option key={`${bank.ifsc}-${index}`} value={bank.name}>
        {bank.name}
      </option>
    ));
  }, [bankList]);

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
        Add Bank
      </button>
      <div
        className="modal right fade"
        id="addBankModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content radius-16 bg-base">
            <div className="card h-100">
              <div className="card-body ">
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
                          <option value="">Select bank</option>
                          {/* 
                          {bankList.map((bank,index) => 
                          <option key={`${bank.ifsc}-${index}`} value={bank.name}>{bank.name}</option>
                          )} 
                          */}

                          {bankOptions}
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
                          htmlFor="accountName"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Account Name
                          <span className="text-danger-600">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="accountName"
                          placeholder="Enter Account Name"
                          value={formData.accountName}
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
                  <div className="d-flex align-items-center justify-content-center gap-3">
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
