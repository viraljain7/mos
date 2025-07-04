import React, { useEffect, useState } from "react";
import { Modal, } from "react-bootstrap";
import useUserProfileDetails from "../../hooks/useUserProfileDetails";
import { Eye, EyeOff, Lock } from "lucide-react";
import {  toast } from "react-toastify";

function PasswordChangeModal() {
  const { user } = useUserProfileDetails();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user.is_passwordchanged === "0") {
      setShowModal(true);
    }
  }, [user]);

  const handleSuccess = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => {}}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Body className="radius-16 bg-base p-0">
          <div className="card h-100 p-32">
            <PasswordResetModal user={user} onSuccess={handleSuccess} setShowModal={setShowModal} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

const PasswordResetModal = ({ user, onSuccess,setShowModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const API = `${import.meta.env.VITE_APP_API_KEY}/member/transaction`;
  const token = sessionStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("type", "password");
      formDataToSend.append("old_password", user.mobile);
      formDataToSend.append("user_id", user.id);
      formDataToSend.append("new_password", formData.password);

      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.statuscode === "TXN") {
        toast.success(data.message || "Password reset successfully");
      setShowModal(false);

        setFormData({
          password: "",
          confirmPassword: "",
        });
        onSuccess();
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
    <form onSubmit={handleSubmit}>
      <div>
        <h6 className="mb-24 text-center">Change Password</h6>
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
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
      >
        {isLoading ? "Changing..." : "Change Password"}
      </button>
    </form>
  );
};

export default PasswordChangeModal;