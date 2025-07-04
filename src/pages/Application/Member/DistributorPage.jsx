import React from "react";

import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import DistributorLayer from "../../../components/Application/Member/DistributorLayer";

function DistributorPage() {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Distributor" />

        {/* DistributorLayer */}
        <DistributorLayer />
      </MasterLayout>
    </>
  );
}
export default DistributorPage;
