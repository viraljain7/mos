import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout.jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import SuccessTxnReportLayer from "../../../components/Application/TxnReport/SuccessTxnReportLayer.jsx";

const SuccessTxnReportPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Success Report" />

        {/* SuccessTxnReportLayer */}
        <SuccessTxnReportLayer />
      </MasterLayout>
    </>
  );
};

export default SuccessTxnReportPage;
