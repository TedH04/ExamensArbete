import React from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Partners } from "./components/partners";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import { UserContextProvider } from './contexts/UserContext';
import {JobContextProvider} from './contexts/JobContext';
import { Account } from "./components/account";
import "./App.css";

const App = () => {

  return (
    <UserContextProvider>
        <JobContextProvider>
        <Navigation />
        <Header />
        <Features />
        <About />
        <Partners />
        <Gallery />
        <Testimonials />
        <Team />
        <Account />
        <Contact />
        </JobContextProvider>
      </UserContextProvider>
  );
};

export default App;
