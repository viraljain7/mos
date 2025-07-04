// import "../css/TransferReturnLayer.css";

const ShimmerUI = () =>
  Array(5)
    .fill("")
    .map((_, index) => (
      <tr key={index} className="">
        {/* # Column */}
        <td>
          <div className="h-4 bg-neutral-200 animate-pulse rounded mb-1 w-1/4"></div>
          <div className="h-4 bg-neutral-200 animate-pulse rounded mb-1 w-1/2"></div>
          <div className="h-4 bg-neutral-200 animate-pulse rounded w-1/3"></div>
        </td>

        {/* Name Column */}
        <td>
          <div className="h-6 bg-neutral-200 animate-pulse rounded w-3/4"></div>
        </td>

        {/* Parent Details Column */}
        <td>
          <div className="h-6 bg-neutral-200 animate-pulse rounded w-1/4"></div>
        </td>

        {/* Company Profile Column */}
        <td>
          <div className="h-8 bg-neutral-200 animate-pulse rounded-full w-16 mx-auto animate duration-900 ease-in-out transition-all"></div>
        </td>

        {/* Status Column */}
        <td>
          <div className="h-8 bg-neutral-200 animate-pulse rounded w-24 animate duration-900 ease-in-out transition-all"></div>
        </td>

        {/* Action Column */}
        <td>
          <div className="h-8 bg-neutral-200 animate-pulse rounded w-16 animate duration-900 ease-in-out transition-all"></div>
        </td>
      </tr>
    ));

export default ShimmerUI;
