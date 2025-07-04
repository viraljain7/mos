import React from "react";

import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import ApiUserLayer from "../../../components/Application/Member/ApiUserLayer";

function B2cUserPage() {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="API User" />

        {/* ApiUserLayer */}
        <ApiUserLayer />
      </MasterLayout>
    </>
  );
}
export default B2cUserPage;
