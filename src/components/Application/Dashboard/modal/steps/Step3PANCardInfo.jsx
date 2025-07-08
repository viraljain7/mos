import { useState } from "react";
import { toast } from "react-toastify";
import WaitModal from "../../../Services/Recharge/Modal/WaitModal";

const Step3PANCardInfo = ({ nextStep }) => {
  const [panNumber, setPanNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [verificationData, setVerificationData] = useState(null);

  const verifyPAN = async () => {
    if (!panNumber || panNumber.length !== 10) {
      setError("Please enter a valid 10-character PAN number");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("token") || "";
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_KEY}/member/pan/verify-details`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            token: "YK14DdEXfmGvBB6mc6CDdJCLRXYFje",
            pan: panNumber,
            orderid: `ORD${Date.now()}`, // Generate a unique order ID
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error?.message || "PAN verification failed. Please try again."
        );
      }

      // PAN verification successful
      setVerificationData(data.data);
      toast.success(
        `${data.data.registered_name} - ${data.data.message}` ||
          "PAN verified successfully"
      );
      setPanNumber(""); // Clear the input field
      nextStep(); // Proceed to next step
    } catch (err) {
      toast.error(err.message || "An error occurred during PAN verification");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h6 className="text-md text-neutral-500">PAN Verification</h6>
      {error && (
        <div className="alert alert-danger mb-3">
          {typeof error === "string" ? error : "PAN verification failed"}
        </div>
      )}
      <div className="row gy-3">
        <WaitModal modalOpen={loading} />

        <div className="col-12">
          <div className="card border-primary">
            <div className="card-body">
              <div className="mb-4">
                <label className="form-label">PAN Number*</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter PAN number"
                    value={panNumber}
                    onChange={(e) => {
                      const value = e.target.value
                        .toUpperCase()
                        .replace(/[^A-Z0-9]/g, "");
                      if (value.length <= 10) {
                        setPanNumber(value);
                      }
                    }}
                    maxLength="10"
                    pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                  />
                  <button
                    className="btn btn-primary-600"
                    onClick={verifyPAN}
                    disabled={loading || panNumber.length !== 10}
                  >
                    {loading ? "Verifying..." : "Verify PAN"}
                  </button>
                </div>
                <small className="text-muted">
                  Format: AAAAA9999A (10 characters, alphanumeric)
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step3PANCardInfo;
