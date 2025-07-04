import { SquarePen } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

function EditApiManagerModal({ data, onSuccess }) {

  const apiId = data?.id;
  const [formData, setFormData] = useState({
    product: data?.product||"",
    name: data?.name||"",
    url: data?.url||"",
    type: data?.type||"",
    code: data?.code||"",
  });
  const [isLoading, setIsLoading] = useState(false);
    const handleClose = useCallback(() => setShowModal(false), []);
    const handleShow = useCallback(() => setShowModal(true), []);
  
    const [showModal, setShowModal] = useState(false);

  const token = sessionStorage.getItem("token");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    const API = `${import.meta.env.VITE_APP_API_KEY}/master/api`;

    if (!import.meta.env.VITE_APP_API_KEY) {
      console.error("API key is missing from environment variables.");
      return;
    }

    // setIsLoading(true);

    try {

      const formPayload = new FormData();
      formPayload.append("type", "update");
      formPayload.append("api_id", apiId);
      formPayload.append("product", formData.product);
      formPayload.append("name", formData.name);
      formPayload.append("url", formData.url);
      formPayload.append("apitype", formData.type);
      formPayload.append("code", formData.code);



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
          // getUserData();
          toast.success(responseData.message);
          // document.querySelector("#closeBtn").click();
          handleClose();
          onSuccess?.();
          setFormData({
            product: "",
            name: "",
            url: "",
            type: "",
            code: "",
          });
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

  const [apiType, setApiType] = useState([]);

  const API = `${import.meta.env.VITE_APP_API_KEY}/master/api`;

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
      <div className="demo-content">
      <button
        type="button"
        className="w-32-px h-32-px me-8 bg-primary-light text-primary-600 bg-hover-primary-200 rounded-circle d-inline-flex align-items-center justify-content-center"
        onClick={handleShow}
      >
      {/*bg-success-focus text-success-600 bg-hover-success-200 */}
      {/* bg-primary-light text-primary-600 bg-hover-primary-200*/}
      {/* bg-danger-focus bg-hover-danger-200 bg-hover-danger-200*/}
        <SquarePen size={18} />
      </button>
      </div>

      <Modal
        show={showModal}
        onHide={handleClose}
        className="radius-16 modal-md right fade"
      >
          <div className="modal-content"
          >
            <div className="modal-header">
              <span className="modal-title fw-semibold" id="rightModalLabel">
                Edit API Manager 
              </span>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body flex-grow-1">
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
                      value={formData.product}
                      onChange={handleChange}
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
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
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
                      onChange={handleChange}
                    />
                  </div>
              
                </div>

                <div className="col-sm-6">
                  <div className="mb-20">
                    <label
                      htmlFor="type"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      API Type
                    </label>
                    <select
                      className="form-control form-select radius-8"
                      id="type"
                      placeholder="Enter API Type"
                      value={formData.type}
                      onChange={handleChange}
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
                <div className="col-sm-12">
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
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                id="closeBtn"
                onClick={handleClose}

              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => handleSubmit(data)}
              >
                Submit
              </button>
            </div>
          </div>
      </Modal>
    </>
  );
}

export default EditApiManagerModal;
