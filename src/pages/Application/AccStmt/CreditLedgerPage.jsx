import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout.jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import CreditLedgerLayer from "../../../components/Application/AccStmt/CreditLedgerLayer.jsx";

const CreditLedgerPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Credit Report" />

        {/* CreditLedgerLayer */}
        <CreditLedgerLayer />
      </MasterLayout>
    </>
  );
};

export default CreditLedgerPage;
