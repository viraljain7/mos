import React from "react";
import AllTransactionReportLayer from "../../../components/Application/TxnReport/AllTransactionReportLayer.jsx";
import MasterLayout from "../../../masterLayout/MasterLayout.jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";

const AllTransactionReportPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="All Transaction Report" />

        {/* AllTransactionReportLayer */}
        <AllTransactionReportLayer />
      </MasterLayout>
    </>
  );
};

export default AllTransactionReportPage;
