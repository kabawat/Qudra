import React, { useContext, useEffect, useState } from "react";
import { Header2 } from "../Header";
import BackButton from "../Button/BackButton";
import styled from "styled-components";
import axios from "axios";
import Global from "../../context/Global";
import { Button, Modal } from "react-bootstrap";
import FileViewer from "react-file-viewer";
import { Link, NavLink, useNavigate } from "react-router-dom";
import $ from "jquery";
import { useLocation } from "react-router-dom";
import { BiCreditCardAlt } from "react-icons/bi";
import { FaPaypal } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { BsArrowRight } from "react-icons/bs";
import Select from "react-select";
import ReactLotti3 from "../../loader/ReactLottie3";
const FromClientTabPane = ({ location }) => {
  const [submitLoader, setsubmitLoader] = useState(false);
  const [locations, setLoctions] = useState(location);
  const [projectDetaile, setProjectDetaile] = useState({});
  const [descshowless, setdescshowless] = useState(false);

  console.log(locations?.state);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post("http://13.52.16.160:8082/client/particular_project_milestones", {
        client_id: cookies?.user_data?.user_id,
        user_token: cookies?.user_data?.user_token,
        role: cookies?.user_data?.role,
        project_id: locations?.state?.projectData?.project_id,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          axios
            .post(
              "http://13.52.16.160:8082/client/particular_project_details",
              {
                client_id: cookies?.user_data?.user_id,
                user_token: cookies?.user_data?.user_token,
                role: cookies?.user_data?.role,
                project_id: locations?.state?.projectData?.project_id,
              }
            )
            .then((respo) => {
              if (respo?.data?.status === "Success") {
                setProjectDetaile({ ...respo?.data?.data });
                if (locations?.state?.projectDetails?.id !== undefined) {
                  const state = {
                    projectData: respo?.data?.data,
                    milesStoneData: res?.data?.data,
                    isFromClientTab: true,
                  };
                  setLoctions({
                    ...locations,
                    state: state,
                  });
                }
              }
            });
        }
      });
  }, []);
  const contextData = useContext(Global);
  const customStyleOne = {
    borderRadius: "30px",
    filter: "drop-shadow(2.5px 4.33px 6.5px rgba(0,0,0,0.2))",
    padding: "100px 0",
  };
  const Wrapper = styled.div`
    .preview {
      right: 0;
      display: flex;
      top: 0;
      position: absolute;
      .date {
        position: static !important;
        border-left: 1px solid #01a78a;
        padding: 10px;
        width: 115px;
        text-align: center;
      }
      .btn btn-success {
        position: static !important;
        pointer-events: all !important;
      }
    }
    .Milestone {
      position: static !important;
      border: none;
      border-left: 1px solid #01a78a;
      padding: 5px;
      width: 180px;
      text-align: center;
    }
  `;
  const handlePreviewData = (milestone, id, type) => {
    axios
      .put("http://13.52.16.160:8082/client/update_status_view_file", {
        user_id: contextData?.userData?.user_id,
        user_token: contextData?.userData?.user_token,
        role: contextData?.userData?.role,
        project_id: id,
        milestone_id: milestone,
        purpuse: type,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          setShow(true);
        }
      });
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

  const [curProject, SetCurProject] = useState({});
  const [isPayment, setIsPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const handalSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://13.52.16.160:8082/stripe/client/card/", {
        ...cartInfo,
        client_id: cookies?.user_data?.user_id,
        client_token: cookies?.user_data?.user_token,
      })
      .then((response) => {
        if (response?.data?.status === "Failed") {
          const error = response?.data?.message;
          setPaymentError(error.split(":")[1]);
        } else {
          setShow(false);
          SetCurProject({});
          setIsPayment(false);
          setPaymentError("");
        }
      })
      .catch((error) => {
        // console.log(error.response)
      });
  };

  const handalDownload = (curProject) => {
    axios
      .post("http://13.52.16.160:8082/client/client_checkout_details/", {
        client_id: cookies?.user_data?.user_id,
        client_token: cookies?.user_data?.user_token,
        professional_id: location?.state?.projectData?.professional_id,
        amount_paid: location?.state?.projectData?.project_cost,
      })
      .then((result) => {
        if (
          result?.data?.error_code === 109 &&
          result?.data?.status === "Failed"
        ) {
          setIsPayment(true);
        } else {
          navigate("/check-out", {
            state: {
              ...result?.data?.data,
              ...location?.state,
              curProject,
            },
          });
        }
      });
  };
  const handalDownload1 = (curProject) => {
    axios
      .put("http://13.52.16.160:8082/client/update_status_view_file", {
        user_id: cookies?.user_data?.user_id,
        user_token: cookies?.user_data?.user_token,
        role: "client",
        project_id: locations?.state?.projectData?.project_id,
        milestone_id: curProject?.milestone_id,
      })
      .then((response) => {
        const url = response?.data?.data?.file;
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", url.split("/")[5]); // you can set the filename here
        document.body.appendChild(link);
        link.click();
      });
  };

  const handalDownloadInvoice = (payload) => {
    axios
      .post("http://13.52.16.160:8082/client/particular_project_milestones", {
        client_id: cookies?.user_data?.user_id,
        user_token: cookies?.user_data?.user_token,
        role: cookies?.user_data?.role,
        professional_id: locations?.state?.projectDetails?.id,
        project_id: locations?.state?.projectData?.project_id,
      })
      .then((response) => {
        const data = response.data.data?.filter((item) => {
          if (payload?.milestone_id === item?.milestone_id) {
            return item;
          }
        });
        setShow(false);
        if (
          response?.data?.error_code === 109 &&
          response?.data?.status === "Failed"
        ) {
          setIsPayment(true);
        } else {
          const url = data[0]?.invoice;
          const link = document.createElement("a");
          link.setAttribute("target", "_blank");
          link.href = url;
          link.setAttribute("download", url.split("/")[5]); // you can set the filename here
          document.body.appendChild(link);
          link.click();
        }
      });
  };

  const [acceptShow, setAcceptShow] = useState(false);
  const AcceptHandal = () => {
    setsubmitLoader(true);
    axios
      .post("http://13.52.16.160:8082/client/update_status_view_file", {
        user_id: cookies?.user_data?.user_id,
        user_token: cookies?.user_data?.user_token,
        role: "client",
        project_id: locations?.state?.projectData?.project_id,
        milestone_id: curProject?.milestone_id,
        status: "accepted",
      })
      .then((result) => {
        if (result?.data?.status === "Success") {
          setsubmitLoader(false);
          axios
            .post(
              "http://13.52.16.160:8082/client/particular_project_milestones",
              {
                client_id: cookies?.user_data?.user_id,
                user_token: cookies?.user_data?.user_token,
                role: cookies?.user_data?.role,
                professional_id: locations?.state?.projectDetails?.id,
                project_id: locations?.state?.projectData?.project_id,
              }
            )
            .then((res) => {
              if (res?.data?.status === "Success") {
                const state = {
                  projectData: projectDetaile,
                  milesStoneData: res?.data?.data,
                  isFromClientTab: true,
                };
                setLoctions({
                  ...locations,
                  state: state,
                });
              }
            });
          SetCurProject({});
          setAcceptShow(false);
        }
        SetCurProject({});
        setAcceptShow(false);
      });
  };

  const [reason, setReason] = useState("");
  const [reasonError, SetReasonError] = useState("");
  const [DeclineShow, setDeclineShow] = useState(false);
  const declineHandal = () => {
    setsubmitLoader(true);
    if (reason) {
      axios
        .post("http://13.52.16.160:8082/client/update_status_view_file", {
          user_id: cookies?.user_data?.user_id,
          user_token: cookies?.user_data?.user_token,
          role: "client",
          project_id: curProject?.project_id,
          milestone_id: curProject?.milestone_id,
          status: "decline",
          reason: reason,
        })
        .then((result) => {
          if (result?.data?.status === "Success") {
            SetCurProject({});
            setDeclineShow(false);
            SetReasonError("");
            setReason("");
            axios
              .post(
                "http://13.52.16.160:8082/client/particular_project_milestones",
                {
                  client_id: cookies?.user_data?.user_id,
                  user_token: cookies?.user_data?.user_token,
                  role: cookies?.user_data?.role,
                  professional_id: locations?.state?.projectDetails?.id,
                  project_id: curProject?.project_id,
                }
              )
              .then((res) => {
                if (res?.data?.status === "Success") {
                  axios
                    .post(
                      "http://13.52.16.160:8082/client/particular_project_details",
                      {
                        client_id: cookies?.user_data?.user_id,
                        user_token: cookies?.user_data?.user_token,
                        role: cookies?.user_data?.role,
                        project_id: curProject?.project_id,
                      }
                    )
                    .then((respo) => {
                      setsubmitLoader(false);
                      if (respo?.data?.status === "Success") {
                        if (
                          locations?.state?.projectDetails?.id !== undefined
                        ) {
                          const state = {
                            projectDetails: locations?.state?.projectDetails,
                            projectData: respo?.data?.data,
                            milesStoneData: res?.data?.data,
                            project_cost: locations?.state?.project_cost,
                          };
                          setLoctions({
                            ...locations,
                            state: state,
                          });
                        }
                      }
                    });
                }
              });
          } else {
            SetReasonError("Failed due to some reason");
          }
        });
    } else {
      SetReasonError("Reason Required");
    }
  };
  window.addEventListener("click", (event) => {});

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
                {locations?.state?.milesStoneData?.map((res, i) => (
                  <>
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

                        {(res?.status === "pending" ||
                          res?.status === "decline") && (
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

                        {(res?.status === "downloaded" ||
                          res?.status === "updated" ||
                          res?.status === "uploaded") && (
                          <>
                            <div className="col-xl-5 d-flex  colAccDec resMile">
                              <div className="row">
                                <div className="col-6 colAccDecpar">
                                  <div className="accept_btn_group ">
                                    <button
                                      className="pendingBtnMileAll colAccDecchl"
                                      onClick={() => {
                                        setAcceptShow(true);
                                        SetCurProject({ ...res });
                                      }}
                                    >
                                      Accept
                                    </button>
                                    <button
                                      className="pendingBtnMileAll"
                                      onClick={() => {
                                        setDeclineShow(true);
                                        SetCurProject({ ...res });
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

                        {res?.status == "accepted" && (
                          <>
                            <div className="col-xl-5  col-12 d-flex resMile">
                              <div
                                className="accept_btn_group"
                                style={{ margin: "0 auto" }}
                              >
                                <div className="Milestone btnBoeMile1">
                                  Completed
                                </div>
                              </div>
                              {res?.invoice && (
                                <div className="accept_btn_group btnBoeMile">
                                  <button
                                    className="Milestone"
                                    onClick={() => handalDownloadInvoice(res)}
                                  >
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
                                }}
                                type="button"
                              >
                                Download
                              </button>
                            </div>
                          </>
                        )}
                        {res?.status === "completed" && (
                          <>
                            <div className="col-4 col-xl-5 col-12 d-flex btnBoeMileOuter">
                              <div
                                className="accept_btn_group btnBoeMile"
                                // style={{ margin: "auto" }}
                              >
                                <button> Completed</button>
                              </div>
                              <button
                                className="btn DownloadbtnMile "
                                onClick={() => {
                                  // console.log("here");
                                  SetCurProject({ ...res });
                                  setShow(true);
                                }}
                                type="button"
                              >
                                Download
                              </button>
                              {/* <p style={{ textTransform: "capitalize" }}>
                              {res?.milestone_description}
                            </p> */}
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
                  </>
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
              SetCurProject({});
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
          SetCurProject({});
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
          SetCurProject({});
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
              SetCurProject({});
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
          SetCurProject({});
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
              SetCurProject({});
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
