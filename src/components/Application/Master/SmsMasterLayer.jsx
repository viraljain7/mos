// import React, { useCallback, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import ViewModal from "./Modal/ViewModal";
// import AddSmsModal from "./Modal/AddSmsModal";
// import ShimmerUI from "./Shimmer/SmsMasterShimmerUI";
// import EditSmsMasterModal from "./Modal/EditSmsMasterModal";
// import { useDispatch } from "react-redux";
// import { setSmsId } from "../../../rtk/features/SmsMaster/SmsMasterSlice";
// import {  Search } from "lucide-react";
// import Pagination from "../AccStmt/Modal/Pagination";

// // SmsMasterLayer
// const SmsMasterLayer = () => {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("Select Status");
//   const token = sessionStorage.getItem("token");

//   const API = `${import.meta.env.VITE_APP_API_KEY}/master/sms`;
//   const [showFilterData, setShowFilterData] = useState([]);

//   // Filter users based on search and status
//   const filteredUsers = user.filter((user) => {
//     const matchesSearch =
//       searchTerm === "" ||
//       user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.url?.toLowerCase().includes(searchTerm.toLowerCase())
//       statusFilter === "Select Status" || user.status === statusFilter;
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

//   // Handle status filter
//   const handleStatusFilter = (value) => {
//     setStatusFilter(value);
//     setCurrentPage(1); // Reset to first page when filtering
//   };

//   const fetchSchemeData = useCallback(async () => {
//     const formData = new FormData();
//     formData.append("type", "list"); // Append form data key-value pairs

//     try {
//       const response = await fetch(API, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData, // Pass the FormData directly as the body
//       });

//       if (!response.ok) {
//         // Handle non-2xx responses
//         console.error(`HTTP error! status: ${response.status}`);
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       if (data.statuscode === "TXN") {
//         setUser(data.data);
//         setLoading(false);
//       } else {
//         console.error("Unexpected response:", data);
//       }
//     } catch (error) {
//       console.error("Error while fetching scheme data:", error.message);
//       setLoading(false);
//     }
//   }, [API, token]); // Dependencies: API

//   useEffect(() => {
//     fetchSchemeData();
//   }, [fetchSchemeData]);

//   const filterDataById = (id) => {
//     const res = user.filter((item) => item.id === id);
//     setShowFilterData(res);
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div className="card">
//         {/* filter,search bar */}
//         <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-3">
//           <div className="d-flex flex-wrap align-items-center gap-3">
//             <div className="d-flex align-items-center gap-2">
//               <span>Show</span>
//               <select
//                 className="form-select form-select-sm w-auto"
//                 value={itemsPerPage}
//                 onChange={(e) => handleItemsPerPageChange(e.target.value)}
//               >
//                 {[10, 25, 50, 100].map(num => (
//                 <option key={num} value={num}>{num}</option>
//               ))}
//               </select>
//             </div>
//             <div className="icon-field">
//               <input
//                 type="text"
//                 name="#0"
//                 className="form-control form-control-sm w-auto"
//                 placeholder="Search"
//                 value={searchTerm}
//                 onChange={handleSearch}
//               />
//               <span className="icon">
//                 <Search size={18} />
//               </span>
//             </div>
//           </div>
//           <div className="d-flex flex-wrap align-items-center gap-3">
        

//             <AddSmsModal updateList={fetchSchemeData} />
//           </div>
//         </div>
//         <div className="card-body">
//           <div className="table-responsive scroll-sm">
//             <table className="table bordered-table sm-table mb-0">
//               <thead>
//                 <tr>
//                   <th scope="col">ID</th>
//                   <th scope="col">Name</th>
//                   <th scope="col">URL</th>
//                   <th scope="col">Content</th>
//                   <th scope="col">Action</th>
//                 </tr>
//               </thead>
//               {/* ?dynamic Data */}
//               <tbody>
//                 {loading ? (
//                   <ShimmerUI />
//                 ) : currentItems.length === 0 ? (
//                   <tr>
//                     <td colSpan="5" className="text-center">
//                       <div>No data found</div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentItems.map((data) => (
//                     <tr key={data.id}>
//                       <td>{data.id}</td>

//                       <td>
//                         <Link to="#" className="text-primary-600 fw-semibold">
//                           {data.name}
//                         </Link>
//                       </td>

//                       <td>{data.url}</td>

//                       <td>{data.content}</td>

//                       <td className=" d-flex  ">
//                         <ViewModal
//                           id={data.id}
//                           onClick={() => filterDataById(data.id)}
//                           data={showFilterData}
//                         />
//                         <EditSmsMasterModal
//                           api_id={() => dispatch(setSmsId(data.id))}
//                           updateList={fetchSchemeData}
//                         />
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//           {/* Pagination */}
//           <Pagination
//                     currentPage={currentPage}
//                     totalItems={filteredUsers.length}
//                     itemsPerPage={itemsPerPage}
//                     onPageChange={handlePageChange}
//                   />
//         </div>
//       </div>
//     </>
//   );
// };

// export default SmsMasterLayer;





import React, { useCallback, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ViewSmsModal from "./Modal/ViewSmsModal";
import AddSmsModal from "./Modal/AddSmsModal";
import ShimmerUI from "./Shimmer/SmsMasterShimmerUI";
import EditSmsMasterModal from "./Modal/EditSmsMasterModal";
import { Search } from "lucide-react";
import Pagination from "../AccStmt/Modal/Pagination";

const SmsMasterLayer = () => {
  const [loading, setLoading] = useState(true);
  const [smsData, setSmsData] = useState([]); // Renamed from 'user' to 'smsData'
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const token = sessionStorage.getItem("token");
  const API = `${import.meta.env.VITE_APP_API_KEY}/master/sms`;

  // Memoized filtered data
  const filteredSms = useMemo(() => {
    if (!searchTerm) return smsData;
    const term = searchTerm.toLowerCase();
    return smsData.filter(sms => 
      sms.name?.toLowerCase().includes(term) ||
      sms.url?.toLowerCase().includes(term)
    );
  }, [smsData, searchTerm]);

  // Memoized pagination data
  const { currentItems, totalPages } = useMemo(() => {
    const total = filteredSms.length;
    const totalPages = Math.ceil(total / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredSms.slice(indexOfFirstItem, indexOfLastItem);
    
    return { currentItems, totalPages };
  }, [filteredSms, currentPage, itemsPerPage]);

  // Fetch SMS data
  const fetchSmsData = useCallback(async () => {
    const formData = new FormData();
    formData.append("type", "list");

    setLoading(true);
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      
      const data = await response.json();
      if (data.statuscode === "TXN") {
        setSmsData(data.data);
      }
    } catch (error) {
      console.error("Error fetching SMS data:", error);
    } finally {
      setLoading(false);
    }
  }, [API, token]);

  useEffect(() => {
    fetchSmsData();
  }, [fetchSmsData]);

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


  return (
    <>
      {/* <ToastContainer /> */}
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
          <AddSmsModal updateList={fetchSmsData} />
        </div>

        <div className="card-body">
          <div className="table-responsive scroll-sm">
            <table className="table bordered-table sm-table mb-0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>URL</th>
                  <th>Content</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <ShimmerUI />
                ) : currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No data found
                    </td>
                  </tr>
                ) : (
                  currentItems.map((data) => (
                    <tr key={data.id}>
                      <td>{data.id}</td>
                      <td>
                        <Link to="#" className="text-primary-600 fw-semibold">
                          {data.name}
                        </Link>
                      </td>
                      <td>{data.url}</td>
                      <td>{data.content}</td>
                      <td className="d-flex">
                        <ViewSmsModal 
                          data={data}
                        />
                        <EditSmsMasterModal
                        data={data}
                          onSuccess={fetchSmsData}
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
            totalItems={filteredSms.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default SmsMasterLayer;