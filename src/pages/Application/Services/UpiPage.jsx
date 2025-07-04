import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout.jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import UpiLayer from "../../../components/Application/Services/UpiLayer.jsx";

const UpiPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Upi Collection" />

        {/* CreditCard */}
        <UpiLayer />
      </MasterLayout>
    </>
  );
};

export default UpiPage;
