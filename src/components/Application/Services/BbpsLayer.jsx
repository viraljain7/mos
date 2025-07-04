import gsap from "gsap";
import React, { useEffect, useState, lazy, Suspense } from "react";
import "./css/BbpsModal.css";

const modalComponents = {
  ElectricityLayer: lazy(() => import("./Bbps/ElectricityLayer")),
  WaterBillLayer: lazy(() => import("./Bbps/WaterBillLayer")),
  // Add all 26 modal imports here...
};

const BbpsLayer = () => {
  const services = [
    {
      id: "C05",
      title: "Broadband",
      icon: "https://static.instantpay.in/assets/logo/products/C05.svg",
      modalComponent: "/broadband",
    },
    {
      id: "C06",
      title: "Cable TV",
      icon: "https://static.instantpay.in/assets/logo/products/C06.svg",
      modalComponent: "/cable-tv",
    },
    {
      id: "C22",
      title: "Clubs & Associations",
      icon: "https://static.instantpay.in/assets/logo/products/C22.svg",
      modalComponent: "/clubs-associations",
    },
    {
      id: "C15",
      title: "Credit Card",
      icon: "https://static.instantpay.in/assets/logo/products/C15.svg",
      modalComponent: "/credit-card",
    },
    {
      id: "C12",
      title: "Donation",
      icon: "https://static.instantpay.in/assets/logo/products/C12.svg",
      modalComponent: "/donation",
    },
    {
      id: "C03",
      title: "DTH",
      icon: "https://static.instantpay.in/assets/logo/products/C03.svg",
      modalComponent: "/dth",
    },
    {
      id: "C09",
      title: "Education Fee",
      icon: "https://static.instantpay.in/assets/logo/products/C09.svg",
      modalComponent: "/education-fee",
    },
    {
      id: "C04",
      title: "Electricity",
      icon: "https://static.instantpay.in/assets/logo/products/C04.svg",
      modalComponent: "ElectricityLayer",
    },
    {
      id: "C29",
      title: "Electricity (Prepaid)",
      icon: "https://static.instantpay.in/assets/logo/products/C29.svg",
      modalComponent: "ElectricityLayer",
    },
    {
      id: "C10",
      title: "FASTag Recharge",
      icon: "https://static.instantpay.in/assets/logo/products/C10.svg",
      modalComponent: "/fastag-recharge",
    },
    {
      id: "C14",
      title: "Gas (LPG Cylinder)",
      icon: "https://static.instantpay.in/assets/logo/products/C14.svg",
      modalComponent: "/gas-lpg",
    },
    {
      id: "C07",
      title: "Gas (PNG)",
      icon: "https://static.instantpay.in/assets/logo/products/C07.svg",
      modalComponent: "/gas-png",
    },
    {
      id: "C21",
      title: "Hospitals & Pathology",
      icon: "https://static.instantpay.in/assets/logo/products/C21.svg",
      modalComponent: "/hospitals-pathology",
    },
    {
      id: "C17",
      title: "Housing Society",
      icon: "https://static.instantpay.in/assets/logo/products/C17.svg",
      modalComponent: "/housing-society",
    },
    {
      id: "C11",
      title: "Insurance",
      icon: "https://static.instantpay.in/assets/logo/products/C11.svg",
      modalComponent: "/insurance",
    },
    {
      id: "C02",
      title: "Landline",
      icon: "https://static.instantpay.in/assets/logo/products/C02.svg",
      modalComponent: "/landline",
    },
    {
      id: "C13",
      title: "Loan EMI",
      icon: "https://static.instantpay.in/assets/logo/products/C13.svg",
      modalComponent: "/loan-emi",
    },
    {
      id: "C01",
      title: "Mobile (Postpaid)",
      icon: "https://static.instantpay.in/assets/logo/products/C01.svg",
      modalComponent: "/mobile-postpaid",
    },
    {
      id: "C00",
      title: "Mobile (Prepaid)",
      icon: "https://static.instantpay.in/assets/logo/products/C00.svg",
      modalComponent: "/mobile-prepaid",
    },

    {
      id: "C28",
      title: "NCMC Recharge",
      icon: "https://static.instantpay.in/assets/logo/products/C28.svg",
      modalComponent: "/ncmc-recharge",
    },
    {
      id: "C20",
      title: "Recurring Deposit",
      icon: "https://static.instantpay.in/assets/logo/products/C20.svg",
      modalComponent: "/recurring-deposit",
    },
    {
      id: "C24",
      title: "Rental",
      icon: "https://static.instantpay.in/assets/logo/products/C24.svg",
      modalComponent: "/rental",
    },
    {
      id: "C18",
      title: "Subscription",
      icon: "https://static.instantpay.in/assets/logo/products/C18.svg",
      modalComponent: "/subscription",
    },
    {
      id: "C08",
      title: "Water",
      icon: "https://static.instantpay.in/assets/logo/products/C08.svg",
      modalComponent: "WaterBillLayer",
    },
    {
      id: "C30",
      title: "National Pension Scheme (NPS)",
      icon: "https://static.instantpay.in/assets/logo/products/C30.svg",
      modalComponent: "/national-pension-scheme",
    },
    {
      id: "C19",
      title: "Municipal Taxes & Services",
      icon: "https://static.instantpay.in/assets/logo/products/C19.svg",
      modalComponent: "/municipal-taxes",
    },
  ];

  const [activeModal, setActiveModal] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const containerAnimation = gsap.from(".BbpsServicesCard", {
      opacity: 0,
      y: 200,
      duration: 0.5,
      ease: "power3.out",
      delay: 0.1,
    });

    return () => containerAnimation.kill();
  }, []);

  const handleServiceClick = (service) => {
    setActiveModal(service);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Get the modal component to render
  const ModalComponent = activeModal
    ? modalComponents[activeModal.modalComponent]
    : null;

  return (
    <div
      className="col-xxl-12 BbpsServicesCard"
      style={{ position: "relative" }}
    >
      {activeModal && ModalComponent && (
        <Suspense fallback={<div>Loading...</div>}>
          <ModalComponent
            show={showModal}
            onHide={handleCloseModal}
            title={activeModal.title}
          />
        </Suspense>
      )}
      <div className="card">
        <div className="card-header">
          <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
            <h6 className="mb-2 fw-bold text-lg mb-0">Bill Payment Services</h6>
          </div>
        </div>
        <div className="card-body p-20">
          <div className="row g-3">
            <div className="col-md-12">
              <div className="row g-3">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 cursor-pointer service-card"
                  >
                    <div
                      onClick={() => handleServiceClick(service)}
                      className="text-decoration-none d-block h-100"
                    >
                      <div className="radius-8 h-100 text-center p-20 bg-info-50 border-primary-100 border-1 hover:bg-light-100 transition-all">
                        <span className="w-44-px h-44-px radius-8 d-inline-flex justify-content-center align-items-center text-xl mb-12  text-info-600">
                          <img src={service.icon} alt={service.title} />
                        </span>
                        <span className="text-black d-block fw-semibold ">
                          {service.title}
                        </span>
                      </div>
                    </div>
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

export default BbpsLayer;
