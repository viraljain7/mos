import { useState } from "react";
import { Modal } from "react-bootstrap";
import PgLayer from "../../Services/PgLayer";
import Step1PersonalInfo from "./steps/Step1PersonalInfo";
import Step2AdhaarInfo from "./steps/Step2AdhaarInfo";
import Step3PANCardInfo from "./steps/Step3PANCardInfo";
import Step4BankInfo from "./steps/Step4BankInfo";
import Step5VideoKYCInfo from "./steps/Step5VideoKycInfo";
// Step Components

const Step6Agreement = ({ nextStep, prevStep }) => (
  <>
    <PgLayer nextStep={nextStep} prevStep={prevStep} />
  </>
);
const Step7Completion = () => (
  <>
    <div className="text-center mb-40">
      <img
        src="assets/images/gif/success-img3.gif"
        alt=""
        className="gif-image mb-24"
      />
      <h6 className="text-md text-neutral-600">Congratulations </h6>
      <p className="text-neutral-400 text-sm mb-0">
        Well done! You have successfully completed.
      </p>
    </div>
  </>
);

const NewOnBoardModal = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [show, setShow] = useState(true);

  const nextStep = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onHide = () => setShow(false);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1PersonalInfo nextStep={nextStep} />;
      case 2:
        return <Step2AdhaarInfo nextStep={nextStep} />;
      case 3:
        return <Step3PANCardInfo nextStep={nextStep} />;
      case 4:
        return <Step4BankInfo nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <Step5VideoKYCInfo nextStep={nextStep} prevStep={prevStep} />;
      case 6:
        return <Step6Agreement nextStep={nextStep} prevStep={prevStep} />;
      case 7:
        return <Step7Completion prevStep={prevStep} onHide={onHide} />;
      default:
        return <Step1PersonalInfo nextStep={nextStep} />;
    }
  };

  return (
    <Modal
      size="lg"
      backdrop="static"
      show={show}
      onHide={onHide}
      contentClassName="h-100"
      backdropClassName="modal-backdrop-right"
    >
      <Modal.Header>
        <h6 className="mb-4 text-xl text-center w-100">KYC Verification</h6>
      </Modal.Header>
      <Modal.Body>
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="form-wizard">
                <form action="#" method="post">
                  <div className="form-wizard-header overflow-x-auto scroll-sm pb-8 my-32">
                    <ul className="list-unstyled form-wizard-list">
                      <li
                        className={`form-wizard-list__item ${
                          [2, 3, 4, 5, 6, 7].includes(currentStep) &&
                          "activated"
                        } ${currentStep === 1 && "active"} `}
                      >
                        <div className="form-wizard-list__line">
                          <span className="count">1</span>
                        </div>
                        <span className="text text-xs fw-semibold">
                          Contact Details
                        </span>
                      </li>
                      <li
                        className={`form-wizard-list__item ${
                          [3, 4, 5, 6, 7].includes(currentStep) && "activated"
                        } ${currentStep === 2 && "active"} `}
                      >
                        <div className="form-wizard-list__line">
                          <span className="count">2</span>
                        </div>
                        <span className="text text-xs fw-semibold">
                          Aadhaar Card
                        </span>
                      </li>
                      <li
                        className={`form-wizard-list__item ${
                          [4, 5, 6, 7].includes(currentStep) && "activated"
                        } ${currentStep === 3 && "active"} `}
                      >
                        <div className="form-wizard-list__line">
                          <span className="count">3</span>
                        </div>
                        <span className="text text-xs fw-semibold">
                          PAN Card
                        </span>
                      </li>
                      <li
                        className={`form-wizard-list__item ${
                          [5, 6, 7].includes(currentStep) && "activated"
                        } ${currentStep === 4 && "active"} `}
                      >
                        <div className="form-wizard-list__line">
                          <span className="count">4</span>
                        </div>
                        <span className="text text-xs fw-semibold">
                          Bank Details
                        </span>
                      </li>
                      <li
                        className={`form-wizard-list__item ${
                          [6, 7].includes(currentStep) && "activated"
                        } ${currentStep === 5 && "active"} `}
                      >
                        <div className="form-wizard-list__line">
                          <span className="count">5</span>
                        </div>
                        <span className="text text-xs fw-semibold">
                          Video Kyc
                        </span>
                      </li>
                      <li
                        className={`form-wizard-list__item ${
                          [7].includes(currentStep) && "activated"
                        } ${currentStep === 6 && "active"} `}
                      >
                        <div className="form-wizard-list__line">
                          <span className="count">6</span>
                        </div>
                        <span className="text text-xs fw-semibold">
                          Agreement
                        </span>
                      </li>
                      <li
                        className={`form-wizard-list__item ${
                          currentStep === 7 && "active"
                        } `}
                      >
                        <div className="form-wizard-list__line">
                          <span className="count">7</span>
                        </div>
                        <span className="text text-xs fw-semibold">
                          Completed
                        </span>
                      </li>
                    </ul>
                  </div>
                  <fieldset className={`wizard-fieldset ${"show"}`}>
                    {renderStep()}
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NewOnBoardModal;
