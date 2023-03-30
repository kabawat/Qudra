import React, { useState, useContext, useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import axios from "axios";
import { Chart } from "react-charts";
import BuyDesign from "./BuyDesign";
import Pagination from "react-bootstrap/Pagination";
import Global from "../../../context/Global";
import useDemoConfig from "../../../components/Graph/Client/useDemoConfig";
const DashboardPane = () => {
  const contextData = useContext(Global);
  const [buyDesigns, setBuyDesigns] = useState(false);
  const [onGoingProject, setOnGoingProject] = useState([]);
  const [onGoingProjectPageId, setOnGoingProjectPageId] = useState({
    page: 1,
    page_size: 5,
  });
  useEffect(() => {
    contextData?.userData &&
      axios.post("http://13.52.16.160:8082/identity/filter_projects", {
        user_id: contextData?.userData?.user_id,
        user_token: contextData?.userData?.user_token,
        role: contextData?.userData?.role,
        project_status: "approved",
        ...onGoingProjectPageId,
      }).then((res) => {
        if (res?.data?.status === "Success") {
          setOnGoingProject(res?.data?.data);
        }
      });
  }, [onGoingProjectPageId]);
  const onGoingProjectArray = [];
  for (
    let i = 0;
    i < onGoingProject?.total_data / onGoingProjectPageId?.page_size;
    i++
  ) {
    onGoingProjectArray.push(i + 1);
  }
  useEffect(() => { }, []);
  const { data } = useDemoConfig({
    series: 1,
    datums: 12,
    dataType: "ordinal",
  });

  const series = React.useMemo(
    () => ({
      type: "bar",
    }),
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom" },
      { position: "left", type: "linear", stacked: false, show: true },
    ],
    []
  );

  return buyDesigns ? (
    <BuyDesign setBuyDesigns={setBuyDesigns} />
  ) : (
    <main className="dashboard-main">
      <div id="dashboard-menu-bar" className="container-fluid  px-md-4 px-3">
        <br />

        <div className="row total-earning-row pt-xxl-5 pt-4 pb-xxl-5 pb-4">
          <div className="col-md-5 col-xl-7">
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
          <div className=" col-md-7 col-xl-5">
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
                <img src="./static/images/TotalEarnings.png" alt="" />
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
          <div className="col-xl-4 col-md-12 my-3">
           
            {/* <ResizableBox> */}
            <Chart data={data} series={series} axes={axes} tooltip />
            {/* </ResizableBox> */}
          </div>

          <div className="col-xl-4 col-md-12 my-3">
            <div className="bg-white chat-to-professional-client-page d-flex flex-column justify-content-between h-100 p-md-4 p-3 border">
              <div className="d-flex align-items-center justify-content-between">
                <h3>Professional</h3>
                <a href="" className="text-decoration-none">
                  <h2>View All</h2>
                </a>
              </div>
              <div className="row py-4">
                <div className="col-md-2">
                  <img
                    src="./static/images/UserIcon.png"
                    alt=""
                    className="client-page-client-image"
                  />
                </div>

                <div className="d-md-flex align-items-center justify-content-between col-md-10 flex-wrap">
                  <div className="ps-md-4">
                    <h5>Alice Wade</h5>
                    <h6>Alicewade@gmail.com</h6>
                  </div>
                  <div>
                    <img
                      src="./static/images/messageGreenIcon.png"
                      alt=""
                      className="messageGreenIcon"
                    />
                  </div>
                </div>
              </div>
              <div className="row align-items-center py-4 border-top border-bottom">
                <div className="col-md-2">
                  <img
                    src="./static/images/UserIcon.png"
                    alt=""
                    className="client-page-client-image"
                  />
                </div>

                <div className="d-md-flex align-items-center justify-content-between col-md-10 flex-wrap">
                  <div className="ps-md-4">
                    <h5>Alice Wade</h5>
                    <h6>Alicewade@gmail.com</h6>
                  </div>
                  <div>
                    <img
                      src="./static/images/messageGreenIcon.png"
                      alt=""
                      className="messageGreenIcon"
                    />
                  </div>
                </div>
              </div>
              <div className="row py-4">
                <div className="col-md-2">
                  <img
                    src="./static/images/UserIcon.png"
                    alt=""
                    className="client-page-client-image"
                  />
                </div>

                <div className="d-md-flex align-items-center justify-content-between col-md-10 flex-wrap">
                  <div className="ps-md-4">
                    <h5>Alice Wade</h5>
                    <h6>Alicewade@gmail.com</h6>
                  </div>
                  <div>
                    <img
                      src="./static/images/messageGreenIcon.png"
                      alt=""
                      className="messageGreenIcon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-12 my-3">
            <div className="bg-white recent-payments-client-page d-flex justify-content-between flex-column h-100 p-md-4 p-3 border">
              <div className="d-flex align-items-center justify-content-between">
                <h3>Recent Payment</h3>
              </div>
              <div className="row py-4">
                <div className="col-md-2 ">
                  <img
                    src="./static/images/UserIcon.png"
                    alt=""
                    className="client-page-client-image"
                  />
                </div>

                <div className="d-md-flex align-items-center justify-content-between col-md-10 flex-wrap">
                  <div className="ps-md-4">
                    <h5>Alice Wade</h5>
                    <h6>alicewade@gmail.com</h6>
                  </div>
                  <div>
                    <h4>$500</h4>
                  </div>
                </div>
              </div>
              <div className="row py-4 border-top border-bottom">
                <div className="col-md-2 ">
                  <img
                    src="./static/images/UserIcon.png"
                    alt=""
                    className="client-page-client-image"
                  />
                </div>

                <div className="d-md-flex align-items-center justify-content-between col-md-10 flex-wrap">
                  <div className="ps-md-4">
                    <h5>Alice Wade</h5>
                    <h6>alicewade@gmail.com</h6>
                  </div>
                  <div>
                    <h4>$500</h4>
                  </div>
                </div>
              </div>
              <div className="row py-4">
                <div className="col-md-2 ">
                  <img
                    src="./static/images/UserIcon.png"
                    alt=""
                    className="client-page-client-image"
                  />
                </div>
                <div className="d-md-flex align-items-center justify-content-between col-md-10 flex-wrap">
                  <div className="ps-md-4">
                    <h5>Alice Wade</h5>
                    <h6>alicewade@gmail.com</h6>
                  </div>
                  <div>
                    <h4>$500</h4>
                  </div>
                </div>
              </div>
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
              <div className="col-md px-0">
                <h6>Project Name</h6>
              </div>
              <div className="col-md px-0">
                <h6>Work Assigned</h6>
              </div>
              <div className="col-md px-0">
                <h6>Professional Assigned</h6>
              </div>
              <div className="col-md px-0">
                <h6>Project Cost</h6>
              </div>
              <div className="col-md px-0">
                <h6>Status</h6>
              </div>
              <div className="col-md px-0">
                <h6>Payment</h6>
              </div>
            </div>
            {onGoingProject?.final_data?.length ? (
              onGoingProject?.final_data?.map((res, index) => (
                <div
                  className="row project-table-details text-center"
                  key={index}
                >
                  <div className="col-md px-0">
                    <p className="m-0 theme-text-color text-capitalize">{res?.project_name}</p>
                  </div>
                  <div className="col-md px-0">
                    <p className="m-0 text-capitalize">Design</p>
                  </div>
                  <div className="col-md px-0">
                    <p className="m-0 text-capitalize">{res?.professional_name}</p>
                  </div>
                  <div className="col-md px-0">
                    <p className="m-0">${res?.project_cost}</p>
                  </div>
                  <div className="col-md px-0">
                    <p className="m-0 text-capitalize">{res?.project_status}</p>
                  </div>
                  <div className="col-md px-0">
                    <p className="m-0 text-capitalize">
                      {res?.payment_status}
                    </p>
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
