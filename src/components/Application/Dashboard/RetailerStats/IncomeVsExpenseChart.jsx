import React, { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import gsap from "gsap";
import useReactApexChart from "../../../../hook/useReactApexChart";

const IncomeVsExpenseChart = ({className}) => {
    useEffect(() => {
        // Create the animation
        const animation = gsap.from(".income-expense", {
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
  let { incomeExpenseOptions, incomeExpenseSeries } = useReactApexChart();
  return (
    <div className={`col-xxl-8 income-expense ${className || ""}`}>
      <div className='card h-100'>
        <div className='card-body p-24 mb-8'>
          <div className='d-flex align-items-center flex-wrap gap-2 justify-content-between'>
            <h6 className='mb-2 fw-bold text-lg mb-0'>Income Vs Expense </h6>
            <select className='form-select form-select-sm w-auto bg-base border text-secondary-light'>
              <option>Yearly</option>
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Today</option>
            </select>
          </div>
          <ul className='d-flex flex-wrap align-items-center justify-content-center my-3 gap-24'>
            <li className='d-flex flex-column gap-1'>
              <div className='d-flex align-items-center gap-2'>
                <span className='w-8-px h-8-px rounded-pill bg-primary-600' />
                <span className='text-secondary-light text-sm fw-semibold'>
                  Income{" "}
                </span>
              </div>
              <div className='d-flex align-items-center gap-8'>
                <h6 className='mb-0'> ₹26,201</h6>
                <span className='text-success-600 d-flex align-items-center gap-1 text-sm fw-bolder'>
                  10%
                  <i className='ri-arrow-up-s-fill d-flex' />
                </span>
              </div>
            </li>
            <li className='d-flex flex-column gap-1'>
              <div className='d-flex align-items-center gap-2'>
                <span className='w-8-px h-8-px rounded-pill bg-warning-600' />
                <span className='text-secondary-light text-sm fw-semibold'>
                  Expenses{" "}
                </span>
              </div>
              <div className='d-flex align-items-center gap-8'>
                <h6 className='mb-0'> ₹18,120</h6>
                <span className='text-danger-600 d-flex align-items-center gap-1 text-sm fw-bolder'>
                  10%
                  <i className='ri-arrow-down-s-fill d-flex' />
                </span>
              </div>
            </li>
          </ul>
          <div id='incomeExpense' className='apexcharts-tooltip-style-1'>
            <ReactApexChart
              options={incomeExpenseOptions}
              series={incomeExpenseSeries}
              type='area'
              height={270}
              width={"100%"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeVsExpenseChart;
