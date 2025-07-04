import { AlertCircle, CheckCircle, Menu, Printer } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function ActionBtnModal() {
  return (
    <div className="dropdown">
      <button
        className="btn px-18 py-11 text-primary-light"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <Menu />
      </button>
      <ul className="dropdown-menu">
        <li>
          <Link
            className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 "
            to="#"
          >
            <CheckCircle className="mx-8 px-2" />
            Check Status
          </Link>
        </li>
        <li>
          <Link
            className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
            to="#"
          >
            <Printer className="mx-8 px-2" />
            Print Invoice
          </Link>
        </li>
        <li>
          <Link
            className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900"
            to="#"
          >
            <AlertCircle className="mx-8 px-2" />
            Complaint
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ActionBtnModal;
