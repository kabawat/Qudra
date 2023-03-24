import React from "react";
import clientGuideVid from "../../assets/vid/clientGuidelineVid.mp4";
import clientGuidelineImg1 from "../../assets/img/clientGuideImg1.jpg";
import clientGuidelineImg2 from "../../assets/img/clientGuideImg2.jpg";
import clientGuidelineImg3 from "../../assets/img/clientGuideImg3.jpg";
import clientGuidelineImg4 from "../../assets/img/clientGuideImg4.jpg";
import clientGuidelineImg5 from "../../assets/img/clientGuideImg5.jpg";
import clientGuidelineImg6 from "../../assets/img/clientGuideImg6.jpg";
import clientGuidelineImg7 from "../../assets/img/clientGuideImg7.jpg";
import clientGuidelineImg8 from "../../assets/img/clientGuideImg8.jpg";

const ClientGuidlines = () => {
  return (
    <div className="client-guidelines-wrapper">
      <div className="video-container">
        <video
          src={clientGuideVid}
          controls
          poster={clientGuidelineImg1}
          preload="auto"
        >
          This video can't be played
        </video>
      </div>
      <div className="images-container">
        <ul className="image-list">
          <li>
            <img src={clientGuidelineImg1} alt="guideline-image1" />
          </li>
          <li>
            <img src={clientGuidelineImg2} alt="guideline-image2" />
          </li>
          <li>
            <img src={clientGuidelineImg3} alt="guideline-image3" />
          </li>
          <li>
            <img src={clientGuidelineImg4} alt="guideline-image4" />
          </li>
          <li>
            <img src={clientGuidelineImg5} alt="guideline-image5" />
          </li>
          <li>
            <img src={clientGuidelineImg6} alt="guideline-image6" />
          </li>
          <li>
            <img src={clientGuidelineImg7} alt="guideline-image7" />
          </li>
          <li>
            <img src={clientGuidelineImg8} alt="guideline-image8" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ClientGuidlines;

// style = { {
//     display: 'flex',
//         justifyContent: 'center',
//             height: '100vh',
//                 paddingTop: '7%'
// } }

// vid tag
// style = { {
//     width: '90%',
//         height: '60%'
// } }
