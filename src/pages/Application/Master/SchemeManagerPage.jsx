import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import SchemeManagerLayer from "../../../components/Application/Master/SchemeManagerLayer";

const SchemeManagerPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Scheme Manager" />
        {/*SchemeManagerLayer  */}
        <SchemeManagerLayer />
      </MasterLayout>
    </>
  );
};

export default SchemeManagerPage;
