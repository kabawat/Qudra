import React from "react";
import axios from "axios";
import { useContext } from "react";

import Global from "../../context/Global";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { BaseUrl } from "../../BaseUrl";
const Wrapper = styled.div`
  .theme-bg-color {
    height: 270px;
    display: flex;
    border-radius: 15px;
    align-items: flex-end;
    position: relative;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    h4 {
      font-size: 16px;
      font-weight: bold;
      color: #fff;
    }
  }
`;
const CatagoryResultCard = ({ res, key, catagoryId, subCatagoryId }) => {
  const contextData = useContext(Global);
  const navigate = useNavigate();
  const [cookies] = useCookies();
  const showCatagories = (catagoryId, subCatagoryId) => {
    if (cookies?.user_data?.role === "client") {
      contextData?.professional_user_profile_data?.details?.professional_id &&
        axios
          .post(`${BaseUrl}/professional/sub_cat_data`, {
            client_id: cookies?.user_data?.user_id,
            user_token: cookies?.user_data?.user_token,
            role: cookies?.user_data?.role,
            category_id: catagoryId,
            sub_category_id: subCatagoryId,
            professional_id:
              contextData?.professional_user_profile_data?.details
                ?.professional_id,
          })
          .then((res) => {
            if (res?.data?.status === "Success") {
              navigate("/categoryresult", { state: res?.data });
            }
          });
    }
    if (cookies?.user_data?.role === "professional") {
      axios
        .post(`${BaseUrl}/professional/sub_cat_data`, {
          user_token: cookies?.user_data?.user_token,
          user_id: cookies?.user_data?.user_id,
          role: cookies?.user_data?.role,
          category_id: catagoryId,
          sub_category_id: subCatagoryId,
        })
        .then((res) => {
          if (res?.data?.status === "Success") {
            navigate("/categoryresult", { state: res?.data });
          }
        });
    }
  };
  return (
    <Wrapper>
      <div
        key={key}
        className="theme-bg-color d-block HoverCat"
        onClick={() => {
          showCatagories(catagoryId, subCatagoryId);
        }}
      >
        <div className="card border-0 flex-row bg-transparent text-white ">
          <img
            src={res?.unactive_icon}
            className="card-img"
            alt="..."
            style={{
              width: "50px",
              height: "50px",
              borderRadius: 0,
              filter: " brightness(8.5)",
              zIndex: 999,
            }}
          />
          <div className="card-img-overlay theme-bg-color">
            <h4 className="card-title text-capitalize">{res?.sub_category}</h4>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CatagoryResultCard;
