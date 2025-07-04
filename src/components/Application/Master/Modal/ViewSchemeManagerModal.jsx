// Master Scheme Edit Modal
import React, { useState } from "react";
import "flatpickr/dist/flatpickr.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  Eye,  } from "lucide-react";

function ViewSchemeManagerModal({ data}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const name = data?.[0]?.name;
 

  
  return (
    <>
      <button
        type="button"
        className="w-32-px h-32-px me-8 bg-success-100 text-success-600 rounded-circle d-inline-flex align-items-center justify-content-center"
        data-bs-toggle="modal"
        data-bs-target="#viewSchemeUserModal"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        
        <Eye size={18} />
      </button>
      {
        <div
          className="modal fade"
          id="viewSchemeUserModal"
          tabIndex={-1}
          aria-labelledby="viewSchemeUserModalLabel"
          aria-hidden="true"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <div className="modal-dialog modal-sm modal-dialog-centered">
            <div className="modal-content radius-16 bg-base">
              <div className="card h-100">
                <div className="card-body p-16">
                  <form>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="mb-20">
                          <label
                            htmlFor="username"
                            className="form-label fw-semibold text-primary-light text-sm mb-8"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control radius-8"
                            id="username"
                            defaultValue={name}
                            
                            disabled
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
      }
    </>
  );
}

export default ViewSchemeManagerModal;
