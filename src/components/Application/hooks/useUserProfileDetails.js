import { useState, useEffect, useCallback } from "react";

const useUserProfileDetails = () => {
  const API = `${import.meta.env.VITE_APP_API_KEY}/member/transaction`;
  const token = sessionStorage.getItem("token");

  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = useCallback(() => {
    const formData = new FormData();
    formData.append("type", "profile");

    setLoading(true);
    setError(null);

    fetch(API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statuscode === "TXN") {
          setUser(data.data);
        } else {
          setError("Unexpected response format.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [API, token]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return { user, loading, error, refetch: fetchUserData };
};

export default useUserProfileDetails;
