import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import BbpsLayer from "../../../components/Application/Services/BbpsLayer";

const BbpsPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="BBPS" />

        {/* BbpsLayer */}
        <BbpsLayer />
      </MasterLayout>
    </>
  );
};

export default BbpsPage;
