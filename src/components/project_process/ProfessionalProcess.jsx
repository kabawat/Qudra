import React, { useContext, useState } from "react";
import axios from "axios";
import { Header2 } from "../Header";
import Global from "../../context/Global";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdCloudUpload } from "react-icons/md";
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
    milestone_one_percent: "",
    milestone_one_description: "",

    milestone_name_two: "",
    milestone_date_two: "",
    milestone_two_percent: "",
    milestone_two_description: "",

    milestone_name_third: "",
    milestone_date_third: "",
    milestone_third_percent: "",
    milestone_third_description: "",

    milestone_name_four: "",
    milestone_date_four: "",
    milestone_four_percent: "",
    milestone_four_description: "",

    milestone_name_fifth: "",
    milestone_date_fifth: "",
    milestone_fifth_percent: "",
    milestone_fifth_description: "",

    professional_budget: "",
    estimated_date: "",
  };
  const FILE_SIZE = 900 * 1024;
  const SignUpSchema = Yup.object().shape({
    // milestone_name_one: Yup.string().required("Required"),
    // milestone_date_one: Yup.string().required("Required"),
    // milestone_one_percent: Yup.string().required("Required"),
    // milestone_one_description: Yup.string().required("Required"),

    // milestone_name_two: Yup.string().required("Required"),
    // milestone_date_two: Yup.string().required("Required"),
    // milestone_two_percent: Yup.string().required("Required"),
    // milestone_two_description: Yup.string().required("Required"),

    // milestone_name_third: Yup.string().required("Required"),
    // milestone_date_third: Yup.string().required("Required"),
    // milestone_third_percent: Yup.string().required("Required"),
    // milestone_third_description: Yup.string().required("Required"),

    // milestone_name_four: Yup.string().required("Required"),
    // milestone_date_four: Yup.string().required("Required"),
    // milestone_four_percent: Yup.string().required("Required"),
    // milestone_four_description: Yup.string().required("Required"),

    // milestone_name_fifth: Yup.string().required("Required"),
    // milestone_date_fifth: Yup.string().required("Required"),
    // milestone_fifth_percent: Yup.string().required("Required"),
    // milestone_fifth_description: Yup.string().required("Required"),

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

  const [fileReport, setFileReport] = useState();
  const [reportUpload, setreportUpload] = useState(false);
  const [attachement, setAttachement] = useState("");
  const [attch, setattch] = useState({
    attach1: "",
    attach2: "",
    attach3: "",
    attach4: "",
    attach5: "",
  });
  const [reqportlbl, setreqportlbl] = useState({
    attach1: "",
    attach2: "",
    attach3: "",
    attach4: "",
    attach5: "",
  });

  const [errlblattach1, seterrlblattach1] = useState(false);
  const [errlblattach2, seterrlblattach2] = useState(false);
  const [errlblattach3, seterrlblattach3] = useState(false);
  const [errlblattach4, seterrlblattach4] = useState(false);
  const [errlblattach5, seterrlblattach5] = useState(false);
  const [errlblprofessional_budget, seterrlblprofessional_budget] =
    useState(false);
  const [errlblestimated_date, seterrlblestimated_date] = useState(false);
  const handlechange = (e) => {
    console.log(e.target);
    setattch({ ...attch, [e.target.name]: e.target.files[0] });
    setreqportlbl({ ...reqportlbl, [e.target.name]: e.target.files[0].name });
  };

  function handleChange_File(e) {
    const file = URL.createObjectURL(e.target.files[0]);
    let pdfFile = e.target.files[0].name;
    setAttachement(e.target.files[0]);
    setFileReport(pdfFile);
    setreportUpload(true);
    // setreportUpload(true);
    // setAttachementError("");
  }

  return loading ? (
    <Loader />
  ) : (
    <div className="create-account">
      <Header2 />
      <main>
        <div className="container mb-5 bg-white" style={customStyleOne}>
          <div className="row m-0">
            <div className=" col-xxl-10 col-xl-10 col-lg-11 col-md-11 col-sm mx-auto">
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
                    <div className="row">
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">3</div>
                        <h5>Project File Attachement:</h5>
                        <p className="m-0 ms-3">
                          <a
                            style={{ color: "#01a78a" }}
                            href={location?.state?.projectData?.attachment}
                            download={location?.state?.projectData?.attachment}
                            target="_blank"
                          >
                            View
                          </a>
                        </p>
                      </div>
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">4</div>
                        <h5>Work Assigned:</h5>
                        <p className="m-0 ms-3">
                          {location?.state?.projectData?.work_assigned}
                        </p>
                      </div>
                    </div>
                    <div className="row ">
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">5</div>
                        <h5>Estimated Area:</h5>
                        <p className="m-0 ms-3">
                          {location?.state?.projectData?.area} sq meter
                        </p>
                      </div>
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">6</div>
                        <h5>Estimated Budget:</h5>
                        <p className="m-0 ms-3">
                          $ {location?.state?.projectData?.project_cost}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">7</div>
                        <h5>Project Status:</h5>
                        <p
                          className="m-0 ms-3"
                          style={{ textTransform: "capitalize" }}
                        >
                          {location?.state?.projectData?.project_status}
                        </p>
                      </div>
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">8</div>
                        <h5>Estimated Deadline:</h5>
                        <p className="m-0 ms-3">
                          {location?.state?.projectData?.estimated_time}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">9</div>
                        <h5>Project Description:</h5>
                        <p className="m-0 ms-3">
                          {location?.state?.projectData?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <Formik
                initialValues={initialValues}
                // validationSchema={SignUpSchema}
                onSubmit={(values, { setSubmitting }) => {
                  // setLoading(true);
                  if (
                    !attch.attach1 ||
                    !values.milestone_date_one ||
                    !values.milestone_one_description ||
                    !values.milestone_one_percent ||
                    !values.milestone_date_one
                  ) {
                    seterrlblattach1(true);
                  }
                  if (
                    !attch.attach2 ||
                    !values.milestone_date_two ||
                    !values.milestone_two_description ||
                    !values.milestone_two_percent ||
                    !values.milestone_date_two
                  ) {
                    seterrlblattach2(true);
                  }
                  if (
                    !attch.attach3 ||
                    !values.milestone_date_third ||
                    !values.milestone_third_description ||
                    !values.milestone_third_percent ||
                    !values.milestone_date_third
                  ) {
                    seterrlblattach3(true);
                  }
                  if (
                    !attch.attach4 ||
                    !values.milestone_date_four ||
                    !values.milestone_four_description ||
                    !values.milestone_four_percent ||
                    !values.milestone_date_four
                  ) {
                    seterrlblattach4(true);
                  }
                  if (
                    !attch.attach5 ||
                    !values.milestone_date_fifth ||
                    !values.milestone_fifth_description ||
                    !values.milestone_fifth_percent ||
                    !values.milestone_date_fifth
                  ) {
                    seterrlblattach5(true);
                  }
                  if (!values.professional_budget) {
                    seterrlblprofessional_budget(true);
                  }
                  if (!values.estimated_date) {
                    seterrlblestimated_date(true);
                  } else if (
                    !values.professional_budget ||
                    !values.estimated_date ||
                    !attch.attach2 ||
                    !values.milestone_date_fifth ||
                    !values.milestone_fifth_description ||
                    !values.milestone_fifth_percent ||
                    !values.milestone_date_fifth ||
                    !attch.attach1 ||
                    !values.milestone_date_one ||
                    !values.milestone_one_description ||
                    !values.milestone_one_percent ||
                    !values.milestone_date_one ||
                    !attch.attach4 ||
                    !values.milestone_four_description ||
                    !values.milestone_four_percent ||
                    !values.milestone_date_four ||
                    !attch.attach3 ||
                    !values.milestone_date_third ||
                    !values.milestone_third_description ||
                    !values.milestone_third_percent ||
                    !values.milestone_date_third ||
                    !attch.attach5 ||
                    !values.milestone_date_fifth ||
                    !values.milestone_fifth_description ||
                    !values.milestone_fifth_percent ||
                    !values.milestone_date_fifth
                  ) {
                    return false;
                  } else {
                    axios
                      .put(
                        "http://13.52.16.160:8082/stripe/professionl/verify-account/",
                        {
                          professioanl_id: cookies?.user_data?.user_id,
                          professioanl_token: cookies?.user_data?.user_token,
                        }
                      )
                      .then((result) => {
                        if (result?.data?.status === "Failed") {
                          setShow(true);
                        } else {
                          const formdata = new FormData();
                          formdata.set("client_id", location?.state?.client_id);
                          formdata.set(
                            "user_token",
                            cookies?.user_data?.user_token
                          );
                          formdata.set(
                            "professional_id",
                            cookies?.user_data?.user_id
                          );
                          formdata.set("role ", cookies?.user_data?.role);
                          formdata.set(
                            "client_project_id ",
                            location?.state?.client_project_id
                          );
                          formdata.set(
                            "professional_budget ",
                            values.professional_budget
                          );
                          formdata.set(
                            "estimate_date ",
                            values?.estimated_date
                          );
                          formdata.set(
                            "milestone_name_one ",
                            values.milestone_name_one
                          );
                          formdata.set(
                            "milestone_name_two ",
                            values.milestone_name_two
                          );
                          formdata.set(
                            "milestone_name_third ",
                            values.milestone_name_third
                          );
                          formdata.set(
                            "milestone_name_four ",
                            values.milestone_name_four
                          );
                          formdata.set(
                            "milestone_name_fifth ",
                            values.milestone_name_fifth
                          );

                          formdata.set(
                            "milestone_date_one ",
                            values.milestone_date_one
                          );
                          formdata.set(
                            "milestone_date_two ",
                            values.milestone_date_two
                          );
                          formdata.set(
                            "milestone_date_third ",
                            values.milestone_date_third
                          );
                          formdata.set(
                            "milestone_date_four ",
                            values.milestone_date_four
                          );
                          formdata.set(
                            "milestone_date_fifth ",
                            values.milestone_date_fifth
                          );

                          formdata.set(
                            "milestone_one_description ",
                            values.milestone_one_description
                          );
                          formdata.set(
                            "milestone_two_description ",
                            values.milestone_two_description
                          );
                          formdata.set(
                            "milestone_third_attachment ",
                            values.milestone_third_description
                          );
                          formdata.set(
                            "milestone_four_attachment ",
                            values.milestone_four_description
                          );
                          formdata.set(
                            "milestone_fifth_attachment ",
                            values.milestone_fifth_description
                          );
                          formdata.set(
                            "milestone_one_attachment",
                            attch.attach1
                          );
                          formdata.set(
                            "milestone_two_attachment",
                            attch.attach2
                          );
                          formdata.set(
                            "milestone_third_attachment",
                            attch.attach3
                          );
                          formdata.set(
                            "milestone_four_attachment",
                            attch.attach4
                          );
                          formdata.set(
                            "milestone_fifth_attachment",
                            attch.attach5
                          );
                          formdata.set(
                            "milestone_one_percent",
                            values?.milestone_one_percent
                          );
                          formdata.set(
                            "milestone_two_percent",
                            values?.milestone_two_percent
                          );
                          formdata.set(
                            "milestone_third_percent",
                            values?.milestone_third_percent
                          );
                          formdata.set(
                            "milestone_four_percent",
                            values?.milestone_four_percent
                          );
                          formdata.set(
                            "milestone_fifth_percent",
                            values?.milestone_fifth_percent
                          );
                          // formdata.set(
                          //   "professional_budget ",
                          //   values?.professional_budget
                          // );
                          // formdata.set("project_cost", values?.budget);
                          // formdata.set("area ", values?.area);
                          console.log(location?.state?.clientDetails);
                          axios
                            .post(
                              "http://13.52.16.160:8082/professional/project_details",
                              formdata
                            )
                            .then((res) => {
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
                  }
                }}
              >
                {({ values, isSubmitting, setFieldValue }) => (
                  <Form>
                    <section className="ProjectDetailsPageMilestoneSectionForm">
                      <h3 className="theme-text-color fs-24 mt-5 mb-4">
                        Milestone
                      </h3>
                      <div className="milestoneBox row">
                        <div className="row rowMilestone">
                          <div className="col-3 colMilestone">
                            <Field
                              name="milestone_name_one"
                              placeholder="Name of the milestone  "
                              value={values.milestone_name_one}
                              onChange={(e) => {
                                setFieldValue(
                                  "milestone_name_one",
                                  e.target.value
                                );
                              }}
                            />
                          </div>

                          <div className="col-3 colMilestone">
                            <Field
                              name="milestone_one_percent"
                              placeholder=" Cost % "
                              className="milestone_input_des"
                              value={values.milestone_one_percent}
                              onChange={(e) => {
                                setFieldValue(
                                  "milestone_one_percent",
                                  e.target.value
                                );
                              }}
                            />
                          </div>
                          <div className="col-3 ">
                            <input
                              type="file"
                              name="attach1"
                              // placeholder="Milestone Descrption  "
                              id="attachement1"
                              className="mileStoneAttach"
                              onChange={handlechange}
                              style={{ display: "none" }}
                            />
                            <label
                              name="attach1"
                              htmlFor="attachement1"
                              className="input-path-label mileStoneAttach_lablel mt-1 "
                              style={{ background: "none" }}
                            >
                              <span>
                                <MdCloudUpload
                                  size={40}
                                  color={"rgb(1, 167, 138)"}
                                  margin-left={"10px"}
                                  s
                                />
                              </span>
                              {reqportlbl.attach1 ? (
                                <p className="Report">
                                  {" "}
                                  {reqportlbl.attach1.slice(0, 10) + "...."}
                                </p>
                              ) : (
                                <p className="Report">Upload Attachement</p>
                              )}
                            </label>
                          </div>
                          <div className="col-3 p-0">
                            <div className="theme-bg-color milestonedatepicker">
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
                        </div>
                        <div className="row">
                          <div className="col-12 p-0 ">
                            <Field
                              as="textarea"
                              row="6"
                              name="milestone_one_description"
                              placeholder=" Descrption  "
                              className="milestone_input_des  "
                              value={values.milestone_one_description}
                              onChange={(e) => {
                                setFieldValue(
                                  "milestone_one_description",
                                  e.target.value
                                );
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        {/* <div className="col">
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
                        <div className="col">
                          <ErrorMessage
                            name="milestone_one_percent"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                        <div className="col">
                          <ErrorMessage
                            name="milestone_one_description"
                            component="div"
                            className="m-2 text-danger text-end"
                          />
                        </div> */}
                        <div className="col">
                          {errlblattach1 === true ? (
                            <span>require image</span>
                          ) : null}
                        </div>
                      </div>
                      <div className="milestoneBox row">
                        <div className="row rowMilestone">
                          <div className="col-3 colMilestone">
                            <Field
                              name="milestone_name_two"
                              placeholder="Enter the name of the milestone "
                              value={values.milestone_name_two}
                              onChange={(e) => {
                                setFieldValue(
                                  "milestone_name_two",
                                  e.target.value
                                );
                              }}
                            />
                          </div>

                          <div className="col-3 colMilestone">
                            <Field
                              name="milestone_two_percent"
                              placeholder=" Cost % "
                              className="milestone_input_des"
                              value={values.milestone_two_percent}
                              onChange={(e) => {
                                setFieldValue(
                                  "milestone_two_percent",
                                  e.target.value
                                );
                              }}
                            />
                          </div>
                          <div className="col-3 ">
                            <input
                              type="file"
                              name="attach2"
                              // placeholder="Milestone Descrption  "
                              title="suraj"
                              id="attachement2"
                              className="mileStoneAttach"
                              onChange={handlechange}
                              style={{ display: "none" }}
                            />
                            <label
                              name="attach2"
                              htmlFor="attachement2"
                              className="input-path-label mileStoneAttach_lablel mt-1 "
                              style={{ background: "none" }}
                            >
                              <span>
                                <MdCloudUpload
                                  size={40}
                                  color={"rgb(1, 167, 138)"}
                                  margin-left={"10px"}
                                  s
                                />
                              </span>
                              {reqportlbl.attach2 ? (
                                <p className="Report">
                                  {" "}
                                  {reqportlbl.attach2.slice(0, 10) + "...."}
                                </p>
                              ) : (
                                <p className="Report">Upload Attachement</p>
                              )}
                            </label>
                          </div>
                          <div className="col-3 p-0">
                            <div className="theme-bg-color milestonedatepicker">
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
                        </div>
                        <div className="row">
                          <div className="col-12 p-0 ">
                            <Field
                              as="textarea"
                              row="6"
                              name="milestone_two_description"
                              placeholder=" Descrption  "
                              className="milestone_input_des  "
                              value={values.milestone_two_description}
                              onChange={(e) => {
                                setFieldValue(
                                  "milestone_two_description",
                                  e.target.value
                                );
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          {/* <ErrorMessage
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
                        <div className="col">
                          <ErrorMessage
                            name="milestone_two_percent"
                            component="div"
                            className="m-2 text-danger"
                          /> */}
                        </div>
                        {/* <div className="col">
                          <ErrorMessage
                            name="milestone_two_description"
                            component="div"
                            className="m-2 text-danger text-end"
                          />
                        </div> */}
                        <div className="col">
                          {errlblattach2 === true ? (
                            <span>require image</span>
                          ) : null}
                        </div>
                      </div>

                      <div className="milestoneBox row">
                        <div className="row rowMilestone">
                          <div className="col-3 colMilestone">
                            <Field
                              name="milestone_name_third"
                              placeholder="Enter the name of the milestone "
                              value={values.milestone_name_third}
                              onChange={(e) => {
                                setFieldValue(
                                  "milestone_name_third",
                                  e.target.value
                                );
                              }}
                            />
                          </div>

                          <div className="col-3 colMilestone">
                            <Field
                              name="milestone_third_percent"
                              placeholder=" Cost % "
                              className="milestone_input_des  "
                              value={values.milestone_third_percent}
                              onChange={(e) => {
                                setFieldValue(
                                  "milestone_third_percent",
                                  e.target.value
                                );
                              }}
                            />
                          </div>
                          <div className="col-3 ">
                            <input
                              type="file"
                              name="attach3"
                              // placeholder="Milestone Descrption  "
                              title="suraj"
                              id="attachement3"
                              className="mileStoneAttach"
                              onChange={handlechange}
                              style={{ display: "none" }}
                            />
                            <label
                              name="attach2"
                              htmlFor="attachement3"
                              className="input-path-label mileStoneAttach_lablel mt-1 "
                              style={{ background: "none" }}
                            >
                              <span>
                                <MdCloudUpload
                                  size={40}
                                  color={"rgb(1, 167, 138)"}
                                  margin-left={"10px"}
                                  s
                                />
                              </span>
                              {reqportlbl.attach3 ? (
                                <p className="Report">
                                  {" "}
                                  {reqportlbl.attach3.slice(0, 10) + "...."}
                                </p>
                              ) : (
                                <p className="Report">Upload Attachement</p>
                              )}
                            </label>
                          </div>
                          <div className="col-3 p-0">
                            <div className="theme-bg-color milestonedatepicker">
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
                        </div>
                        <div className="row">
                          <div className="col-12 p-0 ">
                            <Field
                              as="textarea"
                              row="6"
                              name="milestone_third_description"
                              placeholder=" Descrption"
                              className="milestone_input_des"
                              value={values.milestone_third_description}
                              onChange={(e) => {
                                setFieldValue(
                                  "milestone_third_description",
                                  e.target.value
                                );
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        {/* <div className="col">
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
                        <div className="col">
                          <ErrorMessage
                            name="milestone_third_percent"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                        <div className="col">
                          <ErrorMessage
                            name="milestone_third_description"
                            component="div"
                            className="m-2 text-danger text-end"
                          />
                        </div> */}
                        <div className="col">
                          {errlblattach3 === true ? (
                            <span>require image</span>
                          ) : null}
                        </div>
                      </div>

                      <div className="milestoneBox row">
                        <div className="row rowMilestone">
                          <div className="col-3 colMilestone">
                            <Field
                              name="milestone_name_four"
                              placeholder="Enter the name of the milestone "
                              value={values.milestone_name_four}
                              onChange={(e) => {
                                setFieldValue(
                                  "milestone_name_four",
                                  e.target.value
                                );
                              }}
                            />
                          </div>

                          <div className="col-3 colMilestone">
                            <Field
                              name="milestone_four_percent"
                              placeholder=" Cost % "
                              className="milestone_input_des  "
                              value={values.milestone_four_percent}
                              onChange={(e) => {
                                setFieldValue(
                                  "milestone_four_percent",
                                  e.target.value
                                );
                              }}
                            />
                          </div>
                          <div className="col-3 ">
                            <input
                              type="file"
                              name="attach4"
                              // placeholder="Milestone Descrption  "
                              title="suraj"
                              id="attachement4"
                              className="mileStoneAttach"
                              onChange={handlechange}
                              style={{ display: "none" }}
                            />
                            <label
                              name="attach4"
                              htmlFor="attachement4"
                              className="input-path-label mileStoneAttach_lablel mt-1 "
                              style={{ background: "none" }}
                            >
                              <span>
                                <MdCloudUpload
                                  size={40}
                                  color={"rgb(1, 167, 138)"}
                                  margin-left={"10px"}
                                  s
                                />
                              </span>
                              {reqportlbl.attach4 ? (
                                <p className="Report">
                                  {" "}
                                  {reqportlbl.attach4.slice(0, 10) + "...."}
                                </p>
                              ) : (
                                <p className="Report">Upload Attachement</p>
                              )}
                            </label>
                          </div>
                          <div className="col-3 p-0">
                            <div className="theme-bg-color milestonedatepicker">
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
                        </div>
                        <div className="row">
                          <div className="col-12 p-0 ">
                            <Field
                              as="textarea"
                              row="6"
                              name="milestone_four_description"
                              placeholder=" Descrption  "
                              className="milestone_input_des  "
                              value={values.milestone_four_description}
                              onChange={(e) => {
                                setFieldValue(
                                  "milestone_four_description",
                                  e.target.value
                                );
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        {/* <div className="col">
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
                        <div className="col">
                          <ErrorMessage
                            name="milestone_four_percent"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                        <div className="col">
                          <ErrorMessage
                            name="milestone_four_description"
                            component="div"
                            className="m-2 text-danger text-end"
                          />
                        </div> */}
                        <div className="col">
                          {errlblattach4 === true ? (
                            <span>require image</span>
                          ) : null}
                        </div>
                      </div>

                      <div className="milestoneBox row">
                        <div className="row rowMilestone">
                          <div className="col-3 colMilestone">
                            <Field
                              name="milestone_name_fifth"
                              placeholder="Enter the name of the milestone "
                              value={values.milestone_name_fifth}
                              onChange={(e) => {
                                setFieldValue(
                                  "milestone_name_fifth",
                                  e.target.value
                                );
                              }}
                            />
                          </div>

                          <div className="col-3 colMilestone">
                            <Field
                              name="milestone_fifth_percent"
                              placeholder=" Cost % "
                              className="milestone_input_des  "
                              value={values.milestone_fifth_percent}
                              onChange={(e) => {
                                setFieldValue(
                                  "milestone_fifth_percent",
                                  e.target.value
                                );
                              }}
                            />
                          </div>
                          <div className="col-3 ">
                            <input
                              type="file"
                              name="attach5"
                              // placeholder="Milestone Descrption  "
                              title="suraj"
                              id="attachement5"
                              className="mileStoneAttach"
                              onChange={handlechange}
                              style={{ display: "none" }}
                            />
                            <label
                              name="attach2"
                              htmlFor="attachement5"
                              className="input-path-label mileStoneAttach_lablel mt-1 "
                              style={{ background: "none" }}
                            >
                              <span>
                                <MdCloudUpload
                                  size={40}
                                  color={"rgb(1, 167, 138)"}
                                  margin-left={"10px"}
                                  s
                                />
                              </span>
                              {reqportlbl.attach5 ? (
                                <p className="Report">
                                  {" "}
                                  {reqportlbl.attach5.slice(0, 10) + "...."}
                                </p>
                              ) : (
                                <p className="Report">Upload Attachement</p>
                              )}
                            </label>
                          </div>
                          <div className="col-3 p-0">
                            <div className="theme-bg-color milestonedatepicker">
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
                        </div>
                        <div className="row">
                          <div className="col-12 p-0 ">
                            <Field
                              as="textarea"
                              row="6"
                              name="milestone_fifth_description"
                              placeholder=" Descrption  "
                              className="milestone_input_des  "
                              value={values.milestone_fifth_description}
                              onChange={(e) => {
                                setFieldValue(
                                  "milestone_fifth_description",
                                  e.target.value
                                );
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        {/* <div className="col">
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
                        <div className="col">
                          <ErrorMessage
                            name="milestone_fifth_percent"
                            component="div"
                            className="m-2 text-danger"
                          />
                        </div>
                        <div className="col">
                          <ErrorMessage
                            name="milestone_fifth_description"
                            component="div"
                            className="m-2 text-danger text-end"
                          />
                        </div> */}
                        <div className="col">
                          {errlblattach5 === true ? (
                            <span style={{ color: "red" }}>
                              All Field is Rquired
                            </span>
                          ) : null}
                        </div>
                      </div>

                      {/* <div className="milestoneBox row">
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
                      </div> */}
                    </section>
                    <section className="product-details-submit-form mt-5 pt-4">
                      <div className="row  g-4">
                        <div className="col-sm">
                          <h6 className="pb-sm-3">Asking Budget !</h6>
                          <Field
                            name="professional_budget"
                            type="number"
                            placeholder="Enter Your Asking Budget"
                            value={values.professional_budget}
                            onChange={(e) => {
                              setFieldValue(
                                "professional_budget",
                                e.target.value
                              );
                            }}
                          />
                          {errlblprofessional_budget ? (
                            <div>
                              <span>Professional Budget is Required</span>
                            </div>
                          ) : null}
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
                          {errlblestimated_date ? (
                            <div>
                              <span>Estimate Date is Required</span>
                            </div>
                          ) : null}
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
                            className={`theme-text-color bg-white   ${
                              windowSize?.width > 576 ? "ms-auto" : "mx-auto"
                            }`}
                          >
                            Decline
                            <i className="fa-solid  fa-arrow-right-long me-3"></i>
                          </button>
                        </div>
                        <div className="col-sm">
                          <button
                            type="submit"
                            className={`theme-bg-color text-white   ${
                              windowSize?.width > 576 ? "me-auto" : "mx-auto"
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
