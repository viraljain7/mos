import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import ReactApexChart from "react-apexcharts";
import useReactApexChart from "../../hook/useReactApexChart";
import { useEffect } from "react";
import gsap from "gsap";

const TotalSubscriberOne = () => {
  useEffect(() => {
    // Create the animation
    const animation = gsap.from(".Sales-Statistic", {
      opacity: 0, // Start fully invisible
      y: 500, // Start 50px below the final position
      duration: 2, // Smooth duration
      ease: "power3.out",
    });

    // Cleanup animation on component unmount
    return () => {
      animation.kill(); // Kill the animation to prevent memory leaks
    };
  }, []);
  let { barChartSeries, barChartOptions } = useReactApexChart();
  return (
    <div className="col-xxl-3 col-xl-6 Sales-Statistic">
      <div className="card h-100 radius-8 border">
        <div className="card-body p-24">
          <h6 className="mb-12 fw-semibold text-lg mb-16">Total Subscriber</h6>
          <div className="d-flex align-items-center gap-2 mb-20">
            <h6 className="fw-semibold mb-0">5,000</h6>
            <p className="text-sm mb-0">
              <span className="bg-danger-focus border br-danger px-8 py-2 rounded-pill fw-semibold text-danger-main text-sm d-inline-flex align-items-center gap-1">
                10%
                <Icon icon="iconamoon:arrow-down-2-fill" className="icon" />
              </span>
              - 20 Per Day
            </p>
          </div>
          <ReactApexChart
            options={barChartOptions}
            series={barChartSeries}
            type="bar"
            height={264}
          />
        </div>
      </div>
    </div>
  );
};

export default TotalSubscriberOne;
