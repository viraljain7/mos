
import React, { createContext, useContext, useEffect, useState } from 'react';

const PermissionContext = createContext([]);

export const PermissionProvider = ({ children }) => {
  const [permissions, setPermissions] = useState([]);
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  
  // Get the token from session storage
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const formData = new FormData();
        formData.append('type', 'currentuserpermission');

        const API = `${import.meta.env.VITE_APP_API_KEY}/master/permission`;
      
          const response = await fetch(API, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`, // Pass the token here
                // Do not add 'Content-Type' when sending FormData; it will be set automatically
              },
            body: formData,
          });
      
        const result = await response.json();

        if (result.statuscode === 'TXN') {
          setPermissions(result.data);
          sessionStorage.setItem('permissions', JSON.stringify(result.data));
        } else {
          console.error('Invalid permission response:', result);
        }
      } catch (error) {
        console.error('Permission fetch error', error);
      }
    };

    fetchPermissions();
  }, [token]);

  // Check for token changes every second
  useEffect(() => {
    const interval = setInterval(() => {
      const newToken = sessionStorage.getItem("token");
      if (newToken !== token) {
        setToken(newToken);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [token]);


  return (
    <PermissionContext.Provider value={permissions}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissions = () => useContext(PermissionContext);
