import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import Global from "../context/Global";
import Rating from "@mui/material/Rating";
import axios from "axios";
import $ from "jquery";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useWindowSize from "../Hooks/useWindowSize";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StarRating from "star-rating-react";
import { useNavigate } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import CatagoryResultCard from "../components/Card/CatagoryResultCard";
import LoadingModal from "../components/Modals/LoadingModal";
import { TbHeart } from "react-icons/tb";
import { GoUnverified } from "react-icons/go";
import Button from "react-bootstrap/Button";
import { ShareSocial } from "react-share-social";
import { BsCurrencyDollar } from "react-icons/bs";
import { MdCloudUpload } from "react-icons/md";
import * as Yup from "yup";
import { useCookies } from "react-cookie";
import Loader from "../components/Loader";
import ReactLottie3 from "../loader/ReactLottie3";

const ProfessionalProfile = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    work_assigned: Yup.string().required("This field is required"),
    description: Yup.string().required("Description is required"),
    time: Yup.string().required("Time is required"),
    area: Yup.string().required("Area is required"),
    budget: Yup.number()
      .positive("Budget must be a positive number")
      .required("Budget is required"),
  });

  const contextData = useContext(Global);
  const params = useParams();
  const [loader, setLoader] = useState(false);
  const [likepro, setLikepro] = useState(false);
  const [reviewsCount, setReviewsCount] = useState(null);
  const [ratingsCount, setRatingsCount] = useState(null);

  const [showRating, setShowRating] = useState(false);
  const [submitRevieRating, setSubmitReviewRating] = useState(false);
  const [sucessReview, setSucessreview] = useState(false);
  const [ratingreview, setRating] = useState({
    rating: 1,
    review: "",
  });
  const [reviewHeading, setReviewHeading] = useState(false);
  const [showRatingReview, setShowRatingReview] = useState(false);
  const [cookies] = useCookies();
  const [isRender, setIsRender] = useState(false);
  const [isRender1, setIsRender1] = useState(false);

  const [fileErr, setFileErr] = useState("none");
  const [islotti, setIslotti] = useState(false);

  useEffect(() => {
    if (cookies?.user_data) {
      if (cookies?.user_data?.category_selected) {
        if (cookies.user_data.role === "client") {
          setIsRender(true);
        } else {
          navigate("/professionaldashboard");
        }
      } else {
        if (cookies.user_data.role === "professional") {
          navigate("/categoryArchitecture");
        } else {
          navigate("/client-architechture");
        }
      }
    } else {
      navigate("/select-sign-in");
    }
  }, []);

  const handleShowRatingReview = () => {
    setShowRatingReview(true);
  };
  const handleCloseRating = () => {
    setShowRatingReview(false);
  };

  useEffect(() => {
    setLoader(true);
    axios
      .post("http://13.52.16.160:8082/professional/professional_profile", {
        client_id: cookies?.user_data?.user_id,
        role: cookies?.user_data?.role,
        user_token: cookies?.user_data?.user_token,
        professional_id: params?.professional_id,
      })
      .then((respo) => {
        console.log(respo?.data);
        setLikepro(respo?.data?.data?.liked);
        setReviewsCount(respo?.data?.data?.reviews);
        setRatingsCount(respo?.data?.data?.ratings);
        setRating({
          ...ratingreview,
          rating: !respo?.data?.data?.rating_given
            ? 0
            : respo?.data?.data?.rating_given,
          review: respo?.data?.data?.review_given
            ? respo?.data?.data?.review_given
            : "",
        });
        if (respo?.data?.data?.rating_given === false) {
          setReviewHeading(false);
        } else {
          setReviewHeading(true);
        }
        if (respo?.data?.status === "Success") {
          if (cookies?.user_data?.role === "client") {
            axios
              .post(
                "http://13.52.16.160:8082/professional/professional_sub_cat",
                {
                  client_id: cookies?.user_data?.user_id,
                  professional_id: params?.professional_id,
                  role: cookies?.user_data?.role,
                  user_token: cookies?.user_data?.user_token,
                }
              )
              .then((res) => {
                if (res?.data?.status === "Success") {
                  contextData?.dispatch({
                    type: "PROFESSIONAL_USER_PROFILE_DATA",
                    value: {
                      details: respo?.data?.data,
                      selected_catagories: res?.data?.response,
                    },
                  });

                  setLoader(false);
                } else {
                  contextData?.dispatch({
                    type: "PROFESSIONAL_USER_PROFILE_DATA",
                    value: {
                      details: respo?.data?.data,
                      selected_catagories: {
                        1: [],
                        2: [],
                        3: [],
                      },
                    },
                  });
                  navigate(-1);
                  setLoader(false);
                }
              });
          } else {
            axios
              .post(
                "http://13.52.16.160:8082/professional/professional_sub_cat",
                {
                  user_id: cookies?.user_data?.user_id,
                  role: cookies?.user_data?.role,
                  user_token: cookies?.user_data?.user_token,
                }
              )
              .then((response) => {
                if (response?.data?.status === "Success") {
                  contextData?.dispatch({
                    type: "PROFESSIONAL_USER_PROFILE_DATA",
                    value: {
                      details: respo?.data?.data,
                      selected_catagories: response?.data?.response,
                    },
                  });
                  setLoader(false);
                } else {
                  navigate(-1);
                }
              });
          }
        } else {
          navigate("/clientdashboard");
        }
      });
  }, [cookies?.user_data]);

  useEffect(() => {
    if (!contextData?.static_architecture_design?.length) {
      axios
        .get("http://13.52.16.160:8082/quadra/sub_categories?category_id=1")
        .then((res) => {
          contextData?.dispatch({
            type: "STATIC_ARCHITECTURE_DESIGN",
            value: res?.data,
          });
        });
    }
    if (!contextData?.static_visualization_design?.length) {
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

  const windowSize = useWindowSize();
  const navigate = useNavigate();
  const options = {
    loop: false,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  };
  const customStyleOne = {
    backgroundPosition: "100% 100%",
    paddingBottom: "70px",
    margin: "100px 0",
  };
  const customStyleTwo = {
    margin: "50px 0 10px 0",
  };
  const [showModal, setShowModal] = useState(false);

  const [date, setDate] = useState(null);

  const handleLikeButton = () => {
    setLikepro(!likepro);
    axios
      .post("http://13.52.16.160:8082/identity/like-save", {
        client_id: cookies?.user_data?.user_id,
        user_token: cookies?.user_data?.user_token,
        professional_id:
          contextData?.professional_user_profile_data?.details?.professional_id,
        role: cookies?.user_data?.role,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          toast(
            !likepro
              ? " You Liked This Profile !  ❤️ "
              : "You Unliked This Profile !  ❤️ ",
            {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }
          );
        }
      });
  };

  const onSetRating = (val) => {
    if (ratingreview.rating && ratingreview.review) {
      setIslotti(true);
      axios
        .post("http://13.52.16.160:8082/client/client_rating", {
          professional_id:
            contextData?.professional_user_profile_data?.details
              ?.professional_id,
          client_id: cookies?.user_data?.user_id,
          rating: ratingreview.rating,
          review: ratingreview.review,
          user_token: cookies?.user_data?.user_token,
          role: cookies?.user_data?.role,
        })
        .then((res) => {
          if (res?.data?.status === "Success") {
            setIslotti(false);
            setSucessreview(true);
            setShowRatingReview(false);
            setSubmitReviewRating(true);
            setReviewHeading("Reviewed");
            axios
              .post(
                "http://13.52.16.160:8082/professional/professional_profile",
                {
                  client_id: cookies?.user_data?.user_id,
                  role: cookies?.user_data?.role,
                  user_token: cookies?.user_data?.user_token,
                  professional_id: params?.professional_id,
                }
              )
              .then((res) => {
                setReviewsCount(res?.data?.data?.reviews);
                setRatingsCount(res?.data?.data?.ratings);
              });
          }
        });
    } else {
      return false;
    }
  };

  const bothDataArchitecture =
    contextData?.static_architecture_design?.data?.length &&
    contextData?.static_architecture_design?.data?.map((res) => {
      return {
        label: res?.sub_category?.replace("-", " "),
        value: res?.sub_category?.replace("-", " "),
        id: res?.sub_category_id,
      };
    });

  const bothDataVisualization =
    contextData?.static_visualization_design?.data?.length &&
    contextData?.static_visualization_design?.data?.map((res) => {
      return {
        label: res?.sub_category?.replace("-", " "),
        value: res?.sub_category?.replace("-", " "),
        id: res?.sub_category_id,
      };
    });
  const ark = bothDataArchitecture?.filter((res) => {
    return (
      contextData?.professional_user_profile_data?.selected_catagories[1]?.includes(
        res?.id
      ) && {
        label: res?.label,
        value: res?.label,
      }
    );
  });
  const viz = bothDataVisualization?.filter((res) => {
    return (
      contextData?.professional_user_profile_data?.selected_catagories[2]?.includes(
        res?.id
      ) && {
        label: res?.label,
        value: res?.label,
      }
    );
  });

  const [
    newBothArchiteactureAndVisualization,
    setNewBothArchiteactureAndVisualization,
  ] = useState();
  useEffect(() => {
    ark && viz && setNewBothArchiteactureAndVisualization([...ark, ...viz]);
  }, [showModal]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [verified, setVerified] = useState(
    contextData?.professional_user_profile_data?.details?.verified
  );
  const [attachement, setAttachement] = useState("");
  const [fileReport, setFileReport] = useState();
  const [reportUpload, setreportUpload] = useState(false);
  const [description, setDescription] = useState("");
  function handleChange_File(e) {
    setFileErr("none");
    const file = URL.createObjectURL(e.target.files[0]);
    let pdfFile = e.target.files[0].name;
    setAttachement(e.target.files[0]);
    setFileReport(pdfFile);
    setreportUpload(true);
    // setreportUpload(true);
    // setAttachementError("");
  }
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return contextData?.professional_user_profile_data && isRender ? (
    <main className="profile-page">
      <section className="profile-page-sec-one">
        <div className="container-fluid">
          <button
            style={{
              position: "absolute",
              top: "10%",
              left: "10%",
              border: "0",
              background: "transparent",
              width: "30px",
              zIndex: "9999",
            }}
          >
            {cookies?.user_data?.role === "client" && (
              <NavLink to="/browse-professionals" style={{ color: "white" }}>
                <i
                  className="fa-solid fa-arrow-left-long pe-3"
                  style={{ fontSize: "30px" }}
                ></i>
              </NavLink>
            )}

            {cookies?.user_data?.role === "professional" && (
              <NavLink to="/professionaldashboard" style={{ color: "white" }}>
                <i
                  className="fa-solid fa-arrow-left-long pe-3"
                  style={{ fontSize: "30px" }}
                ></i>
              </NavLink>
            )}
          </button>
          <div className="row">
            <div className="col-lg-2 px-0 d-lg-block d-none">
              <img
                src="/static/images/greenbgprofilepage1.png"
                alt=""
                className="left-user-banner-image h-100 w-100"
              />
            </div>
            <div className="col-lg-10 px-0">
              <img
                src={
                  contextData?.professional_user_profile_data &&
                  contextData?.professional_user_profile_data?.details
                    ?.background_image
                }
                alt=""
                className="right-user-banner-image"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="profile-page-sec-two">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-4">
              <div className="user-profile-image w-100 h-100">
                <img
                  src={
                    contextData?.professional_user_profile_data &&
                    contextData?.professional_user_profile_data?.details
                      ?.user_image
                  }
                  alt=""
                  className="rounded-circle w-100"
                />
                <div className="user-experience-box d-flex align-items-center">
                  <h2 style={{ padding: "0 5px" }}>
                    {contextData?.professional_user_profile_data &&
                      contextData?.professional_user_profile_data?.details
                        ?.experience}
                  </h2>
                  <div>
                    <h4>Years</h4>
                    <h5>Work Experience</h5>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-8 d-flex align-items-end bg-white mainProfileBox"
              style={{
                zIndex: 999,
                borderRadius: "14px",
                height: `${parseInt($(".user-profile-info").height() + 20)}px`,
              }}
            >
              <div className="user-profile-info w-100">
                <div className="row pt-md-0 pt-5">
                  <div className="row m-auto pb-3">
                    <div className="col-md d-flex m-auto">
                      <h2
                        style={{
                          marginLeft: "-3%",
                          textTransform: "capitalize",
                        }}
                      >
                        {contextData?.professional_user_profile_data &&
                          contextData?.professional_user_profile_data?.details
                            ?.name}
                      </h2>
                    </div>
                    <div className="col  ">
                      <div
                        style={{
                          // display: "grid",
                          // placeItems: "center",
                          padding: "5px 10px",
                          boxShadow: "4px 4px 4px #dddddd",
                          borderRadius: "10px",
                          display: "flex",
                        }}
                      >
                        <h2 className="m-auto miniRate">Minimum Rate : </h2>
                        <h2 className="">
                          ${" "}
                          {contextData?.professional_user_profile_data &&
                            contextData?.professional_user_profile_data?.details
                              ?.price_range}{" "}
                          <span>/sq.mtr</span>
                        </h2>
                      </div>
                    </div>
                  </div>
                  <h4>
                    {contextData?.professional_user_profile_data &&
                      contextData?.professional_user_profile_data?.details
                        ?.about}
                  </h4>
                </div>
                <div className="row pt-md-0 pt-4">
                  <div className="col-md">
                    <div className="d-flex">
                      <Rating
                        name="read-only"
                        value={parseInt(ratingsCount)}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md">
                    <span>
                      <img
                        src="/static/images/project.png"
                        className="object-fit"
                        alt="project"
                      />
                      <span style={{ padding: "0 5px" }}>
                        {contextData?.professional_user_profile_data &&
                          contextData?.professional_user_profile_data?.details
                            ?.project_count}
                        &nbsp;
                        {contextData?.professional_user_profile_data?.details
                          ?.project_count > 1000
                          ? "+"
                          : ""}
                      </span>
                      <span> Projects Done </span>
                    </span>
                  </div>
                  <div className="col-md">
                    <img src="/static/images/reviewIcon.png" alt="review" />
                    &nbsp;
                    <span>
                      <span style={{ padding: "0 5px" }}>
                        {/* { contextData?.professional_user_profile_data &&
                          contextData?.professional_user_profile_data?.details
                            ?.reviews } */}
                        {reviewsCount}
                      </span>
                      {contextData?.professional_user_profile_data?.details
                        ?.reviews > 1000
                        ? "+"
                        : ""}
                      Reviews
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="profile-page-sec-three theme-bg-color">
        <div className="container">
          <div className="row">
            {cookies?.user_data?.role === "client" && (
              <div className="col d-md-flex justify-content-between p-lg-5 p-4 border-radius bg-white text-center button-group-profile-page">
                <div
                  onClick={() => {
                    setShowModal(true);
                  }}
                  className="text-decoration-none text-black"
                >
                  <div className="py-md-0 py-2 Cur_proFes">
                    <img src="/static/images/addHire.png" alt="" />
                    <h4>Hire Freelancer</h4>
                  </div>
                </div>
                <div
                  // to="/chat"
                  onClick={() => {
                    axios
                      .post("http://13.52.16.160:8082/chat/get_room_id/", {
                        client_id: cookies?.user_data.user_id,
                        role: cookies?.user_data.role,
                        user_token: cookies?.user_data.user_token,
                        professional_id:
                          contextData?.professional_user_profile_data?.details
                            ?.professional_id,
                      })
                      .then((respo) => {
                        if (respo?.data?.status === "Success") {
                          navigate("/chat");
                        }
                      });
                  }}
                  className="text-decoration-none text-black"
                >
                  <div className="py-md-0 py-2 Cur_proFes">
                    <img src="/static/images/message.png" alt="" />
                    <h4>Message</h4>
                  </div>
                </div>
                <div className="text-decoration-none text-black ratingMainBoxProfessionalProfile">
                  <div
                    className="py-md-0 py-2 Cur_proFes"
                    onClick={handleShowRatingReview}
                  >
                    <img
                      src="/static/images/addareview.png"
                      alt=""
                      onClick={() => {
                        setShowRating(true);
                      }}
                    />
                    <h4>{reviewHeading ? "Reviewed" : "Add a review"}</h4>
                  </div>
                </div>

                <Modal show={showRatingReview} onHide={handleCloseRating}>
                  <Modal.Header closeButton>
                    <h4 className="m-auto">Add Review & Rating</h4>
                  </Modal.Header>

                  <Modal.Body>
                    {showRating && (
                      <div className="ratingBox">
                        <div
                          style={{
                            position: "relative",
                            padding: "7px 12px 0 0",
                          }}
                        >
                          <div className="forRatingArrow">
                            <h4 className="my-2"> Rating</h4>
                            <StarRating
                              className="ratingBoxProfessionalProfile"
                              size={5}
                              value={ratingreview.rating}
                              style={{ color: "red" }}
                              onChange={(val) => {
                                setRating({
                                  ...ratingreview,
                                  rating: val,
                                });
                              }}
                            />
                          </div>
                        </div>
                        <h4 className="my-2"> Review</h4>

                        <textarea
                          maxLength={100}
                          type="text"
                          rows={3}
                          value={ratingreview.review}
                          onChange={(val) => {
                            setRating({
                              ...ratingreview,
                              review: val.target.value,
                            });
                          }}
                          placeholder="Add a review"
                          style={{ width: "90%", padding: "10px 20px" }}
                        />
                        {/* <p>{ratingreview.review.length}/ 100</p> */}

                        <Button
                          className="my-2"
                          style={{
                            background: "#01a78a",
                            border: "0",
                            width: "21%",
                          }}
                          type="submit"
                          onClick={onSetRating}
                        >
                          {islotti ? <ReactLottie3 /> : "Submit"}
                        </Button>
                      </div>
                    )}
                  </Modal.Body>
                </Modal>
                <div className="text-decoration-none text-black">
                  <div className="py-md-0 py-2 Cur_proFes">
                    {contextData?.professional_user_profile_data &&
                    contextData?.professional_user_profile_data?.details
                      ?.verified ? (
                      <div>
                        {" "}
                        <img
                          src="/static/images/verifiedvisualiser.png"
                          alt=""
                        />{" "}
                        <h4>Verified Freelancer</h4>
                      </div>
                    ) : (
                      <div>
                        <GoUnverified
                          size={86}
                          style={{
                            color: "#00d566",
                            border: " 1px solid #bfbfbf",
                            borderRadius: "50%",
                            padding: "10px",
                          }}
                        />
                        <h4>Unverified Freelancer</h4>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className="text-decoration-none text-black"
                  onClick={handleShow}
                >
                  <div className="py-md-0 py-2 Cur_proFes">
                    <img src="/static/images/sharethisprofile.png" alt="" />
                    <h4>Share this Profile</h4>
                  </div>
                </div>
                <div className="text-decoration-none text-black">
                  <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                  >
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                      <ShareSocial
                        url={window.location.href}
                        socialTypes={[
                          "facebook",
                          "twitter",
                          "reddit",
                          "linkedin",
                          "whatsapp",
                        ]}
                      />
                    </Modal.Body>
                  </Modal>
                  <div
                    onClick={() => {
                      handleLikeButton();
                    }}
                    className="text-decoration-none text-black"
                  >
                    <div className="py-md-0 py-2 Cur_proFes">
                      {likepro ? (
                        <img src="/static/images/likethisprofile.png" alt="" />
                      ) : (
                        <TbHeart
                          size={86}
                          style={{
                            color: "red",
                            border: " 1px solid #bfbfbf",
                            borderRadius: "50%",
                            padding: "10px",
                          }}
                        />
                      )}
                      <h4>{likepro ? "Liked" : "Like"}</h4>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="row">
            <div className="col">
              <h3>About</h3>
              <p>
                {contextData?.professional_user_profile_data &&
                  contextData?.professional_user_profile_data?.details
                    ?.job_description}
              </p>
            </div>
          </div>
        </div>
      </section>
      {contextData?.professional_user_profile_data?.selected_catagories[1]
        ?.length && (
        <section
          className="Top_Earners  profile-page-sec-four"
          style={windowSize?.width > 768 ? customStyleOne : customStyleTwo}
        >
          <div className="container">
            <div className="Top_Earners_Ineer">
              <h2>Architecture Designs Portfolio </h2>
            </div>
            <OwlCarousel
              className="owl-carousel portfolio-slider owl-theme"
              {...options}
            >
              {contextData?.static_architecture_design?.data?.length &&
                contextData?.static_architecture_design?.data?.map(
                  (res, key) => {
                    return contextData?.professional_user_profile_data &&
                      contextData?.professional_user_profile_data?.selected_catagories[1].includes(
                        res.sub_category_id
                      ) ? (
                      <CatagoryResultCard
                        key={key}
                        res={res}
                        catagoryId={1}
                        subCatagoryId={res.sub_category_id}
                      />
                    ) : (
                      ""
                    );
                  }
                )}
            </OwlCarousel>
          </div>
        </section>
      )}

      {contextData?.professional_user_profile_data?.selected_catagories[2]
        ?.length && (
        <section className="Top_Earners Recent_Earners profile-page-sec-four">
          <div className="container">
            <div className="Top_Earners_Ineer">
              <h2>3D Visualization Designs Portfolio</h2>
            </div>
            <OwlCarousel
              className="owl-carousel portfolio-slider owl-theme"
              {...options}
            >
              {contextData?.static_visualization_design?.data?.length &&
                contextData?.static_visualization_design?.data?.map(
                  (res, key) => {
                    return contextData?.professional_user_profile_data &&
                      contextData?.professional_user_profile_data?.selected_catagories[2].includes(
                        res.sub_category_id
                      ) ? (
                      <CatagoryResultCard
                        key={key}
                        res={res}
                        catagoryId={2}
                        subCatagoryId={res.sub_category_id}
                      />
                    ) : (
                      ""
                    );
                  }
                )}
            </OwlCarousel>
          </div>
        </section>
      )}

      <section className="profile-page-sec-five">
        <div className="container">
          <div className="row pt-md-0 pt-4">
            <div className="col">
              <h3>Skills</h3>
              <div className="flex-wrap text-md-center text-start row">
                {contextData?.professional_user_profile_data &&
                  contextData?.professional_user_profile_data?.details?.skills.map(
                    (res, key) => (
                      <div className="pe-md-5 col-auto" key={key}>
                        <p>{res}</p>
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className=" theme-bg-color profile-page-sec-six">
        <div className="container">
          <div className="row">
            <div className="col">
              <h3>Education</h3>
              <div className="d-flex py-3">
                <img
                  src="/static/images/education.png"
                  alt=""
                  height="60px"
                  width="60px"
                />
                <div className="ps-3">
                  <h5>
                    {contextData?.professional_user_profile_data &&
                      contextData?.professional_user_profile_data?.details
                        ?.education}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal
        show={showModal}
        className="productDetailsUploadModalProfilePage "
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ zIndex: "9888" }}
      >
        <Modal.Header
          closeButton
          className="border-0"
          onClick={() => {
            setShowModal(false);
            setAttachement("");
            setFileReport("");
            setreportUpload(false);
          }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Enter Your Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: "",
              time: "",
              area: "",
              budget: "",
              work_assigned: "",
              description: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }, errors) => {
              if (!attachement) {
                setFileErr("block");
                return false;
              }

              const formdata = new FormData();
              formdata.set("client_id", cookies?.user_data?.user_id);
              formdata.set("description ", values?.description);
              formdata.set("user_token", cookies?.user_data?.user_token);
              formdata.set("attachment", attachement);
              formdata.set(
                "professional_id",
                contextData?.professional_user_profile_data?.details
                  ?.professional_id
              );
              formdata.set("project_name", values?.name);
              formdata.set("work_assigned ", values?.work_assigned);
              formdata.set("project_cost", values?.budget);
              formdata.set("area ", values?.area);
              formdata.set("role ", cookies?.user_data?.role);
              formdata.set(
                "estimate_date ",
                new Date(values?.time)?.toLocaleString("en-US").split(",")[0]
              );

              if (!values?.work_assigned) {
                // alert( "put the alert" );
                // return false
              } else {
                setIslotti(true);
                axios
                  .post(
                    "http://13.52.16.160:8082/client/start_project",
                    formdata
                  )
                  .then((res) => {
                    if (res?.data?.status === "Success") {
                      setShowModal(false);
                      setIslotti(false);
                      setDate(null);
                      setAttachement("");
                      setFileReport("");
                      setreportUpload(false);
                      setFileErr("none");
                    }
                  });
              }
            }}
          >
            {({ isSubmitting, setFieldValue, errors }) => (
              <Form>
                <div className="row g-3">
                  <div className="col-12">
                    <Field name="work_assigned" as="select">
                      <option selected="true" value={""} disabled="disabled">
                        Select The Catagory
                      </option>
                      {newBothArchiteactureAndVisualization?.map((res, key) => (
                        <option key={key} value={res?.value}>
                          {res?.label}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="work_assigned"
                      component="div"
                      className="mt-2 text-danger"
                    />
                  </div>
                  <div className=" col-md-6 ">
                    <Field name="name" type="text" placeholder="Project Name" />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="mt-2 text-danger"
                    />
                  </div>
                  <div className="col-md-6 ">
                    {/* <Field
                      name="time"
                      type="text"
                      placeholder="Estimated Time"
                    /> */}
                    <DatePicker
                      isClearable
                      placeholderText="Estimated Date for Completion"
                      minDate={new Date()}
                      selected={date}
                      name="date"
                      dateFormat="yyyy-MM-dd"
                      onChange={(date) => {
                        setDate(date);
                        setFieldValue(
                          "time",
                          new Date(date).toLocaleDateString("en-CA")
                        );
                      }}
                    />
                    <ErrorMessage
                      name="time"
                      component="div"
                      className="mt-2 text-danger"
                    />
                  </div>
                  <div className="col-md-6 area_price">
                    <Field
                      name="area"
                      type="number"
                      placeholder="Estimated Area in Square Meter"
                      min="0"
                    />
                    <ErrorMessage
                      name="area"
                      component="div"
                      className="mt-2 text-danger"
                    />
                  </div>
                  <div className="col-md-6 " style={{ position: "relative" }}>
                    <Field
                      name="budget"
                      type="number"
                      placeholder="Estimated Budget in $"
                      min="0"
                      style={{ paddingLeft: "7%" }}
                    />

                    <ErrorMessage
                      name="budget"
                      component="div"
                      className="mt-2 text-danger"
                    />
                  </div>
                  <div className="col-12 projectDesc">
                    <Field
                      as="textarea"
                      name="description"
                      type="text"
                      placeholder="Project Description"
                      className="form-control "
                      rows="7"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="m-2 text-danger"
                    />
                  </div>
                  <div className="col-12">
                    <input
                      name="attachment"
                      style={{ display: "none" }}
                      type="file"
                      className="queryBox"
                      onChange={handleChange_File}
                      id="attachement1"
                    />
                    <label
                      htmlFor="attachement1"
                      className="input-path-label  mt-4 p-3 "
                    >
                      <span>
                        <MdCloudUpload
                          size={40}
                          color={"rgb(1, 167, 138)"}
                          margin-left={"10px"}
                          s
                        />
                      </span>
                      {reportUpload ? (
                        <p className="Report"> {fileReport}</p>
                      ) : (
                        <p className="Report">Upload Project File</p>
                      )}
                    </label>
                  </div>
                  <span
                    style={{ marginTop: "10px" }}
                    className={`${fileErr} text-danger `}
                  >
                    File required
                  </span>
                </div>
                <button type="submit" disabled={islotti ? true : false}>
                  {islotti ? <ReactLottie3 /> : "submit"}
                </button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
    </main>
  ) : (
    <Loader />
  );
};

export default ProfessionalProfile;
