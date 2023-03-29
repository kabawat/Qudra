import React, { useContext, useEffect, useState } from "react";
import ClientDashboardAside from "../../components/ClientDashboardAside";
import { HeaderDashboard } from "../../components/Header";
import Footer from "../../components/Footer";
import DashboardPane from "../../components/dashboard_tabs/Client/DashboardPane";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Loader from "../../components/Loader";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [cookies, ] = useCookies()
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
              <DashboardPane />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </> : <Loader />
  );
};

export default ClientDashboard;
