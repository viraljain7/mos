import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import WhiteLabelLayer from "../../../components/Application/Member/WhiteLabelLayer";

const WhiteLabelPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="White Label" />

        {/* WhiteLabelLayer */}
        <WhiteLabelLayer />
      </MasterLayout>
    </>
  );
};

export default WhiteLabelPage;
