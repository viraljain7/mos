import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout.jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import RechargeReportLayer from "../../../components/Application/TxnReport/RechargeReportLayer.jsx";

const RechargeReportPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Recharge Report" />

        {/* PayoutReportLayer */}
        <RechargeReportLayer />
      </MasterLayout>
    </>
  );
};

export default RechargeReportPage;
