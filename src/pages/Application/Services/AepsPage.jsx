import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout.jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import AepsLayer from "../../../components/Application/Services/AepsLayer.jsx";

const AepsPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="AEPS" />

        {/* AepsLayer */}
        <AepsLayer />
      </MasterLayout>
    </>
  );
};

export default AepsPage;
