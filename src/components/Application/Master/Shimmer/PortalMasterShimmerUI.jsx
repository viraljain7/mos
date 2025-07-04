import "../css/PortalMasterLayer.css";

const ShimmerUI = () =>
  Array(5)
    .fill(0)
    .map((_, index) => (
      <div className="col-xxl-4 col-sm-6" key={index}>
        <div className="card radius-12 animate-pulse">
          {/* Card Header */}
          <div className="card-header py-16 px-24 bg-base d-flex align-items-center gap-1 border border-end-0 border-start-0 border-top-0 justify-content-center">
            <div className="h-6 w-32 bg-gray-200 rounded"></div>
          </div>

          {/* Card Body */}
          <div className="card-body py-16 px-24">
            {/* Label shimmer */}
            <div className="d-flex justify-content-center mb-8">
              <div className="h-5 w-24 bg-gray-200 rounded"></div>
            </div>

            {/* Input field shimmer */}
            <div className="h-10 bg-gray-200 radius-8"></div>
          </div>

          {/* Card Footer */}
          <div className="card-footer text-center py-16 px-24">
            <div className="h-8 w-24 bg-gray-200 rounded mx-auto"></div>
          </div>
        </div>
      </div>
    ));
export default ShimmerUI;
