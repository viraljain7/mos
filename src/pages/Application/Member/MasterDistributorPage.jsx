import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import MasterDistributorLayer from "../../../components/Application/Member/MasterDistributorLayer";

function MasterDistributorPage() {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Master Distributor" />

        {/* MasterDistributorLayer */}
        <MasterDistributorLayer />
      </MasterLayout>
    </>
  );
}
export default MasterDistributorPage;
