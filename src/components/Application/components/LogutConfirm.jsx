import { Modal, Button } from 'react-bootstrap';
import React from 'react';
const DeleteConfirmationModal = ({ show, onHide, onConfirm, title, message }) => {
  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      centered 
      backdrop="static"
      className="fade modal-danger p-8 "
      style={{backdropFilter: "blur(5px)"      }}
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="d-flex align-items-center text-danger">
          <span className='fs-4'>{title}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="py-3">
        <div className="d-flex">
          
          <p className="mb-0 text-primary-light text-center">
            {message}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <div className="d-flex w-100 gap-3">
          <Button 
            variant="outline-neutral-600" 
            onClick={onHide} 
            size="md"
            className="flex-grow-1 rounded-1 p-4 fw-medium"
          >
            Cancel
          </Button>
          <Button 
            variant="danger-600" 
            onClick={onConfirm} 
            size="md"
            className="flex-grow-1 rounded-1 p-4 fw-medium shadow-sm"
          >
            Logout
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};


const LogoutConfirmModal = ({children,onClick}) => {
  const [showModal, setShowModal] = React.useState(false);

  const handleConfirm = () => {
    console.log("Action confirmed!");
    onClick();
    setShowModal(false);
  };
  return (
    <div >
      <span onClick={() => setShowModal(true)}>
        {children}
      </span>

      <DeleteConfirmationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onConfirm={handleConfirm}
        title="Logout Confirmation"
        message="Are you sure you want to perform this action?"
      />
    </div>
  );
};

export default LogoutConfirmModal;
