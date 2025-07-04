import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import WaitModal from "../../../Application/Services/Recharge/Modal/WaitModal";

function ElectricityLayer() {
  const token = sessionStorage.getItem("token");
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(false);
  const [operatorLoading, setOperatorLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOperator, setSelectedOperator] = useState("");
  const [formData, setFormData] = useState({
    consumerNumber: "",
    billerMobile: "",
    amount: "",
  });

  useEffect(() => {
    const fetchOperators = async () => {
      setOperatorLoading(true);
      setError(null);
      try {
        const requestData = new FormData();
        requestData.append("type", "getoperator");
        requestData.append("operator_type", "electricity");

        const response = await fetch(
          `${import.meta.env.VITE_APP_API_KEY}/service/bbps`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: requestData,
          },
        );

        const result = await response.json();

        if (result.statuscode === "TXN" && result.data) {
          setOperators(result.data);
        } else {
          throw new Error(result.message || "Failed to fetch operators");
        }
      } catch (err) {
        console.error("Error fetching operators:", err);
        setError(err.message);
      } finally {
        setOperatorLoading(false);
      }
    };

    fetchOperators();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (!selectedOperator || !formData.consumerNumber || !formData.amount) {
        toast.error("Please fill all required fields");
      }

      const paymentData = new FormData();
      paymentData.append("type", "transaction");
      paymentData.append("bbps_id", selectedOperator);
      paymentData.append("number", formData.consumerNumber);
      paymentData.append("amount", formData.amount);


      const response = await fetch(
        `${import.meta.env.VITE_APP_API_KEY}/service/bbps`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: paymentData,
        },
      );

      if (response.ok) {
        const result = await response.json();
        if (result.statuscode === "TXN") {
          // Handle successful payment
          toast.success(result.message || "Payment successful!");
          // You might want to reset the form here
          setSelectedOperator("");
          setFormData({
            consumerNumber: "",
            billerMobile: "",
            amount: "",
          });
        } else {
          toast.error(result.message || "Payment failed");
        }
      } else {
        toast.error(result.message || "Payment failed");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError(err.message);
      alert(`Payment failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="tab-pane fade show active"
      id="pills-electricity"
      role="tabpanel"
      aria-labelledby="pills-electricity-tab"
      tabIndex={0}
    >
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <WaitModal modalOpen={loading} />
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Electricity Operator Dropdown */}
          <div className="col-sm-12">
            <div className="mb-20">
              <label
                htmlFor="electricityOperator"
                className="form-label fw-semibold text-primary-light text-sm mb-8"
              >
                Electricity Operator <span className="text-danger-600">*</span>
              </label>
              <select
                className="form-control radius-8 form-select"
                id="electricityOperator"
                value={selectedOperator}
                onChange={(e) => setSelectedOperator(e.target.value)}
                disabled={operatorLoading}
                required
              >
                <option value="">
                  {operatorLoading ? "Loading operators..." : "Select Operator"}
                </option>
                {operators.map((operator) => (
                  <option key={operator.id} value={operator.id}>
                    {operator.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Consumer Number Input */}
          <div className="col-sm-6">
            <div className="mb-20">
              <label
                htmlFor="consumerNumber"
                className="form-label fw-semibold text-primary-light text-sm mb-8"
              >
                Consumer Number <span className="text-danger-600">*</span>
              </label>
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control radius-8"
                  id="consumerNumber"
                  placeholder="Enter Consumer Number"
                  value={formData.consumerNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Amount Input */}
          <div className="col-sm-6">
            <div className="mb-20">
              <label
                htmlFor="amount"
                className="form-label fw-semibold text-primary-light text-sm mb-8"
              >
                Bill Amount <span className="text-danger-600">*</span>
              </label>
              <div className="position-relative">
                <input
                  type="number"
                  className="form-control radius-8"
                  id="amount"
                  placeholder="Enter Bill Amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-center gap-3">
          <button
            type="button"
            className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
            disabled={loading || !selectedOperator}
          >
            {loading ? "Processing..." : "Pay"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ElectricityLayer;
