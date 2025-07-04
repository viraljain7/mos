import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout.jsx";
import Breadcrumb from "../../../components/Breadcrumb.jsx";
import CmsLayer from "../../../components/Application/Services/CmsLayer.jsx";

const CmsPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="CMS" />

        {/* CmsLayer */}
        <CmsLayer />
      </MasterLayout>
    </>
  );
};

export default CmsPage;
