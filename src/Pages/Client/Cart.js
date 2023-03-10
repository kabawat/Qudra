import React, { useState } from "react";
import ClientDashboardAside from "../../components/ClientDashboardAside";
import { HeaderDashboard } from "../../components/Header";
import { BiX, BiCreditCardAlt } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { FaPaypal } from "react-icons/fa";
import Select from "react-select";
import Footer from "../../components/Footer";
import $ from "jquery";
const Cart = () => {
  const [, setCurrentTab] = useState("dashboard");

  const months = [
    { value: "01", label: "01" },
    { value: "02", label: "02" },
    { value: "03", label: "03" },
    { value: "04", label: "04" },
    { value: "05", label: "05" },
    { value: "06", label: "06" },
    { value: "07", label: "07" },
    { value: "08", label: "08" },
    { value: "09", label: "09" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
  ];
  const years = [
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" },
    { value: "2026", label: "2026" },
    { value: "2027", label: "2027" },
    { value: "2028", label: "2028" },
    { value: "2029", label: "2029" },
    { value: "2030", label: "2030" },
    { value: "2031", label: "2031" },
    { value: "2032", label: "2032" },
    { value: "2033", label: "2033" },
    { value: "2034", label: "2034" },
  ];

  $(document).ready(function () {
    $(".cardExpiry.monthInput input").attr("maxlength", "2");
    $(".cardExpiry.yearInput input").attr("maxlength", "4");
  });
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
                                <h5>Residental Architechture</h5>
                                <p>Reference site about lipsum</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-5 rightShoppingCart">
                        <div className="row">
                          <div className="col">
                            <h4>$600</h4>
                          </div>
                          <div className="col-8">
                            <div className="row">
                              <div className="col">
                                <h3>$600</h3>
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
                                    <h4>$500</h4>
                                  </div>
                                </div>
                                <div className="row pt-3">
                                  <div className="col-6">
                                    <h5>total:</h5>
                                  </div>
                                  <div className="col-6">
                                    <h4>$500</h4>
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
                    <form action="">
                      <h4>Payment Info</h4>
                      <p className="pt-3 mb-0">Payement Method:</p>
                      <div className="row pt-3 m-0 pb-4 border-bottom">
                        <div className="col ps-0">
                          <button>
                            <BiCreditCardAlt />
                            Credit Card
                          </button>
                        </div>
                        <div className="col pe-0">
                          <button>
                            <FaPaypal />
                            PayPal
                          </button>
                        </div>
                      </div>
                      <div className="row m-0 pt-3 pb-4 border-bottom">
                        <h6>Name on card</h6>
                        <input type="text" />
                      </div>
                      <div className="row m-0 pt-3 pb-4 border-bottom">
                        <h6>Card Number</h6>
                        <input
                          id="ccn"
                          type="tel"
                          inputMode="numeric"
                          pattern="[0-9\s]{13,19}"
                          autoComplete="cc-number"
                          maxLength="19"
                          placeholder="xxxx xxxx xxxx xxxx"
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
                                />
                              </div>
                            </div>
                            <div className="col cardExpiry yearInput">
                              <div className="border-bottom">
                                <Select
                                  options={years}
                                  placeholder="YYYY"
                                  style={{ border: "none" }}
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
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <button
                          type="submit"
                          className="PaymentCardSubmitButton"
                        >
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
