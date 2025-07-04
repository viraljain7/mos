import React, { useState } from "react";
import { Phone, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ForgotPasswordLayer from "./UserProfile/ForgotPasswordLayer";
// import loginImg from "assets/images/loginNexa.png";

const SignInLayer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mobileNumber: "",
    password: "",
    authType: "otp",
    rememberMe: false,
    otp: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [isOtpBoxVisible, setIsOtpBoxVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleOtpChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      otp: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.mobileNumber) {
      toast.error("Mobile number is required");
      return false;
    }
    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API = `${import.meta.env.VITE_APP_API_KEY}/auth/login`;

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const formPayload = new FormData();
      formPayload.append("mobile", formData.mobileNumber);
      formPayload.append("password", formData.password);
      formPayload.append("via", formData.authType);

      if (formData.otp) {
        formPayload.append("value", formData.otp);
      }

      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: formPayload,
      });

      const responseData = await response.json();

      if (response.ok) {
        if (
          responseData.statuscode === 200 ||
          responseData.statuscode === "TXN"
        ) {
          toast.dismiss();
          toast.success(responseData.message || "Login successful", {
            toastId: "login-success", // Unique ID
          });
          sessionStorage.setItem("token", responseData.token);
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000); // Delay navigation by 1 second
        }
        if (responseData.statuscode === 401) {
          toast.error(responseData.message);
        }

        if (responseData.statuscode === 1300) {
          setIsOtpBoxVisible(true);
          toast.success(responseData.message);
        }
      } else {
        toast.error(responseData.message || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth bg-base d-flex flex-wrap">
      {/* <ToastContainer /> */}
      <div className="auth-left d-lg-block d-none">
        <div
          className="d-flex align-items-center flex-column h-100 justify-content-center "
          style={{ backgroundColor: "white" }}
        >
          {/* <img
            src={"assets/images/loginNexa.webp"}
            className=" h-100 w-full"
            alt="Authentication"
            width={740}
            height={100}
          /> */}
          <img
            src="assets/images/loginNexa.webp"
            // srcset="assets/images/loginNexa-small.webp 480w, assets/images/loginNexa-medium.webp 1024w, assets/images/loginNexa-large.webp 1920w"
            sizes="(max-width: 600px) 480px, (max-width: 1024px) 1024px, 1920px"
            alt="Login Image"
            className="h-80 w-full"
          />
        </div>
      </div>
      <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
        <div className="max-w-464-px mx-auto w-100">
          <div>
            <div className="mb-40 max-w-290-px">
              <img
                src="https://i.ibb.co/ynKrDqY9/Transact.png"
                alt="Logo"
                width={300}
                height={300}
              />
            </div>
            <h4 className="mb-12">Sign In to your Account</h4>
            <p className="mb-32 text-secondary-light text-lg">
              Welcome back! Please enter your details.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="icon-field mb-16">
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
                disabled={isLoading}
              />
            </div>

            <div className="position-relative mb-20">
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
                  placeholder="Password"
                  disabled={isLoading}
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

            <div className="my-32 d-flex align-items-center gap-3">
              {/* 
              {["otp", "mpin"].map((type) => (
             */}
              {["otp", "mpin"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, authType: type }))
                  }
                  className={`fw-semibold text-primary-light py-16 px-24 w-50 border radius-12 text-md d-flex align-items-center justify-content-center gap-12 line-height-1 bg-hover-primary-50 ${
                    formData.authType === type ? "bg-primary-50" : ""
                  }`}
                >
                  <input
                    className="form-check-input"
                    type="radio"
                    name="authType"
                    value={type}
                    id={type}
                    checked={formData.authType === type}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <label
                    className="form-check-label line-height-1 fw-medium text-secondary-light"
                    htmlFor={type}
                  >
                    {type.toUpperCase()}
                  </label>
                </button>
              ))}
            </div>

            {/* <div className="d-flex justify-content-end">
              <button
                type="button"
                onClick={() => {
                  toast.info(
                    "Forgot password functionality not implemented yet."
                  );
                }}
                className="text-primary-600 fw-medium"
                disabled={isLoading}
              >
                Forgot Password?
              </button>
            </div> */}
            <ForgotPasswordLayer />

            {isOtpBoxVisible && (
              <div className="position-relative  mt-8">
                <div className="icon-field">
                  <span className="icon top-50 translate-middle-y">
                    <Lock size={20} />
                  </span>
                  <input
                    type={showPin ? "text" : "password"}
                    name="otp"
                    value={formData.otp}
                    onChange={handleOtpChange}
                    className="form-control h-56-px bg-neutral-50 radius-12"
                    placeholder="Enter OTP"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="toggle-password cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignInLayer;
