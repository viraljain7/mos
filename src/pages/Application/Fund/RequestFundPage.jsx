import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import RequestFund from "../../../components/Application/Fund/RequestFund";

const RequestFundPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Request Report" />

        {/* RequestFund */}
        <RequestFund />
      </MasterLayout>
    </>
  );
};

export default RequestFundPage;
