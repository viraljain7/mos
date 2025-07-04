import React, { useState } from 'react';
import { toast } from 'react-toastify';

function BankForm({ bankId }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    panno: '',
    mobile: '',
    bankid: bankId
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const API = `${import.meta.env.VITE_APP_API_KEY}/service/account-opening`;
  const token = sessionStorage.getItem("token");
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name) {
      toast.error('Please enter your name');
      return false;
    }
    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return false;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panno)) {
      toast.error('Please enter a valid PAN number ');
      return false;
    }
  
    return true;
  };

  const handleSubmit = async (e) => {
    toast.info('Please wait while we process your request...');
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const toastId = toast.loading('Processing your request...');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('type', 'transaction');
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('panno', formData.panno);
      formDataToSend.append('mobile', formData.mobile);
      formDataToSend.append('bankid', formData.bankid);
       const response = await fetch(API, {
      method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (data.statuscode === 'TXN') {
        toast.update(toastId, {
          render: data.message || 'Account opening request submitted successfully!',
          type: 'success',
          isLoading: false,
          autoClose: 5000
        });
        if (data.url && data.url[0]) {
          window.open(data.url[0], '_blank');
        }
        // Reset form or navigate to next step
        setFormData({
          name: '',
          email: '',
          panno: '',
          mobile: '',
          bankid: bankId
        });
      } else {
        throw new Error(data.message || 'Failed to submit request');
      }
    } catch (error) {
      toast.update(toastId, {
        render: error.message,
        type: 'error',
        isLoading: false,
        autoClose: 5000
      });
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="col-md-6">
      <div className="card">
        <div className="card-header">
          <h6 className="card-title mb-0">Account Details</h6>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="row gy-3">
              <div className="col-12">
                <label className="form-label">NAME</label>
                <input
                  type="text"
                  name="name"
                  className="form-control text-uppercase"
                  placeholder="ENTER NAME"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12">
                <label className="form-label">MOBILE</label>
                <input
                  type="tel"
                  name="mobile"
                  className="form-control"
                  placeholder="ENTER MOBILE NUMBER"
                  value={formData.mobile}
                  onChange={handleChange}
                  maxLength="10"
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label">EMAIL</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="ENTER EMAIL ID"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label">PAN NUMBER</label>
                <input
                  type="text"
                  name="panno"
                  className="form-control text-uppercase"
                  placeholder="ENTER PAN NUMBER"
                  value={formData.panno}
                  onChange={handleChange}
                  maxLength="10"
                  required
                />
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-center gap-3">
              <button
                type="submit"
                className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Next'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BankForm;


// import React, { useState } from 'react';
// import { toast } from 'react-toastify';

// function BankForm({ bankId }) {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     panno: '',
//     mobile: '',
//     bankid: bankId
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showIframe, setShowIframe] = useState(false);
//   const [iframeUrl, setIframeUrl] = useState('');
//   const API = `${import.meta.env.VITE_APP_API_KEY}/service/account-opening`;
//   const token = sessionStorage.getItem("token");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: name === 'panno' || name === 'name' ? value.toUpperCase() : value
//     }));
//   };

//   const validateForm = () => {
//     if (!formData.name.trim()) {
//       toast.error('Please enter your name');
//       return false;
//     }
//     if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
//       toast.error('Please enter a valid 10-digit mobile number');
//       return false;
//     }
//     if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
//       toast.error('Please enter a valid email address');
//       return false;
//     }
//     if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panno)) {
//       toast.error('Please enter a valid PAN number (e.g., ABCDE1234F)');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     const toastId = toast.loading('Processing your request...');

//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('type', 'transaction');
//       formDataToSend.append('name', formData.name);
//       formDataToSend.append('email', formData.email);
//       formDataToSend.append('panno', formData.panno);
//       formDataToSend.append('mobile', formData.mobile);
//       formDataToSend.append('bankid', formData.bankid);

//       const response = await fetch(API, {
//         method: "POST",
//         headers: {
//           'Authorization': `Bearer ${token}`
//                  },
//         body: formDataToSend
//       });

//       const data = await response.json();

//       if (data.statuscode === 'TXN') {
//         toast.update(toastId, {
//           render: data.message || 'Account opening request submitted successfully!',
//           type: 'success',
//           isLoading: false,
//           autoClose: 5000
//         });
        
//         if (data.url && data.url[0]) {
//           setIframeUrl(data.url[0]);
//           setShowIframe(true);
//         }
        
//         setFormData({
//           name: '',
//           email: '',
//           panno: '',
//           mobile: '',
//           bankid: bankId
//         });
//       } else {
//         throw new Error(data.message || 'Failed to submit request');
//       }
//     } catch (error) {
//       toast.update(toastId, {
//         render: error.message,
//         type: 'error',
//         isLoading: false,
//         autoClose: 5000
//       });
//       console.error('Submission error:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="col-md-6">
//       <div className="card">
//       {!showIframe ? (
// <>

//         <div className="card-header">
//           <h6 className="card-title mb-0">Account Details</h6>
//         </div>
        
//           <form onSubmit={handleSubmit}>
//             <div className="card-body">
//               <div className="row gy-3">
//                 <div className="col-12">
//                   <label className="form-label">NAME</label>
//                   <input
//                     type="text"
//                     name="name"
//                     className="form-control text-uppercase"
//                     placeholder="ENTER NAME"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="col-12">
//                   <label className="form-label">MOBILE</label>
//                   <input
//                     type="tel"
//                     name="mobile"
//                     className="form-control"
//                     placeholder="ENTER MOBILE NUMBER"
//                     value={formData.mobile}
//                     onChange={(e) => {
//                       const digitsOnly = e.target.value.replace(/\D/g, '');
//                       handleChange({
//                         target: {
//                           name: 'mobile',
//                           value: digitsOnly.slice(0, 10)
//                         }
//                       });
//                     }}
//                     maxLength="10"
//                     required
//                   />
//                 </div>
//                 <div className="col-12">
//                   <label className="form-label">EMAIL</label>
//                   <input
//                     type="email"
//                     name="email"
//                     className="form-control"
//                     placeholder="ENTER EMAIL ID"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="col-12">
//                   <label className="form-label">PAN NUMBER</label>
//                   <input
//                     type="text"
//                     name="panno"
//                     className="form-control text-uppercase"
//                     placeholder="ENTER PAN NUMBER (e.g., ABCDE1234F)"
//                     value={formData.panno}
//                     onChange={handleChange}
//                     maxLength="10"
//                     required
//                     pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
//                     title="Format: ABCDE1234F"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="card-body">
//               <div className="d-flex align-items-center justify-content-center gap-3">
//                 <button
//                   type="submit"
//                   className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? 'Processing...' : 'Next'}
//                 </button>
//               </div>
//             </div>
//           </form>
// </>

//         ) : (
//           <div className="card-body p-0" style={{ height: '500px'}}>
//             <iframe 
//               src={iframeUrl}
//               title="Bank Account Opening"
//               width="100%"
//               height="100%"
//               style={{ border: 'none' }}
//               sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
//             />
//             <button
//               onClick={() => setShowIframe(false)}
//               className="btn btn-secondary my-3"
//             >
//               Back to Form
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default BankForm;