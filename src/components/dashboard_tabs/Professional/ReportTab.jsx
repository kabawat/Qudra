import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../Footer";
import { HeaderDashboard } from "../../Header";
import Dashboardside from "../../ProfessionalDashboardside";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { CiLocationOn } from "react-icons/ci";
import Pagination from "react-bootstrap/Pagination";
import { useLocation, useHistory } from "react-router-dom";

function ReportTab() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const [report, setReport] = useState([]);

  const [myProject, setMyProject] = useState([]);
  const [noResult, setNoResult] = useState(false);

  const navigate = useNavigate();
  const [myProjectPageId, setMyProjectPageId] = useState({
    page: 1,
    page_size: 5,
  });
  const [cookies] = useCookies();

  useEffect(() => {
    if (cookies?.user_data) {
      axios
        .post("http://13.52.16.160:8082/professional/project_report_details/", {
          user_id: cookies?.user_data?.user_id,
          user_token: cookies?.user_data?.user_token,
          ...myProjectPageId,
        })
        .then((res) => {
          if (res?.data?.status === "Success") {
            // setLoading(true);
            setReport(res?.data?.data);
            setMyProject(res?.data?.data);
          }
        });
    }
  }, [myProjectPageId]);
  // console.log(report);
  const paginationArray = [];
  for (let i = 0; i < myProject?.total_data / myProjectPageId?.page_size; i++) {
    paginationArray.push(i + 1);
  }

  const [currentPage, setCurrentPage] = useState(myProjectPageId.page);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <div className="dashboard">
        <div className="container-fluid h-100">
          <div className="row h-100 dashboard-theme-color">
            <div className="col-xxl-2 col-md-2 col-lg-3 px-0 dashboard-theme-color">
              <Dashboardside />
            </div>
            <div className="col-xxl-10 col-md-10 col-lg-3 custom-border-radius-one  dashboard-theme-skyblue px-0 dashboard-right-section">
              <HeaderDashboard />
              {loading ? (
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
                    <h2 className="ps-5">Reports From Client </h2>
                    <div className="m-xl-5 shadow">
                      {!report?.final_data?.length ? (
                        <>
                          <div
                            style={{ minHeight: "600px" }}
                            className="d-flex w-100 justify-content-center align-items-center"
                          >
                            <span className="h4">
                              No Clients Reports To Show
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="w-100 align-items-center">
                          {report?.final_data?.length &&
                            report?.final_data?.map((res, index) => {
                              const dateString = res.created_at;
                              const date = new Date(dateString);
                              const formattedDate = `${date.getDate()}-${
                                date.getMonth() + 1
                              }-${date.getFullYear()}`;

                              return (
                                <>
                                  <div
                                    className="row MyProjectDisplayRow"
                                    key={index}
                                  >
                                    <div className="col-md-4 col-7 d-flex align-items-center ">
                                      <img
                                        src={res?.image}
                                        className="img-fluid rounded-circle image_report"
                                        style={{
                                          width: "70px",
                                          height: "70px",
                                        }}
                                        alt={res?.client_name}
                                      />
                                      <div className="ps-3">
                                        <h4
                                          className="client_name_report"
                                          style={{
                                            textTransform: "capitalize",
                                          }}
                                        >
                                          {res?.client_name}
                                        </h4>
                                        <h6
                                          style={{ fontSize: "17px" }}
                                          className="client_nation_report"
                                        >
                                          <CiLocationOn />
                                          {res?.client_nation}
                                        </h6>
                                      </div>
                                    </div>
                                    <div className="col-md-4 col-3 d-flex align-items-center ">
                                      <div>
                                        <h5
                                          style={{ fontSize: "18px" }}
                                          className="client_Date_report"
                                        >
                                          Reported At
                                        </h5>
                                        <span
                                          className="client_Date_report"
                                          style={{
                                            textTransform: "capitalize",
                                            fontSize: "18px",
                                          }}
                                        >
                                          {formattedDate}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="col-md-4 col-2 d-flex align-items-center ">
                                      <div>
                                        <NavLink
                                          style={{ textDecoration: "none" }}
                                          to="/Report"
                                          state={{
                                            ...res,
                                          }}
                                        >
                                          <h5
                                            className="underline_hover view_report"
                                            style={{
                                              fontSize: "18px",
                                              color: "#01a78a",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            View
                                          </h5>
                                        </NavLink>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                        </div>
                      )}
                    </div>
                    {myProject &&
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
                      )}
                  </div>
                </main>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ReportTab;
