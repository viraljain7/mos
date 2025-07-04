import React from "react";

import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import DMTppiLayer from "../../../components/Application/Services/DMTppiLayer";

function DMTppiPage() {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="DMT (PPI)" />

        {/* DmtLayer */}
        <DMTppiLayer />
      </MasterLayout>
    </>
  );
}
export default DMTppiPage;


