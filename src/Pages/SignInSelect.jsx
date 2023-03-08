import axios from "axios";
import React, { useContext, useEffect } from "react";
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

const SignInSelect = () => {
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
            contextData.setShowDisclamer(true);
            navigate("/", { replace: true });
          } else {
            contextData.setShowDisclamer(true);
            navigate("/", { replace: true });
          }
        }
      });
    }

  }, [])
  return (
    <>
      <div className="create-account let-get-started">
        <Header3 />
        <div className="join-us-now-main d-md-flex align-items-center">
          <div className="join-us-now-text ms-auto d-flex justify-content-center align-items-center flex-column">
            <h3>Let's Get Started</h3>
            <h1 className="py-md-4">Sign In</h1>
            <h5 className="mb-4">
              New here? &nbsp;
              <span
                className="text-decoration-underline"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/join")}
              >
                Sign up now
              </span>
            </h5>
            <div className="d-md-flex align-items-center justify-content-between ">
              <Link to="/login" state={{ role: "professional" }}>
                <button className="me-md-2 mb-md-0 mb-3">
                  Sign In As a Professional
                  <i className="fa-solid  fa-arrow-right-long ms-3"></i>
                </button>
              </Link>
              <Link to="/login" state={{ role: "client" }}>
                <button className="ms-md-2">
                  Sign In As a Client
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

export default SignInSelect;
