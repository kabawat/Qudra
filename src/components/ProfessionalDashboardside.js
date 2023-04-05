import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { MdOutlineLiveHelp } from "react-icons/md";
import Global from "../context/Global";

const Dashboardside = () => {
  const contextData = useContext(Global);
  return (
    <>
      <aside>
        <Link to="/" className="d-block px-3 ps-xxl-4 ps-4 pb-4 pb-xxl-2  pt-5 pt-xxl-5">
          <img src="/static/images/Quadra-transparrent-logo.png" alt="logo" style={{ height: "100px" }} />
        </Link>
        <div className="px-xxl-5 px-4 py-xxl-5 py-4 progress-bar-main">
          <label htmlFor="progressbar-quality-of-work">Quality of Work</label>
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: "80%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
              <span>80%</span>
            </div>
          </div>
          <label htmlFor="progressbar-quality-of-work">Inbox Response</label>
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: "80%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
              <span>80%</span>
            </div>
          </div>
          <label htmlFor="progressbar-quality-of-work">Delivered on time</label>
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: "80%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
              <span>80%</span>
            </div>
          </div>
          <label htmlFor="progressbar-quality-of-work">Order Completion</label>
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{ width: "80%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" >
              <span>80%</span>
            </div>
          </div>
        </div>
        <ul className="nav nav-tabs flex-column border-0 ps-xxl-4 ps-2 pb-3" role="tablist">
          <li className="nav-item">
            <NavLink to='/professionaldashboard' className={`nav-link dashboard-button`}>
              <img src="/static/images/Dashboard-menu-button.png" alt="" className="dashboard-white-icon" />
              <img src="/static/images/dashboard-menu-green.png" alt="" className="dashboard-green-icon" />
              Dashboard
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className={`nav-link  browse-products-btn`} to="/portfolio">
              <img src="/static/images/browseproject-menu.png" alt="" className="browse-green-icon" />
              <img src="/static/images/browse-project-white.png" alt="" className="browse-white-icon" />
              Portfolio
            </NavLink>
          </li>



          <li className="nav-item">
            <NavLink className={`nav-link activity-btn`} to="/request-projects">
              <img src="/static/icon/request_project2.png" alt="" className="Activities-white-icon" />
              <img src="/static/icon/request_project1.png" alt="" className="Activities-green-icon" />
              Request Projects
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={`nav-link activity-btn`} to="/pending-activity">
              <img src="/static/icon/pending_project2.png" alt="" className="Activities-white-icon" />
              <img src="/static/icon/pending_project1.png" alt="" className="Activities-green-icon" />
              Pending Projects
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className={`nav-link activity-btn`} to="/myactivity">
              <img src="/static/icon/running_project2.png" alt="" className="Activities-white-icon" />
              <img src="/static/icon/running_project1.png" alt="" className="Activities-green-icon" />
              Projects Running
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className={`nav-link activity-btn`} to="/completed-activity">
              <img src="/static/icon/complete_project2.png" alt="" className="Activities-white-icon" />
              <img src="/static/icon/complete_project1.png" alt="" className="Activities-green-icon" />
              Completed Projects
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className={`nav-link activity-btn`} to="/declined-activity">
              <img src="/static/icon/decline_project2.png" alt="" className="Activities-white-icon" />
              <img src="/static/icon/decline_project1.png" alt="" className="Activities-green-icon" />
              Declined Projects
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className={`nav-link activity-btn`} to="/like">
              <img src="/static/icon/likes2.png" alt="" className="Activities-white-icon" />
              <img src="/static/icon/likes1.png" alt="" className="Activities-green-icon" />
              Likes
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
              <img src="/static/icon/Rating2.png" alt="" className="Activities-white-icon" />
              <img src="/static/icon/Rating1.png" alt="" className="Activities-green-icon" />
              Ratings
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className={`nav-link activity-btn`} to="/subscription-plans">
              <img src="/static/icon/Rating2.png" alt="" className="Activities-white-icon" />
              <img src="/static/icon/Rating1.png" alt="" className="Activities-green-icon" />
              Subscription Plans
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
            <NavLink className={`nav-link liked-btn`} to="/professional-guidelines">
              <MdOutlineLiveHelp style={{ color: `${contextData?.current_professional_tab === "help" ? "#00a78b" : "white"}`, fontSize: "27px", }} />
              <span style={{ marginLeft: "5px" }}> Help</span>
            </NavLink>
          </li>

        </ul>
      </aside>
    </>
  );
};

export default Dashboardside;
