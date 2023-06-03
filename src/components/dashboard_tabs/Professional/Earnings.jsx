import React, { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Dashboardside from "../../ProfessionalDashboardside";
import { HeaderDashboard } from "../../Header";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { BaseUrl } from "../../../BaseUrl";
import { useCookies } from "react-cookie";
import { BsWallet2 } from "react-icons/bs";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaMoneyCheckAlt } from "react-icons/fa";

function Earnings() {
  const [cookies] = useCookies();

  const [loading, setLoading] = useState(true);
  const [earning, setEarning] = useState([]);

  useEffect(() => {
    axios
      .post(`${BaseUrl}/professional/prof_earning_status/`, {
        user_id: cookies?.user_data?.user_id,
        user_token: cookies?.user_data?.user_token,
      })
      .then((res) => {
        setLoading(false);
        setEarning(res?.data?.data);
      });
  }, []);
  return (
    <>
      <div className="dashboard">
        <div className="container-fluid h-100">
          <div className="row h-100 dashboard-theme-color">
            <div className="col-xxl-2 col-md-3 col-lg-3 px-0 dashboard-theme-color">
              <Dashboardside />
            </div>
            <div className="col-xxl-10 col-md-9 col-lg-9 custom-border-radius-one  dashboard-theme-skyblue px-0 dashboard-right-section">
              <HeaderDashboard />
              {loading ? (
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={loading}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              ) : (
                <main className="dashboard-main">
                  <h2 className="ps-5 pt-3" style={{ color: "#01a789" }}>
                    {" "}
                    Earnings
                  </h2>
                  <div className="m-xl-5 mx-2 shadow">
                    {earning?.data?.data?.earning_on_way == 0 &&
                    earning?.data?.data?.total_earning == 0 &&
                    earning?.data?.data?.wallet == 0 ? (
                      <>
                        <div
                          style={{ minHeight: "300px" }}
                          className="d-flex justify-content-center align-items-center shadow"
                        >
                          <span className="h4">No Earning To Show</span>
                        </div>
                      </>
                    ) : (
                      <div className="row earning_row m-0">
                        <div className="col-xl-4 earning_row_col">
                          <h2>
                            <BsWallet2 color="#01a789" size={40} />{" "}
                            <span
                              style={{ color: "#01a789" }}
                              className="px-2 heading_earing"
                            >
                              Wallet
                            </span>
                            <br />
                            <span className="earning_row_col_data">
                              $ {earning?.wallet}
                            </span>
                          </h2>
                        </div>
                        <div className="col-xl-4 earning_row_col">
                          <h2>
                            <RiSecurePaymentLine color="#01a789" size={40} />
                            <span
                              style={{ color: "#01a789" }}
                              className="px-2 heading_earing"
                            >
                              Holding Payment
                            </span>
                            <br />
                            <span className="earning_row_col_data">
                              {" "}
                              $ {earning?.earning_on_way}
                            </span>
                          </h2>
                        </div>

                        <div className="col-xl-4 earning_row_col">
                          <h2>
                            <FaMoneyCheckAlt color="#01a789" size={40} />
                            <span
                              style={{ color: "#01a789" }}
                              className="px-2 heading_earing"
                            >
                              {" "}
                              Total Earnings
                            </span>
                            <br />
                            <span className="earning_row_col_data">
                              {" "}
                              $ {earning?.total_earning}
                            </span>
                          </h2>
                        </div>
                      </div>
                    )}
                  </div>
                </main>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Earnings;
