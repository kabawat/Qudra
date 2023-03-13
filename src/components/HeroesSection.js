import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
const HeroesSection = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        id="heroes"
        style={{ position: "relative", background: "cadetblue" }}
      >
        <div
          className="center-text"
          style={{
            position: "absolute",
            zIndex: 1,
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "100%",
          }}
        >
          <h1 className="text-light text-center display-1">
            <Link to="/">
              <img
                src="/static/images/Quadra-transparrent-logo.png"
                className="homePageherosSectionLogo"
                alt="logo"
                style={{ height: "150px" }}
              />
            </Link>
          </h1>
          <TypeAnimation
            className="TypeAnimationHomePage"
            sequence={["A UNIQUE PLATFORM FOR ALL YOUR ARCHITECTURAL NEEDS"]}
            speed={10}
            wrapper="div"
            cursor={true}
            repeat={false}
            style={{
              fontSize: "21px",
              color: "white",
              textAlign: "center",
              marginTop: "30px",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default HeroesSection;
