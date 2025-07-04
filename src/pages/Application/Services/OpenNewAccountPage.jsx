import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout.jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import OpenNewAccount from "../../../components/Application/Services/OpenNewAccount.jsx";

const OpenNewAccountPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Open New Account" />

        {/* OpenAccount */}
        <OpenNewAccount />
      </MasterLayout>
    </>
  );
};

export default OpenNewAccountPage;
