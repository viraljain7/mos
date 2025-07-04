import React, { useState } from "react";
import "flatpickr/dist/flatpickr.min.css";
import { toast,  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "react-bootstrap";

function LoadWalletRequestModal({ id }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    paymentAmount: "",
    referenceNumber: "",
    depositDate: "",
    paymentMode: "",
    remark: "",
    slip: null
  });
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setFormData({
      paymentAmount: "",
      referenceNumber: "",
      depositDate: "",
      paymentMode: "",
      remark: "",
      slip: null
    });
  };

  const handleShow = () => setShowModal(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      slip: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate form
    if (!formData.paymentAmount || !formData.referenceNumber || !formData.depositDate || 
        !formData.paymentMode || !formData.slip) {
      toast.error("Please fill all required fields");
      setLoading(false);
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const formDataToSend = new FormData();
      formDataToSend.append('type', 'loadwallet');
      formDataToSend.append('fundbank_id', id);
      formDataToSend.append('paymode', formData.paymentMode.toLowerCase());
      formDataToSend.append('amount', formData.paymentAmount);
      formDataToSend.append('ref_id', formData.referenceNumber);
      formDataToSend.append('paydate', formData.depositDate);
      formDataToSend.append('via', 'portal');
      formDataToSend.append('remark', formData.remark || '');
      formDataToSend.append('payslip', formData.slip);

      const response = await fetch(`${import.meta.env.VITE_APP_API_KEY}/fund/transaction`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend
      });

      const result = await response.json();

      if (!response.ok || result.statuscode !== "TXN") {
        throw new Error(result.message || "Failed to submit request");
      }

      toast.success(result.message);
      handleClose();
    } catch (error) {
      console.error("API Error:", error);
      toast.error(error.message || "An error occurred while submitting your request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {/* {!loading &&
      <ToastContainer  autoClose={5000} />
    } */}
      <button className="btn w-100 btn-primary fw-semibold" onClick={handleShow}>
        Request 
      </button>

      <Modal
        show={showModal}
        onHide={handleClose}
        dialogClassName="modal-right"
        contentClassName="radius-16 bg-base"
        centered
        className="modal right fade"
      >
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content radius-16 bg-base">
            <div className="card h-100">
                <form className="d-flex flex-column " onSubmit={handleSubmit}>
                  <div className="modal-header">
                    <span className="modal-title fw-semibold" id="rightModalLabel">
                      Load Wallet Request 
                    </span>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={handleClose}
                      aria-label="Close"
                    ></button>
                  </div>
                  
                  <div className="modal-body flex-grow-1">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="mb-20">
                          <label htmlFor="paymentAmount" className="form-label fw-semibold text-primary-light text-sm mb-8">
                            Payment Amount <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control radius-8"
                            id="paymentAmount"
                            name="paymentAmount"
                            placeholder="Enter amount"
                            value={formData.paymentAmount}
                            onChange={handleChange}
                            required
                            min="1"
                          />
                        </div>
                      </div>

                      <div className="col-sm-12">
                        <div className="mb-20">
                          <label htmlFor="referenceNumber" className="form-label fw-semibold text-primary-light text-sm mb-8">
                            Reference Number <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control radius-8"
                            id="referenceNumber"
                            name="referenceNumber"
                            placeholder="Enter reference number"
                            value={formData.referenceNumber}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-12">
                        <div className="mb-20">
                          <label htmlFor="depositDate" className="form-label fw-semibold text-primary-light text-sm mb-8">
                            Deposit Date <span className="text-danger">*</span>
                          </label>
                          <input
                            type="date"
                            className="form-control radius-8"
                            id="depositDate"
                            name="depositDate"
                            value={formData.depositDate}
                            onChange={handleChange}
                            required
                            max={new Date().toISOString().split('T')[0]} // Can't select future dates
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-12">
                        <div className="mb-20">
                          <label htmlFor="paymentMode" className="form-label fw-semibold text-primary-light text-sm mb-8">
                            Payment Mode <span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-control form-select radius-8"
                            id="paymentMode"
                            name="paymentMode"
                            value={formData.paymentMode}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select Type</option>
                            <option value="imps">IMPS</option>
                            <option value="neft">NEFT</option>
                            <option value="rtgs">RTGS</option>
                            <option value="upi">UPI</option>

                          </select>
                        </div>
                      </div>

                      <div className="col-sm-12">
                        <div className="mb-20">
                          <label htmlFor="remark" className="form-label fw-semibold text-primary-light text-sm mb-8">
                            Remark
                          </label>
                          <textarea
                            className="form-control radius-8"
                            id="remark"
                            name="remark"
                            placeholder="Enter remark"
                            value={formData.remark}
                            onChange={handleChange}
                            rows="3"
                          />
                        </div>
                      </div>

                      <div className="col-sm-12">
                        <div className="mb-20">
                          <label htmlFor="slip" className="form-label fw-semibold text-primary-light text-sm mb-8">
                            Upload Slip <span className="text-danger">*</span>
                          </label>
                          <input
                            type="file"
                            className="form-control radius-8"
                            id="slip"
                            name="slip"
                            onChange={handleFileChange}
                            accept="image/*,.pdf,.doc,.docx"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <div className="row g-2 w-100">
                      <div className="col-sm-6">
                        <button
                          type="button"
                          className="btn btn-secondary w-100"
                          onClick={handleClose}
                          disabled={loading}
                        >
                          Cancel
                        </button>
                      </div>
                      <div className="col-sm-6">
                        <button
                          type="submit"
                          className="btn btn-primary w-100"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              Processing...
                            </>
                          ) : "Submit"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default LoadWalletRequestModal;