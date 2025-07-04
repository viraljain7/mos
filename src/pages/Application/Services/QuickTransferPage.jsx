import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import QuickTransferLayer from "../../../components/Application/Services/QuickTransferLayer";

const QuickTransferPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Quick Transfer" />

        {/* QuickTransferLayer */}
        <QuickTransferLayer />
      </MasterLayout>
    </>
  );
};

export default QuickTransferPage;
