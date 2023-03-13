import React, { useState, useContext, useEffect } from "react";
import { Header2 } from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import Global from "../../context/Global";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ClientCategoriesArchitectural = () => {
  const contextData = useContext(Global);
  const [selectList, setSelectList] = useState();
  useEffect(() => {
    let list = {};
    const selectImg = JSON.parse(localStorage.getItem("selectImg"));
    contextData?.static_architecture_design?.data?.map((item, i) => {
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

  const toggleDisabled = (event) => {
    const { id, name, checked, value } = event.target;
    setSelectList({
      ...selectList,
      [id]: checked,
      [name]: parseInt(value),
    });
  };
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const SkipPage = () => {
    localStorage.setItem(
      "SelectedCatagories",
      JSON.stringify({
        user_id: contextData?.userData?.user_id,
        user_token: contextData?.userData?.user_token,
        role: contextData?.userData?.role,
        category: {
          cat_id: [[].push(contextData?.userData?.category_id)],
        },
        sel_sub_cat: { 1: [] },
      })
    );
    localStorage.setItem("selectImg", JSON.stringify(selectList));
    navigate("/client-visualisation");
  };
  const submitData = (event) => {
    event.preventDefault();
    let valueArray = [];
    contextData?.static_architecture_design?.data?.map((item, i) => {
      if (selectList[`checkbox${i}`]) {
        valueArray.push(selectList[`${i}checkbox`]);
      }
    });
    if (valueArray.length) {
      localStorage.setItem("selectImg", JSON.stringify(selectList));
      localStorage.setItem(
        "SelectedCatagories",
        JSON.stringify({
          user_id: contextData?.userData?.user_id,
          user_token: contextData?.userData?.user_token,
          role: contextData?.userData?.role,
          category: {
            cat_id: [[].push(contextData?.userData?.category_id)],
          },
          sel_sub_cat: { 1: valueArray },
        })
      );
      navigate("/client-visualisation");
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
      .get("http://13.52.16.160:8082/quadra/sub_categories?category_id=1")
      .then((res) => {
        contextData?.dispatch({
          type: "STATIC_ARCHITECTURE_DESIGN",
          value: res?.data,
        });
      });
  }, []);

  // edit profile back
  const handleEditProfileButton = () => {
    axios
      .put("http://13.52.16.160:8082/identity/update_account", {
        ...JSON.parse(localStorage.getItem("user_data")),
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          navigate("/edit-profile", { state: res?.data?.data });
        }
      });
  };
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
                  <h6 className="text-center">I Do Architectural Designing</h6>
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
                    onClick={handleEditProfileButton}
                  ></i>
                </div>
                <div className="row">
                  {selectList &&
                    contextData?.static_architecture_design?.data?.length &&
                    contextData?.static_architecture_design?.data.map(
                      (name, i) => {
                        return (
                          <div
                            className="col-sm-6 my-md-4 px-lg-5 px-md-2"
                            key={i}
                          >
                            <div
                              className="px-1 shadow-box"
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
                                    <h6 className="m-0 py-2 text-md-start text-center">
                                      {name?.sub_category}
                                    </h6>
                                    <input
                                      type="checkbox"
                                      name={`${i}checkbox`}
                                      id={`checkbox${i}`}
                                      value={name?.sub_category_id}
                                      checked={selectList[`checkbox${i}`]}
                                      className="large-checkbox"
                                      style={{ cursor: "pointer" }}
                                      onChange={toggleDisabled}
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
                      onClick={SkipPage}
                    >
                      Skip <BsArrowRight className="theme-text-color" />
                    </button>
                    <button type="submit" className="create-account-btn">
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
};

export default ClientCategoriesArchitectural;
