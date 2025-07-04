import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import ApiManagerLayer from "../../../components/Application/Master/ApiManagerLayer";

const ApiManagerPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="API Manager" />

        {/* ApiManagerLayer */}
        <ApiManagerLayer />
      </MasterLayout>
    </>
  );
};

export default ApiManagerPage;
