import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './styling/navigation.css';

export const Navigation = (props) => {
  return (
    <Navbar expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#page-top">JLH EL</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#services">Services</Nav.Link>
            <Nav.Link href="#portfolio">Gallery</Nav.Link>
            <Nav.Link href="#testimonials">Testimonials</Nav.Link>
            <Nav.Link href="#team">Team</Nav.Link>
            <Nav.Link href="#account">Account</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
