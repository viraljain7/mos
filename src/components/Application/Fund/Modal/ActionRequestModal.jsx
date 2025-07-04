import React, { useState, useEffect } from "react";
import "flatpickr/dist/flatpickr.min.css";
import { toast  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { Menu } from "lucide-react";
function ActionRequestModal({ filterOnClick, userData, id }) {

  const apiType = ["transfer", "return"];
  const [formData, setFormData] = useState({
    amount: "",
    remark: "",
    type: "fundinitiate",
    fundtype: "",
    user_id: id,
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
    if (id && userData) {
      const user = userData?.[0];
      if (user) {
        setUserFieldValue({
          name: user.name || "",
          mobile: user.mobile || "",
          main_balance: user.main_balance || "",
          aeps_balance: user.aeps_balance || "",
        });
      } else {
        console.error("User not found in userData");
      }
    } else {
      console.error("id or userData is missing");
    }
  }, [id, userData]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const addLabel = async (id) => {
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
          toast.success(responseData.message);
          setFormData({
            amount: "",
            remark: "",
            type: "fundinitiate",
            fundtype: "",
            user_id: id,
          });
          // Close the modal
          document.querySelector('[data-bs-dismiss="modal"]').click();
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

  return (
    <>
      {/* <ToastContainer /> */}
      <button
        type="button"
        className=" w-32-px h-32-px me-8 bg-light text-dark rounded-circle d-inline-flex align-items-center justify-content-center border-2 border-dark"
        data-bs-toggle="modal"
        data-bs-target="#transferModal"
        onClick={filterOnClick}
      >
        <Menu />
      </button>

      <div
        className="modal right fade"
        id="transferModal"
        tabIndex="-1"
        aria-labelledby="rightModalLabel"
        aria-hidden="true"
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
                      Action Modal
                    </span>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
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
                            <RiMoneyRupeeCircleFill /> Credit Balance -{" "}
                            {userFieldValue.main_balance}
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
                              <option value={type} key={type} className="text-capitalize">
                                {type}
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
                    </div>
                  </div>

                  <div className="gap-2 d-flex mt-auto w-100">
                    {/* new classe */}
                    <button
                      type="button"
                      className="btn btn-secondary w-50"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary border border-primary-600 text-md w-50"
                      onClick={() => addLabel(id)}
                      disabled={isLoading}
                    >
                      {isLoading ? "Adding..." : "Add"}
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

export default ActionRequestModal;
