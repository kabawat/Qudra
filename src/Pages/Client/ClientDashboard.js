import React, { useContext, useEffect, useState } from "react";
import ClientDashboardAside from "../../components/ClientDashboardAside";
import { HeaderDashboard } from "../../components/Header";
import Footer from "../../components/Footer";
import Global from "../../context/Global";
import DashboardPane from "../../components/dashboard_tabs/Client/DashboardPane";
import BrowsePane from "../../components/dashboard_tabs/Client/BrowsePane";
import OngoingPane from "../../components/dashboard_tabs/Client/OngoingPane";
import CompletedPane from "../../components/dashboard_tabs/Client/CompletedPane";
import Likes from "../../components/dashboard_tabs/Client/Likes";
import Rating from "../../components/dashboard_tabs/Client/Ratings";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClientGuidlines from "../../components/guidelines/ClientGuidlines";
import { useCookies } from "react-cookie";
import Loader from "../../components/Loader";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const contextData = useContext(Global);
  const [cookies, setCookies] = useCookies()
  const [isReander, setIsReander] = useState(false)

  useEffect(() => {
    if (cookies?.user_data) {
      if (cookies?.user_data?.category_selected) {
        if (cookies?.user_data?.role === "client") {
          setIsReander(true)
        } else {
          navigate('/professionaldashboard')
        }
      } else {
        if (cookies?.user_data?.role === "client") {
          navigate('/client-architechture')
        } else {
          navigate('/categoryArchitecture')
        }
      }
    } else {
      navigate('/select-sign-in')
    }
  }, [])
  return (
    isReander ? <>
      <div className="dashboard">
        <div className="container-fluid h-100">
          <div className="row h-100 dashboard-theme-color">
            <div className="col-xxl-2 col-md-3 px-0 dashboard-theme-color">
              <ClientDashboardAside />
            </div>
            <div className="col-xxl-10 col-md-9 custom-border-radius-one dashboard-theme-skyblue px-0 dashboard-right-section">
              <HeaderDashboard />

              {contextData?.current_client_tab === "dashboard" && (
                <DashboardPane />
              )}
              {contextData?.current_client_tab === "browse" && <BrowsePane />}
              {contextData?.current_client_tab === "Ongoing" && <OngoingPane />}
              {contextData?.current_client_tab === "Completed" && (
                <CompletedPane />
              )}
              {contextData?.current_client_tab === "likes" && <Likes />}
              {contextData?.current_client_tab === "ratings" && <Rating />}
              {contextData?.current_client_tab === "help" && (
                <ClientGuidlines />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </> : <Loader />
  );
};

export default ClientDashboard;
