import gsap from "gsap";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
const ServiceCard = () => {
  useEffect(() => {
    // Create the animation

    // Create the animation
    const containerAnimation = gsap.from(".ServiceCard", {
      opacity: 0, // Start fully invisible
      y: 200, // Start 200px below the final position
      duration: 0.5, // Smooth duration
      ease: "power3.out",
      delay: 0.5,
    });

    // Cleanup animation on component unmount
    return () => {
      containerAnimation.kill(); // Kill the animation to prevent memory leaks
      // Kill the animation to prevent memory leaks
    };
  }, []);
  const services = [
    {
      id: 1,
      icon: "assets/images/instapay/mobile.svg", // Mobile device icon for recharge
      title: "Recharge",
      path: "/recharge",
    },
    {
      id: 5,
      icon: "assets/images/instapay/credit.svg", // Credit card icon
      title: "Credit Card",
      path: "/credit-card",
    },

    {
      id: 6,
      icon: "assets/images/instapay/cmspay.png", // Document icon for CMS
      title: "CMS",
      path: "/cms",
    },
    {
      id: 7,
      icon: "assets/images/instapay/aepss.svg", // Biometric icon for AEPS
      title: "AEPS",
      path: "/aeps",
    },
    {
      id: 8,
      icon: "assets/images/instapay/B.svg", // Bill payment icon
      title: "BBPS",
      path: "/bbps",
    },
    {
      id: 9,
      icon: "assets/images/instapay/Booking.svg", // Booking icon
      title: "Booking",
      path: "/booking",
    },
    {
      id: 10,
      icon: "assets/images/instapay/dmt1.svg", // Money transfer icon
      title: "DMT",
      path: "/dmt",
    },
    {
      id: 11,
      icon: "assets/images/instapay/upiCollection.svg", // UPI wallet icon
      title: "UPI Collection",
      path: "/upi",
    },
    {
      id: 2,
      icon: "assets/images/instapay/openNewAcc.svg", // Bank icon for account opening
      title: "Open New Account",
      path: "/open-account",
    },
    {
      id: 3,
      icon: "assets/images/instapay/qtransfer.svg", // Exchange/transfer icon
      title: "Quick Transfer",
      path: "/quick-transfer",
    },
    {
      id: 4,
      icon: "assets/images/instapay/upiTransfer.svg", // UPI/QR code icon
      title: "UPI Transfer",
      path: "/upi-transfer",
    },
  ];

  return (
    <div className="col-xxl-12 ServiceCard">
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
                      minWidth: "150px", // Minimum width
                      maxWidth: "150px", // Fixed width on md and larger
                    }}
                  >
                    <Link
                      to={service.path}
                      className="text-decoration-none  d-block h-100"
                    >
                      <div className="radius-8 h-100 text-center p-20 bg-info-50 border-primary-100 border-1 hover:bg-light-100 transition-all">
                        <span className="w-44-px h-44-px radius-8 d-inline-flex justify-content-center align-items-center text-xl mb-12  text-info-600">
                          <img src={service.icon} alt={service.title} />
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
};

export default ServiceCard;
