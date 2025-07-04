import React, { useState, useEffect } from 'react';
import { toast, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditSchemeModal({ scheme, userID }) {
  useEffect(() => {
    return () => toast.dismiss();
  }, []);
  const [schemeList, setSchemeList] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState(scheme?.id || '');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const API = `${import.meta.env.VITE_APP_API_KEY}/master/scheme`;
  const transactionAPI = `${import.meta.env.VITE_APP_API_KEY}/member/transaction`;
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    fetchSchemeList();
  }, []);

  const fetchSchemeList = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('type', 'list');

      const response = await fetch(API, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok && data.statuscode === "TXN") {
        setSchemeList(data.data || []);
      } else {
        throw new Error(data.message || "Failed to fetch schemes");
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 5000,
      
      });
      console.error("Error fetching schemes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSchemeChange = (e) => {
    setSelectedScheme(e.target.value);
  };

  const handleChangeScheme = async (e) => {
    e.preventDefault();
    
    if (!selectedScheme) {
      toast.error("Please select a scheme", {
        autoClose: 5000,
      
      });
      return;
    }

    if (selectedScheme === scheme?.id) {
      toast.info("No changes made to scheme", {
        autoClose: 5000,
      
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('type', 'scheme');
      formData.append('scheme_id', selectedScheme);
      formData.append('user_id', userID);

      const response = await fetch(transactionAPI, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok && data.statuscode === "TXN") {
        toast.success(data.message || "Scheme changed successfully", {
          autoClose: 5000,
        
        });
      } else {
        throw new Error(data.message || "Failed to change scheme");
      }
    } catch (error) {
      toast.error(error.message, {
        autoClose: 5000,
      
      });
      console.error("Error changing scheme:", error);
      setSelectedScheme(scheme?.id || '');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="tab-pane fade"
      id="pills-scheme"
      role="tabpanel"
      aria-labelledby="pills-scheme-tab"
      tabIndex={0}
    >
      <form onSubmit={handleChangeScheme}>
      {/* {!isSubmitting &&
      <ToastContainer />
      } */}
        <div className="row">
          <div className="col-sm-12">
            <div className="mb-20">
              <label
                htmlFor="schemeType"
                className="form-label fw-semibold text-primary-light text-sm mb-8"
              >
                Scheme Type <span className="text-danger-600">*</span>
              </label>
              <select
                className="form-control radius-8 form-select"
                id="schemeType"
                value={selectedScheme}
                onChange={handleSchemeChange}
                disabled={isLoading}
                required
              >
                <option value="">
                  {scheme?.name || "Select a scheme"} (current)
                </option>
                {schemeList.map((schemeItem) => (
                  <option key={schemeItem.id} value={schemeItem.id}>
                    {schemeItem.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-start gap-3">
          <button
            type="submit"
            className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
            disabled={isLoading || isSubmitting || !selectedScheme }
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditSchemeModal;