import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import gsap from "gsap";
import useReactApexChart from "../../../../hook/useReactApexChart";

const OverallReportChart = ({className}) => {


    useEffect(() => {
          // Create the animation
          const animation = gsap.from(".overallReport", {
            opacity: 0, // Start fully invisible
            y: 50, // Start 50px below the final position
            duration: 2, // Smooth duration
            stagger: 0.2, // Small stagger for sequential animation
            ease: "power3.out",
            delay: 0.5,
          });
      
          // Cleanup animation on component unmount
          return () => {
            animation.kill(); // Kill the animation to prevent memory leaks
          };
        }, []);
  let { userOverviewDonutChartOptionsTwo, userOverviewDonutChartSeriesTwo } =
    useReactApexChart();
  return (
    <div className={`col-xxl-4 col-md-6 ${className || ""} overallReport`}>
      <div className='card h-100'>
        <div className='card-header'>
          <div className='d-flex align-items-center flex-wrap gap-2 justify-content-between'>
            <h6 className='mb-2 fw-bold text-lg'>Overall Report</h6>
            <select className='form-select form-select-sm w-auto bg-base border text-secondary-light'>
              <option>Yearly</option>
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Today</option>
            </select>
          </div>
        </div>
        <div className='card-body p-24'>
          <div className='mt-32'>
            <div
              id='userOverviewDonutChart'
              className='mx-auto apexcharts-tooltip-z-none'
            >
              <ReactApexChart
                options={userOverviewDonutChartOptionsTwo}
                series={userOverviewDonutChartSeriesTwo}
                type='donut'
                height={270}
              />
            </div>
          </div>
          <div className='d-flex flex-wrap gap-20 justify-content-center mt-48'>
            <div className='d-flex align-items-center gap-8'>
              <span className='w-16-px h-16-px radius-2 bg-primary-600' />
              <span className='text-secondary-light'>Purchase</span>
            </div>
            <div className='d-flex align-items-center gap-8'>
              <span className='w-16-px h-16-px radius-2 bg-lilac-600' />
              <span className='text-secondary-light'>Sales</span>
            </div>
            <div className='d-flex align-items-center gap-8'>
              <span className='w-16-px h-16-px radius-2 bg-warning-600' />
              <span className='text-secondary-light'>Expense</span>
            </div>
            <div className='d-flex align-items-center gap-8'>
              <span className='w-16-px h-16-px radius-2 bg-success-600' />
              <span className='text-secondary-light'>Gross Profit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallReportChart;
