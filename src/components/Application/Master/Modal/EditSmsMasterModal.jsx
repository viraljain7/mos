import { SquarePen } from "lucide-react";
import React, { useCallback, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

function EditSmsMasterModal({ data, onSuccess }) {
  const [formData, setFormData] = useState({
    name: data?.name,
    url: data?.url,
    content: data?.content,
    source: data?.source,
    entityid: data?.entityid,
    templateid: data?.templateid,
    apiKey: data?.apikey,
    id:data?.id
  });

  const token = sessionStorage.getItem("token");

    const [isLoading, setIsLoading] = useState(false);
      const handleClose = useCallback(() => setShowModal(false), []);
      const handleShow = useCallback(() => setShowModal(true), []);
    
      const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    const API = `${import.meta.env.VITE_APP_API_KEY}/master/sms`;

    if (!import.meta.env.VITE_APP_API_KEY) {
      console.error("API key is missing from environment variables.");
      return;
    }

    try {
      const formPayload = new FormData();
      formPayload.append("type", "updatesms");
      formPayload.append("sms_id", formData.id);
      formPayload.append("name", formData.name);
      formPayload.append("url", formData.url);
      formPayload.append("apikey", formData.apiKey);
      formPayload.append("source", formData.source);
      formPayload.append("templateid", formData.templateid);
      formPayload.append("entityid", formData.entityid);
      formPayload.append("content", formData.content);

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
          handleClose();
          onSuccess?.();
        }
      } else {
        toast.error("Failed to add user. Please try again.");
      }
    } catch (error) {
      const errorMessage = error?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="mx-4">
      <button
        type="button"
        className="w-32-px h-32-px me-8  bg-primary-light text-primary-600 bg-hover-primary-200 rounded-circle d-inline-flex align-items-center justify-content-center"
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
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title fw-semibold" id="rightModalLabel">
                Edit Sms Master
              </span>
              <button
                type="button"
                className="btn-close"
              
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body flex-grow-1">
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
                      value={formData.name || ""}
                      onChange={handleChange}
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
                      value={formData.url || ""}
                      onChange={handleChange}
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
                      value={formData.source || ""}
                      onChange={handleChange}
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
                      value={formData.content || ""}
                      onChange={handleChange}
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
                      Entity Id
                    </label>
                    <input
                      type="text"
                      className="form-control radius-8"
                      id="entityid"
                      placeholder="Enter Entity Id"
                      value={formData.entityid || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="mb-20">
                    <label
                      htmlFor="templateid"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      Template Id
                    </label>
                    <input
                      type="text"
                      className="form-control radius-8"
                      id="templateid"
                      placeholder="Enter Template Id"
                      value={formData.templateid || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="mb-20">
                    <label
                      htmlFor="apiKey"
                      className="form-label fw-semibold text-primary-light text-sm mb-8"
                    >
                      Api Key
                    </label>
                    <input
                      type="text"
                      className="form-control radius-8"
                      id="apiKey"
                      placeholder="Enter Api Key"
                      value={formData.apiKey || ""}
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
                
                onClick={handleClose}

              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default EditSmsMasterModal;
