import React from 'react';
import { Navigate } from 'react-router-dom';
import { usePermissions } from '../context/PermissionContext';

const ProtectedRoute = ({ children, permissionSlug }) => {
  const permissions = usePermissions();
  const stored = JSON.parse(sessionStorage.getItem('permissions') || '[]');



  // Check if permission exists in either stored or context permissions
  const hasPermission = stored.includes(permissionSlug) || permissions.includes(permissionSlug);

  if (!hasPermission) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;


// import React, { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import { usePermissions } from '../context/PermissionContext';

// const ProtectedRoute = ({ children, permissionSlug }) => {
//   const contextPermissions = usePermissions();
//   const [storedPermissions, setStoredPermissions] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // 1. First store permissions in sessionStorage
//     if (contextPermissions && contextPermissions.length > 0) {
//       sessionStorage.setItem('permissions', JSON.stringify(contextPermissions));
//     }
//     // 2. Then check from sessionStorage
//     const sessionPerms = JSON.parse(sessionStorage.getItem('permissions') || '[]');
//     setStoredPermissions(sessionPerms);
//     setIsLoading(false);
//   }, [contextPermissions]);

//   if (isLoading) {
//     return <div>Loading permissions...</div>; // Or a loading spinner
//   }

//   // Check permissions from stored state variable
//   if (!storedPermissions.includes(permissionSlug)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;