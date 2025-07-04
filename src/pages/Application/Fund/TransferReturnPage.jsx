import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import TransferReturn from "../../../components/Application/Fund/TransferReturnLayer";

const TransferReturnPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Transfer Return Report" />

        {/* TransferReturn */}
        <TransferReturn />
      </MasterLayout>
    </>
  );
};

export default TransferReturnPage;
