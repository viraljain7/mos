import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import GalleryLayer from "../components/GalleryLayer";

const QrStatementPage = () => {
    return (
        <>
            {/* MasterLayout */}
            <MasterLayout>
                {/* Breadcrumb */}
                <Breadcrumb title='Gallery Grid Desc' />

                {/* GalleryLayer */}
                <GalleryLayer />
            </MasterLayout>
        </>
    );
};

export default QrStatementPage
