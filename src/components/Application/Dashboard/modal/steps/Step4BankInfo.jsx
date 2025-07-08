const Step4BankInfo = ({ nextStep, prevStep }) => (
  <>
    <h6 className="text-md text-neutral-500">Bank Information</h6>
    <div className="row gy-3">
      <div className="col-sm-6">
        <label className="form-label">Account Type*</label>
        <div className="position-relative">
          <select className="form-control wizard-required" required>
            <option value="">Select Account Type</option>
            <option value="savings">Savings Account</option>
            <option value="current">Current Account</option>
            <option value="salary">Salary Account</option>
            <option value="nri">NRI Account</option>
          </select>
          <div className="wizard-form-error" />
        </div>
      </div>
      <div className="col-sm-6">
        <label className="form-label">Bank A/c No.*</label>
        <div className="position-relative">
          <input
            type="text"
            className="form-control wizard-required"
            placeholder="Enter Bank Account Number"
            required=""
          />
          <div className="wizard-form-error" />
        </div>
      </div>
      <div className="col-sm-6">
        <label className="form-label">Bank Name*</label>
        <div className="position-relative">
          <input
            type="text"
            className="form-control wizard-required"
            placeholder="Enter Bank Name"
            required=""
          />
          <div className="wizard-form-error" />
        </div>
      </div>
      <div className="col-sm-6">
        <label className="form-label">Branch Name*</label>
        <div className="position-relative">
          <input
            type="text"
            className="form-control wizard-required"
            placeholder="Enter Branch Name"
            required=""
          />
          <div className="wizard-form-error" />
        </div>
      </div>
      <div className="col-sm-6">
        <label className="form-label">IFSC Code*</label>
        <div className="position-relative">
          <input
            type="text"
            className="form-control wizard-required"
            placeholder="Enter IFSC Code"
            required=""
          />
          <div className="wizard-form-error" />
        </div>
      </div>
      <div className="col-sm-6">
        <label className="form-label">A/c Holder Name*</label>
        <div className="position-relative">
          <input
            type="text"
            className="form-control wizard-required"
            placeholder="Enter Account Holder Name"
            required=""
          />
          <div className="wizard-form-error" />
        </div>
      </div>
      <div className="form-group d-flex align-items-center justify-content-end gap-8">
        <button
          onClick={prevStep}
          type="button"
          className="form-wizard-previous-btn btn btn-neutral-500 border-neutral-100 px-32"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          type="button"
          className="form-wizard-next-btn btn btn-primary-600 px-32"
        >
          Verify Bank Details
        </button>
      </div>
    </div>
  </>
);
export default Step4BankInfo;
