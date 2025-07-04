import "../css/SchemeManagerLayer.css";

const ShimmerUI = () =>
  Array(5)
    .fill("")
    .map((_, index) => (
      <tr key={index}>
        <td>
          <div className="form-switch switch-primary d-flex align-items-center gap-3">
            <div className="shimmer-box w-8 h-4 rounded "></div>
          </div>
        </td>
        <td>
          <div className="shimmer-box  w-32 h-4 rounded"></div>
        </td>
        <td className="d-flex gap-2 justify-content-center">
          <div className="shimmer-box  w-32-px h-32-px rounded-circle"></div>
          <div className="shimmer-box  w-32-px h-32-px rounded-circle"></div>
        </td>
      </tr>
    ));

export default ShimmerUI;
