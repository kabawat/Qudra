import React, { useState, useEffect, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import axios from "axios";
import * as Yup from "yup";
import { Navigate, unstable_HistoryRouter, useLocation } from "react-router-dom";
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
const apiUrl = "";
const LoginSchema = Yup.object().shape({
  password: Yup.string().required("Required"),
  user_name: Yup.string()
    .email("Please enter a valid email")
    .required("Required"),
});
const buttonStyle = {
  border: "none",
  backgroundColor: "transparent",
};
const Login = () => {

  const [cookie, setCookie, removeCookie] = useCookies()

  const [verifyButtonText, setVerifyButtonText] = useState("Verify");
  const [viewPassword, setViewPassword] = useState(false);

  const contextData = useContext(Global);
  const [resetEmailInput, setResetEmailInput] = useState("");

  const [resetPasswordInput, setResetPasswordInput] = useState("");

  const location = useLocation();
  const roleAPI = location?.state?.role;
  let navigate = useNavigate();
  if (roleAPI === null) {
    navigate("/select-sign-in");
  }
  if (roleAPI === undefined) {
    navigate("/select-sign-in");
  }
  const [error, setError] = useState(false);
  const [submitAPI, setSubmitAPI] = useState(
    "http://13.52.16.160:8082/quadra/login_admin"
  );
  const [modalShow, setModalShow] = React.useState(false);

  const [otp, handleOTP] = useState("");

  const handleResetRequest = () => {
    axios
      .post("http://13.52.16.160:8082/identity/forget-password", {
        email: resetEmailInput,
        role: roleAPI,
        otp: otp,
        password: resetPasswordInput,
      })
      .then((res) => {
        if (res?.data?.status === "Failed") {
          setVerifyButtonText("Verify");
        } else {
          setModalShow(false);
        }
        toast(
          <div
            className={`text-center ${res?.data?.status === "Failed" ? "text-danger" : "text-success"
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
    axios
      .post("http://13.52.16.160:8082/identity/generate-otp", {
        email: resetEmailInput,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          setVerifyButtonText("Sent");
        } else {
          setVerifyButtonText("Please Enter a Valid Email");
        }
      });
  };


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

  return (
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
                  axios.post("http://13.52.16.160:8082/identity/account-login", values).then((res) => {
                    if (res?.data?.status === "Success") {
                      setCookie("user_info", JSON.stringify({ ...res?.data?.data }));
                      axios.post("http://13.52.16.160:8082/identity/get_dashboard_profile/", {
                        user_id: res?.data?.data?.user_id,
                        user_token: res?.data?.data?.user_token,
                        role: res?.data?.data?.role,
                      }).then((res) => {
                        console.log("dashbored", res);
                        localStorage.setItem(
                          "profileImageNameGmail",
                          JSON.stringify(res?.data?.data)
                        );
                        contextData?.dispatch({
                          type: "FETCH_PROFILE_DATA",
                          value: res?.data?.data,
                        });
                      });
                      if (res?.data?.data?.category_selected === false) {
                        navigate("/categoryArchitecture");
                      } else {
                        if (res?.data?.data?.role === "client") {
                          navigate("/clientdashboard", { replace: true });
                          contextData.setShowDisclamer(true);
                        } else {
                          navigate("/professionaldashboard", { replace: true, });
                          contextData.setShowDisclamer(true);
                        }
                      }
                      setSubmitting(false);
                      contextData?.dispatch({
                        type: "FETCH_USER_DATA",
                        value: res?.data?.data,
                      });
                      localStorage.setItem(
                        "user_data",
                        JSON.stringify(res?.data?.data)
                      );
                    } else {
                      setError(true);
                      setSubmitting(false);
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
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        className="resetPasswordModal"
                        show={modalShow}
                      >
                        <Modal.Header
                          closeButton
                          onClick={() => {
                            setModalShow(false);
                            setVerifyButtonText("Verify");
                          }}
                        >
                          <Modal.Title id="contained-modal-title-vcenter">
                            Reset your password
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="create-account-input">
                            <input
                              type="email"
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
                              className="LoginPageemailVerifyBtn"
                              style={
                                ($("#EmailInputSignUpForm").val() === ""
                                  ? { pointerEvents: "none" }
                                  : { pointerEvents: "all" },
                                  verifyButtonText === "Sent"
                                    ? { pointerEvents: "none" }
                                    : { pointerEvents: "all" })
                              }
                            >
                              {verifyButtonText}
                            </button>
                          </div>
                          <div className="create-account-input">
                            {verifyButtonText === "Verify" ? (
                              <input
                                type="password"
                                value={resetPasswordInput}
                                disabled
                                onChange={(e) =>
                                  setResetPasswordInput(e.target.value)
                                }
                                className="form-control"
                                id="resetPasswordNewPasswordInput"
                                placeholder="Enter A New Password"
                              />
                            ) : (
                              <input
                                type="password"
                                value={resetPasswordInput}
                                onChange={(e) =>
                                  setResetPasswordInput(e.target.value)
                                }
                                className="form-control"
                                id="resetPasswordNewPasswordInput"
                                placeholder="Enter A New Password"
                              />
                            )}
                            <img src="./static/images/LockIcon.png" alt="" />
                          </div>
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
                        </Modal.Body>
                        <Modal.Footer>
                          <Button onClick={handleResetRequest}>Submit</Button>
                          <ToastContainer
                            autoClose={false}
                            hideProgressBar={true}
                            closeOnClick={false}
                          />
                        </Modal.Footer>
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
                    <div className="d-flex align-items-center my-3 justify-content-center py-md-5">
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
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default React.memo(Login);
