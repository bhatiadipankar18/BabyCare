import React, { Component } from 'react';
import '../../App.css';
import AppNavbar from '../../components/AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';


class Home extends Component {
    render() {

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    {/* <Button color="link"><Link to="/feeding">feeding</Link></Button> */}
                    <Button color="link"><Link to="/login">Login</Link></Button>
                    <Button color="link"><Link to="/register">Register</Link></Button>
                    <Button color="link"><Link to="/feeding">Feeding</Link></Button>
                    <Button color="link"><Link to="/logout">Logout</Link></Button>
                    <Button color="link" onClick={() => { this.logout() }}>Info</Button>
                    <h1> Manage the heath of your baby with BabyCare </h1>
                    </Container>
               
            </div>
            
        );


    }


    logout =()=> {
        console.log(11);
        localStorage.removeItem("token");
    }
}

export default Home;