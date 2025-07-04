import React, { useState, useEffect } from "react";
// import "flatpickr/dist/flatpickr.min.css";
// import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { Modal } from "react-bootstrap";
function TransferReturnModal({ userData }) {
  let apiType = ["transfer", "return"];
  const [formData, setFormData] = useState({
    amount: "",
    remark: "",
    type: "fundinitiate",
    fundtype: "",
    user_id: userData.id,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [userFieldValue, setUserFieldValue] = useState({
    name: "",
    mobile: "",
    main_balance: "",
    aeps_balance: "",
  });

  const token = sessionStorage.getItem("token");
  const API = `${import.meta.env.VITE_APP_API_KEY}/fund/transaction`;

  useEffect(() => {
    setUserFieldValue({
      name: userData.name || "",
      mobile: userData.mobile || "",
      main_balance: userData.main_balance || "",
      aeps_balance: userData.aeps_balance || "",
    });
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handlerSubmit = async (id) => {
    if (!formData.amount || !formData.fundtype || !formData.remark) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (!API || !token) {
      console.error("API key or token is missing.");
      toast.error("API key or token is missing.");
      return;
    }

    setIsLoading(true);

    const formPayload = new FormData();
    formPayload.append("user_id", id);

    try {
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

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.statuscode === "ERR") {
          toast.error(responseData.message);
        } else if (responseData.statuscode === "TXN") {
          toast.success(responseData.message, {
            toastId: "unique-success-id",
          });
          handleClose();
          setFormData({
            amount: "",
            remark: "",
            type: "fundinitiate",
            fundtype: "",
            user_id: id,
          });
          // Close the modal
        } else {
          toast.error("Unexpected response from the server.");
        }
      } else {
        toast.error("Failed to add API. Please try again.");
      }
    } catch (error) {
      toast.error(error?.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => {
    setShowModal(true);
  };

  return (
    <>
      {/* {
      !showModal &&
      <ToastContainer />
    } */}
      <button
        type="button"
        className="badge text-sm fw-semibold border 
            btn-primary-600 border border-primary-600
            px-20 py-9 radius-4 text-white"
        onClick={handleShow}
      >
        Transfer
      </button>

      <Modal
        show={showModal}
        onHide={handleClose}
        dialogClassName="modal-right"
        contentClassName="radius-16 bg-base"
        centered
        className="modal right fade"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content radius-16 bg-base">
            <div className="card h-100">
              <div className="card-body p-16">
                <form className="d-flex flex-column h-100">
                  {/* new classss */}
                  <div className="modal-header">
                    <span
                      className="modal-title fw-semibold"
                      id="rightModalLabel"
                    >
                      Transfer Modal
                    </span>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={handleClose}
                    ></button>
                  </div>
                  <div className="modal-body flex-grow-1">
                    {" "}
                    {/* new classss */}
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="mb-20">
                          <label
                            htmlFor="name"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control radius-8"
                            id="name"
                            placeholder="Enter Name"
                            value={userFieldValue.name || ""}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="mb-20">
                          <label
                            htmlFor="Number"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                          >
                            Number
                          </label>
                          <input
                            type="number"
                            className="form-control radius-8"
                            id="Number"
                            placeholder="Enter Number"
                            value={userFieldValue.mobile || ""}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="mb-20">
                          <label
                            htmlFor="parentName"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                          >
                            Parent Name
                          </label>
                          <input
                            type="text"
                            className="form-control radius-8"
                            id="parentName"
                            placeholder="Enter Parent Name"
                            value={"Parent Name"}
                            readOnly
                          />
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="mb-20">
                          <label
                            htmlFor="parentNo"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                          >
                            Parent Number
                          </label>
                          <input
                            type="number"
                            className="form-control radius-8"
                            id="parentNo"
                            placeholder="Enter Parent Number"
                            value={"9009921999"}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="mb-20">
                          <button
                            type="button"
                            className="badge text-md fw-bold border border-primary-600 text-primary-600 bg-transparent radius-4 text-white px-20 py-11 radius-8 form-control"
                          >
                            <RiMoneyRupeeCircleFill /> 
                            Credit Balance - {userFieldValue.main_balance}
                          </button>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="mb-20">
                          <button
                            type="button"
                            className="badge text-md fw-bold border border-primary-600 text-primary-600 bg-transparent radius-4 text-white px-20 py-11 radius-8 form-control"
                          >
                            <RiMoneyRupeeCircleFill /> 
                            Debit Balance - {userFieldValue.aeps_balance}
                          </button>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="mb-20"></div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="mb-20">
                          <label
                            htmlFor="fundtype"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                          >
                            Type
                          </label>
                          <select
                            className="form-control form-select radius-8"
                            id="fundtype"
                            value={formData.fundtype}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Type</option>
                            {apiType.map((type) => (
                              <option value={type} key={type}>
                                {type.charAt(0).toUpperCase() +
                                  String(type).slice(1)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="mb-20">
                          <label
                            htmlFor="amount"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                          >
                            Amount
                          </label>
                          <input
                            type="number"
                            className="form-control radius-8"
                            id="amount"
                            placeholder="Enter Amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-sm-12">
                        <div className="mb-20">
                          <label
                            htmlFor="remark"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                          >
                            Transfer Return Remark
                          </label>
                          <textarea
                            className="form-control radius-8"
                            id="remark"
                            placeholder="Enter Remark"
                            value={formData.remark}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      {/* fundtype ==="return" && <OTP Modal/> */}
                      {formData.fundtype === "return" && (
                        <>
                          {/* OTP Input Field */}
                          <div className="col-sm-12">
                            <div className="mb-3">
                              <label
                                htmlFor="otpInput"
                                className="form-label fw-semibold text-primary-light text-sm mb-1"
                              >
                                OTP
                              </label>
                              <input
                                type="number"
                                className="form-control radius-8"
                                id="otpInput"
                                placeholder="Enter OTP"
                                aria-describedby="otpHelp"
                              />
                            </div>
                          </div>

                          {/* Send OTP Button */}
                          <div class="col-sm-12">
                            {/* Fixes height */}
                            <button
                              type="button"
                              className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                            >
                              Send OTP
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="mt-auto w-100 d-flex gap-2">
                    {/* Close Button (wrapped for consistent width) */}
                    <div className="w-50">
                      <button
                        type="button"
                        className="btn btn-secondary w-100"
                        onClick={handleClose}
                      >
                        Close
                      </button>
                    </div>

                    {/* Submit Button (with loading state) */}
                    <div className="w-50">
                      <button
                        type="button"
                        className="btn btn-primary w-100 d-flex align-items-center justify-content-center"
                        onClick={() => handlerSubmit(userData.id)}
                        disabled={isLoading}
                        aria-busy={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              aria-hidden="true"
                            />
                            Proceeding...
                          </>
                        ) : (
                          "Proceed"
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default TransferReturnModal;
