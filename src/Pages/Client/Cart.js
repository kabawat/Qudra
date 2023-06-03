import React, { useState } from "react";
import ClientDashboardAside from "../../components/ClientDashboardAside";
import { HeaderDashboard } from "../../components/Header";
import { BiX, BiCreditCardAlt } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { FaPaypal } from "react-icons/fa";
import Select from "react-select";
import Footer from "../../components/Footer";
import { Button, Modal } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import ReactLotti3 from "../../loader/ReactLottie3";
import { BaseUrl } from "../../BaseUrl";

const months = [
  { value: "01", label: "01", name: "expiry_month" },
  { value: "02", label: "02", name: "expiry_month" },
  { value: "03", label: "03", name: "expiry_month" },
  { value: "04", label: "04", name: "expiry_month" },
  { value: "05", label: "05", name: "expiry_month" },
  { value: "06", label: "06", name: "expiry_month" },
  { value: "07", label: "07", name: "expiry_month" },
  { value: "08", label: "08", name: "expiry_month" },
  { value: "09", label: "09", name: "expiry_month" },
  { value: "10", label: "10", name: "expiry_month" },
  { value: "11", label: "11", name: "expiry_month" },
  { value: "12", label: "12", name: "expiry_month" },
];
const d = new Date();
let year = d.getFullYear();
let years = [];
for (let i = 0; i < 20; ++i) {
  years.push({
    value: `${year + i}`,
    label: `${year + i}`,
    name: "expiry_year",
  });
}

const Cart = () => {
  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const pattern = /^[0-9]+$/;

    if (!pattern.test(keyValue)) {
      event.preventDefault();
    }
  };

  const [loading, setLoading] = useState(false);

  const [currentTab, setCurrentTab] = useState("dashboard");
  const location = useLocation();
  const [cookies] = useCookies();
  const navigate = useNavigate();

  const [cartInfo, setCartInfo] = useState({
    card_number: "",
    expiry_month: "",
    expiry_year: "",
    cvc: "",
  });
  const handalChange = (name, value) => {
    setCartInfo({
      ...cartInfo,
      [name]: value,
    });
  };
  const [isPayment, setIsPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [show, setShow] = useState(false);
  const [carderr, setCarderr] = useState(false);
  const [cardloader, setcardloader] = useState(false);

  const handalSubmit = () => {
    setLoading(true);
    axios
      .post(`${BaseUrl}/client/client_checkout_details/`, {
        client_id: cookies?.user_data?.user_id,
        client_token: cookies?.user_data?.user_token,
        professional_id: location?.state?.professional_id,
        amount_paid: location?.state?.project_cost,
      })
      .then((result) => {
        if (result?.data?.data?.cards?.length === 0) {
          setLoading(false);
          setIsPayment(true);
        } else if (
          result?.data?.error_code === 109 &&
          result?.data?.status == "Failed"
        ) {
          setLoading(false);
          setIsPayment(true);
        } else {
          setLoading(false);
          navigate("/checkout", {
            state: {
              ...result?.data?.data,
              ...location?.state,
            },
          });
        }
      });
  };

  const handalPurchase = (event) => {
    setcardloader(true);
    event.preventDefault();
    if (
      !cartInfo.card_number ||
      !cartInfo.cvc ||
      !cartInfo.expiry_month ||
      !cartInfo.expiry_year
    ) {
      setCarderr(true);
      setcardloader(false);
    } else {
      setCarderr(false);

      axios
        .post(`${BaseUrl}/stripe/client/card/`, {
          ...cartInfo,
          client_id: cookies?.user_data?.user_id,
          client_token: cookies?.user_data?.user_token,
        })
        .then((response) => {
          if (response?.data?.status === "Failed") {
            const error = response?.data?.message;
            setPaymentError(error.split(":")[1]);
            setcardloader(false);
          } else {
            setIsPayment(false);
            setPaymentError("");
            handalSubmit();
            setcardloader(false);
          }
        })
        .catch((error) => {});
    }
  };

  // card number maxLength validation
  document.querySelectorAll('input[type="number"]').forEach((input) => {
    input.oninput = () => {
      if (input.value.length > input.maxLength)
        input.value = input.value.slice(0, input.maxLength);
    };
  });

  const [imgPreview, setImgPreview] = useState(false);

  return (
    <>
      <div className="dashboard">
        <div className="container-fluid h-100">
          <div className="row h-100 dashboard-theme-color">
            <div className="col-xxl-2 col-md-3 px-0 dashboard-theme-color">
              <ClientDashboardAside onTabChange={setCurrentTab} />
            </div>
            <div className="col-xxl-10 col-md-9 custom-border-radius-one dashboard-theme-skyblue px-0 dashboard-right-section">
              <HeaderDashboard />
              <div className="cart_page_main mx-xl-5 px-lg-3 px-xxl-5 px-xl-4  my-xl-5 py-lg-5 ">
                <div className="row leftShoppingCart">
                  <h2 className="pb-4">
                    <span
                      onClick={() => {
                        navigate("/clientdashboard", {
                          state: { role: "client", designe: true },
                        });
                      }}
                      style={{
                        color: "#00A78B",
                        marginRight: "8px",
                        cursor: "pointer",
                      }}
                    >
                      <i
                        className="fa-solid fa-arrow-left-long mx-1"
                        style={{ fontSize: "30px" }}
                      ></i>
                    </span>
                    {location?.state?.sub_category_name}
                  </h2>
                </div>
                <div
                  className="row p-3 bg-white align-items-center bl-col"
                  style={{ border: "1px solid #e3e2de", borderRadius: "12px" }}
                >
                  <div className="col-xl-2 col-md-6 purchaseImg">
                    <img
                      style={{ height: "100%", borderRadius: "12px" }}
                      src={location?.state?.image}
                      alt=""
                      className="img-fluid"
                      onClick={() => setImgPreview(true)}
                    />
                  </div>
                  <div className="col-xl-2 col-md-6 purchaseVid">
                    <video
                      width="100%"
                      style={{ height: "100%", borderRadius: "12px" }}
                      controls
                    >
                      <source src={location?.state?.video} type="video/ogg" />
                      <source src={location?.state?.video} type="video/mp4" />
                      Your browser does not support HTML video.
                    </video>
                  </div>
                  <div className="col-xl-6  my-3 col-md-12 ">
                    <div className="d-flex flex-column justify-content-center">
                      <div className="row">
                        <h3
                          className="col-8 col-md-8"
                          style={{ fontSize: "1.25rem" }}
                        >
                          Price:
                        </h3>
                        <h3
                          className="col-4 col-md-4 text-dark"
                          style={{ fontSize: "1.25rem" }}
                        >
                          $ {location?.state?.project_cost}
                        </h3>
                      </div>
                    </div>
                    <div className="d-flex w-100">
                      <div className="row w-100">
                        <h3
                          className="col-7 col-md-8"
                          style={{ fontSize: "1.25rem" }}
                        >
                          Customization Price:
                        </h3>
                        <h3
                          className="col-5 col-md-4 text-dark text-right"
                          style={{ fontSize: "1.25rem" }}
                        >
                          $ {location?.state?.customize_price} /sq.mtr
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-2 col-md-12">
                    <button
                      type="button"
                      onClick={!loading ? handalSubmit : null}
                      disabled={loading ? true : false}
                      className="PaymentCardSubmitButton px-4"
                    >
                      {!loading ? <>Checkout</> : <ReactLotti3 />}
                      {/* Checkout <BsArrowRight /> */}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          size="lg"
          // fullscreen={ true }
          animation={true}
          show={imgPreview}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="modalProfessionalDashboard"
          onHide={() => setImgPreview(false)}
        >
          <button
            className="modal-closebtn"
            onClick={() => setImgPreview(false)}
          >
            <IoMdClose style={{ color: "#fff" }} />
          </button>

          {
            <img
              src={location?.state?.image}
              alt=""
              className="img-fluid object-fit-contain"
              style={{ maxHeight: "532px" }}
            />
          }
        </Modal>

        <Modal
          centered
          show={show}
          onHide={() => {
            setShow(false);
            setCarderr("");
          }}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Modal.Title>Are you sure want to purchase this design</Modal.Title>
          </Modal.Body>

          <Modal.Footer className="d-flex justify-content-start">
            <Button className="theme-bg-color border-0" onClick={handalSubmit}>
              Sure
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                setPaymentError("");
                setShow(false);
              }}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          centered
          keyboard={false}
          backdrop="static"
          show={isPayment}
          onHide={() => {
            setIsPayment(false);
            setPaymentError("");
            setCarderr(false);
            setCartInfo({
              card_number: "",
              expiry_month: "",
              expiry_year: "",
              cvc: "",
            });
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
            <h4>Add Your Card details for Payment in future </h4>
          </Modal.Header>
          <Modal.Footer>
            <div className="bg-white payementFormMain card-popup">
              <form onSubmit={handalPurchase}>
                <div className="row m-0 pt-3 pb-4 border-bottom">
                  <h6 className="p-0">Card Number</h6>
                  <input
                    id="ccn"
                    type="text"
                    onKeyPress={handleKeyPress}
                    // inputMode="numeric"
                    // pattern="[0-9\s]+{13,16}"
                    autoComplete="cc-number"
                    maxLength={16}
                    placeholder="xxxx xxxx xxxx xxxx"
                    name="card_number"
                    className="p-0"
                    value={cartInfo?.card_number}
                    onChange={(event) => {
                      handalChange(event?.target?.name, event?.target?.value);
                    }}
                  />
                  {!cartInfo.card_number && carderr && (
                    <span className="text-danger">Required</span>
                  )}
                </div>
                <div className="row  py-3">
                  <div className="col-8">
                    <div className="row">
                      <h6>Expiry Date</h6>
                      <div className="col cardExpiry monthInput ">
                        <div className="border-bottom">
                          <Select
                            options={months}
                            placeholder="MM"
                            style={{ border: "none" }}
                            name="expiry_month"
                            defaultValue={cartInfo.expiry_month}
                            onChange={(event) =>
                              handalChange(event.name, event.value)
                            }
                          />
                        </div>
                        {!cartInfo.expiry_month && carderr && (
                          <span className="text-danger">Required</span>
                        )}
                      </div>
                      <div className="col cardExpiry yearInput">
                        <div className="border-bottom">
                          <Select
                            options={years}
                            defaultValue={cartInfo.expiry_year}
                            placeholder="YYYY"
                            style={{ border: "none" }}
                            onChange={(event) => {
                              handalChange(event?.name, event?.value);
                            }}
                          />
                        </div>
                        {!cartInfo.expiry_year && carderr && (
                          <span className="text-danger"> Required</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="row h-100">
                      <div className="col d-flex flex-column justify-content-end">
                        <label htmlFor="CVV" className="CVV">
                          CVV:
                        </label>
                        <input
                          type="text"
                          onKeyPress={handleKeyPress}
                          id="CVV"
                          placeholder="xxx"
                          className="border-bottom"
                          maxLength={3}
                          minLength={3}
                          name="cvc"
                          value={cartInfo?.cvc}
                          onChange={(event) => {
                            handalChange(
                              event?.target?.name,
                              event?.target?.value
                            );
                          }}
                        />
                        {!cartInfo.cvc && carderr && (
                          <span className="text-danger">Required</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ color: "red" }}>{paymentError}</div>
                <div className="row">
                  <button
                    type="submit"
                    disabled={cardloader ? true : false}
                    className="PaymentCardSubmitButton"
                    // onClick={checkDetails}
                  >
                    {cardloader ? <ReactLotti3 /> : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Cart;
