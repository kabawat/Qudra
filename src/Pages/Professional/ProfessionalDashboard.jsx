import React, { useContext } from "react";
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
const Dashboard = () => {
  const contextData = useContext(Global);
  return (
    <>
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
              </main>
            </div>
          </div>
        </div>
      </div>
      <InstructionModal />
      <Footer />
    </>
  );
};

export default Dashboard;
