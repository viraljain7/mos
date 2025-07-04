import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import UpiPayoutLayer from "../components/UpiPayout";


const UpiPayoutPage = () => {
    return (
        <>

            {/* MasterLayout */}
            <MasterLayout>

                {/* Breadcrumb */}
                <Breadcrumb title="Upi Payout" />

                {/* UsersGridLayer */}
                <UpiPayoutLayer />

            </MasterLayout>

        </>
    );
};

export default UpiPayoutPage; 
