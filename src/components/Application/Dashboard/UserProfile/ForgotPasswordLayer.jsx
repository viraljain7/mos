import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff, Lock, Phone } from "lucide-react";

function ForgotPasswordLayer() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    mobile: "",
    otp: "",
    password: "",
    confirmPassword: ""
  });

  // API endpoint and token from local storage
  const API = `${import.meta.env.VITE_APP_API_KEY}/auth/forget-password`;
  const token = sessionStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitMobile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch(API, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile: formData.mobile })
      });

      const data = await response.json();
      
      if (data.statuscode === "TXNOTP") {
        toast.success(data.message || "OTP sent successfully");
        toast.info(`Please check your mobile for the OTP: ${data.otp}`);
        setOtpSent(true);
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('mobile', formData.mobile);
      formDataToSend.append('otp', formData.otp);
      formDataToSend.append('password', formData.password);

      const response = await fetch(API, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataToSend
      });

      const data = await response.json();
      
      if (data.statuscode === "TXN") {
        toast.success(data.message || "Password reset successfully");
        // Close modal or reset form
        setOtpSent(false);
        setFormData({
          mobile: "",
          otp: "",
          password: "",
          confirmPassword: ""
        });
        // You might want to close the modal here if using Bootstrap modal
        document.querySelector('[data-bs-dismiss="modal"]').click();
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="text-primary-600 fw-medium"
          disabled={isLoading}
          data-bs-toggle="modal"
          data-bs-target="#forgotPasswordModal"
         
        >
          Forgot Password?
        </button>
      </div>

      <div
        className="modal fade"
        id="forgotPasswordModal"
        tabIndex={-1}
        aria-labelledby="forgotPasswordModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content radius-16 bg-base">
            <div className="card h-100 p-32">
              <div className="card-body mx-auto w-100">
              <div>
                <button
                  type="button"
                  className="btn-close position-absolute top-0 end-0 me-16 mt-16"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
                <div>
                  <h6 className="mb-12">Forgot Password</h6>
                  <p className="mb-32 text-secondary-light text-lg">
                    {!otpSent 
                      ? "Please enter your Mobile Number." 
                      : "Please enter the OTP and set a new password."}
                  </p>
                </div>

                {!otpSent ? (
                  <form onSubmit={handleSubmitMobile}>
                    <div className="icon-field mb-16">
                      <span className="icon top-50 translate-middle-y">
                        <Phone size={20} />
                      </span>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="form-control h-56-px bg-neutral-50 radius-12"
                        placeholder="Mobile Number"
                        disabled={isLoading}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
                      onClick={handleSubmitMobile}
                    >
                      {isLoading ? "Sending OTP..." : "Send OTP"}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleSubmitPassword}>
                    <div className="icon-field mb-16">
                      <span className="icon top-50 translate-middle-y">
                        <Lock size={20} />
                      </span>
                      <input
                        type="text"
                        name="otp"
                        value={formData.otp}
                        onChange={handleChange}
                        className="form-control h-56-px bg-neutral-50 radius-12"
                        placeholder="Enter OTP"
                        disabled={isLoading}
                        required
                      />
                    </div>

                    <div className="position-relative mb-16">
                      <div className="icon-field">
                        <span className="icon top-50 translate-middle-y">
                          <Lock size={20} />
                        </span>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="form-control h-56-px bg-neutral-50 radius-12"
                          placeholder="New Password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="toggle-password cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div className="position-relative mb-16">
                      <div className="icon-field">
                        <span className="icon top-50 translate-middle-y">
                          <Lock size={20} />
                        </span>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="form-control h-56-px bg-neutral-50 radius-12"
                          placeholder="Confirm New Password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="toggle-password cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
                          aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
                      onClick={handleSubmitPassword}
                    >
                      {isLoading ? "Resetting..." : "Reset Password"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPasswordLayer;