import React, { useEffect, useState } from "react";
import { toast,  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function KycManager({ KycStatus, userID }) {
  useEffect(() => {
    return () => toast.dismiss();
  }, []);
  useEffect(() => {
    fetchUser();
  }, [userID]);

  const status_array = ["submitted", "pending", "verified", "rejected"];
  const [selectedStatus, setSelectedStatus] = useState(KycStatus);
  const [isLoading, setIsLoading] = useState(false);
  const token = sessionStorage.getItem("token");
  // At the top of your component
  const API_BASE_URL = import.meta.env.VITE_APP_IMAGE_KEY;

  const [currentUser, setCurrentUser] = useState(null);

  const fetchUser = async () => {
    try {
      const formData = new FormData();
      formData.append("type", "fetchuser");
      formData.append("user_id", userID);

      const response = await fetch(
        `${import.meta.env.VITE_APP_API_KEY}/member/transaction`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await response.json();

      if (response.ok && data.statuscode === "TXN") {
        setCurrentUser(data.data || {});
        console.log(currentUser);

        // Update the status in parent component if needed
      } else {
        console.error("Error!!! :", data.message);
      }
    } catch (error) {
      console.error("Error!!! :", error);
    }
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("type", "kyc");
      formData.append("user_id", userID);
      formData.append("status", selectedStatus.toLowerCase());

      const response = await fetch(
        `${import.meta.env.VITE_APP_API_KEY}/member/transaction`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await response.json();

      if (response.ok && data.statuscode === "TXN") {
        toast.success(data.message || "KYC status updated successfully", {
          autoClose: 5000,
        });
        // Update the status in parent component if needed
      } else {
        toast.error(data.message || "Failed to update KYC status", {
          autoClose: 5000,
        });
        setSelectedStatus(KycStatus); // Revert to original status
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        autoClose: 5000,
      });
      console.error("Error updating KYC status:", error);
      setSelectedStatus(KycStatus); // Revert to original status
    } finally {
      setIsLoading(false);
    }
  };

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  const downloadImage = (imagePath, fileName) => {
    const link = document.createElement("a");
    link.href = `${API_BASE_URL}${imagePath}`;
    link.download = fileName || "download";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <div
        className="tab-pane fade"
        id="pills-kyc-manager"
        role="tabpanel"
        aria-labelledby="pills-kyc-manager-tab"
        tabIndex={0}
      >
        {/* {!isLoading && <ToastContainer position="top-right" />} */}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-12">
              <div className="mb-20">
                <label
                  htmlFor="kycStatus"
                  className="form-label fw-semibold text-primary-light text-sm mb-8"
                >
                  KYC Status <span className="text-danger-600">*</span>
                </label>
                <select
                  className="form-control radius-8 form-select"
                  id="kycStatus"
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  required
                >
                  <option value={KycStatus}>
                    {capitalize(KycStatus)} (current)
                  </option>
                  {status_array
                    .filter((status) => status !== KycStatus)
                    .map((status) => (
                      <option key={status} value={status}>
                        {capitalize(status)}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          {currentUser && (
            <div className="mb-20 d-flex align-items-center justify-content-start gap-8 flex-wrap">
              {/* Aadhar Front */}
              <div className="position-relative" title="Aadhar Card Front">
                <img
                  src={`${API_BASE_URL}${currentUser.aadhar_card_front}`}
                  alt="Aadhar Card Front"
                  className="w-80-px h-80-px rounded-circle flex-shrink-0 me-12 overflow-hidden cursor-pointer"
                  onClick={() =>
                    downloadImage(
                      currentUser.aadhar_card_front,
                      "aadhar_card_front",
                    )
                  }
                />
                <div className="tooltip-text fw-semibold">
                  Aadhar Card Front
                </div>
              </div>

              {/* Aadhar Back */}
              <div className="position-relative" title="Aadhar Card Back">
                <img
                  src={`${API_BASE_URL}${currentUser.aadhar_card_back}`}
                  alt="Aadhar Card Back"
                  className="w-80-px h-80-px rounded-circle flex-shrink-0 me-12 overflow-hidden cursor-pointer"
                  onClick={() =>
                    downloadImage(
                      currentUser.aadhar_card_back,
                      "aadhar_card_back",
                    )
                  }
                />
                <div className="tooltip-text fw-semibold">Aadhar Card Back</div>
              </div>

              {/* Bank Passbook */}
              <div className="position-relative" title="Bank Passbook">
                <img
                  src={`${API_BASE_URL}${currentUser.bank_passbook}`}
                  alt="Bank Passbook"
                  className="w-80-px h-80-px rounded-circle flex-shrink-0 me-12 overflow-hidden cursor-pointer"
                  onClick={() =>
                    downloadImage(currentUser.bank_passbook, "bank_passbook")
                  }
                />
                <div className="tooltip-text fw-semibold">Bank Passbook</div>
              </div>

              {/* Shop Image */}
              <div className="position-relative" title="Shop Image">
                <img
                  src={`${API_BASE_URL}${currentUser.shop_image}`}
                  alt="Shop Image"
                  className="w-80-px h-80-px rounded-circle flex-shrink-0 me-12 overflow-hidden cursor-pointer"
                  onClick={() =>
                    downloadImage(currentUser.shop_image, "shop_image")
                  }
                />
                <div className="tooltip-text fw-semibold">Shop Image</div>
              </div>

              {/* Consent Form */}
              <div className="position-relative" title="Consent Form">
                <img
                  src={`${API_BASE_URL}${currentUser.consent_form}`}
                  alt="Consent Form"
                  className="w-80-px h-80-px rounded-circle flex-shrink-0 me-12 overflow-hidden cursor-pointer"
                  onClick={() =>
                    downloadImage(currentUser.consent_form, "consent_form")
                  }
                />
                <div className="tooltip-text fw-semibold">Consent Form</div>
              </div>

              {/* PAN Card */}
              <div className="position-relative" title="PAN Card">
                <img
                  src={`${API_BASE_URL}${currentUser.pan_card_pic}`}
                  alt="PAN Card"
                  className="w-80-px h-80-px rounded-circle flex-shrink-0 me-12 overflow-hidden cursor-pointer"
                  onClick={() =>
                    downloadImage(currentUser.pan_card_pic, "pan_card")
                  }
                />
                <div className="tooltip-text fw-semibold">PAN Card</div>
              </div>
            </div>
          )}

          <div className="d-flex align-items-center justify-content-start gap-3">
            <button
              type="submit"
              className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default KycManager;
