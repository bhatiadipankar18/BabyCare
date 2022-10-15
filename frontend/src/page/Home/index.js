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
                    <Button color="link"><Link to="/login">login</Link></Button>
                    <Button color="link"><Link to="/register">register</Link></Button>
                    <Button color="link"><Link to="/feeding">feeding</Link></Button>
                    <Button color="link" onClick={() => { this.logout() }}>logout</Button>

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