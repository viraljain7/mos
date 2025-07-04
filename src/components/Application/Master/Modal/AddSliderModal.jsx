import React, { useCallback, useEffect, useRef, useState } from "react";
import "flatpickr/dist/flatpickr.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddSlider({ updateList }) {
  const [apiType, setApiType] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    type: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const token = sessionStorage.getItem("token");
  const API = `${import.meta.env.VITE_APP_API_KEY}/master/slider`;
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file || null,
    }));
  };

  const clearFormData = () => {
    setFormData({
      name: "",
      image: null,
      type: "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const fetchApiTypes = useCallback(async () => {
    if (!API) {
      toast.error("API key is not configured properly.");
      return;
    }

    try {
      const payload = new FormData();
      payload.append("type", "gettype");

      const response = await fetch(API, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: payload,
      });

      if (response.ok) {
        const { statuscode, message, data } = await response.json();
        if (statuscode === "TXN") setApiType(data || []);
        else toast.error(message || "Failed to fetch API types.");
      } else {
        toast.error("Server error while fetching API types.");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  }, [API, token]);

  const addSlider = async () => {
    if (!API) {
      toast.error("API key is not configured properly.");
      return;
    }

    const { name, type, image } = formData;

    if (!name || !type || !image) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);

    try {
      const payload = new FormData();
      payload.append("type", "addslider");
      payload.append("name", name);
      payload.append("slidertype", type);
      payload.append("sliderimage", image);

      const response = await fetch(API, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: payload,
      });

      if (response.ok) {
        const { statuscode, message } = await response.json();
        if (statuscode === "TXN") {
          toast.success("Slider added successfully.");
          clearFormData();

          updateList();

          // Close modal after successful addition
          document.querySelector('[data-bs-dismiss="modal"]').click();
        } else {
          toast.error(message || "Failed to add slider.");
        }
      } else {
        toast.error("Server error while adding the slider.");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (API) fetchApiTypes();
  }, [fetchApiTypes, API]);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary text-sm btn-sm d-flex align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#addSliderModal"
      >
        <i className="ri-add-line" />
        Add Slider
      </button>

      <div
        className="modal fade"
        id="addSliderModal"
        tabIndex={-1}
        aria-labelledby="addSliderModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content radius-16 bg-base">
            <div className="modal-body p-16">
              <form>
                <div className="row">
                  <div className="col-sm-6 mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter Name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-sm-6 mb-3">
                    <label htmlFor="type" className="form-label">
                      Type
                    </label>
                    <select
                      className="form-select"
                      id="type"
                      value={formData.type}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Select Type
                      </option>
                      {apiType.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 mb-3">
                    <label htmlFor="image" className="form-label">
                      Image
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-center gap-3">
                  <button
                    type="button"
                    className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-40 py-11 radius-8"
                    data-bs-dismiss="modal"
                    onClick={clearFormData}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary text-md px-40 py-11 radius-8"
                    onClick={addSlider}
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
    </>
  );
}

export default AddSlider;
