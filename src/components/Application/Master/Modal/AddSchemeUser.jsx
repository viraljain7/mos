import React, { useState } from "react";
import "flatpickr/dist/flatpickr.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddSchemeUser({ onSuccess }) {
  const [name, setName] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const token = sessionStorage.getItem("token");

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await addUser(); // Call the addUser function
    }
  };

  const addUser = async (e) => {
    if (e) e.preventDefault();

    // Basic validation
    if (!name) {
      toast.error("name is required.");
      return;
    }

    const API = `${import.meta.env.VITE_APP_API_KEY}/master/scheme`;
    if (!import.meta.env.VITE_APP_API_KEY) {
      console.error("API key is missing from environment variables.");
      return;
    }

    setIsLoading(true);

    try {
      const formPayload = new FormData();
      formPayload.append("type", "add");
      formPayload.append("name", name);

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
          setName("");
          onSuccess?.();

          // Close modal after successful addition
          document.querySelector('[data-bs-dismiss="modal"]').click();
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

  return (
    <>
      {/* <ToastContainer /> */}
      <button
        type="button"
        className="btn btn-primary text-sm btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#addSchemeUserModal"
      >
        <i className="ri-add-line" />
        Add Scheme
      </button>

      <div
        className="modal fade"
        id="addSchemeUserModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm modal-dialog-centered">
          <div className="modal-content radius-16 bg-base">
            <div className="card h-100">
              <div className="card-body p-16">
                <form onSubmit={addUser}>
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="mb-20">
                        <label
                          htmlFor="username"
                          className="form-label fw-semibold text-primary-light text-sm mb-8"
                        >
                          Scheme Name
                        </label>
                        <input
                          type="text"
                          className="form-control radius-8"
                          id="username"
                          placeholder="Enter Scheme Name"
                          value={name}
                          onChange={handleInputChange}
                          onKeyDown={handleKeyDown}
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
                      onClick={() => setName("")}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary border border-primary-600 text-md px-40 py-12 radius-8"
                      onClick={addUser}
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

export default AddSchemeUser;
