import React from "react";

function UpiLayer() {
  return (
    <div class="row">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <h6 className="card-title mb-0">Upi Collection</h6>
          </div>
          <div className="card-body">
            <p>
              Make secure and instant payments using Mobile Number by scanning
              the QR code.
            </p>
            <p className="text-danger-500 fw-semibold">
              Make sure you pay to the QR from the given Mobile Number only.
            </p>
            <div className="row gy-3">
              <div className="col-12">
                <label className="form-label">Mobile Number</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control flex-grow-1"
                    placeholder="Enter Mobile Number"
                  />
                  <span className="input-group-text bg-primary overflow-hidden text-white border border-primary-600 text-md px-56 py-4 radius-8 cursor-pointer">
                    Verify
                  </span>
                </div>
              </div>
              <div className="col-12">
                <label className="form-label">Amount</label>
                <input
                  type="text"
                  name="#0"
                  className="form-control"
                  placeholder="₹ 0.00"
                />
              </div>
            </div>
          </div>

          {/* <!-- Action Buttons --> */}
          <div class="card-footer">
            <div className="d-flex align-items-center justify-content-start  mb-8 ms-8">
              <button
                type="button"
                className="btn btn-primary border border-primary-600 text-md px-56 py-12 radius-8"
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- QR Code Section --> */}
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <h6 className="card-title mb-0">QR Code</h6>
          </div>
          <div className="card-body w-full d-flex flex-column align-items-center justify-content-center">
            <img
              src="assets/images/chatgpt/image-generator1.png"
              alt="image_icon"
              className="img-fluid"
            />
            <p className="text-success-500 fw-semibold mt-4">
              Scan the QR code to make payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpiLayer;
