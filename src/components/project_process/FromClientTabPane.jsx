import React, { useContext, useEffect, useState } from "react";
import { Header2 } from "../Header";
import BackButton from "../Button/BackButton";
import axios from "axios";
import Global from "../../context/Global";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
import { useCookies } from "react-cookie";
import Select from "react-select";
import ReactLotti3 from "../../loader/ReactLottie3";
const FromClientTabPane = ({ location }) => {
  const [submitLoader, setsubmitLoader] = useState(false);
  const [projectDetaile, setProjectDetaile] = useState({});
  const [descshowless, setdescshowless] = useState(false);
  const [milestones, setMilestones] = useState([])
  const [curMilestone, SetCurMilestnoe] = useState({});
  const [isPayment, setIsPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [acceptShow, setAcceptShow] = useState(false);
  const [reason, setReason] = useState("");
  const [reasonError, SetReasonError] = useState("");
  const [DeclineShow, setDeclineShow] = useState(false);

  const contextData = useContext(Global);
  const navigate = useNavigate();

  const customStyleOne = {
    borderRadius: "30px",
    filter: "drop-shadow(2.5px 4.33px 6.5px rgba(0,0,0,0.2))",
    padding: "100px 0",
  };

  // cart
  const [show, setShow] = useState(false);
  const [cookies] = useCookies();
  const months = [
    { value: "01", label: "01", name: "expiry_month" },
    { value: "02", label: "02", name: "expiry_month" },
    { value: "03", label: "03", name: "expiry_month" },
    { value: "04", label: "04", name: "expiry_month" },
    { value: "05", label: "05", name: "expiry_month" },
    { value: "06", label: "06", name: "expiry_month" },
    { value: "07", label: "07", name: "expiry_month" },
    { value: "08", label: "08", name: "expiry_month" },
    { value: "09", label: "09", name: "expiry_month" },
    { value: "10", label: "10", name: "expiry_month" },
    { value: "11", label: "11", name: "expiry_month" },
    { value: "12", label: "12", name: "expiry_month" },
  ];
  const d = new Date();
  let year = d.getFullYear();
  let years = [];
  for (let i = 0; i < 20; ++i) {
    years.push({
      value: `${year + i}`,
      label: `${year + i}`,
      name: "expiry_year",
    });
  }

  $(document).ready(function () {
    $(".cardExpiry.monthInput input").attr("maxlength", "2");
    $(".cardExpiry.yearInput input").attr("maxlength", "4");
  });
  const [cartInfo, setCartInfo] = useState({
    card_number: "",
    expiry_month: "",
    expiry_year: "",
    cvc: "",
  });
  const handalChange = (name, value) => {
    setCartInfo({
      ...cartInfo,
      [name]: value,
    });
  };

  useEffect(() => {
    milestoneHandle()
    axios.post("http://13.52.16.160:8082/client/particular_project_details", {
      client_id: cookies?.user_data?.user_id,
      user_token: cookies?.user_data?.user_token,
      role: cookies?.user_data?.role,
      project_id: location?.state?.projectData?.project_id,
    }).then((respo) => {
      if (respo?.data?.status === "Success") {
        setProjectDetaile({ ...respo?.data?.data });
      }
    });
  }, []);

  // particular project milestones API 
  function milestoneHandle() {
    axios.post("http://13.52.16.160:8082/client/particular_project_milestones", {
      client_id: cookies?.user_data?.user_id,
      user_token: cookies?.user_data?.user_token,
      role: cookies?.user_data?.role,
      project_id: location?.state?.projectData?.project_id,
    }).then((res) => {
      setMilestones(res?.data?.data)
    })
  }


  // add a new card to payment
  const handalSubmit = (event) => {
    event.preventDefault();
    axios.post("http://13.52.16.160:8082/stripe/client/card/", {
      ...cartInfo,
      client_id: cookies?.user_data?.user_id,
      client_token: cookies?.user_data?.user_token,
    }).then((response) => {
      if (response?.data?.status === "Failed") {
        const error = response?.data?.message;
        setPaymentError(error.split(":")[1]);
      } else {
        handalDownload(curMilestone)
        setShow(false);
        SetCurMilestnoe({});
        setIsPayment(false);
        setPaymentError("");
      }
    }).catch((error) => {
      // console.log(error.response)
    });
  };

  // go to checkout page 
  function handalDownload(curMilestone) {
    SetCurMilestnoe(curMilestone)
    console.log(projectDetaile)
    axios.post("http://13.52.16.160:8082/client/client_checkout_details/", {
      client_id: cookies?.user_data?.user_id,
      client_token: cookies?.user_data?.user_token,
      professional_id: location?.state?.projectData?.professional_id,
      amount_paid: location?.state?.projectData?.project_cost,
    }).then((result) => {
      if (
        result?.data?.error_code === 109 &&
        result?.data?.status === "Failed"
      ) {
        setIsPayment(true);
      } else {
        navigate("/check-out", {
          state: {
            projectDetaile: {
              ...projectDetaile,
              professional_image: location?.state?.projectData?.professional_image,
              location: location?.state?.projectData?.location,
            },
            curMilestone: curMilestone
          },
        });
      }
    });
  };


  // complated milestones download 
  const handalDownload1 = (curMilestone) => {
    axios.put("http://13.52.16.160:8082/client/update_status_view_file", {
      user_id: cookies?.user_data?.user_id,
      user_token: cookies?.user_data?.user_token,
      role: "client",
      project_id: location?.state?.projectData?.project_id,
      milestone_id: curMilestone?.milestone_id,
    }).then((response) => {
      const url = response?.data?.data?.file;
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", url.split("/")[5]); // you can set the filename here
      document.body.appendChild(link);
      link.click();
    });
  };


  // download invoice 
  const handalDownloadInvoice = (payload) => {
    const data = milestones?.filter((item) => {
      if (payload?.milestone_id === item?.milestone_id) {
        return item;
      }
    });
    const url = data[0]?.invoice;
    const link = document.createElement("a");
    link.setAttribute("target", "_blank");
    link.href = url;
    link.setAttribute("download", url.split("/")[5]); // you can set the filename here
    document.body.appendChild(link);
    link.click();
  };


  // accept project 
  const AcceptHandal = () => {
    setsubmitLoader(true);
    axios.post("http://13.52.16.160:8082/client/update_status_view_file", {
      user_id: cookies?.user_data?.user_id,
      user_token: cookies?.user_data?.user_token,
      role: "client",
      project_id: location?.state?.projectData?.project_id,
      milestone_id: curMilestone?.milestone_id,
      status: "accepted",
    }).then((result) => {
      if (result?.data?.status === "Success") {
        milestoneHandle()
        setsubmitLoader(false);
        SetCurMilestnoe({});
        setAcceptShow(false);
      }
      SetCurMilestnoe({});
      setAcceptShow(false);
    });
  };

  // decline project 
  const declineHandal = () => {
    setsubmitLoader(true);
    if (reason) {
      axios.post("http://13.52.16.160:8082/client/update_status_view_file", {
        user_id: cookies?.user_data?.user_id,
        user_token: cookies?.user_data?.user_token,
        role: "client",
        project_id: curMilestone?.project_id,
        milestone_id: curMilestone?.milestone_id,
        status: "decline",
        reason: reason,
      }).then((result) => {
        if (result?.data?.status === "Success") {
          SetCurMilestnoe({});
          setDeclineShow(false);
          SetReasonError("");
          setReason("");
          milestoneHandle()
        } else {
          SetReasonError("Failed due to some reason");
        }
      });
    } else {
      SetReasonError("Reason Required");
    }
  };

  return (
    <div className="create-account">
      <Header2 />
      <main>
        <div className="container mb-5 bg-white" style={customStyleOne}>
          <div className="row m-0">
            <div className=" col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm mx-auto">
              <section className="ProjectDetailsPageProjectDetailsSection">
                <div className="row">
                  <div className="col ">
                    <h3
                      className="theme-text-color fs-24 mb-5"
                      style={{ cursor: "pointer" }}
                    >
                      <span
                        className="text-decoration-none text-dark m-0 h2"
                        onClick={() => {
                          contextData?.userData?.role === "client"
                            ? navigate(-1)
                            : navigate("/myactivity");
                        }}
                      >
                        <i
                          className="fa-solid fa-arrow-left-long pe-3"
                          style={{ color: "#01a78a" }}
                        ></i>
                      </span>
                      Project Details
                    </h3>

                    <div className="row">
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">1</div>
                        <h5>Project Name:</h5>
                        <p className="m-0 ms-3">
                          {projectDetaile?.project_name}
                        </p>
                      </div>
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">2</div>
                        <h5>Professional Name :</h5>
                        <p className="m-0 ms-3">
                          {projectDetaile?.professional_name}
                        </p>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">3</div>
                        <h5>Estimated Area:</h5>
                        <p className="m-0 ms-3">
                          {projectDetaile?.area} sq meter
                        </p>
                      </div>
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">4</div>
                        <h5>Estimated Budget:</h5>
                        <p className="m-0 ms-3">
                          $ {projectDetaile?.project_cost}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">5</div>
                        <h5>Project Status:</h5>
                        <p
                          className="m-0 ms-3"
                          style={{ textTransform: "capitalize" }}
                        >
                          {projectDetaile?.project_status}
                        </p>
                      </div>
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">6</div>
                        <h5>Estimated Deadline:</h5>
                        <p className="m-0 ms-3">
                          {projectDetaile?.estimated_time}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">7</div>
                        <h5>Project File: &nbsp; &nbsp;</h5>
                        <a
                          href={projectDetaile?.attachment}
                          download={projectDetaile?.attachment}
                          target="_new"
                        >
                          View File
                        </a>
                      </div>
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">8</div>
                        <h5> Work Assigned:</h5>
                        <p className="m-0 ms-3">
                          {projectDetaile?.work_assigned}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                      <div className="project-details">9</div>
                      <h5> Project Description: </h5>
                      {descshowless === "show" ? (
                        <p>
                          {projectDetaile?.description}
                          <span
                            id={"show"}
                            style={{
                              marginTop: "10px",
                              cursor: "pointer",
                              textDecoration: "underline",

                              color: "#01a78a",
                              // backgroundColor: "#0F9E83",
                            }}
                            onClick={(e) => {
                              setdescshowless("");
                            }}
                          >
                            show less
                          </span>
                        </p>
                      ) : (
                        <p>
                          {projectDetaile?.description?.slice(0, 199)}{" "}
                          {projectDetaile?.description?.length < 200 ? null : (
                            <span
                              id={"show"}
                              style={{
                                marginTop: "10px",
                                cursor: "pointer",
                                textDecoration: "underline",

                                color: "#01a78a",
                                // backgroundColor: "#0F9E83",
                              }}
                              onClick={(e) => {
                                setdescshowless(e.target.id);
                              }}
                            >
                              show more
                            </span>
                          )}
                        </p>
                      )}
                      {/* <p className="m-0 ms-3">{projectDetaile?.description}</p> */}
                    </div>
                  </div>
                </div>
              </section>
              <section className="projectMilestoneInfo">
                <h3 className="theme-text-color fs-24 mt-5 mb-4">
                  Milestone Details
                </h3>
                {milestones?.map((res, i) => (
                  <div className="row milestoneBox" key={i}>
                    <div className="row milestoneBoxInner">
                      <div className="milestoneBox1 col-4 col-xl-3">
                        <p className="headingMile">Name</p>
                        <p style={{ textTransform: "capitalize" }}>
                          {res?.milestone_name}
                        </p>
                      </div>
                      <div className="col-4 col-xl-2 milestoneBox1">
                        <p className="headingMile">Cost </p>
                        <p style={{ textTransform: "capitalize" }}>
                          {res?.milestone_amount_percent} %
                        </p>
                      </div>
                      <div className="col-4 col-xl-2 milestoneBox1">
                        <p className="headingMile">Date</p>
                        <div className="date"> {res?.milestone_date}</div>
                      </div>

                      {/* pending and decline project  */}
                      {(res?.status === "pending" || res?.status === "decline") && (
                        <>
                          <div className="col-xl-5 statusBtnMilecol resMile">
                            <button
                              className="btn default-cursor pendingBtnMile"
                              type="button"
                            >
                              Pending
                            </button>
                          </div>
                        </>
                      )}

                      {/* downloaded , updated and uploaded project  */}
                      {(res?.status === "downloaded" || res?.status === "updated" || res?.status === "uploaded") && (
                        <>
                          <div className="col-xl-5 d-flex  colAccDec resMile">
                            <div className="row">
                              <div className="col-6 colAccDecpar">
                                <div className="accept_btn_group ">
                                  <button
                                    className="pendingBtnMileAll colAccDecchl"
                                    onClick={() => {
                                      setAcceptShow(true);
                                      SetCurMilestnoe({ ...res });
                                    }}
                                  >
                                    Accept
                                  </button>
                                  <button
                                    className="pendingBtnMileAll"
                                    onClick={() => {
                                      setDeclineShow(true);
                                      SetCurMilestnoe({ ...res });
                                    }}
                                  >
                                    Decline
                                  </button>
                                </div>
                              </div>
                              <div className="col-6">
                                <button
                                  className="btn DownloadbtnMile"
                                  onClick={() => {
                                    handalDownload({ ...res });
                                  }}
                                  type="button"
                                >
                                  Download
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {/* accepted project  */}
                      {res?.status == "accepted" && (
                        <>
                          <div className="col-xl-5  col-12 d-flex resMile">
                            <div className="accept_btn_group" style={{ margin: "0 auto" }} >
                              <div className="Milestone btnBoeMile1">
                                Completed
                              </div>
                            </div>
                            {res?.invoice && (
                              <div className="accept_btn_group btnBoeMile">
                                <button className="Milestone" onClick={() => handalDownloadInvoice(res)} >
                                  Invoice
                                </button>
                              </div>
                            )}

                            <button
                              className="btn DownloadbtnMile"
                              onClick={() => {
                                res?.invoice
                                  ? handalDownload1({ ...res })
                                  : handalDownload({ ...res });
                              }} type="button" >
                              Download
                            </button>
                          </div>
                        </>
                      )}

                      {res?.status === "completed" && (
                        <>
                          <div className="col-4 col-xl-5 col-12 d-flex btnBoeMileOuter">
                            <div className="accept_btn_group btnBoeMile">
                              <button> Completed</button>
                            </div>
                            {res?.invoice && (
                              <div className="accept_btn_group btnBoeMile">
                                <button className="Milestone" onClick={() => handalDownloadInvoice(res)} >
                                  Invoice
                                </button>
                              </div>
                            )}
                            <button
                              className="btn DownloadbtnMile "
                              onClick={() => {
                                SetCurMilestnoe({ ...res });
                                setShow(true);
                              }} type="button" >
                              Download
                            </button>
                          </div>
                        </>
                      )}
                      
                    </div>
                    <div className="row milerow-2">
                      <div className="col-xl-10">
                        <p className="headingMile">Milestone Description</p>
                        <p style={{ textTransform: "capitalize" }}>
                          {descshowless === i + 1 ? (
                            <p>
                              {res?.milestone_description}
                              <span
                                id={i + 1}
                                style={{
                                  marginTop: "10px",
                                  cursor: "pointer",
                                  textDecoration: "underline",

                                  color: "#01a78a",
                                  // backgroundColor: "#0F9E83",
                                }}
                                onClick={(e) => {
                                  setdescshowless("");
                                }}
                              >
                                show less
                              </span>
                            </p>
                          ) : (
                            <p>
                              {res?.milestone_description?.slice(0, 199)}{" "}
                              {res?.milestone_description?.length <
                                200 ? null : (
                                <span
                                  id={i + 1}
                                  style={{
                                    marginTop: "10px",
                                    cursor: "pointer",
                                    textDecoration: "underline",

                                    color: "#01a78a",
                                    // backgroundColor: "#0F9E83",
                                  }}
                                  onClick={(e) => {
                                    setdescshowless(parseInt(e.target.id));
                                  }}
                                >
                                  show more
                                </span>
                              )}
                            </p>
                          )}
                        </p>
                      </div>
                      <div className="col-xl-2 ">
                        <p className="mileFile">
                          <a
                            href={res?.milestone_attachment}
                            download={res?.milestone_attachment}
                            target="_new"
                          >
                            View File
                          </a>
                        </p>
                      </div>
                      <br />
                    </div>
                  </div>
                ))}
                <BackButton
                  customclassName="mx-auto d-block mt-4"
                  text="Back"
                />
              </section>
            </div>
          </div>
        </div>
      </main>

      <Modal centered show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Modal.Title>
            Are you sure want to pay the milestone amount and download the file?
            If already paid no amount will deducted.
          </Modal.Title>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-start">
          <Button
            variant="secondary"
            onClick={() => {
              setPaymentError("");
              setShow(false);
              SetCurMilestnoe({});
            }}
          >
            cancel
          </Button>
          <Button className="theme-bg-color border-0" onClick={handalDownload}>
            sure
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        centered
        show={isPayment}
        onHide={() => {
          setIsPayment(false);
          setPaymentError("");
          SetCurMilestnoe({});
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
          <h4>Add Your Card details for Payment in future </h4>
        </Modal.Header>
        <Modal.Footer>
          <div className="bg-white payementFormMain card-popup">
            <form onSubmit={handalSubmit}>
              <div className="row m-0 pt-3 pb-4 border-bottom">
                <h6>Card Number</h6>
                <input
                  id="ccn"
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9\s]{13,19}"
                  autoComplete="cc-number"
                  maxLength="19"
                  placeholder="xxxx xxxx xxxx xxxx"
                  name="card_number"
                  value={cartInfo?.card_number}
                  onChange={(event) => {
                    handalChange(event?.target?.name, event?.target?.value);
                  }}
                />
              </div>
              <div className="row  py-3">
                <div className="col-8">
                  <div className="row">
                    <h6>Expiry Date</h6>
                    <div className="col cardExpiry monthInput">
                      <div className="border-bottom">
                        <Select
                          options={months}
                          placeholder="MM"
                          style={{ border: "none" }}
                          name="expiry_month"
                          defaultValue={cartInfo.expiry_month}
                          onChange={(event) =>
                            handalChange(event.name, event.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col cardExpiry yearInput">
                      <div className="border-bottom">
                        <Select
                          options={years}
                          defaultValue={cartInfo.expiry_year}
                          placeholder="YYYY"
                          style={{ border: "none" }}
                          onChange={(event) => {
                            handalChange(event?.name, event?.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="row h-100">
                    <div className="col d-flex flex-column justify-content-end">
                      <label htmlFor="CVV">CVV:</label>
                      <input
                        type="text"
                        id="CVV"
                        placeholder="xxx"
                        className="border-bottom"
                        maxLength={3}
                        minLength={3}
                        name="cvc"
                        value={cartInfo?.cvc}
                        onChange={(event) => {
                          handalChange(
                            event?.target?.name,
                            event?.target?.value
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ color: "red" }}>{paymentError}</div>
              <div className="row">
                <button type="submit" className="PaymentCardSubmitButton">
                  Save
                </button>
              </div>
            </form>
          </div>
        </Modal.Footer>
      </Modal>

      {/* accept  */}
      <Modal
        centered
        show={acceptShow}
        onHide={() => {
          setAcceptShow(false);
          SetCurMilestnoe({});
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure want to Accept.</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setAcceptShow(false);
              SetCurMilestnoe({});
            }}
          >
            Cancel
          </Button>
          <Button
            className="theme-bg-color border-0"
            onClick={!submitLoader ? AcceptHandal : null}
          >
            {submitLoader ? <ReactLotti3 /> : "Sure"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/*  decline  */}
      <Modal
        centered
        show={DeclineShow}
        onHide={() => {
          SetCurMilestnoe({});
          setDeclineShow(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a Reason to decline</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <input
            type="text"
            placeholder="Reason"
            onChange={(event) => setReason(event.target.value)}
            value={reason}
            className="form-control"
          />
          <p>{reasonError}</p>
          <Button
            variant="secondary"
            onClick={() => {
              SetCurMilestnoe({});
              setDeclineShow(false);
            }}
          >
            cancel
          </Button>
          <Button
            className="theme-bg-color border-0"
            onClick={!submitLoader ? declineHandal : null}
          >
            {submitLoader ? <ReactLotti3 /> : "Sure"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FromClientTabPane;
