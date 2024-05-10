import React from "react";
import "./styling/partners.css";

export const Partners = () => {
  return (
    <div id="services" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Våra samarbetspartners</h2>
          <p>Vi arbetar nära Rörmokare, Snickare, Golvläggare och diverse hantverkare för en sömlös upplevelse av ert nästa projekt</p>
        </div>
        <div className="row">
          <div className="col-md-4">
            <i className="fa fa-camera-retro"></i>
            <div className="service-desc">
              <h3>Rörmannen</h3>
              <p>Rörmokare</p>
            </div>
          </div>
          <div className="col-md-4">
            <i className="fa fa-rocket"></i>
            <div className="service-desc">
              <h3>Snickare</h3>
              <p>Snickrar</p>
            </div>
          </div>
          <div className="col-md-4">
            <i className="fa fa-cube"></i>
            <div className="service-desc">
              <h3>Golvläggare</h3>
              <p>Lägger golv</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};