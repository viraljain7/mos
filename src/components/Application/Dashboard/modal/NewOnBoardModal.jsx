import React, { useState, useRef, useEffect } from "react";
import { Modal } from "react-bootstrap";
import PgLayer from "../../Services/PgLayer";

// Step Components
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

const Step2AdhaarInfo = ({ nextStep, prevStep }) => {
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <>
      <h6 className="text-md text-neutral-500">Aadhaar Verification</h6>
      {error && <div className="alert alert-danger mb-3">{error}</div>}
      <div className="row gy-3">
        <div className="col-12">
          <div className="card border-primary">
            <div className="card-body">
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
                    maxLength="12"
                    pattern="\d{12}"
                  />
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      if (aadhaarNumber.length === 12) {
                        nextStep();
                      } else {
                        setError(
                          "Please enter a valid 12-digit Aadhaar number"
                        );
                      }
                    }}
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </button>
                </div>
                <small className="text-muted">
                  Enter your 12-digit Aadhaar number without spaces
                </small>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group d-flex align-items-center justify-content-end gap-8 mt-4">
          <button
            onClick={() => {
              prevStep();
            }}
            type="button"
            className="form-wizard-previous-btn btn btn-neutral-500 border-neutral-100 px-32"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => {
              nextStep();
            }}
            className="form-wizard-next-btn btn btn-primary-600 px-32"
          >
            {loading ? "Verifying..." : "Next"}
          </button>
        </div>
      </div>
    </>
  );
};

const Step3PANCardInfo = ({ nextStep, prevStep }) => {
  const [panNumber, setPanNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <>
      <h6 className="text-md text-neutral-500">PAN Verification</h6>
      {error && <div className="alert alert-danger mb-3">{error}</div>}
      <div className="row gy-3">
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
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 12) {
                        setPanNumber(value);
                      }
                    }}
                    maxLength="12"
                    pattern="\d{12}"
                  />
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      if (panNumber.length === 12) {
                        nextStep();
                      } else {
                        setError("Please enter a valid PAN number");
                      }
                    }}
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </button>
                </div>
                <small className="text-muted">
                  Enter your PAN number without spaces
                </small>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group d-flex align-items-center justify-content-end gap-8 mt-4">
          <button
            onClick={() => {
              prevStep();
            }}
            type="button"
            className="form-wizard-previous-btn btn btn-neutral-500 border-neutral-100 px-32"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => {
              nextStep();
            }}
            className="form-wizard-next-btn btn btn-primary-600 px-32"
          >
            {loading ? "Verifying..." : "Next"}
          </button>
        </div>
      </div>
    </>
  );
};
const Step4BankInfo = ({ nextStep, prevStep }) => (
  <>
    <h6 className="text-md text-neutral-500">Bank Information</h6>
    <div className="row gy-3">
      <div className="col-sm-6">
        <label className="form-label">Account Type*</label>
        <div className="position-relative">
          <select className="form-control wizard-required" required>
            <option value="">Select Account Type</option>
            <option value="savings">Savings Account</option>
            <option value="current">Current Account</option>
            <option value="salary">Salary Account</option>
            <option value="nri">NRI Account</option>
          </select>
          <div className="wizard-form-error" />
        </div>
      </div>
      <div className="col-sm-6">
        <label className="form-label">Bank A/c No.*</label>
        <div className="position-relative">
          <input
            type="text"
            className="form-control wizard-required"
            placeholder="Enter Bank Account Number"
            required=""
          />
          <div className="wizard-form-error" />
        </div>
      </div>
      <div className="col-sm-6">
        <label className="form-label">Bank Name*</label>
        <div className="position-relative">
          <input
            type="text"
            className="form-control wizard-required"
            placeholder="Enter Bank Name"
            required=""
          />
          <div className="wizard-form-error" />
        </div>
      </div>
      <div className="col-sm-6">
        <label className="form-label">Branch Name*</label>
        <div className="position-relative">
          <input
            type="text"
            className="form-control wizard-required"
            placeholder="Enter Branch Name"
            required=""
          />
          <div className="wizard-form-error" />
        </div>
      </div>
      <div className="col-sm-6">
        <label className="form-label">IFSC Code*</label>
        <div className="position-relative">
          <input
            type="text"
            className="form-control wizard-required"
            placeholder="Enter IFSC Code"
            required=""
          />
          <div className="wizard-form-error" />
        </div>
      </div>
      <div className="col-sm-6">
        <label className="form-label">A/c Holder Name*</label>
        <div className="position-relative">
          <input
            type="text"
            className="form-control wizard-required"
            placeholder="Enter Account Holder Name"
            required=""
          />
          <div className="wizard-form-error" />
        </div>
      </div>
      <div className="form-group d-flex align-items-center justify-content-end gap-8">
        <button
          onClick={prevStep}
          type="button"
          className="form-wizard-previous-btn btn btn-neutral-500 border-neutral-100 px-32"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          type="button"
          className="form-wizard-next-btn btn btn-primary-600 px-32"
        >
          Verify Bank Details
        </button>
      </div>
    </div>
  </>
);

const Step5VideoKYCInfo = ({ nextStep, prevStep }) => {
  const [verificationStep, setVerificationStep] = useState("initial");
  const [randomCode, setRandomCode] = useState("");
  const [countdown, setCountdown] = useState(20);
  const [videoStream, setVideoStream] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [shopPhoto, setShopPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [videoUrl, setVideourl] = useState(null);

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const countdownRef = useRef(null);

  // Generate 6-digit random code
  const generateRandomCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000);
    setRandomCode(code.toString());
    return code.toString();
  };

  // Clean up resources
  useEffect(() => {
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stream
          ?.getTracks()
          .forEach((track) => track.stop());
      }
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [videoStream]);

  // Start verification process
  const startVerification = () => {
    setVerificationStep("guidelines");
    generateRandomCode();
  };

  // Start recording
  const startRecording = async () => {
    try {
      setLoading(true);
      setError(null);
      setVerificationStep("recording");

      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: true,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setVideoStream(stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch((err) => {
          throw new Error("Video playback failed: " + err.message);
        });
      }

      // Setup media recorder
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: "video/webm",
        });
        setVideourl(URL.createObjectURL(blob));
        console.log("Recorded video blob:", URL.createObjectURL(blob));
        recordedChunksRef.current = [];
      };

      mediaRecorderRef.current.start(100);

      // Start countdown
      setCountdown(20);
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownRef.current);
            stopRecording();
            return 20;
          }
          return prev - 1;
        });
      }, 1000);

      setLoading(false);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError(
        "Could not access camera. Please check permissions and try again."
      );
      setLoading(false);
      setVerificationStep("guidelines");
    }
  };

  // Stop recording
  const stopRecording = () => {
    try {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
      }

      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }

      setVerificationStep("photo-preview");
    } catch (err) {
      console.error("Error stopping recording:", err);
      setError("Failed to stop recording. Please try again.");
    }
  };

  const capturePhoto = (e) => {
    // Prevent any default form submission behavior
    if (e) e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      // Check if video element and stream are available
      if (!videoRef.current || !videoStream) {
        throw new Error("Video stream not available");
      }

      const video = videoRef.current;

      // Create canvas with same dimensions as video
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Canvas context not available");
      }

      // Draw current video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas to data URL (JPEG format for smaller size)
      const photoDataUrl = canvas.toDataURL("image/jpeg", 0.8);

      // Log the captured image data URL
      console.log("Captured photo data URL:", photoDataUrl);

      // For debugging: log the first 100 characters of the data URL
      console.log(
        "Photo data URL sample:",
        photoDataUrl.substring(0, 100) + "..."
      );

      // Update state with the captured photo
      setCapturedPhoto(photoDataUrl);
      setVerificationStep("photo-confirm");
    } catch (err) {
      console.error("Photo capture error:", err);
      setError(err.message || "Failed to capture photo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Confirm photo and proceed
  const confirmPhoto = () => {
    stopRecording();
    setVerificationStep("success");
  };

  // Retake photo
  const retakePhoto = () => {
    setCapturedPhoto(null);
    setVerificationStep("photo-preview");
  };

  // Handle shop photo upload
  const handleShopPhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError("File size too large. Max 5MB allowed.");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }
      setShopPhoto(file);
      setError(null);
    }
  };

  // Initial step
  if (verificationStep === "initial") {
    return (
      <>
        <h6 className="text-md text-neutral-500">Aadhaar Verification</h6>
        <div className="row gy-3">
          <div className="col-12">
            <div className="card border-primary">
              <div className="card-body text-center">
                <div className="mb-4">
                  <i className="bi bi-person-video fs-1 text-primary"></i>
                </div>
                <h5>Verify Your Identity</h5>
                <p className="text-muted">
                  We need to verify your identity with a quick video selfie
                </p>
                <button
                  onClick={startVerification}
                  className="btn btn-primary-600 "
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Start Verification"}
                </button>
              </div>
            </div>
          </div>
          <div className="form-group d-flex align-items-center justify-content-end gap-8 mt-4">
            <button
              onClick={prevStep}
              type="button"
              className="form-wizard-previous-btn btn btn-neutral-500 border-neutral-100 px-32"
            >
              Back
            </button>
            <button
              disabled
              type="button"
              className="form-wizard-next-btn btn btn-secondary px-32"
            >
              Next (Verify First)
            </button>
          </div>
        </div>
      </>
    );
  }

  // Verification guidelines screen
  if (verificationStep === "guidelines") {
    return (
      <div className="verification-container">
        <h6 className="text-md text-neutral-500 mb-4">
          Verification Guidelines
        </h6>
        {error && <div className="alert alert-danger mb-3">{error}</div>}
        <div className="card">
          <div className="card-body">
            <div className="alert alert-primary">
              <h6>Please read these instructions carefully:</h6>
              <ol className="mb-0">
                <li>Make sure you're in a well-lit area</li>
                <li>Keep your face clearly visible</li>
                <li>Speak the following numbers clearly:</li>
              </ol>
            </div>

            <div className="text-center my-4 py-4 border rounded bg-light">
              <h2 className="display-4">{randomCode}</h2>
              <p className="text-muted">Speak these numbers during recording</p>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button
                onClick={() => {
                  setError(null);
                  setVerificationStep("initial");
                }}
                className="btn btn-neutral-500"
                disabled={loading}
              >
                Back
              </button>
              <button
                onClick={startRecording}
                className="btn btn-primary-600"
                disabled={loading}
              >
                {loading ? "Preparing Camera..." : "Start Recording"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Recording screen
  if (verificationStep === "recording") {
    return (
      <div className="verification-container">
        <h6 className="text-md text-neutral-500 mb-4">Video Verification</h6>
        {error && <div className="alert alert-danger mb-3">{error}</div>}
        <div className="card">
          <div className="card-body text-center">
            <div className="video-container mb-3">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-100 border rounded"
                style={{ maxHeight: "500px" }}
              />
            </div>

            <div className="countdown-display mb-3">
              <div className="badge bg-danger fs-4">{countdown}</div>
              <p className="text-muted mt-2">Recording in progress...</p>
              <p className="text-primary">Please speak: {randomCode}</p>
            </div>

            <div className="d-flex justify-content-center">
              <button
                onClick={stopRecording}
                className="btn btn-danger"
                disabled={loading}
              >
                Stop Recording
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Photo preview screen (before capture)
  if (verificationStep === "photo-preview") {
    return (
      <div className="verification-container">
        <h6 className="text-md text-neutral-500 mb-4">Photo Preview</h6>
        {error && <div className="alert alert-danger mb-3">{error}</div>}
        <div className="card">
          <div className="card-body text-center">
            <div className="video-container mb-4">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-100 border rounded"
                style={{ maxHeight: "500px" }}
              />
            </div>

            <div className="d-flex justify-content-center gap-3">
              <button
                onClick={() => {
                  setError(null);
                  setVerificationStep("recording");
                }}
                className="btn btn-neutral-500"
                disabled={loading}
              >
                Retake Video
              </button>
              <button
                onClick={capturePhoto}
                className="btn btn-primary-600"
                disabled={loading}
              >
                Capture Photo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Photo confirmation screen
  if (verificationStep === "photo-confirm") {
    return (
      <div className="verification-container">
        <h6 className="text-md text-neutral-500 mb-4">Confirm Your Photo</h6>
        {error && <div className="alert alert-danger mb-3">{error}</div>}
        <div className="card">
          <div className="card-body text-center">
            <div className="mb-4">
              <img
                src={capturedPhoto}
                alt="Captured"
                className="img-thumbnail w-100"
                style={{ maxHeight: "400px", objectFit: "contain" }}
              />
            </div>

            <div className="d-flex justify-content-center gap-3">
              <button
                onClick={retakePhoto}
                className="btn btn-neutral-500"
                disabled={loading}
              >
                Retake
              </button>
              <button
                onClick={confirmPhoto}
                className="btn btn-primary-600"
                disabled={loading}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success screen with shop photo upload
  if (verificationStep === "success") {
    return (
      <>
        <h6 className="text-md text-neutral-500">Verification Complete</h6>
        {error && <div className="alert alert-danger mb-3">{error}</div>}
        <div className="row gy-3">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body text-center">
                <div className="mb-3 text-success">
                  <i className="bi bi-check-circle-fill fs-1"></i>
                </div>
                <h5>Identity Verified Successfully</h5>
                <p className="text-muted">
                  Your video and photo verification is complete
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h6 className="mb-3">Upload Shop Photo</h6>
                <div className="upload-area border rounded p-4 text-center">
                  {shopPhoto ? (
                    <div>
                      <img
                        src={URL.createObjectURL(shopPhoto)}
                        alt="Shop"
                        className="img-thumbnail mb-2"
                        style={{ maxHeight: "150px" }}
                      />
                      <p>{shopPhoto.name}</p>
                    </div>
                  ) : (
                    <>
                      <i className="bi bi-cloud-arrow-up fs-1 text-muted"></i>
                      <p className="text-muted">
                        Drag & drop or click to upload
                      </p>
                    </>
                  )}
                  <input
                    type="file"
                    id="shopPhoto"
                    accept="image/*"
                    onChange={handleShopPhotoUpload}
                    className="d-none"
                  />
                  <label
                    htmlFor="shopPhoto"
                    className="btn btn-outline-primary mt-2"
                  >
                    {shopPhoto ? "Change Photo" : "Select Photo"}
                  </label>
                  <small className="d-block mt-2 text-muted">Max 5MB</small>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group d-flex align-items-center justify-content-end gap-8 mt-4">
            <button
              onClick={() => {
                setError(null);
                setVerificationStep("photo-confirm");
              }}
              type="button"
              className="form-wizard-previous-btn btn btn-neutral-500 border-neutral-100 px-32"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              type="button"
              className="form-wizard-next-btn btn btn-primary-600 px-32"
              disabled={!shopPhoto}
            >
              Next
            </button>
          </div>
        </div>
      </>
    );
  }

  return null;
};

const Step6Agreement = ({ nextStep, prevStep }) => (
  <>
    <PgLayer nextStep={nextStep} prevStep={prevStep} />
  </>
);

const Step7Completion = () => (
  <>
    <div className="text-center mb-40">
      <img
        src="assets/images/gif/success-img3.gif"
        alt=""
        className="gif-image mb-24"
      />
      <h6 className="text-md text-neutral-600">Congratulations </h6>
      <p className="text-neutral-400 text-sm mb-0">
        Well done! You have successfully completed.
      </p>
    </div>
  </>
);

const NewOnBoardModal = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [show, setShow] = useState(true);

  const nextStep = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onHide = () => setShow(false);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1PersonalInfo nextStep={nextStep} />;
      case 2:
        return <Step2AdhaarInfo nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Step3PANCardInfo nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <Step4BankInfo nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <Step5VideoKYCInfo nextStep={nextStep} prevStep={prevStep} />;
      case 6:
        return <Step6Agreement nextStep={nextStep} prevStep={prevStep} />;
      case 7:
        return <Step7Completion prevStep={prevStep} onHide={onHide} />;
      default:
        return <Step1PersonalInfo nextStep={nextStep} />;
    }
  };

  return (
    <Modal
      size="lg"
      backdrop="static"
      show={show}
      onHide={onHide}
      contentClassName="h-100"
      backdropClassName="modal-backdrop-right"
    >
      <Modal.Header>
        <h6 className="mb-4 text-xl text-center w-100">KYC Verification</h6>
      </Modal.Header>
      <Modal.Body>
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="form-wizard">
                <form action="#" method="post">
                  <div className="form-wizard-header overflow-x-auto scroll-sm pb-8 my-32">
                    <ul className="list-unstyled form-wizard-list">
                      <li
                        className={`form-wizard-list__item ${
                          [2, 3, 4, 5, 6, 7].includes(currentStep) &&
                          "activated"
                        } ${currentStep === 1 && "active"} `}
                      >
                        <div className="form-wizard-list__line">
                          <span className="count">1</span>
                        </div>
                        <span className="text text-xs fw-semibold">
                          Contact Details
                        </span>
                      </li>
                      <li
                        className={`form-wizard-list__item ${
                          [3, 4, 5, 6, 7].includes(currentStep) && "activated"
                        } ${currentStep === 2 && "active"} `}
                      >
                        <div className="form-wizard-list__line">
                          <span className="count">2</span>
                        </div>
                        <span className="text text-xs fw-semibold">
                          Aadhaar Card
                        </span>
                      </li>
                      <li
                        className={`form-wizard-list__item ${
                          [4, 5, 6, 7].includes(currentStep) && "activated"
                        } ${currentStep === 3 && "active"} `}
                      >
                        <div className="form-wizard-list__line">
                          <span className="count">3</span>
                        </div>
                        <span className="text text-xs fw-semibold">
                          PAN Card
                        </span>
                      </li>
                      <li
                        className={`form-wizard-list__item ${
                          [5, 6, 7].includes(currentStep) && "activated"
                        } ${currentStep === 4 && "active"} `}
                      >
                        <div className="form-wizard-list__line">
                          <span className="count">4</span>
                        </div>
                        <span className="text text-xs fw-semibold">
                          Bank Details
                        </span>
                      </li>
                      <li
                        className={`form-wizard-list__item ${
                          [6, 7].includes(currentStep) && "activated"
                        } ${currentStep === 5 && "active"} `}
                      >
                        <div className="form-wizard-list__line">
                          <span className="count">5</span>
                        </div>
                        <span className="text text-xs fw-semibold">
                          Video Kyc
                        </span>
                      </li>
                      <li
                        className={`form-wizard-list__item ${
                          [7].includes(currentStep) && "activated"
                        } ${currentStep === 6 && "active"} `}
                      >
                        <div className="form-wizard-list__line">
                          <span className="count">6</span>
                        </div>
                        <span className="text text-xs fw-semibold">
                          Agreement
                        </span>
                      </li>
                      <li
                        className={`form-wizard-list__item ${
                          currentStep === 7 && "active"
                        } `}
                      >
                        <div className="form-wizard-list__line">
                          <span className="count">7</span>
                        </div>
                        <span className="text text-xs fw-semibold">
                          Completed
                        </span>
                      </li>
                    </ul>
                  </div>
                  <fieldset className={`wizard-fieldset ${"show"}`}>
                    {renderStep()}
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NewOnBoardModal;