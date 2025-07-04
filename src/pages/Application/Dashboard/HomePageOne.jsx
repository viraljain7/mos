import React from "react";
import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import DistributorLayer from "../../../components/Application/Dashboard/DistributorLayer";
import RetailerLayer from "../../../components/Application/Dashboard/RetailerLayer";
import DashBoardLayerOne from "../../../components/Application/Dashboard/DashBoardLayerOne";
import useUserProfileDetails from "../../../components/Application/hooks/useUserProfileDetails";


const HomePageOne = () => {
  const {user}=useUserProfileDetails();
  const userRole = user?.role?.name;


  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Home" />

        {/* DashBoardLayerOne */}

        {user&&userRole==="Retailer"&& <RetailerLayer/>}

        {user&&userRole==="MasterDistributor"&& (<DistributorLayer/>)}
        {user&&userRole==="Distributor"&& (<DistributorLayer/>)}
        {user&&userRole==="CNF"&& (<DistributorLayer/>)}
        
        {user&&userRole==="Whitelabel" && (<DashBoardLayerOne/>)}
        {user&&userRole==="ApiUser" && (<DashBoardLayerOne/>)}
        {user&&userRole==="Admin" &&  <DashBoardLayerOne /> }

      </MasterLayout>
    </>
  );
};

export default HomePageOne;
