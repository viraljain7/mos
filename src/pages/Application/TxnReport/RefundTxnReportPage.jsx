import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout.jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import RefundTxnReportLayer from "../../../components/Application/TxnReport/RefundTxnReportLayer";

const RefundTxnReportPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Refund Report" />

        {/* RefundTxnReportLayer */}
        <RefundTxnReportLayer />
      </MasterLayout>
    </>
  );
};

export default RefundTxnReportPage;
