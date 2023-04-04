import React, { useState } from "react";
import ClientDashboardAside from "../../components/ClientDashboardAside";
import { HeaderDashboard } from "../../components/Header";
import { BiX, BiCreditCardAlt } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { FaPaypal } from "react-icons/fa";
import Select from "react-select";
import Footer from "../../components/Footer";
import { Button, Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
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
let years = []
for (let i = 0; i < 20; ++i) {
  years.push({ value: `${year + i}`, label: `${year + i}`, name: "expiry_year" })
}

const Cart = () => {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const location = useLocation()
  const [cookies] = useCookies()


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
  const [show, setShow] = useState(false)

  const handalSubmit = () => {
    axios.post('http://13.52.16.160:8082/client/purchase/buy-sell-design/', {
      client_id: cookies?.user_data?.user_id,
      client_token: cookies?.user_data?.user_token,
      role: "client",
      professioanl_id: location?.state?.professional_id,
      category_id: location?.state?.category_id,
      sub_category_id: location?.state?.sub_category_id,
      design_no: location?.state?.buysell_id
    }).then((result) => {
      if (
        result?.data?.error_code === 109 &&
        result?.data?.status === "Failed"
      ) {
        setIsPayment(true);
      } else {
        const url = result?.data?.data?.project_url
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", url.split("/")[5]); // you can set the filename here
        document.body.appendChild(link);
        link.click();
        setShow(false)
      }
    })
    setShow(false)
  }

  const handalPurchase = (event) => {
    event.preventDefault();
    axios.post("http://13.52.16.160:8082/stripe/client/card/", {
      ...cartInfo,
      client_id: cookies?.user_data?.user_id,
      client_token: cookies?.user_data?.user_token,
    }).then((response) => {
      if (response?.data?.status === "Failed") {
        const error = response?.data?.message;
        setPaymentError(error.split(":")[1]);
      } else {
        setIsPayment(false);
        setPaymentError("");
      }
    }).catch((error) => {
      // console.log(error.response)
    });
  }

  // handalSubmit
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
              <div className="cart_page_main mx-5 px-5 my-5 py-5 ">
                <div className="shoppingCartMain">
                  <h3 className="border-bottom pb-4">Shopping Cart</h3>
                  <div className="row justify-content-between m-0 pt-4">
                    <div className="col-7 leftShoppingCart">
                      <h2 className="pb-4">{location?.state?.sub_category_name}</h2>
                      <div className="row">
                        <div className="col">
                          <div className="ImgBox mb-4">
                            <img
                              src={location?.state?.image}
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <div className="ImgBox">
                            <video width="100%" controls>
                              <source src={location?.state?.video} type="video/ogg" />
                              <source src={location?.state?.video} type="video/mp4" />
                              Your browser does not support HTML video.
                            </video>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 rightShoppingCart">
                      <div className="row">
                        <div className="col-12">
                          <div className="row">
                            <div className="col">
                              <h3>${location?.state?.project_cost}</h3>
                            </div>
                          </div>
                          <div className="row mt-5 pt-5 totalProductAmount">
                            <div className="col">
                              <div className="row border-bottom">
                                <div className="col-6">
                                  <h5>Subtotal:</h5>
                                </div>
                                <div className="col-6">
                                  <h4>${location?.state?.project_cost}</h4>
                                </div>
                              </div>
                              <div className="row pt-3">
                                <div className="col-6">
                                  <h5>total:</h5>
                                </div>
                                <div className="col-6">
                                  <h4>${location?.state?.project_cost}</h4>
                                </div>
                              </div>
                              <button type="button" onClick={() => setShow(true)} className="PaymentCardSubmitButton">
                                Purchase <BsArrowRight />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <Modal centered show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Modal.Title>
              Are you sure want to purchase this design
            </Modal.Title>
          </Modal.Body>

          <Modal.Footer className="d-flex justify-content-start">
            <Button
              variant="secondary"
              onClick={() => {
                setPaymentError("");
                setShow(false);
              }}
            >
              cancel
            </Button>
            <Button className="theme-bg-color border-0" onClick={handalSubmit}>
              sure
            </Button>
          </Modal.Footer>
        </Modal>

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
                    inputMode="numeric"
                    pattern="[0-9\s]{13,19}"
                    autoComplete="cc-number"
                    maxLength="19"
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
                      <h6>Expiration Date</h6>
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
                          type="text"
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
                  <button type="submit" className="PaymentCardSubmitButton">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
