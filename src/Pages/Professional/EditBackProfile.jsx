import React, { useContext, useState, useEffect } from "react";
import Loader from "../../components/Loader";
import { Header2 } from "../../components/Header";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { useLocation, Link, useNavigate } from "react-router-dom";
import CountrySelect from "react-bootstrap-country-select";
import { MultiSelect } from "react-multi-select-component";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-country-select/dist/react-bootstrap-country-select.css";
import { lockIcon, skillIcon } from "../../components/images";
import $ from "jquery";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import Global from "../../context/Global";
import { getCode } from "country-list";
import useCookies from "react-cookie/cjs/useCookies";
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
const EditBackProfile = () => {
  const location = useLocation();
  const [profile, setProfile] = useState();
  const [cookies, setCookies] = useCookies(["user_info"]);
  const [value, setValue] = useState();
  const [imgcode, setimgcode] = useState();
  const style = {
    color: "#01a78a",
    textDecoration: "none",
  };
  const [disply, setdisply] = useState({
    first_name: "none",
    last_name: "none",
    bio: "none",
    job_description: "none",
    education: "none",
    experience: "none",
    language: "none",
    phoneNumber: "none",
    picture: "none",
    skill: "none",
  });
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

  const handalchange = (event) => {
    const { name, value } = event.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };
  const [phoneNumber, setPhoneNumber] = useState();

  useEffect(() => {
    axios
      .put("http://13.52.16.160:8082/identity/update_account", {
        user_id: cookies?.user_info?.user_id,
        user_token: cookies?.user_info?.user_token,
        role: cookies?.user_info?.role,
      })
      .then((res) => {
        const { data } = res.data;

        setimgcode(getCode(data.nation));
        setPhoneNumber("+916377575955");
        setValue({
          id: getCode(data?.nation)?.toLocaleLowerCase(),
          name: data?.nation,
          alpha2: getCode(data?.nation)?.toLocaleLowerCase(),
          alpha3: getCode(data?.nation)?.toLocaleLowerCase(),
        });
        setProfile({ ...data });
        data?.languages.map((res) => {
          arrayLanguages.push({ label: res, value: res });
        });
        data?.skills.map((res) => {
          arraySkills.push({ label: res, value: res });
        });
      });
  }, []);
  const setFieldValue = (event, value) => {
    if (event === "mobile_no") {
      setProfile({
        ...profile,
        [event]: value,
      });
    }
    if (event === "languages") {
      setLanguage(value);
    }
    if (event === "education") {
    }
  };
  console.log(value);
  const contextData = useContext(Global);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [filePic, setFilePic] = useState(profile?.professional_image);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(phoneNumber);
    if (profile.first_name.length <= 0) {
      setdisply({ ...disply, first_name: "block" });
    } else if (profile.last_name.length <= 0) {
      setdisply({ ...disply, last_name: "block" });
    } else if (phoneNumber.length <= 10) {
      setdisply({ ...disply, mobile_no: "block" });
    } else if (profile.bio.length <= 0) {
      setdisply({ ...disply, bio: "block" });
    } else if (profile.job_description.length <= 0) {
      console.log("SURAJ");
      setdisply({ ...disply, job_description: "block" });
    } else if (language.length <= 0) {
      console.log("language");
      setdisply({ ...disply, language: "block" });
    } else if (skills.length <= 0) {
      console.log("skill");
      setdisply({ ...disply, skill: "block" });
    } else {
      // console.log("language", language, "skill", skills);
      const skill = skills.map((curItem) => {
        if (curItem.value) {
          return curItem.value;
        } else {
          return curItem;
        }
      });
      const languagesList = language.map((curItem) => {
        if (curItem.value) {
          return curItem.value;
        } else {
          return curItem;
        }
      });
      const data = { ...profile, languages: languagesList, skills: skill };
      console.log(data);
      axios
        .post("http://13.52.16.160:8082/identity/update_account", {
          user_id: cookies?.user_info?.user_id,
          user_token: cookies?.user_info?.user_token,
          role: cookies?.user_info?.role,
          ...data,
        })
        .then((res) => {
          console.log(res);
          if (res?.data?.status === "Success") {
            console.log("suraj");
            navigate("/professionaldashboard", {
              state: { role: "professional" },
            });
            localStorage.clear();
          }
        });
    }
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
              <form onSubmit={handleSubmit}>
                <h1>Edit Profile</h1>
                <div className="row">
                  <div className="col-md my-md-3 my-1">
                    <div className="create-account-input">
                      <input
                        name="first_name"
                        type="text"
                        className="form-control"
                        placeholder="First Name "
                        value={profile?.first_name}
                        onChange={handalchange}
                      />
                      <i className="fa-regular fa-user"></i>
                    </div>
                    <span
                      className={disply.first_name}
                      style={{ color: "red" }}
                    >
                      name is required
                    </span>
                  </div>
                  <div className="col-md my-md-3 my-1">
                    <div className="create-account-input">
                      <input
                        name="last_name"
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        value={profile?.last_name}
                        onChange={handalchange}
                      />
                      <i className="fa-regular fa-user"></i>
                    </div>
                    <span className={disply.last_name} style={{ color: "red" }}>
                      Last name is required
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md my-md-3 my-1">
                    <div className="create-account-input">
                      <input
                        disabled
                        name="email"
                        type="text"
                        className="form-control"
                        placeholder="email "
                        value={profile?.email}
                        onChange={handalchange}
                      />
                      <i className="fa-regular fa-user"></i>{" "}
                    </div>
                  </div>
                  <div className="col-md my-md-3 my-1">
                    <div className="create-account-input">
                      <input
                        disabled
                        name="password"
                        type="text"
                        className="form-control"
                        placeholder="........"
                        value={profile?.password}
                        onChange={handalchange}
                      />
                      <i className="fa-regular fa-user"></i>
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
                    <img
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
                    />
                    <CountrySelect
                      value={value}
                      onChange={(val) => {
                        setValue(val);
                        setFieldValue("nation", val?.name);
                        let id = val.id;
                        console.log(id);
                        setimgcode(id.toLocaleUpperCase());
                      }}
                      flags={true}
                      placeholder="Select An Country"
                      name="nation"
                    />
                  </div>
                  <div className="col-md my-md-3 my-1">
                    <div className="form-group">
                      <PhoneInput
                        value={phoneNumber}
                        placeholder="Enter phone number"
                        country={value?.alpha2}
                        enableAreaCodes
                        name="mobile_no"
                        onChange={(pho, country) => {
                          // setFieldValue(
                          //   "mobile_no",
                          //   `+${country.dialCode}${pho}`
                          // );
                          setPhoneNumber(
                            "mobile_no",
                            `+${country.dialCode}${pho}`
                          );
                        }}
                        inputStyle={{
                          padding: "26px",
                          width: "100%",
                          borderRadius: "50px",
                          paddingLeft: "45px",
                        }}
                      />
                    </div>
                    <span
                      className={disply.phoneNumber}
                      style={{ color: "red" }}
                    >
                      phoneNumber is required
                    </span>
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
                          src={profile?.professional_image}
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
                    </div>
                    <span className={disply.picture} style={{ color: "red" }}>
                      profile pictures is required
                    </span>
                  </div>
                  <div className="col-md-9 col-xl-10  my-md-3 my-1">
                    <textarea
                      as="textarea"
                      className="form-control h-100"
                      id="exampleFormControlTextarea1"
                      rows="6"
                      name="bio"
                      placeholder="About"
                      value={profile?.bio}
                      onChange={handalchange}
                    />
                    <span className={disply.bio} style={{ color: "red" }}>
                      bio is required
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col my-md-3 my-1">
                    <textarea
                      as="textarea"
                      className="form-control"
                      name="job_description"
                      id="exampleFormControlTextarea1"
                      rows="6"
                      placeholder="Job Description"
                      value={profile?.job_description}
                      onChange={handalchange}
                    />
                  </div>
                  <span
                    className={disply.job_description}
                    style={{ color: "red" }}
                  >
                    Job description is required
                  </span>
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
                            language.map((val) => val.value)
                          );
                          setLanguage(language);
                        }}
                        labelledBy="Select"
                        name="languages"
                      />
                    </div>
                    <span className={disply.language} style={{ color: "red" }}>
                      language is required
                    </span>
                  </div>
                  <div className="col-md my-md-3 my-1">
                    <div className="create-account-input">
                      <img src="/static/images/EducationIcon.png" alt="" />
                      <select
                        id="educationSelect"
                        as="select"
                        value={
                          educationSelect ? educationSelect : profile?.education
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
                      </select>
                    </div>
                    <span className={disply.education} style={{ color: "red" }}>
                      education is required
                    </span>
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
                    </div>
                    <span className={disply.skill} style={{ color: "red" }}>
                      At least select a one skill
                    </span>
                  </div>
                  <div className="my-md-3 col-md-6  my-1">
                    <div className="create-account-input">
                      <img src={skillIcon} alt="" />
                      <select
                        value={profile?.experience}
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
                      </select>
                    </div>
                    <span
                      className={disply.experience}
                      style={{ color: "red" }}
                    >
                      experience is required
                    </span>
                  </div>
                </div>

                <div className="d-md-flex align-items-center justify-content-center mt-md-5 my-2">
                  <button type="button" className="logInbtn mx-3">
                    <Link to="/professionaldashboard" style={style}>
                      <i className="fa-solid  fa-arrow-left-long me-3"></i>
                      Cancel
                    </Link>
                  </button>
                  <button type="submit" className="create-account-btn mx-3">
                    Continue
                    <i className="fa-solid  fa-arrow-right-long ms-3"></i>
                  </button>
                </div>
              </form>
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

export default EditBackProfile;
