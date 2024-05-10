import React from "react";
import "./styling/about.css";

export const About = () => {
  return (
    <div id="about">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <img src={`${process.env.PUBLIC_URL}/img/dummy.png`} className="img-responsive" alt="About Us" />
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>About Us</h2>
              <p>Vi kan bistå med hjälp vid alla möjliga sorters el jobb</p>
              <h3>Vad kan vi hjälpa er med?</h3>
              <div className="list-style">
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    <li>Service</li>
                    <li>Värmepumpar</li>
                    <li>Belysning</li>
                  </ul>
                </div>
                <div className="col-lg-6 col-sm-6 col-xs-12">
                  <ul>
                    <li>Rut/rot</li>
                    <li>Ute & inne</li>
                    <li>Privat & Företag</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
