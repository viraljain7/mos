import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import ThemeToggleButton from "../helper/ThemeToggleButton";
import { toast } from "react-toastify";
import gsap from "gsap";
import useUserProfileDetails from "../components/Application/hooks/useUserProfileDetails";
import PendingKyc from "../components/Application/Dashboard/modal/PendingKycModal";
import SubmittedKyc from "../components/Application/Dashboard/modal/SubmittedKycModal";
import RejectedKycModal from "../components/Application/Dashboard/modal/RejectedKycModal";
import PasswordChangeModal from "../components/Application/Dashboard/modal/PasswordChangeModal";
import { usePermissions } from "../context/PermissionContext";
import LogoutConfirmModal from "../components/Application/components/LogutConfirm";
import NewOnBoardModal from "../components/Application/Dashboard/modal/NewOnBoardModal";

const MasterLayout = ({ children }) => {
  const { user } = useUserProfileDetails();
  const [userStatus, setUserStatus] = useState(user.kyc);
  useEffect(() => {
    setUserStatus(user.kyc);
  }, [user]);

  const [userRole, setUserRole] = useState(user?.role?.slug);

  useEffect(() => {
    if (user?.role?.slug) {
      setUserRole(user.role.slug);
    }
  }, [user]);

  useEffect(() => {
    // Create the animation
    const animation = gsap.from(".listItems", {
      opacity: 0, // Start fully invisible
      x: -50, // Start 50px below the final position
      duration: 0.05, // Smooth duration
      stagger: 0.1, // Small stagger for sequential animation
      ease: "power3.out",
    });

    // Cleanup animation on component unmount
    return () => {
      animation.kill(); // Kill the animation to prevent memory leaks
    };
  }, []);

  const navigate = useNavigate();
  let [sidebarActive, seSidebarActive] = useState(false);
  let [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation(); // Hook to get the current route

  const logoutHandler = async () => {
    const token = sessionStorage.getItem("token");
    const API = `${import.meta.env.VITE_APP_API_KEY}/auth/logout`;

    if (!import.meta.env.VITE_APP_API_KEY) {
      console.error("API key is missing from environment variables.");
      return;
    }

    try {
      const response = await fetch(API, {
        method: "GET",
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();

        if (responseData.statuscode === "TXN") {
          toast.dismiss();
          toast.success(responseData.message || "logout successful", {
            toastId: "logout-success", // Unique ID
          });
          // Clear local storage
          sessionStorage.removeItem("token");

          // Redirect to login or home page
          setTimeout(() => {
            navigate("/");
          }, 1000); // Delay navigation by 1 second
        } else {
          console.error("Logout failed:", responseData.message);
        }
      } else {
        console.error("Failed to log out. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error.message || error);
    }
  };

  useEffect(() => {
    const handleDropdownClick = (event) => {
      event.preventDefault();
      const clickedLink = event.currentTarget;
      const clickedDropdown = clickedLink.closest(".dropdown");

      if (!clickedDropdown) return;

      const isActive = clickedDropdown.classList.contains("open");

      // Close all dropdowns
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");
        const submenu = dropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = "0px"; // Collapse submenu
        }
      });

      // Toggle the clicked dropdown
      if (!isActive) {
        clickedDropdown.classList.add("open");
        const submenu = clickedDropdown.querySelector(".sidebar-submenu");
        if (submenu) {
          submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
        }
      }
    };

    // Attach click event listeners to all dropdown triggers
    const dropdownTriggers = document.querySelectorAll(
      ".sidebar-menu .dropdown > a, .sidebar-menu .dropdown > Link"
    );

    dropdownTriggers.forEach((trigger) => {
      trigger.addEventListener("click", handleDropdownClick);
    });

    const openActiveDropdown = () => {
      const allDropdowns = document.querySelectorAll(".sidebar-menu .dropdown");
      allDropdowns.forEach((dropdown) => {
        const submenuLinks = dropdown.querySelectorAll(".sidebar-submenu li a");
        submenuLinks.forEach((link) => {
          if (
            link.getAttribute("href") === location.pathname ||
            link.getAttribute("to") === location.pathname
          ) {
            dropdown.classList.add("open");
            const submenu = dropdown.querySelector(".sidebar-submenu");
            if (submenu) {
              submenu.style.maxHeight = `${submenu.scrollHeight}px`; // Expand submenu
            }
          }
        });
      });
    };

    // Open the submenu that contains the active route
    openActiveDropdown();

    // Cleanup event listeners on unmount
    return () => {
      dropdownTriggers.forEach((trigger) => {
        trigger.removeEventListener("click", handleDropdownClick);
      });
    };
  }, [location.pathname]);

  let sidebarControl = () => {
    seSidebarActive(!sidebarActive);
  };

  let mobileMenuControl = () => {
    setMobileMenu(!mobileMenu);
  };
  const [openDropdown, setOpenDropdown] = useState(null);

  const permissions = usePermissions();
  return (
    <>
      {/* <NewOnBoardModal /> */}
      {userStatus === "pending" && <PendingKyc modalOpen={true} />}
      {userStatus === "submitted" && <SubmittedKyc modalOpen={true} />}
      {userStatus === "rejected" && <RejectedKycModal modalOpen={true} />}
      {userStatus === "verified" && <PasswordChangeModal />}

      <section className={mobileMenu ? "overlay active" : "overlay "}>
        {/* sidebar */}
        <aside
          className={
            sidebarActive
              ? "sidebar active "
              : mobileMenu
              ? "sidebar sidebar-open"
              : "sidebar"
          }
        >
          <button
            onClick={mobileMenuControl}
            type="button"
            className="sidebar-close-btn"
          >
            <Icon icon="radix-icons:cross-2" />
          </button>
          <div>
            <Link to="/dashboard" className="sidebar-logo">
              <img
                src="https://i.ibb.co/ynKrDqY9/Transact.png"
                alt="site logo"
                className="light-logo"
                width={250}
                height={100}
              />
              <img
                src="https://i.ibb.co/ynKrDqY9/Transact.png"
                alt="site logo"
                className="dark-logo"
                width={250}
                height={100}
              />
              <img
                src="https://i.ibb.co/dJ4VYfGr/Transact-Favicon.png"
                alt="site logo"
                className="logo-icon"
                width={150}
                height={100}
                style={{ transform: "Scale(2)" }}
              />
            </Link>
          </div>
          <div className="sidebar-menu-area">
            <ul className="sidebar-menu" id="sidebar-menu">
              <li className="listItems">
                <NavLink
                  to="/dashboard"
                  className={(navData) =>
                    navData.isActive ? "active-page" : ""
                  }
                >
                  <Icon icon="ic:baseline-email" className="menu-icon" />
                  <span>Dashboard</span>
                </NavLink>
              </li>

              <li className="sidebar-menu-group-title listItems">
                Application
              </li>
              {/* Master Dropdown */}
              {userRole === "AD" && (
                <li
                  className={`dropdown listItems ${
                    openDropdown === "master" ? "open" : ""
                  }`}
                  onClick={() =>
                    setOpenDropdown(openDropdown === "master" ? null : "master")
                  }
                >
                  <Link to="#">
                    <Icon icon="ic:baseline-layers" className="menu-icon" />
                    <span>Master</span>
                  </Link>

                  <ul
                    className="sidebar-submenu"
                    style={{
                      maxHeight: openDropdown === "master" ? "500px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.5s ease",
                    }}
                  >
                    <li>
                      <NavLink
                        to="/scheme-manager"
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        {/* <Icon icon="ic:baseline-email" className='menu-icon' /> */}
                        <i className="ri-circle-fill circle-icon text-warning-main w-auto" />
                        Scheme Manager
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/api-manager"
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <i className="ri-circle-fill circle-icon text-warning-main w-auto" />
                        API Manager
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/sms-master"
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <i className="ri-circle-fill circle-icon text-info-main w-auto" />{" "}
                        SMS Master
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/bank-account"
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                        Bank Account
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/provide-master"
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                        Provide Master
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/portal-master"
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                        Portal Master
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/slider-master"
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                        Slider Master
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}

              {/* Member Dropdown */}
              {(permissions.includes("create_whitelabel") ||
                permissions.includes("create_cnf") ||
                permissions.includes("create_masterdistributor") ||
                permissions.includes("create_distributor") ||
                permissions.includes("create_retailer") ||
                permissions.includes("create_apiuser")) && (
                <li
                  className={`dropdown listItems ${
                    openDropdown === "member" ? "open" : ""
                  }`}
                  onClick={() =>
                    setOpenDropdown(openDropdown === "member" ? null : "member")
                  }
                >
                  <Link to="#">
                    <Icon icon="ic:baseline-person" className="menu-icon" />
                    <span>Member</span>
                  </Link>
                  <ul
                    className="sidebar-submenu"
                    style={{
                      maxHeight: openDropdown === "member" ? "500px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.5s ease",
                    }}
                  >
                    {permissions.includes("create_whitelabel") && (
                      <li>
                        <NavLink
                          to="/white-label"
                          className={(navData) =>
                            navData.isActive ? "active-page" : ""
                          }
                        >
                          <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                          White Label
                        </NavLink>
                      </li>
                    )}
                    {permissions.includes("create_cnf") && (
                      <li>
                        <NavLink
                          to="/cnf"
                          className={(navData) =>
                            navData.isActive ? "active-page" : ""
                          }
                        >
                          <i className="ri-circle-fill circle-icon text-warning-main w-auto" />
                          CNF
                        </NavLink>
                      </li>
                    )}
                    {permissions.includes("create_masterdistributor") && (
                      <li>
                        <NavLink
                          to="/master-distributor"
                          className={(navData) =>
                            navData.isActive ? "active-page" : ""
                          }
                        >
                          <i className="ri-circle-fill circle-icon text-info-main w-auto" />{" "}
                          Master Distributor
                        </NavLink>
                      </li>
                    )}
                    {permissions.includes("create_distributor") && (
                      <li>
                        <NavLink
                          to="/distributor"
                          className={(navData) =>
                            navData.isActive ? "active-page" : ""
                          }
                        >
                          <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                          Distributor
                        </NavLink>
                      </li>
                    )}
                    {permissions.includes("create_retailer") && (
                      <li>
                        <NavLink
                          to="/retailer"
                          className={(navData) =>
                            navData.isActive ? "active-page" : ""
                          }
                        >
                          <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                          Retailer
                        </NavLink>
                      </li>
                    )}
                    {permissions.includes("create_apiuser") && (
                      <li>
                        <NavLink
                          to="/api-user"
                          className={(navData) =>
                            navData.isActive ? "active-page" : ""
                          }
                        >
                          <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                          Api User
                        </NavLink>
                      </li>
                    )}
                  </ul>
                </li>
              )}

              {/* Fund Manager Dropdown */}
              <li className="dropdown listItems">
                <Link to="#">
                  <Icon
                    icon="ic:outline-currency-exchange"
                    className="menu-icon"
                  />
                  <span>Fund</span>
                </Link>
                <ul className="sidebar-submenu">
                  <li>
                    <NavLink
                      to="/transfer-return"
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                      Transfer/Return
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/fund-request"
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <i className="ri-circle-fill circle-icon text-warning-main w-auto" />
                      Request
                      <span className="badge text-sm fw-semibold w-20-px h-20-px d-flex justify-content-center align-items-center radius-4 border border-primary-600 text-primary-600 radius-4 text-white ms-auto">
                        3
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/loadwalletrequest"
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <i className="ri-circle-fill circle-icon text-info-main w-auto" />{" "}
                      Load Wallet Request
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/all-fund-report"
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <i className="ri-circle-fill circle-icon text-info-main w-auto" />{" "}
                      All Fund Report
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* Services Dropdown */}
              {userRole === "RT" && (
                <li
                  className={`dropdown listItems ${
                    openDropdown === "services" ? "open" : ""
                  }`}
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === "services" ? null : "services"
                    )
                  }
                >
                  <Link to="#">
                    <Icon
                      icon="ic:baseline-space-dashboard"
                      className="menu-icon"
                    />
                    <span>Services</span>
                  </Link>
                  <ul
                    className="sidebar-submenu"
                    style={{
                      maxHeight: openDropdown === "services" ? "500px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.5s ease",
                    }}
                  >
                    <li>
                      <NavLink
                        to="/recharge"
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                        Recharge
                      </NavLink>
                    </li>
                    {/*    <li>
                    <NavLink
                      to="/booking"
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                      Booking
                    </NavLink>
                  </li>
                
                  <li>
                    <NavLink
                      to="/dmt"
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <i className="ri-circle-fill circle-icon text-info-main w-auto" />{" "}
                      DMT
                    </NavLink>
                  </li> */}

                    <li>
                      <NavLink
                        to="/bbps"
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                        BBPS
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/domestic"
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                        DMT (Domestic)
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/ppi"
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                        DMT (PPI)
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/indonepal"
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                        Indo Nepal
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/open-account"
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                        Open New Account
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/quick-transfer"
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                        Quick Transfer
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/upi-transfer"
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                        UPI Transfer
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/credit-card"
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                        Credit Card
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/pg"
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                        Payment Gateway
                      </NavLink>
                    </li>
                    {/* <li>
                    <NavLink
                      to="/upi"
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                      UPI Collection
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/aeps"
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                      AEPS
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/cms"
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                      CMS
                    </NavLink>
                  </li> */}
                  </ul>
                </li>
              )}
              {/* Transaction Report Dropdown */}
              <li className="dropdown listItems">
                <Link to="#">
                  <Icon icon="ic:baseline-file-copy" className="menu-icon" />
                  <span>Transaction Report</span>
                </Link>
                <ul className="sidebar-submenu">
                  <li>
                    <NavLink
                      to="/all-transaction-report"
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                      All Transaction Report
                    </NavLink>
                  </li>
                  {/*   <li>
                    <NavLink
                      to="/success-txn-report"
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <i className="ri-circle-fill circle-icon text-warning-main w-auto" />
                      Success
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/pending-txn-report"
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <i className="ri-circle-fill circle-icon text-info-main w-auto" />{" "}
                      Pending
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/failed-txn-report"
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                      Failed
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/refund-txn-report"
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                      Refund
                    </NavLink>
                  </li> */}
                  <li>
                    <NavLink
                      to="/payout-report"
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                      Payout Report
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/recharge-report"
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                      Recharge Report
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/credit-card-report"
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                      Credit Card Report
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/bbps-report"
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                      BBPS Report
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* Account Statement Dropdown */}
              <li className="dropdown listItems">
                <Link to="#">
                  <Icon
                    icon="ic:baseline-account-balance"
                    className="menu-icon"
                  />
                  <span>Account Statement</span>
                </Link>
                <ul className="sidebar-submenu">
                  <li>
                    <NavLink
                      to="/credit-ledger"
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                      Main Ledger
                    </NavLink>
                  </li>
                  {/* <li>
                    <NavLink
                      to="/debit-ledger"
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <i className="ri-circle-fill circle-icon text-warning-main w-auto" />
                      Debit Ledger
                    </NavLink>
                  </li> */}
                </ul>
              </li>

              {/* Settings Dropdown  */}
              {/* <li className="dropdown listItems">
                <Link to="#">
                  <Icon icon="ic:sharp-settings" className="menu-icon" />
                  <span>Settings</span>
                </Link>
                <ul className="sidebar-submenu">
                  <li>
                    <NavLink
                      to="/company"
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                      Company
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/notification"
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <i className="ri-circle-fill circle-icon text-warning-main w-auto" />{" "}
                      Notification
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/notification-alert"
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <i className="ri-circle-fill circle-icon text-info-main w-auto" />{" "}
                      Notification Alert
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/theme"
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                      Theme
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/currencies"
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                      Currencies
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/language"
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                      Languages
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/payment-gateway"
                      className={(navData) =>
                        navData.isActive ? "active-page" : ""
                      }
                    >
                      <i className="ri-circle-fill circle-icon text-danger-main w-auto" />{" "}
                      Payment Gateway
                    </NavLink>
                  </li>
                </ul>
              </li> */}

              {/* Roles and Permission Dropdown */}
              {userRole === "AD" && (
                <li
                  className={`dropdown listItems ${
                    openDropdown === "roles" ? "open" : ""
                  }`}
                  onClick={() =>
                    setOpenDropdown(openDropdown === "roles" ? null : "roles")
                  }
                >
                  <Link to="#">
                    <Icon icon="ic:sharp-settings" className="menu-icon" />
                    <span>Roles and Permission</span>
                  </Link>

                  <ul
                    className="sidebar-submenu"
                    style={{
                      maxHeight: openDropdown === "roles" ? "500px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.5s ease",
                    }}
                  >
                    <li>
                      <NavLink
                        to="/permission"
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />{" "}
                        Permission
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/default-permission"
                        className={(navData) =>
                          navData.isActive ? "active-page" : ""
                        }
                      >
                        <i className="ri-circle-fill circle-icon text-warning-main w-auto" />{" "}
                        Default Permission
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}
              {/* Logout */}
              <li className="dropdown listItems">
                <LogoutConfirmModal
                  children={
                    <Link to="#">
                      <Icon
                        icon="lucide:power"
                        className="icon text-xl w-auto me-8"
                      />{" "}
                      <span>Logout</span>
                    </Link>
                  }
                  onClick={logoutHandler}
                />
              </li>
              {/* <------------------------------> */}
            </ul>
          </div>
        </aside>

        {/* Sidebar End  */}

        <main
          className={sidebarActive ? "dashboard-main active" : "dashboard-main"}
        >
          <div className="navbar-header">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <div className="d-flex flex-wrap align-items-center gap-4">
                  <button
                    type="button"
                    className="sidebar-toggle"
                    onClick={sidebarControl}
                  >
                    {sidebarActive ? (
                      <Icon
                        icon="iconoir:arrow-right"
                        className="icon text-2xl non-active"
                      />
                    ) : (
                      <Icon
                        icon="heroicons:bars-3-solid"
                        className="icon text-2xl non-active "
                      />
                    )}
                  </button>
                  <button
                    onClick={mobileMenuControl}
                    type="button"
                    className="sidebar-mobile-toggle"
                  >
                    <Icon icon="heroicons:bars-3-solid" className="icon" />
                  </button>
                  <form className="navbar-search">
                    <input type="text" name="search" placeholder="Search" />
                    <Icon icon="ion:search-outline" className="icon" />
                  </form>
                </div>
              </div>
              <div className="col-auto">
                <div className="d-flex flex-wrap align-items-center gap-3">
                  {/* ThemeToggleButton */}
                  <ThemeToggleButton />
                  <div className="dropdown d-none d-sm-inline-block">
                    <button
                      className="has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center"
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      <img
                        src="assets/images/lang-flag.png"
                        alt="Wowdash"
                        className="w-24 h-24 object-fit-cover rounded-circle"
                      />
                    </button>
                    <div className="dropdown-menu to-top dropdown-menu-sm">
                      <div className="py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2">
                        <div>
                          <h6 className="text-lg text-primary-light fw-semibold mb-0">
                            Choose Your Language
                          </h6>
                        </div>
                      </div>
                      <div className="max-h-400-px overflow-y-auto scroll-sm pe-8">
                        <div className="form-check style-check d-flex align-items-center justify-content-between mb-16">
                          <label
                            className="form-check-label line-height-1 fw-medium text-secondary-light"
                            htmlFor="english"
                          >
                            <span className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                              <img
                                src="assets/images/flags/flag1.png"
                                alt=""
                                className="w-36-px h-36-px bg-success-subtle text-success-main rounded-circle flex-shrink-0"
                              />
                              <span className="text-md fw-semibold mb-0">
                                English
                              </span>
                            </span>
                          </label>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="crypto"
                            id="english"
                          />
                        </div>
                        <div className="form-check style-check d-flex align-items-center justify-content-between mb-16">
                          <label
                            className="form-check-label line-height-1 fw-medium text-secondary-light"
                            htmlFor="japan"
                          >
                            <span className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                              <img
                                src="assets/images/flags/flag2.png"
                                alt=""
                                className="w-36-px h-36-px bg-success-subtle text-success-main rounded-circle flex-shrink-0"
                              />
                              <span className="text-md fw-semibold mb-0">
                                Japan
                              </span>
                            </span>
                          </label>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="crypto"
                            id="japan"
                          />
                        </div>
                        <div className="form-check style-check d-flex align-items-center justify-content-between mb-16">
                          <label
                            className="form-check-label line-height-1 fw-medium text-secondary-light"
                            htmlFor="france"
                          >
                            <span className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                              <img
                                src="assets/images/flags/flag3.png"
                                alt=""
                                className="w-36-px h-36-px bg-success-subtle text-success-main rounded-circle flex-shrink-0"
                              />
                              <span className="text-md fw-semibold mb-0">
                                France
                              </span>
                            </span>
                          </label>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="crypto"
                            id="france"
                          />
                        </div>
                        <div className="form-check style-check d-flex align-items-center justify-content-between mb-16">
                          <label
                            className="form-check-label line-height-1 fw-medium text-secondary-light"
                            htmlFor="germany"
                          >
                            <span className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                              <img
                                src="assets/images/flags/flag4.png"
                                alt=""
                                className="w-36-px h-36-px bg-success-subtle text-success-main rounded-circle flex-shrink-0"
                              />
                              <span className="text-md fw-semibold mb-0">
                                Germany
                              </span>
                            </span>
                          </label>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="crypto"
                            id="germany"
                          />
                        </div>
                        <div className="form-check style-check d-flex align-items-center justify-content-between mb-16">
                          <label
                            className="form-check-label line-height-1 fw-medium text-secondary-light"
                            htmlFor="korea"
                          >
                            <span className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                              <img
                                src="assets/images/flags/flag5.png"
                                alt=""
                                className="w-36-px h-36-px bg-success-subtle text-success-main rounded-circle flex-shrink-0"
                              />
                              <span className="text-md fw-semibold mb-0">
                                South Korea
                              </span>
                            </span>
                          </label>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="crypto"
                            id="korea"
                          />
                        </div>
                        <div className="form-check style-check d-flex align-items-center justify-content-between mb-16">
                          <label
                            className="form-check-label line-height-1 fw-medium text-secondary-light"
                            htmlFor="bangladesh"
                          >
                            <span className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                              <img
                                src="assets/images/flags/flag6.png"
                                alt=""
                                className="w-36-px h-36-px bg-success-subtle text-success-main rounded-circle flex-shrink-0"
                              />
                              <span className="text-md fw-semibold mb-0">
                                Bangladesh
                              </span>
                            </span>
                          </label>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="crypto"
                            id="bangladesh"
                          />
                        </div>
                        <div className="form-check style-check d-flex align-items-center justify-content-between mb-16">
                          <label
                            className="form-check-label line-height-1 fw-medium text-secondary-light"
                            htmlFor="india"
                          >
                            <span className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                              <img
                                src="assets/images/flags/flag7.png"
                                alt=""
                                className="w-36-px h-36-px bg-success-subtle text-success-main rounded-circle flex-shrink-0"
                              />
                              <span className="text-md fw-semibold mb-0">
                                India
                              </span>
                            </span>
                          </label>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="crypto"
                            id="india"
                          />
                        </div>
                        <div className="form-check style-check d-flex align-items-center justify-content-between">
                          <label
                            className="form-check-label line-height-1 fw-medium text-secondary-light"
                            htmlFor="canada"
                          >
                            <span className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                              <img
                                src="assets/images/flags/flag8.png"
                                alt=""
                                className="w-36-px h-36-px bg-success-subtle text-success-main rounded-circle flex-shrink-0"
                              />
                              <span className="text-md fw-semibold mb-0">
                                Canada
                              </span>
                            </span>
                          </label>
                          <input
                            className="form-check-input"
                            type="radio"
                            name="crypto"
                            id="canada"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Language dropdown end */}
                  <div className="dropdown">
                    <button
                      className="has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center"
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      <Icon
                        icon="mage:email"
                        className="text-primary-light text-xl"
                      />
                    </button>
                    <div className="dropdown-menu to-top dropdown-menu-lg p-0">
                      <div className="m-16 py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2">
                        <div>
                          <h6 className="text-lg text-primary-light fw-semibold mb-0">
                            Message
                          </h6>
                        </div>
                        <span className="text-primary-600 fw-semibold text-lg w-40-px h-40-px rounded-circle bg-base d-flex justify-content-center align-items-center">
                          05
                        </span>
                      </div>
                      <div className="max-h-400-px overflow-y-auto scroll-sm pe-4">
                        <Link
                          to="#"
                          className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between"
                        >
                          <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                            <span className="w-40-px h-40-px rounded-circle flex-shrink-0 position-relative">
                              <img
                                src="assets/images/notification/profile-3.png"
                                alt=""
                              />
                              <span className="w-8-px h-8-px bg-success-main rounded-circle position-absolute end-0 bottom-0" />
                            </span>
                            <div>
                              <h6 className="text-md fw-semibold mb-4">
                                Kathryn Murphy
                              </h6>
                              <p className="mb-0 text-sm text-secondary-light text-w-100-px">
                                hey! there i’m...
                              </p>
                            </div>
                          </div>
                          <div className="d-flex flex-column align-items-end">
                            <span className="text-sm text-secondary-light flex-shrink-0">
                              12:30 PM
                            </span>
                            <span className="mt-4 text-xs text-base w-16-px h-16-px d-flex justify-content-center align-items-center bg-warning-main rounded-circle">
                              8
                            </span>
                          </div>
                        </Link>
                        <Link
                          to="#"
                          className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between"
                        >
                          <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                            <span className="w-40-px h-40-px rounded-circle flex-shrink-0 position-relative">
                              <img
                                src="assets/images/notification/profile-4.png"
                                alt=""
                              />
                              <span className="w-8-px h-8-px  bg-neutral-300 rounded-circle position-absolute end-0 bottom-0" />
                            </span>
                            <div>
                              <h6 className="text-md fw-semibold mb-4">
                                Kathryn Murphy
                              </h6>
                              <p className="mb-0 text-sm text-secondary-light text-w-100-px">
                                hey! there i’m...
                              </p>
                            </div>
                          </div>
                          <div className="d-flex flex-column align-items-end">
                            <span className="text-sm text-secondary-light flex-shrink-0">
                              12:30 PM
                            </span>
                            <span className="mt-4 text-xs text-base w-16-px h-16-px d-flex justify-content-center align-items-center bg-warning-main rounded-circle">
                              2
                            </span>
                          </div>
                        </Link>
                        <Link
                          to="#"
                          className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between bg-neutral-50"
                        >
                          <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                            <span className="w-40-px h-40-px rounded-circle flex-shrink-0 position-relative">
                              <img
                                src="assets/images/notification/profile-5.png"
                                alt=""
                              />
                              <span className="w-8-px h-8-px bg-success-main rounded-circle position-absolute end-0 bottom-0" />
                            </span>
                            <div>
                              <h6 className="text-md fw-semibold mb-4">
                                Kathryn Murphy
                              </h6>
                              <p className="mb-0 text-sm text-secondary-light text-w-100-px">
                                hey! there i’m...
                              </p>
                            </div>
                          </div>
                          <div className="d-flex flex-column align-items-end">
                            <span className="text-sm text-secondary-light flex-shrink-0">
                              12:30 PM
                            </span>
                            <span className="mt-4 text-xs text-base w-16-px h-16-px d-flex justify-content-center align-items-center bg-neutral-400 rounded-circle">
                              0
                            </span>
                          </div>
                        </Link>
                        <Link
                          to="#"
                          className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between bg-neutral-50"
                        >
                          <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                            <span className="w-40-px h-40-px rounded-circle flex-shrink-0 position-relative">
                              <img
                                src="assets/images/notification/profile-6.png"
                                alt=""
                              />
                              <span className="w-8-px h-8-px bg-neutral-300 rounded-circle position-absolute end-0 bottom-0" />
                            </span>
                            <div>
                              <h6 className="text-md fw-semibold mb-4">
                                Kathryn Murphy
                              </h6>
                              <p className="mb-0 text-sm text-secondary-light text-w-100-px">
                                hey! there i’m...
                              </p>
                            </div>
                          </div>
                          <div className="d-flex flex-column align-items-end">
                            <span className="text-sm text-secondary-light flex-shrink-0">
                              12:30 PM
                            </span>
                            <span className="mt-4 text-xs text-base w-16-px h-16-px d-flex justify-content-center align-items-center bg-neutral-400 rounded-circle">
                              0
                            </span>
                          </div>
                        </Link>
                        <Link
                          to="#"
                          className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between"
                        >
                          <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                            <span className="w-40-px h-40-px rounded-circle flex-shrink-0 position-relative">
                              <img
                                src="assets/images/notification/profile-7.png"
                                alt=""
                              />
                              <span className="w-8-px h-8-px bg-success-main rounded-circle position-absolute end-0 bottom-0" />
                            </span>
                            <div>
                              <h6 className="text-md fw-semibold mb-4">
                                Kathryn Murphy
                              </h6>
                              <p className="mb-0 text-sm text-secondary-light text-w-100-px">
                                hey! there i’m...
                              </p>
                            </div>
                          </div>
                          <div className="d-flex flex-column align-items-end">
                            <span className="text-sm text-secondary-light flex-shrink-0">
                              12:30 PM
                            </span>
                            <span className="mt-4 text-xs text-base w-16-px h-16-px d-flex justify-content-center align-items-center bg-warning-main rounded-circle">
                              8
                            </span>
                          </div>
                        </Link>
                      </div>
                      <div className="text-center py-12 px-16">
                        <Link
                          to="#"
                          className="text-primary-600 fw-semibold text-md"
                        >
                          See All Message
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* Message dropdown end */}
                  <div className="dropdown">
                    <button
                      className="has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center"
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      <Icon
                        icon="iconoir:bell"
                        className="text-primary-light text-xl"
                      />
                    </button>
                    <div className="dropdown-menu to-top dropdown-menu-lg p-0">
                      <div className="m-16 py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2">
                        <div>
                          <h6 className="text-lg text-primary-light fw-semibold mb-0">
                            Notifications
                          </h6>
                        </div>
                        <span className="text-primary-600 fw-semibold text-lg w-40-px h-40-px rounded-circle bg-base d-flex justify-content-center align-items-center">
                          05
                        </span>
                      </div>
                      <div className="max-h-400-px overflow-y-auto scroll-sm pe-4">
                        <Link
                          to="#"
                          className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between"
                        >
                          <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                            <span className="w-44-px h-44-px bg-success-subtle text-success-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                              <Icon
                                icon="bitcoin-icons:verify-outline"
                                className="icon text-xxl"
                              />
                            </span>
                            <div>
                              <h6 className="text-md fw-semibold mb-4">
                                Congratulations
                              </h6>
                              <p className="mb-0 text-sm text-secondary-light text-w-200-px">
                                Your profile has been Verified. Your profile has
                                been Verified
                              </p>
                            </div>
                          </div>
                          <span className="text-sm text-secondary-light flex-shrink-0">
                            23 Mins ago
                          </span>
                        </Link>
                        <Link
                          to="#"
                          className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between bg-neutral-50"
                        >
                          <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                            <span className="w-44-px h-44-px bg-success-subtle text-success-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                              <img
                                src="assets/images/notification/profile-1.png"
                                alt=""
                              />
                            </span>
                            <div>
                              <h6 className="text-md fw-semibold mb-4">
                                Ronald Richards
                              </h6>
                              <p className="mb-0 text-sm text-secondary-light text-w-200-px">
                                You can stitch between artboards
                              </p>
                            </div>
                          </div>
                          <span className="text-sm text-secondary-light flex-shrink-0">
                            23 Mins ago
                          </span>
                        </Link>
                        <Link
                          to="#"
                          className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between"
                        >
                          <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                            <span className="w-44-px h-44-px bg-info-subtle text-info-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                              AM
                            </span>
                            <div>
                              <h6 className="text-md fw-semibold mb-4">
                                Arlene McCoy
                              </h6>
                              <p className="mb-0 text-sm text-secondary-light text-w-200-px">
                                Invite you to prototyping
                              </p>
                            </div>
                          </div>
                          <span className="text-sm text-secondary-light flex-shrink-0">
                            23 Mins ago
                          </span>
                        </Link>
                        <Link
                          to="#"
                          className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between bg-neutral-50"
                        >
                          <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                            <span className="w-44-px h-44-px bg-success-subtle text-success-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                              <img
                                src="assets/images/notification/profile-2.png"
                                alt=""
                              />
                            </span>
                            <div>
                              <h6 className="text-md fw-semibold mb-4">
                                Annette Black
                              </h6>
                              <p className="mb-0 text-sm text-secondary-light text-w-200-px">
                                Invite you to prototyping
                              </p>
                            </div>
                          </div>
                          <span className="text-sm text-secondary-light flex-shrink-0">
                            23 Mins ago
                          </span>
                        </Link>
                        <Link
                          to="#"
                          className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between"
                        >
                          <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                            <span className="w-44-px h-44-px bg-info-subtle text-info-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                              DR
                            </span>
                            <div>
                              <h6 className="text-md fw-semibold mb-4">
                                Darlene Robertson
                              </h6>
                              <p className="mb-0 text-sm text-secondary-light text-w-200-px">
                                Invite you to prototyping
                              </p>
                            </div>
                          </div>
                          <span className="text-sm text-secondary-light flex-shrink-0">
                            23 Mins ago
                          </span>
                        </Link>
                      </div>
                      <div className="text-center py-12 px-16">
                        <Link
                          to="#"
                          className="text-primary-600 fw-semibold text-md"
                        >
                          See All Notification
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* Notification dropdown end */}
                  <div className="dropdown">
                    <button
                      className="d-flex justify-content-center align-items-center rounded-circle"
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      <img
                        src="assets/images/user.png"
                        alt="image_user"
                        className="w-40-px h-40-px object-fit-cover rounded-circle"
                      />
                    </button>
                    <div className="dropdown-menu to-top dropdown-menu-sm">
                      <div className="py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2">
                        <div>
                          <h6 className="text-lg text-primary-light fw-semibold mb-2">
                            {user?.name}
                          </h6>
                          <span className="text-secondary-light fw-medium text-sm">
                            {user?.role?.name}
                          </span>
                        </div>
                        <button type="button" className="hover-text-danger">
                          <Icon
                            icon="radix-icons:cross-1"
                            className="icon text-xl"
                          />
                        </button>
                      </div>
                      <ul className="to-top-list">
                        <li>
                          <Link
                            className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
                            to="/user-profile"
                          >
                            <Icon
                              icon="solar:user-linear"
                              className="icon text-xl"
                            />{" "}
                            My Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
                            to="/mycommission"
                          >
                            <Icon
                              icon="tabler:message-check"
                              className="icon text-xl"
                            />{" "}
                            My Commission
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
                            to="/company"
                          >
                            <Icon
                              icon="icon-park-outline:setting-two"
                              className="icon text-xl"
                            />
                            Setting
                          </Link>
                        </li>
                        <li>
                          <LogoutConfirmModal
                            children={
                              <Link
                                className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-danger d-flex align-items-center gap-3"
                                to="#"
                              >
                                <Icon
                                  icon="lucide:power"
                                  className="icon text-xl"
                                />{" "}
                                Log Out
                              </Link>
                            }
                            onClick={logoutHandler}
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* Profile dropdown end */}
                </div>
              </div>
            </div>
          </div>

          {/* dashboard-main-body */}
          <div className="dashboard-main-body">{children}</div>

          {/* Footer section */}
          <footer className="d-footer">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <p className="mb-0">
                  © {new Date().getFullYear()} NexaSoft Technologies Pvt Ltd.
                  All Rights Reserved.
                </p>
              </div>
              <div className="col-auto">
                <p className="mb-0">Made by NexaSoft Team</p>
              </div>
            </div>
          </footer>
        </main>
      </section>
    </>
  );
};

export default MasterLayout;
