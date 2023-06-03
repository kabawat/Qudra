import React, { useEffect, useState } from "react";
import ClientDashboardAside from "../../ClientDashboardAside";
import { HeaderDashboard } from "../../Header";
import { Backdrop, CircularProgress } from "@mui/material";
import { Button, Container, Modal } from "react-bootstrap";
import axios from "axios";
import { useCookies } from "react-cookie";

import { BaseUrl } from "../../../BaseUrl";
import { BsSearch, BsFillSuitHeartFill } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";

const Billing = () => {
  const [isRender, setIsRender] = useState(true);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [cookies] = useCookies();
  const [myProjectPageId, setMyProjectPageId] = useState({
    page: 1,
    page_size: 5,
  });

  useEffect(() => {
    axios
      .post(`${BaseUrl}/client/client_billing_details/`, {
        client_id: cookies?.user_data?.user_id,
        client_token: cookies?.user_data?.user_token,
        ...myProjectPageId,
      })
      .then((res) => {
        setData(res?.data?.data);
        setIsRender(false);
      })
      .catch((error) => {});
  }, [myProjectPageId]);

  const paginationArray = [];
  for (let i = 0; i < data?.total_data / myProjectPageId?.page_size; i++) {
    paginationArray.push(i + 1);
  }
  return (
    <>
      <div className="dashboard">
        <div className="container-fluid h-100">
          <div className="row h-100 dashboard-theme-color">
            <div className="col-xxl-2 col-md-3 col-lg-3 px-0 dashboard-theme-color">
              <ClientDashboardAside />
            </div>
            <div className="col-xxl-10 col-md-9 col-lg-9 custom-border-radius-one dashboard-theme-skyblue px-0 dashboard-right-section">
              <HeaderDashboard />
              {isRender ? (
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={isRender}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              ) : (
                <>
                  <div
                    id="liked-save"
                    className="container-fluid  myProjectTable"
                  >
                    <h2 className="ps-5"> Invoices </h2>
                    <div className="m-lg-5 mx-2 shadow">
                      {data?.final_data?.length ? (
                        data?.final_data?.map((item, index) => {
                          return (
                            <div
                              className="row MyProjectDisplayRow"
                              key={index}
                            >
                              <div className="col-md-6  d-flex align-items-center ">
                                <img
                                  src={item.professioanl_image}
                                  className="img-fluid rounded-circle"
                                  style={{
                                    width: "70px",
                                    height: "70px",
                                    cursor: "pointer",
                                  }}
                                  alt=""
                                />
                                <div className="ps-3">
                                  <h4
                                    className="underline_hover"
                                    onClick={() => {
                                      navigate(
                                        `/professionalprofile/${item?.professioanl_id}`
                                      );
                                    }}
                                  >
                                    {item.professional_name}
                                  </h4>
                                  <h6>{item.billing_date}</h6>
                                </div>
                              </div>
                              <div className="col-md-3 d-grid align-items-center">
                                {" "}
                                <h5 className="billingReason">
                                  {item.billing_reason}
                                </h5>
                              </div>
                              <div className="col-md-3 d-grid align-items-center">
                                <h5 className="biilingInvoice">
                                  <a
                                    href={item.billing_invoice}
                                    target="_blank"
                                    className=""
                                    style={{
                                      textDecoration: "none",
                                      color: "#00A78B",
                                    }}
                                  >
                                    Invoice
                                  </a>
                                </h5>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div
                          style={{ minHeight: "600px" }}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <span className="h4">No Invoices Data To Show</span>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
              {data && data?.total_data > 5 && (
                <Pagination className="ps-5 paginationBoxProfessionalDashboard">
                  <Pagination.First
                    onClick={() => {
                      setMyProjectPageId({
                        page: 1,
                        ...myProjectPageId,
                      });
                    }}
                  />
                  <Pagination.Prev
                    onClick={() => {
                      setMyProjectPageId((prev) => ({
                        ...prev,
                        page:
                          myProjectPageId?.page !== 1
                            ? myProjectPageId?.page - 1
                            : 1,
                      }));
                    }}
                  />
                  {paginationArray?.map((res, key) => (
                    <Pagination.Item
                      key={key}
                      active={myProjectPageId?.page === res}
                      onClick={() => {
                        setMyProjectPageId((prev) => ({
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
                      setMyProjectPageId((prev) => ({
                        ...prev,
                        page:
                          paginationArray?.length !== myProjectPageId?.page
                            ? myProjectPageId?.page + 1
                            : myProjectPageId?.page,
                      }));
                    }}
                  />
                  <Pagination.Last
                    onClick={() => {
                      setMyProjectPageId((prev) => ({
                        ...prev,
                        page: paginationArray?.length,
                      }));
                    }}
                  />
                </Pagination>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Billing;
