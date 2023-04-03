import React, { useEffect, useContext, useState } from "react";
import Global from "../context/Global";
import HomeServiceCard from "../components/Card/HomeServiceCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
import {
  findIcon,
  findIcon2,
  findIcon4,
  arrIcon,
  ourTeam,
  projectImg,
  imgpsh1,
  imgpsh2,
  imgpsh3,
  mohd,
  layer52,
} from "../components/images";
import { HeaderHome } from "../components/Header";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import OwlCarousel from "react-owl-carousel";
import { useNavigate } from "react-router-dom";
import HeroesSection from "../components/HeroesSection";
import axios from "axios";
import { useCookies } from "react-cookie";
const options1 = {
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

const options2 = {
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

const Home = () => {
  const contextData = useContext(Global);
  const navigate = useNavigate();
  const [cookies] = useCookies();
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/heroes.js";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // auth
  const [isRender, setIsRender] = useState(false);
  useEffect(() => {
    if (cookies?.user_data) {
      if (cookies?.user_data?.category_selected) {
        setIsRender(true);
      } else {
        if (cookies?.user_data?.role === "client") {
          navigate("/client-architechture");
        } else {
          navigate("/categoryArchitecture");
        }
      }
    } else {
      setIsRender(true);
    }
  }, []);

  useEffect(() => {
    const user_data = cookies?.user_data;
    if (user_data) {
      axios
        .post("http://13.52.16.160:8082/identity/get_dashboard_profile/", {
          ...user_data,
        })
        .then((res) => {
          contextData?.dispatch({
            type: "FETCH_PROFILE_DATA",
            value: res?.data?.data,
          });

          contextData?.dispatch({
            type: "FETCH_USER_DATA",
            value: user_data,
          });

          if (res?.data?.data?.category_selected === true) {
            navigate("/");
          } else {
            if (user_data?.role === "client") {
              contextData.setShowDisclamer(true);
              navigate("/client-architechture");
            } else {
              contextData.setShowDisclamer(true);
              navigate("/categoryArchitecture");
            }
          }
        });
    }
  }, []);

  const handleFindService = () => {
    if (contextData?.userData?.role === "client") {
      contextData?.dispatch({
        type: "CURRENT_CLIENT_TAB",
        value: "dashboard",
      });
      navigate("/clientdashboard");
    } else if (contextData?.userData?.role === "professional") {
      toast.warn("Fistly Register With Client Profile !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      navigate("/client-sign-up");
    }
  };
  const handleProjectsServices = () => {
    if (cookies?.user?.role === "client") {
      contextData?.dispatch({
        type: "CURRENT_CLIENT_TAB",
        value: "Ongoing",
      });
      navigate("/clientdashboard");
    } else if (cookies?.user?.role === "professional") {
      contextData?.dispatch({
        type: "CURRENT_PROFESSIONAL_TAB",
        value: "activities",
      });
      navigate("professionaldashboard");
    } else {
      navigate("join");
    }
  };
  const handleProfessionalServices = () => {
    if (cookies?.user?.role === "client") {
      contextData?.dispatch({
        type: "CURRENT_CLIENT_TAB",
        value: "browse",
      });
      navigate("/clientdashboard");
    } else if (cookies?.user?.role === "professional") {
      toast.warn("Fistly Register With Client Profile !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      navigate("/client-sign-up");
    }
  };

  const [plansType, setPlansType] = useState("monthly");
  const [plans, setPlans] = useState();
  useEffect(() => {
    axios
      .get("http://13.52.16.160:8082/stripe/subscription-plans/")
      .then((responce) => {
        setPlans(responce?.data?.data?.final_list);
      });
  }, []);

  return isRender ? (
    <>
      <HeaderHome />
      <HeroesSection />
      <section className="Find_Talent">
        <div className="container">
          <div className="find-text">
            <h2>Find Talent Your Way</h2>
          </div>
          <div className="find-inner">
            <div className="row">
              <div className="col-sm-6 col-lg mx-auto">
                <HomeServiceCard
                  text="Clients"
                  image={findIcon}
                  funtion={handleFindService}
                  navigate_icon={arrIcon}
                />
              </div>
              <div className="col-sm-6 col-lg mx-auto">
                <HomeServiceCard
                  text="Project"
                  image={findIcon2}
                  funtion={handleProjectsServices}
                  navigate_icon={arrIcon}
                />
              </div>
              <div className="col-sm-6 col-lg mx-auto">
                <HomeServiceCard
                  text="Browse Professionals"
                  image={findIcon4}
                  funtion={handleProfessionalServices}
                  navigate_icon={arrIcon}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="Top_Earners">
        <div className="container">
          <div className="Top_Earners_Ineer">
            <h2>Our Top Earners</h2>
          </div>
          <OwlCarousel
            className="owl-carousel top-slider owl-theme"
            {...options1}
          >
            <div className="item">
              <div className="henry-section">
                <div className="henry-img">
                  <img alt="" src={ourTeam} />
                  <div className="online"></div>
                </div>

                <div className="henry-text">
                  <h6>Henry Simatupang</h6>
                  <span>
                    <img alt="" src={projectImg} className="object-fit" />
                    100+ Projects Done
                  </span>
                </div>
              </div>
              <div className="add-hire">
                <div className="add-icon">
                  <div className="div">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star start-bg"></i>
                    <span>4.8</span>
                  </div>
                </div>

                <div className="add-btn">
                  <Link to="/">
                    <button>
                      Add/Hire
                      <img
                        alt=""
                        src="https://img.icons8.com/fluency-systems-regular/20/ffffff/long-arrow-right.png"
                      />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="henry-section">
                <div className="henry-img">
                  <img alt="" src={ourTeam} />
                  <div className="online"></div>
                </div>

                <div className="henry-text">
                  <h6>Henry Simatupang</h6>
                  <span>
                    <img alt="" src={projectImg} className="object-fit" />
                    100+ Projects Done
                  </span>
                </div>
              </div>
              <div className="add-hire">
                <div className="add-icon">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star start-bg"></i>
                  <span>4.8</span>
                </div>

                <div className="add-btn">
                  <Link to="/">
                    <button>
                      Add/Hire
                      <img
                        alt=""
                        src="https://img.icons8.com/fluency-systems-regular/20/ffffff/long-arrow-right.png"
                      />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="henry-section">
                <div className="henry-img">
                  <img alt="" src={ourTeam} />
                  <div className="online"></div>
                </div>

                <div className="henry-text">
                  <h6>Henry Simatupang</h6>
                  <span>
                    <img alt="" src={projectImg} className="object-fit" />
                    100+ Projects Done
                  </span>
                </div>
              </div>
              <div className="add-hire">
                <div className="add-icon">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star start-bg"></i>
                  <span>4.8</span>
                </div>

                <div className="add-btn">
                  <Link to="/">
                    <button>
                      Add/Hire
                      <img
                        alt=""
                        src="https://img.icons8.com/fluency-systems-regular/20/ffffff/long-arrow-right.png"
                      />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="henry-section">
                <div className="henry-img">
                  <img alt="" src={ourTeam} />
                  <div className="online"></div>
                </div>

                <div className="henry-text">
                  <h6>Henry Simatupang</h6>
                  <span>
                    <img alt="" src={projectImg} className="object-fit" />
                    100+ Projects Done
                  </span>
                </div>
              </div>
              <div className="add-hire">
                <div className="add-icon">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star start-bg"></i>
                  <span>4.8</span>
                </div>

                <div className="add-btn">
                  <Link to="/">
                    <button>
                      Add/Hire
                      <img
                        alt=""
                        src="https://img.icons8.com/fluency-systems-regular/20/ffffff/long-arrow-right.png"
                      />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="henry-section">
                <div className="henry-img">
                  <img alt="" src={ourTeam} />
                  <div className="online"></div>
                </div>

                <div className="henry-text">
                  <h6>Henry Simatupang</h6>
                  <span>
                    <img alt="" src={projectImg} className="object-fit" />
                    100+ Projects Done
                  </span>
                </div>
              </div>
              <div className="add-hire">
                <div className="add-icon">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star start-bg"></i>
                  <span>4.8</span>
                </div>

                <div className="add-btn">
                  <Link to="/">
                    <button>
                      Add/Hire
                      <img
                        alt=""
                        src="https://img.icons8.com/fluency-systems-regular/20/ffffff/long-arrow-right.png"
                      />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="henry-section">
                <div className="henry-img">
                  <img alt="" src={ourTeam} />
                  <div className="online"></div>
                </div>

                <div className="henry-text">
                  <h6>Henry Simatupang</h6>
                  <span>
                    <img alt="" src={ourTeam} className="object-fit" />
                    100+ Projects Done
                  </span>
                </div>
              </div>
              <div className="add-hire">
                <div className="add-icon">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star start-bg"></i>
                  <span>4.8</span>
                </div>

                <div className="add-btn">
                  <Link to="/">
                    <button>
                      Add/Hire
                      <img
                        alt=""
                        src="https://img.icons8.com/fluency-systems-regular/20/ffffff/long-arrow-right.png"
                      />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </OwlCarousel>
        </div>
      </section>
      <section className="Top_Earners Recent_Earners">
        <div className="container">
          <div className="Top_Earners_Ineer">
            <h2>Recent Earners</h2>
            {/* <!-- <h6>Fillter</h6> --> */}
          </div>
          <OwlCarousel
            className="owl-carousel Recent_Earners_Owl  owl-theme"
            {...options2}
          >
            <div className="item">
              <div className="henry-section">
                <div className="henry-img">
                  <img alt="" src={ourTeam} />
                  <div className="online"></div>
                </div>

                <div className="henry-text">
                  <h6>Henry Simatupang</h6>
                  <span>
                    <img alt="" src={projectImg} className="object-fit" />
                    100+ Projects Done
                  </span>
                </div>
              </div>
              <div className="add-hire">
                <div className="add-icon">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star start-bg"></i>
                  <span>4.8</span>
                </div>

                <div className="add-btn">
                  <Link to="/">
                    <button>
                      Add/Hire
                      <img
                        alt=""
                        src="https://img.icons8.com/fluency-systems-regular/20/ffffff/long-arrow-right.png"
                      />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="henry-section">
                <div className="henry-img">
                  <img alt="" src={ourTeam} />
                  <div className="online"></div>
                </div>

                <div className="henry-text">
                  <h6>Henry Simatupang</h6>
                  <span>
                    <img alt="" src={projectImg} className="object-fit" />
                    100+ Projects Done
                  </span>
                </div>
              </div>
              <div className="add-hire">
                <div className="add-icon">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star start-bg"></i>
                  <span>4.8</span>
                </div>

                <div className="add-btn">
                  <Link to="/">
                    <button>
                      Add/Hire
                      <img
                        alt=""
                        src="https://img.icons8.com/fluency-systems-regular/20/ffffff/long-arrow-right.png"
                      />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="henry-section">
                <div className="henry-img">
                  <img alt="" src={ourTeam} />
                  <div className="online"></div>
                </div>

                <div className="henry-text">
                  <h6>Henry Simatupang</h6>
                  <span>
                    <img alt="" src={projectImg} className="object-fit" />
                    100+ Projects Done
                  </span>
                </div>
              </div>
              <div className="add-hire">
                <div className="add-icon">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star start-bg"></i>
                  <span>4.8</span>
                </div>

                <div className="add-btn">
                  <Link to="/">
                    <button>
                      Add/Hire
                      <img
                        alt=""
                        src="https://img.icons8.com/fluency-systems-regular/20/ffffff/long-arrow-right.png"
                      />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="henry-section">
                <div className="henry-img">
                  <img alt="" src={ourTeam} />
                  <div className="online"></div>
                </div>

                <div className="henry-text">
                  <h6>Henry Simatupang</h6>
                  <span>
                    <img alt="" src={projectImg} className="object-fit" />
                    100+ Projects Done
                  </span>
                </div>
              </div>
              <div className="add-hire">
                <div className="add-icon">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star start-bg"></i>
                  <span>4.8</span>
                </div>

                <div className="add-btn">
                  <Link to="/">
                    <button>
                      Add/Hire
                      <img
                        alt=""
                        src="https://img.icons8.com/fluency-systems-regular/20/ffffff/long-arrow-right.png"
                      />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="henry-section">
                <div className="henry-img">
                  <img alt="" src={ourTeam} />
                  <div className="online"></div>
                </div>

                <div className="henry-text">
                  <h6>Henry Simatupang</h6>
                  <span>
                    <img alt="" src={projectImg} className="object-fit" />
                    100+ Projects Done
                  </span>
                </div>
              </div>
              <div className="add-hire">
                <div className="add-icon">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star start-bg"></i>
                  <span>4.8</span>
                </div>

                <div className="add-btn">
                  <Link to="/">
                    <button>
                      Add/Hire
                      <img
                        alt=""
                        src="https://img.icons8.com/fluency-systems-regular/20/ffffff/long-arrow-right.png"
                      />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="henry-section">
                <div className="henry-img">
                  <img alt="" src={ourTeam} />
                  <div className="online"></div>
                </div>

                <div className="henry-text">
                  <h6>Henry Simatupang</h6>
                  <span>
                    <img alt="" src={projectImg} className="object-fit" />
                    100+ Projects Done
                  </span>
                </div>
              </div>
              <div className="add-hire">
                <div className="add-icon">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star start-bg"></i>
                  <span>4.8</span>
                </div>

                <div className="add-btn">
                  <Link to="/">
                    <button>
                      Add/Hire
                      <img
                        alt=""
                        src="https://img.icons8.com/fluency-systems-regular/20/ffffff/long-arrow-right.png"
                      />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </OwlCarousel>
        </div>
      </section>

      <main className="dashboard-main pt-0" style={{ background: "#f6feff" }}>
        <div id="myactivity" className="container-fluid  myProjectTable">
          {/* <h2 className="ps-5">Subscription Plans</h2> */}
          <div className="">
            <main className="mt-4">
              <div className="container">
                {/* <!--Section: Content--> */}
                <section className="pt-3 text-center">
                  <h2 className="mb-4">
                    <strong>Pricing</strong>
                  </h2>

                  <div
                    className="btn-group pricing_btn mb-4"
                    role="group"
                    aria-label="Basic example"
                  >
                    <h3>Monthly billing</h3>
                  </div>

                  <div className="row gx-lg-5 mt-4">
                    {/* <!--Grid column--> */}
                    {plans?.map((item, index) => {
                      if (item?.plan_type === 'monthly') {
                        return (
                          <div
                            key={index}
                            className="col-lg-4 col-md-6 mb-4 my-2 subscription_plans"
                          >
                            {/* <!-- Card --> */}
                            <div className="card border ">
                              <div className="card-header py-3">
                                <p className=" mb-2">{item.name}</p>
                                <h5 className="mb-0">
                                  ${item?.amount}/Month
                                </h5>
                              </div>
                              <div className="card-body">
                                <ul className="list-group list-group-flush">
                                  <li className="list-group-item border-0 ">
                                    <b> Service Charge</b> :{" "}
                                    {item?.service_charge}%
                                  </li>
                                  <li className="list-group-item">
                                    <b> Storage</b> : {item?.storage}
                                  </li>
                                </ul>
                              </div>
                              <div className="card-footer p-0">
                                <button
                                  type="button"
                                  className="btn subscription_plans_btn"
                                >
                                  Buy now
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </section>
                {/* <!--Section: Content--> */}
              </div>
            </main>
          </div>
        </div>
      </main>

      <main className="dashboard-main pb-5" style={{ background: "#f6feff" }}>
        <div id="myactivity" className="container-fluid  myProjectTable">
          <div className="">
            <main className="">
              <div className="container">
                {/* <!--Section: Content--> */}
                <section className="pt-3 text-center">
                  <div
                    className="btn-group pricing_btn mb-4"
                    role="group"
                    aria-label="Basic example"
                  >
                    <h3>Annual billign</h3>
                  </div>

                  <div className="row gx-lg-5 mt-4">
                    {/* <!--Grid column--> */}
                    {plans?.map((item, index) => {
                      if (item?.plan_type === 'yearly') {
                        return (
                          <div
                            key={index}
                            className="col-lg-4 col-md-6 mb-4 my-2 subscription_plans"
                          >
                            {/* <!-- Card --> */}
                            <div className="card border ">
                              <div className="card-header py-3">
                                <p className=" mb-2">{item.name}</p>
                                <h5 className="mb-0">
                                  ${item?.amount}/Year
                                </h5>
                              </div>
                              <div className="card-body">
                                <ul className="list-group list-group-flush">
                                  <li className="list-group-item border-0 ">
                                    <b> Service Charge</b> :{" "}
                                    {item?.service_charge}%
                                  </li>
                                  <li className="list-group-item">
                                    <b> Storage</b> : {item?.storage}
                                  </li>
                                </ul>
                              </div>
                              <div className="card-footer p-0">
                                <button
                                  type="button"
                                  className="btn subscription_plans_btn"
                                >
                                  Buy now
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </section>
                {/* <!--Section: Content--> */}
              </div>
            </main>
          </div>
        </div>
      </main>

      <section className="our-top-clients-sec">
        <div className="container">
          <h2>Our Top Clients</h2>
        </div>
      </section>
      <section className="our-top-clients-images-sec">
        <div className="container">
          <div>
            <div className="card-box-our-top-clients p-xl-5 p-2">
              <div className="row p-2">
                <div className="col-md card border-0 text-center">
                  <img alt="" src={imgpsh1} />
                  <h5 className="pt-4 pb-3 m-0">Jack Nicholson </h5>
                  <p>Seo Manager</p>
                </div>
                <div className="col-md card border-0 text-center">
                  <img alt="" src={imgpsh2} />
                  <h5 className="pt-4 pb-3 m-0">Dwayne Johnson</h5>
                  <p>Ui Designer</p>
                </div>
                <div className="col-md card border-0 text-center">
                  <img alt="" src={imgpsh3} />
                  <h5 className="pt-4 pb-3 m-0">Ryan Reynolds</h5>
                  <p>Web Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="earners-review-carousel">
        <div className="container">
          {/* <!-- Carousel --> */}
          <div id="demo" className="carousel slide" data-bs-ride="carousel">
            {/* <!-- Indicators/dots --> */}
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#demo"
                data-bs-slide-to="0"
                className="active"
              ></button>
              <button
                type="button"
                data-bs-target="#demo"
                data-bs-slide-to="1"
              ></button>
              <button
                type="button"
                data-bs-target="#demo"
                data-bs-slide-to="2"
              ></button>
            </div>

            {/* { The slideshow/carousel } */}
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row">
                  <div className="col-md d-flex justify-content-md-end">
                    <div className="d-flex justify-content-md-end image-carousel-main">
                      <img
                        src={mohd}
                        alt="Los Angeles"
                        className="d-block object-fit"
                      />
                    </div>
                  </div>
                  <div className="col-md d-flex align-items-center flex-column justify-content-center pt-md-0 pt-4">
                    <img
                      alt=""
                      src={layer52}
                      className="align-self-start quotes-image-carousel"
                    />
                    <div className="carousel-caption pb-0 text-dark text-start">
                      <h3>Earners Review</h3>
                      <p>
                        I am a student and I wanted a side income and being a
                        student u have less time to work but if everything is in
                        your phone then it's easy, final I found something to
                        earn through online,
                      </p>
                    </div>
                    <div className="d-flex w-100">
                      <button
                        className="carousel-control-prev me-md-3 me-2"
                        type="button"
                        data-bs-target="#demo"
                        data-bs-slide="prev"
                      >
                        <span className="carousel-control-prev-icon"></span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#demo"
                        data-bs-slide="next"
                      >
                        <span className="carousel-control-next-icon"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row">
                  <div className="col-md d-flex justify-content-md-end">
                    <div className="d-flex justify-content-md-end image-carousel-main">
                      <img
                        src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                        alt="Chicago"
                        className="d-block object-fit"
                      />
                    </div>
                  </div>
                  <div className="col-md d-flex align-items-center flex-column justify-content-center pt-md-0 pt-4">
                    <img
                      alt=""
                      src={layer52}
                      className="align-self-start quotes-image-carousel"
                    />
                    <div className="carousel-caption pb-0 text-dark text-start">
                      <h3>Earners Review</h3>
                      <p>
                        I am a Doctor and I wanted a side income and being a
                        student u have less time to work but if everything is in
                        your phone then it's easy, final I found something to
                        earn through online,
                      </p>
                    </div>

                    <div className="d-flex w-100">
                      <button
                        className="carousel-control-prev me-md-3 me-2"
                        type="button"
                        data-bs-target="#demo"
                        data-bs-slide="prev"
                      >
                        <span className="carousel-control-prev-icon"></span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#demo"
                        data-bs-slide="next"
                      >
                        <span className="carousel-control-next-icon"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="row">
                  <div className="col-md d-flex justify-content-md-end">
                    <div className="d-flex justify-content-md-end image-carousel-main">
                      <img
                        src="https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                        alt="New York"
                        className="d-block object-fit"
                      />
                    </div>
                  </div>
                  <div className="col-md d-flex align-items-center flex-column justify-content-center pt-md-0 pt-4">
                    <img
                      alt=""
                      src={layer52}
                      className="align-self-start quotes-image-carousel"
                    />
                    <div className="carousel-caption pb-0 text-dark text-start">
                      <h3>Earners Review</h3>
                      <p>
                        I am a Plumber and I wanted a side income and being a
                        student u have less time to work but if everything is in
                        your phone then it's easy, final I found something to
                        earn through online,
                      </p>
                    </div>
                    <div className="d-flex w-100">
                      <button
                        className="carousel-control-prev me-md-3 me-2"
                        type="button"
                        data-bs-target="#demo"
                        data-bs-slide="prev"
                      >
                        <span className="carousel-control-prev-icon"></span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#demo"
                        data-bs-slide="next"
                      >
                        <span className="carousel-control-next-icon"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* {Left and right controls/icons} */}
          </div>
        </div>
      </section>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={1}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <Footer />
    </>
  ) : (
    <Loader />
  );
};

export default Home;
