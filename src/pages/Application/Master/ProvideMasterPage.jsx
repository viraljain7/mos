import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import ProvideMasterLayer from "../../../components/Application/Master/ProvideMasterLayer";

const ProvideMasterPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Provide Master" />

        {/* ProvideMasterLayer */}
        <ProvideMasterLayer />
      </MasterLayout>
    </>
  );
};

export default ProvideMasterPage;
