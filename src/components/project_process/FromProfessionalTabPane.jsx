import React, { useState, useContext } from "react";
import { Header2 } from "../Header";
import BackButton from "../Button/BackButton";
import styled from "styled-components";
import Global from "../../context/Global";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  .mileStoneDate {
    padding: 10px 10px;
    width: 110px;
    background: white;
    border: 2px solid #01a78a;
  }
  div.uploadMileStone {
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
  const contextData = useContext(Global);

  const customStyleOne = {
    borderRadius: "30px",
    filter: "drop-shadow(2.5px 4.33px 6.5px rgba(0,0,0,0.2))",
    padding: "100px 0",
  };
  const handleMilestoneUpdate = async (e, milestone_id) => {
    const data = new FormData();
    data.append("user_id", contextData?.userData?.user_id);
    data.append("user_token", contextData?.userData?.user_token);
    data.append("role", contextData?.userData?.role);
    data.append("project_id", location?.state?.projectDetails?.project_id);
    data.append("milestone_id", milestone_id);
    data.append("milestone_file", e.target.files[0]);
    await axios
      .post("http://13.52.16.160:8082/client/milestone_file", data)
      .then((res) => {
        if (res?.data?.status === "Success") {
          toast.success("Successfully uploaded file!", {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
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
                    <h3 className="theme-text-color fs-24 mb-5">
                      <span><Link to={contextData?.userData?.role === "client" ? "/clientdashboard" : "/myactivity"}
                        className="text-decoration-none text-dark m-0 h2">
                        <i class="fa-solid fa-arrow-left-long pe-3" style={{ color: "#01a78a" }}></i>
                      </Link>
                      </span>
                      Project Details
                    </h3>

                    <div className="row">
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">1</div>
                        <h5>Project Name:</h5>
                        <p className="m-0 ms-3">
                          {location?.state?.projectData?.project_name}
                        </p>
                      </div>
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">2</div>
                        <h5>Professional Name :</h5>
                        <p className="m-0 ms-3">
                          {location?.state?.projectData?.professional_name}
                        </p>
                      </div>
                    </div>
                    <div className="row my-xxl-5">
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">3</div>
                        <h5>Estimated Area:</h5>
                        <p className="m-0 ms-3">
                          {location?.state?.projectData?.area}
                        </p>
                      </div>
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">4</div>
                        <h5>Estimated Budget:</h5>
                        <p className="m-0 ms-3">
                          {location?.state?.projectData?.project_cost}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">5</div>
                        <h5>Project Status:</h5>
                        <p className="m-0 ms-3">
                          {location?.state?.projectData?.project_status}
                        </p>
                      </div>
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">6</div>
                        <h5>Estimated Deadline:</h5>
                        <p className="m-0 ms-3">
                          {location?.state?.projectData?.estimated_time}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="projectMilestoneInfo">
                <h3 className="theme-text-color fs-24 mt-5 mb-4">Milestone</h3>
                {location?.state?.milesStoneData?.map((res, index) => (
                  <Wrapper className="milestoneBox" key={index}>
                    <p>{res?.milestone_name}</p>
                    <div className="buttonAndDateMain">
                      <div className="mileStoneDate">{res?.milestone_date}</div>
                      <div className="uploadMileStone">
                        Upload
                        <input
                          type="file"
                          onChange={(e) =>
                            handleMilestoneUpdate(e, res?.milestone_id)
                          }
                        />
                      </div>
                    </div>
                  </Wrapper>
                ))}
                <BackButton customclassName="mx-auto d-block mt-4" text="Back" />
              </section>
            </div>
          </div>
        </div >
      </main >
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
