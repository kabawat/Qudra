import React, {
  useEffect,
  useState,
  useContext,
  useReducer,
  useRef,
} from "react";
import { Header2 } from "../../components/Header";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useLocation, Link, redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import $ from "jquery";
import * as Yup from "yup";
import Global from "../../context/Global";
import { BsArrowRight } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import { BsPlusLg } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { BsCurrencyDollar } from "react-icons/bs";
import axios from "axios";
import { MultiSelect } from "react-multi-select-component";
import { GiCancel } from "react-icons/gi";
import Loader from "../../components/Loader";
import { grey } from "@mui/material/colors";
import { useCookies } from "react-cookie";
const ProfessionalBuyAndSale = () => {
  const contextData = useContext(Global);
  const ref = useRef();

  const [catErr, setCatErr] = useState(false);
  const [clsstyle, setclsstyle] = useState("none");
  const [loader, setLoader] = useState(false);
  const [catagoriesDropdown, setCatagoriesDropdown] = useState([]);
  const [ziplbl, setziplbl] = useState("");
  const [imgPreview, setimgPreview] = useState("");
  const [vidlbl, setvidlbl] = useState("");
  const location = useLocation();
  const [vidstyle, setvidstyle] = useState("none");
  const [zipstyle, setzipstyle] = useState("none");
  const isRedirect = location.state;
  const initialState = {
    preview_data_modal: false,
    upload_designs_modal: false,
    sub_catagory_data: null,
    preview_catagory_data: [],
    preview_catagory_designs: [],
    selected_catagories: null,
    buy_sale_design_modal: false,
  };

  const [imgclear, setimgclear] = useState("");
  const [vidclear, setvidclear] = useState("");
  const [zipclear, setzipclear] = useState("");
  const [imgdisplay, setimgdisplay] = useState("none");
  const [viddisplay, setviddisplay] = useState("none");
  const [zipdisplay, setzipdisplay] = useState("none");

  const imgnull = (e) => {
    e.target.value = null;
  };
  const vidnull = (e) => {
    e.target.value = null;
  };
  const zipnull = (e) => {
    e.target.value = null;
  };

  const [cookies, setCookies] = useCookies();
  const [isRender, setIsRender] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies?.user_data) {
      if (cookies?.user_data?.role === "professional") {
        if (
          location?.state ||
          cookies?.user_data?.category_selected === false
        ) {
          setIsRender(true);
        } else {
          navigate("/client-architechture");
        }
      } else {
        navigate("/client-buy-sell");
      }
    } else {
      navigate("/select-sign-in");
    }
  }, []);
  useEffect(() => {
    if (!contextData?.static_buy_sale_design?.data?.length) {
      axios
        .get(`http://13.52.16.160:8082/quadra/sub_categories?category_id=3`)
        .then((res) => {
          contextData?.dispatch({
            type: "STATIC_BUY_SALE_DESIGN",
            value: res?.data,
          });
        });
    }
  }, []);

  const blankfields = () => {
    dispatch({ type: "UPLOAD_DESIGNS_MODAL", value: false });
    setclsstyle("none");
    setvidlbl("");
    setimgPreview("");
    setziplbl("");
    setvidstyle("none");
    setzipstyle("none");
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
      case "SELECTED_CATAGORIES":
        return { ...state, selected_catagories: action.value };
      case "BUYSALE_DESIGN_UPLOAD_MODAL":
        return { ...state, buy_sale_design_modal: action.value };
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const toggleDisabled = (target) => {
    let IconTarget = document.getElementById(`${parseInt(target.id)}icon`);
    // setTargetId([parseInt(target.id)])
    if (target.checked) {
      IconTarget.src =
        contextData?.static_buy_sale_design?.data[
          parseInt(target.id)
        ].active_icon;
    } else {
      IconTarget.src =
        contextData?.static_buy_sale_design?.data[
          parseInt(target.id)
        ].unactive_icon;
    }
  };
  const [selectedCatagories, setSelectedCatagories] = useState(
    JSON.parse(localStorage.getItem("SelectedCatagories"))
  );

  const residentialCard = () => {
    $("main.dashboard-main").css("display", "none");
    $(".Residential-Architecture-page").css("display", "block");
  };

  const cardStyle = {
    textAlign: "center",
    height: "230px",
    borderRadius: "10px",
    cursor: "pointer",
  };

  useEffect(() => {
    axios
      .post("http://13.52.16.160:8082/professional/professional_sub_cat", {
        ...cookies?.user_data,
      })
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
  }, [state?.buy_sale_design_modal]);

  const languagesArchitecture = [
    contextData?.static_buy_sale_design?.data?.length &&
      contextData?.static_buy_sale_design?.data?.filter((ress) =>
        ress !== "" ||
        null ||
        (state?.selected_catagories &&
          state?.selected_catagories[3].includes(ress?.sub_category_id))
          ? {
              label: ress?.sub_category,
              value: ress?.sub_category_id,
            }
          : ""
      ),
  ];
  const newCatagoriesArchitecture =
    languagesArchitecture[0] &&
    languagesArchitecture[0].map((res) => {
      return (
        state?.selected_catagories &&
        !state?.selected_catagories[3].includes(res?.sub_category_id) && {
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

  const [modalSubCatagoryID, setModalSubCatagoryID] = useState("");
  const SetUpSchema = Yup.object().shape({
    price: Yup.string().required("Please enter a price"),
  });
  const [showImagesSection, setShowImagesSection] = useState(false);

  if (contextData.subCataImages !== undefined || null) {
  }
  const formSubmit = (valueArray) => {
    if (valueArray.length) {
      axios
        .post("http://13.52.16.160:8082/professional/sel_sub_category", {
          user_id: cookies?.user_data?.user_id,
          user_token: cookies?.user_data?.user_token,
          role: cookies?.user_data?.role,
          category: {
            cat_id: [...selectedCatagories?.cat_id, 3],
          },
          sel_sub_cat: {
            ...selectedCatagories.sel_sub_cat,
            3: valueArray,
          },
        })
        .then((res) => {
          if (res?.data?.status === "Success") {
            setCookies("user_data", {
              ...cookies?.user_data,
              category_selected: true,
            });
            localStorage.removeItem("SelectedCatagories");
            localStorage.clear("SelectedCatagories");
            localStorage.clear();
            navigate("/professionaldashboard");
          }
        });
    } else {
      toast.error("You must select an category!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    state?.sub_catagory_data?.CataId &&
      state?.sub_catagory_data?.SubCataId &&
      axios
        .post("http://13.52.16.160:8082/professional/sub_cat_data", {
          user_id: cookies?.user_data?.user_id,
          user_token: cookies?.user_data?.user_token,
          role: cookies?.user_data?.role,
          category_id: parseInt(state?.sub_catagory_data?.CataId),
          sub_category_id: state?.sub_catagory_data?.SubCataId,
        })
        .then((res) => {
          dispatch({ type: "SUB_CATAGORY_DESIGNS", value: res?.data });
        });
  }, [
    state?.sub_catagory_data,
    state?.upload_designs_modal,
    state?.preview_data_modal,
  ]);

  const backButtonFunc = () => {
    setShowImagesSection(false);
    dispatch({ type: "SUB_CATAGORY_DESIGNS", value: null });
  };

  const handleSkipButton = () => {
    try {
      selectedCatagories &&
        Object.values(selectedCatagories.sel_sub_cat).map((val) => {
          if (!val.length) {
            throw new Error("Please select at least one category");
          }
          axios
            .post("http://13.52.16.160:8082/professional/sel_sub_category", {
              user_id: cookies?.user_data?.user_id,
              user_token: cookies?.user_data?.user_token,
              role: cookies?.user_data?.role,
              category: {
                cat_id: [...selectedCatagories?.cat_id, 3],
              },
              sel_sub_cat: {
                ...selectedCatagories.sel_sub_cat,
                3: [],
              },
            })
            .then((res) => {
              if (res?.data?.status === "Success") {
                setCookies("user_data", {
                  ...cookies?.user_data,
                  category_selected: true,
                });
                navigate("/professionaldashboard");
              }
            });
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEditDesign = (data) => {
    setLoader(true);
    axios
      .post(
        "http://13.52.16.160:8082/professional/update_buy_sell_project",
        data
      )
      .then(() => {
        setLoader(false);
        dispatch({ type: "PREVIEW_DATA_MODAL", value: false });
      });
  };
  if (contextData?.static_buy_sale_design?.data?.length && isRender) {
    return (
      <>
        <div className="create-account">
          <main className="create-account-main">
            <div className="container mb-5">
              <Header2 link={true} />
              <Formik
                initialValues={{}}
                onSubmit={(values, { setSubmitting }) => {
                  var valueArray = [];
                  for (let x in values) {
                    valueArray.push(values[x]);
                  }
                  formSubmit(valueArray);
                }}
              >
                {({ isSubmitting, setFieldValue, values }) => (
                  <Form>
                    <>
                      <h1>Choose Categories</h1>
                      <div className="category-button">
                        <h6 className="text-center">Designs I Want To Sell</h6>
                      </div>

                      <br />
                      {isRedirect && !showImagesSection ? (
                        <Link
                          to={"/professionaldashboard"}
                          className="me-auto"
                          style={{
                            fontSize: "25px",
                            color: "#01a78a",
                            cursor: "pointer",
                          }}
                          state={{ fromHomePage: false }}
                        >
                          <i
                            className="fa-solid fa-arrow-left-long"
                            style={{ fontSize: "30px" }}
                            onClick={() => {
                              setShowImagesSection(false);
                            }}
                          ></i>
                        </Link>
                      ) : (
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
                            onClick={() => {
                              showImagesSection
                                ? backButtonFunc()
                                : navigate("/categoryvisualization");
                              localStorage.removeItem("SelectedCatagories");
                            }}
                          ></i>
                        </div>
                      )}
                      {showImagesSection ? (
                        <div className="row">
                          {state?.preview_catagory_designs?.image &&
                            state?.preview_catagory_designs?.image.map(
                              (res, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="col-lg-4 my-3 col-md-6"
                                  >
                                    <div
                                      style={{
                                        height: "240px",
                                        borderRadius: "30px",
                                      }}
                                      className="card border-0 flex-row bg-dark text-white visibleForEdit"
                                    >
                                      <img
                                        src={`${state?.preview_catagory_designs?.image_url}${res}`}
                                        className="card-img"
                                        alt="..."
                                        style={{ borderRadius: "30px" }}
                                      />
                                      <div
                                        className="card-img-overlay"
                                        style={{
                                          display: "flex",
                                          justifyContent: "flex-end",
                                          flexDirection: "column",
                                          borderRadius: "30px",
                                        }}
                                      >
                                        <h4 className="card-title cardTitleVisible">
                                          $
                                          {
                                            state?.preview_catagory_designs
                                              ?.price[index]
                                          }
                                          / project
                                        </h4>
                                        <div className="row">
                                          <div
                                            className="col-xxl-6 col-md-12 col-6"
                                            style={{ padding: "6px" }}
                                          >
                                            <button
                                              id={index}
                                              ref={ref}
                                              type="button"
                                              className="btn text-white"
                                              style={{
                                                width: "100%",
                                                fontSize: "14px",
                                                backgroundColor:
                                                  "rgb(0, 167, 139)",
                                              }}
                                              onClick={() => {
                                                setclsstyle("block");
                                                setvidstyle("block");
                                                setzipstyle("block");
                                                dispatch({
                                                  type: "PREVIEW_CATAGORY_DATA",
                                                  value: {
                                                    type: "edit",
                                                    index: index,
                                                  },
                                                });
                                                dispatch({
                                                  type: "PREVIEW_DATA_MODAL",
                                                  value: true,
                                                });
                                              }}
                                            >
                                              Edit Design
                                            </button>
                                          </div>
                                          <div
                                            className="col-xxl-6 col-md-12 col-6"
                                            style={{ padding: "6px" }}
                                          >
                                            <button
                                              type="button"
                                              className="btn text-white"
                                              style={{
                                                width: "100%",
                                                fontSize: "14px",
                                                backgroundColor:
                                                  "rgb(0, 167, 139)",
                                              }}
                                              onClick={() => {
                                                dispatch({
                                                  type: "PREVIEW_CATAGORY_DATA",
                                                  value: {
                                                    image: `${state?.preview_catagory_designs?.image_url}${res}`,
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
                                            </button>
                                          </div>
                                          <div
                                            className="col-xxl-6 col-md-12 col-6"
                                            style={{ padding: "6px" }}
                                          >
                                            <button
                                              type="button"
                                              className="btn text-white"
                                              style={{
                                                width: "100%",
                                                fontSize: "14px",
                                                backgroundColor:
                                                  "rgb(0, 167, 139)",
                                              }}
                                              onClick={() => {
                                                dispatch({
                                                  type: "PREVIEW_CATAGORY_DATA",
                                                  value: {
                                                    video: `${state?.preview_catagory_designs?.video_url}${state?.preview_catagory_designs?.video[index]}`,
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
                                            </button>
                                          </div>
                                          {cookies?.user_data.role ===
                                          "client" ? (
                                            <div
                                              className="col-xxl-6 col-md-12 col-6"
                                              style={{ padding: "6px" }}
                                            >
                                              <button
                                                type="button"
                                                className="btn text-white"
                                                style={{
                                                  width: "100%",
                                                  fontSize: "14px",
                                                  backgroundColor:
                                                    "rgb(0, 167, 139)",
                                                }}
                                                onClick={() => {
                                                  dispatch({
                                                    type: "PREVIEW_CATAGORY_DATA",
                                                    value: {
                                                      zip: `${state?.preview_catagory_designs?.project_url}${state?.preview_catagory_designs?.project[index]}`,
                                                      type: "zip",
                                                    },
                                                  });
                                                  dispatch({
                                                    type: "PREVIEW_DATA_MODAL",
                                                    value: true,
                                                  });
                                                }}
                                              >
                                                Buy Zip
                                              </button>
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          <div
                            className="col-lg-4 my-3 col-md-6"
                            onClick={() =>
                              dispatch({
                                type: "UPLOAD_DESIGNS_MODAL",
                                value: true,
                              })
                            }
                          >
                            <div
                              style={cardStyle}
                              className="border   d-flex align-items-center flex-column  browse-project-card justify-content-center residental-card"
                            >
                              <h6 className="pt-3 theme-text-color fs-21">
                                Upload Project
                                <BsPlusLg className="theme-text-color ms-3" />
                              </h6>
                            </div>
                          </div>
                          <div className=" col-12 my-md-4 my-3 d-flex align-items-center justify-content-end">
                            <button
                              type="submit"
                              className="create-account-btn"
                              onClick={() =>
                                isRedirect
                                  ? navigate("/professionaldashboard")
                                  : ""
                              }
                            >
                              Continue{" "}
                              <BsArrowRight style={{ color: "white" }} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="row">
                          {contextData?.static_buy_sale_design?.data?.length &&
                            contextData?.static_buy_sale_design?.data.map(
                              (res, i) => {
                                return (
                                  <>
                                    {!isRedirect ? (
                                      <div
                                        className="col-sm-6 my-md-4 px-lg-5 px-md-2"
                                        key={i}
                                      >
                                        <div
                                          className=" px-1 shadow-box"
                                          style={{
                                            position: "relative",
                                            overflow: "hidden",
                                          }}
                                        >
                                          <div className="row  category-box">
                                            <div className="col-md-3 col-12 h-100 text-center  px-2">
                                              <div className="p-md-1 p-lg-3 icon-box">
                                                <img
                                                  id={i + "icon"}
                                                  src={res?.unactive_icon}
                                                  alt={res?.sub_category}
                                                />
                                              </div>
                                            </div>
                                            <div className="col-md-9 col-12 d-sm-flex align-items-center px-3 p-md-0">
                                              <div>
                                                <h6 className="m-0 py-2 text-md-start text-center">
                                                  {res?.sub_category}
                                                </h6>
                                                <input
                                                  type="checkbox"
                                                  id={`${i}checkbox`}
                                                  name={res?.sub_category_id}
                                                  className="large-checkbox"
                                                  style={{ cursor: "pointer" }}
                                                  onInput={(e) => {
                                                    if (e.target.checked) {
                                                      setFieldValue(
                                                        `${i}checkbox`,
                                                        res?.sub_category_id
                                                      );
                                                    } else {
                                                      setFieldValue(
                                                        `${i}checkbox`
                                                      );
                                                    }
                                                    toggleDisabled(e.target);
                                                  }}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div
                                          className="text-danger my-2"
                                          id={`error${i}`}
                                        ></div>
                                      </div>
                                    ) : (
                                      state?.selected_catagories &&
                                      state?.selected_catagories.length !== 0 &&
                                      state?.selected_catagories[3].includes(
                                        res?.sub_category_id
                                      ) && (
                                        <div
                                          className="col-lg-4 my-3 col-md-6"
                                          onClick={() => {
                                            setShowImagesSection(true);
                                            setModalSubCatagoryID(
                                              res?.sub_category_id
                                            );
                                            dispatch({
                                              type: "SUB_CATAGORY_DATA",
                                              value: {
                                                CataName: res.sub_category,
                                                CataId: res.category_id,
                                                SubCataId: res.sub_category_id,
                                              },
                                            });
                                          }}
                                        >
                                          <div
                                            style={cardStyle}
                                            className="dashboard-theme-color d-flex align-items-center flex-column text-white browse-project-card justify-content-center residental-card"
                                            onClick={residentialCard}
                                          >
                                            <img
                                              src={res?.unactive_icon}
                                              alt=""
                                              style={{
                                                filter: "brightness(4.5)",
                                              }}
                                            />
                                            <h6 className="pt-3">
                                              {res?.sub_category}
                                            </h6>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </>
                                );
                              }
                            )}
                          {isRedirect ? (
                            <div
                              className="col-lg-4 my-3 col-md-6"
                              onClick={() =>
                                dispatch({
                                  type: "BUYSALE_DESIGN_UPLOAD_MODAL",
                                  value: true,
                                })
                              }
                            >
                              <div
                                style={cardStyle}
                                className="border   d-flex align-items-center flex-column  browse-project-card justify-content-center residental-card"
                              >
                                <h6 className="pt-3 theme-text-color fs-21">
                                  Add Sub Catagory
                                  <BsPlusLg className="theme-text-color ms-3" />
                                </h6>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}

                          <div className=" col-12 my-md-4 my-3 d-flex align-items-center justify-content-end">
                            {!isRedirect ? (
                              <button
                                type="button"
                                style={{ border: "1px solid" }}
                                className="bg-white theme-text-color create-account-btn"
                                onClick={handleSkipButton}
                              >
                                Skip{" "}
                                <BsArrowRight className="theme-text-color" />
                              </button>
                            ) : (
                              ""
                            )}
                            <button
                              type="submit"
                              className="create-account-btn"
                              onClick={() =>
                                isRedirect
                                  ? navigate("/professionaldashboard")
                                  : ""
                              }
                            >
                              Continue{" "}
                              <BsArrowRight style={{ color: "white" }} />
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  </Form>
                )}
              </Formik>

              {/* add catagories modal */}
              <Modal
                show={state?.buy_sale_design_modal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="modalProfessionalDashboard"
              >
                <Modal.Header
                  closeButton
                  style={{ margin: "0 0 0 auto" }}
                  onClick={() => {
                    dispatch({
                      type: "BUYSALE_DESIGN_UPLOAD_MODAL",
                      value: false,
                    });
                    setCatErr(false);
                  }}
                  className="border-0"
                ></Modal.Header>
                <Modal.Body>
                  <h4>Add Catagories</h4>
                  <Formik
                    initialValues={{
                      new_sub_cat: "",
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      if (catagoriesDropdown.length < 1) {
                        setCatErr(true);
                        return false;
                      }
                      dispatch({
                        type: "BUYSALE_DESIGN_UPLOAD_MODAL",
                        value: false,
                      });

                      axios
                        .put(
                          "http://13.52.16.160:8082/professional/sel_sub_category",
                          {
                            ...cookies?.user_data,
                            category_id: "3",
                            new_sub_cat: values?.new_sub_cat,
                          }
                        )
                        .then((res) => {
                          return res?.data?.status === "Success"
                            ? (dispatch({
                                type: "BUYSALE_DESIGN_UPLOAD_MODAL",
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
                                setCatErr(false);
                                setFieldValue(
                                  "new_sub_cat",
                                  catagoriesDropdown.map((val) => val?.value)
                                );
                                setCatagoriesDropdown(catagoriesDropdown);
                              }}
                              labelledBy="Select"
                              name="new_sub_cat"
                            />
                          </div>
                        </div>
                        {catErr ? (
                          <span className="text-danger mt-2">
                            Minimum one category select
                          </span>
                        ) : (
                          ""
                        )}
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
              {/* add catagories modal */}

              {/* design upload modal */}
              <Modal
                show={state?.upload_designs_modal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="modalProfessionalDashboard"
              >
                <Modal.Header
                  closeButton
                  style={{ margin: "0 0 0 auto" }}
                  onClick={blankfields}
                  className="border-0"
                ></Modal.Header>
                <Modal.Body>
                  <h4>Upload Your Price, Image, Video And Project.</h4>
                  <Formik
                    initialValues={{
                      ...cookies?.user_data,
                      price: "",
                      image: "",
                      video: "",
                      project: "",
                    }}
                    validationSchema={SetUpSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      if (!values?.image) {
                        setimgdisplay("block");
                      } else if (!values?.video) {
                        setviddisplay("block");
                      } else if (!values?.project) {
                        setzipdisplay("block");
                      } else {
                        const catagoryUpload = new FormData();

                        catagoryUpload.append(
                          "user_id",
                          cookies?.user_data?.user_id
                        );
                        catagoryUpload.append(
                          "user_token",
                          cookies?.user_data?.user_token
                        );
                        catagoryUpload.append("role", cookies?.user_data?.role);
                        catagoryUpload.append(
                          "sub_category_id",
                          modalSubCatagoryID
                        );
                        catagoryUpload.append("category_id", "3");
                        catagoryUpload.append("image", values?.image);
                        catagoryUpload.append("price", values?.price);
                        catagoryUpload.append("video", values?.video);
                        catagoryUpload.append("project", values?.project);

                        setLoader(true);
                        axios
                          .post(
                            "http://13.52.16.160:8082/professional/sell_design",
                            catagoryUpload
                          )
                          .then((res) => {
                            if (res?.data?.status === "Success") {
                              dispatch({
                                type: "UPLOAD_DESIGNS_MODAL",
                                value: false,
                              });
                              setLoader(false);
                              blankfields();
                              setimgdisplay("none");
                              setviddisplay("none");
                              setzipdisplay("none");
                              setclsstyle("none");
                              setvidlbl("");
                              setimgPreview("");
                              setziplbl("");
                              setvidstyle("none");
                              setzipstyle("none");
                            } else {
                              dispatch({
                                type: "UPLOAD_DESIGNS_MODAL",
                                value: true,
                              });
                              setLoader(false);
                            }
                          });
                      }
                    }}
                  >
                    {({ isSubmitting, setFieldValue }) => (
                      <>
                        <Form>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="selectprice">
                                <BsCurrencyDollar />
                                <Field
                                  type="number"
                                  placeholder="Enter Your project Price "
                                  className="priceInput"
                                  name="price"
                                />
                                <ErrorMessage
                                  name="price"
                                  component="div"
                                  className="m-2 text-danger"
                                />
                              </div>
                            </div>
                            <div className="col-md-6 uploadimageCat">
                              <div
                                className="selectCategoryMain h-100 d-flex align-items-center"
                                style={{
                                  border: "1px solid rgb(118, 118, 118)",
                                  borderRadius: "5px",
                                }}
                              >
                                <BiCategory />
                                <p className="m-0 ">
                                  Choose Featured Image to Display
                                </p>
                                <div
                                  className={clsstyle}
                                  style={{
                                    width: "70px",
                                    height: "45px",
                                    marginLeft: "10%",
                                  }}
                                >
                                  <img
                                    src={imgPreview}
                                    alt="preview"
                                    style={{ height: "100%", width: "100%" }}
                                  />
                                  <span
                                    style={{
                                      position: "absolute",
                                      right: "34%",
                                      top: "8%",
                                    }}
                                  >
                                    <GiCancel
                                      onClick={() => {
                                        // setimgPreview("");
                                        imgnull(imgclear);
                                        setclsstyle("none");
                                        setFieldValue("image", null);
                                      }}
                                    />
                                  </span>
                                </div>
                                <input
                                  type="file"
                                  className="inputImageFeaturedImage"
                                  onInput={(e) => {
                                    setFieldValue("image", e.target.files[0]);
                                    setimgPreview(
                                      URL.createObjectURL(e.target.files[0])
                                    );
                                    setclsstyle("block");
                                    setimgclear(e);
                                    setimgdisplay("none");
                                  }}
                                  accept="image/*"
                                />
                              </div>
                              <span
                                style={{ color: "red", paddingTop: "7px" }}
                                className={imgdisplay}
                              >
                                Image required
                              </span>
                            </div>
                            <div className="row">
                              <div className="col-md-6"></div>
                              <div className="col-md-6"></div>
                            </div>
                          </div>
                          <div className="row m-0 pb-3 mb-3 pt-3  ">
                            <div className="col-md-6 ps-0">
                              <div className="d-flex imageDropBoxDashboardProfessional align-items-center">
                                <button className="w-100 pointer" type="button">
                                  <BsPlusLg
                                    className="pointer"
                                    style={{
                                      color: "#fff",
                                      fontSize: "17px",
                                    }}
                                  />
                                  <span className="ps-2 cursor-pointer">
                                    Upload Video
                                  </span>
                                </button>
                                <div
                                  className={vidstyle}
                                  style={{ marginTop: "2%", cursor: "pointer" }}
                                >
                                  <span>{vidlbl}</span>
                                  <span
                                    style={{
                                      position: "absolute",
                                      right: "10%",
                                      bottom: "10%",
                                    }}
                                  >
                                    <GiCancel
                                      size={25}
                                      color="gray"
                                      onClick={() => {
                                        setvidstyle("none");
                                        setvidlbl("");
                                        vidnull(vidclear);
                                        setFieldValue("video", null);
                                      }}
                                    />
                                  </span>
                                </div>
                                <p className="ps-4 "></p>
                                <input
                                  type="file"
                                  accept="video/*"
                                  name="project"
                                  className="pointer"
                                  onChange={(e) => {
                                    setFieldValue("video", e.target.files[0]);
                                    setvidclear(e);
                                    let name = e.target.files[0].name;
                                    const maxLength = 20;
                                    const trimmedFileName =
                                      name.length > maxLength
                                        ? name.slice(0, maxLength) +
                                          "..." +
                                          name.slice(-4)
                                        : name;
                                    setvidlbl(trimmedFileName);
                                    setvidstyle("block");
                                    setviddisplay("none");
                                  }}
                                />
                              </div>
                              <span className={`${viddisplay} text-danger`}>
                                Video required
                              </span>
                            </div>
                            <div className="col-md-6 pe-0">
                              <div className="d-flex imageDropBoxDashboardProfessional align-items-center">
                                <button className="w-100" type="button">
                                  <BsPlusLg
                                    style={{
                                      color: "#fff",
                                      fontSize: "17px",
                                    }}
                                  />
                                  <span className="ps-2">Upload Zip</span>
                                </button>
                                <p className="ps-4"> </p>
                                <input
                                  className="pointer"
                                  type="file"
                                  accept=".zip,.rar,.7zip"
                                  name="project"
                                  onChange={(e) => {
                                    setFieldValue("project", e.target.files[0]);
                                    let name = e.target.files[0].name;
                                    let maxLength = 20;
                                    const trimmedFileName =
                                      name.length > maxLength
                                        ? name.slice(0, maxLength) +
                                          "..." +
                                          name.slice(-4)
                                        : name;

                                    setziplbl(trimmedFileName);
                                    setzipstyle("block");
                                    setzipclear(e);
                                    setzipdisplay("none");
                                  }}
                                />
                                <div
                                  className={zipstyle}
                                  style={{ marginTop: "2%" }}
                                >
                                  <span>{ziplbl}</span>
                                  <span
                                    style={{
                                      position: "absolute",
                                      right: "10%",
                                      bottom: "10%",
                                    }}
                                  >
                                    <GiCancel
                                      size={25}
                                      color="gray"
                                      onClick={() => {
                                        setzipstyle("none");
                                        setziplbl("");
                                        zipnull(zipclear);
                                        setFieldValue("project", null);
                                      }}
                                    />
                                  </span>
                                </div>
                              </div>
                              <span
                                style={{ color: "red" }}
                                className={zipdisplay}
                              >
                                Zip required
                              </span>
                            </div>
                          </div>
                          <div className="row pb-5">
                            <div className="d-flex justify-content-center">
                              <button
                                type="submit"
                                className="ModalCategorySubmit"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </Form>
                      </>
                    )}
                  </Formik>
                </Modal.Body>
              </Modal>
              {/* design upload modal */}

              {/* loader */}
              <Modal
                show={loader}
                fullscreen={true}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="modalProfessionalDashboard"
              >
                <Loader />
              </Modal>
              {/* loader */}

              {/* preview data */}

              <>
                <Modal
                  show={state?.preview_data_modal}
                  fullscreen={
                    state?.preview_catagory_data?.type === "edit" ? false : true
                  }
                  size="xl"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  className="modalProfessionalDashboard"
                >
                  {state?.preview_catagory_data?.type === "edit" ? (
                    ""
                  ) : (
                    <button
                      className="closeModalPreviewData"
                      onClick={() => {
                        dispatch({ type: "PREVIEW_DATA_MODAL", value: false });
                      }}
                    >
                      x
                    </button>
                  )}
                  {state?.preview_catagory_data &&
                    state?.preview_catagory_data?.type === "image" && (
                      <img
                        src={state?.preview_catagory_data?.image}
                        alt=""
                        style={{ width: "50%", margin: "auto" }}
                      />
                    )}
                  {state?.preview_catagory_data &&
                    state?.preview_catagory_data?.type === "edit" && (
                      <Formik
                        initialValues={{
                          ...cookies?.user_data,
                          price:
                            state?.preview_catagory_designs?.price[
                              state?.preview_catagory_data?.index
                            ],
                          image: "",
                          video: "",
                          project: "",
                        }}
                        validationSchema={SetUpSchema}
                        onSubmit={(values, { setSubmitting }) => {
                          const catagoryUpload = new FormData();
                          catagoryUpload.append(
                            "user_id",
                            cookies?.user_data?.user_id
                          );
                          catagoryUpload.append(
                            "user_token",
                            cookies?.user_data?.user_token
                          );
                          catagoryUpload.append(
                            "role",
                            cookies?.user_data?.role
                          );
                          catagoryUpload.append(
                            "sub_category_id",
                            modalSubCatagoryID
                          );
                          catagoryUpload.append("category_id", "3");
                          catagoryUpload.append("image", values?.image);
                          catagoryUpload.append("price", values?.price);
                          catagoryUpload.append("video", values?.video);
                          catagoryUpload.append("project", values?.project);
                          catagoryUpload.append(
                            "index_no",
                            state?.preview_catagory_data?.index
                          );
                          handleEditDesign(catagoryUpload);
                        }}
                      >
                        {({ values, setFieldValue }) => (
                          <>
                            <Form className="p-5">
                              <h3 className="theme-text-color fw-bolder mb-4 text-center">
                                Edit Design
                              </h3>
                              <div className="row">
                                <div className="col">
                                  <div className="selectprice">
                                    <BsCurrencyDollar />
                                    <Field
                                      type="text"
                                      placeholder="Enter Your project Price "
                                      className="priceInput"
                                      name="price"
                                      value={values.price}
                                      onChange={(e) => {
                                        setFieldValue("price", e.target.value);
                                      }}
                                    />
                                    <ErrorMessage
                                      name="price"
                                      component="div"
                                      className="m-2 text-danger"
                                    />
                                  </div>
                                </div>
                                <div className="col" style={{ height: "56px" }}>
                                  <div
                                    className="selectCategoryMain h-100 d-flex align-items-center "
                                    style={{
                                      border: "1px solid rgb(118, 118, 118)",
                                      borderRadius: "5px",
                                      position: "relative",
                                    }}
                                  >
                                    <BiCategory />
                                    <p className="m-0">
                                      Choose Featured Image to Display
                                    </p>
                                    <div
                                      className={clsstyle}
                                      style={{
                                        width: "70px",

                                        marginLeft: "10%",
                                      }}
                                    >
                                      <img
                                        style={{ height: "44px" }}
                                        src={
                                          imgPreview
                                            ? imgPreview
                                            : state?.preview_catagory_designs
                                                ?.image_url +
                                              state?.preview_catagory_designs
                                                ?.image[
                                                state?.preview_catagory_data
                                                  ?.index
                                              ]
                                        }
                                        alt="preview"
                                      />
                                      {/* <span
                                      style={{
                                        position: "absolute",
                                        right: "10%",
                                        top: "1%",
                                      }}
                                    >
                                      <GiCancel
                                        onClick={() => {
                                          setclsstyle("none");
                                        }}
                                      />
                                    </span> */}
                                    </div>
                                    <input
                                      type="file"
                                      className="inputImageFeaturedImage"
                                      onChange={(e) => {
                                        setFieldValue(
                                          "image",
                                          e.target.files[0]
                                        );

                                        setimgPreview(
                                          URL.createObjectURL(e.target.files[0])
                                        );

                                        setclsstyle("block");
                                      }}
                                      accept="image/*"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col"></div>
                                  <div className="col"></div>
                                </div>
                              </div>
                              <div className="row m-0 pb-3 mb-3">
                                <div className="col ps-0">
                                  <div className="d-flex imageDropBoxDashboardProfessional align-items-center">
                                    <button className="w-100" type="button">
                                      <BsPlusLg
                                        style={{
                                          color: "#fff",
                                          fontSize: "17px",
                                        }}
                                      />
                                      <span className="ps-2">Upload Video</span>
                                    </button>
                                    <div className={vidstyle}>
                                      <span>
                                        {vidlbl
                                          ? vidlbl
                                          : state?.preview_catagory_designs
                                              ?.video[
                                              state?.preview_catagory_data
                                                ?.index
                                            ]}
                                      </span>
                                      {/* <span
                                      style={{
                                        position: "absolute",
                                        right: "10%",
                                        bottom: "5%",
                                      }}
                                    >
                                      <GiCancel
                                        size={25}
                                        color="grey"
                                        onClick={() => {
                                          setvidstyle("none");
                                          setvidlbl("");
                                        }}
                                      />
                                    </span> */}
                                    </div>
                                    <p className="ps-4"></p>
                                    <input
                                      type="file"
                                      accept="video/*"
                                      name="project"
                                      onChange={(e) => {
                                        let name = e.target.files[0].name;
                                        const maxLength = 20;
                                        const trimmedFileName =
                                          name.length > maxLength
                                            ? name.slice(0, maxLength) +
                                              "..." +
                                              name.slice(-4)
                                            : name;
                                        setFieldValue(
                                          "video",
                                          e.target.files[0]
                                        );
                                        setvidlbl(trimmedFileName);
                                        setvidstyle("block");
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="col pe-0">
                                  <div className="d-flex imageDropBoxDashboardProfessional align-items-center">
                                    <button className="w-100" type="button">
                                      <BsPlusLg
                                        style={{
                                          color: "#fff",
                                          fontSize: "17px",
                                        }}
                                      />
                                      <span className="ps-2">Upload Zip</span>
                                    </button>
                                    <p className="ps-4"> </p>
                                    <input
                                      type="file"
                                      accept="zip/*"
                                      name="project"
                                      onChange={(e) => {
                                        setFieldValue(
                                          "project",
                                          e.target.files[0]
                                        );
                                        let name = e.target.files[0].name;
                                        const maxLength = 20;
                                        const trimmedFileName =
                                          name.length > maxLength
                                            ? name.slice(0, maxLength) +
                                              "..." +
                                              name.slice(-4)
                                            : name;
                                        setzipstyle("block");
                                        setziplbl(trimmedFileName);
                                      }}
                                    />
                                    <div className={zipstyle}>
                                      <span>
                                        {ziplbl
                                          ? ziplbl
                                          : state?.preview_catagory_designs
                                              ?.project[
                                              state?.preview_catagory_data
                                                ?.index
                                            ]}
                                      </span>
                                      {/* <span
                                      style={{
                                        position: "absolute",
                                        right: "10%",
                                        bottom: "5%",
                                      }}
                                    >
                                      <GiCancel
                                        size={25}
                                        color="grey"
                                        onClick={() => {
                                          setzipstyle("none");
                                          setziplbl("");
                                        }}
                                      />
                                    </span> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row pb-5 justify-content-center">
                                <button
                                  type="submit"
                                  className="ModalCategorySubmit mx-2"
                                >
                                  Submit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    dispatch({
                                      type: "PREVIEW_DATA_MODAL",
                                      value: false,
                                    });
                                    blankfields();
                                  }}
                                  style={{ border: "1px solid" }}
                                  className="ModalCategorySubmit mx-2 bg-white theme-text-color"
                                >
                                  Back
                                </button>
                              </div>
                            </Form>
                          </>
                        )}
                      </Formik>
                    )}
                  {state?.preview_catagory_data &&
                    state?.preview_catagory_data?.type === "video" &&
                    state?.preview_catagory_data?.video !== "" &&
                    state?.preview_catagory_data?.video && (
                      <video
                        className="h-100"
                        src={
                          state?.preview_catagory_data?.video &&
                          state?.preview_catagory_data?.video
                        }
                        controls="true"
                        autoplay="true"
                      ></video>
                    )}
                  {state?.preview_catagory_data &&
                    state?.preview_catagory_data?.type === "zip" && (
                      <h1>zip</h1>
                    )}
                </Modal>
              </>

              {/* preview data */}
            </div>
          </main>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
      </>
    );
  } else {
    return <Loader />;
  }
};

export default ProfessionalBuyAndSale;
