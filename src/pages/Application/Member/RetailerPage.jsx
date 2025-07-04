import React from "react";

import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import RetailerLayer from "../../../components/Application/Member/RetailerLayer";

function RetailerPage() {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Retailer" />

        {/* RetailerLayer */}
        <RetailerLayer />
      </MasterLayout>
    </>
  );
}
export default RetailerPage;
