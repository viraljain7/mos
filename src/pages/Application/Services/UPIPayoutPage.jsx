import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import UPIPayoutLayer from "../../../components/Application/Services/UPIPayoutLayer";

const UPIPayoutPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="UPI Transfer" />

        {/* BankPayoutLayer */}
        <UPIPayoutLayer />
      </MasterLayout>
    </>
  );
};

export default UPIPayoutPage;
