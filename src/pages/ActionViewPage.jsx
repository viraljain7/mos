import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ActionViewProfile from "../components/ActionViewProfile";




const ActionViewPage = () => {
    return (
        <>

            {/* MasterLayout */}
            <MasterLayout>

                {/* Breadcrumb */}
                <Breadcrumb title="Profile - view" />

                {/* ActionViewProfile */}
                <ActionViewProfile />


            </MasterLayout>

        </>
    );
};

export default ActionViewPage;
