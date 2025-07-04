import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { IoFilter } from "react-icons/io5";

const FilterAllFundModal = ({ onApplyFilters, currentFilters }) => {
  const [show, setShow] = useState(false);
  const [localFilters, setLocalFilters] = useState(currentFilters);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    handleClose();
  };

  const handleReset = () => {
    setLocalFilters({
      bank: "",
      status: "",
      from_date: "",
      to_date: "",
      search: "",
    });
    onApplyFilters({
      bank: "",
      status: "",
      from_date: "",
      to_date: "",
      search: "",
    });
    handleClose();
  };

  return (
    <>
      <Button
        variant="outline-secondary"
        className="badge text-sm fw-semibold border border-neutral-800 text-neutral-800 bg-transparent px-20 py-9 radius-4"
        onClick={handleShow}
      >
        Filter <IoFilter />
      </Button>

      <Modal show={show} onHide={handleClose} className="right fade">
        <Modal.Header closeButton>
          <h6>Filter By</h6>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Bank</Form.Label>
              <Form.Select
                name="bank"
                value={localFilters.bank}
                onChange={handleInputChange}
              >
                <option value="">All Banks</option>
                <option value="HDFC">HDFC</option>
                <option value="BOB">BOB</option>
                <option value="AU">AU</option>
                <option value="SBI">SBI</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date From</Form.Label>
              <Form.Control
                type="date"
                name="from_date"
                value={localFilters.from_date}
                onChange={handleInputChange}
                className="mb-2"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date To</Form.Label>

              <Form.Control
                type="date"
                name="to_date"
                value={localFilters.to_date}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={localFilters.status}
                onChange={handleInputChange}
              >
                <option value="">All Statuses</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary flex-grow-1" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="primary flex-grow-1" onClick={handleApply}>
            Apply Filters
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FilterAllFundModal;
