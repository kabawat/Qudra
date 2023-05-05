import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { MdOutlineLiveHelp, MdSubscriptions } from "react-icons/md";
import { MdSell } from "react-icons/md";

import Global from "../context/Global";
import { TbMessageReport } from "react-icons/tb";
import axios from "axios";

const Dashboardside = () => {
  const contextData = useContext(Global);
  const [progressData, setProgressData] = useState([]);
  useEffect(() => {
    axios
      .post(" http://13.52.16.160:8082/professional/progress_report/", {
        user_id: contextData?.userData?.user_id,
        user_token: contextData?.userData?.user_token,
      })
      .then((res) => {
        console.log(res);
        setProgressData(res.data);
      });
  }, []);

  return (
    <>
      <aside>
        <div className="d-flex px-3 ps-xxl-4 ps-4 pb-4 pb-xxl-2  pt-5 pt-xxl-5">
          <Link to="/">
            <img
              src="/static/images/Quadra-transparrent-logo.png"
              className="logo "
              alt="logo"
              style={{ height: "100px" }}
            />
          </Link>
        </div>
        <label
          htmlFor="dash"
          className="dashboard-toggle-menu"
          style={{ cursor: "pointer", display: "none" }}
        >
          <span></span>
          <span></span>
          <span></span>
        </label>
        <input type="checkbox" name="" id="dash" />
        <div className="menu-cont">
          <div className="px-xxl-5 px-4 py-xxl-5 py-4 progress-bar-main">
            <div className="d-flex justify-content-between">
              <label htmlFor="progressbar-quality-of-work">
                Quality of Work
              </label>
              <span
                style={{
                  color: "#fff",
                  marginLeft: "12%",
                  fontWeight: "bolder",
                }}
              >
                {progressData?.work_quality
                  ? ` ${progressData?.work_quality}%`
                  : `0%`}
              </span>
            </div>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progressData?.work_quality}%` }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            {/* <label htmlFor="progressbar-quality-of-work">Inbox Response</label>
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
            </div> */}
            <div className="d-flex justify-content-between">
              <label htmlFor="progressbar-quality-of-work">
                Delivered on time
              </label>
              <span
                style={{
                  color: "#fff",
                  marginLeft: "2%",
                  fontWeight: "bolder",
                }}
              >
                {progressData.deliver_percentage
                  ? ` ${progressData?.deliver_percentage}%`
                  : `0%`}
              </span>
            </div>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progressData?.deliver_percentage}%` }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div className="d-flex justify-content-between">
              <label htmlFor="progressbar-quality-of-work">
                Order Completion
              </label>{" "}
              <span
                style={{
                  color: "#fff",
                  marginLeft: "2%",
                  fontWeight: "bolder",
                }}
              >
                {progressData.order_completion
                  ? ` ${progressData?.order_completion}%`
                  : `0%`}
              </span>
            </div>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progressData?.order_completion}%` }}
                aria-valuenow="25"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <ul
            className="nav nav-tabs  flex-column border-0 ps-xxl-4 ps-2 pb-3"
            role="tablist"
          >
            <li className="nav-item">
              <NavLink
                to="/professionaldashboard"
                className={`nav-link dashboard-button`}
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
                <span className="mob-hide">Dashboard</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={`nav-link  browse-products-btn`}
                to="/portfolio"
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
                <span className="mob-hide">Portfolio</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={`nav-link activity-btn`}
                to="/request-projects"
              >
                <img
                  src="/static/icon/request_project2.png"
                  alt=""
                  className="Activities-white-icon"
                />
                <img
                  src="/static/icon/request_project1.png"
                  alt=""
                  className="Activities-green-icon"
                />
                <span className="mob-hide">Request Projects</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={`nav-link activity-btn`}
                to="/pending-activity"
              >
                <img
                  src="/static/icon/pending_project2.png"
                  alt=""
                  className="Activities-white-icon"
                />
                <img
                  src="/static/icon/pending_project1.png"
                  alt=""
                  className="Activities-green-icon"
                />
                <span className="mob-hide">Pending Projects</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={`nav-link activity-btn`} to="/myactivity">
                <img
                  src="/static/icon/running_project2.png"
                  alt=""
                  className="Activities-white-icon"
                />
                <img
                  src="/static/icon/running_project1.png"
                  alt=""
                  className="Activities-green-icon"
                />
                <span className="mob-hide">Projects Running</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={`nav-link activity-btn`}
                to="/completed-activity"
              >
                <img
                  src="/static/icon/complete_project2.png"
                  alt=""
                  className="Activities-white-icon"
                />
                <img
                  src="/static/icon/complete_project1.png"
                  alt=""
                  className="Activities-green-icon"
                />
                <span className="mob-hide">Completed Projects</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className={`nav-link activity-btn`}
                to="/declined-activity"
              >
                <img
                  src="/static/icon/decline_project2.png"
                  alt=""
                  className="Activities-white-icon"
                />
                <img
                  src="/static/icon/decline_project1.png"
                  alt=""
                  className="Activities-green-icon"
                />
                <span className="mob-hide">Declined Projects</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={`nav-link activity-btn`} to="/like">
                <img
                  src="/static/icon/likes2.png"
                  alt=""
                  className="Activities-white-icon"
                />
                <img
                  src="/static/icon/likes1.png"
                  alt=""
                  className="Activities-green-icon"
                />
                <span className="mob-hide">Likes</span>
              </NavLink>
            </li>
            {/* <li className="nav-item">
            <NavLink className={`nav-link liked-btn`} to="/like">
              <CiHeart style={{ color: `${contextData?.current_professional_tab === "likes" ? "#00a78b" : "white"}`, fontSize: "27px", }} />
              Likes
            </NavLink>
          </li> */}

            <li className="nav-item">
              <NavLink className={`nav-link activity-btn`} to="/ratings">
                <img
                  src="/static/icon/Rating2.png"
                  alt=""
                  className="Activities-white-icon"
                />
                <img
                  src="/static/icon/Rating1.png"
                  alt=""
                  className="Activities-green-icon"
                />
                <span className="mob-hide"> Ratings</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={`nav-link liked-btn`} to="/sold-design">
                <MdSell
                  style={{
                    color: `${
                      contextData?.current_professional_tab === "sold_design"
                        ? "#00a78b"
                        : "white"
                    }`,
                    fontSize: "27px",
                  }}
                />
                <span className="mob-hide"> Sold Design</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={`nav-link liked-btn`}
                to="/subscription-plans"
              >
                <MdSubscriptions
                  style={{
                    color: `${
                      contextData?.current_professional_tab ===
                      "subscription-plans"
                        ? "#00a78b"
                        : "white"
                    }`,
                    fontSize: "27px",
                    marginRight: "5px",
                  }}
                />
                <span className="mob-hide">Subscription Plans</span>
              </NavLink>
            </li>

            {/* <li className="nav-item">
            <NavLink className={`nav-link liked-btn`} to="/ratings">
              <img src="/static/images/likethumb-menu.png" alt="" className="liked-white-icon" />
              <img src="/static/images/greenThumb.png" alt="" className="liked-green-icon" />
              Ratings
            </NavLink>
          </li> */}

            <li className="nav-item">
              <NavLink
                className={`nav-link liked-btn helpactive`}
                to="/professional-guidelines"
              >
                <MdOutlineLiveHelp
                  style={{
                    color: `${
                      contextData?.current_professional_tab === "help"
                        ? "#00a78b"
                        : "white"
                    }`,
                    fontSize: "27px",
                  }}
                />
                <span className="mob-hide" style={{ marginLeft: "5px" }}>
                  Help
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Dashboardside;
