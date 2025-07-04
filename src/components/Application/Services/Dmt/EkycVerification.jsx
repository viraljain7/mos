import { CircleCheck, SwitchCamera, Camera, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function EkycVerification({ modelStatus, setModelStatus }) {
  const [showModal, setShowModal] = useState(true);
  const [authMethod, setAuthMethod] = useState("Face");
  const [isCapturingFace, setIsCapturingFace] = useState(false);
  const [faceImage, setFaceImage] = useState(null);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleClose = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setShowModal(false);
    setIsCapturingFace(false);
    setFaceImage(null);
    setModelStatus(false);
  };

  const handleShow = () => setShowModal(true);

  const handleAuthMethodChange = (e) => {
    setAuthMethod(e.target.value);
    setIsCapturingFace(false);
    setFaceImage(null);
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert(
        "Could not access camera. Please ensure you've granted camera permissions."
      );
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleCaptureFace = async () => {
    setIsCapturingFace(true);
    await startCamera();
  };

  const handleRetakeFace = async () => {
    setFaceImage(null);
    await startCamera();
  };

  const captureFace = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get image data from canvas
      const imageData = canvas.toDataURL("image/jpeg");
      setFaceImage(imageData);
      stopCamera();
    }
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <>
      <div className="demo-content">
        <button
          type="button"
          className="badge text-sm fw-semibold border border-neutral-800 text-neutral-800 bg-transparent px-20 py-9 radius-4 text-white"
          onClick={handleShow}
        >
          {/* E-KYC */}
        </button>
      </div>

      <Modal
        show={showModal | modelStatus}
        onHide={handleClose}
        className="right fade"
      >
        <Modal.Header closeButton>
          <h6 className="fw-semibold">E-kyc Verification</h6>
        </Modal.Header>
        <Modal.Body>
          <div className="my-2">
            <div className="mb-20">
              <label
                htmlFor="state"
                className="form-label fw-semibold text-primary-light text-sm mb-8"
              >
                Auth Via <span className="text-danger-600">*</span>{" "}
              </label>
              <select
                className="form-control radius-8 form-select"
                id="state"
                value={authMethod}
                onChange={handleAuthMethodChange}
              >
                <option value="Face">Face Authentication</option>
                <option value="finger">Fingerprint</option>
              </select>
            </div>
          </div>

          {authMethod === "Face" ? (
            <>
              {isCapturingFace ? (
                <div className="face-capture-screen text-center my-20">
                  <div className="face-capture-preview mb-20">
                    {faceImage ? (
                      <img
                        src={faceImage}
                        alt="Captured Face"
                        className="img-fluid rounded"
                        style={{ maxHeight: "200px" }}
                      />
                    ) : (
                      <div style={{ position: "relative", height: "200px" }}>
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                        <canvas ref={canvasRef} style={{ display: "none" }} />
                      </div>
                    )}
                  </div>

                  {faceImage ? (
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-primary"
                        onClick={handleRetakeFace}
                        className="flex-grow-1"
                      >
                        Retake
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => setIsCapturingFace(false)}
                        className="flex-grow-1"
                      >
                        Confirm
                      </Button>
                    </div>
                  ) : (
                    <>
                      <p className="text-muted mb-20">
                        Position your face within the frame
                      </p>
                      <Button
                        variant="primary"
                        onClick={captureFace}
                        className="w-100 mb-10"
                      >
                        <Camera className="me-2" />
                        Capture Face
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={() => {
                          stopCamera();
                          setIsCapturingFace(false);
                        }}
                        className="w-100"
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <div className="my-20">
                    <label className="form-label fw-semibold text-primary-light text-sm mb-8">
                      Face Capture <span className="text-danger-600">*</span>
                    </label>
                    <Button
                      variant="primary"
                      onClick={handleCaptureFace}
                      className="w-100 py-12"
                    >
                      <Camera className="me-2" />
                      {faceImage ? "Recapture Face" : "Capture Face"}
                    </Button>
                  </div>

                  {faceImage && (
                    <div className="my-20">
                      <label className="form-label fw-semibold text-primary-light text-sm mb-8">
                        Captured Face
                      </label>
                      <div className="face-preview">
                        <img
                          src={faceImage}
                          alt="Captured Face"
                          className="img-fluid rounded"
                          style={{ maxHeight: "100px" }}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="my-20">
              <label
                htmlFor="fingerprint-capture"
                className="form-label fw-semibold text-primary-light text-sm mb-8"
              >
                Fingerprint Capture <span className="text-danger-600">*</span>
              </label>
              <div className="position-relative">
                <Button type="button" variant="primary" className="w-100 py-12">
                  Capture Fingerprint
                </Button>
              </div>
            </div>
          )}

          <div className="my-20">
            <label
              htmlFor="AadharNo"
              className="form-label fw-semibold text-primary-light text-sm mb-8"
            >
              Aadhar Number <span className="text-danger-600">*</span>
            </label>
            <div className="position-relative">
              <input
                type="text"
                className="form-control radius-8"
                id="AadharNo"
                placeholder="Enter Aadhar Number"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex gap-2 w-100">
            <div className="w-100 flex-grow">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="w-100"
              >
                Close
              </Button>
            </div>
            <div className="w-100 flex-grow">
              <Button
                variant="primary"
                onClick={handleClose}
                className="w-100"
                disabled={authMethod === "Face" && !faceImage}
              >
                Submit
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EkycVerification;