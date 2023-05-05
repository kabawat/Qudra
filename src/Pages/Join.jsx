import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { Header3 } from "../components/Header";
import { welcomeImg } from "../components/images";
import HeroesSection from ".././components/HeroesSection";
import HeroesSection1 from "../components/HeroesSection1";
const Join = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies();

  useEffect(() => {
    axios.get("http://13.52.16.160:8082/quadra/categories").then((res) => {
      localStorage.setItem("selectCatagory", JSON.stringify(res?.data));
    });
    const script = document.createElement("script");
    script.src = "/heroes.js";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [isBusines̥s, setIsBusiness] = useState(
    localStorage.getItem("Business")
  );

  const isCookies = () => {
    if (cookies?.user_data?.category_selected) {
      if (cookies?.user_data?.role === "client") {
        navigate("/clientdashboard");
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
  };

  if (cookies?.user_data) {
    isCookies();
  } else {
    return (
      <div style={{ position: "relative" }}>
        <div className="create-account let-get-started animationLogin">
          <Header3 navColor="black" />
          <HeroesSection1 />
          <div className="join-us-now-main d-md-flex align-items-center newJoin">
            <div className="join-us-now-text ms-auto d-flex justify-content-center align-items-center flex-column">
              <h3>Let's Get Started</h3>
              <h1 className="py-md-4">Join Now</h1>
              <div className="d-md-flex align-items-center justify-content-between ">
                <Link
                  to={
                    isBusines̥s ? "/professional-buy-and-sale" : "/kickassform"
                  }
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
      </div>
    );
  }
};

export default Join;
