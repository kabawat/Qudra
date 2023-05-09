import React, { useContext, useEffect, useReducer } from "react";
import { ChatHeader } from "../components/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Button } from "react-bootstrap";
import Global from "../context/Global";
import { useLocation } from "react-router-dom";
import { Modal } from "react-bootstrap";
import BackButton from "../components/Button/BackButton";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const Wrapper = styled.div`
  position: relative;
  border-radius: 10px;
  height: 250px;
  &:hover > .card-img-overlay {
    background-color: #1a191994;
    opacity: 1;
  }
  img {
    object-fit: cover;
    height: auto;
    max-width: 100%;
  }
  h4 {
    position: absolute;
    top: 10px;
    z-index: 99;
    text-shadow: 1px 1px 5px black;
    right: 10px;
  }
  .card-img-overlay {
    opacity: 0;
    align-items: start;
    z-index: 0;
    display: flex;
    transition: 0.3s ease-in-out;
    justify-content: flex-end;
    flex-direction: column;
  }
`;
const SwiperRow = styled.div`
  .swiper-slide {
    border: 1px solid #00000054;
    border-radius: 7px;
  }
  .swiper-button-disabled {
    opacity: 0;
  }
  .swiper-button-next {
    color: white;
    text-shadow: 1px 2px 8px black;
    width: 45px;
    height: 45px;
    border-radius: 7px;
    &::after {
      font-size: 15px;
    }
    &:hover {
      background-color: #00000091;
      color: white;
    }
  }
  .swiper-button-prev {
    color: white;
    text-shadow: 1px 2px 8px black;
    width: 45px;
    height: 45px;
    border-radius: 7px;
    &::after {
      font-size: 15px;
    }

    &:hover {
      background-color: #00000091;
      color: white;
    }
  }
`;
const initialState = {
  preview_data: null,
  can_upload_video: false,
  preview_data_modal: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "PREVIEW_DATA":
      return { ...state, preview_data: action?.value };
    case "CAN_UPLOAD_VIDEO":
      return { ...state, can_upload_video: action?.value };
    case "PREVIEW_DATA_MODAL":
      return { ...state, preview_data_modal: action?.value };
    default:
      return state;
  }
};
const CategoryResult = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextData = useContext(Global);
  const location = useLocation();
  const buttonStyle = {
    padding: "10px 30px",
    borderRadius: "10px",
    border: 0,
  };

  return (
    <>
      <ChatHeader />
      {location?.state ? (
        location?.state?.image === "" ? (
          <div
            style={{ height: "calc(100vh - 137px)" }}
            className="d-flex flex-column justify-content-center align-items-center "
          >
            <h2>User Has Not Uploaded Any Image Yet</h2>
            {/* <div>
              <button
                className="theme-green"
                style={buttonStyle}
                onClick={() => navigate(-1)}
              >
                Ask For Price
              </button>
            </div> */}
          </div>
        ) : (
          ""
        )
      ) : (
        ""
      )}

      {location?.state && location?.state?.image !== "" ? (
        <>
          <div className="container py-5">
            <div className="d-md-flex align-items-center justify-content-between">
              <h2 className="show-filters-heading m-0">
                Showing Results Based On Category
              </h2>
            </div>
          </div>
          <div className="result-based-on-catogory-one">
            <div className="container">
              <SwiperRow className="row">
                <Swiper
                  breakpoints={{
                    640: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 3,
                    },
                  }}
                  spaceBetween={30}
                  loop={false}
                  modules={[Navigation]}
                  navigation={true}
                  className="mySwiper"
                >
                  {location?.state ? (
                    location?.state?.image &&
                    location?.state?.image.map((res, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <Wrapper className="card border-0 flex-row bg-dark text-white">
                            <img
                              src={`${location?.state?.image_url}${res}`}
                              className="card-img"
                              alt="..."
                            />
                            <h4 className="card-title">
                              $ {location?.state?.price[index]} / sq.mtr
                            </h4>
                            <div className="card-img-overlay">
                              <div className="row">
                                <div className="col">
                                  <Button
                                    style={{
                                      width: "100%",
                                      fontSize: "14px",
                                      border: 0,
                                      backgroundColor: "#00A78B",
                                    }}
                                    onClick={() => {
                                      dispatch({
                                        type: "PREVIEW_DATA",
                                        value: {
                                          image: `${location?.state?.image_url}${res}`,
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
                                {contextData.cataNameAndCataId &&
                                contextData.cataNameAndCataId.CataId == 2 ? (
                                  state?.can_upload_video === "True" ? (
                                    <div className="col">
                                      <Button
                                        style={{
                                          width: "100%",
                                          fontSize: "14px",
                                          backgroundColor: "#00A78B",
                                        }}
                                        className="mt-3"
                                        onClick={() => {
                                          dispatch({
                                            video: `${location?.state?.video_url}${location?.state?.video[index]}`,
                                            type: "video",
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
                              </div>
                            </div>
                          </Wrapper>
                        </SwiperSlide>
                      );
                    })
                  ) : (
                    <h2>The user has not uploaded ant catagory</h2>
                  )}
                </Swiper>
              </SwiperRow>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="container d-flex my-5 justify-content-center">
        <BackButton text="back" />
      </div>
      <Modal
        show={state?.preview_data_modal}
        fullscreen={true}
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
        {state?.preview_data && state?.preview_data?.type === "image" && (
          <img
            src={state?.preview_data?.image}
            alt=""
            style={{
              maxHeight: "100%",
              objectFit: "contain",
              width: "50%",
              margin: "auto",
            }}
          />
        )}

        {state?.preview_data &&
          state?.preview_data?.type === "video" &&
          state?.preview_data?.video !== "" &&
          state?.preview_data?.video && (
            <video
              className="h-100"
              src={state?.preview_data?.video && state?.preview_data?.video}
              controls="true"
              autoplay="true"
              style={{ objectFit: "contain" }}
            ></video>
          )}
      </Modal>
    </>
  );
};

export default CategoryResult;
