import React, { useEffect, useState, useContext } from "react";
import { Header2 } from "../../components/Header";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import Global from "../../context/Global";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from "react-cookie";
const ClientBuySellDesign = () => {
  const contextData = useContext(Global);
  const [cookies, setCookies] = useCookies()
  const toggleDisabled = (target) => {
    let IconTarget = document.getElementById(`${parseInt(target.id)}icon`);
    if (target.checked) {
      IconTarget.src =
        contextData?.static_buy_sale_design?.data[
          parseInt(target.id)
        ].active_icon;
    } else {
      IconTarget.src =
        contextData?.static_buy_sale_design?.data[
          parseInt(target.id)
        ].unactive_icon;
    }
  };

  const navigate = useNavigate();
  const [selectedCatagories, setSelectedCatagories] = useState(
    JSON.parse(localStorage.getItem("SelectedCatagories"))
  );

  const formSubmit = (valueArray) => {
    if (valueArray.length) {
      axios.post("http://13.52.16.160:8082/client/sel_sub_category", {
        user_id: cookies?.user_data?.user_id,
        user_token: cookies?.user_data?.user_token,
        role: cookies?.user_data?.role,
        category: {
          cat_id: [...selectedCatagories?.cat_id, 3],
        },
        sel_sub_cat: {
          ...selectedCatagories.sel_sub_cat,
          3: valueArray,
        },
      }).then((res) => {
        if (res?.data?.status === "Success") {
          setCookies('user_data', { ...cookies.user_data, category_selected: true })
          navigate("/clientdashboard");
        }
      });
    } else {
      toast.error("You must select an category!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  useEffect(() => {
    if (cookies?.user_data) {
      if (cookies?.user_data?.category_selected) {
        if (cookies?.user_data?.role === "professional") {
          navigate('/professionaldashboard')
        } else {
          navigate('/clientdashboard')
        }
      }
    }
    axios.get(`http://13.52.16.160:8082/quadra/sub_categories?category_id=3`)
      .then((res) => {
        contextData?.dispatch({
          type: "STATIC_BUY_SALE_DESIGN",
          value: res?.data,
        });
      });
  }, []);

  const handleSkipButton = () => {
    if (selectedCatagories.length) {
      axios
        .post("http://13.52.16.160:8082/client/sel_sub_category", {
          user_id: contextData?.userData?.user_id,
          user_token: contextData?.userData?.user_token,
          role: contextData?.userData?.role,
          category: {
            cat_id: [...selectedCatagories?.cat_id, 3],
          },
          sel_sub_cat: {
            ...selectedCatagories.sel_sub_cat,
            3: [],
          },
        })
        .then((res) => {
          if (res?.data?.status === "Success") {
            setCookies('user_data', { ...cookies.user_data, category_selected: true })
            navigate("/clientdashboard");
          }
        });
    } else {
      toast.error("You must select an category!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  if (cookies?.user_data) {
    if (cookies?.user_data?.category_selected) {
      if (cookies.user_data.role === "professional") {
        navigate('/professionaldashboard')
      } else {
        navigate('/clientdashboard')
      }
    } else {
      if (cookies.user_data.role === "professional") {
        navigate('/categoryArchitecture')
      } else {
        return (
          <>
            <div className="create-account">
              <main className="create-account-main">
                <div className="container mb-5">
                  <Header2 />
                  <Formik
                    initialValues={{}}
                    onSubmit={(values, { setSubmitting }) => {
                      var valueArray = [];
                      for (let x in values) {
                        valueArray.push(values[x]);
                      }
                      formSubmit(valueArray);
                    }}>
                    {({ isSubmitting, setFieldValue, values }) => (
                      <Form>
                        <>
                          <h1>Choose Categories</h1>
                          <div className="category-button">
                            <h6 className="text-center">Designs I Want To Buy</h6>
                          </div>

                          <br />
                          <div
                            className="me-auto"
                            style={{
                              fontSize: "25px",
                              color: "#01a78a",
                              cursor: "pointer",
                            }}
                          >
                            <i
                              style={{ fontSize: "30px" }}
                              className="fa-solid fa-arrow-left-long"
                              onClick={() => {
                                navigate("/client-visualisation");
                              }}
                            ></i>
                          </div>
                          <div className="row">
                            {contextData?.static_buy_sale_design?.data?.length &&
                              contextData?.static_buy_sale_design?.data.map(
                                (name, i) => {
                                  return (
                                    <div
                                      className="col-sm-6 my-md-4 px-lg-5 px-md-2"
                                      key={i}
                                    >
                                      <div
                                        className=" px-1 shadow-box"
                                        style={{
                                          position: "relative",
                                          overflow: "hidden",
                                        }}
                                      >
                                        <div className="row  category-box">
                                          <div className="col-md-3 col-12 h-100 text-center  px-2">
                                            <div className="p-md-1 p-lg-3 icon-box">
                                              <img
                                                id={i + "icon"}
                                                src={name?.unactive_icon}
                                                alt={name?.sub_category}
                                              />
                                            </div>
                                          </div>
                                          <div className="col-md-9 col-12 d-sm-flex align-items-center px-3 p-md-0">
                                            <div>
                                              <h6 className="m-0 py-2 text-md-start text-center">
                                                {name?.sub_category}
                                              </h6>
                                              <input
                                                type="checkbox"
                                                id={`${i}checkbox`}
                                                name={name?.sub_category_id}
                                                className="large-checkbox"
                                                style={{ cursor: "pointer" }}
                                                onInput={(e) => {
                                                  if (e.target.checked) {
                                                    setFieldValue(
                                                      `${i}checkbox`,
                                                      name?.sub_category_id
                                                    );
                                                  } else {
                                                    setFieldValue(`${i}checkbox`);
                                                  }
                                                  toggleDisabled(e.target);
                                                }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div
                                        className="text-danger my-2"
                                        id={`error${i}`}
                                      ></div>
                                    </div>
                                  );
                                }
                              )}

                            <div className="col-md-6 col-12 my-md-4 my-3 d-flex align-items-center justify-content-center">
                              <button
                                style={{ border: "1px solid" }}
                                type="button"
                                className="bg-white theme-text-color create-account-btn"
                                onClick={handleSkipButton}
                              >
                                Skip <BsArrowRight className="theme-text-color" />
                              </button>
                              <button
                                type="submit"
                                className="create-account-btn"
                              // onClick={() => navigate("/client-visualisation")}
                              >
                                Continue <BsArrowRight style={{ color: "white" }} />
                              </button>
                            </div>
                          </div>
                        </>
                      </Form>
                    )}
                  </Formik>
                </div>
              </main>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
            </div>
          </>
        );
      }
    }
  } else {
    navigate('/select-sign-in')
  }

};

export default ClientBuySellDesign;
