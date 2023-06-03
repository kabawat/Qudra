import React from "react";

import Dashboardside from "../ProfessionalDashboardside";
import { HeaderDashboard } from "../Header";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import Loader from "../Loader";
import { useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../../BaseUrl";

const ProfessionalGuidelines = () => {
  const navigate = useNavigate();
  const [isRender, setIsRender] = useState(false);
  const [guideImages, setGuideImages] = useState([]);
  const [status, setStatus] = useState(true);
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

    /// Guideline Images API called :
    const formData = new FormData();
    formData.append("page", "Professional_help");

    axios
      .post(`${BaseUrl}/quadra/page_media/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res?.data?.status === "Failed") {
          setStatus(false);
        } else {
          setStatus(true);
          setGuideImages(res?.data?.data);
        }
      })
      .catch((errr) => {});
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
                        {status ? (
                          guideImages &&
                          guideImages?.map((item, i) => {
                            let checkExt = item?.media?.split(".").pop();
                            if (
                              checkExt === "mp4" ||
                              checkExt === "avi" ||
                              checkExt === "mkv"
                            ) {
                              return (
                                <div className="col-md-6 col-lg-6 my-2" key={i}>
                                  <div className="video-container">
                                    <video
                                      src={item?.media}
                                      // poster={ profGuidelineImg1 }
                                      controls
                                      preload="auto"
                                    >
                                      This video is not supported by your
                                      browser
                                    </video>
                                  </div>
                                </div>
                              );
                            } else {
                              return (
                                <div className="col-md-6 col-lg-6 my-2">
                                  <img
                                    src={item?.media}
                                    alt="guideline-image"
                                  />
                                </div>
                              );
                            }
                          })
                        ) : (
                          <>
                            <div
                              style={{
                                minHeight: "600px",
                                display: "grid",
                                placeItems: "center",
                              }}
                            >
                              <span className="h4">No Data Found</span>
                            </div>
                          </>
                        )}
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

export default ProfessionalGuidelines;
