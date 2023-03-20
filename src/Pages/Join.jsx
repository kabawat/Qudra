import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { Header3 } from "../components/Header";
import { welcomeImg } from "../components/images";
const Join = () => {
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies()

  useEffect(() => {
    axios.get("http://13.52.16.160:8082/quadra/categories").then((res) => {
      localStorage.setItem("selectCatagory", JSON.stringify(res?.data));
    });
  }, []);

  const [isBusines̥s, setIsBusiness] = useState(localStorage.getItem("Business"));
  if (cookie?.user_data === undefined) {
    return (
      <>
        <div className="create-account let-get-started">
          <Header3 />
          <div className="join-us-now-main d-md-flex align-items-center">
            <div className="join-us-now-text ms-auto d-flex justify-content-center align-items-center flex-column">
              <h3>Let's Get Started</h3>
              <h1 className="py-md-4">Join Now</h1>
              <div className="d-md-flex align-items-center justify-content-between ">
                <Link
                  to={isBusines̥s ? "/professional-buy-and-sale" : "/kickassform"}
                >
                  <button className="me-md-2 mb-md-0 mb-3">
                    I'm Professional
                    <i className="fa-solid  fa-arrow-right-long ms-3"></i>
                  </button>
                </Link>
                <Link to={isBusines̥s ? "/client-buy-sell" : "/client-sign-up"}>
                  <button className="ms-md-2">
                    I'm Client
                    <i className="fa-solid  fa-arrow-right-long ms-3"></i>
                  </button>
                </Link>
              </div>
            </div>
            <div className="join-us-now-image d-none d-md-block">
              <img src={welcomeImg} alt="" />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    axios.post("http://13.52.16.160:8082/identity/get_dashboard_profile/", { ...cookie?.user_data }).then((res) => {
      if (res.data?.data?.category_selected) {
        navigate("/");
      } else {
        if (res?.data?.data?.role === "client") {
          navigate('/client-architechture')
        } else {
          navigate('/categoryArchitecture')
        }
      }
    });
  }
};

export default Join;
