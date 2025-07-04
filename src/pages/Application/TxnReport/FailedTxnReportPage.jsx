import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout.jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import FailedTxnReportLayer from "../../../components/Application/TxnReport/FailedTxnReportLayer";

const FailedTxnReportPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Failed Report" />

        {/* FailedTxnReportLayer */}
        <FailedTxnReportLayer />
      </MasterLayout>
    </>
  );
};

export default FailedTxnReportPage;
