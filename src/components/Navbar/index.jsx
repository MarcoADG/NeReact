import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { NavbarStyle } from "./style";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

function NavBar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <NavbarStyle>
      <Container>
        <Navbar.Brand href="#home">Neki</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Link to="/" onClick={handleLogout} className="nav-link">
              Log out
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </NavbarStyle>
  );
}

export default NavBar;
