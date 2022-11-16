import React, { useEffect, useState } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { useCookies } from 'react-cookie';

const Home = () => {

  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(['XSRF-TOKEN']);
  const loogedInUser = localStorage.getItem("user");

  const message = loogedInUser ?
    <h2>Welcome, {loogedInUser}!</h2> :
    <p>Please login</p>;

  const button = loogedInUser ?
    <div>
      <Button color="link"><Link to="/feedingchart">Manage Baby</Link></Button>
    </div> :
    <h2> You are looged out successfully..!!</h2>;

  if (loading) {
    return <p>Loading...</p>;
  }

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

export default Home;
