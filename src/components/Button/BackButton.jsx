import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const Wrapper = styled.button`
  font-size: 18px;
  color: #0f9e83;
  background-color: white;
  border: 2px solid;
  padding: 8px 60px;
  border-radius: 50px;
  transition: 0.2s ease-in-out;
  &:hover {
    svg,
    i {
      color: white !important;
    }
    color: white;
    background-color: #0f9e83;
  }
  svg,
  i {
    color: #0f9e83 !important;
    margin-right: 10px;
    transition: 0.2s ease-in-out;
  }
`;
const BackButton = ({ text, customClass }) => {
  const navigate = useNavigate();
  return (
    <Wrapper className={customClass} onClick={() => navigate(-1)}>
      <BiArrowBack />
      {text}
    </Wrapper>
  );
};

export default BackButton;
