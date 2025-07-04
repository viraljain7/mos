import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const ViewCredentialsModal = ({ data }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [credentials, setCredentials] = useState({
    optional1: data?.optional1,
    optional2: data?.optional2,
    optional3: data?.optional3,
    optional4: data?.optional4,
    optional5: data?.optional5,
    code: data?.code,
  });
  const [eyeOpen, setEyeOpen] = useState(false);
  const toggleEye = () => {
    setEyeOpen(true);
  };

  return (
    <div className="position-relative">
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => {
          setShowTooltip(false);
        }}
        type="button"
        className="btn text-sm btn-sm d-flex align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#viewCredentialsModal"
        onClick={toggleEye}
      >
        {eyeOpen ? <Eye /> : <EyeOff />}
      </button>

      { (showTooltip||eyeOpen) && (
        <div
          className="modal fade"
          id="viewCredentialsModal"
          tabIndex={-1}
          aria-labelledby="viewCredentialsModalLabel"
          aria-hidden="true"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => {
            setShowTooltip(false);
            setEyeOpen(false);
          }}
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
                            Optional 1
                          </label>
                          <input
                            type="text"
                            className="form-control radius-8"
                            id="name"
                            placeholder="**************************************"
                            value={credentials.optional1}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="mb-20">
                          <label
                            htmlFor="url"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                          >
                            Optional 2
                          </label>
                          <input
                            type="text"
                            className="form-control radius-8"
                            id="url"
                            placeholder="**************************************"
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
                            Optional 3
                          </label>
                          <input
                            type="text"
                            className="form-control radius-8"
                            id="source"
                            placeholder="**************************************"
                            value={credentials.optional3}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="mb-20">
                          <label
                            htmlFor="content"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                          >
                            Optional 4
                          </label>
                          <input
                            type="text"
                            className="form-control radius-8"
                            id="content"
                            placeholder="**************************************"
                            value={credentials.optional4}
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
                            Optional 5
                          </label>
                          <input
                            type="text"
                            className="form-control radius-8"
                            id="entityid"
                            placeholder="**************************************"
                            value={credentials.optional5}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="mb-20">
                          <label
                            htmlFor="templateid"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                          >
                            Code
                          </label>
                          <input
                            type="text"
                            className="form-control radius-8"
                            id="templateid"
                            placeholder="**************************************"
                            value={credentials.code}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCredentialsModal;
