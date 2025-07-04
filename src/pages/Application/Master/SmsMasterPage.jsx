import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import SmsMasterLayer from "../../../components/Application/Master/SmsMasterLayer";

const SmsMasterPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="SMS Master" />

        {/* SmsMasterLayer */}
        <SmsMasterLayer />
      </MasterLayout>
    </>
  );
};

export default SmsMasterPage;
