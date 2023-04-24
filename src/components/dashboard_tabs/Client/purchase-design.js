import React, { useState, useEffect, useContext } from "react";
import Global from "../../../context/Global";
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
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../Footer";
import ClientDashboardAside from "../../ClientDashboardAside";
import { HeaderDashboard } from "../../Header";
import ReactLotti from "../../../loader/ReactLotti";

const PurchaseDesign = () => {
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

  const [fileReport, setFileReport] = useState();

  const ReportDesign = () => {
    setShowReport(true);
  };

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
  // console.log(buysell_id);

  function handleChange_File(e) {
    const file = URL.createObjectURL(e.target.files[0]);
    let pdfFile = e.target.files[0].name;
    setAttachement(e.target.files[0]);
    setFileReport(pdfFile);
    setreportUpload(true);
    setAttachementError("");
  }

  useEffect(() => {
    // setLoading(true);
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
                setIsReander(true);
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
            // console.log( res?.data?.data );
          } else {
            setIsReander(true);
          }
        });
    } else {
      navigate("/select-sign-in");
    }
  }, [purchaseDesignsPagination]);

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

  return (
    <>
      <div className="dashboard">
        <div className="container-fluid h-100">
          <div className="row h-100 dashboard-theme-color">
            <div className="col-xxl-2 col-md-3 px-0 dashboard-theme-color">
              <ClientDashboardAside />
            </div>
            <div className="col-xxl-10 col-md-9 custom-border-radius-one dashboard-theme-skyblue px-0 dashboard-right-section">
              <HeaderDashboard />
              <div
                id="dashboard-menu-bar"
                className="container  px-md-4 px-3 pt-5"
              >
                <div className="ReportDesign">
                  <h2 style={{ color: "#01a78a" }} className="text-center">
                    Purchase Designs
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
                    <div className="row  pt-5 g-3">
                      {purchaseDesigns?.final_data?.map((res, index, key) => {
                        return (
                          <div className="col-xl-3 col-md-6   my-3" key={index}>
                            <div
                              className="card border-0 flex-row bg-dark text-white visibleForEdit"
                              style={{ height: "240px", borderRadius: "30px" }}
                            >
                              <img
                                src={`${res?.image}`}
                                className="card-img w-100"
                                style={{
                                  borderRadius: "30px",
                                  objectFit: "cover",
                                  height: "100%",
                                }}
                                alt="..."
                              />
                              <div
                                className="card-img-overlay"
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  flexDirection: "column",
                                  borderRadius: "30px",
                                  background:
                                    "linear-gradient(20deg, #000000a1, transparent)",
                                  padding: " 0 10px 20px 10px",
                                }}
                              >
                                <h4 className="card-title cardTitleVisible">
                                  ${res?.price}/ project
                                </h4>

                                <h4 className="card-title fs-20 visibleForEdit-cat">
                                  {res?.sub_category_name}
                                </h4>
                                <div className="row g-2">
                                  <div className="col-xxl-6 col-lg-12 col-6">
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
                                  <div className="col-xxl-6 col-lg-12 col-6">
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
                                  <div className="col-xxl-6 col-lg-12 col-6">
                                    <button
                                      className="btn btn-primary border-0"
                                      style={{
                                        width: "100%",
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
                                  <div className="col-xxl-6 col-lg-12 col-6">
                                    <button
                                      className="btn btn-primary border-0"
                                      style={{
                                        width: "100%",
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
                                  <div className="col-xxl-6 col-lg-12 col-6">
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
                        cancel
                      </Button>
                      <Button
                        type="submit"
                        className="theme-bg-color border-0"
                        onClick={ReportUpload}
                      >
                        {reportResposne ? <ReactLotti /> : "sure"}
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
                  fullscreen={true}
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
                              <img src={res} alt={res} />
                            ) : (
                              <video width="400" controls>
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default React.memo(PurchaseDesign);
