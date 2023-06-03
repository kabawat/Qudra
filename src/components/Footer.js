import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Global from "../context/Global";
import QueryForm from "./QueryForm";
import { BaseUrl } from "../BaseUrl";
const Footer = () => {
  const contextData = useContext(Global);
  useEffect(() => {
    if (!contextData?.footer_catagories_link?.length) {
      axios
        .post(`${BaseUrl}/quadra/footer_links`, {
          type: "Categories",
        })
        .then((res) => {
          contextData?.dispatch({
            type: "FOOTER_CATAGORIES_LINK",
            value: res?.data?.data,
          });
        });
    }

    if (!contextData?.footer_support_link?.length) {
      axios
        .post(`${BaseUrl}/quadra/footer_links`, {
          type: "Support",
        })
        .then((res) => {
          contextData?.dispatch({
            type: "FOOTER_SUPPORT_LINK",
            value: res?.data?.data,
          });
        });
    }
    if (!contextData?.footer_explore_link?.length) {
      axios
        .post(`${BaseUrl}/quadra/footer_links`, {
          type: "Explore",
        })
        .then((res) => {
          contextData?.dispatch({
            type: "FOOTER_EXPLORE_LINK",
            value: res?.data?.data,
          });
        });
    }
    if (!contextData?.footer_resources_link?.length) {
      axios
        .post(`${BaseUrl}/quadra/footer_links`, {
          type: "Explore Resources",
        })
        .then((res) => {
          contextData?.dispatch({
            type: "FOOTER_RESOURCES_LINK",
            value: res?.data?.data,
          });
        });
    }
    if (!contextData?.footer_icons?.length) {
      axios.get(`${BaseUrl}/quadra/footer_social_links`).then((res) => {
        contextData?.dispatch({
          type: "FOOTER_ICONS",
          value: res?.data?.data,
        });
      });
    }
  }, []);

  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div
              className="col-md-6 py-lg-0 pb-4 "
              style={{ display: "grid", placeContent: "center" }}
            >
              <img
                alt=""
                src="/static/images/Logo7.png"
                style={{ width: "152px" }}
              />

              <div className="d-flex social-icons-box d-flex justify-content-between align-items-center mt-3">
                {contextData?.footer_icons?.map((res) => (
                  <a href={res?.media_link} key={res?.id} target="_blank">
                    <img alt={res?.media_name} src={res?.icon} />
                  </a>
                ))}
              </div>
            </div>
            <div className="col-md-6">
              <QueryForm />
            </div>

            {/* <div className="col-6"></div> */}
            {/* <div className="col-lg-9">
              <div className="row">
                <div className="col-md col-6 my-3">
                  <h3>Categories</h3>
                  <ul>
                    {contextData?.footer_catagories_link?.map((res, index) => (
                      <li key={index}>
                        <Link to={res?.url}>{res?.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-md col-6 my-3">
                  <h3>Support</h3>
                  <ul>
                    {contextData?.footer_support_link?.map((res, index) => (
                      <li key={index}>
                        <Link to={res?.url}>{res?.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-md col-6 my-3">
                  <h3>Explore</h3>
                  <ul>
                    {contextData?.footer_explore_link?.map((res, index) => (
                      <li key={index}>
                        <Link to={res?.url}>{res?.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-md col-6 my-3">
                  <h3>Explore Resources</h3>
                  <ul>
                    {contextData?.footer_resources_link?.map((res, index) => (
                      <li key={index}>
                        <Link to={res?.url}>{res?.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="quadra-copyright w-100 theme-bg-color">
          <p>
            © 2022 <b>Quadra</b>. All rights reserved
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
