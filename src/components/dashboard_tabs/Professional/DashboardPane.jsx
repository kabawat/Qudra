import React, { useContext, useEffect, useReducer, useState } from "react";
import Global from "../../../context/Global";
import { useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Button, Modal } from "react-bootstrap";
import { BaseUrl } from "../../../BaseUrl";

const initialState = {
  projects: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "PROJECTS":
      return { ...state, projects: action?.value };
    default:
      return state;
  }
};
const DashboardPane = () => {
  const contextData = useContext(Global);
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [projectPageId, setProjectPageId] = useState({
    page: 1,
    page_size: 5,
  });
  useEffect(() => {
    axios
      .post(`${BaseUrl}/identity/filter_projects`, {
        page: projectPageId?.page,
        page_size: projectPageId?.page_size,
        project_status: "approved",
        role: contextData?.userData?.role,
        user_id: contextData?.userData?.user_id,
        user_token: contextData?.userData?.user_token,
      })
      .then((res) => {
        dispatch({ type: "PROJECTS", value: res?.data?.data });
      });
  }, [projectPageId]);
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [projectPageId]);
  const projectPaginationArray = [];
  for (
    let i = 0;
    i < state?.projects?.total_data / projectPageId?.page_size;
    i++
  ) {
    projectPaginationArray.push(i + 1);
  }
  const [cookies] = useCookies();
  const [show, setShow] = useState(false);
  const sellDesignHandal = () => {
    axios
      .put(`${BaseUrl}/stripe/professionl/verify-account/`, {
        professioanl_id: cookies?.user_data?.user_id,
        professioanl_token: cookies?.user_data?.user_token,
      })
      .then((result) => {
        if (result?.data?.status === "Failed") {
          setShow(true);
        } else {
          navigate("/professional-buy-and-sale", {
            state: true,
          });
        }
      });
  };
  const handle_last_step = () => {
    navigate("/last-step");
  };
  return (
    <div
      id="dashboard-menu-bar"
      className="container-fluid px-lg-5 px-md-4 px-3"
    >
      <div className="row total-earning-row pt-xxl-5 pt-4 pb-xxl-5 pb-4">
        <div className="col-xl-9 ">
          <h3 className="">
            Welcome&nbsp;
            {contextData?.profileData?.name?.split(" ")[0]}
          </h3>
          {/* <h5 className="">
            Reference site about lorem ipsum gives us information of its origin
          </h5> */}

          <div className="my-3 gx-0 my-lg-1 px-2 py-1 purchase_dialog row align-items-center">
            <div className="col-lg-8 text-center text-lg-start col-12  fs-21 ps-3">
              You Can Sell Designs Here
            </div>
            <div
              className="col-lg-4 col-12 puchase_box"
              onClick={sellDesignHandal}
            >
              Sell Designs <BsArrowRight />
            </div>
          </div>
        </div>
        <div className="col-xl-3 mt-lg-3">
          <div className="d-flex align-items-center justify-content-center top-earning-box bg-white">
            <img src="./static/images/img/TotalEarnings.png" alt="" />
            <div className="ps-2">
              <h4 className="m-0">Wallet</h4>
              <h2 className="m-0">
                ${contextData?.profileData?.total_earning}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="row completed-projects-row mb-xxl-5 mb-4">
        <div className="col-xl-9 col-lg-8 mb-md-4">
          <div className="Become-professional h-100">
            <h4>How To Become</h4>
            <h3>A Top Professional</h3>
            <p>Here is a step by step guide to become a top professional</p>
            <button onClick={handle_last_step}>
              <span className="me-3">Last Step</span>
              <span>
                <i className="fa-solid fa-arrow-right-long"></i>
              </span>
            </button>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4">
          <div className="completed-projects-box h-100 d-flex align-items-center justify-content-center  flex-column bg-white">
            <h3 className="text-center">Completed Projects</h3>
            <div className="d-flex align-items-center justify-content-center  py-3 px-3">
              <img src="./static/images/img/TotalEarnings.png" alt="" />
              <div className="ps-2">
                <h6 className="m-0">All Projects</h6>
                <h2 className="m-0">
                  {contextData?.profileData?.total_project > 1000
                    ? `${contextData?.profileData?.total_project}+`
                    : `${contextData?.profileData?.total_project}`}
                </h2>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-center border-top border-bottom py-3 px-3">
              <img src="./static/images/img/TotalEarnings.png" alt="" />
              <div className="ps-2">
                <h6 className="m-0">Completed</h6>
                <h2 className="m-0">
                  {contextData?.profileData?.completed_projects > 1000
                    ? `${contextData?.profileData?.completed_projects}+`
                    : `${contextData?.profileData?.completed_projects}`}
                </h2>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-center py-3 px-3">
              <img src="./static/images/img/TotalEarnings.png" alt="" />
              <div className="p-0">
                <h6 className="m-0">Pending</h6>
                <h2 className="m-0">
                  {contextData?.profileData?.pending_project > 1000
                    ? `${contextData?.profileData?.pending_project}+`
                    : `${contextData?.profileData?.pending_project}`}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      {state?.projects?.final_data?.length ? (
        <div className="projects-table px-md-4 px-3 mb-5 pt-4 bg-white">
          <div className="row ">
            <div className="col d-flex">
              <h4>Projects</h4>

              <h5 className="ms-auto">Manage Projects</h5>
            </div>
          </div>
          <div className="row  project-table-header text-center">
            <div className="col-md px-lg-0">
              <h6>Project Name</h6>
            </div>
            <div className="col-md px-lg-0">
              <h6>Work Assigned</h6>
            </div>
            <div className="col-md px-lg-0">
              <h6>Client Assigned</h6>
            </div>
            <div className="col-md px-lg-0">
              <h6>Project Cost</h6>
            </div>
            <div className="col-md px-lg-0">
              <h6>Status</h6>
            </div>
            <div className="col-md px-lg-0">
              <h6>Payment</h6>
            </div>
          </div>
          {state?.projects?.final_data?.map((res) => (
            <div className="row  project-table-details text-center">
              <div className="col-md px-lg-0">
                <p className="m-0 theme-text-color">{res?.project_name}</p>
              </div>
              <div className="col-md px-lg-0">
                <p className="m-0">Design</p>
              </div>
              <div className="col-md px-lg-0">
                <p className="m-0">{res?.client_name}</p>
              </div>
              <div className="col-md px-lg-0">
                <p className="m-0">${res?.project_cost}</p>
              </div>
              <div className="col-md px-lg-0">
                <p className="m-0">Pending</p>
              </div>
              <div className="col-md px-lg-0">
                <p className="m-0">
                  <i className="fa fa-dot-circle"></i> Pending
                </p>
              </div>
            </div>
          ))}
          {projectPageId?.page_size < state?.projects?.total_data ? (
            <Pagination className="ps-5 paginationBoxProfessionalDashboard">
              <Pagination.First
                onClick={() => {
                  setProjectPageId({
                    page: 1,
                    page_size: 5,
                  });
                }}
              />
              <Pagination.Prev
                onClick={() => {
                  setProjectPageId((prev) => ({
                    ...prev,
                    page:
                      projectPageId?.page !== 1 ? projectPageId?.page - 1 : 1,
                  }));
                }}
              />
              {projectPaginationArray?.map((res, key) => (
                <Pagination.Item
                  key={key}
                  active={projectPageId?.page === res}
                  onClick={() => {
                    setProjectPageId((prev) => ({
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
                  setProjectPageId((prev) => ({
                    ...prev,
                    page:
                      projectPaginationArray?.length !== projectPageId?.page
                        ? projectPageId?.page + 1
                        : projectPageId?.page,
                  }));
                }}
              />
              <Pagination.Last
                onClick={() => {
                  setProjectPageId((prev) => ({
                    ...prev,
                    page: projectPaginationArray?.length,
                  }));
                }}
              />
            </Pagination>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}

      <Modal centered show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Please Verify your Account Details. </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShow(false);
            }}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default React.memo(DashboardPane);
