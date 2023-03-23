import React, { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { Header3 } from "../components/Header";
import { welcomeImg } from "../components/images";
import Global from "../context/Global";

const SignInSelect = () => {
  const navigate = useNavigate();
  const contextData = useContext(Global);
  const [cookies] = useCookies()
  useEffect(() => {
    if (cookies?.user_data) {
      if (cookies?.user_data?.role === "professional") {
        navigate('/professionaldashboard')
      } else {
        navigate('/clientdashboard')
      }
    }
  }, [])
  if (cookies?.user_data) {
    if (contextData?.profileData?.category_selected) {
      if (cookies?.user_data?.role === "professional") {
        navigate('/professionaldashboard')
      } else {
        navigate('/clientdashboard')
      }
    } else {
      if (cookies?.user_data?.role === "professional") {
        navigate('/categoryArchitecture')
      } else {
        navigate('/client-architechture')
      }
    }
  } else {
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
  }
};

export default SignInSelect;
