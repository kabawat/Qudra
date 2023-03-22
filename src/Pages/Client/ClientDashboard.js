import React, { useContext, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const ClientDashboard = () => {
  const [cookies] = useCookies()
  const navigate = useNavigate()
  const contextData = useContext(Global);

  if (cookies?.user_data) {
    if (cookies?.user_data?.role === "client") {
      return (
        <>
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
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      );
    } else {
      navigate('/professionaldashboard')
    }
  } else {
    navigate('/select-sign-in')
  }
};

export default ClientDashboard;
