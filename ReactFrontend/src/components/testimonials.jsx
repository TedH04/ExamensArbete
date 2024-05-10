import React from "react";
import "./styling/testimonials.css";

export const Testimonials = () => {

  return (

    <div id="testimonials">
      <div className="container">
        <div className="section-title text-center">
          <h2>Recensioner av våra kunder</h2>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="testimonial">
              <div className="testimonial-image">
                <img src={`${process.env.PUBLIC_URL}/img/place_holder_image.jpeg`} alt="Testimonial 1" />
              </div>
              <div className="testimonial-content">
                <p>"Wow vilket bra jobb"</p>
                <div className="testimonial-meta"> - kalle ankarsson </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="testimonial">
              <div className="testimonial-image">
                <img src={`${process.env.PUBLIC_URL}/img/place_holder_image.jpeg`} alt="Testimonial 2" />
              </div>
              <div className="testimonial-content">
                <p>"Proffsen av västerort"</p>
                <div className="testimonial-meta"> - kalle ankarsson </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="testimonial">
              <div className="testimonial-image">
                <img src={`${process.env.PUBLIC_URL}/img/place_holder_image.jpeg`} alt="Testimonial 3" />
              </div>
              <div className="testimonial-content">
                <p>"5/5 hjälpte med mitt hem"</p>
                <div className="testimonial-meta"> - kalle ankarsson </div>
              </div>
            </div>
          </div>
          {/* lägg in fler recensioner här */}
        </div>
      </div>
    </div>
  );
};