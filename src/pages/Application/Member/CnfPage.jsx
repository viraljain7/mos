import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import CnfLayer from "../../../components/Application/Member/CnfLayer";

const CnfPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="CNF" />

        {/* CnfLayer */}
        <CnfLayer />
      </MasterLayout>
    </>
  );
};

export default CnfPage;
