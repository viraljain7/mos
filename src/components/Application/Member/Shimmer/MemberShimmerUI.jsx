import React from "react";
import "../css/MemberShimmerUi.css";

const MemberShimmerUi = () => {
  const shimmerRows = Array(5).fill(null);

  return (
    <>
      {shimmerRows.map((_, index) => (
        <tr key={index} className="animate-pulse">
          {/* Switch column */}
          <td className="py-3">
            <div className="d-flex align-items-center gap-3">
              <div className="h-6 w-12 bg-gray-200 rounded-full"></div>
            </div>
          </td>

          {/* Name column with link */}
          <td className="py-3">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </td>

          {/* Parent column */}
          <td className="py-3">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </td>

          {/* Mobile number column */}
          <td className="py-3">
            <div className="d-flex align-items-center">
              <div className="h-5 w-28 bg-gray-200 rounded"></div>
            </div>
          </td>

          {/* Role pill column */}
          <td className="py-3">
            <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
          </td>

          {/* Action button column */}
          <td className="py-3">
            <div className="h-8 w-20 bg-gray-200 rounded"></div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default MemberShimmerUi;
