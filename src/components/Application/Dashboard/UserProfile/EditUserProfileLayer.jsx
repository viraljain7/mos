import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditUserProfileLayer({ currentUser, onClose }) {
  const API = `${import.meta.env.VITE_APP_API_KEY}/member/transaction`;
  const token = sessionStorage.getItem("token");
  const userId = currentUser?.id || localStorage.getItem("userId");


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    address: "",
    shopname: "",
    pancard: "",
    aadharcard: "",
    profileImage: null,
    imagePreview: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form data
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        mobile: currentUser.mobile || "",
        dob: currentUser.dob || "",
        address: currentUser.address || "",
        shopname: currentUser.shopname || "",
        pancard: currentUser.pancard || "",
        aadharcard: currentUser.aadharcard || "",
        profileImage: null,
        imagePreview: currentUser.profile_image || "",
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          profileImage: e.target.files[0],
          imagePreview: event.target.result,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const validateForm = useCallback(() => {
    const requiredFields = [
      { field: "name", message: "Full name is required" },
      {
        field: "email",
        message: "Email is required",
        validate: (value) => {
          if (!value) return "Email is required";
          if (!/^\S+@\S+\.\S+$/.test(value))
            return "Please enter a valid email address";
          return true;
        },
      },
      {
        field: "mobile",
        message: "Phone number is required",
        validate: (value) => {
          if (!value) return "Phone number is required";
          if (!/^\d{10}$/.test(value))
            return "Please enter a valid 10-digit phone number";
          return true;
        },
      },
      { field: "dob", message: "DOB is required" },
      { field: "address", message: "Address is required" },
      { field: "shopname", message: "Shop name is required" },
      {
        field: "pancard",
        message: "PAN card is required",
        validate: (value) => {
          if (!value) return "PAN card is required";
          if (!/^[A-Z]{5}\d{4}[A-Z]{1}$/.test(value))
            return "PAN must be exactly 10 characters (5 letters + 4 digits + 1 letter)";
          return true;
        },
      },
      {
        field: "aadharcard",
        message: "Aadhaar card is required",
        validate: (value) => {
          if (!value) return "Aadhaar card is required";
          if (!/^\d{12}$/.test(value))
            return "Aadhaar must be exactly 12 digits";
          return true;
        },
      },
    ];

    let isValid = true;

    for (const { field, message, validate } of requiredFields) {
      const value = formData[field]?.trim() || "";

      if (validate) {
        const validationResult = validate(value);
        if (validationResult !== true) {
          toast.error(validationResult, { autoClose: 3000, toastId: field });
          isValid = false;
        }
      } else if (!value) {
        toast.error(message, { autoClose: 3000, toastId: field });
        isValid = false;
      }
    }

    return isValid;
  }, [formData]);

  const editProfileHandler = async (e) => {
    e.preventDefault();

    // Clear all previous toasts
    toast.dismiss();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("type", "updateprofile");
      formDataToSend.append("user_id", userId);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("mobile", formData.mobile);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("dob", formData.dob);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("shopname", formData.shopname);
      formDataToSend.append("pancard", formData.pancard);
      formDataToSend.append("aadharcard", formData.aadharcard);

      if (formData.profileImage) {
        formDataToSend.append("profile_image", formData.profileImage);
      }

      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok && data.statuscode === "TXN") {
        toast.success("Profile updated successfully", { autoClose: 3000 });
        if (onClose) onClose();
      } else {
        throw new Error(data.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 3000,
        toastId: "api-error", // Unique ID for this toast
      });
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {/* {
      !isLoading && 
      <ToastContainer />
    } */}

      <h6 className="text-md text-primary-light mb-16">Profile Image</h6>
      {/* Upload Image Start */}
      <div className="mb-24 mt-16">
        <div className="avatar-upload">
          <div className="avatar-edit position-absolute bottom-0 end-0 me-24 mt-16 z-1 cursor-pointer">
            <input
              type="file"
              id="imageUpload"
              accept=".png, .jpg, .jpeg"
              hidden
              onChange={handleImageChange}
            />
            <label
              htmlFor="imageUpload"
              className="w-32-px h-32-px d-flex justify-content-center align-items-center bg-primary-50 text-primary-600 border border-primary-600 bg-hover-primary-100 text-lg rounded-circle"
            >
              <Icon icon="solar:camera-outline" className="icon"></Icon>
            </label>
          </div>
          <div className="avatar-preview">
            <div
              id="imagePreview"
              style={{
                // backgroundImage: `url(${formData.imagePreview})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
        </div>
      </div>
      {/* Upload Image End */}

      <form onSubmit={editProfileHandler}>
        <div className="row">
          <div className="col-sm-6">
            <div className="mb-20">
              <label
                htmlFor="name"
                className="form-label fw-semibold text-primary-light text-sm mb-8"
              >
                Full Name <span className="text-danger-600">*</span>
              </label>
              <input
                type="text"
                className="form-control radius-8"
                id="name"
                placeholder="Enter Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                readOnly={currentUser.kyc === "verified"} // Corrected syntax
              />{" "}
            </div>{" "}
          </div>{" "}
          {/* Other form fields remain the same */} {/* ... */}{" "}
          <div className="col-sm-6">
            <div className="mb-20">
              <label
                htmlFor="email"
                className="form-label fw-semibold text-primary-light text-sm mb-8"
              >
                Email <span className="text-danger-600">*</span>
              </label>
              <input
                type="email"
                className="form-control radius-8"
                id="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                required
                readOnly={currentUser.kyc === "verified"} // Corrected syntax
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mb-20">
              <label
                htmlFor="mobile"
                className="form-label fw-semibold text-primary-light text-sm mb-8"
              >
                Phone <span className="text-danger-600">*</span>
              </label>
              <input
                type="tel"
                className="form-control radius-8"
                id="mobile"
                placeholder="Enter phone number"
                value={formData.mobile}
                onChange={handleChange}
                required
                pattern="[0-9]{10}"
                maxLength="10"
                readOnly={currentUser.kyc === "verified"} // Corrected syntax
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mb-20">
              <label
                htmlFor="dob"
                className="form-label fw-semibold text-primary-light text-sm mb-8"
              >
                DOB
              </label>
              <input
                type="date"
                className="form-control radius-8"
                id="dob"
                placeholder="Enter DOB"
                value={formData.dob}
                onChange={handleChange}
                readOnly={currentUser.kyc === "verified"} // Corrected syntax
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mb-20">
              <label
                htmlFor="address"
                className="form-label fw-semibold text-primary-light text-sm mb-8"
              >
                Address
              </label>
              <input
                type="text"
                className="form-control radius-8"
                id="address"
                placeholder="Enter Address"
                value={formData.address}
                onChange={handleChange}
                readOnly={currentUser.kyc === "verified"} // Corrected syntax
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mb-20">
              <label
                htmlFor="shopname"
                className="form-label fw-semibold text-primary-light text-sm mb-8"
              >
                Shop Name
              </label>
              <input
                type="text"
                className="form-control radius-8"
                id="shopname"
                placeholder="Enter Shop Name"
                value={formData.shopname}
                onChange={handleChange}
                readOnly={currentUser.kyc === "verified"} // Corrected syntax
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mb-20">
              <label
                htmlFor="pancard"
                className="form-label fw-semibold text-primary-light text-sm mb-8"
              >
                PAN Number
              </label>
              <input
                type="text"
                className="form-control radius-8"
                id="pancard"
                placeholder="Enter PAN Number"
                value={formData.pancard}
                onChange={handleChange}
                readOnly={currentUser.kyc === "verified"} // Corrected syntax
                maxLength={10} // Enforces 10 character limit
                pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mb-20">
              <label
                htmlFor="aadharcard"
                className="form-label fw-semibold text-primary-light text-sm mb-8"
              >
                Aadhaar Number
              </label>
              <input
                type="text"
                className="form-control radius-8"
                id="aadharcard"
                placeholder="Enter Aadhaar Number"
                value={formData.aadharcard}
                onChange={handleChange}
                readOnly={currentUser.kyc === "verified"} // Corrected syntax
                maxLength={12} // Enforces 16 digit limit
                pattern="[0-9]{12}"
                inputMode="numeric"
              />
            </div>
          </div>
        </div>
        {/*  */}

        <div className="d-flex align-items-center justify-content-center gap-3">
          <button
            type="button"
            className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </>
  );
}

export default EditUserProfileLayer;
