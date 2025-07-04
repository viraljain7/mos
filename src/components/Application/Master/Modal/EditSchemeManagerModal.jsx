import React, { useState, useCallback } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { SquarePen } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

function EditSchemeManagerModal({ data, onSuccess }) {
  const [formData, setFormData] = useState({
    name: data?.name || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const token = sessionStorage.getItem("token");

  const handleClose = useCallback(() => setShowModal(false), []);
  const handleShow = useCallback(() => setShowModal(true), []);

  const handleInputChange = useCallback((e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      name: value,
    }));
  }, []);

  const editUser = useCallback(
    async (e) => {
      e.preventDefault();
      const API = `${import.meta.env.VITE_APP_API_KEY}/master/scheme`;

      if (!formData.name.trim()) {
        toast.error("Please enter a scheme name");
        return;
      }

      setIsLoading(true);

      try {
        const payload = new FormData();
        payload.append("type", "edit");
        payload.append("scheme_id", data?.id);
        payload.append("name", formData.name);

        const response = await fetch(API, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: payload,
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message || "Failed to update scheme");
        }

        if (responseData.statuscode === "ERR") {
          toast.error(responseData.message);
        } else if (responseData.statuscode === "TXN") {
          toast.success(responseData.message);
          handleClose();
          onSuccess?.();
        }
      } catch (error) {
        toast.error(error.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    },
    [data?.id, formData.name, handleClose, token],
  );

  return (
    <>
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

      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        className="radius-16 modal-sm "
      >
        <div className="modal-content radius-16 bg-base ">
          <div className="card h-100">
            <div className="card-body p-16">
              <form onSubmit={editUser}>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="mb-20">
                      <label
                        htmlFor="schemeName"
                        className="form-label fw-semibold text-primary-light text-sm mb-8"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control radius-8"
                        id="schemeName"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        autoFocus
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-center gap-3">
                  <button
                    type="button"
                    className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-40 py-11 radius-8"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary border border-primary-600 text-md px-40 py-12 radius-8"
                    disabled={isLoading || !formData.name.trim()}
                  >
                    {isLoading ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default EditSchemeManagerModal;
