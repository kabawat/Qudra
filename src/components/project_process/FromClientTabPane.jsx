import React, { useContext, useState } from "react";
import { Header2 } from "../Header";
import BackButton from "../Button/BackButton";
import styled from "styled-components";
import axios from "axios";
import Global from "../../context/Global";
import { Button, Modal } from "react-bootstrap";
import FileViewer from "react-file-viewer";
import { Link, NavLink } from "react-router-dom";
import $ from "jquery";
import { useLocation } from "react-router-dom";
import { BiCreditCardAlt } from 'react-icons/bi'
import { FaPaypal } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { BsArrowRight } from "react-icons/bs";
import Select from "react-select";
const FromClientTabPane = ({ location }) => {
  const contextData = useContext(Global);
  const customStyleOne = {
    borderRadius: "30px",
    filter: "drop-shadow(2.5px 4.33px 6.5px rgba(0,0,0,0.2))",
    padding: "100px 0",
  };
  const Wrapper = styled.div`
    .preview {
      right: 0;
      display: flex;
      top: 0;
      position: absolute;
      .date {
        position: static !important;
        border: 2px solid #01a78a;
        padding: 10px;
      }
      .prewviewButton {
        position: static !important;
        pointer-events: all !important;
      }
    }
  `;
  const handlePreviewData = (milestone, id, type) => {
    axios.put("http://13.52.16.160:8082/client/update_status_view_file", {
      user_id: contextData?.userData?.user_id,
      user_token: contextData?.userData?.user_token,
      role: contextData?.userData?.role,
      project_id: id,
      milestone_id: milestone,
      purpuse: type,
    }).then((res) => {
      if (res?.data?.status === "Success") {
        setShow(true);
      }
    });
  };

  // cart 
  const [show, setShow] = useState(false);
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

  const [curProject, SetCurProject] = useState({})
  const [isPayment, setIsPayment] = useState(false)
  const [paymentError, setPaymentError] = useState('')

  const handalSubmit = (event) => {
    event.preventDefault()
    axios.post('http://13.52.16.160:8082/stripe/client/card/', {
      ...cartInfo,
      client_id: cookies?.user_data?.user_id,
      client_token: cookies?.user_data?.user_token
    }).then((response) => {
      if (response?.data?.status === "Failed") {
        const error = response?.data?.message
        setPaymentError(error.split(':')[1])
      } else {
        setShow(false)
        SetCurProject({})
        setIsPayment(false)
        setPaymentError('')
      }
    }).catch((error) => {
      // console.log(error.response)
    })
  }
  const handalDownload = () => {
    axios.put('http://13.52.16.160:8082/client/update_status_view_file', {
      user_id: cookies?.user_data?.user_id,
      user_token: cookies?.user_data?.user_token,
      role: 'client',
      project_id: curProject?.project_id,
      milestone_id: curProject?.milestone_id
    }).then((response) => {
      setShow(false);
      if (response?.data?.error_code === 109 && response?.data?.status === "Failed") {
        setIsPayment(true);
      } else {
        const url = response.data?.data?.file
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', url.split('/')[5]); // you can set the filename here
        document.body.appendChild(link);
        link.click();
      }
    });
  };

  const [acceptShow, setAcceptShow] = useState(false)
  const AcceptHandal = () => {
    axios.post('http://13.52.16.160:8082/client/update_status_view_file', {
      user_id: cookies?.user_data?.user_id,
      user_token: cookies?.user_data?.user_token,
      role: 'client',
      project_id: curProject?.project_id,
      milestone_id: curProject?.milestone_id,
      status: 'accepted',
    }).then((result) => {
      if (result?.data?.data?.status === "Success") {
        SetCurProject({})
        setAcceptShow(false)
      }
      SetCurProject({})
      setAcceptShow(false)
    })
  }

  const [reason, setReason] = useState('')
  const [reasonError, SetReasonError] = useState('')
  const [DeclineShow, setDeclineShow] = useState(false)
  const declineHandal = () => {
    if (reason) {
      axios.post('http://13.52.16.160:8082/client/update_status_view_file', {
        user_id: cookies?.user_data?.user_id,
        user_token: cookies?.user_data?.user_token,
        role: 'client',
        project_id: curProject?.project_id,
        milestone_id: curProject?.milestone_id,
        status: 'decline',
        reason: reason
      }).then((result) => {
        if (result?.data?.status === "Success") {
          SetCurProject({})
          setDeclineShow(false)
          SetReasonError('')
          setReason('')
        } else {
          SetReasonError('Failed due to some reason')
        }
      })
    } else {
      SetReasonError('Reason Required')
    }
  }
  return (
    <div className="create-account">
      <Header2 />
      <main>
        <div className="container mb-5 bg-white" style={customStyleOne}>
          <div className="row m-0">
            <div className=" col-xxl-8 col-xl-9 col-lg-10 col-md-11 col-sm mx-auto">
              <section className="ProjectDetailsPageProjectDetailsSection">
                <div className="row">
                  <div className="col ">
                    <h3 className="theme-text-color fs-24 mb-5">
                      <span>
                        <Link to={
                          contextData?.userData?.role === "client" ? "/ongoing-projects" : "/myactivity"
                        }
                          className="text-decoration-none text-dark m-0 h2"
                        >
                          <i
                            className="fa-solid fa-arrow-left-long pe-3"
                            style={{ color: "#01a78a" }}
                          ></i>
                        </Link>
                      </span>
                      Project Details
                    </h3>

                    <div className="row">
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">1</div>
                        <h5>Project Name:</h5>
                        <p className="m-0 ms-3">
                          {location?.state?.projectData?.project_name}
                        </p>
                      </div>
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">2</div>
                        <h5>Professional Name :</h5>
                        <p className="m-0 ms-3">
                          {location?.state?.projectData?.professional_name}
                        </p>
                      </div>
                    </div>
                    <div className="row my-xxl-5">
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">3</div>
                        <h5>Estimated Area:</h5>
                        <p className="m-0 ms-3">
                          {location?.state?.projectData?.area}
                        </p>
                      </div>
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">4</div>
                        <h5>Estimated Budget:</h5>
                        <p className="m-0 ms-3">
                          {location?.state?.projectData?.project_cost}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">5</div>
                        <h5>Project Status:</h5>
                        <p className="m-0 ms-3">
                          {location?.state?.projectData?.project_status}
                        </p>
                      </div>
                      <div className="col-xxl d-flex align-items-center my-3 align-items-center">
                        <div className="project-details">6</div>
                        <h5>Estimated Deadline:</h5>
                        <p className="m-0 ms-3">
                          {location?.state?.projectData?.estimated_time}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="projectMilestoneInfo">
                <h3 className="theme-text-color fs-24 mt-5 mb-4">Milestone</h3>
                {location?.state?.milesStoneData?.map((res, index) => (
                  <Wrapper className="milestoneBox">
                    <p>{res?.milestone_name}</p>
                    <div className="preview">
                      <div className="date"> {res?.milestone_date}</div>
                      {
                        (res?.status === "pending" || res?.status === "decline") && <button className="prewviewButton" type="button">pending</button>
                      }
                      {
                        (res?.status === "downloaded" || res?.status === "updated" || res?.status === "uploaded") && <>
                          <div className="accept_btn_group">
                            <button onClick={() => {
                              setAcceptShow(true)
                              SetCurProject({ ...res })
                            }}>Accept</button>
                            <button onClick={() => {
                              setDeclineShow(true)
                              SetCurProject({ ...res })
                            }}>Decline</button>
                          </div>
                          <button className="prewviewButton" onClick={() => {
                            SetCurProject({ ...res })
                            setShow(true)
                          }} type="button">Download</button>
                        </>
                      }
                      {
                        res?.status === "accepted" && <>
                          <div className="accept_btn_group">
                            <button>Milestone Completed</button>
                          </div>
                          <button className="prewviewButton" onClick={() => {
                            SetCurProject({ ...res })
                            setShow(true)
                          }} type="button">Download</button>
                        </>
                      }
                      {
                        res?.status === "completed" && <>
                          <div className="accept_btn_group">
                            <button>Milestone Completed</button>
                          </div>
                          <button className="prewviewButton" onClick={() => {
                            SetCurProject({ ...res })
                            setShow(true)
                          }} type="button">Download</button>
                        </>
                      }
                    </div>

                  </Wrapper>
                ))}
                <BackButton customclassName="mx-auto d-block mt-4" text="Back" />
              </section>
            </div>
          </div>
        </div>
      </main >
      <Modal centered show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure want to pay the milestone amount and download the file? If already paid no amount will deducted.</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setPaymentError('')
            setShow(false)
            SetCurProject({})
          }}>
            cancel
          </Button>
          <Button className="theme-bg-color border-0" onClick={handalDownload}>
            sure
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal centered show={isPayment} onHide={() => {
        setIsPayment(false)
        setPaymentError('')
        SetCurProject({})
      }}>
        <Modal.Header closeButton>
          <Modal.Title>

          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <div className="bg-white payementFormMain">
            <form onSubmit={handalSubmit}>
              <h4>Add Your Card details for Payment in future </h4>
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
              <div style={{ color: 'red' }}>{paymentError}</div>
              <div className="row">
                <button type="submit" className="PaymentCardSubmitButton">
                  Save
                </button>
              </div>
            </form>
          </div>
        </Modal.Footer>
      </Modal>

      {/* accept  */}
      <Modal centered show={acceptShow} onHide={() => {
        setAcceptShow(false)
        SetCurProject({})
      }}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure want to Accept.</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setAcceptShow(false)
            SetCurProject({})
          }}>
            cancel
          </Button>
          <Button className="theme-bg-color border-0" onClick={AcceptHandal}>
            sure
          </Button>
        </Modal.Footer>
      </Modal>

      {/*  decline  */}
      <Modal centered show={DeclineShow} onHide={() => {
        SetCurProject({})
        setDeclineShow(false)
      }}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Reason to decline</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <input type="text" placeholder="Reason" onChange={event => setReason(event.target.value)} value={reason} className="form-control" />
          <p>{reasonError}</p>
          <Button variant="secondary" onClick={() => {
            SetCurProject({})
            setDeclineShow(false)
          }}>
            cancel
          </Button>
          <Button className="theme-bg-color border-0" onClick={declineHandal}>
            sure
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
};

export default FromClientTabPane;
