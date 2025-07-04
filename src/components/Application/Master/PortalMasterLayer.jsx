import React, { useCallback, useEffect, useState } from "react";
import { toast,  } from "react-toastify";
import ShimmerUI from "./Shimmer/PortalMasterShimmerUI";

function PortalMaster() {
  const token = sessionStorage.getItem("token");
  const API = `${import.meta.env.VITE_APP_API_KEY}/master/portal`;

  const [portal, setPortal] = useState([]); // State to store portal data
  const [inputValues, setInputValues] = useState({}); // State to store input values for each portal item
  const [loadingStates, setLoadingStates] = useState({}); // State to track loading status for each item

  // Fetch portal data
  const fetchUserData = useCallback(() => {
    const formData = new FormData();
    formData.append("type", "list"); // Append form data key-value pairs

    fetch(API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token here
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statuscode === "TXN") {
          setPortal(data.data);
          // Initialize input values state with the current values from the API
          const initialValues = {};
          data.data.forEach((item) => {
            initialValues[item.id] = item.value;
          });
          setInputValues(initialValues);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [API, token]);

  // Update portal data
  const updatePortalData = useCallback(
    (provider_id, value) => {
      // Set loading state for the specific item
      setLoadingStates((prev) => ({
        ...prev,
        [provider_id]: true,
      }));

      const formData = new FormData();
      formData.append("type", "update"); // Append form data key-value pairs
      formData.append("provider_id", provider_id); // Append form data key-value pairs
      formData.append("value", value); // Append form data key-value pairs

      fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token here
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.statuscode === "TXN") {
            toast.success(data.message);
            fetchUserData(); // Refresh the data after updating
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          // Reset loading state for the specific item
          setLoadingStates((prev) => ({
            ...prev,
            [provider_id]: false,
          }));
        });
    },
    [API, token, fetchUserData]
  );

  // Handle input change
  const handleInputChange = (id, value) => {
    setInputValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <div className="mb-40">
      {/* <ToastContainer /> */}
      <div className="row gy-4">
        {portal.length === 0 ? (
          <ShimmerUI />
        ) : (
          portal.map((item, index) => (
            <div className="col-xxl-4 col-sm-6" key={index}>
              <div className="card radius-12">
                <div className="card-header py-16 px-24 bg-base d-flex align-items-center gap-1 border border-end-0 border-start-0 border-top-0 justify-content-center">
                  <h6 className="text-lg mb-0">{item?.name}</h6>
                </div>
                <div className="card-body py-16 px-24">
                  <h6 className="text-primary-light mb-8 text-md justify-content-center d-flex">
                    {item?.label}
                  </h6>
                  <input
                    type="text"
                    className="form-control border border-neutral-200 radius-8 text-center"
                    value={inputValues[item.id] || ""}
                    onChange={(e) => handleInputChange(item.id, e.target.value)}
                  />
                </div>
                <div className="card-footer text-center  border border-end-0 border-start-0 border-bottom-0 py-16 px-24">
                  <button
                    onClick={() =>
                      updatePortalData(item.id, inputValues[item.id])
                    }
                    className="text-white fw-semibold  btn btn-primary-600 radius-8 px-56 py-8  "
                    disabled={loadingStates[item.id]} // Disable button while loading
                  >
                    {loadingStates[item.id] ? "Updating..." : "Update"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PortalMaster;
