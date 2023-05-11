import React, { useState } from "react";
import { Header2 } from "../Header";
import styled from "styled-components";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useEffect } from "react";
import ReactLotti3 from "../../loader/ReactLottie3";
const Wrapper = styled.div`
  .mileStoneDate {
    padding: 10px 10px;
    background: white;
    border-left: 1px solid #01a78a;
    text-align: center;
    width: 115px;
  }
  .update {
    padding: 10px 10px;
    background: transparent !important;
    border: none;
    border-left: 1px solid #01a78a;
    text-align: center;
    width: 115px;
    color: #01a78a;
  }
  .uploadMileStone {
    cursor: pointer;
    position: relative;
    border-radius: 0 25px 25px 0;
    padding: 11px 30px 11px;
    border: 1px solid #01a78a;
    background-color: #01a78a;
    color: white;
    span {
      z-index: 0;
    }
    input {
      position: absolute;
      z-index: 88888;
      top: 0;
      opacity: 0;
      right: 0;
      width: 100%;
      height: 100%;
    }
  }
  .buttonAndDateMain {
    display: flex;
    justify-content: end;
    position: absolute;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .pendingMileStone {
    cursor: pointer;
    position: relative;
    border-radius: 0;
    padding: 11px 30px 11px;
    text-transform: capitalize;
    border: 0;
    background-color: transparent;
    color: #01a78a;
    border-left: 1px solid #01a78a;
  }
  .Milestone {
    position: static !important;
    border: none;
    border-left: 1px solid #01a78a;
    padding: 12px;
    width: 180px;
    text-align: center;
  }

  .decline {
    position: static !important;
    border: none;
    border-left: 1px solid #01a78a;
    padding: 12px;
    width: 60px;
    text-align: center;
    background: #abb3aa33;
  }
`;

const FromProfessionalTabPane = ({ location }) => {
  const [submitLoader, setsubmitLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);
  const [descshowless, setdescshowless] = useState(false);

  const [curProject, setCurProject] = useState({});
  const [milestone, setMilestone] = useState([]);
  const handleShowMore = () => {
    setShowText(true);
  };

  const handleShowLess = () => {
    setShowText(false);
  };

  const customStyleOne = {
    borderRadius: "30px",
    filter: "drop-shadow(2.5px 4.33px 6.5px rgba(0,0,0,0.2))",
    padding: "100px 0",
  };
  useEffect(() => {
    axios
      .post("http://13.52.16.160:8082/client/particular_project_details", {
        client_id: location?.state?.client_id,
        project_id: location?.state?.project_id,
        professional_id: cookies?.user_data?.user_id,
        user_token: cookies?.user_data?.user_token,
        role: cookies?.user_data?.role,
      })
      .then((respo) => {
        if (respo?.data?.status === "Success") {
          setCurProject(respo?.data?.data);
          axios
            .post(
              "http://13.52.16.160:8082/client/particular_project_milestones",
              {
                client_id: location?.state?.client_id,
                user_token: cookies?.user_data?.user_token,
                role: cookies?.user_data?.role,
                professional_id: cookies?.user_data?.user_id,
                project_id: location?.state?.project_id,
              }
            )
            .then((res) => {
              if (res?.data?.status === "Success") {
                setMilestone(res?.data?.data);
              }
            });
        }
      });
  }, []);
  const [project, setProject] = useState();
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const handalshow = (res) => {
    setProject(res);
    setShow(true);
  };
  const handalchage = (event) => {
    setError("");
    setFile(event.target.files);
  };

  const [isReason, setIsReason] = useState(false);
  const [reason, setReason] = useState();
  const handalClose = () => {
    setFile("");
    setError("");
    setShow(false);
    axios
      .post("http://13.52.16.160:8082/client/particular_project_milestones", {
        client_id: location?.state?.client_id,
        user_token: cookies?.user_data?.user_token,
        role: cookies?.user_data?.role,
        professional_id: cookies?.user_data?.user_id,
        project_id: location?.state?.project_id,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          setMilestone(res?.data?.data);
        }
      });
  };

  const handleMilestoneUpdate = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("user_id", cookies?.user_data?.user_id);
    data.append("user_token", cookies?.user_data?.user_token);
    data.append("role", cookies?.user_data?.role);
    data.append("project_id", project?.project_id);
    data.append("milestone_id", project?.milestone_id);
    data.append("milestone_file", file[0]);
    if (file?.length > 0) {
      setsubmitLoader(true);
      await axios
        .post("http://13.52.16.160:8082/client/milestone_file", data)
        .then((res) => {
          setsubmitLoader(false);
          if (res?.data?.status === "Success") {
            handalClose();
            setsubmitLoader(false);
          }
        });
    } else {
      setsubmitLoader(false);
      setError("file required");
    }
  };

  const handalViewReason = (res) => {
    setIsReason(true);
    setReason(res?.decline_reason);
  };

  const handalBack = () => {
    navigate(-1);
  };

  const handalDownload = (paylaod) => {
    axios
      .post("http://13.52.16.160:8082/professional/milestone/download/", {
        user_id: cookies?.user_data?.user_id,
        user_token: cookies?.user_data?.user_token,
        role: "professional",
        project_id: paylaod?.project_id,
        milestone_id: paylaod?.milestone_id,
      })
      .then((result) => {
        const url = result.data?.data?.file;
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", url.split("/")[5]); // you can set the filename here
        document.body.appendChild(link);
        link.click();
      });
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
                    <h3 className="theme-text-color d-flex fs-24 mb-5">
                      <button
                        className="text-decoration-none text-dark m-0 backbuttonActive"
                        onClick={handalBack}
                      >
                        <i
                          className="fa-solid fa-arrow-left-long pe-3"
                          style={{ color: "#01a78a" }}
                        ></i>
                      </button>
                      <span>Project Details</span>
                    </h3>

                    <div className="row">
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">1</div>
                        <h5>Project Name:</h5>
                        <p className="m-0 ms-3">{curProject?.project_name}</p>
                      </div>
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">2</div>
                        <h5>Client Name :</h5>
                        <p className="m-0 ms-3">{curProject?.client_name}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">3</div>
                        <h5>Estimated Area:</h5>
                        <p className="m-0 ms-3">{curProject?.area}</p>
                      </div>
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">4</div>
                        <h5>Estimated Budget:</h5>
                        <p className="m-0 ms-3">$ {curProject?.project_cost}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">5</div>
                        <h5>Project Status:</h5>
                        <p className="m-0 ms-3">{curProject?.project_status}</p>
                      </div>
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">6</div>
                        <h5>Estimated Deadline: </h5>
                        <p className="m-0 ms-3">{curProject?.estimated_time}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">7</div>
                        <h5>Project File: </h5>
                        <a href={curProject?.attachment} download>
                          View File
                        </a>
                      </div>
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">8</div>
                        <h5>Work Assigned: </h5>
                        <p className="m-0 ms-3">{curProject?.work_assigned}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl  my-3 align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="project-details">9</div>
                          <h5>Project Description: </h5>
                        </div>
                        <br />
                        <p className="m-0 ms-3 ">
                          {showText ? (
                            <div>{curProject?.description}</div>
                          ) : (
                            <div>
                              {curProject?.description?.substring(0, 212)}
                            </div>
                          )}
                          {curProject?.description?.length > 100 ? (
                            !showText ? (
                              <span
                                onClick={handleShowMore}
                                style={{
                                  color: "#01a78a",
                                  marginTop: "10px",
                                  textDecoration: "underline",
                                  cursor: "pointer",
                                  // backgroundColor: "#0F9E83",
                                }}
                              >
                                Show More
                              </span>
                            ) : (
                              <span
                                onClick={handleShowLess}
                                style={{
                                  marginTop: "10px",
                                  cursor: "pointer",
                                  textDecoration: "underline",

                                  color: "#01a78a",
                                  // backgroundColor: "#0F9E83",
                                }}
                              >
                                Show Less
                              </span>
                            )
                          ) : null}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="projectMilestoneInfo">
                <h3 className="theme-text-color fs-24 mt-5 mb-4">Milestone</h3>
                {milestone?.map((res, i) => (
                  <div className="milestoneBox row" key={i}>
                    <div className=" d-block  ">
                      <div className="row">
                        <div className="col-4 col-xl-2">
                          <p className="headingMile">Name</p>
                          <p>{res?.milestone_name}</p>
                        </div>
                        <div className="col-4 col-xl-2 ">
                          <p className="headingMile">Date</p>
                          <div className="mileStoneDate ">
                            {res?.milestone_date}
                          </div>{" "}
                        </div>
                        <div className="col-4 col-xl-2">
                          <p className="headingMile">Cost </p>
                          <p>{res?.milestone_amount_percent} %</p>
                        </div>
                        <div className="uploadMileStoneof col-xl-6 resMile">
                          {res?.status === "pending" && (
                            <div
                              className="uploadMileStonefo"
                              onClick={() => {
                                handalshow(res);
                              }}
                            >
                              Upload
                            </div>
                          )}
                          {(res?.status === "updated" ||
                            res?.status === "downloaded" ||
                            res?.status === "uploaded") && (
                            <div className="pendingMileStone">Pending</div>
                          )}

                          {(res?.status === "accepted" ||
                            res?.status === "completed") && (
                            <div className="pendingMileStone pendingMileStone1">
                              Completed
                            </div>
                          )}

                          {res?.status === "decline" && (
                            <>
                              <button
                                title="Decline Reason"
                                className="mileStoneDate decline"
                                onClick={() => handalViewReason(res)}
                              >
                                <AiOutlineInfoCircle />
                              </button>
                              <div
                                className="update"
                                style={{ cursor: "pointer" }}
                                onClick={() => handalshow(res)}
                              >
                                Update
                              </div>
                            </>
                          )}
                          {res?.status !== "pending" && (
                            <div
                              className="uploadMileStonefo"
                              onClick={() => {
                                handalDownload(res);
                              }}
                            >
                              Download
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div style={{ marginTop: "20px" }} className="row">
                      <div className="col-10">
                        <p className="headingMile">MileStone Description:</p>
                        <div className="milestonedes row">
                          <div>
                            {" "}
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
                          </div>

                          {/* {res?.milestone_descriptio > 200?<p>{res?.milestone_description}</p>:null}
                        {showText?<button>Read more</button>:
                        <button>Read less</button>} */}
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <p>
                          <a
                            className="viewFile"
                            target="new"
                            href={res?.milestone_attachment}
                            download
                          >
                            View File{" "}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {/* <BackButton customclassName="mx-auto d-block mt-4" text="Back" /> */}
              </section>
            </div>
          </div>
        </div>
      </main>

      <Modal
        show={show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handalClose}
        className="modalProfessionalDashboard"
      >
        <Modal.Header
          closeButton
          style={{ margin: "0 0 0 auto" }}
          className="border-0"
        ></Modal.Header>
        <Modal.Body>
          <p className="text-center" style={{ fontSize: "24px" }}>
            Upload Zip
          </p>
          <form onSubmit={handleMilestoneUpdate}>
            <div className="row">
              <div className="">
                <div className="col pe-0">
                  <div className="d-flex imageDropBoxDashboardProfessional align-items-center">
                    <button className="w-100" type="button">
                      <span className="ps-2">Upload Zip</span>
                    </button>
                    <p className="ps-4">{file[0]?.name}</p>
                    <input
                      type="file"
                      style={{ cursor: "pointer" }}
                      accept=".zip,.rar,.7zip"
                      name="project"
                      onChange={handalchage}
                    />
                  </div>
                </div>
                <div style={{ color: "red" }}> {error}</div>

                <div className="text-center">
                  <button
                    type={submitLoader ? "button" : "submit"}
                    disabled={submitLoader ? true : false}
                    className="ModalCategorySubmit text-center"
                  >
                    {submitLoader ? <ReactLotti3 /> : "Upload"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* reason  */}
      <Modal
        centered
        show={isReason}
        onHide={() => {
          setIsReason(false);
          setReason("");
        }}
      >
        <Modal.Header>
          <Modal.Title>
            <p>{reason}</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <div className="text-center">
            <Button
              className="theme-bg-color border-0"
              onClick={() => {
                setIsReason(false);
                setReason("");
              }}
            >
              ok
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </div>
  );
};

export default FromProfessionalTabPane;
