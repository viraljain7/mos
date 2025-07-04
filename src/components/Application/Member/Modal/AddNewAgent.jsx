import { useState } from 'react';
import { Modal, Button,Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

function AddNewAgent() {
  const [show, setShow] = useState(false);

  const onHide = () => setShow(false);
  const onShow=() => setShow(true);


  const [formData, setFormData] = useState({
    companyName: '',
    personName: '',
    email: '',
    mobile: '', 
    city: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onHide();
    toast.success("submitted Form")
    setFormData({
    companyName: '',
    personName: '',
    email: '',
    mobile: '',
    city: ''
    })
    // Handle form submission here
    console.log('Form submitted:', formData);
    setShow(false);
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-primary text-sm btn-sm d-flex align-items-center"
        onClick={onShow}
      >
        {" "}
        <i className="ri-add-line" />
        Add New Agent
      </button>

      <Modal show={show} onHide={onHide}
      dialogClassName="modal-dialog-right "
        contentClassName="h-100"
        backdropClassName="modal-backdrop-right"
      >
        <Modal.Header closeButton>
          <h6>Create New Agent</h6>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                placeholder='Enter Company Name'

              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Person Name</Form.Label>
              <Form.Control
                type="text"
                name="personName"
                value={formData.personName}
                onChange={handleChange}
                required
                placeholder='Enter Your Name'
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder='Enter Email Address'

              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                placeholder='Enter Your Mobile Number'

              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder='Enter Your City'
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <div className="d-flex w-100 gap-8">
          <div className="w-50">
            <Button variant="secondary" onClick={onHide} className="w-100">
              Close
            </Button>
          </div>
          <div className="w-50">
            <Button variant="primary" className="w-100" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
        </Modal.Footer>
      </Modal>


    
    </>
  );
}
export default AddNewAgent;
