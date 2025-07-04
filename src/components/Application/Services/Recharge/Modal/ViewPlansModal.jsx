import { CalendarFold, ReceiptText } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast,  } from "react-toastify";
import { Modal, Button, Tab, Accordion, Spinner, Card } from "react-bootstrap";

// import {  } from 'react-bootstrap';

function MobilePlansModal({ mobileNumber, operator, circle, rechargeData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("FULLTT");
  const [plansData, setPlansData] = useState(null);
  const token = sessionStorage.getItem("token");
  const [show, setShow] = useState(false);

  const categories = plansData ? Object.keys(plansData.data.data) : [];
  // Map operator names to codes
  const getOperatorCode = (op) => {
    const operatorMap = {
      Jio: "J",
      VI: "V",
      Airtel: "A",
      // Add other operators as needed
    };
    return operatorMap[op] || op;
  };

  // Fetch plans when modal opens or dependencies change
  useEffect(() => {
    if (!show) return;

    const fetchPlans = async () => {
      setIsLoading(true);
      try {
        const opcode = getOperatorCode(operator);
        console.log("opcode", opcode, operator, mobileNumber, circle);
        const formData = new FormData();
        formData.append("type", "mobileplan");
        formData.append("mobile", mobileNumber);
        formData.append("opcode", opcode);
        formData.append("circle", circle);

        const response = await fetch(
          `${import.meta.env.VITE_APP_API_KEY}/service/recharge`,
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
          if (data.statuscode === "TXN") {
            setPlansData(data);
          } else {
            toast.error(data.message || "Failed to load plans");
          }
        } else {
          toast.error("Failed to fetch plans");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, [show, operator, circle, mobileNumber, token]);

  const handleClose = () => {
    setShow(false);
    setActiveTab("FULLTT");
    setPlansData(null);
  };
  const handleShow = () => {
    setShow(true);
    toast.dismiss();
  };

  return (
    <>
      {/* This assumes you have a button somewhere that triggers the modal */}
      <Button variant="primary" onClick={handleShow} className="w-100">
        View Plans
      </Button>
      {/* {!isLoading && <ToastContainer />} */}
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        scrollable
        centered
        id="mobilePlansModal"
      >
        <Modal.Header closeButton>
          <p
            className="custom-accordion-header fw-semibold no-wrap text-black mb-0"
            id="mobilePlansModalLabel"
          >
            {operator || "Mobile"} Recharge Plans
          </p>
        </Modal.Header>

        <Modal.Body className="pt-0">
          {isLoading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading plans...</p>
            </div>
          ) : plansData ? (
            <>
              <Tab.Container
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className=""
              >
                <Accordion className="mb-4 sticky-top bg-base">
                  {categories.map((category, index) => (
                    <Accordion.Item
                      eventKey={index.toString()}
                      key={category}
                      className="mt-4"
                    >
                      <Accordion.Header
                        className="fw-semibold no-wrap text-primary-light"
                        onClick={() => setActiveTab(category)}
                      >
                        <p className="text-black mb-0">
                          {category.trim().toUpperCase()}
                        </p>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Tab.Content>
                          <hr className="mt-3" />
                          {categories.map((category) => (
                            <Tab.Pane eventKey={category} key={category}>
                              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-4">
                                {plansData.data.data[category]?.map(
                                  (plan, index) => (
                                    <div
                                      className="col cursor-pointer"
                                      key={index}
                                    >
                                      <Card className="h-100 border-0 shadow-sm">
                                        <Card.Header className="bg-neutral-100 d-flex align-items-center justify-content-center g-4">
                                          <h5 className="mb-0 text-sm">
                                            <CalendarFold
                                              size={18}
                                              color={"black"}
                                            />{" "}
                                            Validity - {plan.validity}
                                          </h5>
                                        </Card.Header>
                                        <Card.Body>
                                          <p className="card-text mt-2 fs-small">
                                            {plan.desc.length > 160
                                              ? `${plan.desc.substring(
                                                  0,
                                                  160,
                                                )}...`
                                              : plan.desc}
                                          </p>
                                        </Card.Body>
                                        <Button
                                          variant="info"
                                          className="text-sm badge fw-bold radius-4 rounded-lg px-20 py-16 w-100"
                                          onClick={() => {
                                            rechargeData((prev) => ({
                                              ...prev,
                                              amount: plan.rs,
                                            }));
                                            handleClose();
                                          }}
                                        >
                                          <ReceiptText size={16} /> PAY ₹
                                          {plan.rs}
                                        </Button>
                                      </Card>
                                    </div>
                                  ),
                                )}
                              </div>

                              {plansData.data.data[category]?.length === 0 && (
                                <div className="text-center py-5">
                                  <p>No plans available for this category</p>
                                </div>
                              )}
                            </Tab.Pane>
                          ))}
                        </Tab.Content>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Tab.Container>
            </>
          ) : (
            <div className="text-center py-5">
              <p>No plans data available</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MobilePlansModal;
