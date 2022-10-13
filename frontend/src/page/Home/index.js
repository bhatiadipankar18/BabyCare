import React, { Component } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';



class Home extends Component {


    render() {

        return (
            <div>
                <nav>
                    <Link to="/">home</Link>
                </nav>
                <nav>
                    <Link to="/home2">home2</Link>
                </nav>
                <nav>
                    <Link to="/login">login</Link>
                </nav>
                <nav>
                    <Link to="/register">register</Link>
                </nav>

            </div>
        );
    }
}

export default Home;