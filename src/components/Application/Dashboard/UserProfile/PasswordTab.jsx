import { Lock } from "lucide-react";
import React, {  useState } from "react";
import { toast,  } from "react-toastify";
import logoutHandler from "../../hooks/logout";

function PasswordTab({userID,initiateLogout}) {

  const token = sessionStorage.getItem("token");
  const [loading, setLoading] = useState(false); // Loading state
  const [passData, setPassData] = useState({
    oldPass: "",
    newPass: "",
    confirmPass: "",
    oldTpin: "",
    newTpin: "",
    confirmTpin: "",
    oldMpin: "",
    newMpin: "",
    confirmMpin: "",
  });

  // Handler form for Password submission
  const changePasswordHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Destructure values from state
    const { oldPass, newPass, confirmPass } = passData;

    // Validate inputs (optional)
    if (!oldPass || !newPass || !confirmPass) {
      toast.error("Please fill in both fields.");
      return;
    }
    setLoading(true);
    const formPayload = new FormData();
    formPayload.append("type", "password");

    try {
      // API request

      if (newPass !== confirmPass) {
        toast.error("Passwords do not match.");
        return;
      }
      formPayload.append("old_password", oldPass);
      formPayload.append("new_password", newPass);
      formPayload.append("user_id", userID);

      const response = await fetch(
        `${import.meta.env.VITE_APP_API_KEY}/member/transaction`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formPayload,
        }
      );

      // Parse the response
      const result = await response.json();

      // Check if the request was successful
      if (response.ok) {
        if (result.statuscode === "TXN") {
          toast.success(result.message);

          setPassData({ oldPass: "", newPass: "", confirmPass: "" });
          if(initiateLogout){
            logoutHandler();
          }
        } else {
          toast.error(result.message);
        }
        // Reset form fields after successful submission
      } else {
        // Handle API errors
        toast.error(result.message);
      }
    } catch (err) {
      // Handle network errors
      console.error("API Error:", err);
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  // Handler  form for MPIN Password submission
  const changeMPinPasswordHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Destructure values from state
    const { oldMpin, newMpin, confirmMpin } = passData;

    // Validate inputs (optional)
    if (!oldMpin || !newMpin || !confirmMpin) {
      toast.error("Please fill in both fields.");
      return;
    }
    setLoading(true);
    const formPayload = new FormData();
    formPayload.append("type", "mpin");

    try {
      // API request

      if (newMpin !== confirmMpin) {
        toast.error("MPIN do not match.");
        return;
      }
      formPayload.append("old_mpin", oldMpin);
      formPayload.append("new_mpin", newMpin);
      formPayload.append("user_id", userID);


      const response = await fetch(
        `${import.meta.env.VITE_APP_API_KEY}/member/transaction`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formPayload,
        }
      );

      // Parse the response
      const result = await response.json();

      // Check if the request was successful
      if (response.ok) {
        if (result.statuscode === "TXN") {
          toast.success(result.message);

          setPassData({ oldMpin: "", newMpin: "", confirmMpin: "" });
          if(initiateLogout){
            logoutHandler();
          }
        } else {
          toast.error(result.message);
        }
        // Reset form fields after successful submission
      } else {
        // Handle API errors
        toast.error(result.message);
      }
    } catch (err) {
      // Handle network errors
      console.error("API Error:", err);
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  // Handler  form for TPIN Password submission
  const changeTPinPasswordHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Destructure values from state
    const { oldTpin, newTpin, confirmTpin } = passData;
    // Validate inputs (optional)
    if (!oldTpin || !newTpin || !confirmTpin) {
      toast.error("Please fill in both fields.");
      return;
    }
    setLoading(true);
    const formPayload = new FormData();
    formPayload.append("type", "tpin");

    try {
      // API request

      if (newTpin !== confirmTpin) {
        toast.error("TPIN do not match.");
        return;
      }
      formPayload.append("old_tpin", oldTpin);
      formPayload.append("new_tpin", newTpin);
      formPayload.append("user_id", userID);


      const response = await fetch(
        `${import.meta.env.VITE_APP_API_KEY}/member/transaction`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formPayload,
        }
      );

      // Parse the response
      const result = await response.json();

      // Check if the request was successful
      if (response.ok) {
        if (result.statuscode === "TXN") {
          toast.success(result.message);

          setPassData({ oldTpin: "", newTpin: "", confirmTpin: "" });
          if(initiateLogout){
            logoutHandler();
          }
        } else {
          toast.error(result.message);
        }
        // Reset form fields after successful submission
      } else {
        // Handle API errors
        toast.error(result.message);
      }
    } catch (err) {
      // Handle network errors
      console.error("API Error:", err);
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  // Handler for input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setPassData((prevData) => ({
      ...prevData, // Spread the previous state
      [id]: value, // Update the specific field
    }));
  };

  const clearFields = () => {
    setPassData({
      oldPass: "",
      newPass: "",
      confirmPass: "",
      oldTpin: "",
      newTpin: "",
      confirmTpin: "",
      oldMpin: "",
      newMpin: "",
      confirmMpin: "",
    });
  };

  return (
    <div
      className="tab-pane fade"
      id="pills-change-password"
      role="tabpanel"
      aria-labelledby="pills-change-password-tab"
      tabIndex="0"
    >
    {/* {!loading && 
      <ToastContainer />
    } */}
      <div className="col">
        <div className=" overflow-hidden position-relative radius-12 h-fit">
          <div className="card-body pt-10">
            <ul
              className="nav button-tab nav-pills mb-16"
              id="pills-tab-four"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link d-flex align-items-center gap-2 fw-semibold text-primary-light radius-4 px-16 py-10 active"
                  id="pills-password-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-password"
                  type="button"
                  role="tab"
                  aria-controls="pills-password"
                  aria-selected="true"
                >
                  <Lock size={20} />
                  <span className="line-height-1">Password</span>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link d-flex align-items-center gap-2 fw-semibold text-primary-light radius-4 px-16 py-10"
                  id="pills-Mpin-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-Mpin"
                  type="button"
                  role="tab"
                  aria-controls="pills-Mpin"
                  aria-selected="false"
                >
                  <Lock size={20} />
                  <span className="line-height-1">MPin</span>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link d-flex align-items-center gap-2 fw-semibold text-primary-light radius-4 px-16 py-10"
                  id="pills-Tpin-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-Tpin"
                  type="button"
                  role="tab"
                  aria-controls="pills-Tpin"
                  aria-selected="false"
                >
                  <Lock size={20} />
                  <span className="line-height-1">TPin</span>
                </button>
              </li>
            </ul>
            <div className="tab-content" id="pills-tab-fourContent">
              {/* Main Password */}
              <div
                className="tab-pane fade show active"
                id="pills-password"
                role="tabpanel"
                aria-labelledby="pills-password-tab"
                tabIndex={0}
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="flex-grow-1">
                    {/* Password Change Form */}
                    <form onSubmit={changePasswordHandler}>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="mb-20">
                            <label
                              htmlFor="oldPass" // Match the id with the state key
                              className="form-label fw-semibold text-primary-light text-sm mb-8"
                            >
                              Old Password
                              <span className="text-danger-600">*</span>
                            </label>
                            <input
                              type="password"
                              className="form-control radius-8"
                              id="oldPass" // Match the id with the state key
                              placeholder="Enter Old Password"
                              value={passData.oldPass}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="mb-20">
                            <label
                              htmlFor="newPass" // Match the id with the state key
                              className="form-label fw-semibold text-primary-light text-sm mb-8"
                            >
                              New Password
                              <span className="text-danger-600">*</span>
                            </label>
                            <input
                              type="password"
                              className="form-control radius-8"
                              id="newPass" // Match the id with the state key
                              placeholder="Enter New Password"
                              value={passData.newPass}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="mb-20">
                            <label
                              htmlFor="confirmPass" // Match the id with the state key
                              className="form-label fw-semibold text-primary-light text-sm mb-8"
                            >
                              Confirm Password
                              <span className="text-danger-600">*</span>
                            </label>
                            <input
                              type="password"
                              className="form-control radius-8"
                              id="confirmPass" // Match the id with the state key
                              placeholder="Enter Confirm Password"
                              value={passData.confirmPass}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-center gap-3">
                        <button
                          type="button"
                          className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-40 py-11 radius-8"
                          onClick={clearFields}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary border border-primary-600 text-md px-40 py-12 radius-8"
                          disabled={loading}
                        >
                          Change
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* MPin */}
              <div
                className="tab-pane fade"
                id="pills-Mpin"
                role="tabpanel"
                aria-labelledby="pills-Mpin-tab"
                tabIndex={0}
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="flex-grow-1">
                    {/* MPin Change Form */}
                    <form onSubmit={changeMPinPasswordHandler}>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="mb-20">
                            <label
                              htmlFor="oldMpin"
                              className="form-label fw-semibold text-primary-light text-sm mb-8"
                            >
                              Old Mpin Password
                              <span className="text-danger-600">*</span>
                            </label>
                            <input
                              type="password"
                              className="form-control radius-8"
                              id="oldMpin"
                              placeholder="Enter Old Mpin Password"
                              value={passData.oldMpin}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="mb-20">
                            <label
                              htmlFor="newMpin"
                              className="form-label fw-semibold text-primary-light text-sm mb-8"
                            >
                              New Mpin Password
                              <span className="text-danger-600">*</span>
                            </label>
                            <input
                              type="password"
                              className="form-control radius-8"
                              id="newMpin"
                              placeholder="Enter New Mpin Password"
                              value={passData.newMpin}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="mb-20">
                            <label
                              htmlFor="confirmMpin"
                              className="form-label fw-semibold text-primary-light text-sm mb-8"
                            >
                              Confirm Mpin Password
                              <span className="text-danger-600">*</span>
                            </label>
                            <input
                              type="password"
                              className="form-control radius-8"
                              id="confirmMpin"
                              placeholder="Enter Confirm Mpin Password"
                              value={passData.confirmMpin}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-center gap-3">
                        <button
                          type="button"
                          className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-40 py-11 radius-8"
                          onClick={clearFields}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary border border-primary-600 text-md px-40 py-12 radius-8"
                          disabled={loading}
                        >
                          Change
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* TPin */}
              <div
                className="tab-pane fade"
                id="pills-Tpin"
                role="tabpanel"
                aria-labelledby="pills-Tpin-tab"
                tabIndex={0}
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="flex-grow-1">
                    {/* Password Change Form */}
                    <form onSubmit={changeTPinPasswordHandler}>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="mb-20">
                            <label
                              htmlFor="oldTpin"
                              className="form-label fw-semibold text-primary-light text-sm mb-8"
                            >
                              Old TPIN Password
                              <span className="text-danger-600">*</span>
                            </label>
                            <input
                              type="password"
                              className="form-control radius-8"
                              id="oldTpin"
                              placeholder="Enter Old TPin Password"
                              value={passData.oldTpin}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="mb-20">
                            <label
                              htmlFor="newTpin"
                              className="form-label fw-semibold text-primary-light text-sm mb-8"
                            >
                              New TPIN Password
                              <span className="text-danger-600">*</span>
                            </label>
                            <input
                              type="password"
                              className="form-control radius-8"
                              id="newTpin"
                              placeholder="Enter New TPin Password"
                              value={passData.newTpin}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="mb-20">
                            <label
                              htmlFor="confirmTpin"
                              className="form-label fw-semibold text-primary-light text-sm mb-8"
                            >
                              Confirm TPIN Password
                              <span className="text-danger-600">*</span>
                            </label>
                            <input
                              type="password"
                              className="form-control radius-8"
                              id="confirmTpin"
                              placeholder="Enter Confirm TPin Password"
                              value={passData.confirmTpin}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-center gap-3">
                        <button
                          type="button"
                          className="border border-danger-600 bg-hover-danger-200 text-danger-600 text-md px-40 py-11 radius-8"
                          onClick={clearFields}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary border border-primary-600 text-md px-40 py-12 radius-8"
                        >
                          Change
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordTab;
