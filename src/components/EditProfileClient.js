import React, { useEffect, useState, useContext } from "react";
import { Header2 } from "./Header";
import * as Yup from "yup";
import axios from "axios";
import $ from "jquery";
import { useLocation } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PhoneInput from "react-phone-input-2";
import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Global from "../context/Global";
import CountrySelect from "react-bootstrap-country-select";
import { getCode } from "country-list";
import { useCookies } from "react-cookie";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const SignUpSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be aleast 8 characters long!")
    .max(30, "Password is too long!")
    .trim()
    .required("Password required"),
  email: Yup.string()
    .email("Enter a valid email")
    .trim()
    .required("Email required"),
  last_name: Yup.string()
    .trim()
    .min(3, "Enter valid Last name")
    .required("Last name required"),
  mobile_no: Yup.string()
    .trim()
    .min(10, "Enter valid mobile number")
    .required("Mobile number required"),
  first_name: Yup.string()
    .trim()
    .min(3, "Minimum 3 character required")
    .required("First name required"),
  agreedTerms: Yup.bool().oneOf(
    [true],
    "Accept Terms & Conditions is required"
  ),
});

const style = {
  color: "#01a78a",
  textDecoration: "none",
};

const EditProfileClient = ({ location }) => {
  const contextData = useContext(Global);
  const [isLoading, setLoading] = useState(false);
  const [cookies] = useCookies();
  const [show, setShow] = useState(false);

  const [value, setValue] = useState({
    // alpha2: "us",
    // alpha3: "usa",
    // flag: "🇺🇸",
    id: getCode(location?.state?.nation)?.toLocaleLowerCase(),
    // .toLocaleLowerCase()
    // ioc: "usa",
    name: location?.state?.nation,
  });

  const [imgcode, setimgcode] = useState(getCode(location?.state?.nation));

  let navigate = useNavigate();

  const [filePic, setFilePic] = useState(location?.state?.client_image);
  const [showConfirm, setShowConfirm] = useState(false);
  const profileUpdated = () => {
    navigate("/clientdashboard", {
      state: { role: "client" },
    });
  };
  const photoChange = (e) => {
    const fileReader = new FileReader();
    const file = e.target.files[0];
    setFilePic(file);
    const signupuser = new FormData();
    signupuser.append("image", file);
    signupuser.append("user_id", cookies?.user_data?.user_id);
    signupuser.append("user_token", cookies?.user_data?.user_token);

    signupuser.append("role", cookies?.user_data?.role);
    signupuser &&
      axios.post(
        "http://13.52.16.160:8082/identity/client_profile",
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

  const handleCancel = () => {
    axios
      .post("http://13.52.16.160:8082/identity/get_dashboard_profile/", {
        user_id: cookies?.user_data?.user_id,
        user_token: cookies?.user_data?.user_token,
        role: "client",
      })
      .then((res) => {
        contextData?.dispatch({
          type: "FETCH_PROFILE_DATA",
          value: res?.data?.data,
        });
        if (res.data.data.category_selected) {
          navigate("/clientdashboard", {
            state: { role: "client" },
          });
        } else {
          navigate("/client-architechture", {
            state: { role: "client" },
          });
        }
      });
  };

  const [nationErr, setNationerr] = useState(false);
  const [mobErr, setMoberr] = useState(false);

  function handleSubmit(values, actions) {
    // handle form submission logic here
    actions.setSubmitting(false);
  }
  function onKeyDown(keyEvent) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }
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
                onSubmit={handleSubmit}
                enableReinitialize
                initialValues={{
                  first_name: location?.state?.first_name,
                  last_name: location?.state?.last_name,
                  email_verify: true,
                  agreedTerms: true,
                  nation: location?.state?.nation,
                  mobile_no: location?.state?.mobile_no,
                }}
                validationSchema={SignUpSchema}
              >
                {({ values, handleSubmit, setFieldValue, isSubmitting }) => (
                  <Form
                    onKeyDown={onKeyDown}
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (values.mobile_no.length < 10) {
                        setMoberr(true);
                        return false;
                      }
                      if (!values.nation) {
                        setNationerr(true);
                        return false;
                      } else if (values.nation) {
                        setNationerr(false);
                      }

                      const {
                        email_verify,
                        first_name,
                        last_name,
                        mobile_no,
                        nation,
                      } = values;
                      if (
                        email_verify &&
                        first_name &&
                        last_name &&
                        mobile_no &&
                        nation
                      ) {
                        axios
                          .post(
                            "http://13.52.16.160:8082/identity/update_account",
                            {
                              user_id: cookies?.user_data?.user_id,
                              user_token: cookies?.user_data?.user_token,
                              role: "client",
                              ...values,
                            }
                          )
                          .then((res) => {
                            if (res?.data?.status === "Success") {
                              // dfgdfgdfg============================***************************************************************

                              axios
                                .post(
                                  "http://13.52.16.160:8082/identity/get_dashboard_profile/",
                                  {
                                    user_id: cookies?.user_data?.user_id,
                                    user_token: cookies?.user_data?.user_token,
                                    role: "client",
                                  }
                                )
                                .then((res) => {
                                  contextData?.dispatch({
                                    type: "FETCH_PROFILE_DATA",
                                    value: res?.data?.data,
                                  });

                                  if (res.data.data.category_selected) {
                                    //     navigate("/clientdashboard", {
                                    //   state: { role: "client" },
                                    // });
                                    setShowConfirm(true);
                                  } else {
                                    navigate("/client-architechture", {
                                      state: { role: "client" },
                                    });
                                  }
                                });
                            }
                          });
                        // .then((res) => {
                        //   if (res?.data?.status === "Success") {
                        //     navigate("/clientdashboard", {
                        //       state: { role: "client" },
                        //     });
                        //     contextData.dispatch({ type: "LOG_OUT" });
                        //   }
                        // });
                      }
                    }}
                  >
                    <h1>Edit Profile</h1>
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
                        <div className="create-account-input">
                          <Field
                            value={value.name}
                            type="text"
                            name="nation"
                            className="form-control"
                          />
                        </div>
                        {/* <CountrySelect
                          value={location?.state?.nation}
                          // onChange={(val) => {
                          //   setNationerr(false);
                          //   setValue(val);
                          //   setFieldValue("nation", val?.name);
                          //   // let id = val.id;
                          //   // setimgcode(id.toLocaleUpperCase());
                          // }}
                          disabled
                          flags={true}
                          placeholder="Select a Country"
                          name="nation"
                        /> */}
                        {/* {nationErr && (
                          <p className="text-danger">Country name required</p>
                        )} */}
                      </div>
                      <div className="col-md my-md-3 my-1">
                        <div className="form-group">
                          <PhoneInput
                            value={location?.state?.mobile_no}
                            placeholder="Enter phone number"
                            country={value?.alpha2}
                            enableAreaCodes
                            name="mobile_no"
                            // onChange={(pho, country) =>
                            //   setFieldValue(
                            //     "mobile_no",
                            //     `+${country.dialCode}${pho}`
                            //   )
                            // }
                            disabled
                            inputStyle={{
                              padding: "26px",
                              width: "100%",
                              borderRadius: "50px",
                              paddingLeft: "45px",
                            }}
                          />
                        </div>
                        {mobErr && (
                          <p className="text-danger">Enter valid number</p>
                        )}
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
                              src={location?.state?.client_image}
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
                            accept="image/*"
                          />

                          <ErrorMessage
                            name="photograph"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-9">
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
                            <a
                              href="/terms-condition"
                              className="theme-text-color text-decoration-none"
                            >
                              {" "}
                              Quadra Terms of Service User Agreement Privacy
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
                    </div>

                    <div className="d-md-flex align-items-center justify-content-center my-md-5 my-2">
                      <button type="button" className="logInbtn mx-3">
                        {/* to="/clientdashboard"  */}
                        <button
                          onClick={handleCancel}
                          style={{
                            ...style,
                            border: "none",
                            background: "none",
                          }}
                        >
                          <i className="fa-solid  fa-arrow-left-long me-3"></i>
                          Cancel
                        </button>
                      </button>
                      <button
                        type="submit"
                        className="create-account-btn mx-3"
                        disabled={isSubmitting}
                        style={{ pointerEvents: "all" }}
                        onClick={() => {
                          setShow(true);
                        }}
                      >
                        Update Profile
                        <i className="fa-solid  fa-arrow-right-long ms-3"></i>
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>

              <Modal
                centered
                show={show}
                onHide={() => setShow(false)}
                style={{ zIndex: 1000000 }}
              >
                <Modal.Header>
                  <Modal.Title>
                    Your profile has been successfully updated!
                  </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                  <Button
                    className="theme-bg-color border-0"
                    onClick={profileUpdated}
                  >
                    Ok
                  </Button>
                </Modal.Footer>
              </Modal>
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

export default EditProfileClient;
