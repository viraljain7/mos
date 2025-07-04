import React, { useState, useEffect } from "react";

function PayoutModal({ openModal, setPayoutList,setSubmitHandler }) {
  const [formData, setFormData] = useState({
    mobile: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const token = sessionStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Remove non-digit characters
    const digitsOnly = value.replace(/\D/g, "");

    setFormData((prev) => ({
      ...prev,
      [name]: digitsOnly,
    }));
  };

  

  const handleSubmit =React.useCallback(async (e)=> {
    // Prevent default if called from form submission
    if (e) e.preventDefault();

    if (!formData.mobile || formData.mobile.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsLoading(true);
    try {
      const formPayload = new FormData();
      formPayload.append("type", "upipayoutlist");
      formPayload.append("mobile", formData.mobile);

      const response = await fetch(
        `${import.meta.env.VITE_APP_API_KEY}/service/upi-payout`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formPayload,
        },
      );

      if (response.ok) {
        const data = await response.json();
        if (data.statuscode === "TXN") {
          // toast.success(data.message || "Payout list fetched successfully");
          // Ensure we're setting an array
          if (Array.isArray(data.data)) {
            setPayoutList(data.data);

          } else if (data.data) {
            // If single object, wrap in array
            setPayoutList([data.data]);

          } else {
            setPayoutList([]);
          }
          openModal(true);
        } else {
          toast.error(data.message || "Failed to fetch payout list");
        }
      } else {
        toast.error("Failed to process request");
      }
    } catch (error) {
      toast.error("An error occurred while processing your request");
    } finally {
      setIsLoading(false);
    }
  }, [formData.mobile, token]);
// Watch for mobile number length changes
useEffect(() => {
  if (formData.mobile.length === 10) {
    handleSubmit();
  }
}, [formData.mobile]);

  // Pass handleSubmit up to parent's parent
  useEffect(() => {
    if (setSubmitHandler) {
      setSubmitHandler(() => handleSubmit);
    }
  }, [handleSubmit, setSubmitHandler]);


  return (
    <div
      className="tab-pane fade show active"
      id="pills-edit-profile"
      role="tabpanel"
      aria-labelledby="pills-edit-profile-tab"
      tabIndex={0}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-20">
          <label
            htmlFor="mobile"
            className="form-label fw-semibold text-primary-light text-sm mb-8"
          >
            Mobile No. <span className="text-danger-600">*</span>
          </label>
          <div className="position-relative">
            <input
              type="tel" // Changed to tel for better mobile keyboard
              className="form-control radius-8"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter 10-digit Mobile Number"
              maxLength="10"
              pattern="[0-9]{10}"
              required
            />
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-center gap-3">
          <button
            type="submit"
            className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
            disabled={isLoading}
          >
            {isLoading ? <>Processing...</> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PayoutModal;
