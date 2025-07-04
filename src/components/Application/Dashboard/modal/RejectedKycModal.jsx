import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "flatpickr/dist/flatpickr.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Ban, LogOut } from "lucide-react";
import useLogoutAndHomeRedirect from "../../hooks/useLogoutAndHomeRedirect";

function RejectedKycModal({ modalOpen }) {
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
            <KycRejectedModal onLogout={handleLogout} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RejectedKycModal;

const KycRejectedModal = ({ onLogout }) => {
  return (
    <div className="card-body p-16 text-center">
      <Ban size={50} className="text-danger" />
      <p className="text-muted fs-4 fw-semibold mt-16">
        We regret to inform you that your KYC submission was not approved due to
        discrepancies or missing/incomplete information.
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