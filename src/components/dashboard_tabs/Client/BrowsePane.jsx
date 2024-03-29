import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Pagination from "react-bootstrap/Pagination";
import Rating from "@mui/material/Rating";
import { IoFilterOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { MultiSelect } from "react-multi-select-component";
import { Formik, Form } from "formik";
import "swiper/css/thumbs";
import "react-toastify/dist/ReactToastify.css";
import Global from "../../../context/Global";
import axios from "axios";
import { useCookies } from "react-cookie";
import ClientDashboardAside from "../../ClientDashboardAside";
import { HeaderDashboard } from "../../Header";
import Footer from "../../Footer";
import Loader from "../../Loader";
import { Backdrop, CircularProgress } from "@mui/material";
import ScrollToTop from "../../../Hooks/ScrollToTop";
import { Dropdown } from "react-bootstrap";
import { BaseUrl } from "../../../BaseUrl";
const BrowsePane = () => {
  const contextData = useContext(Global);
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const [showCatagory, setShowCatagory] = useState({});
  const [catagoriesDropdown, SetCatagoriesDropdown] = useState([]);
  const [suraj, setsuraj] = useState("");
  const [browserProfessionalSearchInput, setBrowserProfessionalSearchInput] =
    useState("");
  const [browseProfessionalData, setBrowserProfessionalData] = useState();
  const [defaultProfessionalProfile, setDefaultProfessionalProfile] = useState(
    []
  );
  const [filterProject, setFilterProject] = useState("sub_category");
  const [browseProfessinalPageId, setBrowseProfessionalPageId] = useState({
    page: 1,
    page_size: 12,
  });
  const [uploadSubCatagoryModal, setUploadSubCatagoryModal] = useState(false);

  const [catErr, setCatErr] = useState(false);

  const [isRender, setIsReander] = useState(false);
  useEffect(() => {
    if (cookies?.user_data) {
      if (cookies?.user_data?.category_selected) {
        if (cookies?.user_data?.role === "client") {
        } else {
          navigate("/professionaldashboard");
        }
      } else {
        if (cookies?.user_data?.role === "client") {
          navigate("/client-architechture");
        } else {
          navigate("/categoryArchitecture");
        }
      }
    } else {
      navigate("/select-sign-in");
    }
  }, []);

  useEffect(() => {
    if (cookies?.user_data && cookies?.user_data.role === "client") {
      !defaultProfessionalProfile?.length &&
        axios
          .post(`${BaseUrl}/client/browse_profesional_list`, {
            client_id: cookies?.user_data?.user_id,
            user_token: cookies?.user_data?.user_token,
            role: cookies?.user_data?.role,
            ...browseProfessinalPageId,
          })
          .then((res) => {
            if (res?.data?.status === "Success") {
              setIsReander(true);

              setDefaultProfessionalProfile(res?.data?.data);
            }
          });
    }
  }, [
    browseProfessinalPageId,
    contextData?.currentTabClientDashboard,
    uploadSubCatagoryModal,
  ]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [browseProfessinalPageId]);
  const paginationArray = [];
  for (
    let i = 0;
    i <
    defaultProfessionalProfile?.total_data / browseProfessinalPageId?.page_size;
    i++
  ) {
    paginationArray.push(i + 1);
  }

  const [browseProfessinalSearchPageId, setBrowseProfessionalSearchPageId] =
    useState({
      page: 1,
      page_size: 10,
    });
  const paginationSearchArray = [];
  for (
    let i = 0;
    i <
    browseProfessionalData?.total_data /
      browseProfessinalSearchPageId?.page_size;
    i++
  ) {
    paginationSearchArray.push(i + 1);
  }
  useEffect(() => {
    if (browserProfessionalSearchInput) {
      axios
        .post(`${BaseUrl}/client/search_professional`, {
          client_id: cookies?.user_data?.user_id,
          user_token: cookies?.user_data?.user_token,
          role: cookies?.user_data?.role,
          search_data: browserProfessionalSearchInput,
          ...browseProfessinalSearchPageId,
          filter_by: filterProject,
        })
        .then((res) => {
          if (res?.data?.status === "Success") {
            setBrowserProfessionalData(res?.data?.data);
          }
          if (res?.data?.status === "Failed") {
            setBrowserProfessionalData(null);
          }
        });
    } else {
      setBrowserProfessionalData(null);
    }
  }, [browseProfessinalSearchPageId]);

  const [clientSelectedCatagory, setClientSelectedCatagory] = useState();
  const uploadCatagory = () => {
    axios
      .post(`${BaseUrl}/client/client_selected_cat`, {
        client_id: cookies?.user_data?.user_id,
        user_token: cookies?.user_data?.user_token,
        role: cookies?.user_data?.role,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          setClientSelectedCatagory([res?.data?.response]);
        }
      });
  };

  useEffect(() => {
    if (!contextData?.static_architecture_design?.data?.length) {
      axios
        .get(`${BaseUrl}/quadra/sub_categories?category_id=1`)
        .then((res) => {
          contextData?.dispatch({
            type: "STATIC_ARCHITECTURE_DESIGN",
            value: res?.data,
          });
        });
    }

    if (!contextData?.static_visualization_design?.data?.length) {
      axios
        .get(`${BaseUrl}/quadra/sub_categories?category_id=2`)
        .then((res) => {
          contextData?.dispatch({
            type: "STATIC_VISUALIZATION_DESIGN",
            value: res?.data,
          });
        });
    }
    axios.get(`${BaseUrl}/quadra/sub_categories?category_id=3`).then((res) => {
      contextData?.dispatch({
        type: "STATIC_BUY_SALE_DESIGN",
        value: res?.data,
      });
    });
  }, []);

  const languagesArchitecture = [
    contextData?.static_architecture_design?.data &&
      contextData?.static_architecture_design?.data?.filter((ress) => {
        return ress !== "" ||
          null ||
          (clientSelectedCatagory &&
            clientSelectedCatagory[1].includes(ress?.sub_category_id))
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
        clientSelectedCatagory &&
        !clientSelectedCatagory[0][1]?.includes(res?.sub_category_id) && {
          label: res?.sub_category,
          value: res?.sub_category_id,
        }
      );
    });

  const newArchitecureOptionsArray =
    newCatagoriesArchitecture &&
    newCatagoriesArchitecture?.filter((res) => {
      return res !== false;
    });

  const languagesVisualization = [
    contextData?.static_visualization_design?.data &&
      contextData?.static_visualization_design?.data?.filter((ress) => {
        return ress !== "" ||
          null ||
          (clientSelectedCatagory &&
            clientSelectedCatagory[0][2]?.includes(ress?.sub_category_id))
          ? {
              label: ress?.sub_category,
              value: ress?.sub_category_id,
            }
          : "";
      }),
  ];
  const newCatagoriesVisualization =
    languagesVisualization[0] &&
    languagesVisualization[0]?.map((res) => {
      return (
        clientSelectedCatagory &&
        !clientSelectedCatagory[0][2].includes(res?.sub_category_id) && {
          label: res?.sub_category,
          value: res?.sub_category_id,
        }
      );
    });

  const newVisualizationOptionsArray =
    newCatagoriesVisualization &&
    newCatagoriesVisualization?.filter((res) => {
      return res !== false;
    });

  const languagesBuySale = [
    contextData?.static_buy_sale_design?.data &&
      contextData?.static_buy_sale_design?.data?.filter((ress) => {
        return ress !== "" ||
          null ||
          (clientSelectedCatagory &&
            clientSelectedCatagory[3].includes(ress?.sub_category_id))
          ? {
              label: ress?.sub_category,
              value: ress?.sub_category_id,
            }
          : "";
      }),
  ];
  const newCatagoriesBuySale =
    languagesBuySale[0] &&
    languagesBuySale[0].map((res) => {
      return (
        clientSelectedCatagory &&
        !clientSelectedCatagory[0][3]?.includes(res?.sub_category_id) && {
          label: res?.sub_category,
          value: res?.sub_category_id,
        }
      );
    });

  const newBuySaleOptionsArray =
    newCatagoriesBuySale &&
    newCatagoriesBuySale?.filter((res) => {
      return res !== false;
    });

  return (
    <>
      <div className="dashboard">
        <div className="container-fluid h-100">
          <div className="row h-100 dashboard-theme-color">
            <div className="col-xxl-2 col-md-3 col-lg-3 px-0 dashboard-theme-color">
              <ClientDashboardAside />
            </div>
            <div className="col-xxl-10 col-md-9 col-lg-9 custom-border-radius-one dashboard-theme-skyblue px-0 dashboard-right-section">
              <HeaderDashboard />
              {!isRender ? (
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={!isRender}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              ) : (
                <main className="dashboard-main">
                  <div
                    id="dashboard-menu-bar"
                    className="container-fluid  px-md-4 px-3"
                  >
                    <div className="find-visualizer">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (browserProfessionalSearchInput) {
                            setsuraj("suraj");
                            axios
                              .post(`${BaseUrl}/client/search_professional`, {
                                client_id: cookies?.user_data?.user_id,
                                user_token: cookies?.user_data?.user_token,
                                role: cookies?.user_data?.role,
                                search_data: browserProfessionalSearchInput,
                                ...browseProfessinalSearchPageId,
                                filter_by: filterProject,
                              })
                              .then((res) => {
                                if (res?.data?.status === "Success") {
                                  setBrowserProfessionalData(res?.data?.data);
                                } else setBrowserProfessionalData(null);
                              });
                          } else {
                            setBrowserProfessionalData(null);
                          }
                        }}
                      >
                        <h3 className="m-0">Find Professionals now easily</h3>
                        <div className="row">
                          <div className="col-lg-8 px-0">
                            <div className="d-flex">
                              <input
                                type={
                                  filterProject === "price_range"
                                    ? "number"
                                    : "text"
                                }
                                value={browserProfessionalSearchInput}
                                onInput={(e) => {
                                  setsuraj("");
                                  setBrowserProfessionalSearchInput(
                                    e?.target?.value
                                  );
                                  if (e.target.value === "") {
                                    setBrowserProfessionalData(null);
                                  }
                                }}
                                placeholder={`${
                                  filterProject === "sub_category"
                                    ? "Search Professional by Catagory Name"
                                    : ""
                                }${
                                  filterProject === "nation"
                                    ? "Search Professional by Country Name"
                                    : ""
                                }${
                                  filterProject === "price_range"
                                    ? "Search Professional by Price"
                                    : ""
                                }...`}
                                className="form-control my-4"
                              />

                              <button type="submit" className="mx-2 my-4">
                                <FaSearch color="#fff" />
                              </button>
                              <div className="position-relative d-flex justify-content-center align-items-center ms-5">
                                <Dropdown>
                                  <Dropdown.Toggle
                                    variant=""
                                    id="dropdown-basic"
                                  >
                                    <IoFilterOutline
                                      style={{
                                        fontSize: "30px",
                                        fontWeight: "bold",
                                      }}
                                    />
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu>
                                    <Dropdown.Item
                                      value="sub_category"
                                      onClick={() => {
                                        setFilterProject("sub_category");
                                        setBrowserProfessionalSearchInput("");
                                      }}
                                    >
                                      Category
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      value="nation"
                                      onClick={() => {
                                        setFilterProject("nation");
                                        setBrowserProfessionalSearchInput("");
                                      }}
                                    >
                                      Country
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      value="price_range"
                                      onClick={() => {
                                        setFilterProject("price_range");
                                        setBrowserProfessionalSearchInput("");
                                      }}
                                    >
                                      Price
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                              {/* <div className="position-relative d-flex justify-content-center align-items-center ms-5">
                                <IoFilterOutline style={{ fontSize: "30px" }} />
                                <select
                                  value={filterProject}
                                  onChange={(e) => {
                                    setFilterProject(e.target.value);
                                    setBrowserProfessionalSearchInput("");
                                  }}
                                  style={{
                                    position: "absolute",
                                    height: "100%",
                                    width: "100%",
                                    top: "-30px",
                                    opacity: "0",
                                    left: "0",
                                  }}
                                >
                                  <option value="sub_category" className="my-2">
                                    Category
                                  </option>
                                  <option value="nation" className="my-2">
                                    Country
                                  </option>
                                  <option value="price_range" className="my-2">
                                    Price
                                  </option>
                                </select>
                              </div> */}
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <button
                              className="clientUploadCatagoryButton"
                              onClick={() => {
                                uploadCatagory();
                                setUploadSubCatagoryModal(true);
                                setShowCatagory({
                                  ...showCatagory,
                                  isShowCatagory: true,
                                });
                              }}
                            >
                              Update Catagory
                            </button>
                          </div>
                        </div>
                        <button
                          type="reset"
                          onClick={() => {
                            setBrowserProfessionalSearchInput("");
                            setBrowserProfessionalData("");
                          }}
                        >
                          <img src="./static/images/reload.png" alt="" />
                        </button>
                      </form>
                      <div className="row">
                        {browserProfessionalSearchInput !== "" &&
                        suraj !== "" ? (
                          browseProfessionalData === null ? (
                            <>
                              <div
                                style={{ minHeight: "600px" }}
                                className="d-flex justify-content-center align-items-center"
                              >
                                <span className="h4">
                                  No Professional To Show
                                </span>
                              </div>
                            </>
                          ) : (
                            browseProfessionalData &&
                            browseProfessionalData?.final_data?.map((res) => (
                              <div className="col-xxl-4 col-lg-6  my-3">
                                <div className="item">
                                  <div className="henry-section">
                                    <div className="henry-img">
                                      <img src={res?.avatar} alt={res?.name} />
                                      <div className="online"></div>
                                    </div>
                                    <div className="henry-text">
                                      <h6
                                        style={{ textTransform: "capitalize" }}
                                      >
                                        {res?.name}
                                      </h6>
                                      <span>
                                        <img
                                          src="./static/images/project.png"
                                          className="object-fit"
                                          alt={res?.projects}
                                        />
                                        {res?.projects}+ Projects Done
                                      </span>
                                      <span style={{ fontWeight: "600" }}>
                                        Minimum Rate Per sq/mtr :
                                        <b
                                          style={{
                                            fontSize: "18px",
                                            marginLeft: "4px",
                                          }}
                                        >
                                          {" "}
                                          $ {res?.price_range}
                                        </b>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="add-hire">
                                    <Rating
                                      name="read-only"
                                      value={parseInt(res?.ratings)}
                                      readOnly
                                    />
                                    <div className="add-btn">
                                      <button
                                        onClick={() => {
                                          navigate(
                                            `/professionalprofile/${res?.professional_id}`
                                          );
                                          contextData?.dispatch({
                                            type: "PROFESSIONAL_USER_PROFILE_DATA",
                                            value: null,
                                          });
                                        }}
                                      >
                                        View Profile
                                        <img
                                          src="https://img.icons8.com/fluency-systems-regular/20/ffffff/long-arrow-right.png"
                                          alt="add/hire"
                                        />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          )
                        ) : (
                          defaultProfessionalProfile &&
                          defaultProfessionalProfile?.final_data?.map(
                            (res, key) => (
                              <div
                                className="col-xxl-4 col-lg-6  my-3"
                                key={key}
                              >
                                <div className="item">
                                  <div className="henry-section">
                                    <div className="henry-img">
                                      <img src={res?.avatar} alt={res?.name} />
                                      <div className="online"></div>
                                    </div>
                                    <div className="henry-text">
                                      <h6
                                        style={{ textTransform: "capitalize" }}
                                      >
                                        {res?.name}
                                      </h6>
                                      <span>
                                        <img
                                          src="./static/images/project.png"
                                          className="object-fit"
                                          alt={res?.projects}
                                        />
                                        {res?.projects}+ Projects Done
                                      </span>
                                      <span style={{ fontWeight: "600" }}>
                                        Minimum Rate Per sq.mtr :
                                        <b
                                          style={{
                                            fontSize: "18px",
                                            marginLeft: "4px",
                                          }}
                                        >
                                          {" "}
                                          $ {res?.price_range}
                                        </b>
                                      </span>
                                    </div>
                                  </div>
                                  <div className="add-hire">
                                    <Rating
                                      name="read-only"
                                      value={parseInt(res?.ratings)}
                                      readOnly
                                    />
                                    <div className="add-btn">
                                      <button
                                        onClick={() => {
                                          navigate(
                                            `/professionalprofile/${res?.professional_id}`
                                          );
                                          contextData?.dispatch({
                                            type: "PROFESSIONAL_USER_PROFILE_DATA",
                                            value: null,
                                          });
                                        }}
                                      >
                                        View Profile
                                        <img
                                          src="https://img.icons8.com/fluency-systems-regular/20/ffffff/long-arrow-right.png"
                                          alt="add/hire"
                                        />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          )
                        )}
                        <div>
                          {browserProfessionalSearchInput
                            ? browseProfessionalData &&
                              browseProfessionalData?.total_data >
                                browseProfessinalSearchPageId?.page_size && (
                                <Pagination className="ps-5 paginationBoxProfessionalDashboard">
                                  <Pagination.First
                                    onClick={() => {
                                      setBrowseProfessionalSearchPageId({
                                        page: 1,
                                        page_size: 10,
                                      });
                                    }}
                                  />
                                  <Pagination.Prev
                                    onClick={() => {
                                      setBrowseProfessionalSearchPageId(
                                        (prev) => ({
                                          ...prev,
                                          page:
                                            browseProfessinalSearchPageId?.page !==
                                            1
                                              ? browseProfessinalSearchPageId?.page -
                                                1
                                              : 1,
                                        })
                                      );
                                    }}
                                  />
                                  {paginationSearchArray?.map((res, key) => (
                                    <Pagination.Item
                                      key={key}
                                      active={
                                        browseProfessinalSearchPageId?.page ===
                                        res
                                      }
                                      onClick={() => {
                                        setBrowseProfessionalSearchPageId(
                                          (prev) => ({
                                            ...prev,
                                            page: res,
                                          })
                                        );
                                      }}
                                    >
                                      {res}
                                    </Pagination.Item>
                                  ))}
                                  <Pagination.Next
                                    onClick={() => {
                                      setBrowseProfessionalSearchPageId(
                                        (prev) => ({
                                          ...prev,
                                          page:
                                            paginationSearchArray?.length !==
                                            browseProfessinalSearchPageId?.page
                                              ? browseProfessinalSearchPageId?.page +
                                                1
                                              : browseProfessinalSearchPageId?.page,
                                        })
                                      );
                                    }}
                                  />

                                  <Pagination.Last
                                    onClick={() => {
                                      setBrowseProfessionalSearchPageId(
                                        (prev) => ({
                                          ...prev,
                                          page: paginationSearchArray?.length,
                                        })
                                      );
                                    }}
                                  />
                                </Pagination>
                              )
                            : defaultProfessionalProfile &&
                              defaultProfessionalProfile?.total_data >
                                browseProfessinalPageId?.page_size && (
                                <Pagination className="ps-5 paginationBoxProfessionalDashboard">
                                  <Pagination.First
                                    onClick={() => {
                                      setBrowseProfessionalPageId({
                                        page: 1,
                                        page_size: 10,
                                      });
                                    }}
                                  />
                                  <Pagination.Prev
                                    onClick={() => {
                                      setBrowseProfessionalPageId((prev) => ({
                                        ...prev,
                                        page:
                                          browseProfessinalPageId?.page !== 1
                                            ? browseProfessinalPageId?.page - 1
                                            : 1,
                                      }));
                                    }}
                                  />
                                  {paginationArray?.map((res, key) => (
                                    <Pagination.Item
                                      key={key}
                                      active={
                                        browseProfessinalPageId?.page === res
                                      }
                                      onClick={() => {
                                        setBrowseProfessionalPageId((prev) => ({
                                          ...prev,
                                          page: res,
                                        }));
                                      }}
                                    >
                                      {res}
                                    </Pagination.Item>
                                  ))}
                                  <Pagination.Next
                                    onClick={() => {
                                      setBrowseProfessionalPageId((prev) => ({
                                        ...prev,
                                        page:
                                          paginationArray?.length !==
                                          browseProfessinalPageId?.page
                                            ? browseProfessinalPageId?.page + 1
                                            : browseProfessinalPageId?.page,
                                      }));
                                    }}
                                  />
                                  <Pagination.Last
                                    onClick={() => {
                                      setBrowseProfessionalPageId((prev) => ({
                                        ...prev,
                                        page: paginationArray?.length,
                                      }));
                                    }}
                                  />
                                </Pagination>
                              )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="liked-saved"
                    className="container-fluid tab-pane fade"
                  >
                    <br />
                    <h3>Menu 2</h3>
                    <p>
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium, totam rem
                      aperiam.
                    </p>
                  </div>
                  <div
                    id="#Wallet-menu"
                    className="container-fluid tab-pane fade"
                  >
                    <br />
                    <h3>Menu 2</h3>
                    <p>
                      Sed ut perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium, totam rem
                      aperiam.
                    </p>
                  </div>

                  <Modal
                    size="lg"
                    centered
                    show={uploadSubCatagoryModal}
                    aria-labelledby="contained-modal-title-vcenter"
                    className="modalProfessionalDashboard"
                  >
                    <Modal.Header
                      closeButton
                      style={{ margin: "0 0 0 auto" }}
                      onClick={() => {
                        setCatErr(false);
                        setUploadSubCatagoryModal(false);
                      }}
                      className="border-0"
                    ></Modal.Header>
                    <Modal.Body>
                      <h4>Add Catagories </h4>
                      <div className="row">
                        <div>
                          {showCatagory?.isShowCatagory ? (
                            <div className="row pb-5 mb-3">
                              <div className="col">
                                <button
                                  type="button"
                                  className="ModalCategorySubmit mx-auto w-100"
                                  onClick={() => {
                                    setShowCatagory({
                                      catagory: "architecture",
                                      isShowCatagory: false,
                                      catagory_id: 1,
                                    });
                                    SetCatagoriesDropdown([]);
                                  }}
                                >
                                  Architecture Designs
                                </button>
                              </div>
                              <div className="col">
                                <button
                                  type="button"
                                  className="ModalCategorySubmit mx-auto w-100"
                                  onClick={() => {
                                    setShowCatagory({
                                      catagory: "visualization",
                                      isShowCatagory: false,
                                      catagory_id: 2,
                                    });
                                    SetCatagoriesDropdown([]);
                                  }}
                                >
                                  Visualization Designs
                                </button>
                              </div>
                              <div className="col">
                                <button
                                  type="button"
                                  className="ModalCategorySubmit mx-auto w-100"
                                  onClick={() => {
                                    setShowCatagory({
                                      catagory: "purchase",
                                      isShowCatagory: false,
                                      catagory_id: 3,
                                    });
                                    SetCatagoriesDropdown([]);
                                  }}
                                >
                                  Purchase Designs
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <Formik
                                initialValues={{
                                  new_sub_cat: "",
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                  if (catagoriesDropdown.length < 1) {
                                    setCatErr(true);
                                    return false;
                                  }
                                  axios
                                    .post(`${BaseUrl}/client/add_client_cat`, {
                                      client_id: cookies?.user_data?.user_id,
                                      user_token:
                                        cookies?.user_data?.user_token,
                                      role: cookies?.user_data?.role,
                                      category_id: showCatagory?.catagory_id,
                                      new_sub_cat: values?.new_sub_cat,
                                    })
                                    .then((res) => {
                                      if (res?.data?.status === "Success") {
                                        setUploadSubCatagoryModal(false);
                                        setShowCatagory({
                                          ...showCatagory,
                                          isShowCatagory: true,
                                        });
                                      }
                                    });
                                }}
                              >
                                {({ isSubmitting, setFieldValue }) => (
                                  <Form>
                                    <div className="row">
                                      <div className="col">
                                        {showCatagory?.catagory ===
                                          "architecture" && (
                                          <MultiSelect
                                            value={
                                              catagoriesDropdown &&
                                              catagoriesDropdown
                                            }
                                            options={
                                              newArchitecureOptionsArray &&
                                              newArchitecureOptionsArray
                                            }
                                            onChange={(catagoriesDropdown) => {
                                              setCatErr(false);
                                              setFieldValue(
                                                "new_sub_cat",
                                                catagoriesDropdown?.map(
                                                  (val) => val?.value
                                                )
                                              );
                                              SetCatagoriesDropdown(
                                                catagoriesDropdown
                                              );
                                            }}
                                          />
                                        )}
                                        {showCatagory?.catagory ===
                                          "visualization" && (
                                          <MultiSelect
                                            value={
                                              catagoriesDropdown &&
                                              catagoriesDropdown
                                            }
                                            options={
                                              newVisualizationOptionsArray &&
                                              newVisualizationOptionsArray
                                            }
                                            onChange={(catagoriesDropdown) => {
                                              setCatErr(false);
                                              setFieldValue(
                                                "new_sub_cat",
                                                catagoriesDropdown?.map(
                                                  (val) => val?.value
                                                )
                                              );
                                              SetCatagoriesDropdown(
                                                catagoriesDropdown
                                              );
                                            }}
                                          />
                                        )}
                                        {showCatagory?.catagory ===
                                          "purchase" && (
                                          <MultiSelect
                                            value={
                                              catagoriesDropdown &&
                                              catagoriesDropdown
                                            }
                                            options={
                                              newBuySaleOptionsArray &&
                                              newBuySaleOptionsArray
                                            }
                                            onChange={(catagoriesDropdown) => {
                                              setCatErr(false);
                                              setFieldValue(
                                                "new_sub_cat",
                                                catagoriesDropdown?.map(
                                                  (val) => val?.value
                                                )
                                              );
                                              SetCatagoriesDropdown(
                                                catagoriesDropdown
                                              );
                                            }}
                                          />
                                        )}
                                      </div>
                                    </div>
                                    {catErr ? (
                                      <p className="text-danger mt-3">
                                        Minimum one catagory required
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                    <div className="row mt-5 pb-5">
                                      <div className="col-sm d-flex justify-content-sm-end">
                                        <button
                                          type="button"
                                          className="ModalCategorySubmit mx-0"
                                          onClick={() => {
                                            setCatErr(false);
                                            setShowCatagory({
                                              ...showCatagory,
                                              isShowCatagory: true,
                                            });
                                          }}
                                        >
                                          Back
                                        </button>
                                      </div>
                                      <div className="col-sm">
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
                            </>
                          )}
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                </main>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default React.memo(BrowsePane);
