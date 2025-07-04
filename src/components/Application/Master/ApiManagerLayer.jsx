// import React, { useCallback, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import AddApi from "./Modal/AddApiModal";
// import ShimmerUI from "./Shimmer/ApiMangerShimmerUI";
// import EditApiManagerModal from "./Modal/EditApiManagerModal";
// import {Search } from "lucide-react";
// import ViewCredentialsModal from "./Modal/ViewCredentialsModal";
// import Pagination from "../AccStmt/Modal/Pagination";

// //API Manager Layer
// const ApiManagerLayer = () => {
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState("");
//   const token = sessionStorage.getItem("token");
//   const API = `${import.meta.env.VITE_APP_API_KEY}/master/api`;

//   const fetchSchemeData = useCallback(() => {
//     const formData = new FormData();
//     formData.append("type", "list"); // Append form data key-value pairs

//     fetch(API, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`, // Pass the token here
//         // Do not add 'Content-Type' when sending FormData; it will be set automatically
//       },
//       body: formData, // Pass the FormData directly as the body
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.statuscode === "TXN") {
//           setUser(data.data);
//           setLoading(false);
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         setLoading(false);
//       });
//   }, [API, token]); // Dependencies: API

//   useEffect(() => {
//     fetchSchemeData();
//   }, [fetchSchemeData]);

//   // Filter users based on search and status
//   const filteredUsers = user.filter((user) => {
//     const matchesSearch =
//       searchTerm === "" ||
//       user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.product?.toLowerCase().includes(searchTerm.toLowerCase())||
//       user.url?.toLowerCase().includes(searchTerm.toLowerCase())
    
//     return matchesSearch ;
//   });

//   // Pagination calculations
//   const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

//   // Generate page numbers
//   const getPageNumbers = () => {
//     let pages = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pages.push(i);
//     }
//     return pages;
//   };

//   // Handle page change
//   const handlePageChange = (pageNumber) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   // Handle items per page change
//   const handleItemsPerPageChange = (value) => {
//     setItemsPerPage(Number(value));
//     setCurrentPage(1); // Reset to first page when changing items per page
//   };

//   // Handle search
//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1); // Reset to first page when searching
//   };

//   const handleSwitchChange = (id) => {
//     const formData = new FormData();
//     formData.append("type", "status");
//     formData.append("api_id", id); // Append updated name here

//     fetch(`${API}`, {
//       // Use the correct URL for the update endpoint
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`, // Pass the token here
//         // Do not add 'Content-Type' when sending FormData; it will be set automatically
//       },
//       body: formData,
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.statuscode === "TXN") {
//           toast.success(data.message);

//           fetchSchemeData(); // Re-fetch data to reflect the changes
//         } else {
//           toast.error("Error updating the user.");
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         alert("Something went wrong!");
//       });
//   };





//   return (
//     <div className="card">
//       <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-3">
//         <div className="d-flex flex-wrap align-items-center gap-3">
//           <div className="d-flex align-items-center gap-2">
//             <span>Show</span>
//             <select
//               className="form-select form-select-sm w-auto"
//               value={itemsPerPage}
//               onChange={(e) => handleItemsPerPageChange(e.target.value)}
//             >
//               <option value={10}>10</option>
//               <option value={25}>25</option>
//               <option value={50}>50</option>
//               <option value={100}>100</option>
//             </select>
//           </div>
//           <div className="icon-field">
//             <input
//               type="text"
//               name="#0"
//               className="form-control form-control-sm w-auto"
//               placeholder="Search"
//               value={searchTerm}
//               onChange={handleSearch}
//             />
//             <span className="icon">
//               <Search size={18} />
//             </span>
//           </div>
//         </div>
//         <div className="d-flex flex-wrap align-items-center gap-3">
//           <AddApi updateList={fetchSchemeData} />
//         </div>
//       </div>
//       <div className="card-body">
//         <div className="table-responsive scroll-sm">
//           <table className="table bordered-table sm-table mb-0">
//             <thead>
//               <tr>
//                 <th scope="col">ID</th>
//                 <th scope="col">Name</th>
//                 <th scope="col">Product </th>
//                 <th scope="col">API </th>
//                 <th scope="col">Credential</th>
//                 <th scope="col">Status</th>
//                 <th scope="col">Edit</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <ShimmerUI />
//               ) : currentItems.length === 0 ? (
//                 <tr>
//                   <td colSpan="7" className="text-center">
//                     <div>No data found</div>
//                   </td>
//                 </tr>
//               ) : (
//                 currentItems.map((data) => (
//                   <tr key={data.id}>
//                     <td>{data.id}</td>

//                     <td>
//                       <Link to="#" className="text-primary-600  fw-semibold">
//                         {data.name}
//                       </Link>
//                     </td>
//                     <td>{data.product}</td>
//                     <td>
//                       <span className="btn rounded-pill btn-info-100 text-info-600  radius-4 px-10 py-4 text-sm ">
//                         {data.url}
//                       </span>
//                     </td>
//                     <td>
                  
                    
//                     <ViewCredentialsModal  data={data} /></td>
//                     <td>
//                       <div className="form-switch switch-primary d-flex align-items-center gap-3">
//                         <input
//                           className="form-check-input"
//                           type="checkbox"
//                           role="switch"
//                           id={`switch-${data.id}`}
//                           checked={data.status === "1"}  //
//                           onChange={() => handleSwitchChange(data.id)}
//                         />
//                       </div>
//                     </td>

//                     <td>
//                       <EditApiManagerModal
                      
//                       data={data}
//                       onSuccess={fetchSchemeData}
//                       />
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

        

//         <Pagination
//             currentPage={currentPage}
//             totalItems={filteredUsers.length}
//             itemsPerPage={itemsPerPage}
//             onPageChange={handlePageChange}
//           />
//       </div>
//     </div>
//   );
// };

// export default ApiManagerLayer;



import React, { useCallback, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AddApi from "./Modal/AddApiModal";
import ShimmerUI from "./Shimmer/ApiMangerShimmerUI";
import EditApiManagerModal from "./Modal/EditApiManagerModal";
import { Search } from "lucide-react";
import ViewCredentialsModal from "./Modal/ViewCredentialsModal";
import Pagination from "../AccStmt/Modal/Pagination";

const ApiManagerLayer = () => {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]); // Renamed from 'user' to more descriptive 'apiData'
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const token = sessionStorage.getItem("token");
  const API = `${import.meta.env.VITE_APP_API_KEY}/master/api`;

  // Memoized API data fetching
  const fetchApiData = useCallback(() => {
    const formData = new FormData();
    formData.append("type", "list");

    setLoading(true);
    fetch(API, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.statuscode === "TXN") {
          setApiData(data.data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to fetch API data");
      })
      .finally(() => setLoading(false));
  }, [API, token]);

  useEffect(() => {
    fetchApiData();
  }, [fetchApiData]);

  // Memoized filtered data
  const filteredApis = useMemo(() => {
    if (!searchTerm) return apiData;
    const term = searchTerm.toLowerCase();
    return apiData.filter(api => 
      api.name?.toLowerCase().includes(term) ||
      api.product?.toLowerCase().includes(term) ||
      api.url?.toLowerCase().includes(term))
  }, [apiData, searchTerm]);

  // Memoized pagination data
  const { currentItems, totalPages } = useMemo(() => {
    const total = filteredApis.length;
    const totalPages = Math.ceil(total / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredApis.slice(indexOfFirstItem, indexOfLastItem);
    
    return { currentItems, totalPages };
  }, [filteredApis, currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const toggleApiStatus = useCallback(async (id) => {
    const formData = new FormData();
    formData.append("type", "status");
    formData.append("api_id", id);

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await response.json();
      
      if (data.statuscode === "TXN") {
        toast.success(data.message);
        fetchApiData();
      } else {
        throw new Error(data.message || "Failed to update API status");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Something went wrong!");
    }
  }, [API, token, fetchApiData]);

  return (
    <div className="card">
      <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-3">
        <div className="d-flex flex-wrap align-items-center gap-3">
          <div className="d-flex align-items-center gap-2">
            <span>Show</span>
            <select
              className="form-select form-select-sm w-auto"
              value={itemsPerPage}
              onChange={(e) => handleItemsPerPageChange(e.target.value)}
            >
              {[10, 25, 50, 100].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <div className="icon-field">
            <input
              type="text"
              className="form-control form-control-sm w-auto"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search size={18} className="icon" />
          </div>
        </div>
        <AddApi updateList={fetchApiData} />
      </div>

      <div className="card-body">
        <div className="table-responsive scroll-sm">
          <table className="table bordered-table sm-table mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Product</th>
                <th>API</th>
                <th>Credential</th>
                <th>Status</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <ShimmerUI />
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    No data found
                  </td>
                </tr>
              ) : (
                currentItems.map((api) => (
                  <tr key={api.id}>
                    <td>{api.id}</td>
                    <td>
                      <Link to="#" className="text-primary-600 fw-semibold">
                        {api.name}
                      </Link>
                    </td>
                    <td>{api.product}</td>
                    <td>
                      <span className="btn rounded-pill btn-info-100 text-info-600 radius-4 px-10 py-4 text-sm">
                        {api.url}
                      </span>
                    </td>
                    <td><ViewCredentialsModal data={api} /></td>
                    <td>
                      <div className="form-switch switch-primary d-flex align-items-center gap-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          role="switch"
                          id={`switch-${api.id}`}
                          checked={api.status === "1"}
                          onChange={() => toggleApiStatus(api.id)}
                        />
                      </div>
                    </td>
                    <td>
                      <EditApiManagerModal 
                        data={api} 
                        onSuccess={fetchApiData} 
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={filteredApis.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ApiManagerLayer;
