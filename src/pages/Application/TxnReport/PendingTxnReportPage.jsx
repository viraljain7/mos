import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import PendingTxnReportLayer from "../../../components/Application/TxnReport/PendingTxnReportLayer";

const PendingTxnReportPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Pending Report" />

        {/* PendingTxnReportLayer */}
        <PendingTxnReportLayer />
      </MasterLayout>
    </>
  );
};

export default PendingTxnReportPage;
