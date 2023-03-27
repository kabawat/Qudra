import React, { useState, useEffect, useContext } from "react";
import Global from "../../../context/Global";
import axios from "axios";
import { CiLocationOn } from "react-icons/ci";
import Pagination from "react-bootstrap/Pagination";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../Footer";
import { HeaderDashboard } from "../../Header";
import ClientDashboardAside from "../../ClientDashboardAside";

const CompletedPane = () => {
  const navigate = useNavigate();
  const contextData = useContext(Global);
  const [completedProject, setCompletedProject] = useState([]);
  const [completedProjectPageId, setCompletedProjectPageId] = useState({
    page: 1,
    page_size: 5,
  });
  useEffect(() => {
    axios
      .post("http://13.52.16.160:8082/identity/filter_projects", {
        user_id: contextData?.userData?.user_id,
        user_token: contextData?.userData?.user_token,
        role: contextData?.userData?.role,
        project_status: "completed",
        ...completedProjectPageId,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          setCompletedProject(res?.data?.data);
        }
      });
  }, [completedProjectPageId]);

  const completedProjectArray = [];
  for (
    let i = 0;
    i < completedProject?.total_data / completedProjectPageId?.page_size;
    i++
  ) {
    completedProjectArray.push(i + 1);
  }
  const handleProjectNameClick = (client_id, project_id) => {
    axios
      .post("http://13.52.16.160:8082/client/particular_project_milestones", {
        user_token: contextData?.userData?.user_token,
        role: contextData?.userData?.role,
        client_id: contextData?.userData?.user_id,
        project_id: project_id,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          navigate("/project-details", {
            state: { isFromDashboard: true, milesStoneData: res?.data?.data },
          });
        }
      });
  };

  return (
    <>
      <div className="dashboard">
        <div className="container-fluid h-100">
          <div className="row h-100 dashboard-theme-color">
            <div className="col-xxl-2 col-md-3 px-0 dashboard-theme-color">
              <ClientDashboardAside />
            </div>
            <div className="col-xxl-10 col-md-9 custom-border-radius-one dashboard-theme-skyblue px-0 dashboard-right-section">
              <HeaderDashboard />
              <main className="dashboard-main">
                <div id="myactivity" className="container-fluid  myProjectTable">
                  <h2 className="ps-5">Completed Projects</h2>

                  <div className="m-5 shadow">
                    {completedProject?.final_data?.length ? (
                      completedProject?.final_data.map((res, index) => (
                        <div className="row MyProjectDisplayRow" key={index}>
                          <div className="col-lg-3 col-md-6 d-flex align-items-center justify-content-center">
                            <img
                              onClick={() => {
                                navigate(`/professionalprofile/${res?.professional_id}`);
                              }}
                              src={res?.professional_image}
                              className="img-fluid rounded-circle"
                              style={{ width: "70px", height: "70px", cursor: "pointer" }}
                              alt={res?.professional_name}
                            />
                            <div className="ps-3">
                              <h4
                                className="underline_hover"
                                onClick={() => {
                                  navigate(
                                    `/professionalprofile/${res?.professional_id}`
                                  );
                                }}
                              >
                                {res?.professional_name}
                              </h4>
                              <h6>
                                <CiLocationOn />
                                {res?.location}
                              </h6>
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center justify-content-center">
                            <div>
                              <h5>Project Name</h5>
                              <h4
                                className="underline_hover"
                                onClick={() => {
                                  if (res?.project_status === "accepted") {
                                    handleProjectNameClick(
                                      res?.professional_id,
                                      res?.project_id
                                    );
                                  }
                                  if (res?.project_status === "pending") {
                                    toast(
                                      " Your Acceptance And Project Milestone is still Pending ❕",
                                      {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "colored",
                                      }
                                    );
                                  }
                                }}
                              >
                                {res?.project_name}
                              </h4>
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6 ">
                            <div className="row">
                              <div className="col-md d-flex flex-column align-items-center justify-content-center">
                                <div>
                                  <h5>Status</h5>
                                  <h4>{res?.project_status}</h4>
                                </div>
                              </div>
                              <div className="col-md d-flex flex-column align-items-center justify-content-center">
                                <div>
                                  <h5>Total Budget</h5>
                                  <h4>${res?.project_cost}</h4>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6 d-flex flex-column align-items-center justify-content-center">
                            <div>
                              <h5>Area</h5>
                              <h4>{res?.area} square meter</h4>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div
                        style={{ minHeight: "600px" }}
                        className="d-flex justify-content-center align-items-center"
                      >
                        <span className="h4">No Completed Projects To Show</span>
                      </div>
                    )}
                  </div>
                  {completedProject?.final_data?.length ? (
                    <Pagination className="ps-5 paginationBoxProfessionalDashboard">
                      <Pagination.First
                        onClick={() => {
                          setCompletedProjectPageId({
                            page: 1,
                            page_size: 5,
                          });
                        }}
                      />
                      <Pagination.Prev
                        onClick={() => {
                          setCompletedProjectPageId((prev) => ({
                            ...prev,
                            page:
                              completedProjectPageId?.page !== 1
                                ? completedProjectPageId?.page - 1
                                : 1,
                          }));
                        }}
                      />
                      {completedProjectArray?.map((res, key) => (
                        <Pagination.Item
                          key={key}
                          active={completedProjectPageId?.page === res}
                          onClick={() => {
                            setCompletedProjectPageId((prev) => ({
                              ...prev,
                              page: res,
                            }));
                          }}
                        >
                          {res}
                        </Pagination.Item>
                      ))}
                      <Pagination.Next
                        onClick={() => {
                          setCompletedProjectPageId((prev) => ({
                            ...prev,
                            page:
                              completedProjectArray?.length !==
                                completedProjectPageId?.page
                                ? completedProjectPageId?.page + 1
                                : completedProjectPageId?.page,
                          }));
                        }}
                      />
                      <Pagination.Last
                        onClick={() => {
                          setCompletedProjectPageId((prev) => ({
                            ...prev,
                            page: completedProjectArray?.length,
                          }));
                        }}
                      />
                    </Pagination>
                  ) : (
                    ""
                  )}
                </div>
                <ToastContainer
                  position="top-center"
                  autoClose={3000}
                  hideProgressBar={true}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                  toastStyle={{ backgroundColor: "red", color: "white" }}
                />
              </main>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default React.memo(CompletedPane);
