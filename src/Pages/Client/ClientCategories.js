import React, { useEffect, useState } from "react";
import { Header2 } from "../../components/Header";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useNavigate, Link } from "react-router-dom";
import $ from "jquery";
import axios from "axios";
import {
  residentailArchitecture,
  commercialArchitecture,
  culturalArchitecture,
  educationArchitecture,
  healthCare,
  hospitalityArchitecture2,
  industrialArchitecture,
  interiorDesign2,
  landScape,
  publicArchitecture,
  refurbishmentCategory,
  religiousArchitecture,
  sportsArchitecture,
} from "../../components/images";

const ClientCategory = () => {
  function handleClick1() {
    $(".form-preferred-deadline button i").toggleClass("i-rotate");
    $(".form-preferred-deadline .task-dropdown-2").slideToggle();
  }
  const toggleDisabled = (target) => {
    // let targetElement = document.getElementById(`${parseInt(target.id)}rate`);
    let IconTarget = document.getElementById(`greenIcon${parseInt(target.id)}`);
    // target.checked
    //   ? (targetElement.disabled = false)
    //   : (targetElement.disabled = true);
    // console.log(IconTarget)
    if (target?.checked) {
      IconTarget.style.backgroundColor = "#01A78A";
      IconTarget.style.color = "#FFFFFF";
    } else {
      IconTarget.style.backgroundColor = "#CFD2CF";
      IconTarget.style.color = "#01a78a";
    }
  };

  const [icons, setIcons] = useState([]);
  const [arr, setArr] = useState([]);
  const [page, setPage] = useState(1);

  const style = {
    color: "#01a78a",
    textDecoration: "none",
  };
  const navigate = useNavigate();

  const pageSetter = () => {
    if (page != 2) {
      setPage(page + 1);
    }
  };

  const backSetter = () => {
    if (page != 1) {
      setPage(page - 1);
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    if (page == 1) {
      setArr([
        "Residential Architecture",
        "Interior Design",
        "Refurbishment",
        "Cultural Architecture",
        "Commercial & Offices",
        "Hospitality Architecture",
        "Public Architecture",
        "Healthcare Architecture",
        "Educational Architecture",
        "Sports Architecture",
        "Religious Architecture",
        "Industrial & Infrastructure",
        "Landscape & Urbanism",
      ]);
      setIcons([
        residentailArchitecture,
        healthCare,
        interiorDesign2,
        educationArchitecture,
        refurbishmentCategory,
        sportsArchitecture,
        culturalArchitecture,
        religiousArchitecture,
        commercialArchitecture,
        hospitalityArchitecture2,
        industrialArchitecture,
        landScape,
        publicArchitecture,
      ]);
    }
    if (page == 2) {
      setArr([
        "3D Exterior Rendering",
        "3D Interior Rendering",
        "3D Product Rendering",
        "3D Panorama 360 degree",
        "Birds Eye View",
        "Virtual Staging",
        "Photo Matching",
        "3D Floor Plans",
        "3D Site Plans",
        "3D Sections",
        "3D Elevations",
        "Exterior Walk through",
        "Interior Walk through",
      ]);
    }
  }, [page]);

  return (
    <>
      <div className="create-account">
        <main className="create-account-main">
          <div className="container mb-5">
            <Header2 />
            <Formik
              initialValues={{}}
              // validationSchema={SetUpSchema}
              onSubmit={(values, { setSubmitting }) => {
                navigate("/categoryresult");
              }}
            >
              {({ isSubmitting, setFieldValue, values }) => (
                <Form>
                  {page === 1 && (
                    <>
                      <h1>Your Interest</h1>
                      <div className="category-button">
                        <h6 className="text-center">
                          Architectural Planning / Interior Designing
                        </h6>
                      </div>

                      <br />
                      {/* <div className="sel-service">
                        <div
                          className="me-auto"
                          style={{ fontSize: "25px", color: "#01a78a",cursor:"pointer" }}
                        >
                          <i
                            className="fa-solid fa-arrow-left-long"
                            onClick={backSetter}
                          ></i>
                        </div>
                        <h6 className="text-end mb-3">
                          Select service and fill service charges
                        </h6>
                      </div> */}
                      <div
                        className="me-auto"
                        style={{
                          fontSize: "25px",
                          color: "#01a78a",
                          cursor: "pointer",
                        }}
                      >
                        <i
                          style={{ fontSize: "30px" }}
                          className="fa-solid fa-arrow-left-long"
                          onClick={backSetter}
                        ></i>
                      </div>
                      <div className="row">
                        {arr?.map((name, i) => (
                          <div
                            className="col-sm-6 my-md-4 px-lg-5 px-md-2"
                            key={i}
                          >
                            <div
                              className="py-3 px-1 shadow-box"
                              style={{
                                position: "relative",
                                overflow: "hidden",
                              }}
                            >
                              <div
                                className={`right_bottom_icon `}
                                id={`greenIcon${i}`}
                              >
                                <i className="fa-regular fa-plus plus_icon"></i>
                              </div>
                              <div className="row  category-box">
                                <div className="col-md-3 col-12 h-100 text-center  px-2">
                                  <div className="p-md-1 p-lg-3 icon-box">
                                    <img src={icons[i]} />
                                  </div>
                                </div>
                                <div className="col-md-9 col-12 d-sm-flex align-items-center px-3 p-md-0">
                                  <div>
                                    <h6 className="m-0 text-md-start text-center">
                                      {name}
                                    </h6>
                                    <div className="row">
                                      <div className="col-1 d-flex mt-2 align-tems-center">
                                        <Field
                                          type="checkbox"
                                          id={`${i}checkbox`}
                                          name={name.split(" ").join("")}
                                          className="large-checkbox"
                                          style={{ cursor: "pointer" }}
                                          onInput={(e) =>
                                            toggleDisabled(e.target)
                                          }
                                        />
                                      </div>
                                      {/* <div className="col-10">
                                      <input
                                  type="text"
                                  name={name.split(" ").join("")}
                                  id={`${i}rate`}
                                  className="w-100 rate-input"
                                  placeholder="Enter $ per Sq Metre Price"
                                  onChange={(e) => {
                                    setFieldValue(
                                      e.target.name,
                                      parseInt(e.target.value)
                                    )
                                    checkNAN(e.target)
                                  }}
                                  disabled
                                />
                                      </div> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="text-danger my-2"
                              id={`error${i}`}
                            ></div>
                          </div>
                        ))}
                        <div className="col-md-6 col-12 my-md-4 my-3 d-flex align-items-center justify-content-center">
                          <button
                            type="button"
                            className="create-account-btn"
                            onClick={pageSetter}
                          >
                            Continue
                          </button>
                          <button
                            type="button"
                            className="logInbtn"
                            style={{ marginTop: "0" }}
                          >
                            <Link to="/login" style={style}>
                              Skip
                            </Link>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                  {page === 2 && (
                    <>
                      <>
                        <h1>Your Interest</h1>
                        <div className="category-button">
                          <h6 className="text-center">Visualization</h6>
                        </div>

                        <br />
                        {/* <div className="sel-service">
                        <div
                          className="me-auto"
                          style={{ fontSize: "25px", color: "#01a78a",cursor:"pointer" }}
                        >
                          <i
                            className="fa-solid fa-arrow-left-long"
                            onClick={backSetter}
                          ></i>
                        </div>
                        <h6 className="text-end mb-3">
                          Select service and fill service charges
                        </h6>
                      </div> */}
                        <div
                          className="me-auto"
                          style={{
                            fontSize: "25px",
                            color: "#01a78a",
                            cursor: "pointer",
                          }}
                        >
                          <i
                            style={{ fontSize: "30px" }}
                            className="fa-solid fa-arrow-left-long"
                            onClick={backSetter}
                          ></i>
                        </div>
                        <div className="row">
                          {arr?.map((name, i) => (
                            <div
                              className="col-sm-6 my-md-4 px-lg-5 px-md-2"
                              key={i}
                            >
                              <div
                                className="py-3 px-1 shadow-box"
                                style={{
                                  position: "relative",
                                  overflow: "hidden",
                                }}
                              >
                                <div
                                  className={`right_bottom_icon `}
                                  id={`greenIcon${i}`}
                                >
                                  <i className="fa-regular fa-plus plus_icon"></i>
                                </div>
                                <div className="row  category-box">
                                  <div className="col-md-3 col-12 h-100 text-center  px-2">
                                    <div className="p-md-1 p-lg-3 icon-box">
                                      <img src={icons[i]} />
                                    </div>
                                  </div>
                                  <div className="col-md-9 col-12 d-sm-flex align-items-center px-3 p-md-0">
                                    <div>
                                      <h6 className="m-0 text-md-start text-center">
                                        {name}
                                      </h6>
                                      <div className="row">
                                        <div className="col-1 mt-2 d-flex align-tems-center">
                                          <Field
                                            type="checkbox"
                                            id={`${i}checkbox`}
                                            name={name.split(" ").join("")}
                                            className="large-checkbox"
                                            style={{ cursor: "pointer" }}
                                          />
                                        </div>
                                        {/* <div className="col-10">
                                     <input
                                 type="text"
                                 name={name.split(" ").join("")}
                                 id={`${i}rate`}
                                 className="w-100 rate-input"
                                 placeholder="Enter $ per Sq Metre Price"
                                 onChange={(e) => {
                                   setFieldValue(
                                     e.target.name,
                                     parseInt(e.target.value)
                                   )
                                   checkNAN(e.target)
                                 }}
                                 disabled
                               />
                                     </div> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="text-danger my-2"
                                id={`error${i}`}
                              ></div>
                            </div>
                          ))}
                          <div className="col-md-6 col-12 my-md-4 my-3 d-flex align-items-center justify-content-center">
                            <button
                              type="submit"
                              className="create-account-btn"
                              // onClick={pageSetter}
                            >
                              Submit
                            </button>
                            {/* <button type="button" className="logInbtn" style={{marginTop:"0"}}>
                            <span to="/login" style={style} >
                              Skip
                            </span>
                          </button> */}
                          </div>
                        </div>
                      </>
                    </>
                  )}

                  {/* commented code for 3rd page for Client's categories */}
                  {/* {page === 3 && (
                    <>
                      <h1>Your Interest</h1>
                      <h3>I have designs to sell</h3>
                      <br />
                      <h5
                        style={{ fontSize: "18px", fontWeight: "400" }}
                        className="text-start mb-3"
                      >
                        Select service and fill service charges
                      </h5>
                      <div className="text-end my-2">
                        <button
                          type="button"
                          className="btn theme-green btn-sm "
                          onClick={() => setField2D([...field2D, 1])}
                        >
                          Add 2D Design
                        </button>
                        <button
                          type="button"
                          className="btn theme-green btn-sm ms-2"
                          onClick={() => setField3D([...field3D, 1])}
                        >
                          Add 3D Design
                        </button>
                      </div>
                      {field2D?.map((f2, i) => (
                        <div key={i}>
                          <div
                            className="row p-2 mb-2"
                            style={{
                              border: "1px solid black",
                              borderRadius: "10px",
                            }}
                          >
                            <div className="col-md-4 text-md-start text-center d-flex align-items-center justify-content-md-start justify-content-center mb-1 mb-md-0 ">
                              Upload 2D design
                            </div>
                            <div className=" col-md-5 my-2 my-md-0 text-center ">
                              <input
                                type="file"
                                id={`${i}file2D`}
                                name={`file2D${i}`}
                                onChange={(e) =>
                                  setFieldValue(
                                    e.target.name,
                                    e.target.files[0]
                                  )
                                }
                                onInput={(e) => toggleDisabled2D(e.target)}
                                className="w-100"
                              />
                            </div>
                            <div className="col col-md-3">
                              <div className="row">
                                <div className="col-5 d-flex align-items-center">
                                  <input
                                    type="text"
                                    name={`filePrice2D${i}`}
                                    id={`${i}rate2D`}
                                    className="w-100 rate-input"
                                    onChange={(e) =>
                                      setFieldValue(
                                        e.target.name,
                                        parseInt(e.target.value)
                                      )
                                    }
                                    disabled
                                  />
                                </div>
                                <div className="col-7 d-flex align-items-center">
                                  $/design
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {field3D?.map((f3, i) => (
                        <div key={i}>
                          <div
                            className="row p-2 mb-2"
                            style={{
                              border: "1px solid black",
                              borderRadius: "10px",
                            }}
                          >
                            <div className="col-md-4 text-md-start text-center d-flex align-items-center justify-content-md-start justify-content-center mb-1 mb-md-0 ">
                              Upload 3D design
                            </div>
                            <div className=" col-md-5 my-2 my-md-0 text-center ">
                              <input
                                type="file"
                                id={`${i}file3D`}
                                name={`file3D${i}`}
                                onChange={(e) =>
                                  setFieldValue(
                                    e.target.name,
                                    e.target.files[0]
                                  )
                                }
                                onInput={(e) => toggleDisabled3D(e.target)}
                                className="w-100"
                              />
                            </div>
                            <div className="col col-md-3">
                              <div className="row">
                                <div className="col-5 d-flex align-items-center">
                                  <input
                                    type="text"
                                    name={`filePrice2D${i}`}
                                    id={`${i}rate3D`}
                                    className="w-100 rate-input"
                                    onChange={(e) =>
                                      setFieldValue(
                                        e.target.name,
                                        parseInt(e.target.value)
                                      )
                                    }
                                    disabled
                                  />
                                </div>
                                <div className="col-7 d-flex align-items-center">
                                  $/design
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )} */}
                  {/* <div className="d-md-flex align-items-center justify-content-center my-md-5 my-2">
                    {page !== 3 && <></>}
                    {page === 3 && (
                      <>
                        <div
                          className="me-auto"
                          style={{ fontSize: "25px", color: "#01a78a" }}
                        >
                          <i
                            className="fa-solid fa-arrow-left-long"
                            onClick={backSetter}
                          ></i>
                        </div>
                        <button
                          type="submit"
                          className="create-account-btn"
                          onClick={pageSetter}
                        >
                          Submit
                          <i className="fa-solid  fa-arrow-right-long ms-3"></i>
                        </button>
                      </>
                    )}
                  </div> */}
                </Form>
              )}
            </Formik>
          </div>
        </main>
      </div>
    </>
  );
};

export default ClientCategory;
