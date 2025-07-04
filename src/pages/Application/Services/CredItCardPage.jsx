import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout.jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import CreditCard from "../../../components/Application/Services/CreditCardLayer.jsx";

const CreditCardPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Credit Card" />

        {/* CreditCard */}
        <CreditCard />
      </MasterLayout>
    </>
  );
};

export default CreditCardPage;
