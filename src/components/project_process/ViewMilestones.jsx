import React from "react";
import { Header2 } from "../Header";
const ViewMilestones = ({ location }) => {
  const customStyleOne = {
    borderRadius: "30px",
    filter: "drop-shadow(2.5px 4.33px 6.5px rgba(0,0,0,0.2))",
    padding: "100px 0",
  };
  return (
    <div className="create-account">
      <Header2 />
      <main>
        <div className="container mb-5 bg-white" style={customStyleOne}>
          <div className="row m-0">
            <div className=" col-xxl-8 col-xl-9 col-lg-10 col-md-11 col-sm mx-auto">
              <section className="projectMilestoneInfo">
                <h3 className="theme-text-color fs-24 mt-5 mb-4">Milestone</h3>
                {location?.state?.milesStoneData?.map((res) => (
                  <div className="milestoneBox">
                    <p>{res?.milestone_name}</p>
                    <button>{res?.milestone_date}</button>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewMilestones;
