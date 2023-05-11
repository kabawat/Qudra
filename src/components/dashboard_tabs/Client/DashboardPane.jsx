import React, { useState, useContext, useEffect } from "react";
import Chart from "react-apexcharts";
import { BsArrowRight } from "react-icons/bs";
import axios from "axios";
import BuyDesign from "./BuyDesign";
import Pagination from "react-bootstrap/Pagination";
import Global from "../../../context/Global";
import { useCookies } from "react-cookie";
import useDemoConfig from "../../../components/Graph/Client/useDemoConfig";
import { Link, useLocation } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const DashboardPane = () => {
  const contextData = useContext(Global);
  const location = useLocation();
  const [cookies] = useCookies();
  const [profData, setProfData] = useState([]);
  const [payData, setPayData] = useState([]);
  const [buyDesigns, setBuyDesigns] = useState(location?.state ? true : false);
  const [onGoingProject, setOnGoingProject] = useState([]);
  const [onGoingProjectPageId, setOnGoingProjectPageId] = useState({
    page: 1,
    page_size: 5,
  });

  const [userdata, setuserdata] = useState("");

  useEffect(() => {
    console.log(location?.state?.designe);
    if (location?.state?.designe === false) {
      setBuyDesigns(false);
    } else if (location?.state?.designe === undefined) {
      setBuyDesigns(false);
    } else {
      setBuyDesigns(true);
    }
  }, []);

  useEffect(() => {
    contextData?.userData &&
      axios
        .post("http://13.52.16.160:8082/identity/filter_projects", {
          user_id: contextData?.userData?.user_id,
          user_token: contextData?.userData?.user_token,
          role: contextData?.userData?.role,
          project_status: "approved",
          ...onGoingProjectPageId,
        })
        .then((res) => {
          if (res?.data?.status === "Success") {
            setOnGoingProject(res?.data?.data);
          }
        });
    //changes
    axios
      .post("http://13.52.16.160:8082/client/browse_profesional_list", {
        client_id: cookies?.user_data?.user_id,
        user_token: cookies?.user_data?.user_token,
        role: cookies?.user_data?.role,
        ...onGoingProjectPageId,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          setProfData(res?.data?.data);
        }
      });
  }, [onGoingProjectPageId]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [onGoingProjectPageId]);

  useEffect(() => {
    contextData?.userData &&
      axios
        .post("http://13.52.16.160:8082/client/client_recent_payments/", {
          client_id: cookies?.user_data?.user_id,
          client_token: cookies?.user_data?.user_token,
        })
        .then((res) => {
          setPayData(res?.data?.data);
        });
  }, []);

  const onGoingProjectArray = [];
  for (
    let i = 0;
    i < onGoingProject?.total_data / onGoingProjectPageId?.page_size;
    i++
  ) {
    onGoingProjectArray.push(i + 1);
  }
  useEffect(() => {
    axios
      .post("http://13.52.16.160:8082/client/client_graph_data", {
        user_token: cookies?.user_data?.user_token,
        client_id: cookies?.user_data?.user_id,
        role: cookies?.user_data?.role,
      })
      .then((response) => {
        setuserdata(response.data.data);
      });
  }, []);

  const axes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom" },
      { position: "left", type: "linear", stacked: false, show: true },
    ],
    []
  );

  const datas = {
    labels: "Jan Feb Mar Apr May June July Aug Sep Oct Nov Dec",
    datasets: [
      {
        label: "Projects",
        data: userdata && Object.values(userdata).map((it) => it),
        backgroundColor: "rgb(74, 181, 235)",
      },
    ],
  };

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //   },
  // };

  return buyDesigns ? (
    <BuyDesign setBuyDesigns={setBuyDesigns} />
  ) : (
    <main className="dashboard-main">
      <div id="dashboard-menu-bar" className="container-fluid  px-md-4 px-3">
        <br />

        <div className="row total-earning-row pt-xxl-5 pt-4 pb-xxl-5 pb-4">
          <div className=" col-xl-7">
            <h3 className="">
              Welcome {contextData?.profileData?.name?.split(" ")[0]}&nbsp;!
            </h3>

            <div className="my-3 gx-0 px-2 py-1 purchase_dialog row align-items-center">
              <div className="col-lg-8 text-center text-lg-start col-12 fs-21 ps-3">
                You Can Purchase Designs Here
              </div>
              <div
                className="col-lg-4 col-12 puchase_box"
                onClick={() => {
                  setBuyDesigns(true);
                }}
              >
                Purchase Designs <BsArrowRight />
              </div>
            </div>
          </div>
          <div className=" col-lg-7 col-xl-5">
            <div className="d-flex align-items-center text-center justify-content-around top-earning-box bg-white">
              <div className="d-flex align-items-center justify-content-center p-3">
                <img src="./static/images/TotalEarnings.png" alt="" />
                <div className="ps-2">
                  <h4 className="m-0">Total Spent</h4>
                  <h2 className="m-0">
                    ${contextData?.profileData?.total_spend}
                  </h2>
                </div>
              </div>
              <div
                style={{
                  width: "1px",
                  backgroundColor: "#eeeeee",
                  height: "60px",
                }}
              ></div>
              <div className="d-flex align-items-center justify-content-center py-3 px-3">
                <img src="./static/images/all-projects1.png" alt="" />
                <div className="ps-2">
                  <h6 className="m-0">All Projects</h6>
                  <h2 className="m-0">
                    {contextData?.profileData?.total_project}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row  mb-xxl-5 mb-4 client-project-main-row">
          {userdata?.yearly_project > 0 && (
            <div className="col-xxl-4 col-md-12 my-3">
              {/* <ResizableBox> */}

              <div className="container-fluid mb-5">
                <Chart
                  className="chart"
                  type="bar"
                  // width={500}
                  height={450}
                  // height={"150%"}
                  series={[
                    {
                      name: "Projects",
                      data: [
                        userdata && userdata?.graph_data?.January === undefined
                          ? 0
                          : userdata?.graph_data?.january,
                        userdata && userdata?.graph_data?.February === undefined
                          ? 0
                          : userdata?.graph_data?.february,
                        userdata && userdata?.graph_data?.March === undefined
                          ? 0
                          : userdata?.graph_data?.March,
                        userdata && userdata?.graph_data?.April === undefined
                          ? 0
                          : userdata?.graph_data?.April,
                        userdata && userdata?.graph_data?.May === undefined
                          ? 0
                          : userdata?.graph_data?.May,
                        userdata && userdata?.graph_data?.June === undefined
                          ? 0
                          : userdata?.graph_data?.June,
                        userdata && userdata?.graph_data?.July === undefined
                          ? 0
                          : userdata?.graph_data?.July,
                        userdata && userdata?.graph_data?.August === undefined
                          ? 0
                          : userdata?.graph_data?.August,
                        userdata &&
                        userdata?.graph_data?.September === undefined
                          ? 0
                          : userdata?.graph_data?.September,
                        userdata && userdata?.graph_data?.October === undefined
                          ? 0
                          : userdata?.graph_data?.October,
                        userdata && userdata?.graph_data?.November === undefined
                          ? 0
                          : userdata?.graph_data?.November,
                        userdata && userdata?.graph_data?.December === undefined
                          ? 0
                          : userdata?.graph_data?.December,
                      ],
                    },
                  ]}
                  options={{
                    colors: ["#01a78a"],
                    theme: { mode: "light" },

                    xaxis: {
                      tickPlacement: "on",
                      categories: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                    },

                    yaxis: {
                      labels: {
                        formatter: (val) => {
                          return `${val}`;
                        },
                        style: { fontSize: "15", colors: ["#212529"] },
                      },
                      title: {
                        text: "Projects",
                        style: { color: "#212529", fontSize: 20 },
                      },
                    },

                    legend: {
                      show: true,
                      position: "right",
                    },

                    dataLabels: {
                      formatter: (val) => {
                        return `${val}`;
                      },
                      style: {
                        colors: ["#f4f4f4"],
                        fontSize: 15,
                      },
                    },
                  }}
                ></Chart>
              </div>

              {/* </ResizableBox> */}
            </div>
          )}

          <div className="col-xxl-4 col-md-12 my-3">
            <div className="bg-white chat-to-professional-client-page d-flex flex-column justify-content-between h-100 p-md-4 p-3 border">
              <div className="d-flex align-items-center justify-content-between">
                <h3>Professional</h3>
                <Link
                  to="/browse-professionals"
                  className="text-decoration-none"
                >
                  <h2>View All</h2>
                </Link>
              </div>
              {/* //////////////////////////////////////////// */}
              {profData &&
                profData?.final_data?.map((item, index) => {
                  if (index < 3) {
                    return (
                      <div className="row py-4">
                        <div className="col-md-2">
                          <img
                            src={item.avatar}
                            alt=""
                            className="client-page-client-image"
                          />
                        </div>

                        <div className="d-md-flex align-items-center justify-content-between col-md-10 flex-wrap">
                          <div className="ps-md-4">
                            <h5>{item.name}</h5>
                            <h6>{item.email}</h6>
                          </div>
                          <div>
                            <Link
                              to={`/professionalprofile/${item.professional_id}`}
                            >
                              <img
                                src="./static/images/messageGreenIcon.png"
                                alt=""
                                className="messageGreenIcon"
                              />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          </div>

          <div className="col-xxl-4 col-md-12 my-3">
            <div className="bg-white recent-payments-client-page d-flex  flex-column h-100 p-md-4 p-3 border">
              <div className="d-flex align-items-center justify-content-between">
                <h3>Recent Payment</h3>
              </div>
              {/* //////////////////////////////////////////// */}
              {payData.length ? (
                payData?.map((item, index) => {
                  if (index < 3) {
                    return (
                      <>
                        <div className="row py-5">
                          <div className="col-md-2 ">
                            <img
                              src={item.image}
                              alt=""
                              className="client-page-client-image"
                            />
                          </div>

                          <div className="d-md-flex align-items-center justify-content-between col-md-10 flex-wrap">
                            <div className="ps-md-4">
                              <h5>{item.professional_name} </h5>
                              <h6 style={{ wordBreak: "break-word" }}>
                                {item.email}
                              </h6>
                              <h4>${item.price}</h4>
                            </div>
                            {/* <div>
                              <h4>${ item.price }</h4>
                            </div> */}
                          </div>
                        </div>
                      </>
                    );
                  }
                })
              ) : (
                <h3 style={{ color: "#00A78B", margin: "auto" }}>
                  No Recent Payment
                </h3>
              )}
            </div>
          </div>
        </div>
        {onGoingProject?.final_data?.length ? (
          <div className="projects-table px-md-4 px-3 mb-5 pt-4 bg-white">
            <div className="row">
              <div className="col d-flex">
                <h4>Projects</h4>
                <h5 className="ms-auto">Manage Projects</h5>
              </div>
            </div>
            <div className="row project-table-header text-center">
              <div className="col-md">
                <h6>Project Name</h6>
              </div>
              <div className="col-md">
                <h6>Work Assigned</h6>
              </div>
              <div className="col-md">
                <h6>Professional Assigned</h6>
              </div>
              <div className="col-md">
                <h6>Project Cost</h6>
              </div>
              <div className="col-md">
                <h6>Status</h6>
              </div>
              <div className="col-md">
                <h6>Payment</h6>
              </div>
            </div>
            {onGoingProject?.final_data?.length ? (
              onGoingProject?.final_data?.map((res, index) => (
                <div
                  className="row project-table-details text-center"
                  key={index}
                >
                  <div className="col-md">
                    <p className="m-0 theme-text-color text-capitalize">
                      {res?.project_name}
                    </p>
                  </div>
                  <div className="col-md">
                    <p className="m-0 text-capitalize">Design</p>
                  </div>
                  <div className="col-md">
                    <p className="m-0 text-capitalize">
                      {res?.professional_name}
                    </p>
                  </div>
                  <div className="col-md">
                    <p className="m-0">${res?.project_cost}</p>
                  </div>
                  <div className="col-md">
                    <p className="m-0 text-capitalize">{res?.project_status}</p>
                  </div>
                  <div className="col-md">
                    <p className="m-0 text-capitalize">{res?.payment_status}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No Project to show</p>
            )}
          </div>
        ) : (
          ""
        )}
        {onGoingProjectArray?.length < onGoingProject?.total_data ? (
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
                    onGoingProjectArray?.length !== onGoingProjectPageId?.page
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
        ) : (
          ""
        )}
      </div>
    </main>
  );
};

export default React.memo(DashboardPane);
