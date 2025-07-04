import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import MemberActionBtnProfileLayer from "../components/Application/Member/MemberActionBtnProfileLayer";



const MemberActionBtnProfilePage = () => {
    return (
        <>

            {/* MasterLayout */}
            <MasterLayout>

                {/* Breadcrumb */}
                <Breadcrumb title="User Profile" />

                {/* PaginationLayer */}

                <MemberActionBtnProfileLayer />

            </MasterLayout>

        </>
    );
};

export default MemberActionBtnProfilePage; 
