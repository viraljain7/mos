import { Modal, Button } from 'react-bootstrap';

function WaterBillLayer({show,onHide}) {

  return (
    <>
    
      <Modal show={show} onHide={onHide}
      dialogClassName="modal-dialog-right "
        contentClassName="h-100"
        backdropClassName="modal-backdrop-right"
      >
        <Modal.Header closeButton>
          <h6>Modal Heading</h6>
        </Modal.Header>
        <Modal.Body>Modal body content goes here.</Modal.Body>
        <Modal.Footer>
        <div className="d-flex w-100 gap-8">
          <div className="w-50">
            <Button variant="secondary" onClick={onHide} className="w-100">
              Close
            </Button>
          </div>
          <div className="w-50">
            <Button variant="primary" onClick={onHide} className="w-100">
              Save Changes
            </Button>
          </div>
        </div>
        </Modal.Footer>
      </Modal>


    
    </>
  );
}
export default WaterBillLayer;