import React, { useState, useEffect, useContext } from "react";
import { BsSearch, BsFillSuitHeartFill } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import Pagination from "react-bootstrap/Pagination";

import Global from "../../../context/Global";
import axios from "axios";
import Dashboardside from "../../ProfessionalDashboardside";
import { HeaderDashboard } from "../../Header";
import Footer from "../../Footer";
import Loader from "../../Loader";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
const LikesShow = () => {
  const contextData = useContext(Global);
  const [likes, setLikes] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [projectPageId, setProjectPageId] = useState({
    page: 1,
    page_size: 5,
  });

  const [loading, setLoading] = useState(false);
  const [searchPageId, setSearchPageId] = useState({
    page: 1,
    page_size: 5,
  });
  const searchPaginationArray = [];
  for (let i = 0; i < likes?.total_data / searchPageId?.page_size; i++) {
    searchPaginationArray.push(i + 1);
  }
  const [cookies] = useCookies();
  useEffect(() => {
    if (cookies?.user_data) {
      if (cookies?.user_data?.category_selected) {
        if (cookies?.user_data.role === "professional") {
          axios
            .post("http://13.52.16.160:8082/identity/get-like-save", {
              user_id: cookies?.user_data?.user_id,
              user_token: cookies?.user_data?.user_token,
              role: cookies?.user_data?.role,
              ...projectPageId,
              search_for: "like",
            })
            .then((res) => {
              if (res?.data?.status === "Success") {
                setLoading(true);
                setLikes(res?.data?.data);
              }
            });
        } else {
          navigate("/clientdashboard");
        }
      } else {
        if (cookies?.user_data.role === "professional") {
          navigate("/categoryArchitecture");
        } else {
          navigate("/client-architechture");
        }
      }
    } else {
      navigate("/select-sign-in");
    }
  }, [projectPageId]);

  const projectPaginationArray = [];
  for (let i = 0; i < likes?.total_data / projectPageId?.page_size; i++) {
    projectPaginationArray.push(i + 1);
  }

  var searchAll = [];
  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .post("http://13.52.16.160:8082/identity/search_like_rate_user", {
        user_id: cookies?.user_data?.user_id,
        user_token: cookies?.user_data?.user_token,
        role: cookies?.user_data?.role,
        ...searchPageId,
        search_for: "like",
        search_data: search,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          setLikes(res?.data?.data);
          setSearchdata(likes);
          searchAll = res?.data?.data;
        } else {
          setSearchdata("");
        }
      });
  };

  const handleLikes = (val) => {
    if (val == "") {
      axios
        .post("http://13.52.16.160:8082/identity/search_like_rate_user", {
          user_id: cookies?.user_data?.user_id,
          user_token: cookies?.user_data?.user_token,
          role: cookies?.user_data?.role,
          ...searchPageId,
          search_for: "like",
          search_data: "",
        })
        .then((res) => {
          if (res?.data?.status === "Success") {
            setLikes(res?.data?.data);
            searchAll = res?.data?.data;
            setSearchdata(searchAll);
          }
        });
    }
  };
  const [searchData, setSearchdata] = useState(searchAll);
  useEffect(() => {
    axios
      .post("http://13.52.16.160:8082/identity/search_like_rate_user", {
        user_id: cookies?.user_data?.user_id,
        user_token: cookies?.user_data?.user_token,
        role: cookies?.user_data?.role,
        ...searchPageId,
        search_for: "like",
        search_data: search,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          setLikes(res?.data?.data);
        }
      });
  }, [searchPageId]);

  return (
    <>
      <div className="dashboard">
        <div className="container-fluid h-100">
          <div className="row h-100 dashboard-theme-color">
            <div className="col-xxl-2 col-md-2 col-lg-3 px-0 dashboard-theme-color">
              <Dashboardside />
            </div>
            <div className="col-xxl-10 col-md-10 col-lg-9 custom-border-radius-one  dashboard-theme-skyblue px-0 dashboard-right-section">
              <HeaderDashboard />
              {!loading ? (
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={!loading}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              ) : (
                <main className="dashboard-main">
                  <div
                    id="liked-save"
                    className="container-fluid  myProjectTable"
                  >
                    <h2 className="ps-5"> Clients Likes</h2>
                    <div className="m-xl-5 mx-2 shadow">
                      {likes?.final_data?.length ? (
                        <div className="row  align-items-center MyProjectDisplayRow">
                          <div className="searchActiveProject col-md-4 ms-auto">
                            <form onSubmit={handleSearch}>
                              <input
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => {
                                  setSearch(e.target.value);
                                  handleLikes(e.target.value);
                                }}
                              />
                              <button type="submit">
                                <BsSearch />
                              </button>
                            </form>
                          </div>
                        </div>
                      ) : (
                        <div
                          style={{ minHeight: "600px" }}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <span className="h4">No Liked Data To Show</span>
                        </div>
                      )}
                      {searchData && likes?.final_data ? (
                        likes?.final_data?.map((res, index) => (
                          <div className="row MyProjectDisplayRow" key={index}>
                            <div className="col-md-6 col-8 d-flex align-items-center ">
                              <img
                                src={res?.client_image}
                                className="img-fluid rounded-circle"
                                style={{ width: "70px", height: "70px" }}
                                alt=""
                              />
                              <div className="ps-3">
                                <h4>{res?.client_name}</h4>
                                <h6>
                                  <CiLocationOn />
                                  {res?.location}
                                </h6>
                              </div>
                            </div>
                            <div className="col-md-6 col-4 d-flex  align-items-center justify-content-end">
                              <button className="LikeButton">
                                <BsFillSuitHeartFill
                                  color={res?.liked ? "crimson" : "#dbdbdb"}
                                />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div
                          style={{ minHeight: "600px" }}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <span className="h4">No Liked Data To Show</span>
                        </div>
                      )}
                    </div>

                    {!search && projectPageId?.page_size < likes?.total_data ? (
                      <Pagination className="ps-5 paginationBoxProfessionalDashboard">
                        <Pagination.First
                          onClick={() => {
                            setProjectPageId({
                              page: 1,
                              page_size: 5,
                            });
                          }}
                        />
                        <Pagination.Prev
                          onClick={() => {
                            setProjectPageId((prev) => ({
                              ...prev,
                              page:
                                projectPageId?.page !== 1
                                  ? projectPageId?.page - 1
                                  : 1,
                            }));
                          }}
                        />
                        {projectPaginationArray?.map((res, key) => (
                          <Pagination.Item
                            key={key}
                            active={projectPageId?.page === res}
                            onClick={() => {
                              setProjectPageId((prev) => ({
                                ...prev,
                                page: res,
                              }));
                            }}
                          >
                            {res}
                          </Pagination.Item>
                        ))}
                        <Pagination.Next
                          onClick={() => {
                            setProjectPageId((prev) => ({
                              ...prev,
                              page:
                                projectPaginationArray?.length !==
                                projectPageId?.page
                                  ? projectPageId?.page + 1
                                  : projectPageId?.page,
                            }));
                          }}
                        />
                        <Pagination.Last
                          onClick={() => {
                            setProjectPageId((prev) => ({
                              ...prev,
                              page: projectPaginationArray?.length,
                            }));
                          }}
                        />
                      </Pagination>
                    ) : (
                      ""
                    )}

                    {/* search pagintaion */}

                    {search && searchPageId?.page_size < likes?.total_data ? (
                      <Pagination className="ps-5 paginationBoxProfessionalDashboard">
                        <Pagination.First
                          onClick={() => {
                            setSearchPageId({
                              page: 1,
                              page_size: 5,
                            });
                            handleSearch();
                          }}
                        />
                        <Pagination.Prev
                          onClick={() => {
                            setSearchPageId((prev) => ({
                              ...prev,
                              page:
                                searchPageId?.page !== 1
                                  ? searchPageId?.page - 1
                                  : 1,
                            }));
                            handleSearch();
                          }}
                        />
                        {searchPaginationArray?.map((res, key) => (
                          <Pagination.Item
                            key={key}
                            active={searchPageId?.page === res}
                            onClick={() => {
                              setSearchPageId((prev) => ({
                                ...prev,
                                page: res,
                              }));
                              handleSearch();
                            }}
                          >
                            {res}
                          </Pagination.Item>
                        ))}
                        <Pagination.Next
                          onClick={() => {
                            setSearchPageId((prev) => ({
                              ...prev,
                              page:
                                searchPaginationArray?.length !==
                                searchPageId?.page
                                  ? searchPageId?.page + 1
                                  : searchPageId?.page,
                            }));
                            handleSearch();
                          }}
                        />
                        <Pagination.Last
                          onClick={() => {
                            setSearchPageId((prev) => ({
                              ...prev,
                              page: searchPaginationArray?.length,
                            }));
                            handleSearch();
                          }}
                        />
                      </Pagination>
                    ) : (
                      ""
                    )}
                  </div>
                </main>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default React.memo(LikesShow);
