import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import "flatpickr/dist/flatpickr.min.css";
import "react-toastify/dist/ReactToastify.css";
import { DollarSign, CircleX } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CommissionModalData({ onClick }) {
  //fix the issue of scheme_id
  const [data, setData] = useState([]);

  const token = sessionStorage.getItem("token");
  const API = `${import.meta.env.VITE_APP_API_KEY}/master/scheme`;

  const fetchApiTypes = useCallback(async () => {
    if (!API) {
      toast.error("API key is not configured properly.");
      return;
    }

    try {
      const payload = new FormData();
      payload.append("type", "products");

      const response = await fetch(API, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: payload,
      });

      if (response.ok) {
        const { statuscode, message, data } = await response.json();
        if (statuscode === "TXN") {
          setData(data || []);
          // setClose("")
        } else toast.error(message || "Failed to fetch API types.");
      } else {
        toast.error("Server error while fetching API types.");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  }, [API, token]);
  useEffect(() => {
    if (API) fetchApiTypes();
  }, [API, fetchApiTypes]);

  // most important part of the code
  const navigate = useNavigate();
  const redirectHandler = (data, scheme_id) => {

    const bodyEL = document.querySelector(".modal-open");

    const path = `/scheme-manager/${data.toLowerCase()}`;
    navigate(path);

    document.querySelector('[data-bs-dismiss="modal"]').click();
    if (bodyEL) {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    const backdrop = document.querySelector(".modal-backdrop.fade.show");
    if (backdrop) {
      backdrop.classList.remove("fade", "show", "modal-backdrop");
    }
  };

  // most important part of the code

  return (
    <>
      {/* <ToastContainer /> */}
      <button
        type="button"
        className="w-32-px h-32-px me-8 bg-warning-focus text-warning-main bg-hover-warning-200 rounded-circle d-inline-flex align-items-center justify-content-center"
        data-bs-toggle="modal"
        data-bs-target="#commissionModal"
      >
        <DollarSign size={18}  onClick={onClick} />
      </button>

      <div
        className="modal fade"
        id="commissionModal"
        tabIndex={-1}
        aria-labelledby="commissionModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content radius-16 bg-base">
            <div className="modal-body p-16">
              <form>
                <div className="d-flex justify-content-end gap-3">
                  <button type="button" className="" data-bs-dismiss={"modal"}>
                    <CircleX size={24} color="red" />
                  </button>
                </div>
                <div className="m-24 row g-4">
                  {data.map((data, id) => (
                    <div key={id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                      <div className="card p-3 shadow-none radius-8 border h-100 bg-gradient-end-1">
                        <div className="card-body p-0">
                          <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-8">
                            <div onClick={() => redirectHandler(data)}>
                              <div className="d-flex align-items-center gap-2">
                                <span className="mb-0 w-48-px h-48-px bg-primary-600 flex-shrink-0 text-white d-flex justify-content-center align-items-center rounded-circle h6 mb-0">
                                  <Icon
                                    icon={data.icon}
                                    className="icon"
                                    width="24"
                                    height="24"
                                  />
                                </span>
                                <div>
                                  <span className="mb-2 fw-medium text-secondary-light text-sm">
                                    {data}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommissionModalData;
