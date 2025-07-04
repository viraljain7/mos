// import React, { useCallback, useEffect, useMemo, useState } from "react";
// // import { Icon } from "@iconify/react/dist/iconify.js";
// import { Link, } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { setSchemeId } from "../../../rtk/features/scheme/schemeSlice.js";
// import AddSchemeUser from "./Modal/AddSchemeUser.jsx";
// import CommissionModalData from "./Modal/CommissionModalData.jsx";
// import ShimmerUI from "./Shimmer/SchemeManagerShimmerUI.jsx";
// import { ChevronsLeft, ChevronsRight, Eye, Pencil, Search } from "lucide-react";
// import ViewSchemeManagerModal from "./Modal/ViewSchemeManagerModal.jsx";
// import EditSchemeManagerModal from "./Modal/EditSchemeManagerModal.jsx";
// import Pagination from "../AccStmt/Modal/Pagination.jsx";
// // SchemeManagerLayer
// const SchemeManagerLayer = () => {
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();
//   const [user, setUser] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("Select Status");
//   const token = sessionStorage.getItem("token");
//   const API = `${import.meta.env.VITE_APP_API_KEY}/master/scheme`;
//   const [showData, setShowData] = useState([]);

//   // Filter users based on search and status
//   const filteredUsers = useMemo(() => {
//     return user.filter((user) => {
//       const matchesSearch =
//         searchTerm === "" ||
//         user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.mobile?.includes(searchTerm);
//       const matchesStatus =
//         statusFilter === "Select Status" || user.status === statusFilter;
//       return matchesSearch && matchesStatus;
//     });
//   }, [user, searchTerm, statusFilter]);

//   // Pagination calculations
//   const totalPages = useMemo(
//     () => Math.ceil(filteredUsers.length / itemsPerPage),
//     [filteredUsers.length, itemsPerPage]
//   );
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;

//   const currentItems = useMemo(() => {
//     return filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
//   }, [indexOfFirstItem, indexOfLastItem, filteredUsers]);

//   // Generate page numbers
//   const getPageNumbers = () => {
//     let pages = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pages.push(i);
//     }
//     return pages;
//   };

//   // Handle page change
//   const handlePageChange = useCallback(
//     (pageNumber) => {
//       if (pageNumber >= 1 && pageNumber <= totalPages) {
//         setCurrentPage(pageNumber);
//       }
//     },
//     [totalPages]
//   );

//   // Handle items per page change
//   const handleItemsPerPageChange = useCallback((value) => {
//     setItemsPerPage(Number(value));
//     setCurrentPage(1); // Reset to first page when changing items per page
//   }, []);

//   // Handle search
//   const handleSearch = useCallback((e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1); // Reset to first page when searching
//   }, []);

//   // Handle status filter
//   const handleStatusFilter = useCallback((value) => {
//     setStatusFilter(value);
//     setCurrentPage(1); // Reset to first page when filtering
//   }, []);

//   // Fetch scheme data
//   const fetchSchemeData = useCallback(() => {
//     const formData = new FormData();
//     formData.append("type", "list");
//     fetch(API, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       body: formData,
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
//         return res.json();
//       })
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
//   }, [API, token]);

//   // Handle switch change

//   const handleSwitchChange = useCallback(
//     (id) => {
//       const formData = new FormData();
//       formData.append("type", "status");
//       formData.append("scheme_id", id);

//       fetch(`${API}`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formData,
//       })
//         .then((res) => {
//           if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
//           return res.json();
//         })
//         .then((data) => {
//           if (data.statuscode === "TXN") {
//             toast.success(data.message);
//             fetchSchemeData(); // Re-fetch data to reflect the changes
//           } else {
//             toast.error("Error updating the user.");
//           }
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//           alert("Something went wrong!");
//         });
//     },
//     [API, token, fetchSchemeData]
//   );

//   useEffect(() => {
//     fetchSchemeData();
//   }, [fetchSchemeData]);

//   const FilterSelectedUser = useCallback(
//     (id) => {
//       const res = user.filter((item) => item.id === id);
//       setShowData(res);
//     },
//     [user]
//   );

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
//                 <option value={10}>10</option>
//                 <option value={25}>25</option>
//                 <option value={50}>50</option>
//                 <option value={100}>100</option>
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
//                 {/* <Icon icon="ion:search-outline" /> */}
//                 <Search size={18} />
//               </span>
//             </div>
//           </div>
//           <div className="d-flex flex-wrap align-items-center gap-3">
//             <AddSchemeUser updateList={fetchSchemeData} />
//           </div>
//         </div>
//         <div className="card-body">
//           <div className="table-responsive scroll-sm">
//             <table className="table bordered-table sm-table mb-0 ">
//               <thead>
//                 <tr className=" ">
//                   <th scope="col">Status</th>
//                   <th scope="col">Name</th>
//                   <th
//                     scope="col"
//                     className="d-flex justify-content-center px-8"
//                     // className="text-end"
//                   >
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               {/* ?dynamic Data */}
//               <tbody>
//                 {loading ? (
//                   <ShimmerUI />
//                 ) : currentItems.length === 0 ? (
//                   <tr>
//                     <td colSpan="3" className="text-center">
//                       <div>No data found</div>
//                     </td>
//                   </tr>
//                 ) : (
//                   currentItems.map((data) => (
//                     <tr key={data.id}>
//                       <td>
//                         <div className="form-switch switch-primary d-flex align-items-center gap-3">
//                           <label>
//                             <input
//                               className="form-check-input"
//                               type="checkbox"
//                               role="switch"
//                               id="yes"
//                               defaultChecked={data.status === "1"}
//                               onChange={() => handleSwitchChange(data.id)}
//                             />
//                           </label>
//                         </div>
//                       </td>
//                       <td>
//                         <Link to="#" className="text-primary-600 fw-semibold">
//                           {data.name}
//                         </Link>
//                       </td>

//                       <td className="d-flex gap-2 justify-content-center ">

//                          <EditSchemeManagerModal
//                           data={data}
//                           onSuccess={fetchSchemeData}
//                         /> 
                      
                    
//                         <CommissionModalData
//                           onClick={() => dispatch(setSchemeId(data.id))}
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
//   currentPage={currentPage}
//   totalItems={filteredUsers.length}
//   itemsPerPage={itemsPerPage}
//   onPageChange={handlePageChange}

// />
//         </div>
//       </div>
//     </>
//   );
// };

// export default SchemeManagerLayer;















import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast,  } from "react-toastify";
import { useDispatch } from "react-redux";
import { setSchemeId } from "../../../rtk/features/scheme/schemeSlice.js";
import AddSchemeUser from "./Modal/AddSchemeUser.jsx";
import CommissionModalData from "./Modal/CommissionModalData.jsx";
import ShimmerUI from "./Shimmer/SchemeManagerShimmerUI.jsx";
import { Search } from "lucide-react";
import EditSchemeManagerModal from "./Modal/EditSchemeManagerModal.jsx";
import Pagination from "../AccStmt/Modal/Pagination.jsx";

const SchemeManagerLayer = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const token = sessionStorage.getItem("token");
  const API = `${import.meta.env.VITE_APP_API_KEY}/master/scheme`;

  // Filter users based on search (removed status filter since it wasn't being used)
  const filteredUsers = useMemo(() => {
    return user.filter((user) => {
      return (
        searchTerm === "" ||
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) 
      );
    });
  }, [user, searchTerm]);

  // Pagination calculations
  const totalPages = useMemo(
    () => Math.ceil(filteredUsers.length / itemsPerPage),
    [filteredUsers.length, itemsPerPage]
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = useMemo(() => {
    return filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  }, [indexOfFirstItem, indexOfLastItem, filteredUsers]);

  // Handle page change
  const handlePageChange = useCallback(
    (pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber);
      }
    },
    [totalPages]
  );

  // Handle items per page change
  const handleItemsPerPageChange = useCallback((value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  }, []);

  // Handle search
  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  // Fetch scheme data
  const fetchSchemeData = useCallback(() => {
    const formData = new FormData();
    formData.append("type", "list");
    fetch(API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.statuscode === "TXN") {
          setUser(data.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [API, token]);

  // Handle switch change
  const handleSwitchChange = useCallback(
    (id) => {
      const formData = new FormData();
      formData.append("type", "status");
      formData.append("scheme_id", id);

      fetch(`${API}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
          return res.json();
        })
        .then((data) => {
          if (data.statuscode === "TXN") {
            toast.success(data.message);
            fetchSchemeData();
          } else {
            toast.error("Error updating the user.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Something went wrong!");
        });
    },
    [API, token, fetchSchemeData]
  );

  useEffect(() => {
    fetchSchemeData();
  }, [fetchSchemeData]);

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
                name="#0"
                className="form-control form-control-sm w-auto"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
              />
              <span className="icon">
                <Search size={18} />
              </span>
            </div>
          </div>
          <div className="d-flex flex-wrap align-items-center gap-3">
            <AddSchemeUser onSuccess={fetchSchemeData} />
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive scroll-sm">
            <table className="table bordered-table sm-table mb-0 ">
              <thead>
                <tr className=" ">
                  <th scope="col">Status</th>
                  <th scope="col">Name</th>
                  <th scope="col" className="d-flex justify-content-center px-8">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <ShimmerUI />
                ) : currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center">
                      <div>No data found</div>
                    </td>
                  </tr>
                ) : (
                  currentItems.map((data) => (
                    <tr key={data.id}>
                      <td>
                        <div className="form-switch switch-primary d-flex align-items-center gap-3">
                          <label>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id={`switch-${data.id}`}
                              checked={data.status === "1"}
                              onChange={() => handleSwitchChange(data.id)}
                            />
                          </label>
                        </div>
                      </td>
                      <td>
                        <Link to="#" className="text-primary-600 fw-semibold">
                          {data.name}
                        </Link>
                      </td>
                      <td className="d-flex gap-2 justify-content-center ">
                        <EditSchemeManagerModal
                          data={data}
                          onSuccess={fetchSchemeData}
                        />
                        <CommissionModalData
                          onClick={() => dispatch(setSchemeId(data.id))}
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
            totalItems={filteredUsers.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default SchemeManagerLayer;