import React, { useEffect, useState } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { useCookies } from 'react-cookie';

const Logout = () => {

  localStorage.removeItem("user");
  localStorage.removeItem("userType");
  localStorage.removeItem("isLoggedIn");
  const message = <p>Please login</p>;
  const button = <h2> You are logged out successfully..!!</h2>;

  return (
    <div>
      <AppNavbar/>
      <Container fluid>
        {message}
        {button}
      </Container>
    </div>
  );
}

export default Logout;
