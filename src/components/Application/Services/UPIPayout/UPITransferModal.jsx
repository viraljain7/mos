import { BadgeIndianRupee } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap"; 

function QuickTransferSendMoney({ userData }) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = sessionStorage.getItem("token");

  const [formData, setFormData] = useState({
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    if (!formData.amount || Number(formData.amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsLoading(true);
    try {
      const formPayload = new FormData();
      formPayload.append("type", "transaction");
      formPayload.append("upipayout_id", userData.id);
      formPayload.append("amount", formData.amount);

      const response = await fetch(
        `${import.meta.env.VITE_APP_API_KEY}/service/upi-payout`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formPayload,
        },
      );

      const data = await response.json();

      if (response.ok && data.statuscode === "TXN") {
        toast.success(data.message || "Transaction successful");
        // Close the modal
        setShowModal(false);
        // Reset form
        setFormData({
          amount: "",
        });
      } else {
        toast.error(data.message || "Transaction failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during the transaction");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="w-32-px h-32-px me-8 bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center justify-content-center"
        onClick={() => setShowModal(true)}
        style={{ cursor: "pointer" }}
      >
        <BadgeIndianRupee size={16} />
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="modal right fade"
        aria-labelledby="rightModalLabel"
      >
          <form onSubmit={handleSubmit}>
        <div className="modal-dialog">
            <div className="modal-content ">
              <div className="modal-header">
                <span className="modal-title fw-semibold" id="rightModalLabel">
                  UPI Transfer
                </span>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <div className="row">
                  <div className="my-2 col-sm-6">
                    <span className="text-sm fw-bold mb-10"> Name</span>
                    <input
                      type="text"
                      className="form-control form-control-sm fw-semibold"
                      readOnly
                      value={userData.name || "N/A"}
                    />
                  </div>

                  <div className="my-2 col-sm-6">
                    <span className="text-sm fw-bold mb-10">UPI ID </span>
                    <input
                      type="text"
                      className="form-control form-control-sm fw-semibold"
                      readOnly
                      value={userData.upi_id || "N/A"}
                    />
                  </div>
                </div>
                <div className="row">
                 

                  <div className="my-2 col-sm-12">
                    <span className="text-sm fw-bold mb-10">
                       Number
                    </span>
                    <input
                      type="text"
                      className="form-control form-control-sm fw-semibold"
                      readOnly
                      value={userData.mobile || "N/A"}
                    />
                  </div>
                </div>
                <div className="row">
                

                  <div className="my-2 col-sm-12">
                    <span className="text-sm fw-semibold mb-10">Amount</span>
                    <input
                      type="number"
                      name="amount"
                      className="form-control form-control-sm"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="Enter Amount"
                      min="1"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? <>Processing...</> : "Payment"}
                </button>
              </div>
            </div>
        </div>
          </form>
      </Modal>
    </>
  );
}

export default QuickTransferSendMoney;
