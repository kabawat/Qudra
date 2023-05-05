import React from "react";

const HomeServiceCard = ({ text, image, funtion, navigate_icon }) => {
  return (
    <div className="hover-section">
      <div
        className="services-section"
        onClick={funtion}
        style={{ cursor: "pointer" }}
      >
        <div className="find-services-ineer-img">
          <img alt="" src={image} />
        </div>
        <h6>{text}</h6>
        <img alt={text} src={navigate_icon} />
      </div>
    </div>
  );
};

export default HomeServiceCard;
