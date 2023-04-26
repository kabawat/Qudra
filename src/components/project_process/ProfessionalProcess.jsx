import React, { useContext, useState } from "react";
import axios from "axios";
import { Header2 } from "../Header";
import Global from "../../context/Global";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import useWindowSize from "../../Hooks/useWindowSize";
import { useCookies } from "react-cookie";
import { Button, Modal } from "react-bootstrap";
import Loader from "../Loader";
const ProfessionalProcess = ({ location }) => {
  const contextData = useContext(Global);
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const windowSize = useWindowSize();
  const [dateOne, setDateOne] = useState(null);
  const [dateTwo, setDateTwo] = useState(null);
  const [dateThree, setDateThree] = useState(null);
  const [dateFour, setDateFour] = useState(null);
  const [dateFive, setDateFive] = useState(null);
  const [professionalEstimatedDate, setProfessionalEstimatedDate] =
    useState(null);
  const handleProfessionalDecesion = (
    req,
    professional_budget,
    estimated_date
  ) => {
    axios
      .post("http://13.52.16.160:8082/professional/project_requests", {
        client_id: location?.state?.client_id,
        user_token: cookies?.user_data?.user_token,
        professional_id: cookies?.user_data?.user_id,
        role: "professional",
        client_project_id: location?.state?.client_project_id,
        project_approval_status: req,
        project_cost: professional_budget,
        estimate_date: estimated_date,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          navigate("/request-projects");
        }
      });
  };
  const initialValues = {
    milestone_name_one: "",
    milestone_date_one: "",
    milestone_name_two: "",
    milestone_date_two: "",
    milestone_name_third: "",
    milestone_date_third: "",
    milestone_name_four: "",
    milestone_date_four: "",
    milestone_name_fifth: "",
    milestone_date_fifth: "",
    professional_budget: "",
    estimated_date: "",
  };
  const SignUpSchema = Yup.object().shape({
    milestone_name_one: Yup.string().required("Required"),
    milestone_date_one: Yup.string().required("Required"),
    milestone_name_two: Yup.string().required("Required"),
    milestone_date_two: Yup.string().required("Required"),
    milestone_name_third: Yup.string().required("Required"),
    milestone_date_third: Yup.string().required("Required"),
    milestone_name_four: Yup.string().required("Required"),
    milestone_date_four: Yup.string().required("Required"),
    milestone_name_fifth: Yup.string().required("Required"),
    milestone_date_fifth: Yup.string().required("Required"),
    professional_budget: Yup.string().required("Required"),
    estimated_date: Yup.string().required("Required"),
  });
  const customStyleOne = {
    borderRadius: "30px",
    filter: "drop-shadow(2.5px 4.33px 6.5px rgba(0,0,0,0.2))",
    padding: "100px 0",
  };

  const [show, setShow] = useState(false);
  const handalVerifyAccount = () => {
    navigate("/professionaldashboard");
  };
  const [loading, setLoading] = useState(false);

  return loading ? (
    <Loader />
  ) : (
    <div className="create-account">
      <Header2 />
      <main>
        <div className="container mb-5 bg-white" style={customStyleOne}>
          <div className="row m-0">
            <div className=" col-xxl-8 col-xl-9 col-lg-10 col-md-11 col-sm mx-auto">
              <section className="ProjectDetailsPageProjectDetailsSection">
                <div className="row">
                  <div className="col ">
                    <h3 className="theme-text-color fs-24 mb-5 d-flex">
                      <span>
                        {" "}
                        <Link
                          to={
                            contextData?.userData?.role === "client"
                              ? "/clientdashboard"
                              : "/request-projects"
                          }
                          className="text-decoration-none text-dark m-0 h2"
                        >
                          <i
                            className="fa-solid fa-arrow-left-long pe-3"
                            style={{ color: "#01a78a" }}
                          ></i>
                        </Link>
                      </span>
                      Project Details
                    </h3>

                    <div className="row">
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">1</div>
                        <h5>Project Name:</h5>
                        <p className="m-0 ms-3">
                          {location?.state?.projectData?.project_name}
                        </p>
                      </div>
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">2</div>
                        <h5>Client Name :</h5>
                        <p className="m-0 ms-3">
                          {location?.state?.projectData?.client_name}
                        </p>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">3</div>
                        <h5>Estimated Area:</h5>
                        <p className="m-0 ms-3">
                          {location?.state?.projectData?.area}
                        </p>
                      </div>
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">4</div>
                        <h5>Estimated Budget:</h5>
                        <p className="m-0 ms-3">
                          {location?.state?.projectData?.project_cost}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">5</div>
                        <h5>Project Status:</h5>
                        <p className="m-0 ms-3">
                          {location?.state?.projectData?.project_status}
                        </p>
                      </div>
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">6</div>
                        <h5>Estimated Deadline:</h5>
                        <p className="m-0 ms-3">
                          {location?.state?.projectData?.estimated_time}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Formik
                initialValues={initialValues}
                validationSchema={SignUpSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setLoading(true);
                  axios.put("http://13.52.16.160:8082/stripe/professionl/verify-account/", {
                    professioanl_id: cookies?.user_data?.user_id,
                    professioanl_token: cookies?.user_data?.user_token,
                  }).then((result) => {
                    console.log(result)
                    if (result?.data?.status === "Failed") {
                      setLoading(false)
                      setShow(true);
                    } else {
                      axios.post("http://13.52.16.160:8082/professional/project_details", {
                        ...location?.state?.clientDetails,
                        user_token: cookies?.user_data?.user_token,
                        professional_id: cookies?.user_data?.user_id,
                        role: "professional",
                        client_id: location?.state?.client_id,
                        client_project_id:
                          location?.state?.client_project_id,
                        ...values,
                      }).then((res) => {
                        if (res?.data?.status === "Success") {
                          handleProfessionalDecesion(
                            "accepted",
                            values?.professional_budget,
                            values?.estimated_date
                          );
                        }
                      });
                    }
                  });
                }}
              >
                {({ isSubmitting, setFieldValue }) => (
                  <Form>
                    <section className="ProjectDetailsPageMilestoneSectionForm">
                      <h3 className="theme-text-color fs-24 mt-5 mb-4">
                        Milestone
                      </h3>
                      <div className="milestoneBox row">
                        <div className="col-10">
                          <Field
                            name="milestone_name_one"
                            placeholder="Enter the name of the milestone "
                          />
                        </div>

                        <div className="col-2 theme-bg-color">
                          <DatePicker
                            selected={dateOne}
                            isClearable
                            placeholderText="Enter Date"
                            minDate={new Date()}
                            name="milestone_date_one"
                            dateFormat="yyyy-MM-dd"
                            onChange={(date) => {
                              setDateOne(date);
                              setFieldValue(
                                "milestone_date_one",
                                new Date(date).toLocaleDateString("en-CA")
                              );
                            }}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          <ErrorMessage
                            name="milestone_name_one"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                        <div className="col">
                          <ErrorMessage
                            name="milestone_date_one"
                            component="div"
                            className="m-2 text-danger text-end"
                          />
                        </div>
                      </div>
                      <div className="milestoneBox row">
                        <div className="col-10">
                          <Field
                            name="milestone_name_two"
                            placeholder="Enter the name of the milestone "
                          />
                        </div>

                        <div className="col-2 theme-bg-color">
                          <DatePicker
                            selected={dateTwo}
                            isClearable
                            placeholderText="Enter Date"
                            minDate={new Date()}
                            name="milestone_date_two"
                            dateFormat="yyyy-MM-dd"
                            onChange={(date) => {
                              setDateTwo(date);
                              setFieldValue(
                                "milestone_date_two",
                                new Date(date).toLocaleDateString("en-CA")
                              );
                            }}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          <ErrorMessage
                            name="milestone_name_two"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                        <div className="col">
                          <ErrorMessage
                            name="milestone_date_two"
                            component="div"
                            className="m-2 text-danger text-end"
                          />
                        </div>
                      </div>
                      <div className="milestoneBox row">
                        <div className="col-10">
                          <Field
                            name="milestone_name_third"
                            placeholder="Enter the name of the milestone "
                          />
                        </div>

                        <div className="col-2 theme-bg-color">
                          <DatePicker
                            selected={dateThree}
                            isClearable
                            placeholderText="Enter Date"
                            minDate={new Date()}
                            name="milestone_date_third"
                            dateFormat="yyyy-MM-dd"
                            onChange={(date) => {
                              setDateThree(date);
                              setFieldValue(
                                "milestone_date_third",
                                new Date(date).toLocaleDateString("en-CA")
                              );
                            }}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          <ErrorMessage
                            name="milestone_name_third"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                        <div className="col">
                          <ErrorMessage
                            name="milestone_date_third"
                            component="div"
                            className="m-2 text-danger text-end"
                          />
                        </div>
                      </div>
                      <div className="milestoneBox row">
                        <div className="col-10">
                          <Field
                            name="milestone_name_four"
                            placeholder="Enter the name of the milestone "
                          />
                        </div>

                        <div className="col-2 theme-bg-color">
                          <DatePicker
                            selected={dateFour}
                            isClearable
                            placeholderText="Enter Date"
                            minDate={new Date()}
                            name="milestone_date_four"
                            dateFormat="yyyy-MM-dd"
                            onChange={(date) => {
                              setDateFour(date);
                              setFieldValue(
                                "milestone_date_four",
                                new Date(date).toLocaleDateString("en-CA")
                              );
                            }}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          <ErrorMessage
                            name="milestone_name_four"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                        <div className="col">
                          <ErrorMessage
                            name="milestone_date_four"
                            component="div"
                            className="m-2 text-danger text-end"
                          />
                        </div>
                      </div>
                      <div className="milestoneBox row">
                        <div className="col-10">
                          <Field
                            name="milestone_name_fifth"
                            placeholder="Enter the name of the milestone "
                          />
                        </div>

                        <div className="col-2 theme-bg-color">
                          <DatePicker
                            selected={dateFive}
                            isClearable
                            placeholderText="Enter Date"
                            minDate={new Date()}
                            name="milestone_date_fifth"
                            dateFormat="yyyy-MM-dd"
                            onChange={(date) => {
                              setDateFive(date);
                              setFieldValue(
                                "milestone_date_fifth",
                                new Date(date).toLocaleDateString("en-CA")
                              );
                            }}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <ErrorMessage
                            name="milestone_name_fifth"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                        <div className="col">
                          <ErrorMessage
                            name="milestone_date_fifth"
                            component="div"
                            className="m-2 text-danger text-end"
                          />
                        </div>
                      </div>
                    </section>
                    <section className="product-details-submit-form mt-5 pt-4">
                      <div className="row  g-4">
                        <div className="col-sm">
                          <h6 className="pb-sm-3">Asking Budget !</h6>
                          <Field
                            name="professional_budget"
                            type="number"
                            placeholder="Enter Your Asking Budget"
                          />
                          <ErrorMessage
                            name="professional_budget"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                        <div className="col-sm">
                          <h6 className="pb-sm-3">Estimated Timeline</h6>
                          <DatePicker
                            selected={professionalEstimatedDate}
                            isClearable
                            placeholderText="Enter Date"
                            minDate={new Date()}
                            name="estimated_date"
                            dateFormat="yyyy-MM-dd"
                            onChange={(date) => {
                              setProfessionalEstimatedDate(date);
                              setFieldValue(
                                "estimated_date",
                                new Date(date).toLocaleDateString("en-CA")
                              );
                            }}
                          />
                          <ErrorMessage
                            name="estimated_date"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                      </div>
                      <div className="row mt-sm-5 mt-3 g-sm-3 g-3">
                        <div className="col-sm">
                          <button
                            onClick={() => {
                              handleProfessionalDecesion("declined");
                            }}
                            style={{
                              width: "max-content",
                              padding: "10px 65px",
                              border: "2px solid",
                              borderRadius: "50px",
                              display: "block",
                            }}
                            type="button"
                            className={`theme-text-color bg-white   ${windowSize?.width > 576 ? "ms-auto" : "mx-auto"
                              }`}
                          >
                            Decline
                            <i className="fa-solid  fa-arrow-right-long me-3"></i>
                          </button>
                        </div>
                        <div className="col-sm">
                          <button
                            type="submit"
                            className={`theme-bg-color text-white   ${windowSize?.width > 576 ? "me-auto" : "mx-auto"
                              }`}
                          >
                            Accept
                            <i className="fa-solid  fa-arrow-right-long ms-3"></i>
                          </button>
                        </div>
                      </div>
                    </section>
                  </Form>
                )}
              </Formik>
              <Modal centered show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    Please Verify your Account Details.{" "}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShow(false);
                      handalVerifyAccount();
                    }}
                  >
                    Ok
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfessionalProcess;
