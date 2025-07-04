import React, { useEffect, useState } from "react";
import { toast,  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MobilePlansModal from "./Modal/ViewPlansModal";
import WaitModal from "./Modal/WaitModal";
// Add this near your other state declarations

function MobileRecharge() {
  const [selectedOperatorName, setSelectedOperatorName] = useState("");
  const [operators, setOperators] = useState([]);
  const [formData, setFormData] = useState({
    recharge_id: "", // Changed from selectedOperator to recharge_id
    mobile: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("token");

  // Update your handleChange function:
  const handleChange = (e) => {
    const { id, value } = e.target;

    // Normal handling for other fields
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // When operator selection changes, update the operator name
    if (id === "recharge_id") {
      const operator = operators.find((op) => {
        return op.id == value;
      });
      setSelectedOperatorName(operator ? operator.name : "");
    }
  };
  const fetchOperators = async () => {
    const formData = new FormData();
    formData.append("type", "getoperator");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_KEY}/service/recharge`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch operators");
      }

      const data = await response.json();
      setOperators(Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load operators");
    }
  };

  const handleRecharge = async () => {

    if (!formData.recharge_id || !formData.mobile || !formData.amount) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    setError(null);

    const rechargeData = new FormData();
    rechargeData.append("type", "transaction");
    rechargeData.append("recharge_id", formData.recharge_id);
    rechargeData.append("mobile", formData.mobile);
    rechargeData.append("amount", formData.amount);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_KEY}/service/recharge`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: rechargeData,
        },
      );

      const data = await response.json();

      if (!response.ok || data.statuscode === "ERR") {
        throw new Error(data.message || "Recharge failed");
      }

      toast.success(data.message || "Recharge successful");
      handleReset();
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      recharge_id: "",
      mobile: "",
      amount: "",
    });
    setSelectedOperatorName("");
    setError(null);
    
    // Optional: Clear any active toasts
    toast.dismiss();
  };

  useEffect(() => {
    fetchOperators();
  }, []);

  return (
    <div
      className="tab-pane fade show active"
      id="pills-mobile-profile"
      role="tabpanel"
      aria-labelledby="pills-mobile-profile-tab"
      tabIndex={0}
    >
      {/* {!loading && <ToastContainer autoClose={5000}/>} */}
      {/* Mobile Operator Select Input */}
      <div className="col-sm-12">
        <div className="mb-20">
          <label
            htmlFor="mobileOperator"
            className="form-label fw-semibold text-primary-light text-sm mb-8"
          >
            Mobile Operator <span className="text-danger-600">*</span>
          </label>
          <select
            className="form-control radius-8 form-select"
            id="recharge_id" // Changed to match state key
            value={formData.recharge_id} // Use the state value
            onChange={handleChange}
            disabled={loading}
          >
            <option value="">Select Operator</option>
            {operators.map((operator) => (
              <option key={operator.id} value={operator.id}>
                {operator.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mobile Number Input */}
      <div className="mb-20">
        <label
          htmlFor="mobile"
          className="form-label fw-semibold text-primary-light text-sm mb-8"
        >
          Mobile Number <span className="text-danger-600">*</span>
        </label>
        <div className="position-relative">
          <input
            type="tel"
            className="form-control radius-8"
            id="mobile"
            placeholder="Enter Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            disabled={loading}
            maxLength="10"
            minLength="10"
            pattern="[0-9]{10}"
            inputMode="numeric"
          />
        </div>
      </div>

      <div className="row d-flex align-items-center">
        {/* Recharge Amount Input */}
        <div className="mb-20 col-sm-10 ">
          <label
            htmlFor="amount"
            className="form-label fw-semibold text-primary-light text-sm mb-8"
          >
            Recharge Amount <span className="text-danger-600">*</span>
          </label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control radius-8"
              id="amount"
              placeholder="Enter Recharge Amount"
              value={formData.amount}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>

        <div className="col-sm-2  mt-12  ">
          <MobilePlansModal operator={selectedOperatorName} circle="98" mobileNumber={formData.mobile} rechargeData={setFormData}  />
        </div>
        <WaitModal modalOpen={loading} />
        {/* logic */}
      </div>

      {/* Error Display */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Buttons */}
      <div className="d-flex align-items-center justify-content-center gap-3">
        <button
          type="button"
          className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-56 py-11 radius-8"
          onClick={handleReset}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
          onClick={handleRecharge}
          disabled={loading}
        >
          {loading ? 
          "wait..."
          : 
            "Pay"
          }
        </button>
      </div>
    </div>
  );
}

export default MobileRecharge;
