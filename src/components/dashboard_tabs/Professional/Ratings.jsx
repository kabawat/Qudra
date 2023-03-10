import React, { useState, useEffect, useContext } from "react";
import { BsSearch, BsFillSuitHeartFill } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import Rating from "@mui/material/Rating";
import Pagination from "react-bootstrap/Pagination";
import Global from "../../../context/Global";
import axios from "axios";
const Ratings = () => {
  const contextData = useContext(Global);
  const [projectPageId, setProjectPageId] = useState({
    page: 1,
    page_size: 5,
  });
  const [rating, setRating] = useState();
  const [search, setSearch] = useState("");

  const fetchRatingData = () => {
    axios
      .post("http://13.52.16.160:8082/identity/get-like-save", {
        user_id: contextData?.userData?.user_id,
        user_token: contextData?.userData?.user_token,
        role: contextData?.userData?.role,
        ...projectPageId,
        search_for: "rating",
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          setRating(res?.data?.data);
        }
      });
  };

  const projectPaginationArray = [];
  for (let i = 0; i < rating?.total_data / projectPageId?.page_size; i++) {
    projectPaginationArray.push(i + 1);
  }
  useEffect(() => {
    fetchRatingData();
  }, [projectPageId]);

  useEffect(() => {
    if (!search) {
      fetchRatingData();
    } else {
      setRating([]);
    }
  }, [search]);

  const handleSearch = () => {
    axios
      .post("http://13.52.16.160:8082/identity/search_like_rate_user", {
        user_id: contextData?.userData?.user_id,
        user_token: contextData?.userData?.user_token,
        role: contextData?.userData?.role,
        ...projectPageId,
        search_for: "rating",
        search_data: search,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          setRating(res?.data?.data);
        }
      });
  };
  const [searchPageId, setSearchPageId] = useState({
    page: 1,
    page_size: 5,
  });
  const searchPaginationArray = [];
  for (let i = 0; i < rating?.total_data / searchPageId?.page_size; i++) {
    searchPaginationArray.push(i + 1);
  }

  useEffect(() => {
    axios
      .post("http://13.52.16.160:8082/identity/search_like_rate_user", {
        user_id: contextData?.userData?.user_id,
        user_token: contextData?.userData?.user_token,
        role: contextData?.userData?.role,
        ...searchPageId,
        search_for: "rating",
        search_data: search,
      })
      .then((res) => {
        if (res?.data?.status === "Success") {
          setRating(res?.data?.data);
        }
      });
  }, [searchPageId]);

  return (
    <div id="liked-save" className="container-fluid  myProjectTable">
      <h2 className="ps-5"> Ratings </h2>
      <div className="m-md-5 mx-2 shadow">

        {rating?.final_data?.length ?
          <div className="row  align-items-center MyProjectDisplayRow">
            <div className="searchActiveProject col-8 ms-auto">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button onClick={handleSearch}>
                <BsSearch />
              </button>
            </div>
          </div> : ''}

        {rating?.final_data?.length ? (
          rating?.final_data?.map((res, index) => (
            <div className="row MyProjectDisplayRow" key={index}>
              <div className="col-md-6  d-flex align-items-center ">
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
              <div className="col-md-6  d-flex  align-items-center justify-content-end">
                <Rating
                  name="read-only"
                  value={parseInt(res?.rating)}
                  readOnly
                />
              </div>
            </div>
          ))
        ) : (
          <div
            style={{ minHeight: "600px" }}
            className="d-flex justify-content-center align-items-center"
          >
            <span className="h4">No Rating Data To Show</span>
          </div>
        )}
      </div>
      {!search && projectPageId?.page_size < rating?.total_data ? (
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
                page: projectPageId?.page !== 1 ? projectPageId?.page - 1 : 1,
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
                  projectPaginationArray?.length !== projectPageId?.page
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
      {search && searchPageId?.page_size < rating?.total_data ? (
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
                page: searchPageId?.page !== 1 ? searchPageId?.page - 1 : 1,
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
                  searchPaginationArray?.length !== searchPageId?.page
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
  );
};

export default React.memo(Ratings);
