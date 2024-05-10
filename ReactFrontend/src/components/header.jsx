import React from "react";
import './styling/header.css'

export const Header = () => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-offset-2 intro-text">
                <h1>
                JLH EL AB
                  <span></span>
                </h1>
                <p>Din lokala elinstallatör</p>
                <a
                  href="#features"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  Läs Mer
                </a>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};