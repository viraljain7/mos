import { useState } from "react";

const Step1PersonalInfo = ({ nextStep }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    businessType: "",
    shopAddress: {
      address: "",
      city: "",
      pincode: "",
    },
  });
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSendOtp = () => {
    // Here you would typically call an API to send OTP
    console.log("Sending OTP to:", formData.mobile, formData.email);
    setShowOtpSection(true);
  };

  const handleVerifyOtp = () => {
    // Verify OTP logic would go here
    console.log("Verifying OTP:", otp);
    nextStep(); // Proceed to next step after verification
  };

  return (
    <>
      <h6 className="text-md text-neutral-500">Personal Information</h6>
      <div className="row gy-3">
        {/* Personal Details */}
        <div className="col-sm-6">
          <label className="form-label">First Name*</label>
          <input
            type="text"
            name="firstName"
            className="form-control wizard-required"
            placeholder="Enter First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-sm-6">
          <label className="form-label">Last Name*</label>
          <input
            type="text"
            name="lastName"
            className="form-control wizard-required"
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-sm-6">
          <label className="form-label">Email*</label>
          <input
            type="email"
            name="email"
            className="form-control wizard-required"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-sm-6">
          <label className="form-label">Mobile Number*</label>
          <input
            type="tel"
            name="mobile"
            className="form-control wizard-required"
            placeholder="Enter Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">Business Type*</label>
          <select
            name="businessType"
            className="form-control form-select"
            value={formData.businessType}
            onChange={handleChange}
            required
          >
            <option value="">Select Business Type</option>
            <option value="individual">Individual</option>
            <option value="proprietorship">Proprietorship</option>
            <option value="partnership">Partnership</option>
            <option value="llp">LLP</option>
            <option value="pvt-ltd">Private Limited</option>
            <option value="ltd">Public Limited</option>
          </select>
        </div>

        {/* Registered Address */}
        <div className="col-12 ">
          <h6 className="text-md text-neutral-500 my-4">Shop Address</h6>
        </div>
        <div className="col-12">
          <label className="form-label">Address*</label>
          <textarea
            name="registeredAddress.address"
            className="form-control wizard-required"
            placeholder="Enter Full Address"
            value={formData.shopAddress.address}
            onChange={handleChange}
            required
            rows={3}
          />
        </div>
        <div className="col-sm-6">
          <label className="form-label">City*</label>
          <input
            type="text"
            name="registeredAddress.city"
            className="form-control wizard-required"
            placeholder="Enter City"
            value={formData.shopAddress.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-sm-6">
          <label className="form-label">Pincode*</label>
          <input
            type="text"
            name="registeredAddress.pincode"
            className="form-control wizard-required"
            placeholder="Enter Pincode"
            value={formData.shopAddress.pincode}
            onChange={handleChange}
            required
          />
        </div>

        {/* OTP Section */}
        {showOtpSection ? (
          <div className="col-12 mt-4">
            <div className="row align-items-center">
              <div className="col-md-12">
                <label className="form-label">Enter OTP*</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div className="col-md-6 mt-3  ">
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-primary-600 flex-grow-1"
                    onClick={handleVerifyOtp}
                    // disabled={otp.length !== 6} // Disable if OTP not complete
                  >
                    Verify OTP
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary flex-grow-1"
                    onClick={handleSendOtp} // Reuse the send OTP function
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-12 mt-3 ">
            <button
              type="button"
              className="btn btn-primary-600 px-32"
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default Step1PersonalInfo;
