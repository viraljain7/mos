import { toast } from "react-toastify";

const useLogoutAndHomeRedirect = async () => {
  const token = sessionStorage.getItem("token");
  const API = `${import.meta.env.VITE_APP_API_KEY}/auth/logout`;

  if (!import.meta.env.VITE_APP_API_KEY) {
    console.error("API key is missing from environment variables.");
    return;
  }

  try {
    const response = await fetch(API, {
      method: "GET",
      headers: {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const responseData = await response.json();

      if (responseData.statuscode === "TXN") {
        toast.success(responseData.message);
        // Clear local storage
        sessionStorage.removeItem("token");
        window.location.href = "/";

        
      } else {
        console.error("Logout failed:", responseData.message);
      }
    } else {
      console.error("Failed to log out. Please try again.");
    }
  } catch (error) {
    console.error("An error occurred during logout:", error.message || error);
  }
};

export default useLogoutAndHomeRedirect;


