import React from "react";

import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import DmtLayer from "../../../components/Application/Services/DmtLayer";

function DistributorPage() {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="DMT" />

        {/* DmtLayer */}
        <DmtLayer />
      </MasterLayout>
    </>
  );
}
export default DistributorPage;
