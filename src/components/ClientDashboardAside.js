import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import Global from "../context/Global";
import { CiHeart } from "react-icons/ci";
import { MdOutlineLiveHelp } from "react-icons/md";
const ClientDashboardAside = () => {
  const contextData = useContext(Global);
  return (
    <aside>
      <Link to="/" className="d-block px-3 ps-xxl-4 ps-4 pb-4 pb-xxl-2  pt-5 pt-xxl-5">
        <img src="/static/images/Quadra-transparrent-logo.png"
          alt="logo" style={{ height: "100px" }}
        />
      </Link>
      <ul className="nav nav-tabs flex-column border-0 ps-xxl-4 ps-2 mt-3">
        <li className="nav-item">
          <NavLink className={`nav-link dashboard-button `} to="/clientdashboard" >
            <img src="/static/images/Dashboard-menu-button.png" alt="" className="dashboard-white-icon" />
            <img src="/static/images/dashboard-menu-green.png" alt="" className="dashboard-green-icon" />
            Dashboard
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className={`nav-link browse-products-btn `} to="/browse-professionals">
            <img src="/static/images/businessmanGreen.png" alt="" className="browse-green-icon" />
            <img src="/static/images/businessmanWhite.png" alt="" className="browse-white-icon" />
            Browse Professionals
          </NavLink>
        </li>

        {/* <li className="nav-item">
          <NavLink className={`nav-link activity-btn`} to="/pending-project">
            <img src="/static/images/activity-menu.png" alt="" className="Activities-white-icon" />
            <img src="/static/images/green-activity-menu.png" alt="" className="Activities-green-icon" />
            Pending Projects
          </NavLink>
        </li> */}

        <li className="nav-item">
          <NavLink className={`nav-link activity-btn`} to="/pending-project">
            <img src="/static/icon/pending_project2.png" alt="" className="Activities-white-icon" />
            <img src="/static/icon/pending_project1.png" alt="" className="Activities-green-icon" />
            Pending Projects
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className={`nav-link activity-btn`} to="/accept-project">
            <img src="/static/icon/Accepted_projects2.png" alt="" className="Activities-white-icon" />
            <img src="/static/icon/Accepted_projects1.png" alt="" className="Activities-green-icon" />
            Accepted Projects
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className={`nav-link activity-btn`} to="/ongoing-projects">
            <img src="/static/icon/ongoing_projects2.png" alt="" className="Activities-white-icon" />
            <img src="/static/icon/ongoing_projects1.png" alt="" className="Activities-green-icon" />
            Ongoing Projects
          </NavLink>
        </li>


        <li className="nav-item">
          <NavLink className={`nav-link activity-btn `} to="/completed-projects" >
            <img src="/static/icon/complete_project2.png" alt="" className="Activities-white-icon" />
            <img src="/static/icon/complete_project1.png" alt="" className="Activities-green-icon" />
            Completed Projects
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={`nav-link activity-btn `} to="/declined-projects" >
            <img src="/static/icon/decline_project2.png" alt="" className="Activities-white-icon" />
            <img src="/static/icon/decline_project1.png" alt="" className="Activities-green-icon" />
            Declined Projects
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className={`nav-link activity-btn`} to="/client-liked" >
            <img src="/static/icon/likes2.png" alt="" className="Activities-white-icon" />
            <img src="/static/icon/likes1.png" alt="" className="Activities-green-icon" />
            Likes
          </NavLink>
        </li>
        {/* <li className="nav-item">
          <NavLink className={`nav-link ${contextData?.current_client_tab === "likes" ? "active" : ""} liked-btn`} to="/client-liked" >
            <CiHeart style={{ color: `${contextData?.current_client_tab === "likes" ? "#00a78b" : "white"}`, fontSize: "27px", }} />
            Likes
          </NavLink>
        </li> */}

        <li className="nav-item">
          <NavLink className={`nav-link activity-btn`} to="/client-rating" >
            <img src="/static/icon/Rating2.png" alt="" className="Activities-white-icon" />
            <img src="/static/icon/Rating1.png" alt="" className="Activities-green-icon" />
            Ratings
          </NavLink>
        </li>

        <li className="nav-item"  >
          <NavLink className={`nav-link ${contextData?.current_client_tab === "help" ? "active" : ""} liked-btn`} to="/client-guidlines">
            <MdOutlineLiveHelp style={{ color: `${contextData?.current_client_tab === "help" ? "#00a78b" : "white"}`, fontSize: "27px", }} />
            <span style={{ marginLeft: "5px" }}> Help</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default ClientDashboardAside;
