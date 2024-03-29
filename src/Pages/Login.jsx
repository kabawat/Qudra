import React, { useState, useEffect, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import axios from "axios";
import * as Yup from "yup";
import {
  Navigate,
  unstable_HistoryRouter,
  useLocation,
} from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import OtpInput from "react-otp-input";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { FacebookProvider, LoginButton } from "react-facebook";
import GoogleLogin from "react-google-login";
import AppleLogin from "react-apple-login";
import $ from "jquery";
import Global from ".././context/Global";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header2 } from "../components/Header";
import { Cookies, useCookies } from "react-cookie";
import ReactLotti from "../loader/ReactLotti";
import Loader from "../components/Loader";
import ReactLotti3 from "../loader/ReactLottie3";
import { BaseUrl } from "../BaseUrl";

const apiUrl = "";
const LoginSchema = Yup.object().shape({
  password: Yup.string().required("Password required"),
  user_name: Yup.string()
    .email("Enter a valid email")
    .required("Email required"),
});
const buttonStyle = {
  border: "none",
  backgroundColor: "transparent",
};
const Login = () => {
  const contextData = useContext(Global);
  const [cookies, setCookie, removeCookie] = useCookies();

  const [passwordEpt, setPasswordEpt] = useState(false);
  const [passwordLen, setPasswordLen] = useState(false);
  const [verifyButtonText, setVerifyButtonText] = useState("Verify");
  const [viewPassword, setViewPassword] = useState(false);
  const [resetEmailInput, setResetEmailInput] = useState("");
  const [resetPasswordInput, setResetPasswordInput] = useState("");
  const location = useLocation();
  const [isVerified, setisVerified] = useState(false);
  const roleAPI = location?.state?.role;
  const [isRender, setIsRender] = useState(false);
  const [submitLoader, setsubmitLoader] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (cookies?.user_data) {
      if (cookies?.user_data?.category_selected) {
        if (cookies?.user_data?.role === "client") {
          navigate("/clientdashboard");
        } else {
          navigate("/professionaldashboard");
        }
      } else {
        if (cookies?.user_data?.role === "professional") {
          navigate("/categoryArchitecture");
        } else {
          navigate("/client-architechture");
        }
      }
    } else {
      if (roleAPI) {
        setIsRender(true);
      } else {
        navigate("/select-sign-in");
      }
    }
  }, []);

  const [error, setError] = useState(false);
  const [submitAPI, setSubmitAPI] = useState(`${BaseUrl}/quadra/login_admin`);
  const [modalShow, setModalShow] = React.useState(false);

  const [loadingActive, setLoadingActive] = useState(false);

  const [showOtpbox, setOtpbox] = useState(false);

  const [otp, handleOTP] = useState("");

  const [regexerr, setRegexerr] = useState(false);
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const handleResetRequest = () => {
    if (resetPasswordInput == "") {
      setPasswordEpt(true);
      return false;
    }

    if (!regex.test(resetPasswordInput)) {
      setRegexerr(true);
      return false;
    }
    setRegexerr(false);
    setsubmitLoader(true);
    axios
      .post(`${BaseUrl}/identity/forget-password`, {
        email: resetEmailInput,
        role: roleAPI,
        otp: otp,
        password: resetPasswordInput,
      })
      .then((res) => {
        if (res?.data?.status === "Failed") {
          setVerifyButtonText("Verify");
          setsubmitLoader(false);
        } else {
          setVerifyButtonText("Verified");
          setModalShow(false);
          setsubmitLoader(false);
        }
        setOtpbox(false);
        setModalShow(false);
        setVerifyButtonText("Verify");
        setResetPasswordInput("");
        setResetEmailInput("");
        handleOTP("");
        setLoadingActive(false);
        toast(
          <div
            className={`text-center ${
              res?.data?.status === "Failed" ? "text-danger" : "text-success"
            } fw-bold`}
          >
            {res?.data?.status === "Failed" ? res?.data?.message : ""}
            {res?.data?.status === "Success" ? res?.data?.message : ""}
          </div>
        );
      });
  };

  const verifyRequestButton = () => {
    let email = $("#EmailInputSignUpForm").val();
    setLoadingActive(true);

    if (!resetEmailInput) {
      setLoadingActive(false);
    }
    axios
      .post(`${BaseUrl}/identity/generate-otp`, {
        email: resetEmailInput,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          setisVerified(true);
          setVerifyButtonText("Sent");
          setLoadingActive(false);
          setOtpbox(true);
        } else {
          setLoadingActive(false);
          setVerifyButtonText("Please Enter a Valid Email");
        }
      });
  };

  return isRender ? (
    <>
      {roleAPI && (
        <div className="create-account">
          <Header2 />
          <main className="create-account-main">
            <div className="container mb-5">
              <Formik
                initialValues={{
                  user_name: "",
                  password: "",
                  role: roleAPI,
                }}
                validationSchema={LoginSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setError(false);
                  axios
                    .post(`${BaseUrl}/identity/account-login`, values)
                    .then((res) => {
                      if (res?.data?.status === "Success") {
                        setCookie("user_data", res?.data?.data);
                        axios
                          .post(`${BaseUrl}/identity/get_dashboard_profile/`, {
                            user_id: res?.data?.data?.user_id,
                            user_token: res?.data?.data?.user_token,
                            role: res?.data?.data?.role,
                          })
                          .then((res) => {
                            contextData?.dispatch({
                              type: "FETCH_PROFILE_DATA",
                              value: res?.data?.data,
                            });
                          });
                        if (res?.data?.data?.category_selected === false) {
                          if (res?.data?.data?.role === "client") {
                            navigate("/client-architechture");
                          } else {
                            navigate("/categoryArchitecture");
                          }
                        } else {
                          if (res?.data?.data?.role === "client") {
                            navigate("/clientdashboard", { replace: true });
                            contextData.setShowDisclamer(true);
                          } else {
                            navigate("/professionaldashboard", {
                              replace: true,
                            });
                            contextData.setShowDisclamer(true);
                          }
                        }
                        setSubmitting(false);
                        contextData?.dispatch({
                          type: "FETCH_USER_DATA",
                          value: res?.data?.data,
                        });
                      } else {
                        // setError(true);
                        setSubmitting(false);
                        toast.error(res.data.message, {
                          position: toast.POSITION.TOP_CENTER,
                        });
                      }
                    });
                }}
              >
                {({ isSubmitting }) => (
                  <Form className="py-md-5">
                    <h1 className="pt-5">Login</h1>
                    <h3 className="pt-md-4">Login your account</h3>
                    <div className="row pt-md-5">
                      <div className="col-md my-md-3 my-1">
                        <div className="create-account-input">
                          <Field
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email"
                            name="user_name"
                          />
                          <i className="fa-regular fa-envelope"></i>
                          <ErrorMessage
                            name="user_name"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md my-md-3 my-1">
                        <div className="create-account-input">
                          <Field
                            type={viewPassword ? "text" : "password"}
                            className="form-control"
                            id="pwd"
                            placeholder="Enter your password"
                            name="password"
                          />
                          <img src="./static/images/LockIcon.png" alt="" />
                          <div className="viewPasswordIcons">
                            {viewPassword ? (
                              <RiEyeCloseLine
                                onClick={() => {
                                  setViewPassword(false);
                                }}
                              />
                            ) : (
                              <RiEyeLine
                                onClick={() => {
                                  setViewPassword(true);
                                }}
                              />
                            )}
                          </div>
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-secondary text-center">
                      {isSubmitting
                        ? "Processing your request , Please wait"
                        : ""}
                      {error && (
                        <p className="text-danger text-center">
                          Your password does not match !
                        </p>
                      )}
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        className="forgerPasswordButton"
                        type="button"
                        onClick={() => setModalShow(true)}
                      >
                        Forgot your password? Reset password.
                      </button>

                      <Modal
                        backdrop="static"
                        keyboard={false}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        className="resetPasswordModal"
                        show={modalShow}
                        onHide={() => {
                          setOtpbox(false);
                          setModalShow(false);
                          setVerifyButtonText("Verify");
                          setResetPasswordInput("");
                          setResetEmailInput("");
                          handleOTP("");
                          setLoadingActive(false);
                        }}
                      >
                        <Modal.Header
                          closeButton
                          // onClick={ () => {
                          //   setOtpbox( false );
                          //   setModalShow( false );
                          //   setVerifyButtonText( "Verify" );
                          //   setResetPasswordInput( "" );
                          //   setResetEmailInput( "" );
                          //   handleOTP( "" );
                          //   setLoadingActive( false );
                          // } }
                        >
                          <Modal.Title id="contained-modal-title-vcenter">
                            Reset your password
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="create-account-input">
                            <input
                              type="email"
                              disabled={isVerified ? true : false}
                              className="form-control"
                              placeholder="Enter your email"
                              value={resetEmailInput}
                              onChange={(e) =>
                                setResetEmailInput(e.target.value)
                              }
                            />
                            <i className="fa-regular fa-envelope"></i>
                            <button
                              onClick={verifyRequestButton}
                              type="button"
                              className={
                                loadingActive
                                  ? "emailVerifyBtnProfessional loadingOuter LoginPageemailVerifyBtn"
                                  : "emailVerifyBtnProfessional LoginPageemailVerifyBtn "
                              }
                              style={
                                ($("#EmailInputSignUpForm").val() === ""
                                  ? { pointerEvents: "none" }
                                  : { pointerEvents: "all" },
                                verifyButtonText === "Sent"
                                  ? { pointerEvents: "none" }
                                  : { pointerEvents: "all" })
                              }
                            >
                              {loadingActive ? (
                                <ReactLotti />
                              ) : (
                                verifyButtonText
                              )}
                            </button>
                          </div>
                          {showOtpbox && (
                            <div className="forgot-box">
                              <div className="otp-box-Main">
                                <div className="col">
                                  <OtpInput
                                    value={otp}
                                    onChange={handleOTP}
                                    numInputs={6}
                                    separator={<span>-</span>}
                                    className="w-100 justify-content-around"
                                  />
                                </div>
                              </div>

                              <div className="create-account-input">
                                {verifyButtonText === "Verify" ? (
                                  <input
                                    type="password"
                                    value={resetPasswordInput}
                                    disabled
                                    onChange={(e) => {
                                      setResetPasswordInput(e.target.value);
                                    }}
                                    // onInput={ ( e ) => {
                                    //   if ( regex.test( e.target.value ) ) setRegexerr( false )
                                    // } }
                                    className="form-control"
                                    id="resetPasswordNewPasswordInput"
                                    placeholder="Enter A New Password"
                                  />
                                ) : (
                                  <input
                                    type="password"
                                    value={resetPasswordInput}
                                    onChange={(e) => {
                                      setPasswordEpt(false);
                                      setPasswordLen(false);
                                      setResetPasswordInput(e.target.value);
                                    }}
                                    className="form-control"
                                    id="resetPasswordNewPasswordInput"
                                    placeholder="Enter A New Password"
                                  />
                                )}
                                <img
                                  src="./static/images/LockIcon.png"
                                  alt=""
                                />
                              </div>
                              {passwordEpt ? (
                                <span className="text-danger">
                                  New Password Required
                                </span>
                              ) : (
                                ""
                              )}
                              {regexerr ? (
                                <span className="text-danger">
                                  Must Contain 8 Characters, One Uppercase, One
                                  Lowercase, One Number and one special case
                                  Character
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          )}
                        </Modal.Body>
                        {isVerified ? (
                          <Modal.Footer>
                            <Button
                              disabled={submitLoader ? true : false}
                              onClick={handleResetRequest}
                              style={{ background: "#01a78a", border: "none" }}
                            >
                              {submitLoader ? <ReactLotti3 /> : "Submit"}
                            </Button>
                            <ToastContainer
                              autoClose={false}
                              hideProgressBar={true}
                              closeOnClick={false}
                            />
                          </Modal.Footer>
                        ) : null}
                      </Modal>
                    </div>
                    <div className="d-md-flex align-items-center justify-content-center mt-md-5 my-2">
                      <button
                        className="create-account-btn px-md-5"
                        type="submit"
                      >
                        <span className="">Log in </span>
                        <i className="fa-solid  fa-arrow-right-long ms-3 "></i>
                      </button>
                    </div>
                    {/* <div className="d-flex align-items-center my-3 justify-content-center py-md-5">
                      <div className="horizontal-line"></div>
                      <p className="m-0 mx-2">Open With</p>
                      <div className="horizontal-line"></div>
                    </div>
                    <div className="d-flex justify-content-center mb-5">
                      <FacebookProvider appId="123456789">
                        <LoginButton
                          className="facebook_login_button"
                          scope="email"
                        >
                          <img src="./static/images/facebook.png" alt="" />
                        </LoginButton>
                      </FacebookProvider>
                      <GoogleLogin
                        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                        render={(renderProps) => (
                          <img
                            src="./static/images/google.png"
                            style={{ cursor: "pointer" }}
                            onClick={renderProps.onClick}
                            className="mx-3"
                            alt=""
                          />
                        )}
                      />
                      <AppleLogin
                        clientId="com.react.apple.login"
                        render={(r) => (
                          <img
                            src="./static/images/apple.png"
                            style={{ cursor: "pointer" }}
                            onClick={r.onClick}
                            alt=""
                          />
                        )}
                        redirectURI="https://redirectUrl.com"
                      />
                    </div> */}
                  </Form>
                )}
              </Formik>
            </div>
          </main>
        </div>
      )}
      <ToastContainer />
    </>
  ) : (
    <Loader />
  );
};

export default React.memo(Login);
