import "../css/ApiManagerLayer.css";

const ShimmerUI = () =>
  Array(5)
    .fill("")
    .map((_, index) => (
      <tr key={index} className="animate-pulse">
        {/* ID column */}
        <td className="py-3">
          <div className="h-4 w-8  rounded  "></div>
        </td>

        {/* Name column with link */}
        <td className="py-3">
          <div className="h-4 w-32  rounded"></div>
        </td>

        {/* Product column */}
        <td className="py-3">
          <div className="h-4 w-40  rounded"></div>
        </td>

        {/* URL column with pill */}
        <td className="py-3">
          <div className="h-8 w-32  rounded-full"></div>
        </td>

        {/* Credential column */}
        <td className="py-3">
          <div className="h-4 w-20  rounded"></div>
        </td>

        {/* Switch column */}
        <td className="py-3">
          <div className="d-flex align-items-center gap-3">
            <div className="h-6 w-12  rounded-full"></div>
          </div>
        </td>

        {/* Edit button column */}
        <td className="py-3">
          <div className="h-8 w-16  rounded"></div>
        </td>
      </tr>
    ));

export default ShimmerUI;
