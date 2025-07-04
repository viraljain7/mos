import React, { useEffect, useState, useCallback } from "react";

const CommissionTable = React.memo(({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="table-responsive scroll-sm">
      <table className="table striped-table sm-table mb-0">
        <thead>
          <tr>
            <th scope="col">Product Name</th>
            <th scope="col">Charge Type</th>
            <th scope="col">Service Charge</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className="fw-semibold">
                <td>{item?.provider?.name || "N/A"}</td>
                <td>{item?.chargetype.charAt(0).toUpperCase() + String(item?.chargetype).slice(1) || "N/A"}</td>
                <td>{item?.servicecharge || "0"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center py-4 text-muted">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
});

const MyCommissionLayer = () => {
    const [navTabs, setNavTabs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("");
    const [userCommissionData, setUserCommissionData] = useState([]);
    const [isTableLoading, setIsTableLoading] = useState(false);
    const API = `${import.meta.env.VITE_APP_API_KEY}/master/scheme`;

  const fetchNavTabs = useCallback(async () => {
    try {
      const formPayload = new FormData();
      formPayload.append("type", "products");
      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: formPayload,
      });

      const data = await response.json();

      if (response.ok && data.statuscode === "TXN") {
        const mappedTabs = data.data.map((product, index) => ({
          id: product.toLowerCase(),
          label: product,
          active: index === 0,
        }));
        setNavTabs(mappedTabs);
        setActiveTab(mappedTabs[0]?.id || "");
        fetchGetUserCommission(mappedTabs[0]?.id); // Fetch commission data for first tab
      } else {
        throw new Error(data.message || "Failed to fetch navigation tabs");
      }
    } catch (err) {
      setError(err.message);
      const fallbackTabs = [
        {
          id: "recharge",
          label: "Recharge",
          active: true,
        },
      ];
      setNavTabs(fallbackTabs);
      setActiveTab(fallbackTabs[0].id);
    } finally {
      setLoading(false);
    }
  }, [API]);

  const fetchGetUserCommission = useCallback(
    async (type) => {
      setIsTableLoading(true);
      try {
        const formPayload = new FormData();
        formPayload.append("type", "getusercommission");
        formPayload.append("provider_type", type);

        const response = await fetch(API, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: formPayload,
        });

        const data = await response.json();
        if (response.ok && data.statuscode === "TXN") {
          setUserCommissionData(data.data || []);
        } else {
          throw new Error(data.message || "Failed to fetch commission data");
        }
      } catch (err) {
        setError(err.message);
        setUserCommissionData([]);
      } finally {
        setIsTableLoading(false);
      }
    },
    [API],
  );


  useEffect(() => {
    fetchNavTabs();
  }, [fetchNavTabs]);

  const handleTabChange = useCallback(
    (tabId) => {
      setActiveTab(tabId);
      setUserCommissionData([]); // Clear old data immediately
      fetchGetUserCommission(tabId);
    },
    [fetchGetUserCommission],
  );


  if (loading) {
    return <div>Loading navigation...</div>;
  }

  if (error) {
    console.error("Error:", error);
    return <div className="alert alert-danger">{error}</div>;
  }
  const renderTabContent = () => {
    return <CommissionTable data={userCommissionData} isLoading={isTableLoading} />;
  };
  return (
    <div className="row gy-4">
      <div className="col-lg-12">
        <div className="card h-100">
          <div className="card-body p-24">
            <ul className="nav border-gradient-tab nav-pills mb-20 d-inline-flex justify-content-center">
              {navTabs.map((tab) => (
                <li className="nav-item" role="presentation" key={tab.id}>
                  <button
                    className={`nav-link d-flex align-items-center gap-2 fw-semibold text-primary-light radius-4 px-16 py-10 ${
                      activeTab === tab.id ? "active" : ""
                    }`}
                    onClick={() => handleTabChange(tab.id)}
                    type="button"
                    role="tab"
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="tab-content">
              <div className="tab-pane fade show active">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MyCommissionLayer);
