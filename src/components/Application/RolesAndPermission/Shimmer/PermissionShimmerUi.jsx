import React from 'react'

const  PermissionShimmerUi=()=>  Array(5)
.fill(0)
.map((_, index) => (
  <tr key={index} className="animate-pulse">
    {/* ID column */}
    <td className="py-3">
      <div className="h-4 w-8 bg-gray-200 rounded"></div>
    </td>

    {/* Name column with link */}
    <td className="py-3">
      <div className="h-4 w-32 bg-gray-200 rounded"></div>
    </td>

    {/* Type column */}
    <td className="py-3">
      <div className="h-4 w-24 bg-gray-200 rounded"></div>
    </td>

    {/* Image column */}
    <td className="py-3">
      <div className="img-w img-h bg-gray-200 rounded-full me-12"></div>
    </td>

    {/* Action column */}
    <td className="py-3">
      <div className="d-flex gap-2">
        <div className="h-8 w-20 bg-gray-200 rounded"></div>
      </div>
    </td>
  </tr>
));

export default PermissionShimmerUi
