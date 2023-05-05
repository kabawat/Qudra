import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../Footer";
import { HeaderDashboard } from "../../Header";
import Dashboardside from "../../ProfessionalDashboardside";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { CiLocationOn } from "react-icons/ci";
import Pagination from "react-bootstrap/Pagination";
import { Modal } from "react-bootstrap";
import { FreeMode, Navigation } from "swiper";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

function ReportTab() {
  const [loading, setLoading] = useState(false);
  const [designsSold, setDesignsSold] = useState([]);
  const [specificProductData, setSpecificProductData] = useState([]);
  const [showPurchaseDesignModal, setShowPurchaseDesignModal] = useState(false);
  const [specificProductDataType, setSpecificProductDataType] = useState("");
  const [myProject, setMyProject] = useState([]);
  const [myProjectPageId, setMyProjectPageId] = useState({
    page: 1,
    page_size: 5,
  });
  const [cookies] = useCookies();
  //   {
  //     "professional_token":"7809dd24-7d3a-48db-a431-893fc760c28bpbkdf2_sha256$390000$t149Gz20RTMLHqgkXJc6CG$bd1GIWtQNou4hnukWnUoC4Qpy7i0XPvVvUhO7gZGYWA=c4fdf97d9075df70f4413d447041729b8f3afeee04373931c65b8b279f46d931",
  //     "professional_id":"254",
  //     "page":1,
  //     "page_size":10
  // }

  useEffect(() => {
    if (cookies?.user_data) {
      axios
        .post(
          "http://13.52.16.160:8082/professional/client_list_buysell_design_professional/",
          {
            professional_id: cookies?.user_data?.user_id,
            professional_token: cookies?.user_data?.user_token,
            ...myProjectPageId,
          }
        )
        .then((res) => {
          if (res?.data?.status === "Success") {
            // console.log(res.data.data);
            // setLoading(true);
            setDesignsSold(res?.data?.data);
            setMyProject(res?.data?.data);
          }
        });
    }
  }, [myProjectPageId]);
  const paginationArray = [];
  for (let i = 0; i < myProject?.total_data / myProjectPageId?.page_size; i++) {
    paginationArray.push(i + 1);
  }

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

  return (
    <>
      <div className="dashboard">
        <div className="container-fluid h-100">
          <div className="row h-100 dashboard-theme-color">
            <div className="col-xxl-2 col-md-3 col-lg-3 px-0 dashboard-theme-color">
              <Dashboardside />
            </div>
            <div className="col-xxl-10 col-md-9 col-lg-9 custom-border-radius-one  dashboard-theme-skyblue px-0 dashboard-right-section">
              <HeaderDashboard />
              {loading ? (
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={!loading}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              ) : (
                <main className="dashboard-main">
                  <div id="myactivity" className="container-fluid  ">
                    <h2 className="ps-5" style={{ color: "rgb(0, 167, 139)" }}>
                      Sold Designs{" "}
                    </h2>
                    <div className="m-xl-5 ">
                      {!designsSold?.final_data?.length ? (
                        <>
                          <div
                            style={{ minHeight: "600px " }}
                            className="d-flex w-100 justify-content-center align-items-center shadow"
                          >
                            <span className="h4">No Sold Designs To Show</span>
                          </div>
                        </>
                      ) : (
                        <div className="w-100 align-items-center">
                          {designsSold?.final_data?.length &&
                            designsSold?.final_data?.map((res, index) => {
                              const dateString = res.created_at;
                              const date = new Date(dateString);
                              const formattedDate = `${date.getDate()}-${
                                date.getMonth() + 1
                              }-${date.getFullYear()}`;

                              return (
                                <>
                                  <div
                                    className="row my-3"
                                    key={index}
                                    style={{
                                      border: "1px solid #adabab",
                                      borderRadius: "12px",
                                    }}
                                  >
                                    <div className="col-lg-2  d-flex flex-column py-3 ">
                                      <img
                                        src={res?.client_image}
                                        className="img-fluid "
                                        style={{
                                          borderRadius: "9%",
                                          maxHeight: "150px",
                                          width: "110px",
                                          maxWidth: "1500px",
                                          height: "110px",
                                        }}
                                        alt={res?.client_name}
                                      />
                                      <h4
                                        style={{
                                          color: "rgb(0, 167, 139)",
                                        }}
                                      >
                                        {res?.client_name}
                                      </h4>
                                    </div>
                                    <div className="col-lg-9  py-3 d-flex justify-content-center flex-column">
                                      <div className="row my-2 ">
                                        <div className="col-lg-6">
                                          <div>
                                            <h4>{res?.sub_category_name} </h4>
                                          </div>
                                          <div className="d-flex  ">
                                            <h4>Price:</h4>
                                            <h4 className="ms-4">
                                              $ {res?.price}
                                            </h4>
                                          </div>
                                        </div>
                                        <div className="col-lg-6">
                                          <div className="d-flex  ">
                                            <h4> Customize Price:</h4>
                                            <h4 className="ms-4">
                                              $ {res?.customize_price}
                                            </h4>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="row ">
                                        <div className="col-4">
                                          <button
                                            style={{
                                              border: "none",
                                              padding: "5px 22px",
                                              backgroundColor:
                                                "rgb(0, 167, 139)",
                                              color: "white",
                                              borderRadius: "10px  ",
                                            }}
                                            onClick={() => {
                                              setShowPurchaseDesignModal(true);
                                              handleImageAndVideoClick(
                                                [res],
                                                res?.image,
                                                "image"
                                              );
                                            }}
                                          >
                                            Preview Image
                                          </button>
                                        </div>
                                        <div className="col-4">
                                          {/* <div className="d-flex  ">
                                            <h4 className="ms-4">
                                              $ {res?.customize_price}
                                            </h4>
                                          </div> */}
                                          <button
                                            style={{
                                              border: "none",
                                              padding: "5px 22px",
                                              backgroundColor:
                                                "rgb(0, 167, 139)",
                                              color: "white",
                                              borderRadius: "10px  ",
                                            }}
                                            onClick={() => {
                                              setShowPurchaseDesignModal(true);
                                              handleImageAndVideoClick(
                                                [res],
                                                res?.video,
                                                "video"
                                              );
                                            }}
                                          >
                                            Preview Video
                                          </button>
                                        </div>
                                        <div className="col-4">
                                          <a
                                            href={res?.project_link}
                                            download={res?.project_link}
                                            style={{
                                              border: "none",
                                              padding: "5px 22px",
                                              backgroundColor:
                                                "rgb(0, 167, 139)",
                                              color: "white",
                                              borderRadius: "10px  ",
                                              textDecoration: "none",
                                            }}
                                          >
                                            Download
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                        </div>
                      )}
                    </div>
                    {myProject &&
                      myProject?.total_data > myProjectPageId?.page_size && (
                        <Pagination className="ps-5 paginationBoxProfessionalDashboard">
                          <Pagination.First
                            onClick={() => {
                              setMyProjectPageId({
                                page: 1,
                                ...myProjectPageId,
                              });
                            }}
                          />
                          <Pagination.Prev
                            onClick={() => {
                              setMyProjectPageId((prev) => ({
                                ...prev,
                                page:
                                  myProjectPageId?.page !== 1
                                    ? myProjectPageId?.page - 1
                                    : 1,
                              }));
                            }}
                          />
                          {paginationArray?.map((res, key) => (
                            <Pagination.Item
                              key={key}
                              active={myProjectPageId?.page === res}
                              onClick={() => {
                                setMyProjectPageId((prev) => ({
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
                              setMyProjectPageId((prev) => ({
                                ...prev,
                                page:
                                  paginationArray?.length !==
                                  myProjectPageId?.page
                                    ? myProjectPageId?.page + 1
                                    : myProjectPageId?.page,
                              }));
                            }}
                          />
                          <Pagination.Last
                            onClick={() => {
                              setMyProjectPageId((prev) => ({
                                ...prev,
                                page: paginationArray?.length,
                              }));
                            }}
                          />
                        </Pagination>
                      )}
                  </div>
                </main>
              )}
              <Modal
                className="clientProductDiplayModal"
                centered
                // fullscreen={ true }
                size="xl"
                animation={true}
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
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ReportTab;
