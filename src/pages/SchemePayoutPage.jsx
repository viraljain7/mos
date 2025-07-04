import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import SchemePayoutLayer from "../components/SchemePayoutLayer";

const SchemePayoutPage = () => {
    return (
        <>

            {/* MasterLayout */}
            <MasterLayout>

                {/* Breadcrumb */}
                <Breadcrumb title="Scheme Manager" />

                <SchemePayoutLayer />
            </MasterLayout>

        </>
    );
};

export default SchemePayoutPage;





