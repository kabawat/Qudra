import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header3 } from "../components/Header";
import { welcomeImg } from "../components/images";
import Global from "../context/Global";
const aStyle = {
  color: "white",
  textDecoration: "none",
};
const bStyle = {
  color: "#01a78a",
  backgroundColor: "",
  textDecoration: "none",
};

const Join = () => {
  const navigate = useNavigate();
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
        if (res?.data?.data?.category_selected === false) {
          navigate("/categoryArchitecture");
        } else {
          if (res?.data?.data?.role === "client") {
            navigate("/");
            contextData.setShowDisclamer(true);
          } else {
            navigate("/");
            contextData.setShowDisclamer(true);
          }
        }
      });
    }
  }, [])

  useEffect(() => {
    axios.get("http://13.52.16.160:8082/quadra/categories").then((res) => {
      localStorage.setItem("selectCatagory", JSON.stringify(res?.data));
    });
  }, []);

  const [isBusines̥s, setIsBusiness] = useState(
    localStorage.getItem("Business")
  );

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
};

export default Join;
