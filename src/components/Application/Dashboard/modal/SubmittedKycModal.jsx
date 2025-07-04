import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "flatpickr/dist/flatpickr.min.css";
import "react-toastify/dist/ReactToastify.css";
import useUserProfileDetails from "../../hooks/useUserProfileDetails";
import { LogOut } from "lucide-react";
import useLogoutAndHomeRedirect from "../../hooks/useLogoutAndHomeRedirect";

function SubmittedKyc({ modalOpen }) {
  const { user } = useUserProfileDetails();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(modalOpen);
  }, [modalOpen]);

  const handleClose = () => setShowModal(false);
  const handleLogout = () => {
    useLogoutAndHomeRedirect();
    handleClose();
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Body className="radius-16 bg-base p-0">
          <div className="card h-100 p-32">
            <KycReviewModal user={user} onLogout={handleLogout} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SubmittedKyc;

const KycReviewModal = ({ onLogout }) => {
  return (
    <div className="card-body p-16 text-center">
      <div className={`spinner-border`} role="status">
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