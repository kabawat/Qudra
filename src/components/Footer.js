import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Global from "../context/Global";
const Footer = () => {
  const contextData = useContext(Global);
  useEffect(() => {
    if (!contextData?.footer_catagories_link?.length) {
      axios
        .post("http://13.52.16.160:8082/quadra/footer_links", {
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
        .post("http://13.52.16.160:8082/quadra/footer_links", {
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
        .post("http://13.52.16.160:8082/quadra/footer_links", {
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
        .post("http://13.52.16.160:8082/quadra/footer_links", {
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
      axios
        .get("http://13.52.16.160:8082/quadra/footer_social_links")
        .then((res) => {
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
            <div className="col-lg-3 py-lg-0 pb-4">
              <img alt="" src="/static/images/logoQuadra.png" />
              <p className="pb-md-0 pt-4 pb-3">
                Reference site about Lorem Ipsum, giving information on its
                origins, as well as a random Lipsum generator.
              </p>
              <div className="d-flex social-icons-box d-flex justify-content-between align-items-center">
                {contextData?.footer_icons?.map((res) => (
                  <Link to={res?.media_link} key={res?.id}>
                    <img alt={res?.media_name} src={res?.icon} />
                  </Link>
                ))}
              </div>
            </div>
            <div className="col-lg-9">
              <div className="row">
                <div className="col-md">
                  <h3>Categories</h3>
                  <ul>
                    {contextData?.footer_catagories_link?.map((res, index) => (
                      <li key={index}>
                        <Link to={res?.url}>{res?.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-md">
                  <h3>Support</h3>
                  <ul>
                    {contextData?.footer_support_link?.map((res, index) => (
                      <li key={index}>
                        <Link to={res?.url}>{res?.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-md">
                  <h3>Explore</h3>
                  <ul>
                    {contextData?.footer_explore_link?.map((res, index) => (
                      <li key={index}>
                        <Link to={res?.url}>{res?.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-md">
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
            </div>
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
