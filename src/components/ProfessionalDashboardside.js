import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import Global from "../context/Global";

const Dashboardside = () => {
  const contextData = useContext(Global);

  return (
    <>
      <aside>
        <Link
          to="/"
          className="d-block px-3 ps-xxl-4
           ps-4 pb-4 pb-xxl-2  pt-5 pt-xxl-5"
        >
          <img
            src="/static/images/Quadra-transparrent-logo.png"
            alt="logo"
            style={{ height: "100px" }}
          />
        </Link>
        <div className="px-xxl-5 px-4 py-xxl-5 py-4 progress-bar-main">
          <label htmlFor="progressbar-quality-of-work">Quality of Work</label>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: "80%" }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <span>80%</span>
            </div>
          </div>
          <label htmlFor="progressbar-quality-of-work">Inbox Response</label>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: "80%" }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <span>80%</span>
            </div>
          </div>
          <label htmlFor="progressbar-quality-of-work">Delivered on time</label>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: "80%" }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <span>80%</span>
            </div>
          </div>
          <label htmlFor="progressbar-quality-of-work">Order Completion</label>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: "80%" }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <span>80%</span>
            </div>
          </div>
        </div>
        <ul
          className="nav nav-tabs flex-column border-0 ps-xxl-4 ps-2 pb-3"
          role="tablist"
        >
          <li
            className="nav-item"
            onClick={() => {
              contextData?.dispatch({
                type: "CURRENT_PROFESSIONAL_TAB",
                value: "dashboard",
              });
            }}
          >
            <a
              className={`nav-link ${
                contextData?.current_professional_tab === "dashboard"
                  ? "active"
                  : ""
              } dashboard-button`}
              data-bs-toggle="tab"
            >
              <img
                src="/static/images/Dashboard-menu-button.png"
                alt=""
                className="dashboard-white-icon"
              />
              <img
                src="/static/images/dashboard-menu-green.png"
                alt=""
                className="dashboard-green-icon"
              />
              Dashboard
            </a>
          </li>
          <li
            className="nav-item"
            onClick={() =>
              contextData?.dispatch({
                type: "CURRENT_PROFESSIONAL_TAB",
                value: "Portfolio",
              })
            }
          >
            <a
              className={`nav-link ${
                contextData?.current_professional_tab === "Portfolio"
                  ? "active"
                  : ""
              }  browse-products-btn`}
              data-bs-toggle="tab"
            >
              <img
                src="/static/images/browseproject-menu.png"
                alt=""
                className="browse-green-icon"
              />
              <img
                src="/static/images/browse-project-white.png"
                alt=""
                className="browse-white-icon"
              />
              Portfolio
            </a>
          </li>
          <li
            className="nav-item"
            onClick={() => {
              contextData?.dispatch({
                type: "CURRENT_PROFESSIONAL_TAB",
                value: "activities",
              });
            }}
          >
            <a
              className={`nav-link ${
                contextData?.current_professional_tab === "activities"
                  ? "active"
                  : ""
              } activity-btn`}
              data-bs-toggle="tab"
              href="#myactivity"
            >
              <img
                src="/static/images/activity-menu.png"
                alt=""
                className="Activities-white-icon"
              />
              <img
                src="/static/images/green-activity-menu.png"
                alt=""
                className="Activities-green-icon"
              />
              My projects
            </a>
          </li>
          <li
            className="nav-item"
            onClick={() => {
              contextData?.dispatch({
                type: "CURRENT_PROFESSIONAL_TAB",
                value: "likes",
              });
            }}
          >
            <a
              className={`nav-link ${
                contextData?.current_professional_tab === "likes"
                  ? "active"
                  : ""
              } liked-btn`}
              data-bs-toggle="tab"
              href="#liked-saved"
            >
              <CiHeart
                style={{
                  color: `${
                    contextData?.current_professional_tab === "likes"
                      ? "#00a78b"
                      : "white"
                  }`,
                  fontSize: "27px",
                }}
              />
              Likes
            </a>
          </li>
          <li
            className="nav-item"
            onClick={() => {
              contextData?.dispatch({
                type: "CURRENT_PROFESSIONAL_TAB",
                value: "ratings",
              });
            }}
          >
            <a
              className={`nav-link ${
                contextData?.current_professional_tab === "ratings"
                  ? "active"
                  : ""
              } liked-btn`}
              data-bs-toggle="tab"
              href="#liked-saved"
            >
              <img
                src="/static/images/likethumb-menu.png"
                alt=""
                className="liked-white-icon"
              />
              <img
                src="/static/images/greenThumb.png"
                alt=""
                className="liked-green-icon"
              />
              Ratings
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Dashboardside;
