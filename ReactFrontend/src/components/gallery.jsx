import React from "react";
import "./styling/gallery.css";

export const Gallery = () => {
  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Galleri</h2>
          <p>Se några av våra tidigare projekt här</p>
        </div>
        <div className="row">
          <div className="portfolio-items">
            <div className="col-sm-6 col-md-4 col-lg-4">
              <div className="portfolio-item">
                <div className="hover-bg">
                  <a href="/path/to/full-image1.jpg" title="Project 1" data-lightbox-gallery="gallery1">
                    <div className="hover-text">
                      <h4>Projekt 1</h4>
                      <p>kort om projektet</p>
                    </div>
                    <img src={`${process.env.PUBLIC_URL}/img/place_holder_image.jpeg`} className="img-responsive" alt="Project 1"/>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-4">
              <div className="portfolio-item">
                <div className="hover-bg">
                  <a href="/path/to/full-image2.jpg" title="Project 2" data-lightbox-gallery="gallery1">
                    <div className="hover-text">
                      <h4>Projekt 2</h4>
                      <p>kort om projektet</p>
                    </div>
                    <img src={`${process.env.PUBLIC_URL}/img/place_holder_image.jpeg`} className="img-responsive" alt="Project 2"/>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-4">
              <div className="portfolio-item">
                <div className="hover-bg">
                  <a href="/path/to/full-image3.jpg" title="Project 3" data-lightbox-gallery="gallery1">
                    <div className="hover-text">
                      <h4>Projekt 3</h4>
                      <p>kort om projektet</p>
                    </div>
                    <img src={`${process.env.PUBLIC_URL}/img/place_holder_image.jpeg`} className="img-responsive" alt="Project 3"/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};