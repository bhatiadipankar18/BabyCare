import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class Home extends Component {


    render() {

        return (
            <div>
                <nav>
                    <Link to="/">home</Link>
                </nav>
                <nav>
                    <Link to="/Feeding">Feeding</Link>
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