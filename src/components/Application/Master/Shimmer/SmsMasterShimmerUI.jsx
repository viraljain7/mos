import "../css/SmsMasterLayer.css";
const ShimmerUI = () =>
  Array(5)
    .fill(0)
    .map((_, index) => (
      <tr key={index} className="animate-pulse ">
        {/* ID column */}
        <td className="py-3">
          <div className="h-4 w-8 bg-gray-200 rounded"></div>
        </td>

        {/* Name column with link */}
        <td className="py-3">
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </td>

        {/* URL column */}
        <td className="py-3">
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
        </td>

        {/* Content column */}
        <td className="py-3">
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </td>

        {/* Actions column */}
        <td className="py-3">
          <div className="d-flex gap-2">
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
          </div>
        </td>
      </tr>
    ));
export default ShimmerUI;
