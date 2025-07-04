import React, { useCallback, useEffect, useState } from "react";
import "flatpickr/dist/flatpickr.min.css";
import { toast,  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddApi({ updateList }) {
  const [name, setName] = useState("");
  const [productName, setProductName] = useState(""); // Added product name state
  const [apiType, setApiType] = useState([]);
  const [formData, setFormData] = useState({
    apitype: "", // Added type field for consistency
    optional1: "",
    optional2: "",
    optional3: "",
    optional4: "",
    optional5: "",
    code: "",
    url: "", // Added url field for consistency
  });
  const [isLoading, setIsLoading] = useState(false);
  const token = sessionStorage.getItem("token");
  const API = `${import.meta.env.VITE_APP_API_KEY}/master/api`;

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleProductNameChange = (e) => {
    // Added product name change handler
    setProductName(e.target.value);
  };
  const clearForm = () => {
    setFormData({
      optional1: "",
      optional2: "",
      optional3: "",
      optional4: "",
      optional5: "",
      code: "",
      url: "", // Added url field for consistency
      apitype: "", // Added type field for consistency
    });
  };

  const addAPI = async () => {
    // Check if 'Product Name' and 'Name' are provided
    if (!productName) {
      toast.error("Product Name is required.");
      return;
    }
    if (!name) {
      toast.error("Name is required.");
      return;
    }

    if (!import.meta.env.VITE_APP_API_KEY) {
      console.error("API key is missing from environment variables.");
      return;
    }

    setIsLoading(true);

    try {
      const formPayload = new FormData();
      formPayload.append("type", "addapi");
      formPayload.append("name", name);
      formPayload.append("product", productName); // Append product name
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
          toast.success("API added successfully.");
          setName("");
          setProductName(""); // Reset product name
          clearForm();
          updateList();

          // Close modal after successful addition
          document.querySelector('[data-bs-dismiss="modal"]').click();
        }
      } else {
        toast.error("Failed to add API. Please try again.");
      }
    } catch (error) {
      const errorMessage = error?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const getApiType = useCallback(async () => {
    const formData = new FormData();
    formData.append("type", "gettype");

    if (!import.meta.env.VITE_APP_API_KEY) {
      console.error("API key is missing from environment variables.");
      return;
    }

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.statuscode === "ERR") {
          toast.error(responseData.message);
        } else if (responseData.statuscode === "TXN") {
          setApiType(responseData.data);
        }
      } else {
        toast.error("Failed to fetch API type. Please try again.");
      }
    } catch (error) {
      const errorMessage = error?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    }
  }, [API, token]);

  useEffect(() => {
    getApiType();
  }, [getApiType]);

  return (
    <>
      {/* <ToastContainer /> */}
      <button
        type="button"
        className="btn btn-primary text-sm btn-sm d-flex align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#addAPIModal"
      >
        <i className="ri-add-line" />
        Add API
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
                          htmlFor="product"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Product Name
                        </label>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="product"
                          placeholder="Enter Product Name"
                          value={productName}
                          onChange={handleProductNameChange}
                        />
                      </div>
                    </div>
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
                          value={name}
                          onChange={handleNameChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-8">
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

                    <div className="col-sm-4">
                      <div className="mb-20">
                        <label
                          htmlFor="apitype"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Type
                        </label>
                        <select
                          className="form-select form-select-sm w-full radius-8"
                          value={formData.apitype} // Bind to apitype
                          onChange={handleInputChange}
                          id="apitype" // Make sure this matches the property in formData
                          //set defalut to dmt
                        >
                        <option value="">Select Type</option>
                          {apiType.map((data, id) => (
                            <option value={data} key={id}>
                              {data}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    {/* Options Section */}
                    {[
                      "optional1",
                      "optional2",
                      "optional3",
                      "optional4",
                      "optional5",
                    ].map((opt, index) => (
                      <div className="col-sm-6" key={index}>
                        <div className="mb-20">
                          <label
                            htmlFor={opt}
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                          >
                            {`Option ${index + 1}`}
                          </label>
                          <input
                            type="text"
                            className="form-control radius-8"
                            id={opt}
                            placeholder={`Enter Option ${index + 1}`}
                            value={formData[opt]}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    ))}

                    {/* Code Section */}
                    <div className="col-sm-6">
                      <div className="mb-20">
                        <label
                          htmlFor="code"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Code
                        </label>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="code"
                          placeholder="Enter Code"
                          value={formData.code}
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
                      onClick={clearForm}
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

export default AddApi;
