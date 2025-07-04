import React from "react";

import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import UserPermissionLayer from "../../../components/Application/Member/UserPermissionLayer";

const UserPermissionPage = () => {
    return (
        <>

            {/* MasterLayout */}
            <MasterLayout>

                {/* Breadcrumb */}
                <Breadcrumb title="Member Permission" />

                <UserPermissionLayer/>

            </MasterLayout>

        </>
    );
};

export default UserPermissionPage; 
