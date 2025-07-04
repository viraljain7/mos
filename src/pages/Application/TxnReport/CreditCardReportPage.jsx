import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout.jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import CreditCardReportLayer from "../../../components/Application/TxnReport/CreditCardReportLayer.jsx";

const CreditCardReportPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Credit Card Report" />

        {/* PayoutReportLayer */}
        <CreditCardReportLayer />
      </MasterLayout>
    </>
  );
};

export default CreditCardReportPage;
