import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import Button from "react-bootstrap/Button";
import { MdLanguage } from "react-icons/md";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Global from "../context/Global";
import useWindowSize from "../Hooks/useWindowSize";
import { useCookies } from "react-cookie";

const style = {
  color: "white",
  textDecoration: "none",
  fontFamily: "Raleway",
};

const buttonStyle = {
  border: 'none',
  color: '#fff',
  fontFamily: "Raleway",
  outline: "none",
  background: "none"
}
const Header2 = ({ link }) => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const contextData = useContext(Global);
  const logoutHandle = () => {
    setShow(false);
    localStorage.clear();
    contextData?.dispatch({ type: "LOG_OUT" });
    navigate("/");
  }
  return (
    <>
      <header className="create-account-header">
        <div className="container">
          <div className="row py-4 ">
            <div className="col d-flex align-items-center">
              <Link to={link ? "/categoryArchitecture" : "/"}>
                <img
                  src="/static/images/Quadra-transparrent-logo.png"
                  alt="logo"
                  style={{ height: "100px" }}
                />
              </Link>
              <ul className="ms-auto d-flex p-0 mb-0">
                <li>
                  {window.location.pathname === "/kickassform" && (
                    <Link to="/select-sign-in">Sign in</Link>
                  )}
                  {window.location.pathname === "/quadroterms" && (
                    <Link to="/select-sign-in">Sign in</Link>
                  )}
                  {window.location.pathname === "/setup" && (
                    <Link to="/select-sign-in">Sign in</Link>
                  )}
                  {window.location.pathname === "/login" && (
                    <Link to="/join">Sign up</Link>
                  )}
                  {window.location.pathname === '/categoryArchitecture' && (
                    <button onClick={() => { setShow(true) }} style={buttonStyle}>logout</button>
                  )}
                  {window.location.pathname === '/categoryvisualization' && (
                    <button onClick={() => { setShow(true) }} style={buttonStyle}>logout</button>
                  )}
                  {window.location.pathname === '/professional-buy-and-sale' && (
                    <button onClick={() => { setShow(true) }} style={buttonStyle}>logout</button>
                  )}
                </li>
              </ul>
              <Modal centered show={show} onHide={() => setShow(false)} style={{ zIndex: 1000000 }}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    Are you sure you want to Log out?
                  </Modal.Title>
                </Modal.Header>
                <Modal.Footer >
                  <Button
                    variant="secondary"
                    onClick={() => setShow(false)}>
                    Not Now
                  </Button>
                  <Button
                    className="theme-bg-color border-0"
                    onClick={logoutHandle}>
                    Sign Out
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

const HeaderHome = () => {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user_data')));

  const textClick = () => {
    $(".mobile-menu").css("top", "0");
  };

  const closeBtnClick = () => {
    $(".mobile-menu").css("top", "-100%");
  };
  const [businessClick, setBusinessClick] = useState(
    localStorage.getItem("Business")
  );
  const [show, setShow] = useState(false);
  const contextData = useContext(Global);
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      { pageLanguage: "en" },
      "google_translate_element"
    );
    console.log("wdidbhw");
  };
  return (
    <div>
      <header className="bg-black home-page-header">
        <div className="container">
          <nav>
            <div className="row">
              <div className="col-lg-3 col-md-4 col-7 ">
                <Link to="/">
                  <img
                    src="/static/images/Quadra-transparrent-logo.png"
                    alt="logo"
                    style={{ height: "100px" }}
                  />
                </Link>
              </div>
              <div className="col-lg-9 col-md-8 col-5 d-flex align-items-center">
                <div className="w-100 d-flex align-items-center justify-content-end">
                  <ul className="  align-items-center m-0 ps-0">
                    {!contextData?.userData && (
                      <li>
                        <Link
                          to="/join"
                          onClick={() => localStorage.removeItem("Business")}
                        >
                          Join
                        </Link>
                      </li>
                    )}
                    {contextData?.userData && (
                      <li>
                        <Link
                          to={
                            userData?.role === "client" ? "/clientdashboard" : "/professionaldashboard"
                          }
                          state={{ fromHomePage: true }}
                        >
                          <img
                            style={{
                              width: "60px",
                              height: "60px",
                              borderRadius: "50%",
                              outline: "4px solid white",
                            }}
                            src={contextData?.profileData?.user_image_url}
                            alt=""
                          />
                        </Link>
                      </li>
                    )}
                    {!contextData?.userData && (
                      <li>
                        <Link to="/select-sign-in">Sign In</Link>
                      </li>
                    )}
                    {contextData?.userData && (
                      <li>
                        <Link
                          to="/"
                          onClick={() => setShow(true)}
                        // onClick={() => {
                        //   localStorage.clear();
                        //   setUserData("");
                        // }}
                        >
                          Sign Out
                        </Link>
                      </li>
                    )}

                    <Modal centered show={show} onHide={() => setShow(false)}>
                      <Modal.Header closeButton>
                        <Modal.Title>
                          Are you sure you want to Log out?
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Footer>
                        <Button
                          variant="secondary"
                          onClick={() => setShow(false)}
                        >
                          Not Now
                        </Button>
                        <Button
                          className="theme-bg-color border-0"
                          onClick={() => {
                            closeBtnClick();
                            setShow(false);
                            localStorage.clear();
                            contextData?.dispatch({ type: "LOG_OUT" });
                          }}
                        >
                          Sign Out
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    {contextData?.userData?.role === "client" && (
                      <li>
                        <Link
                          to={
                            !contextData?.userData ? "/join" : "clientdashboard"
                          }
                        >
                          Business
                        </Link>
                      </li>
                    )}
                    {contextData?.userData?.role !== "professional" &&
                      contextData?.userData?.role !== "client" && (
                        <li>
                          <Link to="/client-sign-up">Business</Link>
                        </li>
                      )}

                    <div className="LanguageSelectBox">
                      <li
                        className="LanguageShow text-white"
                        onClick={googleTranslateElementInit}
                      >
                        <MdLanguage
                          style={{ color: "white", fontSize: "27px" }}
                        />
                      </li>
                      <li className="googleTranslateLanguageDropdown">
                        <div id="google_translate_element"></div>
                      </li>
                    </div>
                  </ul>
                  <div
                    onClick={textClick}
                    id="text1"
                    className="hamburger-button justify-content-between flex-column align-items-end "
                  >
                    <div className="line-1"></div>
                    <div className="line-2"></div>
                    <div className="line-3"></div>
                  </div>

                  <div id="myNav" className="mobile-menu">
                    <Link
                      to=""
                      onClick={closeBtnClick}
                      className="closebtn text-end"
                    >
                      &times;
                    </Link>
                    <div className="mobile-menu-content">
                      {/* <Link to="#">About</Link>
                                    <Link to="#">Services</Link>
                                    <Link to="#">Clients</Link>
                                    <Link to="#">Contact</Link>  */}

                      <ul className="  align-items-center m-0 ps-0">
                        {contextData?.userData && (
                          <>
                            <li>
                              <Link
                                to={
                                  userData?.role === "client"
                                    ? "/clientdashboard"
                                    : "/professionaldashboard"
                                }
                                state={{ fromHomePage: true }}
                              >
                                Dashboard
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/"
                                onClick={() => setShow(true)}
                              // onClick={() => {
                              //   localStorage.clear();
                              //   setUserData("");
                              // }}
                              >
                                Sign Out
                              </Link>
                            </li>
                          </>
                        )}
                        {!contextData?.userData && (
                          <>
                            <li>
                              <Link to="/join">Join</Link>
                            </li>
                            <li>
                              <Link to="/select-sign-in">Sign In</Link>
                            </li>
                          </>
                        )}

                        <li>
                          <Link
                            to="/join"
                            onClick={() =>
                              setBusinessClick(
                                localStorage.setItem("Business", true)
                              )
                            }
                          >
                            Businewdwadawss
                          </Link>
                        </li>
                        <li onClick={googleTranslateElementInit}>
                          <div id="google_translate_element">
                            <MdLanguage
                              style={{ color: "white", fontSize: "27px" }}
                            />
                          </div>
                        </li>
                        <li className="googleTranslateLanguageDropdown">
                          <div id="google_translate_element"></div>
                        </li>
                      </ul>
                      {/* <form className="headerSearchButton " action="action_page.php">
                                        <input type="text" placeholder="Search..." name="search">
                                        <button type="submit" className="theme-bg-color"><i className="fa fa-search"></i></button>
                                    </form>  */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

const Header3 = () => {
  const navigate = useNavigate();
  return (
    <>
      <header className="create-account-header">
        <div className="container">
          <div className="row py-4 ">
            <div className="col d-flex align-items-center">
              <Link to="/">
                <img src="/logoQuadra.png" alt="logo" />
              </Link>

              <ul className="ms-auto d-flex p-0 mb-0 ">
                <li>
                  {window.location.pathname === "/select-sign-in" ? (
                    ""
                  ) : (
                    <Link to="/select-sign-in" className="text-black" style={{color:"#fff !important"}}>
                      Sign In
                    </Link>
                  )}
                </li>
                {/* <li
                  className="language-select text-black"
                  onClick={languageClick}
                >
                  <div id="google_translate_element"></div>
                </li> */}
                {/* <div className="language-dropdown-slider">
                  <li className="m-0 py-1 border-bottom ">Hindi</li>
                  <li className="m-0 py-1 border-bottom ">French</li>
                  <li className="m-0 py-1 border-bottom ">Italic</li>
                  <li className="m-0 py-1 ">Dutch</li>
                </div> */}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

const ChatHeader = () => {
  const navigate = useNavigate();
  const profileDropdown = () => {
    $(".profile-edit-dropdown").slideToggle();
    $(".profileEdit-button i").toggleClass("i-rotate");
  };
  const contextData = useContext(Global);
  const [show, setShow] = useState(false);

  const [showNotificationBox, setShowNotificationBox] = useState(false);
  const [acceptProject, setAcceptProject] = useState(false);
  const [clientDetails, setClientDetails] = useState();
  const handleNotification = (res) => {
    axios
      .post("http://13.52.16.160:8082/client/particular_project_details", {
        professional_id: contextData?.userData?.user_id,
        user_token: contextData?.userData?.user_token,
        role: contextData?.userData?.role,
        project_id: res?.detail?.project_id,
      })
      .then((respo) => {
        if (respo?.data?.status === "Success") {
          if (clientDetails !== undefined) {
            navigate("/project-details", {
              state: {
                projectData: respo?.data?.data,
                clientDetails: clientDetails,
                isFromProfessionalNotification: true,
              },
            });
          }
        }
      });
  };
  const handleClientAcceptation = (client_id, client_project_id) => {
    axios
      .post("http://13.52.16.160:8082/client/particular_project_milestones", {
        client_id: contextData?.userData?.user_id,
        user_token: contextData?.userData?.user_token,
        role: contextData?.userData?.role,
        professional_id: client_id,
        project_id: client_project_id,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          axios
            .post(
              "http://13.52.16.160:8082/client/particular_project_details",
              {
                client_id: contextData?.userData?.user_id,
                user_token: contextData?.userData?.user_token,
                role: contextData?.userData?.role,
                project_id: client_project_id,
              }
            )
            .then((respo) => {
              if (respo?.data?.status === "Success") {
                if (clientDetails !== undefined) {
                  navigate("/project-details", {
                    state: {
                      projectDetails: { client_id, client_project_id },
                      projectData: respo?.data?.data,
                      milesStoneData: res?.data?.data,
                      isFromClientNotification: true,
                    },
                  });
                }
              }
            });
        }
      });
  };
  const widowSize = useWindowSize();
  const [notificationPageId, setNotificationPageId] = useState({
    page: 1,
    page_size: 10,
  });
  const [notificationArray, setNotificationArray] = useState();
  const handleNotificationBox = () => {
    contextData?.userData &&
      axios
        .post("http://13.52.16.160:8082/identity/get-notifications", {
          user_id: contextData?.userData?.user_id,
          user_token: contextData?.userData?.user_token,
          role: contextData?.userData?.role,
          ...notificationPageId,
        })
        .then((res) => {
          if (res?.data?.status === "Success") {
            contextData?.setNotification(res?.data?.data);
            setNotificationArray(res?.data?.data?.final_data?.reverse());
            setShowNotificationBox(!showNotificationBox);
          }
        });
  };

  const handleEditProfileButton = () => {
    axios.put("http://13.52.16.160:8082/identity/update_account", {
      user_id: contextData?.userData?.user_id,
      user_token: contextData?.userData?.user_token,
      role: contextData?.userData?.role,
    });
  };
  const bringnotificationCount = () => {
    axios
      .post("http://13.52.16.160:8082/identity/unread_notification_count", {
        user_id: contextData?.userData?.user_id,
        user_token: contextData?.userData?.user_token,
        role: contextData?.userData?.role,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          contextData?.setUnreadNotification(res?.data?.data?.unread_count);
        }
      });
  };
  return (
    <>
      <header className="dashboard-header bg-white custom-border-radius-one border-bottom">
        <div className="container ">
          <div className="row py-4">
            <div className="col-xxl-9 col-xl-8 col-lg-7 d-block  d-flex align-items-center  justify-content-between ">
              <Link
                to={
                  contextData?.userData?.role === "client"
                    ? "/clientdashboard"
                    : "/professionaldashboard"
                }
                className="text-decoration-none text-dark m-0 h2"
              >
                Dashboard
              </Link>
              <div
                className={`d-flex align-items-center ${widowSize.width > 992 ? "border-end" : ""
                  }  py-4`}
              >
                <div
                  className="dashboard-user-notification me-md-3 me-2"
                  onClick={() => {
                    showNotificationBox
                      ? setShowNotificationBox(false)
                      : handleNotificationBox();
                    bringnotificationCount();
                  }}
                >
                  <i className="fa-solid fa-bell"></i>
                  {contextData?.unreadNotification === 0 ? (
                    ""
                  ) : (
                    <div className="dashboard-user-notification-number">
                      {contextData?.unreadNotification}
                    </div>
                  )}
                  <div className="notificationDropdownBox"></div>
                  {showNotificationBox ? (
                    <div className="notificationDropdownBox">
                      <div
                        className="scroll-width-zero"
                        style={{
                          position: "relative",
                          maxHeight: "400px",
                          background: "#01a78a",
                          padding: "4px",
                          overflowY: "auto",
                        }}
                      >
                        {contextData?.notification.length === 0 ? (
                          <div className="text-white text-center">
                            No Messages To Display
                          </div>
                        ) : (
                          notificationArray &&
                          notificationArray.map((res, keys) => (
                            <div
                              key={keys}
                              className="message"
                              onClick={async () => {
                                setClientDetails({
                                  client_id: res?.detail?.client_id,
                                  client_project_id: res?.detail?.project_id,
                                });
                                if (
                                  res?.notification.includes(
                                    "You have received a Project request by the"
                                  )
                                ) {
                                  await handleNotification(res);
                                }
                                if (
                                  res?.notification.includes("accepted by the")
                                ) {
                                  await handleClientAcceptation(
                                    res?.detail?.professional_id,
                                    res?.detail?.project_id
                                  );
                                }
                              }}
                            >
                              <p>{new Date(res?.timestamp).toUTCString()}</p>
                              {res?.notification}
                            </div>
                          ))
                        )}
                        <div className="bg-white">
                          {contextData?.notification?.total_data > 10 && (
                            <button className="seeAllNotificationButton">
                              See All
                            </button>
                          )}
                        </div>
                        {contextData?.notification.length === 0 ? (
                          ""
                        ) : (
                          <div className="arrowMessageBox"></div>
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <Link
                  to="/chat"
                  className="dashboard-user-notification me-md-3 me-2"
                >
                  <img
                    src="/static/images/messageDots.png"
                    alt=""
                    className=""
                  />
                  {contextData?.unreadChatCount ? (
                    <div className="dashboard-user-notification-number">
                      {contextData?.unreadChatCount}
                    </div>
                  ) : (
                    ""
                  )}
                </Link>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-4 col-lg-5 d-flex align-items-center justify-content-md-end justify-content-center flex-wrap">
              {contextData?.userData?.role === "professional" ? (
                <div
                  onClick={() => {
                    axios
                      .post(
                        "http://13.52.16.160:8082/professional/professional_profile",
                        {
                          professional_id: contextData?.userData?.user_id,
                          user_token: contextData?.userData?.user_token,
                          role: "professional",
                        }
                      )
                      .then((respo) => {
                        navigate(
                          `/professionalprofile/${contextData?.userData?.user_id}`
                        );
                      });
                  }}
                >
                  <img
                    src={
                      contextData?.profileData &&
                      contextData?.profileData.user_image_url
                    }
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      cursor: "pointer",

                      borderRadius: "50%",
                    }}
                  />
                </div>
              ) : (
                <div>
                  <img
                    src={
                      contextData?.profileData &&
                      contextData?.profileData?.user_image_url
                    }
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      cursor: "pointer",

                      borderRadius: "50%",
                    }}
                  />
                </div>
              )}
              <div className="ps-3">
                <button
                  className="d-flex align-items-center profileEdit-button"
                  onClick={profileDropdown}
                >
                  <h4>
                    {contextData?.profileData && contextData?.profileData?.name}
                  </h4>
                  <i className="fa-solid fa-caret-down"></i>
                </button>
                <div className="profile-edit-dropdown">
                  <div className=" d-flex flex-column ">
                    <Link className="d-flex justify-content-center rounded-top">
                      <button onClick={handleEditProfileButton}>
                        Edit Profile
                      </button>
                    </Link>

                    <Link
                      to=""
                      className="d-flex justify-content-center rounded-bottom"
                    >
                      <button
                        onClick={() => {
                          setShow(true);
                        }}
                      >
                        Log Out
                      </button>
                    </Link>
                  </div>
                </div>
                <h6 className="m-0">
                  {contextData?.profileData && contextData?.profileData?.email}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Modal
        centered
        show={acceptProject}
        onHide={() => setAcceptProject(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Do You Want To Confirm The Project Request?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAcceptProject(false)}>
            Not Now
          </Button>
          <Button
            className="theme-bg-color border-0"
            onClick={() => {
              setAcceptProject(false);
            }}
          >
            Sign Out
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal centered show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to Log out?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Not Now
          </Button>
          <Button
            className="theme-bg-color border-0"
            onClick={() => {
              setShow(false);
              localStorage.clear();
              contextData?.dispatch({ type: "LOG_OUT" });
              navigate("/");
            }}
          >
            Sign Out
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const HeaderDashboard = () => {
  const navigate = useNavigate();
  const profileDropdown = () => {
    $(".profile-edit-dropdown").slideToggle();
    $(".profileEdit-button i").toggleClass("i-rotate");
  };
  const contextData = useContext(Global);
  const [show, setShow] = useState(false);
  const [showNotificationBox, setShowNotificationBox] = useState(false);
  const [acceptProject, setAcceptProject] = useState(false);
  const [clientDetails, setClientDetails] = useState();

  const handleNotification = (res) => {
    axios
      .post("http://13.52.16.160:8082/client/particular_project_details", {
        professional_id: contextData?.userData?.user_id,
        user_token: contextData?.userData?.user_token,
        role: contextData?.userData?.role,
        project_id: res?.detail?.project_id,
      })
      .then((respo) => {
        if (respo?.data?.status === "Success") {
          if (clientDetails) {
            navigate("/project-details", {
              state: {
                projectData: respo?.data?.data,
                clientDetails: clientDetails,
                isFromProfessionalNotification: true,
              },
            });
          }
        }
      });
  };
  const handleClientAcceptation = (client_id, client_project_id) => {
    axios
      .post("http://13.52.16.160:8082/client/particular_project_milestones", {
        client_id: contextData?.userData?.user_id,
        user_token: contextData?.userData?.user_token,
        role: contextData?.userData?.role,
        professional_id: client_id,
        project_id: client_project_id,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          axios
            .post(
              "http://13.52.16.160:8082/client/particular_project_details",
              {
                client_id: contextData?.userData?.user_id,
                user_token: contextData?.userData?.user_token,
                role: contextData?.userData?.role,
                project_id: client_project_id,
              }
            )
            .then((respo) => {
              if (respo?.data?.status === "Success") {
                if (clientDetails !== undefined) {
                  navigate("/project-details", {
                    state: {
                      projectDetails: { client_id, client_project_id },
                      projectData: respo?.data?.data,
                      milesStoneData: res?.data?.data,
                      isFromClientNotification: true,
                    },
                  });
                }
              }
            });
        }
      });
  };
  const widowSize = useWindowSize();
  const [notificationPageId, setNotificationPageId] = useState({
    page: 1,
    page_size: 10,
  });
  const [notificationArray, setNotificationArray] = useState();
  const handleNotificationBox = () => {
    contextData?.userData &&
      axios
        .post("http://13.52.16.160:8082/identity/get-notifications", {
          user_id: contextData?.userData?.user_id,
          user_token: contextData?.userData?.user_token,
          role: contextData?.userData?.role,
          ...notificationPageId,
        })
        .then((res) => {
          if (res?.data?.status === "Success") {
            contextData?.setNotification(res?.data?.data);
            setNotificationArray(res?.data?.data?.final_data?.reverse());
            setShowNotificationBox(!showNotificationBox);
          }
        });
  };
  const handleEditProfileButton = () => {
    axios
      .put("http://13.52.16.160:8082/identity/update_account", {
        user_id: contextData?.userData?.user_id,
        user_token: contextData?.userData?.user_token,
        role: contextData?.userData?.role,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          navigate("/edit-profile", { state: res?.data?.data });
        }
      });
  };

  const bringnotificationCount = () => {
    axios
      .post("http://13.52.16.160:8082/identity/unread_notification_count", {
        user_id: contextData?.userData?.user_id,
        user_token: contextData?.userData?.user_token,
        role: contextData?.userData?.role,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          contextData?.setUnreadNotification(res?.data?.data?.unread_count);
        }
      });
  };
  console.log(contextData.userData)
  return (
    <>
      <header className="dashboard-header bg-white custom-border-radius-one">
        <div className="container-fluid px-lg-5 px-md-4 px-3">
          <div className="row py-4">
            <div className="col-xxl-9 col-xl-8 col-lg-7 d-block  d-flex align-items-center  justify-content-between ">
              <Link
                to={
                  contextData?.userData?.role === "client"
                    ? "/clientdashboard"
                    : "/professionaldashboard"
                }
                className="text-decoration-none text-dark m-0 h2"
              >
                Dashboard
              </Link>
              <div
                className={`d-flex align-items-center ${widowSize?.width > 992 ? "border-end" : ""
                  }  py-4`}
              >
                <div
                  className="dashboard-user-notification me-md-3 me-2"
                  onClick={() => {
                    showNotificationBox
                      ? setShowNotificationBox(false)
                      : handleNotificationBox();
                    bringnotificationCount();
                  }}
                >
                  <i className="fa-solid fa-bell"></i>
                  {contextData?.unreadNotification === 0 ? (
                    ""
                  ) : (
                    <div className="dashboard-user-notification-number">
                      {contextData?.unreadNotification}
                    </div>
                  )}
                  <div className="notificationDropdownBox"></div>
                  {showNotificationBox ? (
                    <div className="notificationDropdownBox">
                      <div
                        className="scroll-width-zero"
                        style={{
                          position: "relative",
                          maxHeight: "400px",
                          background: "#01a78a",
                          padding: "4px",
                          overflowY: "auto",
                        }}
                      >
                        {notificationArray.length === 0 ? (
                          <div className="text-white text-center">
                            No Messages To Display
                          </div>
                        ) : (
                          notificationArray &&
                          notificationArray.map((res, keys) => (
                            <div
                              key={keys}
                              className="message"
                              onClick={() => {
                                setClientDetails({
                                  client_id: res?.detail?.client_id,
                                  client_project_id: res?.detail?.project_id,
                                });
                                if (
                                  res?.notification.includes(
                                    "You have received a Project request by the"
                                  )
                                ) {
                                  handleNotification(res);
                                }
                                if (
                                  res?.notification.includes("accepted by the")
                                ) {
                                  handleClientAcceptation(
                                    res?.detail?.professional_id,
                                    res?.detail?.project_id
                                  );
                                }
                              }}
                            >
                              <p>{new Date(res?.timestamp).toUTCString()}</p>
                              {res?.notification}
                            </div>
                          ))
                        )}
                        <div className="bg-white">
                          {contextData?.notification?.total_data > 10 && (
                            <button className="seeAllNotificationButton">
                              See All
                            </button>
                          )}
                        </div>
                        {contextData?.notification.length === 0 ? (
                          ""
                        ) : (
                          <div className="arrowMessageBox"></div>
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <Link
                  to="/chat"
                  className="dashboard-user-notification me-md-3 me-2"
                >
                  <img
                    src="/static/images/messageDots.png"
                    alt=""
                    className=""
                  />
                  {contextData?.unreadChatCount ? (
                    <div className="dashboard-user-notification-number">
                      {contextData?.unreadChatCount}
                    </div>
                  ) : (
                    ""
                  )}
                </Link>
              </div>
            </div>
            <div className="col-xxl-3 col-xl-4 col-lg-5 d-flex align-items-center justify-content-md-end justify-content-center flex-wrap">
              {contextData?.userData?.role === "professional" ? (
                <div
                  onClick={() => {
                    navigate(
                      `/professionalprofile/${contextData?.userData?.user_id}`
                    );
                  }}>
                  <img
                    src={
                      contextData?.profileData &&
                      contextData?.profileData?.user_image_url
                    }
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      cursor: "pointer",

                      borderRadius: "50%",
                    }}
                  />
                </div>
              ) : (
                <div>
                  <img
                    src={
                      contextData?.profileData &&
                      contextData?.profileData?.user_image_url
                    }
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      cursor: "pointer",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              )}
              <div className="ps-3">
                <button
                  className="d-flex align-items-center profileEdit-button"
                  onClick={profileDropdown}
                >
                  <h4>
                    {contextData?.profileData && contextData?.profileData?.name}
                  </h4>
                  <i className="fa-solid fa-caret-down"></i>
                </button>
                <div className="profile-edit-dropdown">
                  <div className=" d-flex flex-column ">
                    <Link
                      to=""
                      className="d-flex justify-content-center rounded-top"
                    >
                      <button onClick={handleEditProfileButton}>
                        Edit Profile
                      </button>
                    </Link>
                    <Link
                      to=""
                      className="d-flex justify-content-center rounded-bottom"
                    >
                      <button
                        onClick={() => {
                          setShow(true);
                        }}
                      >
                        Log Out
                      </button>
                    </Link>
                  </div>
                </div>
                <h6 className="m-0">
                  {contextData?.profileData && contextData?.profileData?.email}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Modal
        centered
        show={acceptProject}
        onHide={() => setAcceptProject(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Do You Want To Confirm The Project Request?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setAcceptProject(false)}>
            Not Now
          </Button>
          <Button
            className="theme-bg-color border-0"
            onClick={() => {
              setAcceptProject(false);
            }}
          >
            Sign Out
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal centered show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to Log out?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Not Now
          </Button>
          <Button
            className="theme-bg-color border-0"
            onClick={() => {
              setShow(false);
              localStorage.clear();
              contextData?.dispatch({ type: "LOG_OUT" });
              navigate("/");
            }}
          >
            Sign Out
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export { HeaderHome, Header2, Header3, ChatHeader, HeaderDashboard };