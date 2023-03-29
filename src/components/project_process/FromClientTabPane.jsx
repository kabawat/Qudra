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
  const handalSubmit = (event) => {
    event.preventDefault()
    console.log({
      ...cookies?.user_data
    })
    axios.post('http://13.52.16.160:8082/stripe/client/card/', {
      ...cartInfo,
      client_id: cookies?.user_data?.user_id,
      client_token: cookies?.user_data?.user_token
    }).then((responce) => {
      console.log(responce)
      setShow(false)
    }).catch((error) => {
      console.log(error.responce)
    })
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
                          contextData?.userData?.role === "client" ? "/ongoing-projects" : "/request-projects"
                        }
                          className="text-decoration-none text-dark m-0 h2"
                        >
                          <i
                            class="fa-solid fa-arrow-left-long pe-3"
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
                {location?.state?.milesStoneData?.map((res) => (
                  <Wrapper className="milestoneBox">
                    <p>{res?.milestone_name}</p>
                    <div className="preview">
                      <div className="date"> {res?.milestone_date}</div>
                      <button className="prewviewButton" type="button" onClick={() => setShow(true)}>Download</button>
                      {/* <button
                        className="prewviewButton"
                        onClick={() =>
                          handlePreviewData(
                            res?.milestone_id,
                            location?.state?.projectDetails?.project_id,
                            "preview"
                          )
                        }
                      >
                        Download
                      </button> */}
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
          <Modal.Title>

          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <div className="bg-white payementFormMain">
            <form onSubmit={handalSubmit}>
              <h4>Payment Info</h4>
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
        </Modal.Footer>
      </Modal>s
    </div >
  );
};

export default FromClientTabPane;
