import React from "react";

// import Dashboardside from "../ProfessionalDashboardside";
// import { HeaderDashboard } from "../Header";
// import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import Loader from "../../Loader";
import { useEffect } from "react";
import Dashboardside from "../../ProfessionalDashboardside";
import { HeaderDashboard } from "../../Header";
import freelancer1 from "../../../assets/img/frelancer_1.jpg";
import freelancer2 from "../../../assets/img/frelancer_2.jpg";
import freelancer3 from "../../../assets/img/frelancer_3.jpg";
import freelancer4 from "../../../assets/img/frelancer_4.jpg";
import freelancer5 from "../../../assets/img/frelancer_5.jpg";
import freelancer6 from "../../../assets/img/frelancer_6.jpg";
import freelancer7 from "../../../assets/img/frelancer_7.jpg";
import freelancer8 from "../../../assets/img/frelancer_8.jpg";
import freelancer9 from "../../../assets/img/frelancer_9.jpg";
import freelancer10 from "../../../assets/img/frelancer_10.jpg";
import freelancer11 from "../../../assets/img/frelancer_11.jpg";
import freelancer12 from "../../../assets/img/frelancer_12.jpg";
import top_professional from "../../../assets/vid/top_professional.mp4";
const LastStep = () => {
  const navigate = useNavigate();
  const [isRender, setIsRender] = useState(false);
  const [cookies] = useCookies();
  useEffect(() => {
    if (cookies?.user_data) {
      if (cookies?.user_data?.category_selected) {
        if (cookies?.user_data.role === "professional") {
          setIsRender(true);
        } else {
          navigate("/clientdashboard");
        }
      } else {
        if (cookies?.user_data.role === "professional") {
          navigate("/categoryArchitecture");
        } else {
          navigate("/client-architechture");
        }
      }
    } else {
      navigate("/select-sign-in");
    }
  }, []);
  return isRender ? (
    <>
      <div className="dashboard">
        <div className="container-fluid h-100">
          <div className="row h-100 dashboard-theme-color">
            <div className="col-xxl-2 col-md-3 col-lg-3 dashboard-theme-color">
              <Dashboardside />
            </div>
            <div className="col-xxl-10 col-md-9 col-lg-9 custom-border-radius-one  dashboard-theme-skyblue px-0 dashboard-right-section">
              <HeaderDashboard />
              <main className="dashboard-main">
                <div className="professional-guidelines-wrapper">
                  <div className="Guidelines">
                    <div className="images-container">
                      <div className="row p-4">
                        <div className="col-md-6 col-lg-6 my-2">
                          <div className="video-container video-container2">
                            <video
                              src={top_professional}
                              poster={freelancer1}
                              controls
                              preload="auto"
                            >
                              This video is not supported by your browser
                            </video>
                          </div>
                        </div>
                        <div
                          className="col-md-6 col-lg-6 my-2"
                          style={{ maxHeight: "425px" }}
                        >
                          <img src={freelancer1} alt="guideline-image1" />
                        </div>
                      </div>
                      <div className="row p-4 img-container2">
                        <div className="col-md-6 col-lg-6 my-2 img-container2">
                          <img src={freelancer2} alt="freelancer-image1" />
                        </div>
                        <div className="col-md-6 col-lg-6 my-2">
                          <img src={freelancer3} alt="freelancer-image2" />
                        </div>
                        <div className="col-md-6 col-lg-6 my-2">
                          <img src={freelancer4} alt="freelancer-image3" />
                        </div>
                        <div className="col-md-6 col-lg-6 my-2">
                          <img src={freelancer5} alt="freelancer-image4" />
                        </div>
                        <div className="col-md-6 col-lg-6 my-2">
                          <img src={freelancer6} alt="freelancer-image5" />
                        </div>
                        <div className="col-md-6 col-lg-6 my-2">
                          <img src={freelancer7} alt="freelancer-image6" />
                        </div>
                        <div className="col-md-6 col-lg-6 my-2">
                          <img src={freelancer8} alt="freelancer-image7" />
                        </div>
                        <div className="col-md-6 col-lg-6 my-2">
                          <img src={freelancer9} alt="freelancer-image8" />
                        </div>
                        <div className="col-md-6 col-lg-6 my-2">
                          <img src={freelancer10} alt="freelancer-image9" />
                        </div>
                        <div className="col-md-6 col-lg-6 my-2">
                          <img src={freelancer11} alt="freelancer-image9" />
                        </div>
                        <div className="col-md-6 col-lg-6 my-2">
                          <img src={freelancer12} alt="freelancer-image" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default LastStep;
