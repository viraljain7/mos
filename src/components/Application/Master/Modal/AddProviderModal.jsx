import React, { useEffect, useState } from "react";
import "flatpickr/dist/flatpickr.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProviderModal({ updateList }) {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    api_id: "",
    provider_type: "",
  });

  const [apiIdList, setApiIdList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const token = sessionStorage.getItem("token");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const clearFormData = () => {
    setFormData({
      name: "",
      code: "",
      api_id: "",
      provider_type: "",
    });
  };

  const addProvider = async () => {
    const { name, code, api_id, provider_type } = formData;

    if (!name || !code || !api_id || !provider_type) {
      toast.error("Please fill all required fields.");
      return;
    }

    const API = `${import.meta.env.VITE_APP_API_KEY}/master/provider`;

    setIsLoading(true);

    try {
      const formPayload = new FormData();
      formPayload.append("type", "add");
      formPayload.append("name", name);
      formPayload.append("code", code);
      formPayload.append("api_id", api_id);
      formPayload.append("provider_type", provider_type);

      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formPayload,
      });

      const responseData = await response.json();
      if (response.ok) {
        if (responseData.statuscode === "TXN") {
          toast.success(responseData.message);
          clearFormData();
          updateList?.();
          document.querySelector('[data-bs-dismiss="modal"]')?.click();
        } else {
          toast.error(responseData.message);
        }
      } else {
        toast.error("Failed to add provider. Please try again.");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const getApiIds = async () => {
    const API = `${import.meta.env.VITE_APP_API_KEY}/master/api`;

    try {
      const formPayload = new FormData();
      formPayload.append("type", "list");


      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formPayload,
      });

      const responseData = await response.json();

      if (response.ok) {
        if (responseData.statuscode === "TXN") {
            
            const data = responseData.data;
            // const  productNames = data.map(item => item.product);
            setApiIdList(data);
        } else {
          toast.error(responseData.message);
        }
      } else {
        toast.error("Failed to fetch API IDs. Please try again.");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };
  useEffect(() => {
    getApiIds();

  }, []);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary text-sm btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#addProviderModal"
      >
        <i className="ri-add-line pe-4" />
        Add Provider
      </button>
      <div
        className="modal fade"
        id="addProviderModal"
        tabIndex={-1}
        aria-labelledby="addProviderLabel"
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
                          htmlFor="name"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Provider Name{" "}
                          <span className="text-danger-600">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="form-control radius-8"
                          placeholder="Enter Provider Name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="code"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Code <span className="text-danger-600">*</span>
                        </label>
                        <input
                          type="text"
                          id="code"
                          className="form-control radius-8"
                          placeholder="Enter Code"
                          value={formData.code}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="bankName"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          API ID
                          <span className="text-danger-600">*</span>
                        </label>
                        <select
                          className="form-control radius-8 form-select"
                          id="api_id"
                          value={formData.api_id}
                          onChange={handleInputChange}
                        >
                          <option value="" >
                            Select API ID
                          </option>

                          {apiIdList.map((item ) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                          ))}
                        
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="provider_type"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Provider Type{" "}
                          <span className="text-danger-600">*</span>
                        </label>
                        <input
                          type="text"
                          id="provider_type"
                          className="form-control radius-8"
                          placeholder="e.g., payout"
                          value={formData.provider_type}
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
                      onClick={addProvider}
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

export default AddProviderModal;
