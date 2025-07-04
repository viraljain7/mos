import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import LoadWalletRequestLayer from "../../../components/Application/Fund/LoadWalletRequestLayer";

const LoadWalletRequestPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Load Wallet Request" />

        {/* RequestFund */}
        <LoadWalletRequestLayer />
      </MasterLayout>
    </>
  );
};

export default LoadWalletRequestPage;
