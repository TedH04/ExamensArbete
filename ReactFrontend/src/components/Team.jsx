import React from "react";
import "./styling/team.css";

export const Team = () => {

  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-8 col-md-offset-2 section-title">
          <h2>Vi på JLH EL</h2>
          <p>Här är vårt team på JLH</p>
        </div>
        <div id="row">
          {/* chefen */}
          <div className="col-md-3 col-sm-6 team">
            <div className="thumbnail">
            <img src={`${process.env.PUBLIC_URL}/img/place_holder_image.jpeg`} alt="Team Member 1" className="team-img" />
              <div className="caption">
                <h4>Jerry Hamrén</h4>
                <p>Chief Executive Officer</p>
              </div>
            </div>
          </div>
          {/* anställd */}
          <div className="col-md-3 col-sm-6 team">
            <div className="thumbnail">
            <img src={`${process.env.PUBLIC_URL}/img/place_holder_image.jpeg`} alt="Team Member 2" className="team-img" />
              <div className="caption">
                <h4>Ludvig</h4>
                <p>Lead Electrician</p>
              </div>
            </div>
          </div>
          {/* lägg in fler anställda här */}
        </div>
      </div>
    </div>
  );
};
