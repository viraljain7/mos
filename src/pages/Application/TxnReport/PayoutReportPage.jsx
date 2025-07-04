import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout.jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import PayoutReportLayer from "../../../components/Application/TxnReport/PayoutReportLayer.jsx";

const PayoutReportPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Payout Report" />

        {/* PayoutReportLayer */}
        <PayoutReportLayer />
      </MasterLayout>
    </>
  );
};

export default PayoutReportPage;
