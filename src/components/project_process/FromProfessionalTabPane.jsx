import React, { useState, useContext } from "react";
import { Header2 } from "../Header";
import styled from "styled-components";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { GiCancel } from "react-icons/gi";
import { useCookies } from "react-cookie";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useEffect } from "react";
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
  const [locations, setLocation] = useState(location);
  const [show, setShow] = useState(false);
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const customStyleOne = {
    borderRadius: "30px",
    filter: "drop-shadow(2.5px 4.33px 6.5px rgba(0,0,0,0.2))",
    padding: "100px 0",
  };

  useEffect(() => {
    // console.log(location.state?.projectDetails?.project_id);
    axios
      .post("http://13.52.16.160:8082/client/particular_project_milestones", {
        client_id: locations.state.projectDetails?.id,
        user_token: cookies?.user_data?.user_token,
        role: cookies?.user_data?.role,
        professional_id: cookies?.user_data?.user_id,
        project_id: location.state?.projectDetails?.project_id,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          axios
            .post(
              "http://13.52.16.160:8082/client/particular_project_details",
              {
                client_id: locations.state.projectDetails?.id,
                professional_id: cookies?.user_data?.user_id,
                user_token: cookies?.user_data?.user_token,
                role: cookies?.user_data?.role,
                project_id: location.state?.projectDetails?.project_id,
              }
            )
            .then((respo) => {
              if (respo?.data?.status === "Success") {
                setLocation({
                  state: {
                    projectDetails: { ...location?.state?.projectDetails },
                    projectData: respo?.data?.data,
                    milesStoneData: res?.data?.data,
                    isFromProfessionalTab: true,
                  },
                });
              }
            });
        }
      });
  }, []);
  const [project, setProject] = useState();
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
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
        client_id: locations.state.projectDetails?.id,
        user_token: cookies?.user_data?.user_token,
        role: cookies?.user_data?.role,
        professional_id: cookies?.user_data?.user_id,
        project_id: locations.state?.projectDetails?.project_id,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          axios
            .post(
              "http://13.52.16.160:8082/client/particular_project_details",
              {
                client_id: locations.state.projectDetails?.id,
                professional_id: cookies?.user_data?.user_id,
                user_token: cookies?.user_data?.user_token,
                role: cookies?.user_data?.role,
                project_id: project?.project_id,
              }
            )
            .then((respo) => {
              if (respo?.data?.status === "Success") {
                setLocation({
                  state: {
                    projectDetails: { ...locations?.state?.projectDetails },
                    projectData: respo?.data?.data,
                    milesStoneData: res?.data?.data,
                    isFromProfessionalTab: true,
                  },
                });
              }
            });
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
    if (file) {
      await axios
        .post("http://13.52.16.160:8082/client/milestone_file", data)
        .then((res) => {
          if (res?.data?.status === "Success") {
            handalClose();
          }
        });
    } else {
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
            <div className=" col-xxl-8 col-xl-9 col-lg-10 col-md-11 col-sm mx-auto">
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
                        <p className="m-0 ms-3">
                          {locations?.state?.projectData?.project_name}
                        </p>
                      </div>
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">2</div>
                        <h5>Client Name :</h5>
                        <p className="m-0 ms-3">
                          {locations?.state?.projectData?.client_name}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">3</div>
                        <h5>Estimated Area:</h5>
                        <p className="m-0 ms-3">
                          {locations?.state?.projectData?.area}
                        </p>
                      </div>
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">4</div>
                        <h5>Estimated Budget:</h5>
                        <p className="m-0 ms-3">
                          {locations?.state?.projectData?.project_cost}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">5</div>
                        <h5>Project Status:</h5>
                        <p className="m-0 ms-3">
                          {locations?.state?.projectData?.project_status}
                        </p>
                      </div>
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">6</div>
                        <h5>Estimated Deadline:</h5>
                        <p className="m-0 ms-3">
                          {locations?.state?.projectData?.estimated_time}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="projectMilestoneInfo">
                <h3 className="theme-text-color fs-24 mt-5 mb-4">Milestone</h3>
                {locations?.state?.milesStoneData?.map((res, index) => (
                  <Wrapper className="milestoneBox" key={index}>
                    <p>{res?.milestone_name}</p>
                    <div className="buttonAndDateMain">
                      <div className="mileStoneDate">{res?.milestone_date}</div>
                      {res?.status === "pending" && (
                        <div
                          className="uploadMileStone"
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
                        <div className="pendingMileStone">pending</div>
                      )}

                      {(res?.status === "accepted" ||
                        res?.status === "completed") && (
                        <div className="Milestone">Milestone completed</div>
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
                          className="uploadMileStone"
                          onClick={() => {
                            handalDownload(res);
                          }}
                        >
                          Download
                        </div>
                      )}
                    </div>
                  </Wrapper>
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
                  <button type="submit" className="ModalCategorySubmit">
                    Upload
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
