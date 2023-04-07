import React, { useState, useEffect, useContext } from "react";
import Global from "../../../context/Global";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../Footer";
import { HeaderDashboard } from "../../Header";
import Dashboardside from "../../ProfessionalDashboardside";
import { useCookies } from "react-cookie";
import Select from "react-select";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Button, Modal } from "react-bootstrap";
const SubscriptionPlane = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies()
  const [plans, setPlans] = useState();
  const [loading, setLoading] = useState(false);
  const [currentPlans, setCurrentPlans] = useState(1)
  const [isError, setIsError] = useState(false)
  const [payErrorMessage, setPayErrorMessage] = useState('')
  const subscription = {
    display: 'flex'
  }
  const [noPlans, setNoPlans] = useState(false)
  useEffect(() => {
    if (cookies?.user_data) {
      if (cookies?.user_data?.category_selected) {
        if (cookies?.user_data.role === "professional") {
          axios.post('http://13.52.16.160:8082/identity/get_dashboard_profile/', cookies?.user_data).then(res => {
            const { subscription_plan_id, is_cancel } = res?.data?.data
            setCurrentPlans(subscription_plan_id)
            setNoPlans(is_cancel)
            axios.get("http://13.52.16.160:8082/stripe/subscription-plans/").then((responce) => {
              setLoading(true);
              setPlans(responce?.data?.data?.final_list);
            });
          })
        } else {
          navigate('/clientdashboard')
        }
      } else {
        if (cookies?.user_data.role === "professional") {
          navigate('/categoryArchitecture')
        } else {
          navigate('/client-architechture')
        }
      }
    } else {
      navigate('/select-sign-in')
    }
  }, []);

  // Subscript 
  const months = [
    { value: "01", label: "01", name: "exp_month" },
    { value: "02", label: "02", name: "exp_month" },
    { value: "03", label: "03", name: "exp_month" },
    { value: "04", label: "04", name: "exp_month" },
    { value: "05", label: "05", name: "exp_month" },
    { value: "06", label: "06", name: "exp_month" },
    { value: "07", label: "07", name: "exp_month" },
    { value: "08", label: "08", name: "exp_month" },
    { value: "09", label: "09", name: "exp_month" },
    { value: "10", label: "10", name: "exp_month" },
    { value: "11", label: "11", name: "exp_month" },
    { value: "12", label: "12", name: "exp_month" },
  ];
  const d = new Date();
  let year = d.getFullYear();
  let years = []
  for (let i = 0; i < 20; ++i) {
    years.push({ value: `${year + i}`, label: `${year + i}`, name: "exp_year" })
  }
  const [cartInfo, setCartInfo] = useState({
    card_number: "",
    exp_month: "",
    exp_year: "",
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

  const [curCart, setCurCart] = useState({})
  const handlePayment = (payload) => {
    setCurCart(payload)
    setIsPayment(true)
  }

  const handalPurchase = (event) => {
    event.preventDefault();
    setShow(true)
    setIsPayment(false)
  }


  const handleClosePayTab = (plans) => {
    setCurrentPlans(plans)
    setShow(false)
    setCartInfo({
      card_number: "",
      exp_month: "",
      exp_year: "",
      cvc: "",
    })
  }

  const handalSubmit = () => {
    const data = {
      professioanl_id: cookies?.user_data?.user_id,
      professioanl_token: cookies?.user_data?.user_token,
      ...cartInfo,
      plan_id: curCart?.id
    }
    axios.post(`http://13.52.16.160:8082/stripe/subscription/`, data).then((res) => {
      if (res?.data?.status === 'Failed') {
        setPayErrorMessage(res?.data?.message)
        setShow(false)
        setIsError(true)
        handleClosePayTab(currentPlans)
      } else {
        handleClosePayTab(curCart?.id)
      }
    })
  }

  // 
  const [isCencel, setIsCencel] = useState(false)
  const handalCencel = () => {
    axios.put('http://13.52.16.160:8082/stripe/subscription/', {
      professioanl_id: cookies?.user_data?.user_id,
      professioanl_token: cookies?.user_data?.user_token
    }).then((res) => {
      axios.post('http://13.52.16.160:8082/identity/get_dashboard_profile/', cookies?.user_data).then(res => {
        const { subscription_plan_id, is_cancel } = res?.data?.data
        setCurrentPlans(subscription_plan_id)
        setNoPlans(is_cancel)
        axios.get("http://13.52.16.160:8082/stripe/subscription-plans/").then((responce) => {
          setIsCencel(false)
          setPlans(responce?.data?.data?.final_list);
        });
      })
    })
  }

  return (
    <>
      <div className="dashboard">
        <div className="container-fluid h-100">
          <div className="row h-100 dashboard-theme-color">
            <div className="col-xxl-2 col-md-2 px-0 dashboard-theme-color">
              <Dashboardside />
            </div>
            <div className="col-xxl-10 col-md-10 custom-border-radius-one  dashboard-theme-skyblue px-0 dashboard-right-section">
              <HeaderDashboard />
              {!loading ? (<Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={!loading}>
                <CircularProgress color="inherit" />
              </Backdrop>
              ) : (
                <main className="dashboard-main">
                  <div id="myactivity" className="container-fluid  myProjectTable" >
                    <h2 className="ps-5">Subscription Plans</h2>
                    <div className="m-0 m-md-5 shadow">
                      <main className="my-4 pb-5">
                        <div className="container">
                          {/* <!--Section: Content--> */}
                          <section className="pt-3 text-center">
                            <h2 className="mb-4">
                              <strong>Subscription Plans</strong>
                            </h2>

                            <div
                              className="btn-group pricing_btn mb-4"
                              role="group"
                              aria-label="Basic example"
                            >
                              <h3>Monthly Plans</h3>
                            </div>

                            <div className="row gx-lg-5 mt-4">
                              {/* <!--Grid column--> */}
                              {plans?.map((item, index) => {
                                if (item?.plan_type === 'monthly') {
                                  return (
                                    <div
                                      key={index}
                                      className="col-lg-4 col-md-6 mb-4 my-2 subscription_plans"
                                    >
                                      {/* <!-- Card --> */}
                                      <div className="card border ">
                                        <div className="card-header py-3">
                                          <p className=" mb-2 text-capitalize" >{item.name}</p>
                                          <h5 className="mb-0">
                                            ${item?.amount}/Month
                                          </h5>
                                        </div>
                                        <div className="card-body">
                                          <ul className="list-group list-group-flush">
                                            <li className="list-group-item border-0 ">
                                              <b> Service Charge</b> :{" "}
                                              {item?.service_charge}%
                                            </li>
                                            <li className="list-group-item">
                                              <b> Storage</b> : {item?.storage === 'infinity' ? "Infinity" : `${item?.storage} GB`}
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="card-footer p-0">
                                          {
                                            currentPlans === item?.id ? <div style={subscription}>
                                              <button type="button" className="btn subscription_plans_btn" style={{ cursor: 'context-menu' }} >
                                                Active
                                              </button>
                                              {
                                                noPlans ? <button type="button" className="btn subscription_plans_btn bg-danger" style={{ cursor: 'context-menu', color: '#fff' }}>
                                                  Cancelled
                                                </button> : (
                                                  (currentPlans !== 1) && <button type="button" className="btn subscription_plans_btn bg-danger" onClick={() => setIsCencel(true)}>
                                                    Cancel
                                                  </button>)
                                              }

                                            </div> : ((item?.id === 1) ? <button type="button" className="btn subscription_plans_btn" >
                                              Upgrade
                                            </button> : <button type="button" className="btn subscription_plans_btn" onClick={() => handlePayment(item)} >
                                              Upgrade
                                            </button>)
                                          }

                                        </div>
                                      </div>
                                    </div>
                                  );
                                }
                              })}
                            </div>
                          </section>
                          {/* <!--Section: Content--> */}
                        </div>
                      </main>
                      <main className="my-4 pb-5">
                        <div className="container">
                          {/* <!--Section: Content--> */}
                          <section className="pt-3 text-center">
                            <div
                              className="btn-group pricing_btn mb-4"
                              role="group"
                              aria-label="Basic example"
                            >
                              <h3>Annual Plans</h3>
                            </div>

                            <div className="row gx-lg-5 mt-4">
                              {/* <!--Grid column--> */}
                              {plans?.map((item, index) => {
                                if (item?.plan_type === 'yearly') {
                                  return (
                                    <div
                                      key={index}
                                      className="col-lg-4 col-md-6 mb-4 my-2 subscription_plans"
                                    >
                                      {/* <!-- Card --> */}
                                      <div className="card border ">
                                        <div className="card-header py-3">
                                          <p className=" mb-2 text-capitalize">{item.name}</p>
                                          <h5 className="mb-0">
                                            ${item?.amount}/Year
                                          </h5>
                                        </div>
                                        <div className="card-body">
                                          <ul className="list-group list-group-flush">
                                            <li className="list-group-item border-0 ">
                                              <b> Service Charge</b> :{" "}
                                              {item?.service_charge}%
                                            </li>
                                            <li className="list-group-item">
                                              <b> Storage</b> : {item?.storage === 'infinity' ? "Infinity" : `${item?.storage} GB`}
                                            </li>
                                          </ul>
                                        </div>
                                        <div className="card-footer p-0">
                                          {
                                            currentPlans === item?.id ? <div style={subscription}>
                                              <button type="button" className="btn subscription_plans_btn" style={{ cursor: 'context-menu' }} >
                                                Active
                                              </button>
                                              {
                                                noPlans ? <button type="button" className="btn subscription_plans_btn bg-danger" style={{ cursor: 'context-menu', color: '#fff' }}>
                                                  Cancelled
                                                </button> : (
                                                  (currentPlans !== 4) && <button type="button" className="btn subscription_plans_btn bg-danger" onClick={() => setIsCencel(true)}>
                                                    Cancel
                                                  </button>)
                                              }

                                            </div> : ((item?.id === 4) ? <button type="button" className="btn subscription_plans_btn" >
                                              Upgrade
                                            </button> : <button type="button" className="btn subscription_plans_btn" onClick={() => handlePayment(item)} >
                                              Upgrade
                                            </button>)
                                          }
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }
                              })}
                            </div>
                          </section>
                          {/* <!--Section: Content--> */}
                        </div>
                      </main>
                    </div>
                  </div>
                </main>)}
            </div>
          </div>
        </div>

        {/* cencel plans  */}
        <Modal centered show={isCencel} onHide={() => setIsCencel(false)}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Modal.Title>
              Are you sure want to Cancel is active plans
            </Modal.Title>
          </Modal.Body>

          <Modal.Footer className="d-flex justify-content-end">
            <Button
              variant="secondary"
              onClick={() => {
                setIsCencel(false)
              }}
            >
              Cancel
            </Button>
            <Button className="theme-bg-color border-0" onClick={handalCencel}>
              Sure
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal centered show={isError} onHide={() => setIsError(false)}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Modal.Title>
              {payErrorMessage}
            </Modal.Title>
          </Modal.Body>

          <Modal.Footer className="d-flex justify-content-center">
            <Button
              className="PaymentCardSubmitButton"
              variant="secondary"
              onClick={() => {
                setPaymentError("");
                setIsError(false);
              }}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal centered show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Modal.Title>
              Are you sure want to purchase this plans
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
            handleClosePayTab(currentPlans)
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
                      <h6>Expiry Date</h6>
                      <div className="col cardExpiry monthInput">
                        <div className="border-bottom">
                          <Select
                            options={months}
                            placeholder="MM"
                            style={{ border: "none" }}
                            name="exp_month"
                            defaultValue={cartInfo.exp_month}
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
                            defaultValue={cartInfo.exp_year}
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

export default React.memo(SubscriptionPlane);
