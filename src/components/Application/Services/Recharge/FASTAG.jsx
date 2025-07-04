import React, { useEffect, useState } from "react";
import { toast,  } from "react-toastify";

function FASTAG() {
  const token = sessionStorage.getItem("token");
  const [operatorList, setOperatorList] = useState([]);
  const [formData, setFormData] = useState({
    fastag_id: "",
    mobile: "",
    number: "",
    amount: "",
    type: "transaction",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchFASTAGOperator = async () => {
    try {
      // Create FormData
      const formData = new FormData();
      formData.append("type", "getoperator");

      const response = await fetch(
        `${import.meta.env.VITE_APP_API_KEY}/service/fastag`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`,
        );
      }

      const result = await response.json();
      if (result.statuscode === "TXN") {
        setOperatorList(result.data);
      }
    } catch (error) {
      console.error("Error fetching FASTAG operators:", error);
      throw error; // Re-throw to let the calling component handle it
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
        const submitFormData = new FormData();
        submitFormData.append("type", "transaction");
        submitFormData.append("fastag_id", formData.fastag_id);
        submitFormData.append("mobile", formData.mobile);
        submitFormData.append("number", formData.number);
        submitFormData.append("amount", formData.amount);

        const response = await fetch(
            `${import.meta.env.VITE_APP_API_KEY}/service/fastag`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: submitFormData,
            }
        );

        const result = await response.json();

        if (!response.ok || result.statuscode !== "TXN") {
            throw new Error(result.message || "Transaction failed");
        }

        if(result.statuscode==="TXN"){
            toast.success(result.message);
            setFormData({
                fastag_id: "",
                mobile: "",
                number: "",
                amount: "",
                type: "transaction",
            });
        }
        // setSuccess("FASTAG recharge successful!");
        // Reset form after successful submission
    
    } catch (error) {
        console.error("Transaction error:", error);
        setError(error.message || "Transaction failed. Please try again.");
    } finally {
        setLoading(false);
    }
};

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
};


  useEffect(() => {
    fetchFASTAGOperator();
  }, []);
  return (
    <div
      className="tab-pane fade"
      id="pills-fastag"
      role="tabpanel"
      aria-labelledby="pills-fastag-tab"
      tabIndex="0"
    >
      {/* {!loading && <ToastContainer autoClose={5000} />} */}

      <div className="col-sm-12">
        {/* <!-- FASTag Operator Dropdown --> */}
        <div className="mb-20">
          <label
            htmlFor="fastagOperator"
            className="form-label fw-semibold text-primary-light text-sm mb-8"
          >
            FASTag Operator
            <span className="text-danger-600">*</span>
          </label>
          <select
            className="form-control radius-8 form-select"
            id="fastag_id"
            name="fastag_id"
            value={formData.fastag_id}
            onChange={handleChange}
            required
          >
            <option value="Select FASTag Operator">
              Select FASTag Operator
            </option>
            {operatorList.map((op) => (
              <option value={op.id} key={op.id}>
                {op.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* <!-- Vehicle Number Input --> */}
      <div className="mb-20">
        <label
          htmlFor="vehicleNumber"
          className="form-label fw-semibold text-primary-light text-sm mb-8"
        >
          Vehicle Number <span className="text-danger-600">*</span>
        </label>
        <div className="position-relative">
          <input
            type="text"
            className="form-control radius-8"
            id="number"
            name="number"
            placeholder="Enter Vehicle Number"
            value={formData.number}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* <!-- Mobile Number Input --> */}
      <div className="mb-20">
        <label
          htmlFor="mobile"
          className="form-label fw-semibold text-primary-light text-sm mb-8"
        >
          Mobile No. <span className="text-danger-600">*</span>
        </label>
        <div className="position-relative">
          <input
            type="text"
            className="form-control radius-8"
            id="mobile"
            name="mobile"
            placeholder="Enter Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* <!-- Bill Amount Input --> */}
      <div className="mb-20">
        <label
          htmlFor="billAmount"
          className="form-label fw-semibold text-primary-light text-sm mb-8"
        >
          Bill Amount <span className="text-danger-600">*</span>
        </label>
        <div className="position-relative">
          <input
            type="number"
            className="form-control radius-8"
            id="amount"
            name="amount"
            placeholder="Enter Bill Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* <!-- Action Buttons --> */}
      <div className="d-flex align-items-center justify-content-center gap-3">
        <button
          type="button"
          className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
          onClick={() => {
            setFormData({
              fastag_id: "",
              mobile: "",
              number: "",
              amount: "",
            });
            setError(null);
            setSuccess(null);
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
          onClick={handleSubmit}
          disabled={
            loading ||
            !formData.fastag_id ||
            !formData.number ||
            !formData.amount ||
            !formData.mobile
          }
        >
          Pay
        </button>
      </div>
    </div>
  );
}

export default FASTAG;
