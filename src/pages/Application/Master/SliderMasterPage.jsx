import MasterLayout from "../../../masterLayout/MasterLayout";
import Breadcrumb from "../../../components/Breadcrumb";
import SliderMasterLayer from "../../../components/Application/Master/SliderMasterLayer";

const SliderMasterPage = () => {
  return (
    <>
      {/* MasterLayout */}
      <MasterLayout>
        {/* Breadcrumb */}
        <Breadcrumb title="Slider Master" />

        {/* SliderMasterLayer */}
        <SliderMasterLayer />
      </MasterLayout>
    </>
  );
};

export default SliderMasterPage;
