import React, { useState, useEffect, useContext } from "react";
import Global from "../../../context/Global";
import axios from "axios";
import { BsSearch, BsFillSuitHeartFill } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "react-bootstrap/Pagination";

import { HeaderDashboard } from "../../Header";
import Dashboardside from "../../ProfessionalDashboardside";
import { useCookies } from "react-cookie";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const RequestProject = () => {
  const contextData = useContext(Global);
  const navigate = useNavigate();
  const [myProject, setMyProject] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [searchProject, setSearchProject] = useState();
  const [searchActiveProject, setSearchActiveProject] = useState();
  const [myProjectPageId, setMyProjectPageId] = useState({
    page: 1,
    page_size: 5,
  });
  const [searchProjectPageId, setSearchProjectPageId] = useState({
    page: 1,
    page_size: 5,
  });

  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies();

  useEffect(() => {
    if (cookies?.user_data) {
      axios
        .post("http://13.52.16.160:8082/identity/filter_projects", {
          user_id: cookies?.user_data?.user_id,
          user_token: cookies?.user_data?.user_token,
          role: cookies?.user_data?.role,
          project_status: "pending",
          ...myProjectPageId,
        })
        .then((res) => {
          if (res?.data?.status === "Success") {
            setMyProject(res?.data?.data);
            if (cookies?.user_data?.category_selected) {
              if (cookies?.user_data.role === "professional") {
                setLoading(true);
              } else {
                navigate("/clientdashboard");
              }
            } else {
              if (cookies?.user_data.role === "professional") {
                navigate("/categoryArchitecture");
              } else {
                navigate("/client-architechture");
              }
            }
          }
        });
    } else {
      navigate("/select-sign-in");
    }
  }, [myProjectPageId]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [myProjectPageId]);
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleFilterProject = (e) => {
    e.preventDefault();
    axios
      .post("http://13.52.16.160:8082/identity/search_projects", {
        user_id: cookies?.user_data?.user_id,
        user_token: cookies?.user_data?.user_token,
        role: cookies?.user_data?.role,
        search_status: "pending",
        search: searchActiveProject || "",
        ...searchProjectPageId,
      })
      .then((res) => {
        if (res?.data?.status === "Failed") {
          setNoResult(true);
        } else {
          setSearchProject(res?.data?.data);
        }
      });
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const paginationArray = [];
  for (let i = 0; i < myProject?.total_data / myProjectPageId?.page_size; i++) {
    paginationArray.push(i + 1);
  }

  const paginationSearchArray = [];
  for (
    let i = 0;
    i < searchProject?.total_data / searchProjectPageId?.page_size;
    i++
  ) {
    paginationSearchArray.push(i + 1);
  }
  useEffect(() => {
    searchActiveProject && setSearchProject();
  }, [searchActiveProject]);

  const handleClientAcceptation = (id, project_id) => {
    axios
      .post("http://13.52.16.160:8082/client/particular_project_milestones", {
        client_id: id,
        user_token: cookies?.user_data?.user_token,
        role: cookies?.user_data?.role,
        professional_id: cookies?.user_data?.user_id,
        project_id: project_id,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          axios
            .post(
              "http://13.52.16.160:8082/client/particular_project_details",
              {
                client_id: id,
                professional_id: cookies?.user_data?.user_id,
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
                      isFromProfessionalTab: true,
                      client_id: id,
                    },
                  });
                }
              }
            });
        }
      });
  };

  const handlePendingRequest = (client_id, project_id) => {
    axios
      .post("http://13.52.16.160:8082/client/particular_project_details", {
        professional_id: cookies?.user_data?.user_id,
        user_token: cookies?.user_data?.user_token,
        role: cookies?.user_data?.role,
        client_id: client_id,
        project_id: project_id,
      })
      .then((respo) => {
        if (respo?.data?.status === "Success") {
          navigate("/project-details", {
            state: {
              projectData: respo?.data?.data,
              client_id: client_id,
              client_project_id: project_id,
              isFromProfessionalNotification: true,
            },
          });
        }
      });
  };
  return (
    <>
      <div className="dashboard">
        <div className="container-fluid h-100">
          <div className="row h-100 dashboard-theme-color">
            <div className="col-xxl-2 col-md-3 col-lg-3 px-0 dashboard-theme-color">
              <Dashboardside />
            </div>
            <div className="col-xxl-10 col-md-9 col-lg-9 custom-border-radius-one  dashboard-theme-skyblue px-0 dashboard-right-section">
              <HeaderDashboard />
              {!loading ? (
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={!loading}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              ) : (
                <main className="dashboard-main">
                  <div
                    id="myactivity"
                    className="container-fluid  myProjectTable"
                  >
                    <h2 className="ps-5">Project Requests From Client</h2>
                    <div className="m-xl-5 shadow">
                      {searchProject?.final_data.length ||
                      myProject?.final_data?.length ? (
                        <div className="row align-items-center MyProjectDisplayRow">
                          <div className="searchActiveProject col-md-4 ms-auto">
                            <form onSubmit={handleFilterProject}>
                              <input
                                type="text"
                                value={searchActiveProject}
                                onChange={(e) => {
                                  setSearchActiveProject(e?.target?.value);
                                  setNoResult(false);
                                }}
                                placeholder="Search via client or project name"
                              />
                              <button type="submit">
                                <BsSearch />
                              </button>
                            </form>
                          </div>
                        </div>
                      ) : (
                        <div
                          style={{ minHeight: "600px" }}
                          className="d-flex w-100 justify-content-center align-items-center"
                        >
                          <span className="h4">
                            No Requested Projects To Show
                          </span>
                        </div>
                      )}
                      {noResult ? (
                        <div
                          style={{ minHeight: "600px" }}
                          className="d-flex w-100 justify-content-center align-items-center"
                        >
                          <span className="h4">No Result Found</span>
                        </div>
                      ) : searchProject?.final_data ? (
                        searchProject?.final_data?.map((res, index) => (
                          <div className="row MyProjectDisplayRow" key={index}>
                            <div className="col-lg-3 d-flex align-items-center ">
                              <img
                                src={res?.client_image}
                                className="img-fluid rounded-circle"
                                style={{ width: "70px", height: "70px" }}
                                alt={res?.client_name}
                              />
                              <div className="ps-3">
                                <h4>{res?.client_name}</h4>
                                <h6>
                                  <CiLocationOn />
                                  {res?.location}
                                </h6>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 d-flex  align-items-center ">
                              <div>
                                <h5>Project Name</h5>
                                <h4
                                  className="underline_hover"
                                  style={{ textTransform: "capitalize" }}
                                  onClick={() => {
                                    if (res?.project_status === "approved") {
                                      handleClientAcceptation(
                                        res?.client_id,
                                        res?.project_id
                                      );
                                    } else if (
                                      res?.project_status === "accepted"
                                    ) {
                                      toast(
                                        "Client approval is still Pending ❕",
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
                                    } else {
                                      handlePendingRequest(
                                        res?.client_id,
                                        res?.project_id
                                      );
                                    }
                                  }}
                                >
                                  {res?.project_name}
                                </h4>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6  d-flex  align-items-center ">
                              <div>
                                <h5>Status</h5>
                                <h4 style={{ textTransform: "capitalize" }}>
                                  {res?.project_status}
                                </h4>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6  d-flex  align-items-center ">
                              <div>
                                <h5>Total Budget</h5>
                                <h4>${res?.project_cost}</h4>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 d-flex  align-items-center ">
                              <div>
                                <h5>Area</h5>
                                <h4>{res?.area} square meter</h4>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        myProject?.final_data?.map((res, index) => (
                          <div className="row MyProjectDisplayRow" key={index}>
                            <div className="col-lg-3 d-flex align-items-center ">
                              <img
                                src={res?.client_image}
                                className="img-fluid rounded-circle"
                                style={{ width: "70px", height: "70px" }}
                                alt={res?.client_name}
                              />
                              <div className="ps-3">
                                <h4 style={{ textTransform: "capitalize" }}>
                                  {res?.client_name}
                                </h4>
                                <h6>
                                  <CiLocationOn />
                                  {res?.location}
                                </h6>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 d-flex  align-items-center ">
                              <div>
                                <h5>Project Name</h5>
                                <h4
                                  style={{ textTransform: "capitalize" }}
                                  className="underline_hover"
                                  onClick={() => {
                                    if (res?.project_status === "approved") {
                                      handleClientAcceptation(
                                        res?.client_id,
                                        res?.project_id
                                      );
                                    } else if (
                                      res?.project_status === "accepted"
                                    ) {
                                      toast(
                                        "Client approval is still Pending ❕",
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
                                    } else {
                                      handlePendingRequest(
                                        res?.client_id,
                                        res?.project_id
                                      );
                                    }
                                  }}
                                >
                                  {res?.project_name}
                                </h4>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 d-flex  align-items-center ">
                              <div>
                                <h5>Status</h5>
                                <h4 style={{ textTransform: "capitalize" }}>
                                  {res?.project_status}
                                </h4>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 d-flex  align-items-center ">
                              <div>
                                <h5>Total Budget</h5>
                                <h4>${res?.project_cost}</h4>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6 d-flex  align-items-center ">
                              <div>
                                <h5>Area</h5>
                                <h4>{res?.area} square meter</h4>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {!searchActiveProject &&
                    searchProjectPageId?.page_size <
                      searchProject?.total_data ? (
                      <Pagination className="ps-5 paginationBoxProfessionalDashboard">
                        <Pagination.First
                          onClick={() => {
                            setSearchProjectPageId({
                              page: 1,
                              page_size: 10,
                            });
                          }}
                        />
                        <Pagination.Prev
                          onClick={() => {
                            setSearchProjectPageId((prev) => ({
                              ...prev,
                              page:
                                searchProjectPageId?.page !== 1
                                  ? searchProjectPageId?.page - 1
                                  : 1,
                            }));
                          }}
                        />
                        {paginationSearchArray?.map((res, key) => (
                          <Pagination.Item
                            key={key}
                            active={searchProjectPageId?.page === res}
                            onClick={() => {
                              setSearchProjectPageId((prev) => ({
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
                            setSearchProjectPageId((prev) => ({
                              ...prev,
                              page:
                                paginationSearchArray?.length !==
                                searchProjectPageId?.page
                                  ? searchProjectPageId?.page + 1
                                  : searchProjectPageId?.page,
                            }));
                          }}
                        />
                        <Pagination.Last
                          onClick={() => {
                            setSearchProjectPageId((prev) => ({
                              ...prev,
                              page: paginationSearchArray?.length,
                            }));
                          }}
                        />
                      </Pagination>
                    ) : (
                      myProject &&
                      myProject?.total_data > myProjectPageId?.page_size && (
                        <Pagination className="ps-5 paginationBoxProfessionalDashboard">
                          <Pagination.First
                            onClick={() => {
                              setMyProjectPageId({
                                page: 1,
                                ...myProjectPageId,
                              });
                            }}
                          />
                          <Pagination.Prev
                            onClick={() => {
                              setMyProjectPageId((prev) => ({
                                ...prev,
                                page:
                                  myProjectPageId?.page !== 1
                                    ? myProjectPageId?.page - 1
                                    : 1,
                              }));
                            }}
                          />
                          {paginationArray?.map((res, key) => (
                            <Pagination.Item
                              key={key}
                              active={myProjectPageId?.page === res}
                              onClick={() => {
                                setMyProjectPageId((prev) => ({
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
                              setMyProjectPageId((prev) => ({
                                ...prev,
                                page:
                                  paginationArray?.length !==
                                  myProjectPageId?.page
                                    ? myProjectPageId?.page + 1
                                    : myProjectPageId?.page,
                              }));
                            }}
                          />
                          <Pagination.Last
                            onClick={() => {
                              setMyProjectPageId((prev) => ({
                                ...prev,
                                page: paginationArray?.length,
                              }));
                            }}
                          />
                        </Pagination>
                      )
                    )}
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
                  </div>
                </main>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default React.memo(RequestProject);
