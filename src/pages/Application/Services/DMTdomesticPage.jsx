import React from "react";

import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import DMTdomesticLayer from "../../../components/Application/Services/DMTdomesticLayer";

function DMTdomesticPage() {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="DMT (Domestic)" />

        {/* DmtLayer */}
        <DMTdomesticLayer />
      </MasterLayout>
    </>
  );
}
export default DMTdomesticPage;


