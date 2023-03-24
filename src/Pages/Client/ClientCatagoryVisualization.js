import React, { useState, useContext, useEffect } from "react";
import { Header2 } from "../../components/Header";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import Global from "../../context/Global";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader";
import { useCookies } from "react-cookie";
const ClientCatagoryVisualization = () => {
  const contextData = useContext(Global);
  const navigate = useNavigate();
  const [selectList, setSelectList] = useState();
  const [cookies,] = useCookies()
  const [isRender, setIsRender] = useState(false)
  useEffect(() => {
    if (cookies?.user_data) {
      if (cookies?.user_data?.category_selected) {
        if (cookies?.user_data?.role === "client") {
          navigate('/clientdashboard')
        } else {
          navigate('/professionaldashboard')
        }
      } else {
        if (cookies?.user_data?.role === "client") {
          setIsRender(true)
        } else {
          navigate('/categoryArchitecture')
        }
      }
    } else {
      navigate('/select-sign-in')
    }
  }, [])

  useEffect(() => {
    let list = {};
    const selectImg = JSON.parse(localStorage.getItem("selectImg2"));
    contextData?.static_visualization_design?.data?.map((item, i) => {
      if (selectImg) {
        list[`checkbox${i}`] = selectImg[`checkbox${i}`];
        list[`${i}checkbox`] = selectImg[`${i}checkbox`];
      } else {
        list[`checkbox${i}`] = false;
        list[`${i}checkbox`] = "";
      }
    });

    setSelectList(list);
  }, [contextData]);

  const hadalChange = (event) => {
    const { id, name, checked, value } = event.target;
    setSelectList({
      ...selectList,
      [id]: checked,
      [name]: parseInt(value),
    });
  };
  const [selectedCatagory, setSelectedCatagory] = useState(
    JSON.parse(localStorage.getItem("SelectedCatagories"))
  );
  const SkipPage = () => {
    let sel_sub_cat = {
      1: selectedCatagory?.sel_sub_cat[1],
      2: [],
    };
    localStorage.setItem(
      "SelectedCatagories",
      JSON.stringify({
        user_id: cookies?.user_data?.user_id,
        user_token: cookies?.user_data?.user_token,
        role: cookies?.user_data?.role,
        cat_id: [...selectedCatagory.category?.cat_id, 2],
        sel_sub_cat: { ...sel_sub_cat },
      })
    );
    localStorage.setItem("selectImg2", JSON.stringify(selectList));
    navigate("/client-buy-sell");
  };
  const submitData = (event) => {
    event.preventDefault();
    let valueArray = [];
    contextData?.static_visualization_design?.data?.map((item, i) => {
      if (selectList[`checkbox${i}`]) {
        valueArray.push(selectList[`${i}checkbox`]);
      }
    });

    let sel_sub_cat = {
      1: selectedCatagory.sel_sub_cat[1],
      2: valueArray,
    };

    if (valueArray.length) {
      localStorage.setItem("selectImg2", JSON.stringify(selectList));
      localStorage.setItem(
        "SelectedCatagories",
        JSON.stringify({
          user_id: cookies?.user_data?.user_id,
          user_token: cookies?.user_data?.user_token,
          role: cookies?.user_data?.role,
          cat_id: [...selectedCatagory.category?.cat_id, 2],
          sel_sub_cat: { ...sel_sub_cat },
        })
      );
      navigate("/client-buy-sell");
    } else {
      toast.error("You must select an category!", {
        position: "top-right",
        autoClose: 5000,
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
    axios
      .get("http://13.52.16.160:8082/quadra/sub_categories?category_id=2")
      .then((res) => {
        contextData?.dispatch({
          type: "STATIC_VISUALIZATION_DESIGN",
          value: res?.data,
        });
      });
  }, []);
  if (contextData?.static_visualization_design?.data?.length && isRender) {
    return (
      <>
        <div className="create-account">
          <main className="create-account-main">
            <div className="container mb-5">
              <Header2 link={true} />
              <form onSubmit={submitData}>
                <>
                  <h1>Choose Categories</h1>
                  <div className="category-button">
                    <h6 className="text-center">
                      I want 3D Visualization designing
                    </h6>
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
                        navigate("/client-architechture");
                      }}
                    ></i>
                  </div>
                  <div className="row">
                    {selectList &&
                      contextData?.static_visualization_design?.data?.length &&
                      contextData?.static_visualization_design?.data.map(
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
                                        src={
                                          selectList[`checkbox${i}`]
                                            ? name?.active_icon
                                            : name?.unactive_icon
                                        }
                                        alt={name?.sub_category}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-9 col-12 d-sm-flex align-items-center px-3 p-md-0">
                                    <div>
                                      <h6 className="m-0 py-2 text-md-start text-center text-capitalize">
                                        {name?.sub_category}
                                      </h6>
                                      <input
                                        type="checkbox"
                                        id={`checkbox${i}`}
                                        name={`${i}checkbox`}
                                        checked={selectList[`checkbox${i}`]}
                                        value={name?.sub_category_id}
                                        className="large-checkbox"
                                        style={{ cursor: "pointer" }}
                                        onChange={hadalChange}
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

                    <div className=" col-12 my-md-4 my-3 d-flex align-items-center justify-content-end">
                      <button
                        style={{ border: "1px solid" }}
                        type="button"
                        className="bg-white theme-text-color create-account-btn"
                        onClick={SkipPage}
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
              </form>
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
  } else {
    return <Loader />;
  }
};

export default ClientCatagoryVisualization;
