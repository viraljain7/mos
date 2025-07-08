import React from "react";
import { Modal, Spinner } from "react-bootstrap";

function WaitModal({ modalOpen }) {
  return (
    <Modal
      show={modalOpen}
      backdrop="static"
      keyboard={false}
      centered
      size="md"
      className="p-32"
    >
      <Modal.Body className="radius-16 bg-base">
        <div className="card h-100">
          <div className="card-body p-3 p-lg-5 d-flex flex-column align-items-center justify-content-center">
            <Spinner animation="border" role="status" variant="light">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h5 className="mt-3">Please Wait</h5>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default WaitModal;
