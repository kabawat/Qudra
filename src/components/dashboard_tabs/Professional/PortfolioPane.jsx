import React, { useContext, useState, useEffect, useReducer } from "react";
import $ from "jquery";
import { BsArrowRight, BsPlusLg, BsImage } from "react-icons/bs";
import { IoVideocamOutline } from "react-icons/io5";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { MultiSelect } from "react-multi-select-component";
import { BsCurrencyDollar } from "react-icons/bs";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { BiEuro } from "react-icons/bi";
import LoadingModal from "../../Modals/LoadingModal";
import Global from "../../../context/Global";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
const PortfolioPane = () => {
  const [canUploadVideo, setCanUploadVideo] = useState("False");
  const contextData = useContext(Global);
  const [displaycls, setdisplaycls] = useState("none");
  const [loader, setLoader] = useState(false);
  const [imgPreview, setimgPreview] = useState();
  const [showUploadDesign, setUploadDesign] = useState({
    home: true,
    architecture: false,
    visualiztion: false,
    uploadCatagory: false,
  });
  const initialState = {
    preview_data_modal: false,
    upload_designs_modal: false,
    sub_catagory_data: null,
    preview_catagory_data: [],
    preview_catagory_designs: [],
    architecture_design_upload_modal: false,
    visualization_design_upload_modal: false,
    selected_catagories: null,
    delete_project_modal: false,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "PREVIEW_DATA_MODAL":
        return { ...state, preview_data_modal: action.value };
      case "UPLOAD_DESIGNS_MODAL":
        return { ...state, upload_designs_modal: action.value };
      case "SUB_CATAGORY_DATA":
        return { ...state, sub_catagory_data: action.value };
      case "SUB_CATAGORY_DESIGNS":
        return { ...state, preview_catagory_designs: action.value };
      case "PREVIEW_CATAGORY_DATA":
        return { ...state, preview_catagory_data: action.value };
      case "ARCHITECTURE_DESIGN_UPLOAD_MODAL":
        return { ...state, architecture_design_upload_modal: action.value };
      case "VISUALIZATION_DESIGN_UPLOAD_MODAL":
        return { ...state, visualization_design_upload_modal: action.value };
      case "SELECTED_CATAGORIES":
        return { ...state, selected_catagories: action.value };
      case "DELETE_PROJECT":
        return { ...state, delete_project_modal: action.value };
    }
  };
  const [PortfolioData, dispatch] = useReducer(reducer, initialState);
  const [getevent, setgetevent] = useState("");
  const fileclear = (e) => {
    e.target.value = null;
  };
  useEffect(() => {
    axios
      .post(
        "http://13.52.16.160:8082/professional/professional_sub_cat",
        contextData?.userData
      )
      .then((res) => {
        if (res?.data?.status === "Success") {
          dispatch({ type: "SELECTED_CATAGORIES", value: res?.data?.response });
        } else {
          dispatch({
            type: "SELECTED_CATAGORIES",
            value: { 1: [], 2: [], 3: [] },
          });
        }
      });
  }, [
    PortfolioData?.architecture_design_upload_modal,
    PortfolioData?.visualization_design_upload_modal,
  ]);

  const [catagoriesDropdown, setCatagoriesDropdown] = useState([]);

  const deleteProject = () => {
    axios
      .post("http://13.52.16.160:8082/professional/delete_designs", {
        user_id: contextData?.userData?.user_id,
        user_token: contextData?.userData?.user_token,
        role: contextData?.userData?.role,
        category_id: parseInt(PortfolioData?.sub_catagory_data?.CataId),
        sub_category_id: parseInt(PortfolioData?.sub_catagory_data?.SubCataId),
        index_no: PortfolioData?.delete_project_modal?.index,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          fetchUserSubCata();
        }
        dispatch({ type: "DELETE_PROJECT", value: false });
      });
  };

  const fetchUserSubCata = () => {
    axios
      .post("http://13.52.16.160:8082/professional/sub_cat_data", {
        user_id: contextData?.userData?.user_id,
        user_token: contextData?.userData?.user_token,
        role: contextData?.userData?.role,
        category_id: parseInt(PortfolioData?.sub_catagory_data?.CataId),
        sub_category_id: PortfolioData?.sub_catagory_data?.SubCataId,
      })
      .then((res) => {
        dispatch({ type: "SUB_CATAGORY_DESIGNS", value: res?.data });
      });
  };

  useEffect(() => {
    if (!contextData?.static_architecture_design?.data?.length) {
      axios
        .get("http://13.52.16.160:8082/quadra/sub_categories?category_id=1")
        .then((res) => {
          contextData?.dispatch({
            type: "STATIC_ARCHITECTURE_DESIGN",
            value: res?.data,
          });
        });
    }

    if (!contextData?.static_visualization_design?.data?.length) {
      axios
        .get("http://13.52.16.160:8082/quadra/sub_categories?category_id=2")
        .then((res) => {
          contextData?.dispatch({
            type: "STATIC_VISUALIZATION_DESIGN",
            value: res?.data,
          });
        });
    }
  }, []);
  console.log(contextData);
  useEffect(() => {
    if (contextData?.userData) {
      PortfolioData?.sub_catagory_data && fetchUserSubCata();
    }
  }, [PortfolioData?.sub_catagory_data, PortfolioData?.upload_designs_modal]);
  const languagesArchitecture = [
    contextData?.static_architecture_design?.data?.length &&
    contextData?.static_architecture_design?.data?.filter((ress) => {
      return ress !== "" ||
        null ||
        (PortfolioData?.selected_catagories &&
          PortfolioData?.selected_catagories[1].includes(
            ress?.sub_category_id
          ))
        ? {
          label: ress?.sub_category,
          value: ress?.sub_category_id,
        }
        : "";
    }),
  ];
  const newCatagoriesArchitecture =
    languagesArchitecture[0] &&
    languagesArchitecture[0].map((res) => {
      return (
        PortfolioData?.selected_catagories &&
        !PortfolioData?.selected_catagories[1].includes(
          res?.sub_category_id
        ) && {
          label: res?.sub_category,
          value: res?.sub_category_id,
        }
      );
    });
  const newArchitecureOptionsArray =
    newCatagoriesArchitecture &&
    newCatagoriesArchitecture.filter((res) => {
      return res !== false;
    });

  const languagesVisualization = [
    contextData?.static_visualization_design?.data?.length &&
    contextData?.static_visualization_design?.data?.filter((ress) => {
      return ress !== "" ||
        null ||
        (PortfolioData?.selected_catagories &&
          PortfolioData?.selected_catagories[2].includes(
            ress?.sub_category_id
          ))
        ? {
          label: ress?.sub_category,
          value: ress?.sub_category_id,
        }
        : "";
    }),
  ];
  const newCatagoriesVisualization =
    languagesVisualization[0] &&
    languagesVisualization[0].map((res) => {
      return (
        PortfolioData?.selected_catagories &&
        !PortfolioData?.selected_catagories[2].includes(
          res?.sub_category_id
        ) && {
          label: res?.sub_category,
          value: res?.sub_category_id,
        }
      );
    });
  const blankfield = () => {
    setimgPreview("");
    setdisplaycls("none");
  };
  const newVisualizationOptionsArray =
    newCatagoriesVisualization &&
    newCatagoriesVisualization.filter((res) => {
      return res !== false;
    });

  return (
    <>
      <div
        className="container-fluid px-lg-5 px-md-4 px-3"
        id="Browse-projects"
      >
        <br />
        {!showUploadDesign?.uploadCatagory && (
          <>
            <h3 className="pt-xxl-5 pt-4">Choose Catagory</h3>
            <h4 className="pb-xxl-5 pb-4">
              Choose the catagories given below whether you want to processed
              with Architecture Designs or 3D Visualization.
            </h4>
          </>
        )}
        {showUploadDesign?.home && (
          <div className="row CardCatagoryMain">
            <div
              className="col-xxl col-lg-4 my-3 col-md-6"
              onClick={() =>
                setUploadDesign({
                  home: false,
                  architecture: true,
                  visualiztion: false,
                })
              }
            >
              <div className="dashboard-theme-color d-flex align-items-center flex-column text-white browse-project-card justify-content-center residental-card">
                <img
                  src="./static/images/Residental-Architechture.png"
                  alt=""
                />
                <h6 className="pt-3">Architecture Designs</h6>
                <div className="d-flex align-items-center ">
                  {/* <img src="./static/images/FolderImage.png" alt="" /> */}
                  <span className="ps-2">{/* <b> 100+</b> Files */}</span>
                </div>
              </div>
            </div>
            <div
              className="col-xxl col-lg-4 my-3 col-md-6"
              onClick={() =>
                setUploadDesign({
                  home: false,
                  architecture: false,
                  visualiztion: true,
                })
              }
            >
              <div className="dashboard-theme-color d-flex align-items-center flex-column text-white browse-project-card justify-content-center">
                <img src="./static/images/InteriorDesigning.png" alt="" />
                <h6 className="pt-3">3D Visualisation Designs</h6>
                <div className="d-flex align-items-center ">
                  {/* <img src="./static/images/FolderImage.png" alt="" /> */}
                  <span className="ps-2">{/* <b> 100+</b> Files */}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {showUploadDesign?.architecture && (
          <div className=" ArchitectureCardCatagoryMainInner row">
            {contextData?.static_architecture_design?.data?.length &&
              contextData?.static_architecture_design?.data?.map((res, key) => {
                return PortfolioData?.selected_catagories &&
                  PortfolioData?.selected_catagories[1].includes(
                    res?.sub_category_id
                  ) ? (
                  <div className="col-xxl-3 col-xl-4  my-3 col-md-6" key={key}>
                    <div
                      className="dashboard-theme-color d-flex align-items-center flex-column text-white browse-project-card justify-content-center residental-card"
                      onClick={() => {
                        dispatch({
                          type: "SUB_CATAGORY_DATA",
                          value: {
                            CataName: res?.sub_category,
                            CataId: res?.category_id,
                            SubCataId: res?.sub_category_id,
                          },
                        });
                        setUploadDesign({
                          home: false,
                          architecture: false,
                          visualiztion: false,
                          uploadCatagory: true,
                        });
                      }}
                    >
                      <img
                        src={res?.unactive_icon}
                        alt=""
                        style={{ filter: "brightness(4.5)" }}
                      />
                      <h6 className="pt-3">{res?.sub_category}</h6>
                      <div className="d-flex align-items-center ">
                        {/* <img src="./static/images/FolderImage.png" alt="" /> */}
                        <span className="ps-2">{/* <b> 100+</b> Files */}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                );
              })}
            <div
              className="col-xxl-3 col-xl-4  my-3 col-md-6"
              onClick={() => {
                dispatch({
                  type: "ARCHITECTURE_DESIGN_UPLOAD_MODAL",
                  value: true,
                });
              }}
            >
              <div className=" d-flex align-items-center border browse-project-card justify-content-center residental-card">
                <h6 className="m-0 theme-text-color pe-4">Add New Catagory</h6>
                <BsPlusLg className="theme-text-color" />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <button
                  className="dashboard-theme-color mb-5 DesignSelectPortfolioBackButton"
                  onClick={() => {
                    setUploadDesign({
                      home: true,
                      architecture: false,
                      visualiztion: false,
                      uploadCatagory: false,
                    });
                  }}
                >
                  <span>
                    <i className="fa-solid fa-arrow-left-long pe-3"></i>
                  </span>
                  <span className="pe-4">Back</span>
                </button>
              </div>
            </div>
          </div>
        )}
        {showUploadDesign?.visualiztion && (
          <div className=" VisualisationCardCatagoryMainInner row">
            {contextData?.static_visualization_design?.data?.length &&
              contextData?.static_visualization_design?.data?.map(
                (res, key) => {
                  return PortfolioData?.selected_catagories &&
                    PortfolioData?.selected_catagories[2]?.includes(
                      res?.sub_category_id
                    ) ? (
                    <div
                      className="col-xxl-3 col-xl-4  my-3 col-md-6"
                      key={key}
                    >
                      <div
                        className="dashboard-theme-color d-flex align-items-center flex-column text-white browse-project-card justify-content-center residental-card"
                        onClick={(e) => {
                          setCanUploadVideo(res?.video);
                          dispatch({
                            type: "SUB_CATAGORY_DATA",
                            value: {
                              CataName: res?.sub_category,
                              CataId: res?.category_id,
                              SubCataId: res?.sub_category_id,
                              Video: res?.video,
                            },
                          });

                          setUploadDesign({
                            home: false,
                            architecture: false,
                            visualiztion: false,
                            uploadCatagory: true,
                          });
                        }}
                      >
                        <img
                          src={res?.unactive_icon}
                          alt=""
                          style={{ filter: "brightness(4.5)" }}
                        />
                        <h6 className="pt-3">{res?.sub_category}</h6>
                        <div className="d-flex align-items-center ">
                          {/* <img src="./static/images/FolderImage.png" alt="" /> */}
                          <span className="ps-2">
                            {/* <b> 100+</b> Files */}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  );
                }
              )}
            <div
              className="col-xxl-3 col-xl-4  my-3 col-md-6"
              onClick={() => {
                dispatch({
                  type: "VISUALIZATION_DESIGN_UPLOAD_MODAL",
                  value: true,
                });
              }}
            >
              <div className=" d-flex align-items-center border browse-project-card justify-content-center residental-card">
                <h6 className="m-0 theme-text-color pe-4">Add New Catagory</h6>
                <BsPlusLg className="theme-text-color" />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <button
                  className="dashboard-theme-color mb-5 DesignSelectPortfolioBackButton"
                  onClick={() => {
                    setUploadDesign({
                      home: true,
                      architecture: false,
                      visualiztion: false,
                      uploadCatagory: false,
                    });
                  }}
                >
                  <span>
                    <i className="fa-solid fa-arrow-left-long pe-3"></i>
                  </span>
                  <span className="pe-4">Back</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showUploadDesign?.uploadCatagory && (
        <div className="Residential-Architecture-page">
          <div
            id="Browse-projects"
            className="container-fluid px-lg-5 px-md-4 px-3"
          >
            <br />
            <h3 className="pt-xxl-5 pt-4">
              {PortfolioData?.sub_catagory_data?.CataName}
            </h3>
            <div className="row py-lg-5 py-md-4 py-3">
              {PortfolioData?.preview_catagory_designs?.image &&
                PortfolioData?.preview_catagory_designs?.image?.map(
                  (res, index) => (
                    <div className="col-xl-3 col-md-6   my-3">
                      <div className="card border-0 flex-row bg-dark text-white">
                        <img
                          src={`${PortfolioData?.preview_catagory_designs?.image_url}${res}`}
                          className="card-img"
                          alt="..."
                        />
                        <h5 className="card-title">
                          $
                          {
                            PortfolioData?.preview_catagory_designs?.price[
                            index
                            ]
                          }
                          / sq.mtr
                        </h5>
                        <div className="card-img-overlay">
                          <div className="row g-2">
                            <div className="col-xxl-6 col-lg-12 col-6">
                              <Button
                                style={{
                                  width: "100%",
                                  fontSize: "14px",
                                  backgroundColor: "#00A78B",
                                }}
                                onClick={() => {
                                  dispatch({
                                    type: "PREVIEW_CATAGORY_DATA",
                                    value: {
                                      image: `${PortfolioData?.preview_catagory_designs?.image_url}${res}`,
                                      type: "image",
                                    },
                                  });
                                  dispatch({
                                    type: "PREVIEW_DATA_MODAL",
                                    value: true,
                                  });
                                }}
                              >
                                Preview Image
                              </Button>
                            </div>
                            {PortfolioData?.sub_catagory_data &&
                              PortfolioData?.sub_catagory_data?.CataId == 2 ? (
                              PortfolioData?.sub_catagory_data?.Video ===
                                "True" ? (
                                <div className="col-xxl-6 col-lg-12 col-6">
                                  <Button
                                    style={{
                                      width: "100%",
                                      fontSize: "14px",
                                      backgroundColor: "#00A78B",
                                    }}
                                    className="mt-3"
                                    onClick={() => {
                                      dispatch({
                                        type: "PREVIEW_CATAGORY_DATA",
                                        value: {
                                          video: `${PortfolioData?.preview_catagory_designs?.video_url}${PortfolioData?.preview_catagory_designs?.video[index]}`,
                                          type: "video",
                                        },
                                      });
                                      dispatch({
                                        type: "PREVIEW_DATA_MODAL",
                                        value: true,
                                      });
                                    }}
                                  >
                                    Preview Video
                                  </Button>
                                </div>
                              ) : (
                                ""
                              )
                            ) : (
                              ""
                            )}
                            <div className="col-xxl-6 col-lg-12 col-6">
                              <Button
                                style={{
                                  width: "100%",
                                  fontSize: "14px",
                                  backgroundColor: "#00A78B",
                                }}
                                onClick={() => {
                                  dispatch({
                                    type: "DELETE_PROJECT",
                                    value: { show: true, index: index },
                                  });
                                }}
                              >
                                Delete Project
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}

              <div
                className="col-xl-3 col-md-6   my-3"
                onClick={() =>
                  dispatch({ type: "UPLOAD_DESIGNS_MODAL", value: true })
                }
              >
                <div
                  className="card  flex-column bg-white  text-white d-flex align-items-center justify-content-center"
                  style={{ border: "1px groove #bcbcbc" }}
                >
                  <BsPlusLg style={{ color: "#00a78b", fontSize: "22px" }} />
                  <p
                    style={{
                      color: "#00a78b",
                      fontSize: "17px",
                      margin: "17px 0 0 0",
                    }}
                  >
                    {canUploadVideo === "True"
                      ? "Add Your Images & Video"
                      : "Add Your Image"}
                  </p>
                </div>
              </div>
              {/* upload design modal */}

              <Modal
                show={PortfolioData?.upload_designs_modal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="modalProfessionalDashboard"
              >
                <Modal.Header
                  closeButton
                  style={{ margin: "0 0 0 auto" }}
                  onClick={() => {
                    dispatch({ type: "UPLOAD_DESIGNS_MODAL", value: false });
                    blankfield();
                  }}
                  className="border-0"
                ></Modal.Header>
                <Modal.Body>
                  <h4>
                    {PortfolioData?.sub_catagory_data &&
                      PortfolioData?.sub_catagory_data.CataId == 1
                      ? "Upload Your Price And Image "
                      : canUploadVideo === "True"
                        ? "Upload Your Price, Image And Video"
                        : "Upload Your Price And Image"}
                  </h4>

                  {PortfolioData?.sub_catagory_data &&
                    PortfolioData?.sub_catagory_data.CataId == 1 ? (
                    <Formik
                      initialValues={{
                        price: "",
                        sub_cata_id: "",
                      }}
                      onSubmit={(values, { setSubmitting }) => {
                        const catagoryUpload = new FormData();
                        catagoryUpload.append(
                          "user_id",
                          contextData?.userData?.user_id
                        );
                        catagoryUpload.append(
                          "user_token",
                          contextData?.userData?.user_token
                        );
                        catagoryUpload.append(
                          "role",
                          contextData?.userData?.role
                        );
                        catagoryUpload.append(
                          "category_id",
                          PortfolioData?.sub_catagory_data?.CataId
                        );
                        catagoryUpload.append("image", values?.image);
                        catagoryUpload.append("price", values?.price);
                        catagoryUpload.append(
                          "sub_category_id",
                          PortfolioData?.sub_catagory_data?.SubCataId
                        );
                        setLoader(true);
                        axios
                          .post(
                            "http://13.52.16.160:8082/professional/arc_design",
                            catagoryUpload
                          )
                          .then((res) => {
                            res.data.status === "Success"
                              ? dispatch({
                                type: "UPLOAD_DESIGNS_MODAL",
                                value: false,
                              })
                              : dispatch({
                                type: "UPLOAD_DESIGNS_MODAL",
                                value: true,
                              });
                            setLoader(false);
                            setimgPreview();
                          });
                      }}
                    >
                      {({ isSubmitting, setFieldValue }) => (
                        <Form>
                          <div className="row">
                            <div className="col">
                              <div className="selectprice">
                                <BsCurrencyDollar />
                                <Field
                                  type="text"
                                  placeholder="Enter Your Price Per Square Meter"
                                  className="priceInput"
                                  name="price"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row m-0 pb-5 mb-3">
                            <div className="d-flex imageDropBoxDashboardProfessional align-items-center flex-row">
                              <button>
                                <BsPlusLg
                                  style={{
                                    color: "#fff",
                                    fontSize: "17px",
                                  }}
                                />
                                <span className="ps-2">Upload Image</span>
                              </button>
                              <p className="ps-4">
                                Drag and Drop any image that might be helpful in
                                explaining your breif here
                              </p>
                              <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={(e) => {
                                  console.log(e.target.files[0]);
                                  setFieldValue("image", e?.target?.files[0]);
                                  setimgPreview(
                                    URL.createObjectURL(e.target.files[0])
                                  );
                                  setgetevent(e);
                                  setdisplaycls("block");
                                  console.log("hello");
                                }}
                              />
                            </div>
                            {
                              (imgPreview === null) ? <div style={{ color: 'red' }}>Image required</div> : ''
                            }

                            <div
                              className={displaycls}
                              style={{
                                display: "flex",
                                width: "100px",
                                // height:"200px"
                              }}
                            >
                              <img
                                src={imgPreview}
                                style={{
                                  width: "200px",
                                }}
                                alt=""
                              />
                              <span
                                style={{
                                  margin: "auto",
                                  paddingLeft: "20%",
                                }}
                                onClick={() => {
                                  setFieldValue("image", "");
                                  setimgPreview(null);
                                  setdisplaycls("none");
                                  fileclear(getevent);
                                }}
                              >
                                <AiFillDelete size={30} />
                              </span>
                            </div>
                            <button
                              type="submit"
                              className="ModalCategorySubmit"
                            >
                              Submit
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  ) : (
                    <Formik
                      initialValues={{
                        price: "",
                        sub_cata_id: "",
                      }}
                      onSubmit={(values, { setSubmitting }) => {
                        console.log(values);

                        const catagoryUpload = new FormData();
                        catagoryUpload.append(
                          "user_id",
                          contextData?.userData.user_id
                        );
                        catagoryUpload.append(
                          "user_token",
                          contextData?.userData.user_token
                        );
                        catagoryUpload.append(
                          "role",
                          contextData?.userData.role
                        );
                        catagoryUpload.append(
                          "category_id",
                          PortfolioData?.sub_catagory_data?.CataId
                        );
                        catagoryUpload.append("image", values?.image);
                        catagoryUpload.append(
                          "video",
                          canUploadVideo === "True" ? values?.video : ""
                        );
                        catagoryUpload.append("price", values?.price);
                        catagoryUpload.append(
                          "sub_category_id",
                          PortfolioData?.sub_catagory_data?.SubCataId
                        );
                        setLoader(true);
                        axios
                          .post(
                            "http://13.52.16.160:8082/professional/vis_design",
                            catagoryUpload
                          )
                          .then((res) => {
                            if (res.data.status === "Success") {
                              dispatch({
                                type: "UPLOAD_DESIGNS_MODAL",
                                value: false,
                              });
                              setimgPreview("");
                            } else {
                              dispatch({
                                type: "UPLOAD_DESIGNS_MODAL",
                                value: true,
                              });
                            }

                            setLoader(false);
                          });
                      }}
                    >
                      {({ isSubmitting, setFieldValue }) => (
                        <Form>
                          <div className="row">
                            <div className="col">
                              <div className="selectprice">
                                <BiEuro />
                                <Field
                                  type="text"
                                  placeholder="Enter Your Price Per Square Meter"
                                  className="priceInput"
                                  name="price"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className={`row ${canUploadVideo ? "mt-4" : "mt-2"
                              }`}
                          >
                            {canUploadVideo === "True" ? (
                              <>
                                <div className="col ">
                                  <div
                                    className="selectCategoryMain  subCataSelectInnerMainDiv d-flex align-items-center h-100"
                                    style={{
                                      border: "1px solid rgb(118, 118, 118)",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    <BsImage />
                                    <input
                                      type="file"
                                      name="image"
                                      onInput={(e) => {
                                        setFieldValue(
                                          "image",
                                          e?.target?.files[0]
                                        );
                                      }}
                                    />
                                    <p>Upload a Featured Image</p>
                                  </div>
                                </div>
                                <div className="col ">
                                  <div
                                    className="selectprice subCataSelectInnerMainDiv "
                                    style={{ paddingLeft: "50px" }}
                                  >
                                    <IoVideocamOutline />
                                    <input
                                      type="file"
                                      name="video"
                                      onInput={(e) => {
                                        setFieldValue(
                                          "video",
                                          e?.target?.files[0]
                                        );
                                      }}
                                    />
                                    <p>Upload a Video</p>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="col ">
                                  <div className="d-flex imageDropBoxDashboardProfessional align-items-center flex-row">
                                    <button>
                                      <BsPlusLg
                                        style={{
                                          color: "#fff",
                                          fontSize: "17px",
                                        }}
                                      />
                                      <span className="ps-2">Upload Image</span>
                                    </button>
                                    <p className="ps-4">
                                      Drag and Drop any image that might be
                                      helpful in explaining your breif here
                                    </p>
                                    <input
                                      type="file"
                                      name="image"
                                      onChange={(e) => {
                                        console.log(e.target.files[0]);
                                        setFieldValue(
                                          "image",
                                          e?.target?.files[0]
                                        );
                                        setimgPreview(
                                          URL.createObjectURL(e.target.files[0])
                                        );
                                      }}
                                    />
                                  </div>
                                  <img src={imgPreview} alt="" />
                                </div>

                                <div className="col d-none ">
                                  <div
                                    className="selectprice subCataSelectInnerMainDiv "
                                    style={{ paddingLeft: "50px" }}
                                  >
                                    <IoVideocamOutline />
                                    <input
                                      type="file"
                                      name="video"
                                      onInput={(e) => {
                                        setFieldValue("video", "");
                                      }}
                                    />
                                    <p>Upload a Video</p>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>

                          <button
                            type="submit"
                            className="ModalCategorySubmit d-block mt-5 mb-5"
                          >
                            Submit
                          </button>
                        </Form>
                      )}
                    </Formik>
                  )}
                </Modal.Body>
              </Modal>
              {/* upload design modal */}
            </div>

            {PortfolioData?.sub_catagory_data &&
              PortfolioData?.sub_catagory_data.CataId == 1 ? (
              <button
                className="dashboard-theme-color mb-5"
                onClick={() => {
                  setUploadDesign({
                    home: false,
                    architecture: true,
                    visualiztion: false,
                    uploadCatagory: false,
                  });
                  dispatch({ type: "SUB_CATAGORY_DESIGNS", value: [] });
                }}
              >
                <span>
                  <i className="fa-solid fa-arrow-left-long pe-3"></i>
                </span>
                <span className="pe-4">Back</span>
              </button>
            ) : (
              <button
                className="dashboard-theme-color mb-5"
                onClick={() => {
                  setUploadDesign({
                    home: false,
                    architecture: false,
                    visualiztion: true,
                    uploadCatagory: false,
                  });
                  dispatch({ type: "SUB_CATAGORY_DESIGNS", value: [] });
                }}
              >
                <span>
                  <i className="fa-solid fa-arrow-left-long pe-3"></i>
                </span>
                <span className="pe-4">Back</span>
              </button>
            )}
          </div>
          <LoadingModal loader={loader} />
        </div>
      )}
      <Modal
        fullscreen={true}
        animation={false}
        show={PortfolioData?.preview_data_modal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modalProfessionalDashboard"
      >
        <button
          className="closeModalPreviewData"
          onClick={() => {
            dispatch({ type: "PREVIEW_DATA_MODAL", value: false });
          }}
        >
          x
        </button>

        {PortfolioData?.preview_catagory_data &&
          PortfolioData?.preview_catagory_data?.type === "image" && (
            <img
              src={PortfolioData?.preview_catagory_data?.image}
              alt=""
              className="img-fluid object-fit-contain"
              style={{ maxHeight: "100%" }}
            />
          )}
        {PortfolioData?.preview_catagory_data &&
          PortfolioData?.preview_catagory_data?.type === "video" &&
          PortfolioData?.preview_catagory_data?.video && (
            <video className="img-fluid h-100 object-fit-contain" controls>
              <source
                src={
                  PortfolioData?.preview_catagory_data?.video &&
                  PortfolioData?.preview_catagory_data?.video
                }
                type="video/mp4"
              />
              <source
                src={
                  PortfolioData?.preview_catagory_data?.video &&
                  PortfolioData?.preview_catagory_data?.video
                }
                type="video/ogg"
              />
              Your browser does not support HTML video.
            </video>
          )}
      </Modal>
      <Modal
        show={PortfolioData?.architecture_design_upload_modal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modalProfessionalDashboard"
      >
        <Modal.Header
          closeButton
          style={{ margin: "0 0 0 auto" }}
          onClick={() =>
            dispatch({ type: "ARCHITECTURE_DESIGN_UPLOAD_MODAL", value: false })
          }
          className="border-0"
        ></Modal.Header>
        <Modal.Body>
          <h4>Select Catagories</h4>
          <Formik
            initialValues={{
              new_sub_cat: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              axios
                .put("http://13.52.16.160:8082/professional/sel_sub_category", {
                  ...contextData?.userData,
                  category_id: "1",
                  new_sub_cat: values?.new_sub_cat,
                })
                .then((res) => {
                  return res?.data?.status === "Success"
                    ? (dispatch({
                      type: "ARCHITECTURE_DESIGN_UPLOAD_MODAL",
                      value: false,
                    }),
                      setCatagoriesDropdown([]))
                    : "";
                });
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className="row">
                  <div className="col">
                    <MultiSelect
                      options={newArchitecureOptionsArray}
                      value={catagoriesDropdown}
                      onChange={(catagoriesDropdown) => {
                        setFieldValue(
                          "new_sub_cat",
                          catagoriesDropdown?.map((val) => val?.value)
                        );
                        setCatagoriesDropdown(catagoriesDropdown);
                      }}
                      labelledBy="Select"
                      name="new_sub_cat"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col d-flex justify-content-center pt-5">
                    <button
                      type="submit"
                      className="ModalCategorySubmit mx-auto"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      <Modal
        show={PortfolioData?.visualization_design_upload_modal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="modalProfessionalDashboard"
      >
        <Modal.Header
          closeButton
          style={{ margin: "0 0 0 auto" }}
          onClick={() =>
            dispatch({
              type: "VISUALIZATION_DESIGN_UPLOAD_MODAL",
              value: false,
            })
          }
          className="border-0"
        ></Modal.Header>
        <Modal.Body>
          <h4>Select Catagories</h4>
          <Formik
            initialValues={{
              new_sub_cat: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              axios
                .put("http://13.52.16.160:8082/professional/sel_sub_category", {
                  ...contextData?.userData,
                  category_id: "2",
                  new_sub_cat: values?.new_sub_cat,
                })
                .then((res) => {
                  return res?.data?.status === "Success"
                    ? (dispatch({
                      type: "VISUALIZATION_DESIGN_UPLOAD_MODAL",
                      value: false,
                    }),
                      setCatagoriesDropdown([]))
                    : "";
                });
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className="row">
                  <div className="col">
                    <MultiSelect
                      options={newVisualizationOptionsArray}
                      value={catagoriesDropdown}
                      onChange={(catagoriesDropdown) => {
                        setFieldValue(
                          "new_sub_cat",
                          catagoriesDropdown?.map((val) => val?.value)
                        );
                        setCatagoriesDropdown(catagoriesDropdown);
                      }}
                      labelledBy="Select"
                      name="new_sub_cat"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col d-flex justify-content-center pt-5">
                    <button
                      type="submit"
                      className="ModalCategorySubmit mx-auto"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      <Modal
        show={PortfolioData?.delete_project_modal?.show}
        centered
        onHide={() => dispatch({ type: "DELETE_PROJECT", value: false })}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fs-20">
            Are You Sure You Want to Delete this Design?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-end">
            <Button
              className="theme-text-color bg-white mx-2"
              style={{ border: "2px solid" }}
              onClick={() => dispatch({ type: "DELETE_PROJECT", value: false })}
            >
              Close
            </Button>
            <Button
              className="theme-bg-color border-0 mx-2"
              onClick={() =>
                deleteProject(PortfolioData?.delete_project_modal?.index)
              }
            >
              Delete Project
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default React.memo(PortfolioPane);