import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Header2 } from "../../components/Header";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

import { useCookies } from "react-cookie";
import { BaseUrl } from "../../BaseUrl";
const LoginSchema = Yup.object().shape({
  checkTerms: Yup.bool().oneOf([true], "Accept Terms & Conditions is required"),
});

const QuadroTerms = () => {
  const [cookies] = useCookies();
  const [profilePoints, setProfilePoints] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    axios
      .post(`${BaseUrl}/quadra/profile_points`, {
        type: "Guidelines",
      })
      .then((res) => {
        setProfilePoints(res?.data?.data);
      });
  }, []);

  const isCookies = () => {
    if (cookies?.user_data?.category_selected) {
      if (cookies?.user_data?.role === "client") {
        navigate("/clientdashboard");
      } else {
        navigate("/professionaldashboard");
      }
    } else {
      if (cookies?.user_data?.role === "client") {
        navigate("/client-architechture");
      } else {
        navigate("/categoryArchitecture");
      }
    }
  };
  if (cookies?.user_data) {
    isCookies();
  } else {
    return profilePoints.length ? (
      <div className="create-account">
        <Header2 />
        <main className="create-account-main">
          <div className="container mb-5">
            <Formik
              initialValues={{ checkTerms: true }}
              validationSchema={LoginSchema}
              onSubmit={(values, { setSubmitting }) => {
                navigate("/setup");
              }}
            >
              {({ isSubmitting }) => (
                <Form className="py-md-5">
                  <h1 className="pt-md-5">
                    Avoid the following to keep in line with our community
                    standards{" "}
                  </h1>
                  <h3 className="pt-md-4">
                    Quadra is an unique platform to showcase your talent and we
                    are bound to quality more than quantity. Kindly read the
                    following community guidelines to ensure your bussiness to
                    grow.
                  </h3>
                  {profilePoints.map((res, index) => {
                    return (
                      <div
                        className={`row ${index === 0 ? "pt-md-5" : ""}`}
                        key={index}
                        style={{ cursor: "default" }}
                      >
                        <div
                          className="col-md my-md-3 my-1"
                          style={{ cursor: "default" }}
                        >
                          <div
                            className="create-account-input"
                            style={{ cursor: "default" }}
                          >
                            <div
                              className="policy-span d-flex"
                              style={{
                                cursor: "default",
                                alignItems: "center",
                              }}
                            >
                              <img
                                src="/static/images/infoIcon.png"
                                alt=""
                                style={{
                                  position: "static",
                                  cursor: "default",
                                }}
                                className="me-3"
                              />
                              {res.point}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="form-check my-3 d-flex justify-content-center">
                    <Field
                      type="checkbox"
                      name="checkTerms"
                      className="form-check-input check"
                    />

                    <label className="form-check-label ms-2 text-center">
                      <strong>I agree with the </strong>
                      <Link
                        to="/terms-condition"
                        className="theme-text-color text-decoration-none"
                        target="_new"
                      >
                        terms and conditions
                      </Link>
                    </label>
                  </div>
                  <ErrorMessage
                    name="checkTerms"
                    component="div"
                    className="m-2 text-danger text-center"
                  />
                  <div className="d-flex align-items-center justify-content-center my-md-5 my-2 flex-md-row flex-column-reverse">
                    <Link
                      to="/kickassform"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      <button type="button" className="back-btn px-md-5">
                        <i className="fa-solid ps-5  fa-arrow-left-long me-3 "></i>
                        <span className="me-5 pe-3">Back</span>
                      </button>
                    </Link>
                    <button type="submit" className="next-btn mb-md-0 mb-3">
                      Happy Working!
                      <i className="fa-solid  fa-arrow-right-long ms-3"></i>
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </main>
      </div>
    ) : (
      <Loader />
    );
  }
};

export default QuadroTerms;
