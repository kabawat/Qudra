import React, { useContext, useState } from "react";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import Loader from "../../components/Loader";
import { Header2 } from "../../components/Header";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import CountrySelect from "react-bootstrap-country-select";
import { MultiSelect } from "react-multi-select-component";
import OtpInput from "react-otp-input";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-country-select/dist/react-bootstrap-country-select.css";
import $ from "jquery";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import Global from "../../context/Global";
import { getCode } from "country-list";

import { useCookies } from "react-cookie";

import ReactLotti from "../../loader/ReactLotti";
const languages = [
  { label: "Albanian", value: "Albanian" },
  { label: "Bosnian", value: "Bosnian" },
  { label: "Belarusian", value: "Belarusian" },
  { label: "Bulgarian", value: "Bulgarian" },
  { label: "Croatian", value: "Croatian" },
  { label: "Czech", value: "Czech" },
  { label: "Catalan", value: "Catalan" },
  { label: "Croatian", value: "Croatian" },
  { label: "Danish", value: "Danish" },
  { label: "Deutsch", value: "Deutsch" },
  { label: "Dutch", value: "Dutch" },
  { label: "English", value: "English" },
  { label: "Estonian", value: "Estonian" },
  { label: "French", value: "French" },
  { label: "Finnish", value: "Finnish" },
  { label: "German,", value: "German," },
  { label: "Greek", value: "Greek" },
  { label: "Greenlandic", value: "Greenlandic" },
  { label: "Galician", value: "Galician" },
  { label: "Hindi", value: "Hindi" },
  { label: "Hungarian", value: "Hungarian" },
  { label: "Icelandic", value: "Icelandic" },
  { label: "Inuktitut", value: "Inuktitut" },
  { label: "Irish", value: "Irish" },
  { label: "Italian", value: "Italian" },
  { label: "Latvian", value: "Latvian" },
  { label: "Lithuanian", value: "Lithuanian" },
  { label: "Luxembourgish", value: "Luxembourgish" },
  { label: "Maltese", value: "Maltese" },
  { label: "Moldovan", value: "Moldovan" },
  { label: "Macedonian", value: "Macedonian" },
  { label: "Norwegian", value: "Norwegian" },
  { label: "Russian", value: "Russian" },
  { label: "Serbian", value: "Serbian" },
  { label: "Slovene", value: "Slovene" },
  { label: "Serbo", value: "Serbo" },
  { label: "Polish", value: "Polish" },
  { label: "Portuguese", value: "Portuguese" },
  { label: "Romanian", value: "Romanian" },
  { label: "Romansch", value: "Romansch" },
  { label: "Russian", value: "Russian" },
  { label: "Turkish", value: "Turkish" },
  { label: "Serbian", value: "Serbian" },
  { label: "Slovak", value: "Slovak" },
  { label: "Slovenian", value: "Slovenian" },
  { label: "Spanish", value: "Spanish" },
  { label: "Swedis", value: "Swedis" },
  { label: "Ukrainian", value: "Ukrainian" },
];

const SetUp = () => {
  const [cookies, setCookies] = useCookies(["user_info"]);
  const contextData = useContext(Global);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [value, setValue] = useState({
    alpha2: "in",
    alpha3: "ind",
    flag: "IN",
    id: "in",
    ioc: "ind",
    name: "India",
  });

  const [disply, setdisply] = useState("none");

  const[otpdisplay,setotpdisplay]=useState("none")
  const [imgcode, setimgcode] = useState("in");
  const [viewPassword, setViewPassword] = useState(false);
  const SetUpSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password must be aleast 8 characters long!")
      .max(30, "Password is too long!")
      .required("Required"),
    email: Yup.string()
      .email(" Enter  valid email")
      .required("Email required"),
    mobile_no: Yup.string()
      .min(10, "Minimum 10 number required")
      .required("Enter valid phone number"),
    last_name: Yup.string()
      .min(3, "Minimum 3 character required")
      .required("Last name required"),
    first_name: Yup.string()
      .min(3, "Minimum 3 character required")
      .required("First name required"),
      experience: Yup.string().required("Experience required"),
    languages: Yup.array().required('Languages required'),
    education: Yup.string().required("Education  required"),
    skills: Yup.array().required('Skills required '),

    job_description: Yup.string()
      .min(100,'Minimum 100 character required')
      .required("Job description  required"),
      bio: Yup.string()
      .min(100, "Minimum 100 charecter required")
      .max(500)
      .required("About required"),
  });
  const [filePic, setFilePic] = useState("");
  const photoChange = (e) => {
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

  function onKeyDown(keyEvent) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }

  const rows = [];
  for (let i = 0; i < 45; i++) {
    rows.push(i);
  }


  const [profileerr, setprofileerr] = useState("none");
  const [educationSelect, setEducationSelect] = useState("");
  const [educationInput, setEducationInput] = useState("");
  const [language, setLanguage] = useState([]);
  const [skills, setSkill] = useState([]);
  const [existingEmail, setExistingEmail] = useState(true);
  const [resData, setResData] = useState();
  const verifyRequestButton = () => {
    let email = $("#EmailInputSignUpForm").val();
    setLoadingActive(true);
    axios
      .post("http://13.52.16.160:8082/identity/verify-email", { email })
      .then((res) => {
        if (res?.data?.status === "Failed") {
          setResData(res.data);
          setShow(false);
          setExistingEmail(false);
          handleOTP("");
          setLoadingActive(false);
          setVerifyButtonText("verify ");
        } else {
          setShow(true);
          setLoadingActive(false);
          setExistingEmail(true);
        }
      });
  };

  const [otp, handleOTP] = useState("");
  var otp̥Length = otp.length;
  const [verifyButtonText, setVerifyButtonText] = useState("verify");
  const [loadingActive, setLoadingActive] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () =>{
    
    setShow(false)
    setotpdisplay("block")
  };
  const [OtpResponse, setOtpResponse] = useState(false);

  const handleEmailFocus = () => {
    setExistingEmail(true);
    setVerifyButtonText("verify");
    setOtpResponse(false);
  };

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
          setShow(false)
          setotpdisplay("none")
          setVerifyButtonText("verified");
          $(".emailVerifyBtnProfessional").css("pointer-events", "none");
          handleOTP("");
        } else {
          handleOTP("");
          setOtpResponse(true);
        }
      });
 

  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="create-account">
          <Header2 />
          <main className="create-account-main">
            <div className="container mb-5">
              <Formik
                initialValues={{
                  first_name: "",
                  last_name: "",
                  email: "",
                  email_verify: "True",
                  nation: "",
                  mobile_no: "",
                  bio: "",
                  job_description: "",
                  password: "",
                  languages: "",
                  education: "",
                  skills: "",
                  mobile_verify: "True",
                  experience: "",
                }}
                validationSchema={SetUpSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setLoading(true);
                  axios
                    .post(
                      "http://13.52.16.160:8082/identity/signup_professional",
                      values
                    )
                    .then((res) => {
                      if (res?.data?.status === "Success") {
                        const signupuser = new FormData();
                        signupuser.append("image", filePic);
                        signupuser.append("user_id", res?.data?.data.user_id);
                        signupuser.append(
                          "user_token",
                          res?.data?.data.user_token
                        );
                        signupuser.append("role", res?.data?.data.role);

                        signupuser &&
                          axios
                            .post(
                              "http://13.52.16.160:8082/identity/professional_profile",
                              signupuser
                            )
                            .then((respo) => {
                              console.log(respo);
                              const getcookies = {
                                user_id: res?.data?.data?.user_id,
                                user_token: res?.data?.data?.user_token,
                                role: res?.data?.data?.role,
                              };
                              setCookies(
                                "user_info",
                                JSON.stringify(getcookies)
                              );
                              if (respo?.data?.status === "Success") {
                                contextData?.dispatch({
                                  type: "FETCH_USER_DATA",
                                  value: res?.data?.data,
                                });
                                localStorage.setItem(
                                  "user_data",
                                  JSON.stringify(res?.data?.data)
                                );
                                setLoading(false);
                                navigate("/categoryArchitecture", {
                                  replace: true,
                                });
                                contextData.setShowDisclamer(true);
                                if (!contextData?.profileData) {
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
                                    });
                                }
                              }
                            });
                      } else {
                        localStorage.clear();

                        navigate("/setup");
                        setLoading(false);
                      }
                    });
                }}
              >
                {({
                  isSubmitting,
                  setFieldValue,
                  validateForm,
                  validateField,
                  values,
                }) => (
                  <Form>
                    <h1>Lets Set Up like A Pro</h1>
                    <div className="row">
                      <div className="col-md my-md-3 my-1">
                        <div className="create-account-input">
                          <Field
                            name="first_name"
                            type="text"
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
                            name="last_name"
                            type="text"
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
                        <div className="create-account-input create-account-email-input ">
                          <Field
                            id="EmailInputSignUpForm"
                            type="email"
                            className="form-control"
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
                            {loadingActive ? <ReactLotti /> : verifyButtonText}
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
                              </div>
                              {OtpResponse ? (
                        <p className="text-danger m-auto">
                          Please retry with valid OTP
                        </p>
                      ) : (
                        ""
                      )}
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
                            {!existingEmail ? (
                          <p className="text-danger">
                            {resData.message}
                            {/* Email is already registered ! */}
                          </p>
                        ) : (
                          ""
                        )}
                        </div>
                        <div  className={otpdisplay}>
                          <span
                          style={{color:"red"}}
                          >please enter valid otp</span>
                          <button type="button"
                          style={{border:'0',background:'0',margin:'0 10px',textDecoration:'underline'}}
                          onClick={()=>{
                            setShow(true)
                          }}
                          >click</button>
                          </div>
                      </div>
                      <div className="col-md my-md-3 my-1">
                        <div className="create-account-input">
                          <Field
                            type={viewPassword ? "text" : "password"}
                            className="form-control"
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
                            className="m-2 text-danger"
                          />
                        </div>
                      </div>
                      
                    </div>
                    <div className="row">
                      <div
                        className="col-md my-md-3 my-1"
                        style={{
                          position: "relative",
                          // left:'10px',
                        }}
                      >
                        {/* <img
                          className={disply}
                          style={{
                            top: "37%",
                            position: "absolute",
                            // top:'34px',
                            left: "5%",
                            width: "18px",
                            zIndex: "4545",
                          }}
                          alt="img"
                          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${imgcode}.svg`}
                        /> */}
                        <CountrySelect
                          value={value}
                          onChange={(val) => {
                            console.log("val", val);
                            setValue(val);
                            setFieldValue("nation", val?.name);
                            let id = val.id;
                            setimgcode(id.toLocaleUpperCase());
                            setdisply("block");
                          }}
                          flags={false}
                          placeholder="Select An Country"
                          name="nation"
                        />
                      </div>

                      <div className="col-md my-md-3 my-1">
                        <div className="form-group">
                          <PhoneInput
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
                          />
                        </div>
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
                              accept="images/*"
                            />
                            <div className="plus-image-overlay">
                              <i className="fa fa-plus"></i>
                            </div>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            name="photograph"
                            id="photo"
                            onChange={(event) => {
                              photoChange(event);
                              setprofileerr("none");
                            }}
                          />
                      <span style={{marginTop:'10px' }} className={`${profileerr} text-danger `}>
                            profile image required
                          </span>
                          <ErrorMessage
                            name="photograph"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-9 col-xl-10  my-md-3 my-1" style={{position:'relative'}}>
                        <Field
                          as="textarea"
                          maxLength="500"
                          className="form-control h-100"
                          id="exampleFormControlTextarea1"
                          rows="6"
                          name="bio"
                          placeholder="About"
                        ></Field>
                        <div style={{position:'absolute',bottom:'-7%' ,left:'3%'}}><p>{values.bio.length}/500</p></div>
                        <ErrorMessage
                          name="bio"
                          component="div"
                          className="m-2 text-danger"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col my-md-3 my-1">
                        <Field
                          as="textarea"
                          className="form-control"
                          name="job_description"
                          id="exampleFormControlTextarea1"
                          rows="6"
                          placeholder="Job Description"
                        ></Field>

                        <ErrorMessage
                          name="job_description"
                          component="div"
                          className="m-2 text-danger"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md my-md-3 my-1">
                        <div className="create-account-input">
                          <img src="/static/images/LanguagesIcon.png" alt="" />
                          <MultiSelect
                            options={languages}
                            value={language}
                            onChange={(language) => {
                              setFieldValue(
                                "languages",
                                language.map((val) => val?.value)
                              );
                              setLanguage(language);
                            }}
                            labelledBy="Select"
                            name="languages"
                          />
                          <ErrorMessage
                            name="languages"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md my-md-3 my-1">
                        <div className="create-account-input">
                          <img src="/static/images/EducationIcon.png" alt="" />
                          <Field
                            id="educationSelect"
                            as="select"
                            value={educationSelect}
                            className="form-select form-education-select"
                            onChange={(e) => {
                              setEducationSelect(e.target.value);
                              if (e.target.value !== "another") {
                                setFieldValue("education", e.target.value);
                                setEducationInput("");
                              }
                            }}
                          >
                            <option value="" disabled>
                              Education
                            </option>
                            <option value="Bachelors"> Bachelors</option>
                            <option value="Masters"> Masters</option>
                            <option value="Other">Other</option>
                          </Field>
                          {/* {educationSelect === "Other" ? (
                            <input
                              type="text"
                              className="mt-2"
                              placeholder="Enter Here Your Other"
                              value={educationInput}
                              onChange={(e) => {
                                setEducationInput(e.target.value);
                                setFieldValue("education", e.target.value);
                              }}
                            />
                          ) : (
                            ""
                          )} */}
                          <ErrorMessage
                            name="education"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="my-md-3 col-md-6  my-1">
                        <div className="create-account-input">
                          <img src="./static/images/SkillsIcon.png" alt="" />

                          <MultiSelect
                            options={contextData.skillsOpt}
                            value={skills}
                            onChange={(skills) => {
                              setFieldValue(
                                "skills",
                                skills.map((val) => val?.value)
                              );
                              setSkill(skills);
                            }}
                            labelledBy="Select"
                            name={skills}
                          />

                          <ErrorMessage
                            name="skills"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                      </div>
                      <div className="my-md-3 col-md-6  my-1">
                        <div className="create-account-input">
                          <img src="./static/images/SkillsIcon.png" alt="" />
                          <Field
                            as="select"
                            name="experience"
                            className="form-select"
                            style={{ cursor: "pointer" }}
                          >
                            <option value="" disabled>
                              Experience
                            </option>
                            {rows.map((years) => (
                              <option value={years}>{years} Years</option>
                            ))}
                            <option value={45}>45 Years</option>
                          </Field>
                          <ErrorMessage
                            name="experience"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="d-md-flex align-items-center justify-content-center mt-md-5 my-2">
                      {verifyButtonText === "verify" ? (
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

export default SetUp;