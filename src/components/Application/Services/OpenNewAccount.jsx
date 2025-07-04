import React, { useState, useEffect } from "react";
import BankForm from "./OpenNewAccount/BankForm";

const OpenNewAccount = () => {
  const [activeTab, setActiveTab] = useState("");
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API = `${import.meta.env.VITE_APP_API_KEY}/service/account-opening`;
  const token = sessionStorage.getItem("token");
  const fetchBanks = async () => {
    try {
      const formData = new FormData();
      formData.append("type", "list");

      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.statuscode === "TXN") {
        // Map API response to our tab structure
        const bankTabs = data.data.map(bank => ({
          id: bank.id.toString(),
          label: bank.name,
          icon: getBankIcon(bank.name),
          content: <BankForm bankId={bank.id} />
        }));
        
        setBanks(bankTabs);
        if (bankTabs.length > 0) {
          setActiveTab(bankTabs[0].id);
        }
      } else {
        throw new Error(data.message || "Failed to fetch banks");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching banks:", err);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchBanks();
  }, [API, token]);

  // Manually map bank names to their icons
  const getBankIcon = (bankName) => {
    const iconMap = {
      "kotak bank ": "https://e7.pngegg.com/pngimages/851/1003/png-clipart-kotak-mahindra-bank-mobile-banking-private-sector-banks-in-india-banking-in-india-insurance-company-text-thumbnail.png",

      "Federal Bank": "https://play-lh.googleusercontent.com/wOikktEJFrkGIvlUdKwFffSpfQx46myiRUq8vNxBMI-Tx8b2jH9FHxaYtLvulJM-FUc6",
      // Add more banks as needed
      "HDFC Bank": "https://logo.clearbit.com/hdfcbank.com",
      "ICICI Bank": "https://logo.clearbit.com/icicibank.com",
      "SBI": "https://logo.clearbit.com/sbi.co.in"
    };

    return iconMap[bankName] || "https://via.placeholder.com/40"; // Default icon
  };

  if (loading) return <div className="text-center py-4">Loading banks...</div>;
  if (error) return <div className="text-center text-danger py-4">Error: {error}</div>;
  if (banks.length === 0) return <div className="text-center py-4">No banks available</div>;

  function toUpperCase(str) {
    return str.toUpperCase();
  }

  return (
    <div className="row gy-4">
      <div className="col-lg-12">
        <div className="card h-100">
          <div className="card-body p-24">
            {/* Dynamic Tabs */}
            <ul className="nav border-gradient-tab nav-pills mb-20 d-inline-flex justify-content-center">
              {banks.map((tab) => (
                <li key={tab.id} className="nav-item" role="presentation">
                  <button
                    className={`nav-link d-flex align-items-center gap-2 fw-semibold text-primary-light radius-4 px-16 py-10 ${
                      activeTab === tab.id ? "active" : ""
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                    type="button"
                  >
                    <img
                      className="w-10 h-10 object-fit-cover"
                      src={tab.icon}
                      alt={tab.label}
                    />
                  {toUpperCase(tab.label)}
                  </button>
                </li>
              ))}
            </ul>

            {/* Tab Content */}
            <div className="tab-content">
              {banks.map((tab) => (
                <div
                  key={tab.id}
                  className={`tab-pane ${activeTab === tab.id ? "show active" : ""}`}
                >
                  {tab.content}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenNewAccount;