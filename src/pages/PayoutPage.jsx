import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import PayoutLayer from "../components/PayoutLayer";


const PayoutPage = () => {
    return (
        <>

            {/* MasterLayout */}
            <MasterLayout>

                {/* Breadcrumb */}
                <Breadcrumb title="Quick Transfer" />

                {/* ViewProfileLayer */}
                <PayoutLayer />

            </MasterLayout>

        </>
    );
};

export default PayoutPage; 
