import React, { useContext, useState, useEffect } from "react";
import Loader from ".././components/Loader";
import { Header2 } from "./Header";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { useLocation, Link, useNavigate } from "react-router-dom";
import CountrySelect from "react-bootstrap-country-select";
import { MultiSelect } from "react-multi-select-component";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-country-select/dist/react-bootstrap-country-select.css";
import { lockIcon, skillIcon } from "../components/images";
import $ from "jquery";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import Global from "../context/Global";
import { getCode } from "country-list";

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

const EditProfileProfessional = () => {
  const location = useLocation();
  const [state, setState] = useState(false);
  const contextData = useContext(Global);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [value, setValue] = useState({
    // alpha2: "us",
    // alpha3: "usa",
    // flag: "🇺🇸",
    id: getCode(location?.state?.nation).toLocaleLowerCase(),
    // ioc: "usa",
    name: location?.state?.nation,
  });

  const [form_Data, setFormData] = useState({
    language: false,
    skills: false,
  });

  const [imgcode, setimgcode] = useState(getCode(location?.state?.nation));
  const SetUpSchema = Yup.object().shape({
    mobile_no: Yup.string()
      .min(10, "Enter a valid phone number")
      .required("Enter  phone number"),
    last_name: Yup.string()
      .min(3, "Minimum 3 character required")
      .required(" Last name required"),
    first_name: Yup.string()
      .min(3, "Minimum 3 character required ")
      .required("First name required"),
    // languages: Yup.array().required('suraj '),
    education: Yup.string().required("Education  required"),
    // skills: Yup.array().required("Skills required"),
    job_description: Yup.string()
      .min(100, "Minimum 100 character required")
      .required("Job description  required"),
    nation: Yup.string().required("Country name required"),
    bio: Yup.string().min(100).max(500).required("About required"),
  });
  const [filePic, setFilePic] = useState(location?.state?.professional_image);
  const photoChange = (e) => {
    const fileReader = new FileReader();
    const file = e.target.files[0];
    setFilePic(file);
    const signupuser = new FormData();
    signupuser.append("image", file);
    signupuser.append("user_id", contextData?.userData?.user_id);
    signupuser.append("user_token", contextData?.userData?.user_token);

    signupuser.append("role", contextData?.userData?.role);
    signupuser &&
      axios.post(
        "http://13.52.16.160:8082/identity/professional_profile",
        signupuser
      );
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
  const style = {
    color: "#01a78a",
    textDecoration: "none",
  };

  const rows = [];
  for (let i = 0; i < 45; i++) {
    rows.push(i);
  }
  const arraySkills = [];
  const arrayLanguages = [];
  const [educationSelect, setEducationSelect] = useState("");
  const [educationInput, setEducationInput] = useState("");
  const [language, setLanguage] = useState(arrayLanguages);
  const [skills, setSkill] = useState(arraySkills);
  location?.state?.languages.map((res) => {
    arrayLanguages.push({ label: res, value: res });
  });
  location?.state?.skills.map((res) => {
    arraySkills.push({ label: res, value: res });
  });
  // professionaldashboard

  const updateCancel = () => {
    axios
      .post("http://13.52.16.160:8082/identity/get_dashboard_profile/", {
        ...JSON.parse(localStorage.getItem("user_data")),
      })
      .then((res) => {
        localStorage.setItem(
          "profileImageNameGmail",
          JSON.stringify(res?.data?.data)
        );
        contextData?.dispatch({
          type: "FETCH_PROFILE_DATA",
          value: res?.data?.data,
        });
        if (res.data.data.category_selected) {
          navigate("/professionaldashboard", {
            state: { role: "professional" },
          });
        } else {
          navigate("/categoryArchitecture", {
            state: { role: "professional" },
          });
        }
      });
  };
  // useEffect(() => {
  //   if (form_Data.language == true) {
  //     console.log("data fill karlo");
  //   }

  //   if (form_Data.skills == true) {
  //     alert("data fill karlo");
  //   }
  // });

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
                  first_name: location?.state?.first_name,
                  last_name: location?.state?.last_name,
                  email_verify: "True",
                  nation: location?.state?.nation,
                  mobile_no: location?.state?.mobile_no,
                  bio: location?.state?.bio,
                  job_description: location?.state?.job_description,
                  languages: arrayLanguages,
                  education: location?.state?.education,
                  skills: arraySkills,
                  mobile_verify: "True",
                  experience: location?.state?.experience,
                }}
                validationSchema={SetUpSchema}
                onSubmit={(value) => {
                  let skill = true;
                  let lang = true;

                  const skills = value.skills.map((curItem) => {
                    if (curItem.value) {
                      return curItem.value;
                    } else {
                      return curItem;
                    }
                  });
                  const languages = value.languages.map((curItem) => {
                    if (curItem.value) {
                      return curItem.value;
                    } else {
                      return curItem;
                    }
                  });
                  if (value.nation.length < 1) {
                    console.log("hey");
                  }
                  lang = languages.length < 1 ? true : false;
                  skill = skills.length < 1 ? true : false;

                  setFormData({ language: lang, skills: skill });
                  console.log(form_Data);
                  if (lang || skill) {
                    return false;
                  }

                  const data = { ...value, languages, skills };
                  axios
                    .post("http://13.52.16.160:8082/identity/update_account", {
                      user_id: contextData?.userData?.user_id,
                      user_token: contextData?.userData?.user_token,
                      role: "professional",
                      ...data,
                    })
                    .then((res) => {
                      if (res?.data?.status === "Success") {
                        axios
                          .post(
                            "http://13.52.16.160:8082/identity/get_dashboard_profile/",
                            {
                              user_id: contextData?.userData?.user_id,
                              user_token: contextData?.userData?.user_token,
                              role: "professional",
                            }
                          )
                          .then((res) => {
                            localStorage.setItem(
                              "profileImageNameGmail",
                              JSON.stringify(res?.data?.data)
                            );
                            contextData?.dispatch({
                              type: "FETCH_PROFILE_DATA",
                              value: res?.data?.data,
                            });
                            if (res.data.data.category_selected) {
                              navigate("/professionaldashboard", {
                                state: { role: "professional" },
                              });
                            } else {
                              navigate("/categoryArchitecture", {
                                state: { role: "professional" },
                              });
                            }
                          });
                      }
                    });
                }}
              >
                {({ values, handleSubmit, setFieldValue }) => (
                  <Form onKeyDown={onKeyDown} onSubmit={handleSubmit}>
                    <h1>Edit Profile</h1>
                    <div className="row">
                      <div className="col-md my-md-3 my-1">
                        <div className="create-account-input">
                          <Field
                            name="first_name"
                            type="text"
                            className="form-control"
                            placeholder="First Name "
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
                      <div
                        className="col-md my-md-3 my-1"
                        style={{
                          position: "relative",
                          // left:'10px',
                        }}
                      >
                        {/* <img
                          style={{
                            top: "37%",
                            position: "absolute",
                            // top:'34px',
                            left: "5%",
                            width: "18px",
                            zIndex: "4545",
                          }}
                          alt="United States"
                          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${imgcode}.svg`}
                        /> */}
                        <CountrySelect
                          value={value}
                          onChange={(val) => {
                            setValue(val);
                            setFieldValue("nation", val?.name);
                            // let id = val.id;
                            // setimgcode(id.toLocaleUpperCase());
                          }}
                          flags={true}
                          placeholder="Select An Country"
                          name="nation"
                        />
                      </div>
                      <ErrorMessage
                        name="nation"
                        component="div"
                        className="m-2 text-danger"
                      />
                      <div className="col-md my-md-3 my-1">
                        <div className="form-group">
                          <PhoneInput
                            value={location?.state?.mobile_no}
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
                              src={location?.state?.professional_image}
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
                      <div
                        className="col-md-9 col-xl-10  my-md-3 my-1"
                        style={{ position: "relative" }}
                      >
                        <Field
                          as="textarea"
                          className="form-control h-100"
                          id="exampleFormControlTextarea1"
                          rows="6"
                          name="bio"
                          maxLength="500"
                          placeholder="About"
                        ></Field>
                        <div
                          style={{
                            position: "absolute",
                            bottom: "-7%",
                            left: "3%",
                          }}
                        >
                          <p>{values.bio.length}/500</p>
                        </div>
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
                          rows="6
                            "
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

                          <p className="text-danger">
                            {form_Data.language ? "Languages required" : ""}
                          </p>
                        </div>
                      </div>
                      {/* <div className="col-md my-md-3 my-1">
                        <div className="create-account-input">
                          <img src="/static/images/EducationIcon.png" alt="" />
                          <Field
                            id="educationSelect"
                            as="select"
                            value={
                              educationSelect
                                ? educationSelect
                                : location?.state?.education
                            }
                            className="form-select form-education-select"
                            onChange={(e) => {
                              setEducationSelect(e.target.value);
                              if (e.target.value !== "Other") {
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

                          <ErrorMessage
                            name="education"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                      </div> */}

                      <div className="col-md my-md-3 my-1">
                        <div className="create-account-input">
                          <img src="/static/images/EducationIcon.png" alt="" />
                          <Field
                            id="educationSelect"
                            as="select"
                            value={
                              educationSelect
                                ? educationSelect
                                : location?.state?.education !== "Bachelors" ||
                                  "Masters"
                                ? "Other"
                                : location?.state?.education
                            }
                            className="form-select form-education-select"
                            onChange={(e) => {
                              setEducationSelect(e.target.value);
                              if (e.target.value !== "Other") {
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
                          {educationSelect !== "Bachelors"
                            ? educationSelect !== "Masters" && (
                                <input
                                  type="text"
                                  className="mt-2"
                                  placeholder="Enter Here Your Other"
                                  value={
                                    !state
                                      ? location?.state?.education
                                      : educationInput
                                  }
                                  onChange={(e) => {
                                    setEducationInput(e.target.value);
                                    setFieldValue("education", e.target.value);
                                    setState(true);
                                  }}
                                />
                              )
                            : ""}
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
                          <img src={skillIcon} alt="" />

                          <MultiSelect
                            selectedValues={arraySkills}
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

                          <p className="text-danger">
                            {form_Data.skills ? "Skills required" : ""}
                          </p>
                        </div>
                      </div>
                      <div className="my-md-3 col-md-6  my-1">
                        <div className="create-account-input">
                          <img src={skillIcon} alt="" />
                          <Field
                            as="select"
                            name="experience"
                            className="form-select"
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
                      <button
                        type="button"
                        onClick={updateCancel}
                        className="logInbtn mx-3"
                      >
                        <i className="fa-solid  fa-arrow-left-long me-3"></i>
                        Cancel
                      </button>
                      <button type="submit" className="create-account-btn mx-3">
                        Update
                        <i className="fa-solid  fa-arrow-right-long ms-3"></i>
                      </button>
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

export default EditProfileProfessional;
