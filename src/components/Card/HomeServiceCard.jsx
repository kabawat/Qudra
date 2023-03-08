import React from "react";

const HomeServiceCard = ({ text, image, funtion, navigate_icon }) => {
  return (
    <div className="hover-section">
      <div className="services-section">
        <div className="find-services-ineer-img">
          <img alt="" src={image} />
        </div>
        <h6>{text}</h6>
        <img
          style={{ cursor: "pointer" }}
          alt={text}
          src={navigate_icon}
          onClick={funtion}
        />
      </div>
    </div>
  );
};

export default HomeServiceCard;
