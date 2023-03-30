import React, { useState } from "react";
import ClientDashboardAside from "../../components/ClientDashboardAside";
import { HeaderDashboard } from "../../components/Header";
import { BiX, BiCreditCardAlt } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { FaPaypal } from "react-icons/fa";
import Select from "react-select";
import Footer from "../../components/Footer";
import $ from "jquery";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
const Cart = () => {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const location = useLocation()
  const [cookies] = useCookies()
  const months = [
    { value: "01", label: "01", name: 'expiry_month' },
    { value: "02", label: "02", name: 'expiry_month' },
    { value: "03", label: "03", name: 'expiry_month' },
    { value: "04", label: "04", name: 'expiry_month' },
    { value: "05", label: "05", name: 'expiry_month' },
    { value: "06", label: "06", name: 'expiry_month' },
    { value: "07", label: "07", name: 'expiry_month' },
    { value: "08", label: "08", name: 'expiry_month' },
    { value: "09", label: "09", name: 'expiry_month' },
    { value: "10", label: "10", name: 'expiry_month' },
    { value: "11", label: "11", name: 'expiry_month' },
    { value: "12", label: "12", name: 'expiry_month' },
  ];
  const years = [
    { value: "2023", label: "2023", name: 'expiry_year' },
    { value: "2024", label: "2024", name: 'expiry_year' },
    { value: "2025", label: "2025", name: 'expiry_year' },
    { value: "2026", label: "2026", name: 'expiry_year' },
    { value: "2027", label: "2027", name: 'expiry_year' },
    { value: "2028", label: "2028", name: 'expiry_year' },
    { value: "2029", label: "2029", name: 'expiry_year' },
    { value: "2030", label: "2030", name: 'expiry_year' },
    { value: "2031", label: "2031", name: 'expiry_year' },
    { value: "2032", label: "2032", name: 'expiry_year' },
    { value: "2033", label: "2033", name: 'expiry_year' },
    { value: "2034", label: "2034", name: 'expiry_year' },
  ];

  $(document).ready(function () {
    $(".cardExpiry.monthInput input").attr("maxlength", "2");
    $(".cardExpiry.yearInput input").attr("maxlength", "4");
  });
  const [cartInfo, setCartInfo] = useState({
    card_name: '',
    card_number: '',
    expiry_month: '',
    expiry_year: '',
    cvc: ''
  })
  const handalChange = (name, value) => {
    setCartInfo({
      ...cartInfo,
      [name]: value
    })
  }
  const handalSubmit = (event) => {
    event.preventDefault()
    axios.post('http://13.52.16.160:8082/stripe/client/card/', {
      ...cartInfo,
      client_id: cookies?.user_data?.user_id,
      client_token: cookies?.user_data?.user_token
    }).then((responce) => {
    }).catch((error) => {
      console.log(error.responce)
    })
  }
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
              <div className="cart_page_main mx-5 px-5 my-5 py-5">
                <div className="row m-0">
                  <div className="col-7 shoppingCartMain">
                    <h3>Shopping Cart</h3>
                    <div className="row border-bottom m-0 pb-3 mt-5">
                      <div className="col-7">
                        <h6>Designs</h6>
                      </div>
                      <div className="col-5">
                        <div className="row">
                          <div className="col">
                            <h6>Unit</h6>
                          </div>
                          <div className="col">
                            <h6>Total Price</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row m-0 pt-4">
                      <div className="col-7 leftShoppingCart">
                        <div className="row">
                          <div className="col">
                            <div className="row">
                              <div className="col-auto">
                                <div className="ImgBox">
                                  <img
                                    src="/static/images/userWork.png"
                                    alt=""
                                    className="img-fluid"
                                  />
                                </div>
                              </div>
                              <div className="col d-flex flex-column justify-content-center">
                                <h5>{location?.state?.projectData?.project_name}</h5>
                                <p>Reference site about lipsum</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-5 rightShoppingCart">
                        <div className="row">
                          <div className="col">
                            <h4>${location?.state?.project_cost}</h4>
                          </div>
                          <div className="col-8">
                            <div className="row">
                              <div className="col">
                                <h3>${location?.state?.project_cost}</h3>
                              </div>
                              <div className="col">
                                <BiX />
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
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-5 bg-white payementFormMain">
                    <form onSubmit={handalSubmit}>
                      <h4>Payment Info</h4>
                      <p className="pt-3 mb-0">Payement Method:</p>
                      <div className="row pt-3 m-0 pb-4 border-bottom">
                        <div className="col ps-0">
                          <button type="button">
                            <BiCreditCardAlt />
                            Credit Card
                          </button>
                        </div>
                        <div className="col pe-0">
                          <button type="button">
                            <FaPaypal />
                            PayPal
                          </button>
                        </div>
                      </div>
                      <div className="row m-0 pt-3 pb-4 border-bottom">
                        <h6>Name on card</h6>
                        <input type="text"
                          name="card_name"
                          value={cartInfo?.card_name}
                          onChange={(event) => {
                            handalChange(event?.target?.name, event?.target?.value)
                          }}
                        />
                      </div>
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
                            handalChange(event?.target?.name, event?.target?.value)
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
                                  name='expiry_month'
                                  defaultValue={cartInfo.expiry_month}
                                  onChange={(event) => handalChange(event.name, event.value)}
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
                                    handalChange(event?.name, event?.value)
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
                                name='cvc'
                                value={cartInfo?.cvc}
                                onChange={(event) => {
                                  handalChange(event?.target?.name, event?.target?.value)
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <button type="submit" className="PaymentCardSubmitButton">
                          Check out <BsArrowRight />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
