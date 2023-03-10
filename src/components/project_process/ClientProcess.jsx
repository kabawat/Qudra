import React, { useContext } from "react";
import axios from "axios";
import { Header2 } from "../Header";
import Global from "../../context/Global";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../../Hooks/useWindowSize";
const ClientProcess = ({ location }) => {
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const contextData = useContext(Global);
  const customStyleOne = {
    borderRadius: "30px",
    filter: "drop-shadow(2.5px 4.33px 6.5px rgba(0,0,0,0.2))",
    padding: "100px 0",
  };
  const handleClientDecesion = (req) => {
    axios
      .post("http://13.52.16.160:8082/client/approve_projects", {
        client_id: contextData?.userData?.user_id,
        user_token: contextData?.userData?.user_token,
        professional_id: location?.state?.projectDetails?.client_id,
        role: "client",
        project_id: location?.state?.projectDetails?.client_project_id,
        project_approval_status: req,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          navigate("/clientdashboard");
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
                  <div className="milestoneBox">
                    <p>{res?.milestone_name}</p>
                    <button>{res?.milestone_date}</button>
                  </div>
                ))}
                <div className="row mt-sm-5 mt-3 g-sm-3 g-3">
                  <div className="col-sm">
                    <button
                      onClick={() => {
                        handleClientDecesion("declined");
                      }}
                      style={{
                        width: "max-content",
                        padding: "10px 65px",
                        border: "2px solid",
                        borderRadius: "50px",
                        display: "block",
                      }}
                      type="button"
                      className={`theme-text-color bg-white   ${
                        windowSize?.width > 576 ? "ms-auto" : "mx-auto"
                      }`}
                    >
                      <i className="fa-solid  fa-arrow-left-long me-3"></i>
                      Decline
                    </button>
                  </div>
                  <div className="col-sm">
                    <button
                      onClick={() => {
                        handleClientDecesion("approved");
                      }}
                      type="button"
                      style={{
                        width: "max-content",
                        padding: "10px 65px",
                        border: "2px solid",
                        borderRadius: "50px",
                        display: "block",
                      }}
                      className={`theme-bg-color text-white   ${
                        windowSize?.width > 576 ? "me-auto" : "mx-auto"
                      }`}
                    >
                      Accept
                      <i className="fa-solid  fa-arrow-right-long ms-3"></i>
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientProcess;
