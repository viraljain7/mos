import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout.jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import BbpsReportLayer from "../../../components/Application/TxnReport/BbpsReportLayer.jsx";

const BbpsReportPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="BBPS Report" />

        {/* PayoutReportLayer */}
        <BbpsReportLayer />
      </MasterLayout>
    </>
  );
};

export default BbpsReportPage;
