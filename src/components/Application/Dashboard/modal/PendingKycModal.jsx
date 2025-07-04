import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "flatpickr/dist/flatpickr.min.css";
import "react-toastify/dist/ReactToastify.css";
import useUserProfileDetails from "../../hooks/useUserProfileDetails";
import { LogOut, TriangleAlert } from "lucide-react";
import useLogoutAndHomeRedirect from "../../hooks/useLogoutAndHomeRedirect";
import { toast ,} from "react-toastify";

function PendingKyc({ modalOpen }) {
  const { user } = useUserProfileDetails();
  const [currentModal, setCurrentModal] = useState("kycPending");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(modalOpen);
  }, [modalOpen]);

  const handleClose = () => setShowModal(false);
  const handleLogout = useLogoutAndHomeRedirect;

  const handleKycSubmitSuccess = () => {
    setCurrentModal("kycReview");
  };

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
      size={currentModal === "kycForm" ? "xl" : "lg"}
    >
    {/* {!showModal && <ToastContainer />} */}
      <Modal.Body className="radius-16 bg-base p-0">
        <div className="card h-100 p-32">
          {currentModal === "kycPending" && (
            <KycPendingModal
              user={user}
              onNext={() => setCurrentModal("kycForm")}
            />
          )}
          {currentModal === "kycForm" && (
            <KycFormModal user={user} onSuccess={handleKycSubmitSuccess} />
          )}
          {currentModal === "kycReview" && (
            <KycReviewModal onLogout={handleLogout} />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PendingKyc;

const KycPendingModal = ({ user, onNext }) => {
  return (
    <div className="card-body p-16 text-center">
      <TriangleAlert size={64} color="red" />
      <h6 className="mt-32">Hello, {user?.name}</h6>
      <p className="text-danger-500 fs-4 fw-semibold">
        Your KYC verification is still pending.
      </p>
      <p className="text-muted fs-6 fw-semibold">
        To access all features and services, please complete your KYC process.
        <br />
        This helps us ensure the security and authenticity of your account.
      </p>
      <div className="mt-4">
        <Button variant="primary" onClick={onNext}>
          Complete KYC Now
        </Button>
      </div>
    </div>
  );
};

const KycFormModal = ({ user, onSuccess }) => {
  const API = `${import.meta.env.VITE_APP_API_KEY}/member/transaction`;
  const token = sessionStorage.getItem("token");
  const userId = user?.id;

  const basicDataFields = [
    { id: "name", label: "Full Name", type: "text", disabled: true },
    { id: "mobile", label: "Mobile Number", type: "tel", disabled: true },
    { id: "email", label: "Email", type: "email", disabled: true },
    { id: "role", label: "Role", type: "text", disabled: true },
    { id: "city", label: "City", type: "text", disabled: false },
    { id: "state", label: "State", type: "text", disabled: false },
    { id: "pincode", label: "Pincode", type: "text", disabled: false },
    { id: "pan", label: "PAN Number", type: "text", disabled: false },
    { id: "aadhaar", label: "Aadhaar Number", type: "text", disabled: false },
  ];

  const fileDataFields = [
    { id: "panPhoto", label: "PAN Card Photo" },
    { id: "passbookPhoto", label: "Bank Passbook Photo" },
    { id: "aadhaarFront", label: "Aadhaar Front Photo" },
    { id: "aadhaarBack", label: "Aadhaar Back Photo" },
    { id: "shopPhoto", label: "Shop Photo" },
    { id: "consentForm", label: "Consent Form Photo" },
  ];

  const [basicData, setBasicData] = useState(() =>
    basicDataFields.reduce((acc, field) => ({ ...acc, [field.id]: "" }), {}),
  );

  const [fileData, setFileData] = useState(() =>
    fileDataFields.reduce((acc, field) => ({ ...acc, [field.id]: null }), {}),
  );

  useEffect(() => {
    if (user) {
      setBasicData((prev) => ({
        ...prev,
        name: user?.name || "",
        mobile: user?.mobile || "",
        email: user?.email || "",
        role: user?.role?.name || "",
        city: user?.city || "",
        state: user?.state || "",
        pincode: user?.pincode || "",
        pan: user?.pancard || "",
        aadhaar: user?.aadharcard || "",
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setBasicData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setFileData((prev) => ({ ...prev, [id]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("type", "uploaddocs");
      formData.append("user_id", userId);

      formData.append("pan_card_pic", fileData.panPhoto);
      formData.append("bank_passbook", fileData.passbookPhoto);
      formData.append("aadhar_card_front", fileData.aadhaarFront);
      formData.append("aadhar_card_back", fileData.aadhaarBack);
      formData.append("shop_image", fileData.shopPhoto);
      formData.append("consent_form", fileData.consentForm);

      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.statuscode === "TXN") {
        toast.dismiss();
        toast.success(result.message || "KYC submitted successfully");
        onSuccess();
      } else {
        toast.error(result.message || "KYC submission failed");
      }
    } catch (error) {
      console.error("Error submitting KYC:", error);
      toast.error("An error occurred while submitting KYC");
    }
  };

  return (
    <div className="card-body">
      <form className="row gy-3 needs-validation" onSubmit={handleSubmit}>
        <div className="col-xl-12 my-16">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">KYC INFORMATION</h5>
            </div>
            <div className="card-body row gy-3">
              {basicDataFields.map((field) => (
                <div className="col-md-4 col-sm-12" key={field.id}>
                  <label htmlFor={field.id} className="form-label">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    className="form-control"
                    required
                    value={basicData[field.id]}
                    onChange={handleInputChange}
                    placeholder={`Enter ${field.label}`}
                    disabled={field.disabled}
                  />
                </div>
              ))}

              {fileDataFields.map((field) => (
                <div className="col-md-6 col-sm-12" key={field.id}>
                  <label htmlFor={field.id} className="form-label">
                    {field.label}
                  </label>
                  <input
                    type="file"
                    id={field.id}
                    className="form-control"
                    required
                    onChange={handleFileChange}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="card">
            <div className="card-body row gy-3">
              <div className="col-12 gap-3 d-flex">
                <Button
                  variant="primary"
                  className="text-md px-40 py-11 radius-8 w-100"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const KycReviewModal = ({ onLogout }) => {
  return (
    <div className="card-body p-16 text-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-muted fs-4 fw-semibold mt-16">
        Your KYC has been submitted and is currently under review. <br />
        We'll notify you once the verification process is complete.
      </p>
      <Button
        variant="danger"
        className="text-md px-40 py-11 radius-8"
        onClick={onLogout}
      >
        <LogOut /> logout
      </Button>
    </div>
  );
};