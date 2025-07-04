import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WaitModal from "./Recharge/Modal/WaitModal";

export default function CreditCardLayer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [state, setState] = useState({
    rawNumber: "",
    displayNumber: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
    mobile: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("token");

  const formatCardNumber = (value) => {
    const digitsOnly = value.replace(/\D/g, "");
    return digitsOnly.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    if (name === "displayNumber") {
      const rawValue = value.replace(/\D/g, "");
      setState((prev) => ({
        ...prev,
        rawNumber: rawValue,
        displayNumber: formatCardNumber(value),
      }));
      return;
    }

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handlePayment = async () => {
    if (!state.rawNumber || !state.mobile || !state.amount || !state.name) {
      toast.error("Please fill all required fields");
      return;
    }

    if (state.rawNumber.length !== 16) {
      toast.error("Please enter a valid 16-digit card number");
      return;
    }

    if (state.mobile.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    //opening modal;
    setIsModalOpen(true);
    //not working as expected
    // document.getElementById("waitModalBtn").click();

    try {
      const formData = new FormData();
      formData.append("type", "transaction");
      formData.append("number", state.rawNumber);
      formData.append("mobile", state.mobile);
      formData.append("amount", state.amount);
      formData.append("name", state.name);

      const response = await fetch(
        "https://digiphonepay.com/public/api/service/credit-card",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Payment failed");
      }
      // document.getElementById("closeWaitModalBtn").click();
      else {
        if (data.statuscode === "TXN") {
          toast.success(data.data.status || "Payment successful!");

          // Reset form after successful payment
          setState({
            rawNumber: "",
            displayNumber: "",
            expiry: "",
            cvc: "",
            name: "",
            focus: "",
            mobile: "",
            amount: "",
          });
        }else{
          toast.error(data.message || "Payment Failed!");
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h6 className="card-title mb-0">Card Details</h6>
            </div>
            <div className="card-body">
              <div className="row gy-3">
                <div className="col-12">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Card Holder Name"
                    value={state.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Mobile</label>
                  <input
                    type="tel"
                    name="mobile"
                    className="form-control"
                    placeholder="Enter Mobile Number"
                    value={state.mobile}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    maxLength="10"
                    pattern="[0-9]{10}"
                    inputMode="numeric"
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Card Number</label>
                  <div className="input-group">
                    <span className="input-group-text bg-base">
                      <img
                        src="assets/images/card/payment-icon.png"
                        alt="card icon"
                        style={{ width: "24px", height: "16px" }}
                      />
                    </span>
                    <input
                      className="form-control flex-grow-1"
                      placeholder="1234 5678 9012 3456"
                      type="text"
                      name="displayNumber"
                      value={state.displayNumber}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      maxLength={19}
                      inputMode="numeric"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <label className="form-label">Amount</label>
                  <div className="input-group">
                    <span className="input-group-text bg-base w-12 fw-bold">
                      ₹
                    </span>
                    <input
                      type="text"
                      name="amount"
                      className="form-control"
                      placeholder="0.00"
                      value={state.amount}
                      onChange={handleInputChange}
                      onFocus={handleInputFocus}
                      inputMode="decimal"
                    />
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-center gap-3">
                  <button
                    type="button"
                    className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                    onClick={handlePayment}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                      
                        Processing...
                      </>
                    ) : (
                      "Pay"
                    )}
                  </button>
                  <div>
                    <WaitModal modalOpen={isModalOpen} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h6 className="card-title mb-0">Your Card</h6>
            </div>
            <div className="card-body py-40 d-flex justify-content-center">
              <Cards
                number={state.rawNumber}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused={state.focus}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

