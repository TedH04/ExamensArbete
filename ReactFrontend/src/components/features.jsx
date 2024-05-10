import React from "react";
import './styling/features.css'

export const Features = () => {
  return (
    <div id="features" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>Tjänster</h2>
        </div>
        <div className="row">
          <div className="col-xs-6 col-md-3">
            <i className="fa fa-comments-o"></i> 
            <h3>Exceptionell Kommunikation</h3>
            <p>Vi prioriterar tydlighet och öppenhet i alla våra interaktioner för att säkerställa att våra kunders behov och förväntningar alltid uppfylls med högsta möjliga standard.</p>
          </div>
          <div className="col-xs-6 col-md-3">
            <i className="fa fa-bullhorn"></i> 
            <h3>Professionellt Utfört Arbete</h3>
            <p>Vårt team av erfarna elektriker är hängivna till att leverera arbete av högsta kvalitet, där noggrannhet och uppmärksamhet på detaljer står i centrum.</p>
          </div>
          <div className="col-xs-6 col-md-3">
            <i className="fa fa-group"></i> 
            <h3>Omfattande Portfolio av Nöjda Kunder</h3>
            <p>Vår historik av framgångsrika projekt och positiva kundrecensioner speglar vår förmåga att konsekvent överträffa kundförväntningar.</p>
          </div>
          <div className="col-xs-6 col-md-3">
            <i className="fa fa-magic"></i> 
            <h3>Världsklass Elektriker</h3>
            <p>Vi är stolta över att erbjuda tjänster från branschledande elektriker, vars expertis och kunskap säkerställer att alla uppdrag hanteras med oöverträffad skicklighet och professionalism.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
