import React, { useContext, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import DashboardPane from "../../components/dashboard_tabs/Professional/DashboardPane";
import PortfolioPane from "../../components/dashboard_tabs/Professional/PortfolioPane";
import Dashboardside from "../../components/ProfessionalDashboardside";
import Ratings from "../../components/dashboard_tabs/Professional/Ratings";
import { HeaderDashboard } from "../../components/Header";
import "react-toastify/dist/ReactToastify.css";
import Global from "../../context/Global";
import ActivitiesPane from "../../components/dashboard_tabs/Professional/ActivitiesPane";
import InstructionModal from "../../components/Modals/InstructionModal";
import Likes from "../../components/dashboard_tabs/Professional/Likes";
import ProfessionalGuidelines from "../../components/guidelines/ProfessionalGuidelines";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Loader from "../../components/Loader";

const Dashboard = () => {
  const contextData = useContext(Global);
  const navigate = useNavigate()
  const [cookies] = useCookies()
  const [isRender, setIsRender] = useState(false)

  useEffect(() => {
    if (cookies?.user_data) {
      if (cookies?.user_data?.category_selected) {
        if (cookies?.user_data.role === "professional") {
          setIsRender(true)
        } else {
          navigate('/clientdashboard')
        }
      } else {
        if (cookies?.user_data.role === "professional") {
          navigate('/categoryArchitecture')
        } else {
          navigate('/client-architechture')
        }
      }
    } else {
      navigate('/select-sign-in')
    }
  }, [])

  return (
    isRender ? <>
      <div className="dashboard">
        <div className="container-fluid h-100">
          <div className="row h-100 dashboard-theme-color">
            <div className="col-xxl-2 col-md-3 px-0 dashboard-theme-color">
              <Dashboardside />
            </div>
            <div className="col-xxl-10 col-md-9 custom-border-radius-one  dashboard-theme-skyblue px-0 dashboard-right-section">
              <HeaderDashboard />
              <main className="dashboard-main">
                {contextData?.current_professional_tab === "dashboard" && (
                  <DashboardPane />
                )}
                {contextData?.current_professional_tab === "Portfolio" && (
                  <PortfolioPane />
                )}
                {contextData?.current_professional_tab === "activities" && (
                  <ActivitiesPane />
                )}
                {contextData?.current_professional_tab === "ratings" && (
                  <Ratings />
                )}
                {contextData?.current_professional_tab === "likes" && <Likes />}
                {contextData?.current_professional_tab === "help" && (
                  <ProfessionalGuidelines />
                )}
              </main>
            </div>
          </div>
        </div>
      </div>
      <InstructionModal />
      <Footer />
    </> : <Loader />
  );
};

export default Dashboard;
