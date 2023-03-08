import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { Header2 } from "../../components/Header";
import $ from "jquery";
import {
  categoryIcon,
  prefferedDeadline,
  taskDetail,
  taskName,
} from "../../components/images";

const TaskForm = (props) => {
  const [fileCount, setFileCount] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  function handleClick1() {
    $(".form-preferred-deadline button i").toggleClass("i-rotate");
    $(".form-preferred-deadline .task-dropdown-2").slideToggle();
  }
  function handleClick2() {
    $(".form-preferred-budget button i").toggleClass("i-rotate");
    $(".form-preferred-budget .task-dropdown-1").slideToggle();
  }

  const handleFileCount = (e) => {
    const noOfFiles = e.target.files.length;
    setFileCount(noOfFiles);
  };

  const LoginSchema = Yup.object().shape({
    taskName: Yup.string().required("Please enter the task"),
    aboutTask: Yup.string().required("Please enter about your task details"),
    file: Yup.mixed().required("File is required"),
    prefferedDeadline: Yup.string().required("Please select a deadline"),
    prefferedBudget: Yup.string().required("Please select a budget"),
    area: Yup.string().required("Please select a category"),
  });

  return (
    <>
      <div className="create-account">
        <Header2 />

        <main className="create-account-main">
          <div className="container">
            <Formik
              initialValues={{
                prefferedDeadline: "",
                prefferedBudget: "",
                aboutTask: "",
                area: "",
                file: null,
                taskName: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={(values, { setSubmitting }) => {
                // axios.post("").then((res) => {
                //   if (res.message === "failed") {
                //   } else {
                //     return navigate("/");
                //   }
                // });
                // alert("submitted")
                navigate("/client-architechture");
              }}
            >
              {({ isSubmitting, setFieldValue, values }) => (
                <Form>
                  <h3>One More Step And</h3>
                  <h1>You Are Good To Go</h1>
                  <div className="row">
                    <div className="col-md my-md-3 my-1">
                      <div className="create-account-input">
                        <Field
                          type="text"
                          className="form-control"
                          placeholder="Enter Your task name"
                          name="taskName"
                        />
                        <img src={taskName} alt="" />
                        <ErrorMessage
                          name="taskName"
                          component="div"
                          className="m-2 text-danger"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md my-md-3 my-1">
                      <div className="create-account-input">
                        <Field
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="Tell us more about your task "
                          name="aboutTask"
                        />
                        <img src={taskDetail} alt="" />
                        <ErrorMessage
                          name="aboutTask"
                          component="div"
                          className="m-2 text-danger"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md my-md-3 my-1">
                      <div className="create-account-input client_area_field">
                        <div className="row">
                          <div className="col-md-10 col-9">
                            <Field
                              type="text"
                              name="area"
                              placeholder="Estimated Area You Want Design For"
                              className="no_border form-control"
                            />
                          </div>
                          <div className="col-md-2 col-3 p-1">
                            <div className="green_semi_rounded">Sq Metre</div>
                          </div>
                        </div>
                      </div>
                      <ErrorMessage
                        name="area"
                        component="div"
                        className="m-2 text-danger"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md my-md-3 my-1">
                      <div className="form-preferred-budget">
                        <button
                          type="button"
                          onClick={handleClick2}
                          className=" w-100 d-flex justify-content-between align-items-center theme-bg-color"
                        >
                          <span className="d-flex align-items-center">
                            <img
                              src={prefferedDeadline}
                              alt=""
                              className="pe-2"
                            />
                            Preferred Budget
                          </span>
                          <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="task-dropdown-1">
                          <div className="d-flex flex-column border-start border-end border-bottom">
                            <button
                              onClick={() => {
                                setFieldValue("prefferedBudget", "0-20");
                                handleClick2();
                              }}
                              type="button"
                              className="bg-white text-black border-bottom"
                            >
                              0-20$ Per sq Metre
                            </button>
                            <button
                              onClick={() => {
                                setFieldValue("prefferedBudget", "20-50");
                                handleClick2();
                              }}
                              type="button"
                              className="bg-white text-black border-bottom"
                            >
                              20-50$ Per sq Metre
                            </button>
                            <button
                              onClick={() => {
                                setFieldValue("prefferedBudget", "50-100");
                                handleClick2();
                              }}
                              type="button"
                              className="bg-white text-black border-bottom"
                            >
                              50-100$ Per sq Metre
                            </button>
                            <button
                              onClick={() => {
                                setFieldValue("prefferedBudget", ">100");
                                handleClick2();
                              }}
                              type="button"
                              className="bg-white text-black border-bottom"
                            >
                              above 100$ Per sq Metre
                            </button>
                            <Field type="hidden" name="prefferedBudget" />
                          </div>
                        </div>
                      </div>
                      <ErrorMessage
                        name="prefferedBudget"
                        component="div"
                        className="m-2 text-danger"
                      />

                      {values.prefferedBudget ? (
                        <div className="my-2" style={{ fontSize: "12px" }}>
                          Selected Budget {values.prefferedBudget}$ Per sq Metre
                        </div>
                      ) : null}
                    </div>

                    <div className="col-md my-md-3 my-1">
                      <div className="form-preferred-deadline">
                        <button
                          onClick={handleClick1}
                          type="button"
                          className=" w-100 d-flex justify-content-between align-items-center theme-bg-color"
                        >
                          <span className="d-flex align-items-center">
                            <img
                              src={prefferedDeadline}
                              alt=""
                              className="pe-2"
                            />
                            Preferred Deadline
                          </span>
                          <i className="fa fa-caret-down"></i>
                        </button>
                        <div className="task-dropdown-2">
                          <div className="d-flex flex-column border-start border-end border-bottom">
                            <button
                              onClick={() => {
                                setFieldValue("prefferedDeadline", "2-4");
                                handleClick1();
                              }}
                              type="button"
                              className="bg-white text-black border-bottom"
                            >
                              2-4 days
                            </button>
                            <button
                              onClick={() => {
                                setFieldValue("prefferedDeadline", "5-10");
                                handleClick1();
                              }}
                              type="button"
                              className="bg-white text-black border-bottom"
                            >
                              5-10 days
                            </button>
                            <button
                              onClick={() => {
                                setFieldValue("prefferedDeadline", "11-20");
                                handleClick1();
                              }}
                              type="button"
                              className="bg-white text-black border-bottom"
                            >
                              11-20 days
                            </button>
                            <button
                              onClick={() => {
                                setFieldValue("prefferedDeadline", ">20");
                                handleClick1();
                              }}
                              type="button"
                              className="bg-white text-black border-bottom"
                            >
                              above 20 days
                            </button>
                            <Field type="hidden" name="prefferedDeadline" />
                          </div>
                        </div>
                      </div>
                      <ErrorMessage
                        name="prefferedDeadline"
                        component="div"
                        className="m-2 text-danger"
                      />
                      {values.prefferedDeadline ? (
                        <div className="my-2" style={{ fontSize: "12px" }}>
                          Selected Deadline {values.prefferedDeadline} days
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md my-md-3 my-1">
                      <div className="create-account-input">
                        <div className="policy-span row p-1">
                          <div className="col-md-3 px-md-0">
                            <div className="task-details-file-upload-box ">
                              <div className="task-details-file-upload-box-overlay theme-bg-color">
                                + Upload Files
                              </div>
                              <Field
                                name="file"
                                type="file"
                                id="task-details-file-upload-box-input"
                                multiple
                                onInput={handleFileCount}
                              />
                            </div>
                          </div>
                          <div className="col-md-9 px-md-0  text-center d-flex align-items-center">
                            <span className="ps-4">
                              Drag & drop any images or documents that might be
                              helpful in explaining your brief here
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ErrorMessage
                    name="file"
                    component="div"
                    className="m-2 text-danger"
                  />
                  {fileCount && (
                    <div>
                      {fileCount} {fileCount === 1 ? "File" : "Files"} selected
                    </div>
                  )}
                  <div className="d-md-flex align-items-center justify-content-center mt-md-5 my-2">
                    <button
                      type="submit"
                      className="create-account-btn px-md-5"
                    >
                      <span className="ps-5">Next</span>
                      <i className="fa-solid  fa-arrow-right-long ms-3 pe-5"></i>
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

export default TaskForm;
