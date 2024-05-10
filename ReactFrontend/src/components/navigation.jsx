import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './styling/navigation.css';

export const Navigation = () => {
  return (
    <Navbar expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#page-top">JLH EL</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#features">Tjänster</Nav.Link>
            <Nav.Link href="#about">Om oss</Nav.Link>
            <Nav.Link href="#services">Partners</Nav.Link>
            <Nav.Link href="#portfolio">Galleri</Nav.Link>
            <Nav.Link href="#testimonials">Recensioner</Nav.Link>
            <Nav.Link href="#team">Team</Nav.Link>
            <Nav.Link href="#account">Account</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
