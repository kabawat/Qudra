import React from "react";
import axios from "axios";
import { useContext } from "react";

import Global from "../../context/Global";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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
  const showCatagories = (catagoryId, subCatagoryId) => {
    console.log(catagoryId, subCatagoryId);
    if (contextData?.userData?.role === "client") {
      contextData?.professional_user_profile_data?.details?.professional_id &&
        axios
          .post("http://13.52.16.160:8082/professional/sub_cat_data", {
            client_id: contextData?.userData?.user_id,
            user_token: contextData?.userData?.user_token,
            role: contextData?.userData?.role,
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
    if (contextData?.userData?.role === "professional") {
      axios
        .post("http://13.52.16.160:8082/professional/sub_cat_data", {
          user_token: contextData?.userData?.user_token,
          user_id: contextData?.userData?.user_id,
          role: contextData?.userData?.role,
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
        className="theme-bg-color d-block"
        onClick={() => {
          showCatagories(catagoryId, subCatagoryId);
        }}
      >
        <div className="card border-0 flex-row bg-transparent text-white">
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
