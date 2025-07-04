function TxnReportShimmerUI() {
  return Array(4)
    .fill()
    .map((_, index) => (
      <tr key={index} className="border-b border-gray-200">
        <td className="p-3">
          <div className="h-5 w-16 rounded shimmer"></div>
          <div className="h-4 w-24 rounded shimmer mt-2"></div>
        </td>
        <td className="p-3">
          <div className="h-5 w-32 rounded shimmer"></div>
          <div className="h-6 w-20 rounded shimmer mt-2"></div>
        </td>
        <td className="p-3">
          <div className="h-5 w-40 rounded shimmer"></div>
          <div className="h-5 w-32 rounded shimmer mt-2"></div>
        </td>
        <td className="p-3">
          <div className="h-5 w-32 rounded shimmer"></div>
          <div className="h-5 w-40 rounded shimmer mt-2"></div>
          <div className="h-5 w-32 rounded shimmer mt-2"></div>
          <div className="h-5 w-32 rounded shimmer mt-2"></div>
        </td>
        <td className="p-3">
          <div className="h-5 w-20 rounded shimmer"></div>
        </td>
        <td className="p-3">
          <div className="h-8 w-8 rounded shimmer"></div>
        </td>
      </tr>
    ));
}

export default TxnReportShimmerUI;
