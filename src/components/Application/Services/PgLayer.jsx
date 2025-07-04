import { useState, useMemo } from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import useUserProfileDetails from "../hooks/useUserProfileDetails";

const PgLayer = ({ onComplete }) => {
  const {user:userInfo}=useUserProfileDetails()
  // console.log(userInfo)
  const [currentStep, setCurrentStep] = useState(1);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [shopPhoto, setShopPhoto] = useState(null);
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(30);


   // Determine agreement type based on user.role.name
   const getAgreementConfig = (roleName) => {
    const normalizedRole = roleName?.toLowerCase() || 'agent';
    
    if (normalizedRole.includes('master')) {
      return {
        title: "Transact360 Master Distributor Agreement",
        intro: "Master Distributor Agreement",
        role: "Master Distributor",
        legalClause: "(which expression shall, unless repugnant to the context or meaning thereof, mean and include its successors, legal representatives, and permitted assigns)"
      };
    }
    
    if (normalizedRole.includes('distributor')) {
      return {
        title: "Transact360 Distributor Agreement",
        intro: "Distributor Agreement",
        role: "Distributor",
        legalClause: ""
      };
    }
    
    // Default to Agent agreement
    return {
      title: "Transact360 Agent Agreement",
      intro: "Agent Agreement",
      role: "Agent",
      legalClause: ""
    };
  };

  const agreementConfig = useMemo(() => 
    getAgreementConfig(userInfo?.role?.name), 
    [userInfo?.role?.name]
  );

  // Memoize user details to prevent unnecessary re-renders
  const userDetails = useMemo(() => ({

    date: new Date().toLocaleDateString('en-GB',{
      day: 'numeric',    // 19
      month: 'long',     // June
      year: 'numeric'    // 2023
    }), // Format: DD/MM/YYYY

    place: userInfo?.address || "Not specified",
    fullName: userInfo?.name || "Not specified",
    mobileNumber: userInfo?.mobile || "Not specified",
  }), [userInfo]); // Add userInfo as dependency



  // Memoize PDF styles
  const styles = useMemo(() => StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: "Helvetica",
      fontSize: 11,
      lineHeight: 1.5,
    },
    title: {
      fontSize: 14,
      marginBottom: 20,
      textAlign: "center",
      fontWeight: "bold",
      textDecoration: "underline",
    },
    clause: {
      marginBottom: 10,
      textAlign: "justify",
    },
    clauseNumber: {
      fontWeight: "normal",
    },
    userDetails: {
      marginTop: 30,
      borderTop: "1px solid #000",
      paddingTop: 20,
    },
    signatureLine: {
      marginTop: 40,
      borderTop: "1px solid #000",
      width: 200,
      textAlign: "center",
      paddingTop: 5,
      marginLeft: "auto",
    },
    footer: {
      marginTop: 30,
      fontSize: 10,
      textAlign: "center",
    },
  }), []);

  const agreementClauses = useMemo(() => [
    "1. I hereby undertake to use Payment Gateway services with my \"user ID\" only after agreeing to the online agreement on Transact360 portal and give my acceptance to use Payment gateway services to load \"Transact360 Balance\".",
    "2. I hereby declare that I will use my own Credit Card/Debit Card/Net banking/UPI only to top up my \"Transact360 Balance\" and will not use anyone else's without their consent. I undertake that all Credit/Debit Card and net banking transactions made by me are genuine.",
    "3. I also declare that in case I fail to do so (point 2), Transact360 shall not be held liable and that the entire liability rests on me. In case of any chargeback or fraud transaction claim, I acknowledge the right of Transact360 to recover that amount from my \"Transact360 Balance\" or I shall payback to Transact360 via account transfer or cheque.",
    "4. If Transact360 is intimated, by a Facility Provider about an unauthorised debit of any Payment Instrument (\"Fraudulent Transaction\" or \"Suspicious Activities\"), then Transact360 shall be entitled to suspend the settlement and/or hold amount associated with the Fraudulent Transaction/Suspicious Activities during the pendency of inquiries, investigations, and resolution thereof by the Facility Providers.",
    "5. If the amount in respect of the Fraudulent Transaction/Suspicious Activity has already been settled by Transact360, pursuant to the terms any dispute arising in relation to the said Fraudulent Transaction/Suspicious Activities, following settlement, shall get resolved in accordance with the RBI's notification, other notifications, circulars, and guidelines issued by the RBI/Visa/MasterCard or Banks in this regard from time to time.",
    "6. I hereby agree that I will use Transact360 online card payments/net banking/POS for legal product or services approved at the time of registration, I will not use the Service for any unlawful or fraudulent activity. If Transact360 has reason to believe that I am engaging in or have engaged in fraudulent, unlawful, or improper activity, including without limitation any violation of any terms and conditions mentioned herein, Transact360 reserves the right to suspend and terminate the services immediately.",
    "7. If I use or attempt to use the Service for purposes other for which it is expressly designed, including but not limited to tampering, hacking, modifying or otherwise corrupting the security or functionality of Service, my user id/account will be terminated and will be subject to damages and other penalties, including criminal prosecution where and if applicable.",
    "8. I hereby agree that Transact360 is not responsible for or liable for any claim, action, demand, loss, cost, or damages (including legal fees) made or incurred arising out of or relating to use of the Service.",
    "9. Transact360 has the right to perform both telephonic and physical address verification of the outlet and ID verification before opening the PG services.",
    "10. Transact360 also reserves the right to deny the use of PG services to any agent/Distributor/Super Distributor.",
    "11. I agree that Transact360 denying the use of the PG will not result in any deficiency of service and I will not take any action against Transact360 for doing so.",
    "12. I hereby declare that I do not have any Criminal record.",
    "13. I confirm that the information(s) & particulars supplied by me are correct in all respects.",
    "14. I hereby declare that this declaration is being given out of free will and volition and under no duress/coercion/undue influence. The declaration is being given voluntarily and knowingly.",
    "15. I hereby agree to indemnify and hold Transact360, its affiliates, officers, directors, and employees harmless from any claim, action, demand, loss, cost, or damages (including legal fees) made or incurred arising out of or relating to use of the Service."
  ], []);

  // Memoize the PDF component
const RiskUndertakingPDF = useMemo(() => () => (
  <Document>
  <Page size="A4" style={styles.page}>
    <Text style={styles.title}>{agreementConfig.title}</Text>
    
    <Text style={styles.clause}>
      <Text style={styles.boldText}>This {agreementConfig.intro} ("Agreement")</Text> is made on this {userDetails.date} by and between:
    </Text>
    
    <Text style={styles.clause}>
      <Text style={styles.boldText}>Transact 360 Solutions Pvt. Ltd.</Text>, a company incorporated under the Companies Act, 2013, 
      having its registered office at {userDetails.place}, hereinafter referred to as the "Company".
    </Text>
    
    <Text style={styles.clause}>
      <Text style={styles.boldText}>AND</Text>
    </Text>
    
    <Text style={styles.clause}>
      <Text style={styles.boldText}>{userDetails.fullName}</Text>, residing at/with office at {userDetails.place}, hereinafter referred to as 
      the "{agreementConfig.role}" {agreementConfig.legalClause}.
    </Text>


      {agreementClauses.map((clause, index) => (
        <View key={index} style={styles.clause}>
          <Text>{clause}</Text>
        </View>
      ))}

      <View style={styles.userDetails}>
        <Text>Date: {userDetails.date}</Text>
        <Text>Place: {userDetails.place}</Text>
        <Text>Signature Name: {userDetails.fullName}</Text>
        <Text>Mobile Number: {userDetails.mobileNumber} (Registered Mobile Number)</Text>
      </View>
      
      <View style={styles.footer}>
        <Text>This is a system generated document. No physical signature required.</Text>
      </View>
    </Page>
  </Document>), [styles, agreementClauses, userDetails, agreementConfig]);

  const handleShopPhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setShopPhoto(URL.createObjectURL(file));
    }
  };

  const handleSendOTP = () => {
    setOtpSent(true);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      onComplete();
    }
  };

  const handleResendOTP = () => {
    setCountdown(30);
    handleSendOTP();
  };

  // Step 1: Agreement
  // Step 1: Agreement (dynamically rendered based on user role)
  if (currentStep === 1) {
    return (
      <div className="container py-4">
        <div className="card">
          <div className="card-header text-white">
            <h6>{agreementConfig.title}</h6>
          </div>
          <div className="card-body">
            <div className="terms-container border p-3" style={{ height: "400px", overflowY: "auto" }}>
              <h6 className="text-center mb-3">{agreementConfig.title}</h6>
              
              <p><strong>This {agreementConfig.intro} ("Agreement")</strong> is made on this {userDetails.date} by and between:</p>
              
              <p><strong>Transact 360 Solutions Pvt. Ltd.</strong>, a company incorporated under the Companies Act, 2013, 
              having its registered office at {userDetails.place}, hereinafter referred to as the "Company".</p>
              
              <p><strong>AND</strong></p>
              
              <p><strong>{userDetails.fullName}</strong>, residing at/with office at {userDetails.place}, hereinafter referred to as 
              the "{agreementConfig.role}" {agreementConfig.legalClause}.</p>
              
              {agreementClauses.map((clause, index) => (
                <p key={index}>{clause}</p>
              ))}

              <div className="mt-4 pt-3 border-top">
                <p>Date: {userDetails.date}</p>
                <p>Place: {userDetails.place}</p>
                <p>Signature Name: {userDetails.fullName}</p>
                <p>Mobile Number: {userDetails.mobileNumber}</p>
              </div>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="acceptTerms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                required
              />
              <label className="form-check-label" htmlFor="acceptTerms">
                I agree to all terms and conditions
              </label>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <PDFDownloadLink
                document={<RiskUndertakingPDF />}
                fileName={`${agreementConfig.title.replace(/\s+/g, '_')}_${userDetails.fullName}.pdf`}
                className="btn btn-outline-primary"
                disabled={!acceptedTerms}
              >
                Download Agreement
              </PDFDownloadLink>

              <button
                className="btn btn-primary"
                disabled={!acceptedTerms}
                onClick={() => setCurrentStep(2)}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Shop Photo
  if (currentStep === 2) {
    return (
      <div className="container py-4">
        <div className="card">
          <div className="card-header text-white">
            <h6>Shop Verification</h6>
          </div>
          <div className="card-body">
            <div className="mb-4">
              <h6>Upload Shop Photo with Company Representative</h6>
              <li className="text-muted mb-3">
                Company representative (Employee/Stroke FL/Stroke Master
                Distributor/Stroke Distributor)
              </li>

              <div className="upload-area border rounded p-4 text-center mb-3">
                {shopPhoto ? (
                  <div>
                    <img
                      src={shopPhoto}
                      alt="Shop"
                      className="img-thumbnail mb-2"
                      style={{ maxHeight: "200px" }}
                    />
                    <hr />
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => setShopPhoto(null)}
                    >
                      Remove Photo
                    </button>
                  </div>
                ) : (
                  <>
                    <i className="bi bi-cloud-arrow-up fs-1 text-muted"></i>
                    <p className="text-muted">Click to upload shop photo</p>
                    <input
                      type="file"
                      id="shopPhoto"
                      accept="image/*"
                      onChange={handleShopPhotoUpload}
                      className="d-none"
                    />
                    <label
                      htmlFor="shopPhoto"
                      className="btn btn-outline-primary mt-2"
                    >
                      Select Photo
                    </label>
                  </>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-end gap-3 mt-4">
              <button
                className="btn btn-secondary px-3"
                onClick={() => setCurrentStep(1)}
              >
                Back
              </button>

              <button
                className="btn btn-primary"
                disabled={!shopPhoto}
                onClick={() => setCurrentStep(3)}
              >
                Continue to Verification
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Aadhaar Verification
  if (currentStep === 3) {
    return (
      <div className="container py-4">
        <div className="card">
          <div className="card-header text-white">
            <h6>Aadhaar Verification</h6>
          </div>
          <div className="card-body">
            <div className="mb-4">
              <label className="form-label">Aadhaar Number</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter 12-digit Aadhaar number"
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(e.target.value)}
                  maxLength="12"
                  disabled={otpSent}
                />
                {!otpSent && (
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleSendOTP}
                    disabled={aadhaarNumber.length !== 12}
                  >
                    Send OTP
                  </button>
                )}
              </div>

              {otpSent && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Enter OTP</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength="6"
                    />
                    {countdown > 0 ? (
                      <small className="text-muted">
                        OTP valid for {countdown} seconds
                      </small>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-link p-0"
                        onClick={handleResendOTP}
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>

                  <button
                    className="btn btn-primary w-100"
                    onClick={handleVerifyOTP}
                    disabled={otp.length !== 6}
                  >
                    Verify OTP
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PgLayer;