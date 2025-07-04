import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import BankAccountLayer from "../../../components/Application/Master/BankAccountLayer";

const BankAccountPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title=" Bank Account" />

        {/* BankAccountLayer */}
        <BankAccountLayer />
      </MasterLayout>
    </>
  );
};

export default BankAccountPage;
