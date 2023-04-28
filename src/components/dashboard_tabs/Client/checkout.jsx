import React, { useState, useEffect, useContext } from "react";
import { BsSearch, BsFillSuitHeartFill } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../Footer";
import ClientDashboardAside from "../../ClientDashboardAside";
import { HeaderDashboard } from "../../Header";
import { useCookies } from "react-cookie";
import { Backdrop, CircularProgress } from "@mui/material";
import { Button, Container, Modal } from "react-bootstrap";
const CheckOut = () => {
  const [show, setShow] = useState(false)
  const [cookies] = useCookies()
  const localtion = useLocation()
  const navigate = useNavigate();
  const [isRender, setIsRender] = useState(true)
  const [error, setError] = useState('')
  const [curCart, setCurCart] = useState('')
  const [project, setProject] = useState('')
  const handalSubmit = () => {
    try {
      if (curCart === '') {
        throw new Error('please select a card')
      }
      axios.post("http://13.52.16.160:8082/client/purchase/buy-sell-design/", {
        client_id: cookies?.user_data?.user_id,
        client_token: cookies?.user_data?.user_token,
        role: "client",
        professioanl_id: localtion?.state?.professional_id,
        category_id: localtion?.state?.category_id,
        sub_category_id: localtion?.state?.sub_category_id,
        design_no: localtion?.state?.buysell_id,
        payment_card_id: curCart
      }).then((result) => {
        if (
          result?.data?.error_code === 109 &&
          result?.data?.status === "Failed"
        ) {

        } else {
          setProject(result?.data?.data?.project_url)
          setShow(true)
        }
      });
    } catch (error) {
      setError(error.message)
    }

  };
  const downloadProject = () => {
    const url = project
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", url.split("/")[5]); // you can set the filename here
    document.body.appendChild(link);
    link.click();
    setShow(false)
  }
  const handalBack = () => {
    navigate(-1)
  }

  return (<>
    <div className="dashboard">
      <div className="container-fluid h-100">
        <div className="row h-100 dashboard-theme-color">
          <div className="col-xxl-2 col-md-3 px-0 dashboard-theme-color">
            <ClientDashboardAside />
          </div>
          <div className="col-xxl-10 col-md-9 custom-border-radius-one dashboard-theme-skyblue px-0 dashboard-right-section">
            <HeaderDashboard />
            {
              !isRender ? <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={!isRender}>
                <CircularProgress color="inherit" />
              </Backdrop> : <>
                <section className="checkout_data">
                  <Container>
                    <div className="checkout-listing">
                      <h2 className="pt-5">Checkout Payment</h2>
                      <div className="content pt-3">
                        <div className="profile_data mb-4">
                          <div className="left-image-data  "
                            style={{ border: '1px solid #000', width: '90px', height: '90px', borderRadius: '50%' }}>
                            <img src={localtion?.state?.professional_image} alt="" width="100%" height="100%" />
                          </div>
                          <div className="right-profile-description">
                            <h4>{localtion?.state?.professional_name}</h4>
                            <p>{localtion?.state?.professional_nation}</p>
                          </div>
                        </div>
                        <div className="amount-listing">
                          <ul className="listing">
                            <li>Amout</li>
                            <li>Charge</li>
                            <li>Total Amount</li>
                          </ul>
                          <ul className="amount-list">
                            <li>{localtion?.state?.amount}</li>
                            <li>{localtion?.state?.charge}</li>
                            <li>{localtion?.state?.total_amount}</li>
                          </ul>
                        </div>
                        <div className="choose-card">
                          <h4>Choose a Card</h4>
                          <div className="card-image">
                            {
                              localtion.state?.cards.map((item, keys) => {
                                return <div className={item?.id === curCart ? "first-card active" : "first-card"} key={keys} onClick={() => {
                                  setCurCart(item?.id)
                                  setError('')
                                }}>
                                  <h5>XXX XXXX XXXX {item?.last4}</h5>
                                  <div className="card-details">
                                    <span>Expiry Month: {item?.exp_month}</span> <span>Expiry Year: {item?.exp_year}</span>
                                  </div>
                                </div>
                              })
                            }
                          </div>
                        </div>
                        <div className="add-card-button">
                          <button className="left-button">Add a new card</button>
                        </div>

                        <div className="choose-payment-button">
                          <button className="left-button" onClick={handalSubmit}>Make a Payment</button>
                          <button className="left-button" onClick={handalBack}>Cancel</button>
                        </div>
                        {
                          error && <div className="error-box">
                            <span>{error}</span>
                          </div>
                        }

                      </div>
                    </div>
                  </Container>
                </section>
              </>
            }

          </div>
        </div>
      </div>
    </div>
    <Modal centered show={show} onHide={() => setShow(false)}>
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
    <Footer />
  </>

  );
};

export default React.memo(CheckOut);
