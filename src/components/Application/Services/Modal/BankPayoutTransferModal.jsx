import { BadgeIndianRupee } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function BankPayoutTransferModal({ bankID, updateList, userData }) {
  const payout_id = useSelector((state) => state.QuickTransfer.value);
  const [isLoading, setIsLoading] = useState(false);
  const token = sessionStorage.getItem("token");
  const [userDB, setUserDB] = useState({
    name: "",
    ifsc: "",
    account: "",
    bank: "",
  }); 

  const [formData, setFormData] = useState({
    payoutMethod: "Select Payout Method",
    amount: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { payoutMethod, amount } = formData;
    // Enhanced validation
    if (payoutMethod === "Select Payout Method" || !payoutMethod) {
      toast.error("Please select a valid payout method.");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount greater than zero.");
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
      formPayload.append("type", "transaction");
      formPayload.append("payout_id", payout_id);
      formPayload.append("amount", amount);
      formPayload.append("mode", payoutMethod);

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
          setFormData({
            payoutMethod: "Select Payout Method",
            amount: "",
          });
          // Close the modal
          const closeModal = document.getElementById("closeModal");
          closeModal.click();
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

  // Populate formData when payout_id or userData changes
  useEffect(() => {
    if (userData && payout_id) {
      const selectedUser = userData.find((user) => user.id === payout_id);
      if (selectedUser) {
        setUserDB((prev) => ({
          ...prev,
          bankName: selectedUser.bank || "",
          ifsc: selectedUser.ifsc || "",
          accountName: selectedUser.name || "",
          accountNumber: selectedUser.account || "",
        }));
      }
    }
  }, [payout_id, userData]); // Dependencies: payout_id and userData

  return (
    <>
      <Link
        to="#"
        className="w-32-px h-32-px me-8 bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center justify-content-center"
        data-bs-toggle="modal"
        data-bs-target="#rightModal"
      >
        <BadgeIndianRupee size={30} className="p-4" onClick={bankID} />
      </Link>

      <div
        className="modal right fade"
        id="rightModal"
        tabIndex="-1"
        aria-labelledby="rightModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title fw-semibold" id="rightModalLabel">
                Bank Payout Transfer Modal
              </span>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            {/* our code */}
            <div className="modal-body">
              <div className="row">
                <div className="my-2 col-sm-6">
                  <span className="text-sm fw-bold mb-10" id="rightModalLabel">
                    Bank Name
                  </span>
                  <input
                    type="text"
                    className="form-control form-control-sm fw-semibold"
                    name="bankName"
                    readOnly
                    value={userDB.bankName}
                  />
                </div>

                <div className="my-2 col-sm-6">
                  <span className="text-sm fw-bold mb-10" id="rightModalLabel">
                    IFSC Code
                  </span>
                  <input
                    type="text"
                    name="ifsc"
                    className="form-control form-control-sm fw-semibold"
                    readOnly
                    value={userDB.ifsc}
                    placeholder="Enter IFSC Code"
                  />
                </div>
              </div>
              <div className="row">
                <div className="my-2 col-sm-6">
                  <span className="text-sm fw-bold mb-10" id="rightModalLabel">
                    Account Name
                  </span>
                  <input
                    type="text"
                    name="accountName"
                    className="form-control form-control-sm fw-semibold"
                    readOnly
                    value={userDB.accountName}
                    placeholder="Enter Account Name"
                  />
                </div>

                <div className="my-2 col-sm-6">
                  <span className="text-sm fw-bold mb-10" id="rightModalLabel">
                    Account Number
                  </span>
                  <input
                    type="text"
                    name="accountNumber"
                    className="form-control form-control-sm fw-semibold"
                    readOnly
                    value={userDB.accountNumber}
                    placeholder="Enter Account Number"
                  />
                </div>
              </div>
              <div className="row">
                <div className="my-2 col-sm-6">
                  <span
                    className="text-sm fw-semibold mb-10"
                    id="rightModalLabel"
                  >
                    Payout Method
                  </span>
                  <select
                    className="form-select form-select-sm"
                    name="payoutMethod"
                    value={formData.payoutMethod}
                    onChange={handleChange}
                  >
                    <option value="Select Payout Method" disabled>
                      Select Payout Method
                    </option>
                    <option value="RTGS">RTGS</option>
                    <option value="NEFT">NEFT</option>
                    <option value="IMPS">IMPS</option>
                  </select>
                </div>

                <div className="my-2 col-sm-6">
                  <span
                    className="text-sm fw-semibold mb-10"
                    id="rightModalLabel"
                  >
                    Amount
                  </span>
                  <input
                    type="number"
                    name="amount"
                    className="form-control form-control-sm"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Enter Amount"
                    min={0}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                id="closeModal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BankPayoutTransferModal;
