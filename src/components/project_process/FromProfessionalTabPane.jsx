import React, { useState, useContext } from "react";
import { Header2 } from "../Header";
import styled from "styled-components";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { GiCancel } from 'react-icons/gi'
import { useCookies } from "react-cookie";
const Wrapper = styled.div`
  .mileStoneDate {
    padding: 10px 10px;
    width: 110px;
    background: white;
    border: 2px solid #01a78a;
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
`;

const FromProfessionalTabPane = ({ location }) => {
  const [locations, setLocation] = useState(location)
  const [show, setShow] = useState(false)
  const [cookies] = useCookies()
  const customStyleOne = {
    borderRadius: "30px",
    filter: "drop-shadow(2.5px 4.33px 6.5px rgba(0,0,0,0.2))",
    padding: "100px 0",
  };

  const [project, setProject] = useState()
  const [file, setFile] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const handalshow = (res) => {
    setProject(res)
    setShow(true)
  }
  const handalchage = (event) => {
    setError('')
    setFile(event.target.files)
  }

  const handalClose = () => {
    setFile('')
    setError('')
    setShow(false)
    axios.post("http://13.52.16.160:8082/client/particular_project_milestones", {
      client_id: locations.state.projectDetails?.id,
      user_token: cookies?.user_data?.user_token,
      role: cookies?.user_data?.role,
      professional_id: cookies?.user_data?.user_id,
      project_id: project?.project_id,
    }).then((res) => {
      if (res?.data?.status === "Success") {
        axios.post(
          "http://13.52.16.160:8082/client/particular_project_details",
          {
            client_id: locations.state.projectDetails?.id,
            professional_id: cookies?.user_data?.user_id,
            user_token: cookies?.user_data?.user_token,
            role: cookies?.user_data?.role,
            project_id: project?.project_id,
          }
        ).then((respo) => {
          if (respo?.data?.status === "Success") {
            setLocation({
              state: {
                projectDetails: { ...locations?.state?.projectDetails },
                projectData: respo?.data?.data,
                milesStoneData: res?.data?.data,
                isFromProfessionalTab: true,
              },
            })
          }
        });
      }
    });
  }

  const handleMilestoneUpdate = async (event) => {
    event.preventDefault()
    const data = new FormData();
    data.append("user_id", cookies?.user_data?.user_id);
    data.append("user_token", cookies?.user_data?.user_token);
    data.append("role", cookies?.user_data?.role);
    data.append("project_id", project?.project_id);
    data.append("milestone_id", project?.milestone_id);
    data.append("milestone_file", file[0]);
    if (file) {
      await axios.post("http://13.52.16.160:8082/client/milestone_file", data).then((res) => {
        if (res?.data?.status === "Success") {
          handalClose()
        }
      });
    } else {
      setError('file required')
    }
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
                    <h3 className="theme-text-color fs-24 mb-5">
                      <span><Link to={cookies?.user_data?.role === "client" ? "/clientdashboard" : "/myactivity"}
                        className="text-decoration-none text-dark m-0 h2">
                        <i className="fa-solid fa-arrow-left-long pe-3" style={{ color: "#01a78a" }}></i>
                      </Link>
                      </span>
                      Project Details
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
                        <h5>Professional Name :</h5>
                        <p className="m-0 ms-3">
                          {locations?.state?.projectData?.professional_name}
                        </p>
                      </div>
                    </div>
                    <div className="row my-xxl-5">
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
                      {
                        res?.status === "pending" && (
                          <div className="uploadMileStone"
                            onClick={() => {
                              handalshow(res)
                            }}
                          >Upload</div>
                        )
                      }
                      {
                        res?.status === "accepted" && (
                          <div className="uploadMileStone" >
                            Milestone complated
                          </div>
                        )
                      }
                      {
                        res?.status === "decline" && (
                          <label htmlFor={`id${index}`} className="uploadMileStone" >
                            Update
                            <input type="file" id={`id${index}`} accept="application/zip" style={{ display: 'none' }}
                              onChange={(e) => handleMilestoneUpdate(e, res?.milestone_id)} />
                          </label>
                        )
                      }
                      {
                        res?.status === "updated" && (
                          <div className="uploadMileStone" >pending</div>
                        )
                      }
                      {
                        res?.status === "uploaded" && (
                          <div className="uploadMileStone" >pending</div>
                        )
                      }
                      {
                        res?.status === "downloaded" && (
                          <div className="uploadMileStone" >pending</div>
                        )
                      }

                    </div>
                  </Wrapper>
                ))}
                {/* <BackButton customclassName="mx-auto d-block mt-4" text="Back" /> */}
              </section>
            </div>
          </div>
        </div >
      </main >

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
          <p className="text-center" style={{ fontSize: '24px' }}>Upload Zip</p>
          <form onSubmit={handleMilestoneUpdate}>
            <div className="row">
              <div className="">
                <div className="col pe-0">
                  <div className="d-flex imageDropBoxDashboardProfessional align-items-center">
                    <button className="w-100" type="button">
                      <span className="ps-2">Upload Zip</span>
                    </button>
                    <p className="ps-4">
                      {file[0]?.name}
                    </p>
                    <input type="file" accept=".zip,.rar,.7zip" name="project"
                      onChange={handalchage} />
                  </div>
                </div>
                <div style={{ color: 'red' }}> {error}</div>

                <div className="text-center">
                  <button type="submit" className="ModalCategorySubmit" >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
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
    </div >
  );
};

export default FromProfessionalTabPane;
