import React from 'react'

function PersonalInfoLayer({user}) {
  return (
    <div className="user-grid-card position-relative border radius-16 overflow-hidden bg-base h-100">
    <img
      src="assets/images/user-grid/user-grid-bg1.png"
      alt=""
      className="w-100 object-fit-cover"
    />
    <div className="pb-24 ms-16 mb-24 me-16  mt--100">
      <div className="text-center border border-top-0 border-start-0 border-end-0">
        <img
          src="assets/images/user-grid/user-grid-img14.png"
          alt=""
          className="border br-white border-width-2-px w-200-px h-200-px rounded-circle object-fit-cover"
        />
        <h6 className="mb-0 mt-16">{user.name}</h6>
        <span className="text-secondary-light mb-16">{user.email}</span>
      </div>
      <div className="mt-24">
        <h6 className="text-xl mb-16">Personal Info</h6>
        <ul>
          <li className="d-flex align-items-center gap-1 mb-12">
            <span className="w-25 text-md fw-semibold text-primary-light">
              Full Name
            </span>
            <span className="w-75 text-secondary-light fw-medium">
              : {user.name}
            </span>
          </li>
          <li className="d-flex align-items-center gap-1 mb-12">
            <span className="w-25 text-md fw-semibold text-primary-light">
              {" "}
              Email
            </span>
            <span className="w-75 text-secondary-light fw-medium">
              : {user.email}
            </span>
          </li>
          <li className="d-flex align-items-center gap-1 mb-12">
            <span className="w-25 text-md fw-semibold text-primary-light">
              {" "}
              Phone Number
            </span>
            <span className="w-75 text-secondary-light fw-medium">
              : (+91) {user.mobile}
            </span>
          </li>
          <li className="d-flex align-items-center gap-1 mb-12">
            <span className="w-25 text-md fw-semibold text-primary-light">
              {" "}
              DOB
            </span>
            <span className="w-75 text-secondary-light fw-medium">
              : {user.dob}
            </span>
          </li>
          <li className="d-flex align-items-center gap-1 mb-12">
            <span className="w-25 text-md fw-semibold text-primary-light">
              {" "}
              Address
            </span>
            <span className="w-75 text-secondary-light fw-medium">
              : {user.address}
            </span>
          </li>
          <li className="d-flex align-items-center gap-1 mb-12">
            <span className="w-25 text-md fw-semibold text-primary-light">
              {" "}
              State
            </span>
            <span className="w-75 text-secondary-light fw-medium">
              : {user.state}
            </span>
          </li>
          <li className="d-flex align-items-center gap-1">
            <span className="w-25 text-md fw-semibold text-primary-light">
              {" "}
              City
            </span>
            <span className="w-75 text-secondary-light fw-medium">
              : {user.city}
            </span>
          </li>
          <li className="d-flex align-items-center gap-1 my-8">
            <span className="w-25 text-md fw-semibold text-primary-light">
              {" "}
              Pincode
            </span>
            <span className="w-75 text-secondary-light fw-medium">
              : {user.pincode}
            </span>
          </li>

          <li className="d-flex align-items-center gap-1 my-8">
            <span className="w-25 text-md fw-semibold text-primary-light">
              {" "}
              Shop
            </span>
            <span className="w-75 text-secondary-light fw-medium">
              : {user.shopname}
            </span>
          </li>
          <li className="d-flex align-items-center gap-1 my-8">
            <span className="w-25 text-md fw-semibold text-primary-light">
              {" "}
              Aadhar
            </span>
            <span className="w-75 text-secondary-light fw-medium">
              : {user.aadharcard}
            </span>
          </li>
          <li className="d-flex align-items-center gap-1 my-8">
            <span className="w-25 text-md fw-semibold text-primary-light">
              {" "}
              PAN
            </span>
            <span className="w-75 text-secondary-light fw-medium">
              : {user.pancard}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default PersonalInfoLayer

