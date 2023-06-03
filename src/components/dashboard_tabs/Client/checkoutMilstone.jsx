import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ClientDashboardAside from "../../ClientDashboardAside";
import { HeaderDashboard } from "../../Header";
import { useCookies } from "react-cookie";
import { Backdrop, CircularProgress } from "@mui/material";
import { Button, Container, Modal } from "react-bootstrap";
import { HiTrash } from "react-icons/hi";
import ReactLotti3 from "../../../loader/ReactLottie3";
import { BaseUrl } from "../../../BaseUrl";

const CheckoutMilstone = () => {
  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const pattern = /^[0-9]+$/;

    if (!pattern.test(keyValue)) {
      event.preventDefault();
    }
  };

  const [show, setShow] = useState(false);
  const [cookies] = useCookies();
  const location = useLocation();
  const navigate = useNavigate();
  const [isRender, setIsRender] = useState(false);
  const [paymentLoader, setpaymentloader] = useState(false);
  const [error, setError] = useState("");
  const [curCart, setCurCart] = useState("");
  const [project, setProject] = useState("");
  const [isPayment, setIsPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [checkoutDetaile, setCheckoutDetaile] = useState({});
  const [card, setCard] = useState("");
  const [carderr, setCarderr] = useState(false);
  const [checkout_loader, setcheckout_loader] = useState(false);
  const [deleteLoader, setdeleteloader] = useState(false);
  const [showdelete, setShowDelete] = useState(false);

  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = () => setShowDelete(true);

  const [showPayModal, setshowPayModal] = useState(false);

  const handlePayClose = () => setshowPayModal(false);
  const handlePayShow = () => {
    if (curCart === "") {
      setshowPayModal(false);
      setError("Please select a card");
    } else {
      setshowPayModal(true);
    }
  };
  const handleCard = () => {
    axios
      .post(`${BaseUrl}/client/client_checkout_details/`, {
        client_id: cookies?.user_data?.user_id,
        client_token: cookies?.user_data?.user_token,
        professional_id: location?.state?.projectDetaile?.professional_id,
        amount_paid: location?.state?.curMilestone?.milestone_price,
      })
      .then((result) => {
        if (result?.data?.status === "Failed") {
          setIsPayment(true);
        } else {
          setIsRender(true);
          setCheckoutDetaile(result?.data?.data);
          setCard(result?.data?.data?.cards);
        }
      });
  };
  useEffect(() => {
    handleCard();
  }, []);
  useEffect(() => {
    if (checkoutDetaile?.cards?.length === 1) {
      setCurCart(checkoutDetaile?.cards[0]?.id);
    }
  }, [card]);

  const deleteCard = () => {
    setpaymentloader(true);
    axios
      .post(`${BaseUrl}/stripe/client/delete/card/`, {
        client_id: cookies?.user_data?.user_id,
        client_token: cookies?.user_data?.user_token,
        card_id: card[0].id,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          handleCard();
          setCurCart("");
          setpaymentloader(false);
          handleDeleteClose();
        } else if (res?.data?.status === "Failed") {
          setpaymentloader(false);
          handleDeleteClose();
        }
      });
  };

  const handalSubmit = (show) => {
    setpaymentloader(true);
    try {
      if (curCart === "") {
        setpaymentloader(false);
        throw new Error("Please select a card");
      }
      axios
        .put(`${BaseUrl}/client/update_status_view_file`, {
          user_id: cookies?.user_data?.user_id,
          user_token: cookies?.user_data?.user_token,
          role: "client",
          project_id: location?.state?.curMilestone?.project_id,
          milestone_id: location?.state?.curMilestone?.milestone_id,
          payment_card_id: curCart,
        })
        .then((response) => {
          setShow(false);
          if (response?.data?.status === "Failed") {
            setpaymentloader(false);
            handlePayClose();

            setIsPayment(true);
          } else {
            setProject(response.data?.data?.file);
            setShow(show);
            setpaymentloader(false);
            handlePayClose();
          }
        });
    } catch (error) {
      setError(error.message);
    }
  };

  const handalBack = () => {
    navigate(-1);
  };
  const downloadProject = () => {
    const url = project;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", url.split("/")[5]); // you can set the filename here
    document.body.appendChild(link);
    link.click();
    setShow(false);
    handalBack();
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
      .post(`${BaseUrl}/stripe/client/new/card/`, {
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
          handleCard();
          setIsPayment(false);
          setcheckout_loader(false);
          setPaymentError("");
          setCartInfo(infocard);
          setCarderr(false);
        }
      })
      .catch((error) => {});
  };
  const [validDetails, SetValidDetails] = useState(false);
  const checkDetails = () => {
    if (
      !cartInfo.card_number ||
      !cartInfo.cvc ||
      !cartInfo.expiry_month ||
      !cartInfo.expiry_year
    ) {
      setCarderr(true);
      SetValidDetails(false);
    } else {
      SetValidDetails(true);
    }
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
                      <div className="checkout-listing">
                        <div className="d-flex">
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
                                src={
                                  location?.state?.projectDetaile
                                    ?.professional_image
                                }
                                alt=""
                                width="100%"
                                height="100%"
                              />
                            </div>
                            <div className="right-profile-description">
                              <h4>
                                {
                                  location?.state?.projectDetaile
                                    ?.professional_name
                                }
                              </h4>
                              <p>{location?.state?.projectDetaile?.location}</p>
                            </div>
                          </div>
                          <div className="amount-listing">
                            <ul className="listing">
                              <li>Amout</li>
                              <li>Service Charge</li>
                              <li>Total Amount</li>
                            </ul>
                            <ul className="amount-list">
                              <li> $ {checkoutDetaile?.amount}</li>
                              <li> $ {checkoutDetaile?.charge}</li>
                              <li> $ {checkoutDetaile?.total_amount}</li>
                            </ul>
                          </div>
                          <div className="choose-card">
                            <h4>Choose a Card</h4>
                            <div className="card-image clearfix">
                              {checkoutDetaile &&
                                checkoutDetaile?.cards?.map((item, keys) => {
                                  return (
                                    <div
                                      className="card_div d-inline"
                                      key={keys}
                                    >
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
                                        <span onClick={handleDeleteShow}>
                                          <HiTrash color="white" size={25} />
                                        </span>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                          <div className="add-card-button">
                            {error && (
                              <div className="error-box text-danger mb-3">
                                <span style={{ fontSize: "18px" }}>
                                  {error}
                                </span>
                              </div>
                            )}
                            <button
                              className="left-button"
                              type="button"
                              onClick={() => setIsPayment(true)}
                            >
                              Add a new card
                            </button>
                          </div>

                          {checkoutDetaile?.cards?.length !== 0 && (
                            <>
                              <div className="choose-payment-button">
                                <button
                                  type="button"
                                  className="payment-btn"
                                  onClick={
                                    () => handlePayShow()
                                    // handalSubmit(true)
                                  }
                                >
                                  Make a Payment
                                </button>
                                <button
                                  type="button"
                                  className="left-button"
                                  onClick={handalBack}
                                >
                                  Cancel
                                </button>
                              </div>
                            </>
                          )}
                          {paymentLoader ? (
                            <Backdrop
                              sx={{
                                color: "#fff",
                                zIndex: (theme) => theme.zIndex.drawer + 1,
                              }}
                              open={paymentLoader}
                            >
                              <CircularProgress color="inherit" />
                            </Backdrop>
                          ) : null}
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
      <Modal
        centered
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <Modal.Title>Thank you!</Modal.Title>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-start">
          <Button className="theme-bg-color border-0" onClick={downloadProject}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      {/* new card add  */}
      <Modal
        backdrop="static"
        keyboard={false}
        centered
        show={isPayment}
        onHide={() => {
          setIsPayment(false);
          setPaymentError("");
          setCarderr("");
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
              <div className="row m-0 pt-3 pb-4 border-bottom ">
                <h6 className="card-p-0">Card Number</h6>
                <input
                  className="card-p-0"
                  id="ccn"
                  type="text"
                  // inputMode="numeric"
                  // pattern="[0-9\s]{13,19}"
                  onKeyPress={handleKeyPress}
                  autoComplete="cc-number"
                  maxLength="16"
                  placeholder="xxxx xxxx xxxx xxxx"
                  name="card_number"
                  value={cartInfo?.card_number}
                  onChange={(event) => {
                    handalChange(event?.target?.name, event?.target?.value);
                  }}
                />
                {!cartInfo.card_number && carderr && (
                  <span className="text-danger card-p-0">Required</span>
                )}
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
                          name="exp_month"
                          defaultValue={cartInfo?.exp_month}
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
                          defaultValue={cartInfo?.exp_year}
                          placeholder="YYYY"
                          style={{ border: "none" }}
                          onChange={(event) => {
                            handalChange(event?.name, event?.value);
                          }}
                        />
                      </div>
                      {!cartInfo.expiry_year && carderr && (
                        <span className="text-danger">Required</span>
                      )}
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
                        onKeyPress={handleKeyPress}
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
                  type={validDetails ? "submit" : "button"}
                  disabled={checkout_loader ? true : false}
                  className="PaymentCardSubmitButton"
                  onClick={checkDetails}
                >
                  {checkout_loader ? <ReactLotti3 /> : "Save"}
                </button>
              </div>
            </form>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showdelete}
        onHide={handleDeleteClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Are you sure to delete this card?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button
            onClick={deleteCard}
            style={{ backgroundColor: "#00A78B", border: "none" }}
          >
            Sure
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Payment modal */}
      <Modal
        show={showPayModal}
        onHide={handlePayClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Are you sure to make payment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePayClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handalSubmit(true);
            }}
            style={{ backgroundColor: "#00A78B", border: "none" }}
          >
            Sure
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(CheckoutMilstone);
