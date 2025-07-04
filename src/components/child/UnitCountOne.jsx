import React, { useEffect,  } from "react";
import { ChevronDown, ChevronUp, Wallet } from "lucide-react";
import gsap from "gsap";
import useUserProfileDetails from "../Application/hooks/useUserProfileDetails";

const UnitCountOne = () => {
  useEffect(() => {
    // Create the animation
    const animation = gsap.from(".wallet-card", {
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

  const API = `${import.meta.env.VITE_APP_API_KEY}/member/transaction`;
  const token = sessionStorage.getItem("token");

  const {user}=useUserProfileDetails();
  return (
    <div className="row row-cols-xxxl-4 row-cols-lg-4 row-cols-sm-2 row-cols-1 gy-4">
      <div className="col wallet-card">
        <div className="card shadow-none border bg-gradient-start-1 h-100">
          <div className="card-body p-20">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-medium text-primary-light mb-1">
                  Main Balance
                </p>
                <h6 className="mb-0">{user.main_balance}</h6>
              </div>
              <div className="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                <Wallet
                  size={32}
                  color="#ffffff"
                  strokeWidth={3}
                  absoluteStrokeWidth
                />
              </div>
            </div>
            <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
              <span className="d-inline-flex align-items-center gap-1 text-success-main">
                <ChevronUp
                  size={16}
                  color="#3ddb72"
                  strokeWidth={3}
                  absoluteStrokeWidth
                />{" "}
                +5000
              </span>
              Last 30 days users
            </p>
          </div>
        </div>
        {/* card end */}
      </div>
      <div className="col wallet-card">
        <div className="card shadow-none border bg-gradient-start-2 h-100">
          <div className="card-body p-20">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-medium text-primary-light mb-1">
                  AEPS Balance
                </p>
                <h6 className="mb-0">{user.aeps_balance}</h6>
              </div>
              <div className="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                <Wallet
                  size={32}
                  color="#ffffff"
                  strokeWidth={3}
                  absoluteStrokeWidth
                />
              </div>
            </div>
            <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
              <span className="d-inline-flex align-items-center gap-1 text-danger-main">
                <ChevronDown
                  size={16}
                  color="#ec3c3c"
                  strokeWidth={3}
                  absoluteStrokeWidth
                />{" "}
                -800
              </span>
              Last 30 days
            </p>
          </div>
        </div>
        {/* card end */}
      </div>
      <div className="col wallet-card">
        <div className="card shadow-none border bg-gradient-start-3 h-100">
          <div className="card-body p-20">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-medium text-primary-light mb-1">UPI Balance</p>
                <h6 className="mb-0">{user.qr_balance}</h6>
              </div>
              <div className="w-50-px h-50-px bg-info rounded-circle d-flex justify-content-center align-items-center">
                <Wallet
                  size={32}
                  color="#ffffff"
                  strokeWidth={3}
                  absoluteStrokeWidth
                />
              </div>
            </div>
            <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
              <span className="d-inline-flex align-items-center gap-1 text-success-main">
                <ChevronUp
                  size={16}
                  color="#3ddb72"
                  strokeWidth={3}
                  absoluteStrokeWidth
                />{" "}
                +200
              </span>
              Last 30 days users
            </p>
          </div>
        </div>
        {/* card end */}
      </div>
      <div className="col wallet-card">
        <div className="card shadow-none border bg-gradient-start-4 h-100">
          <div className="card-body p-20">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
              <div>
                <p className="fw-medium text-primary-light mb-1">
                  Earning Balance
                </p>
                <h6 className="mb-0">{user.earning_balance}</h6>
              </div>
              <div className="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                <Wallet
                  size={32}
                  color="#ffffff"
                  strokeWidth={3}
                  absoluteStrokeWidth
                />
              </div>
            </div>
            <p className="fw-medium text-sm text-primary-light mt-12 mb-0 d-flex align-items-center gap-2">
              <span className="d-inline-flex align-items-center gap-1 text-success-main">
                <ChevronUp
                  size={16}
                  color="#3ddb72"
                  strokeWidth={3}
                  absoluteStrokeWidth
                />{" "}
                +$20,000
              </span>
              Last 30 days
            </p>
          </div>
        </div>
        {/* card end */}
      </div>
    </div>
  );
};

export default UnitCountOne;
