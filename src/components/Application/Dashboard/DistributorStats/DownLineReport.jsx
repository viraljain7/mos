import gsap from 'gsap';
import React from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function DownLineReport() {
    useEffect(() => {
        // Create the animation
        const animation = gsap.from(".DownLineReport", {
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
    const downlineReport = [
        { role: "EMPLOYEE", count: 0, amount: 0.0 },
        { role: "SUPER DISTRIBUTOR", count: 1, amount: 0.0 },
        { role: "MASTER DISTRIBUTOR", count: 1, amount: 0.0 },
        { role: "DISTRIBUTOR", count: 2, amount: 0.0 },
        { role: "RETAILER", count: 20, amount: 1160723.75 },
        { role: "Total", count: 24, amount: 1160723.75 },
      ];
  return (
    <div className="col-xxl-6 col-md-6 DownLineReport">
    <div className="card h-100">
      <div className="card-header">
        <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
          <h6 className="mb-2 fw-bold text-lg mb-0">Downline Report</h6>
          <Link
            to="#"
            className="text-primary-600 hover-text-primary d-flex align-items-center gap-1"
          >
            View All
            <iconify-icon
              icon="solar:alt-arrow-right-linear"
              className="icon"
            />
          </Link>
        </div>
      </div>
      <div className="card-body p-24">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table mb-0">
            <thead>
              <tr>
                <th scope="col">Role</th>
                <th scope="col">Count</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {downlineReport.map((item, index) => (
                <tr key={index}>
                  <td>
                    <span className="text-secondary-light fw-bold">
                      {item.role}
                    </span>
                  </td>
                  <td>
                    <span className="text-secondary-light fw-bold">
                      {item.count}
                    </span>
                  </td>
                  <td>
                    <span className="text-secondary-light fw-bold">
                      ₹{item.amount.toLocaleString("en-IN")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  )
}

export default DownLineReport
