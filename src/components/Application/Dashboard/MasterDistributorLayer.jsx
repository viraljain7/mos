import React from 'react'
import UnitCountOne from '../../child/UnitCountOne'
import ServiceCard from './RetailerStats/ServiceCard'
import IncomeVsExpenseChart from './RetailerStats/IncomeVsExpenseChart'
import OverallReportChart from './RetailerStats/OverallReportChart'
import RecentTxn from './RetailerStats/RecentTxn'
import ServicesOption from './DistributorStats/ServicesOption'
import SalesReportGraph from './DistributorStats/SalesReportGraph'
import ServiceReport from './DistributorStats/ServiceReport'
import DownLineReport from './DistributorStats/DownLineReport'

function MasterDistributorLayer() {
  return (
    <>
    <UnitCountOne /> 

    <section className="row gy-4 mt-1">
      {/* services card */}
      <ServiceCard />
      <ServicesOption/>
        <SalesReportGraph className="col-xxl-5" />

      

        {/* Service Wise Sales Report */}
      <ServiceReport/>
        {/* Downline Report */}
      <DownLineReport/>

      {/* RevenueStatisticOne */}
      <IncomeVsExpenseChart />
      <OverallReportChart  />
      {/* TXN */}
      <RecentTxn/>
    </section>
    </>
  )
}

export default MasterDistributorLayer
