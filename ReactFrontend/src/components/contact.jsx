import { useState } from "react";
import React from "react";
import "./styling/contact.css";

const initialState = {
  customerType: "individual", // Initial customer type
  name: "",
  address: "",
  city: "",
  postalCode: "",
  email: "",
  description: "",
  companyName: "",
  orgNumber: "",
};

export const Contact = (props) => {
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCustomerTypeChange = (type) => {
    setState({ ...initialState, customerType: type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
  };
  const renderFormFields = () => {
    // Common fields
    const fields = (
      <>
        <div className="form-group">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="För & Efternamn"
            value={state.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="address"
            className="form-control"
            placeholder="Adress"
            value={state.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="city"
            className="form-control"
            placeholder="Stad"
            value={state.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="postalCode"
            className="form-control"
            placeholder="Postnummer"
            value={state.postalCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={state.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            className="form-control"
            rows="4"
            placeholder="Beskriv vad ni behöver hjälp med"
            value={state.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
      </>
    );

    // Additional fields for companies
    if (state.customerType === "company") {
      return (
        <>
          {fields}
          <div className="form-group">
            <input
              type="text"
              name="companyName"
              className="form-control"
              placeholder="Företags Namn"
              value={state.companyName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="orgNumber"
              className="form-control"
              placeholder="Organisations Nummer"
              value={state.orgNumber}
              onChange={handleChange}
              required
            />
          </div>
        </>
      );
    }

    return fields;
  };

  return (
    <div>
      <div id="contact">
        <div className="container">
          <div className="col-md-8">
            <div className="section-title">
              <h2>Skicka jobbförfrågan</h2>
              <p>
              För att skicka in er jobbförfrågan, vänligen fyll i era uppgifter i formuläret nedan.
              </p>
            </div>
            <div className="customer-type-buttons">
              <button
                type="button"
                className={`btn ${state.customerType === "individual" ? "btn-primary" : "btn-default"}`}
                onClick={() => handleCustomerTypeChange("individual")}
              >
                Privatperson
              </button>
              <button
                type="button"
                className={`btn ${state.customerType === "company" ? "btn-primary" : "btn-default"}`}
                onClick={() => handleCustomerTypeChange("company")}
              >
                Företag
              </button>
            </div>
            <form name="sentMessage" validate onSubmit={handleSubmit}>
              {renderFormFields()}
              <button type="submit" className="btn-custom btn-lg">
                Skicka Förfrågan
              </button>
            </form>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>Contact Info</h3>
              <p>
                <span>
                  <i className="fa fa-map-marker"></i> Adress: 
                </span>
                {props.data ? props.data.address : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> Nummer: 
                </span>{" "}
                {props.data ? props.data.phone : "loading"}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Email: 
                </span>{" "}
                {props.data ? props.data.email : "loading"}
              </p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="row">
              <div className="social">
                <ul>
                  <li>
                    <a href="https://www.facebook.com">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.twitter.com">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com">
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div className="container text-center">
          <p>
            &copy; 2023 Design av Ted Hamrén. Design by{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
