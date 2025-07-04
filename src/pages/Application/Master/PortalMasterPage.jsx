import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import PortalMaster from "../../../components/Application/Master/PortalMasterLayer";

const PortalMasterPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Portal Master" />

        {/* PortalMaster */}
        <PortalMaster />
      </MasterLayout>
    </>
  );
};

export default PortalMasterPage;
