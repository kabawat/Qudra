import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header2 } from "../../components/Header";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { infoIcon } from "../../components/images";
import { Link, useNavigate } from "react-router-dom";
import Global from "../../context/Global";
const LoginSchema = Yup.object().shape({
  checkTerms: Yup.bool().oneOf([true], "Accept Terms & Conditions is required"),
});

const QuadroTerms = () => {
  const [profilePoints, setProfilePoints] = useState([]);
  useEffect(() => {
    axios
      .post("http://13.52.16.160:8082/quadra/profile_points", {
        type: "Guidelines",
      })
      .then((res) => {
        setProfilePoints(res?.data?.data);
      });
  }, []);
  let navigate = useNavigate();
  return (
    <>
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
                      >
                        <div className="col-md my-md-3 my-1">
                          <div className="create-account-input">
                            <div className="policy-span">
                              <img
                                src="/static/images/infoIcon.png"
                                alt=""
                                style={{ position: "static" }}
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
                      >
                        terms and conditions
                      </Link>
                    </label>
                  </div>
                  <ErrorMessage
                    name="checkTerms"
                    component="div"
                    className="m-2 text-danger"
                  />
                  <div className="d-flex align-items-center justify-content-center my-md-5 my-2 flex-md-row flex-column-reverse">
                    <Link
                      to="/kickassform"
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      <button
                        type="button"
                        className="create-account-btn px-md-5"
                      >
                        <i className="fa-solid ps-5  fa-arrow-left-long me-3 "></i>
                        <span className="me-5 pe-3">Back</span>
                      </button>
                    </Link>
                    <button type="submit" className="logInbtn mb-md-0 mb-3">
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
    </>
  );
};

export default QuadroTerms;
