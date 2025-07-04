import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import LoginUserProfile from "../../../components/Application/Dashboard/LoginUserProfile";

const LoginUserProfilePage = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Login User Profile" />

        <LoginUserProfile />
      </MasterLayout>
    </>
  );
};

export default LoginUserProfilePage;
