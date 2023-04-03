import React, { useState, useEffect, useContext } from "react";
import Global from "../../../context/Global";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import { Modal } from "react-bootstrap";
import { FreeMode, Navigation } from "swiper";
import "swiper/css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";
import Footer from "../../Footer";
import ClientDashboardAside from "../../ClientDashboardAside";
import { HeaderDashboard } from "../../Header";
const PurchaseDesign = () => {
    const [purchaseDesigns, setPurchaseDesigns] = useState();
    const contextData = useContext(Global);
    const [showPurchaseDesignModal, setShowPurchaseDesignModal] = useState(false);
    const [cookies] = useCookies();

    const [purchaseDesignsPagination, setPurchaseDesignsPagination] = useState({
        page: 1,
        page_size: 8,
    });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        cookies?.user_data &&
            axios.post("http://13.52.16.160:8082/client/purchased-projects/", {
                client_id: cookies?.user_data?.user_id,
                client_token: cookies?.user_data?.user_token,
                role: cookies?.user_data?.role,
                ...purchaseDesignsPagination,
            }).then((res) => {
                if (res?.data?.status === "Success") {
                    setPurchaseDesigns(res?.data?.data);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            });
    }, [contextData?.showDisclamer, purchaseDesignsPagination]);
    const [specificProductData, setSpecificProductData] = useState([]);
    const [specificProductDataType, setSpecificProductDataType] = useState("");

    const handleImageAndVideoClick = (images, url, type) => {
        setSpecificProductDataType(type);
        images?.map((res, index) => {
            setSpecificProductData((prev) => [...prev, res.image]);
        });
    };
    const purchaseDesignsArray = [];
    for (
        let i = 0;
        i < purchaseDesigns?.total_data / purchaseDesignsPagination?.page_size;
        i++
    ) {
        purchaseDesignsArray?.push(i + 1);
    }
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
                            <div id="dashboard-menu-bar" className="container  px-md-4 px-3 pt-5">
                                <h2 style={{ color: "#01a78a" }} className="text-center">
                                    Purchase  Designs
                                </h2>
                                {loading ? (
                                    <Backdrop
                                        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                        open={loading}
                                    >
                                        <CircularProgress color="inherit" />
                                    </Backdrop>
                                ) : (
                                    <div>
                                        <div className="row  pt-5 g-3">
                                            {purchaseDesigns?.final_data?.map((res, index, key) => {
                                                return (
                                                    <div className="col-xl-3 col-md-6   my-3" key={index}>
                                                        <div className="card border-0 flex-row bg-dark text-white visibleForEdit" style={{ height: "240px", borderRadius: "30px" }}>
                                                            <img src={`${res?.image}`} className="card-img w-100" style={{ borderRadius: "30px", objectFit: "cover", height: "100%" }} alt="..." />
                                                            <div
                                                                className="card-img-overlay"
                                                                style={{
                                                                    display: "flex",
                                                                    justifyContent: "flex-end",
                                                                    flexDirection: "column",
                                                                    borderRadius: "30px",
                                                                    background: "linear-gradient(20deg, #000000a1, transparent)",
                                                                    padding: " 0 10px 20px 10px",
                                                                }}>
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
                                                                        <button className="btn btn-primary border-0" style={{ width: "100%", fontSize: "14px", backgroundColor: "rgb(0, 167, 139)" }} type="button">
                                                                            Buy Project
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
                                        ) : (
                                            <div
                                                style={{ minHeight: "600px" }}
                                                className="d-flex justify-content-center align-items-center"
                                            >
                                                <div className="h4">No Catagory Selected</div>
                                            </div>
                                        )}
                                    </div>
                                )}
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
                                                                <source src={res.video} type="video/mp4" />
                                                                <source src={res.video} type="video/ogg" />
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
