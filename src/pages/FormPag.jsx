import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import FormLayer from "../components/FormLayer";

const FormPag = () => {
    return (
        <>
            {/* MasterLayout */}
            {/* Breadcrumb */}
            {/* DashBoardLayerEight */}
            <MasterLayout>
                <Breadcrumb title='Form' />

                <FormLayer />
            </MasterLayout>
        </>
    );
};


export default FormPag
