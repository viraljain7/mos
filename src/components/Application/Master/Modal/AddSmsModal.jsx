import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddSmsModal({ updateList }) {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    source: "",
    entityid: "",
    templateid: "",
    content: "",
    apikey: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const token = sessionStorage.getItem("token");
  const API = `${import.meta.env.VITE_APP_API_KEY}/master/sms`;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const clearFormData = () => {
    setFormData({
      name: "",
      url: "",
      source: "",
      entityid: "",
      templateid: "",
      content: "",
      apikey: "",
    });
  };

  const addAPI = async () => {
    if (!import.meta.env.VITE_APP_API_KEY) {
      console.error("API key is missing from environment variables.");
      return;
    }

    setIsLoading(true);

    try {
      const formPayload = new FormData();
      formPayload.append("type", "addsms");
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
          clearFormData();

          updateList();
          // Close modal after successful addition
          document.querySelector('[data-bs-dismiss="modal"]').click();
        }
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error?.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary text-sm btn-sm d-flex align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#addAPIModal"
      >
        {" "}
        <i className="ri-add-line" />
        Add SMS
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
                <form>
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
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="url"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          URL
                        </label>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="url"
                          placeholder="Enter URL"
                          value={formData.url}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="source"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Source
                        </label>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="source"
                          placeholder="Enter Source"
                          value={formData.source}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="content"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Content
                        </label>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="content"
                          placeholder="Enter Content"
                          value={formData.content}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="entityid"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Entity ID
                        </label>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="entityid"
                          placeholder="Enter Entity ID"
                          value={formData.entityid}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="templateid"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Template ID
                        </label>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="templateid"
                          placeholder="Enter Template ID"
                          value={formData.templateid}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="apikey"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Api Key
                        </label>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="apikey"
                          placeholder="Enter Template ID"
                          value={formData.apikey}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-center gap-3">
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
                      type="button"
                      className="btn btn-primary border border-primary-600 text-md px-40 py-12 radius-8"
                      onClick={addAPI}
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

export default AddSmsModal;
