import React from "react";
import UnitCountOne from "../../child/UnitCountOne";
import ServiceCard from "./RetailerStats/ServiceCard";
import IncomeVsExpenseChart from "./RetailerStats/IncomeVsExpenseChart";
import OverallReportChart from "./RetailerStats/OverallReportChart";
import RecentTxn from "./RetailerStats/RecentTxn";


const RetailerLayer = () => {
  return (
    <>
      {/* //wallet */}
      <UnitCountOne /> 

      <section className="row gy-4 mt-1">
        {/* services card */}
        <ServiceCard />

        {/* RevenueStatisticOne */}
        <IncomeVsExpenseChart />
        <OverallReportChart  />
        {/* TXN */}
        <RecentTxn/>
      </section>
    </>
  );
};

export default RetailerLayer;
