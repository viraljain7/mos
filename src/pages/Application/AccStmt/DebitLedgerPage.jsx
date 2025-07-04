import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout.jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import DebitLedgerLayer from "../../../components/Application/AccStmt/CreditLedgerLayer.jsx";

const DebitLedgerPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Debit Report" />

        {/* DebitLedgerLayer */}
        <DebitLedgerLayer />
      </MasterLayout>
    </>
  );
};

export default DebitLedgerPage;
