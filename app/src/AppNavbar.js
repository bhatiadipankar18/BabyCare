import React, { useState } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const AppNavbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userType = localStorage.getItem("userType");

  return (
    isLoggedIn ?
    <Navbar color="dark" dark expand="md">
      <Collapse isOpen={isOpen} navbar>
      <NavbarBrand tag={Link} to="/">Home</NavbarBrand>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <NavbarBrand tag={Link} to="/feedingchart">{userType == 'parents' ? 'Parents' : 'Nanny'}</NavbarBrand>
      <NavbarToggler onClick={() => { setIsOpen(!isOpen) }}/>
      <NavbarToggler onClick={() => { setIsOpen(!isOpen) }}/>
      </Collapse>
      <Collapse isOpen={isOpen} navbar>
        <Nav className="justify-content-end" style={{width: "100%"}} navbar>
          <NavbarBrand tag={Link} to="/logout">Logout</NavbarBrand>
        </Nav>
      </Collapse>
    </Navbar>
    : 
    <Navbar color="dark" dark expand="md">
      <Collapse isOpen={isOpen} navbar>
        <Nav className="justify-content-end" style={{width: "100%"}} navbar>
          <NavbarBrand tag={Link} to="/login">Login</NavbarBrand>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default AppNavbar;
