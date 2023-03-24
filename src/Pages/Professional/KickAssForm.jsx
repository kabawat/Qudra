import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Header2 } from "../../components/Header";
import { infoIcon } from "../../components/images";
import Global from "../../context/Global";
import Loader from "../../components/Loader";
import { useCookies } from "react-cookie";
import { useContext } from "react";
const KickAssForm = () => {
  const [kickassPoints, setKickassPoints] = useState([]);
  const contextData = useContext(Global)
  const [cookies] = useCookies()
  let navigate = useNavigate();
  useEffect(() => {
    axios
      .post("http://13.52.16.160:8082/quadra/profile_points", {
        type: "Kickass Profile",
      })
      .then((res) => {
        setKickassPoints(res?.data?.data);
      });
  }, []);


  const isCookies = () => {
    if (cookies?.user_data?.category_selected) {
      if (cookies.user_data.role === "professional") {
        navigate('/professionaldashboard')
      } else {
        navigate('/clientdashboard')
      }
    } else {
      if (cookies.user_data.role === "professional") {
        navigate('/categoryArchitecture')
      } else {
        navigate('/client-architechture')
      }
    }
  }

  if (cookies?.user_data) {
    isCookies()
  } else {
    return (
      kickassPoints.length ?
        <div className="create-account">
          <Header2 />
          <main className="create-account-main">
            <div className="container mb-5">
              <form action="# " className="py-md-5">
                <h1 className="pt-md-4">How to create a Kickass Profile</h1>

                {kickassPoints.map((res, index) => {
                  return (
                    <div
                      className={`row ${index === 0 ? "pt-md-5" : ""}`}
                      key={index}
                    >
                      <div className="col-md my-md-3 my-1">
                        <div className="create-account-input">
                          <div className="policy-span">
                            <img
                              src={infoIcon}
                              alt=""
                              style={{ position: "static" }}
                              className="me-3"
                            />
                            {res.point}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="d-flex align-items-center justify-content-center my-md-5 my-2 flex-md-row flex-column-reverse">
                  <Link to="/join" className="text-decoration-none">
                    <button className="create-account-btn px-md-5">
                      <i className="fa-solid  fa-arrow-left-long  ps-5"></i>
                      <span className=" ms-3 pe-4 me-5">Back</span>
                    </button>
                  </Link>
                  <Link to="/quadroterms" className="text-decoration-none">
                    <button className="logInbtn px-md-5 mb-md-0 mb-md-0 mb-3">
                      <span className="ps-5">Next</span>
                      <i className="fa-solid  fa-arrow-right-long ms-3 me-5"></i>
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </main>
        </div> : <Loader />
    );
  }
};

export default KickAssForm;
