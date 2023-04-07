import React from "react";
import clientGuideVid from "../../assets/vid/clientGuidelineVid.mp4";
import clientGuidelineImg1 from "../../assets/img/clientGuideImg1.jpg";
import clientGuidelineImg2 from "../../assets/img/clientGuideImg2.jpg";
import clientGuidelineImg3 from "../../assets/img/clientGuideImg3.jpg";
import clientGuidelineImg4 from "../../assets/img/clientGuideImg4.jpg";
import clientGuidelineImg5 from "../../assets/img/clientGuideImg5.jpg";
import clientGuidelineImg6 from "../../assets/img/clientGuideImg6.jpg";
import clientGuidelineImg7 from "../../assets/img/clientGuideImg7.jpg";
import clientGuidelineImg8 from "../../assets/img/clientGuideImg8.jpg";
import ClientDashboardAside from "../ClientDashboardAside";
import { HeaderDashboard } from "../Header";
import Footer from "../Footer";
import { useCookies } from "react-cookie";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const ClientGuidlines = () => {
  const [cookies] = useCookies();
  const [isRender, setIsReander] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies?.user_data) {
      if (cookies?.user_data?.category_selected) {
        if (cookies?.user_data?.role === "client") {
          setIsReander(true);
        } else {
          navigate("/professionaldashboard");
        }
      } else {
        if (cookies?.user_data?.role === "client") {
          navigate("/client-architechture");
        } else {
          navigate("/categoryArchitecture");
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
            <div className="col-xxl-2 col-md-3 px-0 dashboard-theme-color">
              <ClientDashboardAside />
            </div>
            <div className="col-xxl-10 col-md-9 custom-border-radius-one dashboard-theme-skyblue px-0 dashboard-right-section">
              <HeaderDashboard />
              <div className="client-guidelines-wrapper row px-md-3">
                <div className="images-container col-md-12">
                  <ul className="image-list row">
                    <li className="col-md-6 mb-2">
                      <img src={clientGuidelineImg1} alt="guideline-image1" />
                    </li>
                    <li className="col-md-6 mb-3">
                      <img src={clientGuidelineImg2} alt="guideline-image2" />
                    </li>
                    <li className="col-md-6 mb-3">
                      <img src={clientGuidelineImg3} alt="guideline-image3" />
                    </li>
                    <li className="col-md-6 mb-3">
                      <img src={clientGuidelineImg4} alt="guideline-image4" />
                    </li>
                    <li className="col-md-6 mb-3">
                      <img src={clientGuidelineImg5} alt="guideline-image5" />
                    </li>
                    <li className="col-md-6 mb-3">
                      <img src={clientGuidelineImg6} alt="guideline-image6" />
                    </li>
                    <li className="col-md-6 mb-3">
                      <img src={clientGuidelineImg7} alt="guideline-image7" />
                    </li>
                    <li className="col-md-6 mb-3">
                      <img src={clientGuidelineImg8} alt="guideline-image8" />
                    </li>
                  </ul>
                </div>
                <div className="video-container col-md-6">
                  <video
                    src={clientGuideVid}
                    controls
                    poster={clientGuidelineImg1}
                    preload="auto"
                  >
                    This video can't be played
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loader />
  );
};

export default ClientGuidlines;

// style = { {
//     display: 'flex',
//         justifyContent: 'center',
//             height: '100vh',
//                 paddingTop: '7%'
// } }

// vid tag
// style = { {
//     width: '90%',
//         height: '60%'
// } }
