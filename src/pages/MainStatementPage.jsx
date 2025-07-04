import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import CreditLedgerLayer from "../components/MainStatementLayer";

const MainStatementPage = () => {
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title='Credit Ledger' />

                {/* GalleryLayer */}
                <CreditLedgerLayer />
            </MasterLayout>
        </>
    );
};



export default MainStatementPage
