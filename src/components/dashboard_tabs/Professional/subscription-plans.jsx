import React, { useState, useEffect, useContext } from "react";
import Global from "../../../context/Global";
import axios from "axios";
import { BsSearch, BsFillSuitHeartFill } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "react-bootstrap/Pagination";
import Footer from "../../Footer";
import { HeaderDashboard } from "../../Header";
import Dashboardside from "../../ProfessionalDashboardside";
import { useCookies } from "react-cookie";
import Loader from "../../Loader";

const SubscriptionPlane = () => {
  const contextData = useContext( Global );
  const navigate = useNavigate();
  const [ isRender, setIsRender ] = useState( false )
  const [ cookies ] = useCookies()
  useEffect( () => {
    if ( cookies?.user_data ) {
      if ( cookies?.user_data?.category_selected ) {
        if ( cookies?.user_data.role === "professional" ) {
          setIsRender( true )
        } else {
          navigate( '/clientdashboard' )
        }
      } else {
        if ( cookies?.user_data.role === "professional" ) {
          navigate( '/categoryArchitecture' )
        } else {
          navigate( '/client-architechture' )
        }
      }
    } else {
      navigate( '/select-sign-in' )
    }
  }, [] )

  const [ plansType, setPlansType ] = useState( "monthly" );
  const [ plans, setPlans ] = useState();
  useEffect( () => {
    axios
      .get( "http://13.52.16.160:8082/stripe/subscription-plans/" )
      .then( ( responce ) => {
        setPlans( responce?.data?.data?.final_list );
      } );
  }, [] );
  return (
    <>
      <div className="dashboard">
        <div className="container-fluid h-100">
          <div className="row h-100 dashboard-theme-color">
            <div className="col-xxl-2 col-md-3 px-0 dashboard-theme-color">
              <Dashboardside />
            </div>
            <div className="col-xxl-10 col-md-9 custom-border-radius-one  dashboard-theme-skyblue px-0 dashboard-right-section">
              <HeaderDashboard />
              <main className="dashboard-main">
                <div
                  id="myactivity"
                  className="container-fluid  myProjectTable"
                >
                  <h2 className="ps-5">Subscription Plans</h2>
                  <div className="m-0 m-md-5 shadow">
                    <main className="my-4 pb-5">
                      <div className="container">
                        {/* <!--Section: Content--> */ }
                        <section className="pt-3 text-center">
                          <h2 className="mb-4">
                            <strong>Pricing</strong>
                          </h2>

                          <div
                            className="btn-group pricing_btn mb-4"
                            role="group"
                            aria-label="Basic example"
                          >
                            <h3>Monthly billing</h3>
                            {/* <button
                              type="button"
                              style={{ background: "#00a78b" }}
                              className="btn active text-light"
                              onClick={() => setPlansType("monthly")}
                            >
                              Monthly billing
                            </button>
                            <button
                              type="button"
                              style={{ background: "#00a78b" }}
                              className="btn text-light"
                              onClick={() => setPlansType("yearly")}
                            >
                              Annual billign
                            </button> */}
                          </div>

                          <div className="row gx-lg-5 mt-4">
                            {/* <!--Grid column--> */ }
                            { plans?.map( ( item, index ) => {
                              if ( plansType === item?.plan_type ) {
                                return (
                                  <div
                                    key={ index }
                                    className="col-lg-4 col-md-6 mb-4 my-2 subscription_plans"
                                  >
                                    {/* <!-- Card --> */ }
                                    <div className="card border ">
                                      <div className="card-header py-3">
                                        <p className=" mb-2">{ item.name }</p>
                                        <h5 className="mb-0">
                                          ${ item?.amount }/
                                          { item?.plan_type === "monthly"
                                            ? "Month"
                                            : "Year" }
                                        </h5>
                                      </div>
                                      <div className="card-body">
                                        <ul className="list-group list-group-flush">
                                          <li className="list-group-item border-0 ">
                                            <b> Service Charge</b> :{ " " }
                                            { item?.service_charge }%
                                          </li>
                                          <li className="list-group-item">
                                            <b> Storage</b> : { item?.storage }
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="card-footer p-0">
                                        <button
                                          type="button"
                                          className="btn subscription_plans_btn"
                                        >
                                          Buy now
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            } ) }
                          </div>
                        </section>
                        {/* <!--Section: Content--> */ }
                      </div>
                    </main>
                    <main className="my-4 pb-5">
                      <div className="container">
                        {/* <!--Section: Content--> */ }
                        <section className="pt-3 text-center">
                          {/* <h2 className="mb-4">
                            <strong>Pricing</strong>
                          </h2> */}

                          <div
                            className="btn-group pricing_btn mb-4"
                            role="group"
                            aria-label="Basic example"
                          >
                            {/* <button
                              type="button"
                              style={{ background: "#00a78b" }}
                              className="btn active text-light"
                              onClick={() => setPlansType("monthly")}
                            >
                              Monthly billing
                            </button> */}
                            {/* <button
                              type="button"
                              style={{ background: "#00a78b" }}
                              className="btn text-light"
                              onClick={() => setPlansType("yearly")}
                            >
                              Annual billign
                            </button> */}
                            <h3>Annual billign</h3>
                          </div>

                          <div className="row gx-lg-5 mt-4">
                            {/* <!--Grid column--> */ }
                            { plans?.map( ( item, index ) => {
                              if ( "yearly" === item?.plan_type ) {
                                return (
                                  <div
                                    key={ index }
                                    className="col-lg-4 col-md-6 mb-4 my-2 subscription_plans"
                                  >
                                    {/* <!-- Card --> */ }
                                    <div className="card border ">
                                      <div className="card-header py-3">
                                        <p className=" mb-2">{ item.name }</p>
                                        <h5 className="mb-0">
                                          { item?.amount }/ Year
                                        </h5>
                                      </div>
                                      <div className="card-body">
                                        <ul className="list-group list-group-flush">
                                          <li className="list-group-item border-0 ">
                                            <b> Service Charge</b> :{ " " }
                                            { item?.service_charge }%
                                          </li>
                                          <li className="list-group-item">
                                            <b> Storage</b> : { item?.storage }
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="card-footer p-0">
                                        <button
                                          type="button"
                                          className="btn subscription_plans_btn"
                                        >
                                          Buy now
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            } ) }
                          </div>
                        </section>
                        {/* <!--Section: Content--> */ }
                      </div>
                    </main>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default React.memo( SubscriptionPlane );
