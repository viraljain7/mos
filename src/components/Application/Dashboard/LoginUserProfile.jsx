import { Icon } from "@iconify/react/dist/iconify.js";
import React  from "react";
import PasswordTab from "./UserProfile/PasswordTab";
import useUserProfileDetails from "../hooks/useUserProfileDetails.js";
import EditUserProfileLayer from "./UserProfile/EditUserProfileLayer.jsx";
import PersonalInfoLayer from "./UserProfile/PersonalInfoLayer.jsx";

const LoginUserProfile = () => {
  

  const { user, loading, error, refetch } = useUserProfileDetails();

  const currentUser=user;
  return (
    <div className="row gy-4">
      <div className="col-lg-4">
       <PersonalInfoLayer user={user} />
      </div>
      <div className="col-lg-8">
        <div className="card h-100">
          <div className="card-body p-24">
            <ul
              className="nav border-gradient-tab nav-pills mb-20 d-inline-flex"
              id="pills-tab"
              role="tablist"
            >
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
                  Change Password
                </button>
              </li>
            
            </ul>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-edit-profile"
                role="tabpanel"
                aria-labelledby="pills-edit-profile-tab"
                tabIndex={0}
              >
              <EditUserProfileLayer currentUser={currentUser} />
              </div>

              {/* Password Tabs */}
              <PasswordTab userID={currentUser.id} initiateLogout={true}/>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUserProfile;
