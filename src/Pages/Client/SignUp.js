import React, { useEffect, useState, useContext } from "react";
import { Header2 } from "../../components/Header";
import * as Yup from "yup";
import CountrySelect from "react-bootstrap-country-select";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import axios from "axios";
import $ from "jquery";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Modal from "react-bootstrap/Modal";
import OtpInput from "react-otp-input";
import PhoneInput from "react-phone-input-2";
import Loader from "../../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FacebookProvider, LoginButton } from "react-facebook";
import GoogleLogin from "react-google-login";
import AppleLogin from "react-apple-login";
import CountryDropdown from "country-dropdown-with-flags-for-react";
import Global from "../../context/Global";
import ReactLotti from "../../loader/ReactLotti";
const SignUpSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be aleast 8 characters long!")
    .max(30, "Password is too long!")
    .required("Required"),
  email: Yup.string().email("Please enter a valid email").required("Required"),
  last_name: Yup.string()
    .min(3, "Please enter your last name")
    .required("Required"),
  mobile_no: Yup.string()
    .min(3, "Please enter your mobile number")
    .required("Required"),
  first_name: Yup.string()
    .min(3, "Please enter your first name")
    .required("Required"),
  agreedTerms: Yup.bool().oneOf(
    [true],
    "Accept Terms & Conditions is required"
  ),
});

const style = {
  color: "#01a78a",
  textDecoration: "none",
};

const SignIn = () => {
  const [profileerr, setprofileerr] = useState("none");
  const [viewPassword, setViewPassword] = useState(false);
  const [loadingActive, setLoadingActive] = useState(false);
  const [verifyTextExist, setVerifyTextExist] = useState();
  const contextData = useContext(Global);
  const [isLoading, setLoading] = useState(false);

  const [OtpResponse, setOtpResponse] = useState("verify");
  const [OtpResult, setOtpResult] = useState(false);

  let navigate = useNavigate();

  const [emailExists, setEmailExists] = useState(false);

  const verifyRequestButton = () => {
    let email = $("#EmailInputSignUpForm").val();
    setLoadingActive(true);

    axios
      .post("http://13.52.16.160:8082/identity/verify-email", {
        email: email,
      })
      .then((res) => {
        if (res?.data?.status === "Failed") {
          setShow(false);
          setLoadingActive(false);
          setExistingEmail(true);
          setOtpResponse("verify");
        }
        if (res?.data?.status === "Success") {
          setShow(true);
          setLoadingActive(false);
          setExistingEmail(false);
        }
      });
  };
  const [validateOTP, setValidateOTP] = useState(false);

  const [otp, handleOTP] = useState("");
  var otp̥Length = otp.length;

  const handleOTPSubmit = (e) => {
    let email = $("#EmailInputSignUpForm").val();

    e.preventDefault();
    axios
      .put("http://13.52.16.160:8082/identity/verify-email", {
        email: email,
        otp: otp,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          setOtpResponse("verified");
          setShow(false);
        } else if (res?.data?.status === "Failed") {
          setOtpResponse("verify");
          handleOTP("");
          setValidateOTP(true);
        }
        if (res?.data?.message !== "Otp expired") {
          setOtpResponse("verified");
        } else {
          setOtpResponse("verify");
          setValidateOTP(true);
        }
      });
  };

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setValidateOTP(false);
    setOtpResponse("verify");
  };
  const [existingEmail, setExistingEmail] = useState(false);
  const handleEmailFocus = () => {
    setExistingEmail(false);
    setOtpResponse("verify");
  };

  useEffect(() => {
    setVerifyTextExist($(".emailVerifyBtnProfessional").text());
  }, []);
  const [filePic, setFilePic] = useState("");
  const photoChange = (e) => {
    const fileReader = new FileReader();
    const file = e.target.files[0];
    setFilePic(file);

    if (file) {
      let reader = new FileReader();
      reader.onload = function (event) {
        $(" #imgPreview").attr("src", event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const [value, setValue] = useState({
    // alpha2: "in",
    // alpha3: "ind",
    // flag: "in",
    // id: "in",
    // ioc: "ind",
    // name: "INDIA",
  });

  const [firsterror, SetFirsterror] = useState("");

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="create-account">
          <Header2 />
          <main className="create-account-main">
            <div className="container">
              <Formik
                enableReinitialize
                initialValues={{
                  email: "",
                  password: "",
                  first_name: "",
                  last_name: "",
                  email_verify: true,
                  nation: "",
                  mobile_no: "",
                }}
                validationSchema={SignUpSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setLoading(true);
                  axios
                    .post(
                      "http://13.52.16.160:8082/identity/signup_client",
                      values
                    )
                    .then((res) => {
                      if (res?.data?.status !== "Success") {
                        setOtpResponse("Please try Again");
                        navigate("/client-sign-up");
                        setLoading(false);
                        localStorage.clear();
                      }

                      const signupuser = new FormData();
                      signupuser.append("image", filePic);
                      signupuser.append("user_id", res?.data?.data?.user_id);
                      signupuser.append(
                        "user_token",
                        res?.data?.data.user_token
                      );
                      signupuser.append("role", res?.data?.data.role);

                      if (res?.data?.status === "Success") {
                        axios
                          .post(
                            "http://13.52.16.160:8082/identity/client_profile",
                            signupuser
                          )
                          .then((respo) => {
                            if (respo.data?.status === "Success") {
                              axios
                                .post(
                                  "http://13.52.16.160:8082/identity/get_dashboard_profile/",
                                  {
                                    user_id: res?.data?.data?.user_id,
                                    user_token: res?.data?.data?.user_token,
                                    role: res?.data?.data?.role,
                                  }
                                )
                                .then((response) => {
                                  contextData?.dispatch({
                                    type: "FETCH_PROFILE_DATA",
                                    value: response?.data?.data,
                                  });
                                  localStorage.setItem(
                                    "profileImageNameGmail",
                                    JSON.stringify(response?.data?.data)
                                  );
                                  contextData?.setShowDisclamer(true);
                                });
                              navigate("/client-architechture", {
                                replace: true,
                              });
                            } else {
                              navigate("/client-sign-up");
                              setLoading(false);
                              localStorage.clear();
                            }
                          });
                        contextData?.dispatch({
                          type: "FETCH_USER_DATA",
                          value: res?.data?.data,
                        });
                        localStorage.setItem(
                          "user_data",
                          JSON.stringify(res?.data?.data)
                        );
                        setEmailExists(false);
                      }
                    });
                }}
              >
                {({ setFieldValue }) => (
                  <Form>
                    <h1>Create Account</h1>
                    <h3>You’re on your way to connecting with great talent!</h3>
                    <div className="row">
                      <div className="col-md my-md-3 my-1">
                        <div className="create-account-input">
                          <Field
                            type="text"
                            name="first_name"
                            className="form-control"
                            placeholder="First Name"
                          />

                          <i className="fa-regular fa-user"></i>
                          <ErrorMessage
                            name="first_name"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md my-md-3 my-1">
                        <div className="create-account-input">
                          <Field
                            type="text"
                            name="last_name"
                            className="form-control"
                            placeholder="Last Name"
                          />
                          <i className="fa-regular fa-user"></i>
                          <ErrorMessage
                            name="last_name"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md my-md-3 my-1">
                        <div className="create-account-input create-account-email-input">
                          <Field
                            type="email"
                            className="form-control"
                            id="EmailInputSignUpForm"
                            placeholder="Enter Your Mail"
                            name="email"
                            onInput={handleEmailFocus}
                          />

                          <button
                            onClick={verifyRequestButton}
                            type="button"
                            className={
                              loadingActive
                                ? "emailVerifyBtnProfessional loadingOuter"
                                : "emailVerifyBtnProfessional "
                            }
                            style={
                              $("#EmailInputSignUpForm").val()
                                ? { pointerEvents: "all" }
                                : { pointerEvents: "none" }
                            }
                          >
                            {loadingActive ? <ReactLotti /> : OtpResponse}
                          </button>
                          <Modal
                            show={show}
                            className="OtpInputModal"
                            onHide={handleClose}
                            size="sm"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Enter your OTP</Modal.Title>
                            </Modal.Header>
                            <div
                              className="otp-box-Main"
                              onSubmit={handleOTPSubmit}
                            >
                              <div className="col">
                                <OtpInput
                                  value={otp}
                                  onChange={handleOTP}
                                  numInputs={6}
                                  separator={<span>-</span>}
                                  className="w-100 justify-content-around"
                                />
                                {validateOTP ? (
                                  <p className="text-danger">
                                    Please Enter a valid OTP !
                                  </p>
                                ) : (
                                  ""
                                )}
                              </div>
                              <button
                                variant="secondary"
                                type="button"
                                className="otpSubmitButton"
                                onClick={handleOTPSubmit}
                                style={
                                  otp̥Length === 6
                                    ? { pointerEvents: "all" }
                                    : { pointerEvents: "none" }
                                }
                              >
                                Submit
                              </button>
                            </div>
                          </Modal>
                          <i className="fa-regular fa-envelope"></i>
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                        {existingEmail ? (
                          <p className="text-danger">
                            Email is already registered !
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-md my-md-3 my-1">
                        <div className="create-account-input">
                          <Field
                            type={viewPassword ? "text" : "password"}
                            className="form-control"
                            id="pwd"
                            placeholder="Password"
                            name="password"
                          />
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
                          <img src="./static/images/LockIcon.png" alt="" />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      {emailExists ? (
                        <div className="m-2 text-danger">
                          Email is already registered
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="row my-md-3 my-1">
                      <div className="col-md my-md-3 my-1">
                        {/* <CountryDropdown
                          preferredCountries={["in", "us"]}
                          handleChange={(e) => {
                            let c = e.target.value;
                            let countryName = c.slice(
                              0,
                              c.indexOf("(") == -1
                                ? c.length + 1
                                : c.indexOf("(") - 1
                            );
                            setFieldValue("nation", countryName);
                          }}
                        ></CountryDropdown> */}
                        <CountrySelect
                          value={value}
                          onChange={(val) => {
                            setValue(val);
                            setFieldValue("nation", val?.name);
                          }}
                          flags={true}
                          placeholder="Select An Country"
                          name="nation"
                        />
                        <ErrorMessage
                          name="nation"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div className="col-md my-md-3 my-1">
                        <PhoneInput
                          placeholder="Enter phone number"
                          enableAreaCodes
                          country={value?.alpha2}
                          name="mobile_no"
                          onChange={(pho, country) =>
                            setFieldValue(
                              "mobile_no",
                              `+${country.dialCode}${pho}`
                            )
                          }
                          inputStyle={{
                            padding: "26px",
                            width: "100%",
                            borderRadius: "50px",
                            paddingLeft: "45px",
                          }}
                        />
                        {/* <PhoneInput
                          placeholder="Enter phone number"
                          country={value?.alpha2}
                          enableAreaCodes
                          name="mobile_no"
                          onChange={(pho, country) =>
                            setFieldValue(
                              "mobile_no",
                              `+${country.dialCode}${pho}`
                            )
                          }
                          inputStyle={{
                            padding: "26px",
                            width: "100%",
                            borderRadius: "50px",
                            paddingLeft: "45px",
                          }}
                        /> */}
                        <ErrorMessage
                          name="mobile_no"
                          component="div"
                          className="m-2 text-danger"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3 col-xl-2 my-md-3 my-1">
                        <div>
                          <div
                            className="form-image-input"
                            onClick={() => {
                              document.getElementById("photo").click();
                            }}
                          >
                            <img
                              id="imgPreview"
                              src="/static/images/ImageInput.png"
                              alt="pic"
                            />
                            <div className="plus-image-overlay">
                              <i className="fa fa-plus"></i>
                            </div>
                          </div>
                          <input
                            type="file"
                            name="photograph"
                            id="photo"
                            accept="image/*"
                            onChange={(event) => {
                              photoChange(event);
                            }}
                          />

                          <ErrorMessage
                            name="photograph"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-9 m-auto">
                        <div className="form-check my-3">
                          <Field
                            type="checkbox"
                            name="email_verify"
                            className="form-check-input check"
                          />
                          <label className="form-check-label ms-2">
                            Send me emails with helpful tips to find talent that
                            fits my needs.
                          </label>
                          <ErrorMessage
                            name="email_verify"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                        <div className="form-check my-3">
                          <Field
                            type="checkbox"
                            name="agreedTerms"
                            className="form-check-input check"
                          />
                          <label className="form-check-label ms-2">
                            Yes, I understand and agree to the
                            <a href="#"
                              className="theme-text-color text-decoration-none"> Quadra Terms of Service User Agreement Privacy
                              Policy
                            </a>
                          </label>
                          <ErrorMessage
                            name="agreedTerms"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                      </div>
                      {!filePic && (
                        <div
                          className="m-2 text-danger imageValidationError"
                          style={{ display: "none" }}
                        >
                          Image Is Required
                        </div>
                      )}
                    </div>

                    <div className="d-md-flex align-items-center justify-content-center mt-md-5 my-2">
                      {OtpResponse === "verify" ? (
                        <button
                          type="button"
                          className="create-account-btn"
                          onClick={() => {
                            toast.error("Must Verify Email First !", {
                              position: "top-right",
                              autoClose: 2000,
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              theme: "colored",
                            });
                          }}
                        >
                          Continue
                          <i className="fa-solid  fa-arrow-right-long ms-3"></i>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            if (!filePic) {
                              setprofileerr("block");
                            }
                          }}
                          type="submit"
                          className="create-account-btn"
                        >
                          Continue
                          <i className="fa-solid  fa-arrow-right-long ms-3"></i>
                        </button>
                      )}
                      <button type="button" className="logInbtn">
                        <Link to="/select-sign-in" style={style}>
                          Log In
                          <i className="fa-solid  fa-arrow-right-long ms-3"></i>
                        </Link>
                      </button>
                    </div>

                    <div className="d-flex align-items-center my-3 justify-content-center">
                      <div className="horizontal-line"></div>
                      <p className="m-0 mx-2">Login With</p>
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
                        clientId="889083018428-n0vk7cnh54u5ftft61icv01pf08mgnnh.apps.googleusercontent.com"
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
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
      )}
    </>
  );
};

export default SignIn;
