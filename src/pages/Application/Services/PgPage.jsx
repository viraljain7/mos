import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout.jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import PgLayer from "../../../components/Application/Services/PgLayer.jsx";

const PgPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Payment Gateway" />

        {/* OpenAccount */}
        <PgLayer />
      </MasterLayout>
    </>
  );
};

export default PgPage;
