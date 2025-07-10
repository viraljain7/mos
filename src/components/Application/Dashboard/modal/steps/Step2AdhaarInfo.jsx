import { useState } from "react";
import { toast } from "react-toastify";
import WaitModal from "../../../Services/Recharge/Modal/WaitModal";

const Step2AdhaarInfo = ({ nextStep }) => {
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [aadhaarData, setAadhaarData] = useState(null);
  const [refId, setRefId] = useState("");
  const [orderId, setOrderId] = useState("");

  const resetAadhaarVerification = () => {
    setAadhaarNumber("");
    setOtp("");
    setShowOtpVerification(false);
    setError(null);
    setSuccess(null);
    setRefId("");
    setOrderId("");
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    if (aadhaarNumber.length !== 12) {
      toast.error("Aadhaar number must be 12 digits");
      setError("Please enter a valid 12-digit Aadhaar number");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = sessionStorage.getItem("token") || "";
      const currentOrderId = `ORDER${Math.floor(Date.now() / 1000)}`;

      const response = await fetch(
        `${import.meta.env.VITE_APP_API_KEY}/member/aadhaar/send-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            token: "YK14DdEXfmGvBB6mc6CDdJCLRXYFje",
            aadhaar_number: aadhaarNumber,
            orderid: currentOrderId,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "Success") {
        setSuccess(data.message);
        setRefId(data.ref_id);
        setOrderId(currentOrderId);
        toast.success(data.message || "OTP sent successfully");
        setShowOtpVerification(true);
      } else {
        setError(data.message || "Failed to send OTP");
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (err) {
      setError("An error occurred while sending OTP");
      toast.error("An error occurred while sending OTP");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("token") || "";

      const response = await fetch(
        `${import.meta.env.VITE_APP_API_KEY}/member/aadhaar/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            token: "YK14DdEXfmGvBB6mc6CDdJCLRXYFje",
            aadhaar_number: aadhaarNumber,
            orderid: orderId,
            ref_id: refId,
            otp: otp,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "Success") {
        setAadhaarData(data.data);
        toast.success(data.message || "Aadhaar verified successfully");
      } else {
        setError(data.message || "OTP verification failed");
        toast.error(data.message || "OTP verification failed");
      }
    } catch (err) {
      setError("An error occurred while verifying OTP");
      toast.error("An error occurred while verifying OTP");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {aadhaarData && (
        <div className="card-body">
          <div className="user-grid-card position-relative border radius-16 overflow-hidden bg-base h-100">
            {/* Background Image */}
            <img
              src="https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="profile background"
              className="w-100 object-fit-cover"
              style={{ height: "150px" }}
            />

            {/* Profile Content */}
            <div className="pb-24 ms-16 mb-24 me-16 mt--100">
              {/* Profile Header */}
              <div className="text-center border border-top-0 border-start-0 border-end-0 pb-4">
                <img
                  src="https://img.icons8.com/fluency/48/approval.png"
                  alt="Viral Jain"
                  className="border border-white border-width-3 w-40-px h-40-px rounded-circle object-fit-cover   shadow-sm"
                />
                <h6 className="mb-0 mt-16 text-2xl font-bold">
                  {aadhaarData.name}
                </h6>
              </div>

              {/* Personal Info Section */}
              <div className="mt-24">
                <ul className="space-y-3">
                  <ProfileInfoItem
                    label="Address"
                    value={aadhaarData.address}
                  />
                  <ProfileInfoItem label="DOB" value={aadhaarData.dob} />
                  <ProfileInfoItem label="City" value={aadhaarData.po} />
                  <ProfileInfoItem label="State" value={aadhaarData.state} />
                </ul>
              </div>
            </div>
            <div className="d-flex justify-content-center gap-3 my-4">
              <button
                type="button"
                className="btn btn-primary-600 px-32 align-items-end"
                onClick={nextStep}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {!aadhaarData && (
        <>
          <h6 className="text-md text-neutral-500">Aadhaar Verification</h6>
          {error && <div className="alert alert-danger mb-3">{error}</div>}
          {success && <div className="alert alert-success mb-3">{success}</div>}
          <WaitModal modalOpen={loading} />

          <div className="row gy-3">
            <div className="col-12">
              <div className="card border-primary">
                <div className="card-body">
                  {!showOtpVerification ? (
                    <div className="mb-4">
                      <label className="form-label">Aadhaar Number*</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter 12-digit Aadhaar number"
                          value={aadhaarNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            if (value.length <= 12) {
                              setAadhaarNumber(value);
                            }
                          }}
                          disabled={loading}
                          maxLength="12"
                          pattern="\d{12}"
                        />
                        <button
                          className="btn btn-primary-600"
                          onClick={sendOtp}
                          disabled={loading}
                        >
                          {loading ? "Sending..." : "Send OTP"}
                        </button>
                      </div>
                      <small className="text-muted">
                        Enter your 12-digit Aadhaar number without spaces
                      </small>
                    </div>
                  ) : (
                    <div className="mb-4">
                      <label className="form-label">Enter OTP*</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter 6-digit OTP"
                          value={otp}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            if (value.length <= 6) {
                              setOtp(value);
                            }
                          }}
                          maxLength="6"
                          pattern="\d{6}"
                          disabled={loading}
                        />
                        <button
                          className="btn btn-primary-600"
                          onClick={verifyOtp}
                          disabled={loading}
                        >
                          {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                      </div>
                      <div className="d-flex justify-content-between mt-2 gap-5">
                        <small className="text-muted">
                          Enter the 6-digit OTP sent to your Aadhaar registered
                          mobile
                        </small>
                        <button
                          className="text-primary-600 cursor-pointer bg-transparent border-0 p-0 text-decoration-underline"
                          onClick={resetAadhaarVerification}
                          disabled={loading}
                        >
                          Re-enter Aadhaar number
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Step2AdhaarInfo;

function ProfileInfoItem({ label, value, masked = false }) {
  return (
    <li className="d-flex align-items-center gap-1 fw-semibold">
      <span className="w-25 text-md fw-semibold text-gray-600">{label}</span>
      <span className="w-75 text-gray-800 fw-medium fw-semibold p-4">
        :{" "}
        {masked
          ? value.replace(/(\d{4})(\d{4})(\d{4})/, "XXXX-XXXX-$3")
          : value}
      </span>
    </li>
  );
}
