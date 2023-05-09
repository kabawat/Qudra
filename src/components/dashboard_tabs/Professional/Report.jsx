import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Dashboardside from "../../ProfessionalDashboardside";
import { HeaderDashboard } from "../../Header";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const Report = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [report, setReport] = useState({});
  useEffect(() => {
    if (location?.state) {
      if (cookies?.user_data) {
        if (cookies?.user_data?.role === "professional") {
          axios
            .post(
              "http://13.52.16.160:8082/professional/view-report-design/ ",
              {
                user_id: cookies?.user_data?.user_id,
                user_token: cookies?.user_data?.user_token,
                role: "professional",
                ...location?.state,
              }
            )
            .then((response) => {
              if (response?.data?.status === "Success") {
                setReport({ ...response?.data?.data });
                setLoading(true);
              } else {
                navigate(-1);
              }
            });
        } else {
          navigate("/clientdashboard");
        }
      } else {
      }
    } else {
      navigate("/professionaldashboard");
    }
  }, []);
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
                <div className="cart_page_main mx-lg-5 px-lg-5 my-lg-5 py-lg-5 ">
                  <div className="shoppingCartMain px-2">
                    <h3 className="border-bottom pb-4">Report From Clients</h3>
                    <div
                      className="row justify-content-between m-0 pt-4"
                      style={{
                        width: "100%",
                      }}
                    >
                      <div className="col-xl-12 leftShoppingCart row">
                        <h2 className="pb-4 col-12 ">
                          {report?.sub_category_name}
                        </h2>
                        <div className="col-12">
                          <div className="row">
                            <div className="ImgBox mb-4 col-md-3 col-12">
                              <img
                                src={report?.image}
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                            <div className="ImgBox col-md-3 col-12">
                              <video width="100%" controls>
                                <source src={report?.video} type="video/ogg" />
                                <source src={report?.video} type="video/mp4" />
                                Your browser does not support HTML video.
                              </video>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-12 rightShoppingCart">
                        <div className="rightShoppingCartInner">
                          <div className="row">
                            <div className="col-lg-3 col-md-3 col-12">
                              <div className="">
                                <h3>
                                  Price :
                                  <p
                                    style={{ color: "#000", display: "inline" }}
                                  >
                                    ${report?.price}
                                  </p>
                                </h3>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-12">
                              <div className="">
                                <h3>
                                  Query :<br />
                                  <p
                                    style={{
                                      color: "#000",
                                      display: "inline",
                                      fontSize: "16px",
                                    }}
                                  >
                                    {report?.query}
                                  </p>
                                </h3>
                              </div>
                            </div>
                            <div className="col-lg-3 col-md-3 col-12">
                              <div className="">
                                <h3>
                                  <a
                                    style={{ color: "#00a78b" }}
                                    target="_blank"
                                    href={report?.attachment}
                                    download={report?.attachment}
                                  >
                                    View Attachment
                                  </a>{" "}
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Report);
