import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Global from "../../../context/Global";
import { useNavigate } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import Pagination from "react-bootstrap/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../Footer";
import ClientDashboardAside from "../../ClientDashboardAside";
import { HeaderDashboard } from "../../Header";
import Loader from "../../Loader";
import { useCookies } from "react-cookie";
import { BsSearch } from "react-icons/bs";
import { Backdrop, CircularProgress } from "@mui/material";

const OngoingPane = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const contextData = useContext(Global);
  const [noResult, setNoResult] = useState(false);
  const [searchActiveProject, setSearchActiveProject] = useState();
  const [onGoingProject, setOnGoingProject] = useState([]);
  const [onGoingProjectPageId, setOnGoingProjectPageId] = useState({
    page: 1,
    page_size: 5,
  });

  const [isRender, setIsReander] = useState(false);
  useEffect(() => {
    if (cookies?.user_data) {
      axios
        .post("http://13.52.16.160:8082/identity/filter_projects", {
          user_id: cookies?.user_data?.user_id,
          user_token: cookies?.user_data?.user_token,
          role: cookies?.user_data?.role,
          project_status: "approved",
          ...onGoingProjectPageId,
        })
        .then((res) => {
          if (res?.data?.status === "Success") {
            setOnGoingProject(res?.data?.data);
            if (cookies?.user_data?.category_selected) {
              if (cookies?.user_data?.role === "client") {
                setIsReander(true);
              } else {
                navigate("/professionaldashboard");
              }
            } else {
              if (cookies?.user_data?.role === "client") {
                navigate("/client-architechture");
              } else {
                navigate("/categoryArchitecture");
              }
            }
          }
        });
    } else {
      navigate("/select-sign-in");
    }
  }, [onGoingProjectPageId]);

  const onGoingProjectArray = [];
  for (
    let i = 0;
    i < onGoingProject?.total_data / onGoingProjectPageId?.page_size;
    i++
  ) {
    onGoingProjectArray.push(i + 1);
  }

  const handleClientAcceptation = (id, project_id, project_cost) => {
    axios
      .post("http://13.52.16.160:8082/client/particular_project_milestones", {
        client_id: cookies?.user_data?.user_id,
        user_token: cookies?.user_data?.user_token,
        role: cookies?.user_data?.role,
        professional_id: id,
        project_id: project_id,
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
                project_id: project_id,
              }
            )
            .then((respo) => {
              if (respo?.data?.status === "Success") {
                if (id !== undefined) {
                  navigate("/project-details", {
                    state: {
                      projectDetails: { id, project_id },
                      projectData: respo?.data?.data,
                      milesStoneData: res?.data?.data,
                      isFromClientTab: true,
                      project_cost: project_cost,
                    },
                  });
                }
              }
            });
        }
      });
  };
  const handleFilterProject = (e) => {
    e.preventDefault();
    axios
      .post("http://13.52.16.160:8082/identity/search_projects", {
        user_id: cookies?.user_data?.user_id,
        user_token: cookies?.user_data?.user_token,
        role: cookies?.user_data?.role,
        search_status: "approved",
        search: searchActiveProject || "",
        ...onGoingProjectPageId,
      })
      .then((res) => {
        if (res?.data?.status === "Failed") {
          setNoResult(true);
        } else {
          setOnGoingProject(res?.data?.data);
        }
      });
  };
  const searchData = () => {
    axios
      .post("http://13.52.16.160:8082/identity/filter_projects", {
        user_id: cookies?.user_data?.user_id,
        user_token: cookies?.user_data?.user_token,
        role: cookies?.user_data?.role,
        project_status: "approved",
        ...onGoingProjectPageId,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          setOnGoingProject(res?.data?.data);
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
              {!isRender ? (
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={!isRender}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              ) : (
                <main className="dashboard-main">
                  <div
                    id="myactivity"
                    className="container-fluid  myProjectTable"
                  >
                    <h2 className="ps-lg-5">
                      Projects Running With Professionals
                    </h2>

                    <div className="m-lg-5 shadow">
                      {onGoingProject?.final_data?.length ? (
                        <div className="row align-items-center MyProjectDisplayRow">
                          <div className="searchActiveProject col-lg-8 ms-auto">
                            <form onSubmit={handleFilterProject}>
                              <input
                                style={{ fontWeight: "bold" }}
                                type="text"
                                value={searchActiveProject}
                                onChange={(e) => {
                                  setSearchActiveProject(e?.target?.value);
                                  setNoResult(false);
                                  if (e.target.value === "") {
                                    searchData();
                                  }
                                }}
                                placeholder=" Search via project name and Professionals name"
                              />
                              <button type="submit">
                                <BsSearch />
                              </button>
                            </form>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {noResult ? (
                        <div
                          style={{ minHeight: "600px" }}
                          className="d-flex  "
                        >
                          <span className="h4">No Result Found</span>
                        </div>
                      ) : onGoingProject?.final_data?.length ? (
                        onGoingProject.final_data.map((res, index) => (
                          <div className="row MyProjectDisplayRow" key={index}>
                            <div className="col-xl-4 col-lg-12 col-md-6 p-3 d-flex align-items-center ">
                              <img
                                src={res?.professional_image}
                                className="img-fluid rounded-circle"
                                style={{
                                  width: "70px",
                                  height: "70px",
                                  cursor: "pointer",
                                }}
                                alt={res?.professional_name}
                                onClick={() => {
                                  navigate(
                                    `/professionalprofile/${res?.professional_id}`
                                  );
                                }}
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
                            <div className="col-xl-2 col-md-6 p-3 col-lg-6 d-flex  align-items-center ">
                              <div>
                                <h5>Project Name </h5>
                                <h4
                                  style={{ textTransform: "capitalize" }}
                                  className="underline_hover"
                                  onClick={() => {
                                    handleClientAcceptation(
                                      res?.professional_id,
                                      res?.project_id,
                                      res?.project_cost
                                    );
                                  }}
                                >
                                  {res?.project_name}
                                </h4>
                              </div>
                            </div>
                            <div className="col-xl-2 col-md-6 p-3 col-lg-6 d-flex  align-items-center ">
                              <div>
                                <h5>Status</h5>
                                <h4 style={{ textTransform: "capitalize" }}>
                                  {res?.project_status}
                                </h4>
                              </div>
                            </div>
                            <div className="col-xl-2 col-md-6 p-3 col-lg-6 d-flex  align-items-center ">
                              <div>
                                <h5>Total Budget</h5>
                                <h4>${res?.project_cost}</h4>
                              </div>
                            </div>
                            <div className="col-xl-2 col-md-6 p-3 col-lg-6 d-flex  align-items-center ">
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
                          className="d-grid  align-items-center"
                        >
                          <span className="h4 text-center">
                            No Ongoing Projects To Show
                          </span>
                        </div>
                      )}
                    </div>
                    {onGoingProject.final_data?.length ? (
                      onGoingProject.total_data > 5 ? (
                        <Pagination className="ps-5 paginationBoxProfessionalDashboard">
                          <Pagination.First
                            onClick={() => {
                              setOnGoingProjectPageId({
                                page: 1,
                                page_size: 5,
                              });
                            }}
                          />
                          <Pagination.Prev
                            onClick={() => {
                              setOnGoingProjectPageId((prev) => ({
                                ...prev,
                                page:
                                  onGoingProjectPageId?.page !== 1
                                    ? onGoingProjectPageId?.page - 1
                                    : 1,
                              }));
                            }}
                          />
                          {onGoingProjectArray?.map((res, key) => (
                            <Pagination.Item
                              key={key}
                              active={onGoingProjectPageId?.page === res}
                              onClick={() => {
                                setOnGoingProjectPageId((prev) => ({
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
                              setOnGoingProjectPageId((prev) => ({
                                ...prev,
                                page:
                                  onGoingProjectArray?.length !==
                                  onGoingProjectPageId?.page
                                    ? onGoingProjectPageId?.page + 1
                                    : onGoingProjectPageId?.page,
                              }));
                            }}
                          />
                          <Pagination.Last
                            onClick={() => {
                              setOnGoingProjectPageId((prev) => ({
                                ...prev,
                                page: onGoingProjectArray?.length,
                              }));
                            }}
                          />
                        </Pagination>
                      ) : null
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
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default React.memo(OngoingPane);
