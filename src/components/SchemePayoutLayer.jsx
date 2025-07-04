import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast, } from "react-toastify";
import { useParams } from 'react-router-dom';

const SchemePayoutLayer = () => {
  const { schemeName } = useParams();
  const [users, setUsers] = useState([]); // Array of operator-specific states
  const [operators, setOperators] = useState([]); // Array of operators
  const token = sessionStorage.getItem("token");
  const API = `${import.meta.env.VITE_APP_API_KEY}/master/scheme`;
  const scheme_id = useSelector((state) => state.scheme.value);

  // Define the form fields dynamically
  const formFields = [
    {
      name: "commissiontype", // Dropdown field
      label: "Commission Type",
      type: "select",
      options: [
        { value: "percent", label: "Percent" },
        { value: "flat", label: "Flat" },
      ],
    },
    { name: "whitelabel", label: "WhiteLabel", type: "text" },
    { name: "cnf", label: "CNF", type: "text" },
    { name: "apiuser", label: "Api user", type: "text" },
    { name: "masterdistributor", label: "Master Distributor", type: "text" },
    { name: "distributor", label: "Distributor", type: "text" },
    { name: "retailer", label: "Retailer", type: "text" },

    {
      name: "servicetype", // Dropdown field
      label: "Service Type",
      type: "select",
      options: [
        { value: "percent", label: "Percent" },
        { value: "flat", label: "Flat" },
      ],
    },
    { name: "servicecharge", label: "Service Charge", type: "text" },
  ];

  // Fetch operators from the API
  const fetchOperators = useCallback(async () => {
    const formData = new FormData();
    formData.append("type", "providers");
    formData.append("producttype", schemeName);

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();

      if (data.statuscode === "TXN") {
        setOperators(data.data || []);
        // Initialize user state for each operator
        const initialUserState = data.data.map(() =>
          formFields.reduce((acc, field) => {
            acc[field.name] = ""; // Initialize all fields with empty values
            return acc;
          }, {})
        );
        setUsers(initialUserState);
      } else {
        toast.error(data.message || "Error fetching operators.");
      }
    } catch (error) {
      toast.error("Something went wrong while fetching operators!");
    }
  }, [API, token]);



  const fetchInputFieldData = useCallback(async () => {
    if (!scheme_id) return;
  
    try {
      const formData = new FormData();
      formData.append("type", "getcommission");
      formData.append("scheme_id", scheme_id);
  
      console.log("formData entries:");
      // Debugging: Log all entries in formData
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
  
      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      
      const data = await response.json();
  
      if (data.statuscode === "TXN") {
        const updatedUsers = operators.map((operator) => {
          const operatorData = data.data.find(
            (item) => item.provider_id === operator.id
          );
          return operatorData
            ? {
                commissiontype: operatorData.type,
                whitelabel: operatorData.whitelabel,
                cnf: operatorData.cnf,
                masterdistributor: operatorData.masterdistributor,
                distributor: operatorData.distributor,
                retailer: operatorData.retailer,
                apiuser: operatorData.apiuser,
                servicetype: operatorData.chargetype,
                servicecharge: operatorData.servicecharge,
              }
            : formFields.reduce((acc, field) => {
                acc[field.name] = "";
                return acc;
              }, {});
        });
        setUsers(updatedUsers);
      } else {
        toast.error(data.message || "Error fetching input field data.");
      }
    } catch (error) {
      toast.error("Something went wrong while fetching input field data!");
      console.error("Error:", error);
    }
  }, [API, token, scheme_id, operators]);

  // Handle input changes dynamically
  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    setUsers((prev) => {
      const updatedUsers = [...prev];
      updatedUsers[index][name] = value;
      return updatedUsers;
    });
  };


const submitHandler = async (index, provider_id) => {
  const user = users[index];

  if (
    !user.whitelabel ||
    !user.cnf ||
    !user.masterdistributor ||
    !user.distributor ||
    !user.retailer ||
    !user.apiuser ||
    !user.servicecharge ||
    !user.commissiontype ||
    !user.servicetype
  ) {
    toast.error("Please fill all required fields.");
    return;
  }

  try {
    const payload = {
      type: "setcommission",
      provider_id,
      scheme_id,
      comissiontype: user.commissiontype,
      chargetype: user.servicetype,
      whitelabel: user.whitelabel,
      cnf: user.cnf,
      masterdistributor: user.masterdistributor,
      distributor: user.distributor,
      retailer: user.retailer,
      apiuser: user.apiuser,
      servicecharge: user.servicecharge
    };

    console.log("Request payload:", payload);

    const response = await fetch(API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    console.log("Response:",  JSON.stringify(payload)); // Debugging line
    
    const responseData = await response.json();
    console.log("Response Data:", responseData); // Debugging line

    if (responseData.statuscode === "TXN") {
      toast.success(responseData.message);
    } else {
      toast.error(responseData.message,"jsonify(payload));");
    }
  } catch (error) {
    toast.error("Failed to submit data. Please try again.");
    console.error("Error:", error);
  }
};

  useEffect(() => {
    fetchOperators();
  }, [fetchOperators]);

  useEffect(() => {
    if (operators.length > 0 && scheme_id) {
      fetchInputFieldData();
    }
  }, [scheme_id, operators, fetchInputFieldData]);

  return (
    <>
      {/* <ToastContainer /> */}

      <div className="card radius-12 ">
        {" "}
        {/* Added radius-12 for rounded corners */}
        <div className="card-body">
          <div className="table-responsive scroll-sm">
            <table className="table 3xl-table mb-0">
              <thead>
                <tr className="text-xs">
                  <th scope="col" className="bg-base text-primary-light">
                    Operator
                  </th>{" "}
                  {/* Added bg-base and text-primary-light */}
                  {formFields.map((field) => (
                    <th
                      key={field.name}
                      scope="col"
                      className="bg-base text-primary-light"
                    >
                      {" "}
                      {/* Added bg-base and text-primary-light */}
                      {field.label}
                    </th>
                  ))}
                  <th scope="col" className="bg-base text-primary-light">
                    Action
                  </th>{" "}
                  {/* Added bg-base and text-primary-light */}
                </tr>
              </thead>
              <tbody>
                {operators.map((operator, index) => (
                  <tr key={operator.id || index} className="text-xs">
                    <td className="fw-bold bg-base text-primary-light">
                      {operator.name}
                    </td>{" "}
                    {/* Added text-primary-light */}
                    {formFields.map((field) => (
                      <td key={field.name} className="bg-base">
                        {field.type === "select" ? (
                          <select
                            name={field.name}
                            className="form-control form-select border border-neutral-200 radius-8 bg-base"
                            value={users[index]?.[field.name] || ""}
                            onChange={(e) => handleInputChange(index, e)}
                          >
                            <option value="" disabled>
                              Select {field.label}
                            </option>
                            {field.options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            name={field.name}
                            className="form-control border border-neutral-200 radius-8"
                            value={users[index]?.[field.name] || ""}
                            onChange={(e) => handleInputChange(index, e)}
                          />
                        )}
                      </td>
                    ))}
                    <td className="bg-base">
                      <button
                        type="button"
                        className="btn bg-primary-600 text-white fw-semibold radius-8 px-20 py-11 text-sm "
                        onClick={() => submitHandler(index, operator.id)}
                      >
                        Submit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default SchemePayoutLayer;
