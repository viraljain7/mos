import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

function AddNewAgent({ role_name, updateList }) {
  const [show, setShow] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onHide = () => setShow(false);
  const onShow = () => setShow(true);

  const [formData, setFormData] = useState({
    companyName: "",
    personName: "",
    email: "",
    mobile: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = sessionStorage.getItem("token");
      const API = `${import.meta.env.VITE_APP_API_KEY}/member/add_agent`;

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.personName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("mobile", formData.mobile);
      formDataToSend.append("shopname", formData.companyName);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("role_name", role_name);

      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok || data.statuscode === "ERR") {
        throw new Error(data.message || "Failed to add agent");
      }

      if (data.statuscode === "TXN") {
        toast.success(data.message || "Agent added successfully!");
        updateList && updateList();

        // Reset form and close modal
        setFormData({
          companyName: "",
          personName: "",
          email: "",
          mobile: "",
          city: "",
        });
        setShow(false);
      } else {
        throw new Error(data.message || "Unexpected response from server");
      }
    } catch (error) {
      console.error("Error adding agent:", error);
      toast.error(error.message || "Failed to add agent");
    } finally {
      setIsSubmitting(false);
    }
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

      <Modal
        show={show}
        onHide={onHide}
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
                placeholder="Enter Company Name"
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
                placeholder="Enter Your Name"
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
                placeholder="Enter Email Address"
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
                placeholder="Enter Your Mobile Number"
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
                placeholder="Enter Your City"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex w-100 gap-8">
            <div className="w-50">
              <Button
                variant="secondary"
                onClick={onHide}
                className="w-100"
                disabled={isSubmitting}
              >
                Close
              </Button>
            </div>
            <div className="w-50">
              <Button
                variant="primary"
                className="w-100"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddNewAgent;
