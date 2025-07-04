import React, { useState } from "react";
import { Phone } from "lucide-react";

const ForgotPasswordLayer = () => {
  const [formData, setFormData] = useState({
    mobileNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.mobileNumber) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid 10-digit mobile number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Example API call
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobileNumber: formData.mobileNumber,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowModal(true);
      } else {
        setErrors({
          api: data.message || "Failed to process request. Please try again.",
        });
      }
    } catch (error) {
      setErrors({ api: "Network error. Please check your connection." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/resend-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobileNumber: formData.mobileNumber,
        }),
      });
      // Show success message
    } catch (error) {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="auth forgot-password-page bg-base d-flex flex-wrap">
        <div className="auth-left d-lg-block d-none">
          <div className="d-flex align-items-center flex-column h-100 justify-content-center">
            <img src="/api/placeholder/600/400" alt="Forgot Password" />
          </div>
        </div>
        <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
          <div className="max-w-464-px mx-auto w-100">
            <div>
              <h4 className="mb-12">Forgot Password</h4>
              <p className="mb-32 text-secondary-light text-lg">
                Enter the mobile number associated with your account and we will
                send you a verification code to reset your password.
              </p>
            </div>

            {errors.api && (
              <div className="mb-16 p-12 bg-red-100 text-red-600 radius-12">
                {errors.api}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="icon-field">
                <span className="icon top-50 translate-middle-y">
                  <Phone size={20} />
                </span>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="form-control h-56-px bg-neutral-50 radius-12"
                  placeholder="Mobile Number"
                />
              </div>
              {errors.mobileNumber && (
                <p className="text-red-500 text-sm mt-4">
                  {errors.mobileNumber}
                </p>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
              >
                {isLoading ? "Processing..." : "Continue"}
              </button>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    /* Handle back to sign in */
                  }}
                  className="text-primary-600 fw-bold mt-24"
                >
                  Back to Sign In
                </button>
              </div>
              <div className="mt-120 text-center text-sm">
                <p className="mb-0">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      /* Handle sign in navigation */
                    }}
                    className="text-primary-600 fw-semibold"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent className="modal-content radius-16 bg-base">
                    <div className="modal-body p-40 text-center">
                        <div className="mb-32">
                            <img src="/api/placeholder/64/64" alt="Email Verification" />
                        </div>
                        <h6 className="mb-12">Verify your Mobile Number</h6>
                        <p className="text-secondary-light text-sm mb-0">
                            Thank you, check your mobile for the verification code to reset your password
                        </p>
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
                        >
                            Close
                        </button>
                        <div className="mt-32 text-sm">
                            <p className="mb-0">
                                Didn't receive the code?{" "}
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    className="text-primary-600 fw-semibold"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Sending...' : 'Resend'}
                                </button>
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog> */}
    </>
  );
};

export default ForgotPasswordLayer;
