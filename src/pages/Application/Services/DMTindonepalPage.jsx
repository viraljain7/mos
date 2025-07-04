import React from "react";

import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import DMTindonepalLayer from "../../../components/Application/Services/DMTindonepalLayer";

function DMTindonepalPage() {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Indo Nepal" />

        {/* DmtLayer */}
        <DMTindonepalLayer />
      </MasterLayout>
    </>
  );
}
export default DMTindonepalPage;


