import React from "react";
import UnitCountOne from "../../child/UnitCountOne";
import SalesReportGraph from "./DistributorStats/SalesReportGraph";
import ServicesOption from "./DistributorStats/ServicesOption";
import ServiceReport from "./DistributorStats/ServiceReport";
import DownLineReport from "./DistributorStats/DownLineReport";

function DistrbutorLayer() {
  return (
    <>
      {/* //wallet */}
      <UnitCountOne />

      <section className="row gy-4 mt-1">
        <ServicesOption />
        <SalesReportGraph className="col-xxl-5" />

        {/* Service Wise Sales Report */}
        <ServiceReport />
        {/* Downline Report */}
        <DownLineReport />

        {/* Option */}
      </section>
    </>
  );
}

export default DistrbutorLayer;
