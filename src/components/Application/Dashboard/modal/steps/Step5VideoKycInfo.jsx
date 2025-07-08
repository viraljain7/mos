import { useEffect, useRef, useState } from "react";

const Step5VideoKYCInfo = ({ nextStep, prevStep }) => {
  const [verificationStep, setVerificationStep] = useState("initial");
  const [randomCode, setRandomCode] = useState("");
  const [countdown, setCountdown] = useState(30);
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
      setCountdown(30);
      countdownRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownRef.current);
            stopRecording();
            return 30;
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
export default Step5VideoKYCInfo;
