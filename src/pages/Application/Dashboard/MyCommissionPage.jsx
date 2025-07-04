import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import MyCommissionLayer from "../../../components/Application/Dashboard/MyCommisionLayer";

const MyCommission = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="My Commission" />

        {/* MyCommissionLayer */}
        <MyCommissionLayer />
      </MasterLayout>
    </>
  );
};

export default MyCommission;
