import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import { Modal, Button } from "react-bootstrap";
import { FreeMode, Navigation } from "swiper";
import { MdCloudUpload } from "react-icons/md";
import "swiper/css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import ClientDashboardAside from "../../ClientDashboardAside";
import { HeaderDashboard } from "../../Header";
import ReactLotti from "../../../loader/ReactLotti";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Global from "../../../context/Global";
import ReactLottie3 from "../../../loader/ReactLottie3";
const PurchaseDesign = () => {
  const contextData = useContext(Global);
  const [fileErr, setFileErr] = useState("none");
  const [islotti, setIslotti] = useState(false);
  const [
    newBothArchiteactureAndVisualization,
    setNewBothArchiteactureAndVisualization,
  ] = useState();
  const [date, setDate] = useState(null);
  const [purchaseDesigns, setPurchaseDesigns] = useState();
  const [showPurchaseDesignModal, setShowPurchaseDesignModal] = useState(false);
  const [specificProductData, setSpecificProductData] = useState([]);
  const [specificProductDataType, setSpecificProductDataType] = useState("");
  const [purchaseDesignsPagination, setPurchaseDesignsPagination] = useState({
    page: 1,
    page_size: 8,
  });
  const [cookies] = useCookies();
  const [show, setShow] = useState(false);
  const [designInfo, setDesignInfo] = useState();
  const [designIndex, setDesignindex] = useState();
  const navigate = useNavigate();
  const [isRender, setIsReander] = useState(false);
  const [showRepoert, setShowReport] = useState(false);
  const [query, setSetquery] = useState("");
  const [attachement, setAttachement] = useState("");
  const [buysell_id, setbuysell_id] = useState("");
  const [queryError, setQueryError] = useState("");
  const [attachementError, setAttachementError] = useState();
  const [reportUpload, setreportUpload] = useState(false);
  const [reportResposne, setreportResposne] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fileReport, setFileReport] = useState();
  const [loader, setLoader] = useState(false);
  const params = useParams();
  const validateQuery = () => {
    if (!query) {
      setreportResposne(false);
      setQueryError("Please enter your query");
    } else {
      setQueryError("");
    }
  };

  const validateAttachment = () => {
    if (attachement) {
      setAttachementError("");
    } else {
      setreportResposne(false);
      setAttachementError("Please upload a file");
    }
  };

  const formdata = new FormData();
  formdata.set("client_id", cookies?.user_data?.user_id);
  formdata.set("query ", query);
  formdata.set("client_token", cookies?.user_data?.user_token);
  formdata.set("attachment", attachement);
  formdata.set("buysell_payment_id", buysell_id);
  // useEffect(() => {}, [purchaseDesignsPagination]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [purchaseDesignsPagination]);
  useEffect(() => {
    if (cookies?.user_data) {
      axios
        .post("http://13.52.16.160:8082/client/purchased-projects/", {
          client_id: cookies?.user_data?.user_id,
          client_token: cookies?.user_data?.user_token,
          role: cookies?.user_data?.role,
          ...purchaseDesignsPagination,
        })
        .then((res) => {
          if (res?.data?.status === "Success") {
            setPurchaseDesigns(res?.data?.data);
            if (cookies?.user_data?.category_selected) {
              if (cookies?.user_data?.role === "client") {
                axios
                  .post(
                    "http://13.52.16.160:8082/professional/professional_profile",
                    {
                      client_id: cookies?.user_data?.user_id,
                      role: cookies?.user_data?.role,
                      user_token: cookies?.user_data?.user_token,
                      professional_id:
                        res?.data?.data?.final_data[0].professional_id,
                    }
                  )
                  .then((respo) => {
                    if (respo?.data?.status === "Success") {
                      axios
                        .post(
                          "http://13.52.16.160:8082/professional/professional_sub_cat",
                          {
                            client_id: cookies?.user_data?.user_id,
                            professional_id:
                              res?.data?.data?.final_data[0].professional_id,
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
                            setIsReander(true);
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
                            setIsReander(true);
                          }
                        });
                    } else {
                      navigate("/clientdashboard");
                    }
                  });
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
            setIsReander(true);
          }
        });
    } else {
      navigate("/select-sign-in");
    }
  }, [cookies?.user_data]);

  const ReportUpload = (e) => {
    e.preventDefault();
    setreportResposne(true);
    validateQuery();
    validateAttachment();
    if (!query || !attachement) {
      setreportResposne(false);
      return false;
    }
    if (cookies?.user_data) {
      axios
        .post("http://13.52.16.160:8082/client/report-design/", formdata)
        .then((res) => {
          setShowReport(false);
          setSetquery("");
          setQueryError("");
          setAttachementError("");
          setAttachement("");
          setFileReport("");
          setreportUpload(false);
          setreportResposne(false);
        });
    }
  };

  function handleChange_File(e) {
    const file = URL.createObjectURL(e.target.files[0]);
    let pdfFile = e.target.files[0].name;
    setAttachement(e.target.files[0]);
    setFileReport(pdfFile);
    setreportUpload(true);
    setAttachementError("");
  }

  useEffect(() => {
    axios
      .get("http://13.52.16.160:8082/quadra/sub_categories?category_id=1")
      .then((res) => {
        contextData?.dispatch({
          type: "STATIC_ARCHITECTURE_DESIGN",
          value: res?.data,
        });
      });
    axios
      .get("http://13.52.16.160:8082/quadra/sub_categories?category_id=2")
      .then((res) => {
        contextData?.dispatch({
          type: "STATIC_VISUALIZATION_DESIGN",
          value: res?.data,
        });
      });
  }, []);

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

  useEffect(() => {
    ark && viz && setNewBothArchiteactureAndVisualization([...ark, ...viz]);
  }, [showModal]);

  const handleImageAndVideoClick = (images, url, type) => {
    setSpecificProductDataType(type);
    if (type === "image") {
      images?.map((res, index) => {
        setSpecificProductData((prev) => [...prev, res.image]);
      });
    } else {
      images?.map((res, index) => {
        setSpecificProductData((prev) => [...prev, res.video]);
      });
    }
  };

  const purchaseDesignsArray = [];
  for (
    let i = 0;
    i < purchaseDesigns?.total_data / purchaseDesignsPagination?.page_size;
    i++
  ) {
    purchaseDesignsArray?.push(i + 1);
  }

  //function called on purchased design button////
  const handalSubmit = (data, index) => {
    axios
      .post("http://13.52.16.160:8082/client/purchase/buy-sell-design/", {
        client_id: cookies?.user_data?.user_id,
        client_token: cookies?.user_data?.user_token,
        role: "client",
        professioanl_id: data?.professional_id,
        category_id: data?.category_id,
        sub_category_id: data?.sub_category_id,
        design_no: index,
      })
      .then((result) => {
        const url = result?.data?.data?.project_url;
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", url.split("/")[5]); // you can set the filename here
        document.body.appendChild(link);
        link.click();
        setShow(false);
      });
  };

  const downloadInvoice = (payload) => {
    const url = payload?.invoice_url;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", url.split("/")[5]);
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
  };

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
              <div id="dashboard-menu-bar" className="px-md-4 px-3 pt-5">
                <div className="ReportDesign ">
                  <h2 style={{ color: "#01a78a" }} className="text-center">
                    Purchased Designs
                  </h2>
                </div>
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
                  <div>
                    <div className="row  pt-5 g-3 ">
                      {purchaseDesigns?.final_data?.map((res, index, key) => {
                        return (
                          // <div className="col-xl-3 col-md-6   my-3" key={index}>
                          //   <div
                          //     className="card border-0 flex-row bg-dark text-white visibleForEdit"
                          //     style={{ height: "240px", borderRadius: "30px" }}
                          //   >
                          //     <img
                          //       src={`${res?.image}`}
                          //       className="card-img w-100"
                          //       style={{
                          //         borderRadius: "30px",
                          //         objectFit: "cover",
                          //         height: "100%",
                          //       }}
                          //       alt="..."
                          //     />
                          //     <div
                          //       className="card-img-overlay"
                          //       style={{
                          //         display: "flex",
                          //         justifyContent: "flex-end",
                          //         flexDirection: "column",
                          //         borderRadius: "30px",
                          //         background:
                          //           "linear-gradient(20deg, #000000a1, transparent)",
                          //         padding: " 0 10px 20px 10px",
                          //       }}
                          //     >
                          //       <h4 className="card-title cardTitleVisible">
                          //         ${res?.price}/ project
                          //       </h4>

                          //       <h4 className="card-title fs-20 visibleForEdit-cat">
                          //         {res?.sub_category_name}
                          //       </h4>
                          //       <div className="row g-2">
                          //         <div className="col-xxl-6 col-lg-12 col-6">
                          //           <button
                          //             type="button"
                          //             className="btn btn-primary border-0"
                          //             style={{
                          //               width: "100%",
                          //               fontSize: "14px",
                          //               backgroundColor: "rgb(0, 167, 139)",
                          //             }}
                          //             onClick={() => {
                          //               setShowPurchaseDesignModal(true);
                          //               handleImageAndVideoClick(
                          //                 [res],
                          //                 purchaseDesigns?.image,
                          //                 "image"
                          //               );
                          //             }}
                          //           >
                          //             Preview Images
                          //           </button>
                          //         </div>
                          //         <div className="col-xxl-6 col-lg-12 col-6">
                          //           <button
                          //             type="button"
                          //             className="btn btn-primary border-0"
                          //             style={{
                          //               width: "100%",
                          //               fontSize: "14px",
                          //               backgroundColor: "rgb(0, 167, 139)",
                          //             }}
                          //             onClick={() => {
                          //               setShowPurchaseDesignModal(true);
                          //               handleImageAndVideoClick(
                          //                 [res],
                          //                 purchaseDesigns?.video,
                          //                 "video"
                          //               );
                          //             }}
                          //           >
                          //             Preview Videos
                          //           </button>
                          //         </div>
                          //         <div className="col-xxl-6 col-lg-12 col-6">
                          //           <button
                          //             className="btn btn-primary border-0"
                          //             style={{
                          //               width: "100%",
                          //               fontSize: "14px",
                          //               backgroundColor: "rgb(0, 167, 139)",
                          //             }}
                          //             type="button"
                          //             onClick={() => {
                          //               setShow(true);
                          //               setDesignInfo(res);
                          //               setDesignindex(index);
                          //             }}
                          //           >
                          //             Download
                          //           </button>
                          //         </div>
                          //         <div className="col-xxl-6 col-lg-12 col-6">
                          //           <button
                          //             className="btn btn-primary border-0"
                          //             style={{
                          //               width: "100%",
                          //               fontSize: "14px",
                          //               backgroundColor: "rgb(0, 167, 139)",
                          //             }}
                          //             type="button"
                          //             onClick={() => {
                          //               setShowReport(true);
                          //               setbuysell_id(res.id);
                          //             }}
                          //           >
                          //             Report
                          //           </button>
                          //         </div>
                          //         <div className="col-xxl-6 col-lg-12 col-6">
                          //           <button
                          //             className="btn btn-primary border-0"
                          //             style={{
                          //               width: "100%",
                          //               fontSize: "13px",
                          //               backgroundColor: "rgb(0, 167, 139)",
                          //             }}
                          //             type="button"
                          //             onClick={() => {
                          //               downloadInvoice(res);
                          //             }}
                          //           >
                          //             Download invoice
                          //           </button>
                          //         </div>
                          //       </div>
                          //     </div>
                          //   </div>

                          // </div>
                          <div
                            className="container   "
                            key={index}
                            style={{ width: "90%" }}
                          >
                            <div
                              className="row   p-3 my-2"
                              style={{
                                borderRadius: "8px",
                                border: "1px solid #ccc6c6",
                                backgroundColor: "#FFFFFF",
                              }}
                            >
                              <div className="col-xl-1 col-xl-2 ">
                                <img
                                  src={`${res?.image}`}
                                  className="card-img w-100"
                                  style={{
                                    borderRadius: "10px",
                                    objectFit: "cover",
                                    height: "100%",
                                  }}
                                  alt="..."
                                />
                              </div>
                              <div className="col-xl-11 col-xl-10 d-flex justify-content-center  flex-column">
                                <div className="row">
                                  <h5
                                    className=" "
                                    style={{ fontWeight: "bold" }}
                                  >
                                    <span style={{ color: "#01a78a" }}>
                                      {" "}
                                      Price :{" "}
                                    </span>{" "}
                                    ${res?.price} &nbsp; &nbsp; &nbsp;
                                    <span style={{ color: "#01a78a" }}>
                                      {" "}
                                      Customization Price :{" "}
                                    </span>{" "}
                                    ${res?.price}/sq. mtr
                                  </h5>
                                  <h6
                                    className=" my-2 "
                                    style={{ fontWeight: "bold" }}
                                  >
                                    {res?.sub_category_name}
                                  </h6>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <button
                                      type="button"
                                      className="btn btn-primary border-0"
                                      style={{
                                        width: "100%",

                                        fontSize: "14px",
                                        backgroundColor: "rgb(0, 167, 139)",
                                      }}
                                      onClick={() => {
                                        setShowPurchaseDesignModal(true);
                                        handleImageAndVideoClick(
                                          [res],
                                          purchaseDesigns?.image,
                                          "image"
                                        );
                                      }}
                                    >
                                      Preview Images
                                    </button>
                                  </div>
                                  <div className="col">
                                    <button
                                      type="button"
                                      className="btn btn-primary border-0"
                                      style={{
                                        width: "100%",
                                        fontSize: "14px",
                                        backgroundColor: "rgb(0, 167, 139)",
                                      }}
                                      onClick={() => {
                                        setShowPurchaseDesignModal(true);
                                        handleImageAndVideoClick(
                                          [res],
                                          purchaseDesigns?.video,
                                          "video"
                                        );
                                      }}
                                    >
                                      Preview Videos
                                    </button>
                                  </div>
                                  <div className="col">
                                    <button
                                      className="btn btn-primary border-0"
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        fontSize: "14px",
                                        backgroundColor: "rgb(0, 167, 139)",
                                      }}
                                      type="button"
                                      onClick={() => {
                                        setShow(true);
                                        setDesignInfo(res);
                                        setDesignindex(index);
                                      }}
                                    >
                                      Download
                                    </button>
                                  </div>
                                  <div className="col">
                                    <button
                                      className="btn btn-primary border-0"
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                        fontSize: "14px",
                                        backgroundColor: "rgb(0, 167, 139)",
                                      }}
                                      type="button"
                                      onClick={() => {
                                        setShowReport(true);
                                        setbuysell_id(res.id);
                                      }}
                                    >
                                      Report
                                    </button>
                                  </div>
                                  <div className="col ">
                                    <button
                                      className="btn btn-primary border-0"
                                      style={{
                                        width: "100%",
                                        fontSize: "13px",
                                        backgroundColor: "rgb(0, 167, 139)",
                                      }}
                                      type="button"
                                      onClick={() => {
                                        downloadInvoice(res);
                                      }}
                                    >
                                      Download invoice
                                    </button>
                                  </div>
                                  <div className="col ">
                                    <button
                                      className="btn btn-primary border-0"
                                      style={{
                                        // width: "100%",
                                        height: "100%",
                                        fontSize: "13px",
                                        backgroundColor: "rgb(0, 167, 139)",
                                      }}
                                      type="button"
                                      onClick={() => {
                                        setShowModal(res);
                                      }}
                                    >
                                      Customize
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {purchaseDesignsArray?.length !== 0 ? (
                      purchaseDesigns?.total_data > 8 ? (
                        <Pagination className="ps-5 paginationBoxProfessionalDashboard">
                          <Pagination.First
                            onClick={() => {
                              setPurchaseDesignsPagination({
                                page: 1,
                                page_size: 8,
                              });
                            }}
                          />
                          <Pagination.Prev
                            onClick={() => {
                              setPurchaseDesignsPagination((prev) => ({
                                ...prev,
                                page:
                                  purchaseDesignsPagination?.page !== 1
                                    ? purchaseDesignsPagination?.page - 1
                                    : 1,
                              }));
                            }}
                          />
                          {purchaseDesignsArray?.map((res, key) => (
                            <Pagination.Item
                              key={key}
                              active={purchaseDesignsPagination?.page === res}
                              onClick={() => {
                                setPurchaseDesignsPagination((prev) => ({
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
                              setPurchaseDesignsPagination((prev) => ({
                                ...prev,
                                page:
                                  purchaseDesignsArray?.length !==
                                  purchaseDesignsPagination?.page
                                    ? purchaseDesignsPagination?.page + 1
                                    : purchaseDesignsPagination?.page,
                              }));
                            }}
                          />
                          <Pagination.Last
                            onClick={() => {
                              setPurchaseDesignsPagination((prev) => ({
                                ...prev,
                                page: purchaseDesignsArray?.length,
                              }));
                            }}
                          />
                        </Pagination>
                      ) : null
                    ) : (
                      <div
                        style={{ minHeight: "600px" }}
                        className="d-flex justify-content-center align-items-center"
                      >
                        <div className="h4">No Purchased Designs</div>
                      </div>
                    )}
                  </div>
                )}

                <Modal centered show={showRepoert} className="'MainReport">
                  <form>
                    <Modal.Header
                      closeButton
                      onClick={() => {
                        setShowReport(false);
                        setSetquery("");
                        setQueryError("");
                        setAttachementError("");
                        setAttachement("");
                        setFileReport("");
                        setreportUpload(false);
                        setreportResposne(false);
                      }}
                    >
                      {" "}
                      <Modal.Title>Are you sure want to Report?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="reportFormData">
                        <div>
                          <div>
                            <textarea
                              placeholder="What is your query ?"
                              rows="5"
                              name="comment[text]"
                              id="comment_text"
                              cols="40"
                              class="ui-autocomplete-input"
                              autocomplete="off"
                              role="textbox"
                              aria-autocomplete="list"
                              aria-haspopup="true"
                              value={query}
                              onChange={(e) => {
                                setSetquery(e.target.value);
                                validateQuery();
                              }}
                            ></textarea>
                          </div>
                        </div>
                        {queryError && (
                          <div className="Report text-danger">{queryError}</div>
                        )}

                        <input
                          style={{ display: "none" }}
                          type="file"
                          className="queryBox"
                          onChange={handleChange_File}
                          id="attachement"
                        />
                        <label
                          htmlFor="attachement"
                          className="input-path-label  mt-4 p-3 "
                        >
                          <span>
                            <MdCloudUpload
                              size={40}
                              color={"rgb(1, 167, 138)"}
                              margin-left={"10px"}
                            />
                          </span>
                          {reportUpload ? (
                            <p className="Report"> {fileReport}</p>
                          ) : (
                            <p className="Report">Upload File</p>
                          )}
                        </label>
                      </div>
                      {attachementError && (
                        <p className=" text-danger">{attachementError}</p>
                      )}
                    </Modal.Body>

                    <Modal.Footer className="d-flex justify-content-start">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setShowReport(false);
                          setSetquery("");
                          setQueryError("");
                          setAttachementError("");
                          setAttachement("");
                          setFileReport("");
                          setreportUpload(false);
                          setreportResposne(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="theme-bg-color border-0"
                        onClick={ReportUpload}
                        style={{ padding: reportResposne ? "0px" : null }}
                      >
                        {reportResposne ? <ReactLotti /> : "Submit"}
                      </Button>
                    </Modal.Footer>
                  </form>
                </Modal>

                <Modal centered show={show} onHide={() => setShow(false)}>
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body>
                    <Modal.Title>
                      Are you sure want to download this design
                    </Modal.Title>
                  </Modal.Body>

                  <Modal.Footer className="d-flex justify-content-start">
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      cancel
                    </Button>
                    <Button
                      className="theme-bg-color border-0"
                      onClick={() => handalSubmit(designInfo, designIndex)}
                    >
                      sure
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Modal
                  className="clientProductDiplayModal"
                  centered
                  // fullscreen={true}
                  animation={true}
                  size="xl"
                  show={showPurchaseDesignModal}
                  onHide={() => {
                    setShowPurchaseDesignModal(false);
                    setSpecificProductData([]);
                    setSpecificProductDataType("");
                  }}
                >
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body className=" p-0">
                    <Swiper
                      style={{
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                      }}
                      spaceBetween={10}
                      navigation={true}
                      modules={[FreeMode, Navigation]}
                    >
                      {specificProductData &&
                        specificProductData.map((res) => (
                          <SwiperSlide>
                            {specificProductDataType === "image" ? (
                              <img
                                src={res}
                                alt={res}
                                style={{ maxHeight: "532px" }}
                              />
                            ) : (
                              <video
                                width="400"
                                controls
                                autoPlay
                                style={{ maxHeight: "532px" }}
                              >
                                <source src={res} type="video/mp4" />
                                <source src={res} type="video/ogg" />
                                Your browser does not support HTML video.
                              </video>
                            )}
                          </SwiperSlide>
                        ))}
                    </Swiper>
                  </Modal.Body>
                </Modal>

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
                        formdata.set("customize", true);
                        formdata.set("description ", values?.description);
                        formdata.set(
                          "user_token",
                          cookies?.user_data?.user_token
                        );
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
                          new Date(values?.time)
                            ?.toLocaleString("en-US")
                            .split(",")[0]
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
                                <option
                                  selected="true"
                                  value={""}
                                  disabled="disabled"
                                >
                                  Select The Catagory
                                </option>
                                {newBothArchiteactureAndVisualization?.map(
                                  (res, key) => (
                                    <option key={key} value={res?.value}>
                                      {res?.label}
                                    </option>
                                  )
                                )}
                              </Field>
                              <ErrorMessage
                                name="work_assigned"
                                component="div"
                                className="mt-2 text-danger"
                              />
                            </div>
                            <div className=" col-md-6 ">
                              <Field
                                name="name"
                                type="text"
                                placeholder="Project Name"
                              />
                              <ErrorMessage
                                name="name"
                                component="div"
                                className="mt-2 text-danger"
                              />
                            </div>
                            <div className="col-md-6 ">
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
                            <div
                              className="col-md-6 "
                              style={{ position: "relative" }}
                            >
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
                          <button
                            type="submit"
                            disabled={islotti ? true : false}
                          >
                            {islotti ? <ReactLottie3 /> : "submit"}
                          </button>
                        </Form>
                      )}
                    </Formik>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(PurchaseDesign);
