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
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ClientDashboard = () => {
  const navigate = useNavigate()
  const contextData = useContext(Global);
  useEffect(() => {
    const user_data = JSON.parse(localStorage.getItem("user_data"))
    if (user_data) {
      axios.post("http://13.52.16.160:8082/identity/get_dashboard_profile/", {
        ...user_data
      }).then((res) => {
        localStorage.setItem(
          "profileImageNameGmail",
          JSON.stringify(res?.data?.data)
        );
        contextData?.dispatch({
          type: "FETCH_PROFILE_DATA",
          value: res?.data?.data,
        });

        contextData?.dispatch({
          type: "FETCH_USER_DATA",
          value: user_data
        });

        localStorage.setItem(
          "user_data",
          JSON.stringify(user_data)
        );
        if (res?.data?.data?.category_selected === true) {
          // navigate("/");
        } else {
          if (user_data?.role === "client") {
            contextData.setShowDisclamer(true);
            navigate("/client-architechture");
          } else {
            contextData.setShowDisclamer(true);
            navigate("/categoryArchitecture");
          }
        }
      });
    }
  }, [])
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
};

export default ClientDashboard;
