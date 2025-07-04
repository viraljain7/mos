import { toast } from "react-toastify";

const logoutHandler = async () => {
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
        toast.dismiss();
        toast.success(responseData.message || "logout successful", {
          toastId: "logout-success", // Unique ID
        });
        // Clear local storage
        sessionStorage.removeItem("token");

        // Redirect to login or home page
        // setTimeout(() => {
        //    window.location.href = "/";
        // }, 1000); // Delay navigation by 1 second
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

export default logoutHandler;
