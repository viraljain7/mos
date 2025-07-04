import { Eye } from "lucide-react";
import React, { useCallback, useState } from "react";
import { Modal } from "react-bootstrap";

function ViewSmsModal({ data }) {
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


      const handleClose = useCallback(() => setShowModal(false), []);
      const handleShow = useCallback(() => setShowModal(true), []);
    
      const [showModal, setShowModal] = useState(false);



  return (
    <>
      <div className="mx-4">
      <button
        type="button"
        className="w-32-px h-32-px me-8  bg-success-focus text-success-600 bg-hover-success-200 rounded-circle d-inline-flex align-items-center justify-content-center"
        onClick={handleShow}
      >
      {/*bg-success-focus text-success-600 bg-hover-success-200 */}
      {/* bg-primary-light text-primary-600 bg-hover-primary-200*/}
      {/* bg-danger-focus bg-hover-danger-200 bg-hover-danger-200*/}
        <Eye size={18} />
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
                 Sms Master Details
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
disabled                    />
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
disabled                    />
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
disabled                    />
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
disabled                    />
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
disabled                    />
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
disabled                    />
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
disabled                    />
                  </div>
                </div>
              </div>
            </div>

          
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ViewSmsModal;
