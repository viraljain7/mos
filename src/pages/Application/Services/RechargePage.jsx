import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import Recharge from "../../../components/Application/Services/RechargeLayer";

const RechargePage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Recharge" />

        {/* Recharge */}
        <Recharge />
      </MasterLayout>
    </>
  );
};

export default RechargePage;
