import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditUserProfileLayer from "../Dashboard/UserProfile/EditUserProfileLayer";
import PersonalInfoLayer from "../Dashboard/UserProfile/PersonalInfoLayer";
import PasswordTab from "../Dashboard/UserProfile/PasswordTab";
import KycManager from "./Modal/KycManager";
import EditSchemeModal from "./Modal/EditSchemeModal";

const MemberActionBtnProfileLayer = () => {
  const API = `${import.meta.env.VITE_APP_API_KEY}/member/transaction`;

  const token = sessionStorage.getItem("token");
  const userId =
    useSelector((state) => state.MemberUserId.value) ||
    localStorage.getItem("userId");

  const [user, setUser] = useState([]);

  const fetchUserData = useCallback(() => {
    const formData = new FormData();
    formData.append("type", "fetchuser");
    formData.append("user_id", userId); // Append form data key-value pairs
    // Append form data key-value pairs

    fetch(API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token here
        // Do not add 'Content-Type' when sending FormData; it will be set automatically
      },
      body: formData, // Pass the FormData directly as the body
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statuscode === "TXN") {
          setUser(data.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [API, token]); // Dependencies: API

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <div className="row gy-4">
      <div className="col-lg-4">
        <PersonalInfoLayer user={user} />
      </div>
      <div className="col-lg-8">
        <div className="card h-fit">
          {" "}
          {/* h-100 */}
          <div className="card-body p-24">
            <ul
              className="nav border-gradient-tab nav-pills mb-20 d-inline-flex  "
              id="pills-tab"
              role="tablist"
            >
              {/* Edit Profile Tab */}
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link d-flex align-items-center px-24 active"
                  id="pills-edit-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-edit-profile"
                  type="button"
                  role="tab"
                  aria-controls="pills-edit-profile"
                  aria-selected="true"
                >
                  Edit Profile
                </button>
              </li>
              {/* Scheme Tab */}
              <li className="nav-item " role="presentation">
                <button
                  className="nav-link d-flex align-items-center px-24  "
                  id="pills-scheme-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-scheme"
                  type="button"
                  role="tab"
                  aria-controls="pills-scheme"
                  tabIndex={-1}
                >
                  Scheme
                </button>
              </li>

              {/* Change Password Tab */}
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link d-flex align-items-center px-24"
                  id="pills-change-password-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-change-password"
                  type="button"
                  role="tab"
                  aria-controls="pills-change-password"
                  aria-selected="false"
                  tabIndex={-1}
                >
                  Change Credentials
                </button>
              </li>

              {/* KYC Manager Tab */}
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link d-flex align-items-center px-24"
                  id="pills-kyc-manager-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#pills-kyc-manager"
                  type="button"
                  role="tab"
                  aria-controls="pills-kyc-manager"
                  aria-selected="false"
                  tabIndex={-1}
                >
                  KYC
                </button>
              </li>
            </ul>
            <div className="tab-content" id="pills-tabContent">
              {/* Edit Profile Tab Content */}
              <div
                className="tab-pane fade active show"
                id="pills-edit-profile"
                role="tabpanel"
                aria-labelledby="pills-edit-profile-tab"
                tabIndex={0}
              >
                <EditUserProfileLayer currentUser={user} />
              </div>

              {/* Scheme Tab Content */}
              <EditSchemeModal scheme={user?.scheme} userID={userId} />

              {/* Change Password Tab Content */}
              <PasswordTab initiateLogout={false} userID={userId} />
              {/* KYC Manager Tab Content */}
              <KycManager KycStatus={user.kyc} userID={userId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberActionBtnProfileLayer;
