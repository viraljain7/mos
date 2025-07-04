import React, { useEffect, useState } from "react";
import { toast, } from "react-toastify";

function DTH() {
  const token = sessionStorage.getItem("token");
  const [operatorList, setOperatorList] = useState([]);
  const [formData, setFormData] = useState({
    dth_id: "",
    dth_number: "",
    amount: "",
    type: "transaction",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchDTHOperator = async () => {
    try {
      // Create FormData
      const formData = new FormData();
      formData.append("type", "getoperator");

      const response = await fetch(
        `${import.meta.env.VITE_APP_API_KEY}/service/dth`,
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
      console.error("Error fetching DTH operators:", error);
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
      submitFormData.append("dth_id", formData.dth_id);
      submitFormData.append("amount", formData.amount);
      submitFormData.append("mobile", formData.dth_number);

      const response = await fetch(
        `${import.meta.env.VITE_APP_API_KEY}/service/dth`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: submitFormData,
        },
      );

      const result = await response.json();

      if (!response.ok || result.statuscode !== "TXN") {
        throw new Error(result.message || "Transaction failed");
      }

      toast.success(result.message );
      // Reset form after successful submission
      setFormData({
        dth_id: "",
        dth_number: "",
        amount: "",
        type: "transaction",
      });
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
    fetchDTHOperator();
  }, []);

  return (
    <div
      className="tab-pane fade"
      id="pills-dth"
      role="tabpanel"
      aria-labelledby="pills-dth-tab"
      tabIndex="0"
    >
    {/* {!loading&&<ToastContainer autoClose={5000}/>} */}
      <div className="col-sm-12">
        {/* <!-- Mobile Operator Dropdown --> */}
        <div className="mb-20">
          <label
            htmlFor="operator"
            className="form-label fw-semibold text-primary-light text-sm mb-8"
          >
            DTH Operator
            <span className="text-danger-600">*</span>
          </label>
          <select
            className="form-control radius-8 form-select"
            id="dth_id"
            name="dth_id"
            value={formData.dth_id}
            onChange={handleChange}
            required
          >
            <option value="Select Operator">Select Operator</option>

            {operatorList.map((op) => (
              <option value={op.id} key={op.id}>
                {op.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* <!-- DTH Number Input --> */}
      <div className="mb-20">
        <label
          htmlFor="dthNumber"
          className="form-label fw-semibold text-primary-light text-sm mb-8"
        >
          DTH Number <span className="text-danger-600">*</span>
        </label>
        <div className="position-relative">
          <input
            type="text"
            className="form-control radius-8"
            id="dth_number"
            name="dth_number"
            placeholder="Enter DTH Number"
            value={formData.dth_number}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* <!-- Recharge Amount Input --> */}
      <div className="mb-20">
        <label
          htmlFor="amount"
          className="form-label fw-semibold text-primary-light text-sm mb-8"
        >
          Recharge Amount <span className="text-danger-600">*</span>
        </label>
        <div className="position-relative">
          <input
            type="number"
            className="form-control radius-8"
            id="amount"
            name="amount"
            placeholder="Enter Amount"
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
              dth_id: "",
              dth_number: "",
              amount: "",
              type: "transaction",
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
            !formData.dth_id ||
            !formData.dth_number ||
            !formData.amount
          }
        >
          {loading ? "Processing..." : "Pay"}
        </button>
      </div>
    </div>
  );
}

export default DTH;
