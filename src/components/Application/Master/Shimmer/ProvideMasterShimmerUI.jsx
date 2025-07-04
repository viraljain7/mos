import "../css/ProvideMasterLayer.css";

const ShimmerUI = () =>
  Array(5)
    .fill(0)
    .map((_, index) => (
      <tr key={index}>
        <td>
          <div className="shimmer shimmer-line"></div>
        </td>
        <td>
          <div className="shimmer shimmer-line"></div>
        </td>
        <td>
          <div className="shimmer shimmer-line"></div>
        </td>
        <td>
          <div className="shimmer shimmer-switch w-20"></div>
        </td>
        <td>
          <div className="shimmer shimmer-dropdown"></div>
        </td>
        <td>
          <div className="shimmer shimmer-btn"></div>
        </td>
      </tr>
    ));

export default ShimmerUI;
