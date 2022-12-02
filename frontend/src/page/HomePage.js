import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class HomePage extends Component {


    render() {

        return (
            <div>
                <p style={{
                    fontSize:'90px',
                    paddingTop: "15%",
                    "textAlign": "center"}}> Welcome to BabyCare! </p>
            </div>
        );
    }
}

export default HomePage;