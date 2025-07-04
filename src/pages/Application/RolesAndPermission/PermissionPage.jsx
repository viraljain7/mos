import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import PermissionLayer from "../../../components/Application/RolesAndPermission/PermissionLayer";

const PermissionPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Permission" />

        {/* PermissionLayer */}
        <PermissionLayer />
      </MasterLayout>
    </>
  );
};

export default PermissionPage;
