import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import DefaultPermissionLayer from "../../../components/Application/RolesAndPermission/DefaultPermissionLayer";

const PermissionPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Default Permission" />

        {/* PermissionLayer */}
        <DefaultPermissionLayer />
      </MasterLayout>
    </>
  );
};

export default PermissionPage;
