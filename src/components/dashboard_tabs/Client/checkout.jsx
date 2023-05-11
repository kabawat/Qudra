import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../Footer";
import ClientDashboardAside from "../../ClientDashboardAside";
import { HeaderDashboard } from "../../Header";
import { useCookies } from "react-cookie";
import { Backdrop, CircularProgress } from "@mui/material";
import { Button, Container, Modal } from "react-bootstrap";
import ReactLotti3 from "../../../loader/ReactLottie3";
import { HiTrash } from "react-icons/hi";

const CheckOut = () => {
  const [show, setShow] = useState(false);
  const [cookies] = useCookies();
  const location = useLocation();
  const [card, setCard] = useState(location.state?.cards);
  const navigate = useNavigate();
  const [isRender, setIsRender] = useState(true);
  const [show2, setShow2] = useState(false);

  const [error, setError] = useState("");
  const [curCart, setCurCart] = useState("");
  const [project, setProject] = useState("");
  const [isPayment, setIsPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [payment_loader, setpayment_loader] = useState(false);
  const [checkout_loader, setcheckout_loader] = useState(false);

  const handleCard = () => {
    axios
      .post("http://13.52.16.160:8082/client/client_checkout_details/", {
        client_id: cookies?.user_data?.user_id,
        client_token: cookies?.user_data?.user_token,
        professional_id: location?.state?.professional_id,
        amount_paid: location?.state?.project_cost,
      })
      .then((result) => {
        if (
          result?.data?.error_code === 109 &&
          result?.data?.status === "Failed"
        ) {
          setIsPayment(true);
        } else {
          setError("");
          setCard(result?.data?.data?.cards);
        }
      });
  };
  useEffect(() => {
    console.log(location?.state);
    handleCard();
  }, []);

  const deleteCard = () => {
    axios
      .post("http://13.52.16.160:8082/stripe/client/delete/card/", {
        client_id: cookies?.user_data?.user_id,
        client_token: cookies?.user_data?.user_token,
        card_id: card[0].id,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          handleCard();
        }
      });
  };

  const handalSubmit = (show) => {
    setpayment_loader(true);
    try {
      if (curCart === "") {
        setpayment_loader(false);
        throw new Error("please select a card");
      }
      axios
        .post("http://13.52.16.160:8082/client/purchase/buy-sell-design/", {
          client_id: cookies?.user_data?.user_id,
          client_token: cookies?.user_data?.user_token,
          role: "client",
          professioanl_id: location?.state?.professional_id,
          category_id: location?.state?.category_id,
          sub_category_id: location?.state?.sub_category_id,
          design_no: location?.state?.buysell_id,
          payment_card_id: curCart,
        })
        .then((result) => {
          if (
            result?.data?.error_code === 109 &&
            result?.data?.status === "Failed"
          ) {
            setpayment_loader(false);
          } else {
            setProject(result?.data?.data?.project_url);
            setShow(show);
            setpayment_loader(false);
          }
        });
    } catch (error) {
      setpayment_loader(false);

      setError(error.message);
    }
  };
  const handalBack = () => {
    navigate(-1);
  };
  const showcancel = () => {
    setShow2(false);
  };
  const downloadProject = () => {
    const url = project;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", url.split("/")[5]); // you can set the filename here
    document.body.appendChild(link);
    link.click();
    setShow(false);
    navigate("/clientdashboard", { state: true });
  };

  // payment card
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

  const infocard = {
    card_number: "",
    expiry_month: "",
    expiry_year: "",
    cvc: "",
  };
  const [cartInfo, setCartInfo] = useState(infocard);

  const handalChange = (name, value) => {
    setCartInfo({
      ...cartInfo,
      [name]: value,
    });
  };

  const handalPurchase = (event) => {
    setcheckout_loader(true);
    event.preventDefault();
    axios
      .post("http://13.52.16.160:8082/stripe/client/new/card/", {
        ...cartInfo,
        client_id: cookies?.user_data?.user_id,
        client_token: cookies?.user_data?.user_token,
      })
      .then((response) => {
        setcheckout_loader(false);
        if (response?.data?.status === "Failed") {
          const error = response?.data?.message;
          setPaymentError(error.split(":")[1]);
        } else {
          setShow2(true);
          setcheckout_loader(false);
          handleCard();
          setIsPayment(false);
          setPaymentError("");
          setCartInfo(infocard);
        }
      })
      .catch((error) => {});
  };
  document.querySelectorAll('input[type="number"]').forEach((input) => {
    input.oninput = () => {
      if (input.value.length > input.maxLength)
        input.value = input.value.slice(0, input.maxLength);
    };
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
                <>
                  <section className="checkout_data">
                    <Container>
                      <div className="checkout-listing ">
                        <div className="d-flex">
                          {" "}
                          <span
                            onClick={handalBack}
                            className="text-decoration-none text-dark m-0 h2"
                            style={{
                              cursor: "pointer",
                              display: "grid",
                              placeItems: "center",
                            }}
                          >
                            <i
                              className="fa-solid fa-arrow-left-long "
                              style={{ color: "#01a78a" }}
                            ></i>
                          </span>
                          <h2 className="pt-3 " style={{ marginLeft: "3%" }}>
                            Checkout Payment
                          </h2>
                        </div>
                        <div className="content pt-3">
                          <div className="profile_data mb-4">
                            <div
                              className="left-image-data  "
                              style={{
                                border: "1px solid #000",
                                width: "90px",
                                height: "90px",
                                borderRadius: "50%",
                              }}
                            >
                              <img
                                src={location?.state?.professional_image}
                                alt=""
                                width="100%"
                                height="100%"
                              />
                            </div>
                            <div className="right-profile-description">
                              <h4>{location?.state?.professional_name}</h4>
                              <p>{location?.state?.professional_nation}</p>
                            </div>
                          </div>
                          <div className="amount-listing">
                            <ul className="listing">
                              <li>Amout</li>
                              <li>Service Charge</li>
                              <li>Total Amount</li>
                            </ul>
                            <ul className="amount-list">
                              <li>$ {location?.state?.amount}</li>
                              <li>$ {location?.state?.charge}</li>
                              <li>$ {location?.state?.total_amount}</li>
                            </ul>
                          </div>
                          <div className="choose-card">
                            <h4>Choose a Card</h4>
                            <div className="card-image clearfix row">
                              {card &&
                                card.map((item, keys) => {
                                  return (
                                    <>
                                      <div className="card_div">
                                        <div
                                          className={
                                            item?.id === curCart
                                              ? "first-card active"
                                              : "first-card"
                                          }
                                          key={keys}
                                          onClick={() => {
                                            setCurCart(item?.id);
                                            setError("");
                                          }}
                                        >
                                          <h5>XXX XXXX XXXX {item?.last4}</h5>
                                          <div className="card-details">
                                            <span>
                                              Expiry Month: {item?.exp_month}
                                            </span>{" "}
                                            <span>
                                              Expiry Year: {item?.exp_year}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="Delete_card">
                                          <span onClick={deleteCard}>
                                            <HiTrash color="white" size={25} />
                                          </span>
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}
                            </div>
                          </div>
                          <div className="add-card-button">
                            <button
                              className="left-button"
                              type="button"
                              onClick={() => setIsPayment(true)}
                            >
                              Add a new card
                            </button>
                          </div>

                          <div className="choose-payment-button">
                            <button
                              disabled={payment_loader ? true : false}
                              type="button"
                              className="payment-btn"
                              onClick={() => handalSubmit(true)}
                            >
                              {payment_loader ? (
                                <ReactLotti3 />
                              ) : (
                                "Make a Payment"
                              )}
                            </button>
                            <button
                              type="button"
                              className="left-button"
                              onClick={handalBack}
                            >
                              Cancel
                            </button>
                          </div>
                          {error && (
                            <div className="error-box">
                              <span>{error}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Container>
                  </section>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal centered show={show} onHide={downloadProject}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Modal.Title>Thank you!</Modal.Title>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-start">
          <Button className="theme-bg-color border-0" onClick={downloadProject}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal centered show={show2} onHide={showcancel}>
        <Modal.Body>
          <Modal.Title>New Card Added!</Modal.Title>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-start">
          <Button className="theme-bg-color border-0" onClick={showcancel}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      {/* new card add  */}
      <Modal
        centered
        show={isPayment}
        onHide={() => {
          setIsPayment(false);
          setPaymentError("");
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
                <h6>Card Number</h6>
                <input
                  id="ccn"
                  type="number"
                  // inputMode="numeric"
                  // pattern="[0-9\s]+{13,16}"
                  autoComplete="cc-number"
                  maxLength={16}
                  placeholder="xxxx xxxx xxxx xxxx"
                  name="card_number"
                  value={cartInfo?.card_number}
                  onChange={(event) => {
                    handalChange(event?.target?.name, event?.target?.value);
                  }}
                />
              </div>
              <div className="row  py-3">
                <div className="col-8">
                  <div className="row">
                    <h6>Expiry Date</h6>
                    <div className="col cardExpiry monthInput">
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
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="row h-100">
                    <div className="col d-flex flex-column justify-content-end">
                      <label htmlFor="CVV">CVV:</label>
                      <input
                        type="number"
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
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ color: "red" }}>{paymentError}</div>
              <div className="row">
                <button
                  type="submit"
                  disabled={checkout_loader ? true : false}
                  className="PaymentCardSubmitButton"
                >
                  {checkout_loader ? <ReactLotti3 /> : "Save"}
                </button>
              </div>
            </form>
          </div>
        </Modal.Footer>
      </Modal>
      {/* <Footer /> */}
    </>
  );
};

export default React.memo(CheckOut);
