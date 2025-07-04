import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import FundReportLayer from "../../../components/Application/Fund/FundReportLayer";

function FundReportPage() {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Fund Report" />

        {/* FundReportLayer */}
        <FundReportLayer />
      </MasterLayout>
    </>
  );
}

export default FundReportPage;
