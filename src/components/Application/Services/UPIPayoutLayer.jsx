import React, {  useState } from "react";
import UPIPayoutModal from "./UPIPayout/UPIPayoutModal";
import { Link } from "react-router-dom";
import { BadgeAlert,  Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import WaitModal from "./Recharge/Modal/WaitModal";
import UPITransferModal from "./UPIPayout/UPITransferModal";
import AddUPIPayoutModal from "./UPIPayout/AddUPIPayoutModal";
import { BiTransferAlt } from "react-icons/bi";

const UPIPayoutLayer = () => {
  const [modelOpen, setModalOpen] = useState(false);
  const [showTransferModal, setShowQuickTransferModal] = useState(false);
  const [payoutList, setPayoutList] = useState();


  // This will receive the handleSubmit function from child
  const [childSubmitHandler, setChildSubmitHandler] = useState(null);

  const verifyHandler = async (id) => {
    const token = sessionStorage.getItem("token");

    setModalOpen(true);

    const formData = new FormData();
    formData.append("type", "verifyupiid");
    formData.append("upipayout_id", id);

    const response = await fetch(
      `${import.meta.env.VITE_APP_API_KEY}/service/upi-payout`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );
    
    if (response.ok) {
        const data = await response.json();
        // console.log(data)

      if (data.statuscode === "TXN") {
        toast.success(data.message);
        childSubmitHandler(); // Call the child submit handler to refresh the list
      } else if(data.statuscode === "ERR") {
        toast.error(data.data);
      }
    }
    setModalOpen(false);
  };


const deleteUser = async (id) => {
  const token = sessionStorage.getItem("token");
  if (!window.confirm("Are you sure you want to delete this slider?"))
    return;

  setModalOpen(true);
  const formData = new FormData();
  formData.append("type", "deleteupiid");
  formData.append("upipayout_id", id);



  const response = await fetch(
    `${import.meta.env.VITE_APP_API_KEY}/service/upi-payout`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    },
  );

  

  if (response.ok) {
    const data = await response.json();

    if (data.status === "TXN") {
      toast.success(data.message);
      childSubmitHandler(); // Call the child submit handler to refresh the list
    } else if(data.status === "ERR") {
      toast.error(data.message);
    }
    setModalOpen(false);
  }
}


  return (
    <div className="row gy-4">
    <div className="col-lg-6">
      <div className="card h-100">
        <div className="card-body p-24">
          <ul
            className="nav border-gradient-tab nav-pills mb-20 d-inline-flex"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                className="nav-link d-flex align-items-center px-24 active"
                id="pills-payout-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-payout"
                type="button"
                role="tab"
                aria-controls="pills-payout"
                aria-selected="true"
              >
              <BiTransferAlt size={36}  className="p-4"/>
                UPI Transfer
              </button>
            </li>
          </ul>
          <div className="tab-content" id="pills-tabContent">
            <UPIPayoutModal
              openModal={setShowQuickTransferModal}
              setPayoutList={setPayoutList}
              setSubmitHandler={setChildSubmitHandler}
            />
          </div>
        </div>
      </div>
    </div>
  
    {showTransferModal && (
      <div className="col-lg-12">
        <div className="card h-100">
          <div className="card-header d-flex flex-wrap align-items-center justify-content-between gap-3">
            <h6 className="w-full">List of added Banks</h6>
            <div className="d-flex flex-wrap align-items-center gap-3">
              <AddUPIPayoutModal onSuccess={childSubmitHandler} />
            </div>
          </div>
          
          <div className="card-body">
            <div className="table-responsive scroll-sm">
              <table className="table bordered-table sm-table mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">UPI ID</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {payoutList.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        <div>No data found</div>
                      </td>
                    </tr>
                  ) : (
                    payoutList.map((data) => (
                      <tr key={data.id} className="fw-semibold">
                        <td>{data.id}</td>
                        <td>{data?.name || "NA"}</td>
                        <td>{data?.mobile || "NA"}</td>
                        <td>{data?.upi_id || "NA"}</td>
                        <td>
                          {data.is_verified !== "1" && (
                            <Link
                              className="w-32-px h-32-px me-8 bg-warning-100 text-warning-900 rounded-circle d-inline-flex align-items-center justify-content-center"
                              role="alert"
                            >
                              <BadgeAlert
                                size={16}
                                onClick={() => verifyHandler(data.id)}
                              />
                            </Link>
                          )}
                          {data.is_verified === "1" &&
                          <UPITransferModal userData={data} />}
                          <Link
                            to="#"
                            className="w-32-px h-32-px me-8 bg-danger-focus text-danger-main rounded-circle d-inline-flex align-items-center justify-content-center"
                            onClick={() => deleteUser(data.id)}
                          >
                            <Trash2 size={16} />
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <WaitModal modalOpen={modelOpen} />
          </div>
        </div>
      </div>
    )}
  </div>
  );
};
export default UPIPayoutLayer;




