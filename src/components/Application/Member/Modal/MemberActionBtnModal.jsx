import {  CircleUser, Cog, ListChecks,  } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function MemberActionBtnModal({onClick}) {
  return (
    <div className="dropdown">
      <button
          className="w-32-px h-32-px me-8  bg-primary-light text-primary-600  bg-hover-primary-200 rounded-circle d-inline-flex align-items-center justify-content-center"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={onClick}
      >
        <Cog  size={18}/>
      </button>
      <ul className="dropdown-menu">
        <li>
          <Link
            className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 "
            
              to="/action-view-profile"
          >
            <CircleUser className="mx-8 px-2"  />
            Profile
          </Link>
        </li>
        <li>
          <Link
            className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
            to="/user-permission"
          >
        <ListChecks className="mx-8 px-2"/>
            Permission
          </Link>
        </li>
      
      
      </ul>
    </div>
  );
}



export default MemberActionBtnModal

