import { Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function DeleteSliderModal({ id }) {
  const API = `${import.meta.env.VITE_APP_API_KEY}/master/slider`;
  const token = sessionStorage.getItem("token");

  const deleteSlider = async (id) => {
    if (!window.confirm("Are you sure you want to delete this slider?")) return;

    const formData = new FormData();
    formData.append("type", "delete");
    formData.append("slider_id", id);
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token here
          // Do not add 'Content-Type' when sending FormData; it will be set automatically
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "TXN") {
        toast.success(data.message);
        // fetchSchemeData(); // Refetch data
      } else {
        toast.error(data.message || "Unexpected response");
      }
    } catch (error) {
      toast.error(`Error while deleting slider: ${error.message}`);
    }
  };

  return (
    <Link
      to="#"
      className="w-32-px h-32-px me-8 bg-danger-focus text-danger-main rounded-circle d-inline-flex align-items-center justify-content-center"
      onClick={() => {
        deleteSlider(id);
      }}
    >
      <Trash2 className="p-4" size={30} />
    </Link>
  );
}

export default DeleteSliderModal;
