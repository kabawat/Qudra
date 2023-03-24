import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Global from "../context/Global";
import { CiHeart } from "react-icons/ci";
import { MdOutlineLiveHelp } from "react-icons/md";
const ClientDashboardAside = () => {
  const contextData = useContext(Global);
  return (
    <aside>
      <Link
        to="/"
        className="d-block px-3 ps-xxl-4 ps-4 pb-4 pb-xxl-2  pt-5 pt-xxl-5"
      >
        <img
          src="/static/images/Quadra-transparrent-logo.png"
          alt="logo"
          style={{ height: "100px" }}
        />
      </Link>

      <ul
        className="nav nav-tabs flex-column border-0 ps-xxl-4 ps-2 mt-3"
        role="tablist"
      >
        <li
          className="nav-item"
          onClick={() =>
            contextData?.dispatch({
              type: "CURRENT_CLIENT_TAB",
              value: "dashboard",
            })
          }
        >
          <a
            className={`nav-link dashboard-button ${
              contextData?.current_client_tab === "dashboard" ? "active" : ""
            }`}
            data-bs-toggle="tab"
            href="#dashboard-menu-bar"
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
              type: "CURRENT_CLIENT_TAB",
              value: "browse",
            })
          }
        >
          <a
            className={`nav-link browse-products-btn ${
              contextData?.current_client_tab === "browse" ? "active" : ""
            } `}
            data-bs-toggle="tab"
            href="#Browse-projects"
          >
            <img
              src="/static/images/businessmanGreen.png"
              alt=""
              className="browse-green-icon"
            />
            <img
              src="/static/images/businessmanWhite.png"
              alt=""
              className="browse-white-icon"
            />
            Browse Professionals
          </a>
        </li>
        <li
          className="nav-item"
          onClick={() =>
            contextData?.dispatch({
              type: "CURRENT_CLIENT_TAB",
              value: "Ongoing",
            })
          }
        >
          <a
            className={`nav-link activity-btn ${
              contextData?.current_client_tab === "Ongoing" ? "active" : ""
            }`}
            data-bs-toggle="tab"
            href="#OnGoingProjects"
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
            Ongoing Projects
          </a>
        </li>
        <li
          className="nav-item"
          onClick={() =>
            contextData?.dispatch({
              type: "CURRENT_CLIENT_TAB",
              value: "Completed",
            })
          }
        >
          <a
            className={`nav-link activity-btn ${
              contextData?.current_client_tab === "Completed" ? "active" : ""
            }`}
            data-bs-toggle="tab"
            href="#CompletedProjects"
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
            Completed Projects
          </a>
        </li>
        <li
          className="nav-item"
          onClick={() => {
            contextData?.dispatch({
              type: "CURRENT_CLIENT_TAB",
              value: "likes",
            });
          }}
        >
          <a
            className={`nav-link ${
              contextData?.current_client_tab === "likes" ? "active" : ""
            } liked-btn`}
            data-bs-toggle="tab"
            href="#liked-saved"
          >
            <CiHeart
              style={{
                color: `${
                  contextData?.current_client_tab === "likes"
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
          onClick={() =>
            contextData?.dispatch({
              type: "CURRENT_CLIENT_TAB",
              value: "ratings",
            })
          }
        >
          <a
            className={`nav-link liked-btn ${
              contextData?.current_client_tab === "ratings" ? "active" : ""
            }`}
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
        <li
          className="nav-item"
          onClick={() => {
            contextData?.dispatch({
              type: "CURRENT_CLIENT_TAB",
              value: "help",
            });
          }}
        >
          <a
            className={`nav-link ${
              contextData?.current_client_tab === "help" ? "active" : ""
            } liked-btn`}
            data-bs-toggle="tab"
            href="#liked-saved"
          >
            <MdOutlineLiveHelp
              style={{
                color: `${
                  contextData?.current_client_tab === "help"
                    ? "#00a78b"
                    : "white"
                }`,
                fontSize: "27px",
              }}
            />
            <span style={{ marginLeft: "5px" }}> Help</span>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default ClientDashboardAside;
