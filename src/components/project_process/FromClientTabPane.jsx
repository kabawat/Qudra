import React, { useContext, useState } from "react";
import { Header2 } from "../Header";
import BackButton from "../Button/BackButton";
import styled from "styled-components";
import axios from "axios";
import Global from "../../context/Global";
import { Modal } from "react-bootstrap";
import FileViewer from "react-file-viewer";
const FromClientTabPane = ({ location }) => {
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
        border: 2px solid #01a78a;
        padding: 10px;
      }
      .prewviewButton {
        position: static !important;
        pointer-events: all !important;
      }
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
  const [show, setShow] = useState(false);
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
                {location?.state?.milesStoneData?.map((res) => (
                  <Wrapper className="milestoneBox">
                    <p>{res?.milestone_name}</p>
                    <div className="preview">
                      <div className="date"> {res?.milestone_date}</div>
                      <button
                        className="prewviewButton"
                        onClick={() =>
                          handlePreviewData(
                            res?.milestone_id,
                            location?.state?.projectDetails?.project_id,
                            "preview"
                          )
                        }
                      >
                        Preview
                      </button>
                    </div>
                  </Wrapper>
                ))}
                <BackButton customclassName="mx-auto d-block mt-4" text="Back" />
              </section>
            </div>
          </div>
        </div>
      </main>
      <Modal show={show} onHide={() => setShow(false)} animation={false}>
        {/* <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <FileViewer
            fileType={"jfif"}
            filePath={
              "http://13.52.16.160:8082/media/project_milestones/Commercial--Offices3.jfif"
            }
          />
        </Modal.Body> */}
      </Modal>
    </div>
  );
};

export default FromClientTabPane;
