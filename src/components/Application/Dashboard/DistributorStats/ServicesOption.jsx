import gsap from "gsap";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function ServicesOption() {
  useEffect(() => {
    const containerAnimation = gsap.from(".ServicesOption", {
      opacity: 0, // Start fully invisible
      y: 150, // Start 200px below the final position
      duration: 0.5, // Smooth duration
      ease: "power3.out",
      delay: 0.5,
    });
    return () => {
      containerAnimation.kill(); // Kill the animation to prevent memory leaks
      // Kill the animation to prevent memory leaks
    };
  }, []);

  const services = [
    {
      id: 11,
      icon: "ri-user-add-line", // More specific "add user" icon
      title: "Add User",
      path: "/upi",
    },
    {
      id: 2,
      icon: "ri-arrow-left-right-line", // Direct wallet transfer icon
      title: "Wallet Transfer",
      path: "/all-transaction-report",
    },
    {
      id: 3,
      icon: "ri-money-dollar-circle-line", // Money/commission icon
      title: "Commission",
      path: "/mycommission",
    },
    {
      id: 4,
      icon: "ri-file-list-2-line", // Report/document icon
      title: "Txn Report",
      path: "/upi-transfer",
    },
  ];
  return (
    <div className="col-xxl-7 ServicesOption">
      <div className="card">
        <div className="card-header">
          <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
            <h6 className="mb-2 fw-bold text-lg mb-0">Services</h6>
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
        <div className="card-body p-20">
          <div className="row g-3">
            <div className="col-md-12">
              <div className="row g-3">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="col-12  col-sm-6 col-md-4 col-lg-3 col-xl-2 cursor-pointer service-card"
                    style={{
                      width: "100%", // Full width on mobile
                      minWidth: service.id !== 3 ? "150px" : "154px", // Minimum width
                      maxWidth: service.id !== 3 ? "150px" : "154px", // Fixed width on md and larger
                    }}
                  >
                    <Link
                      to={service.path}
                      className="text-decoration-none  d-block h-100"
                    >
                      <div className="radius-8 h-100 text-center p-20 bg-info-50 border-primary-100 border-1 hover:bg-light-100 transition-all">
                        <span className="w-44-px h-44-px radius-8 d-inline-flex justify-content-center align-items-center text-xl mb-12  text-info-600">
                          <i className={service.icon} />
                          {/* <img src={service.icon} alt={service.title} /> */}
                        </span>
                        <span className="text-black d-block fw-semibold ">
                          {service.title}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicesOption;
