import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import gsap from 'gsap';

function ServiceReport() {
    useEffect(() => {
        // Create the animation
        const animation = gsap.from(".ServiceReport", {
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

    const serviceSales = [
        { payment: "RAZORPAY UTILITY", value: 0, amount: 0.0 },
        { payment: "RAZORPAY EDUCATION", value: 0, amount: 0.0 },
        { payment: "CASHFREE UTILITY", value: 0, amount: 0.0 },
        { payment: "CASHFREE EDUCATION", value: 559, amount: 22664061.0 },
        { payment: "FREECHARGE", value: 0, amount: 0.0 },
        { payment: "PAYOUT", value: 339, amount: 21810194.0 },
        { payment: "CC BILL PAY", value: 4, amount: 400.0 },
        { payment: "Total", value: 902, amount: 44474655.0 },
      ];
  return (
    <div className="col-xxl-6 col-md-6 ServiceReport">
    <div className="card h-100">
      <div className="card-header">
        <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
          <h6 className="mb-2 fw-bold text-lg mb-0">
            Service Wise Sales Report
          </h6>
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
                <th scope="col">Payment Method</th>
                <th scope="col">Value</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {serviceSales.map((item, index) => (
                <tr key={index}>
                  <td>
                    <span className="text-secondary-light fw-bold">
                      {item.payment}
                    </span>
                  </td>
                  <td>
                    <span className="text-secondary-light fw-bold">
                      {item.value}
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

export default ServiceReport
