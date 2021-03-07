import React from "react";
import "../App.css";
import "../index.css";
import Navbar from "./Navbar"
import "./component.css";

class Home extends React.Component {
    render() {
        return (
            <div className="container">
            <div className ="negBot">

                <h1 className = "h1-home">Hi there, <br/> welcome to food-baby</h1>
                <div className="bodyStart">
                        <div className="homeImage">
                        <img src = '../graphics/home1.png' alt=""/>
                        </div>
                <p className="bodyStyle">1. Search for your food by taking a picture or typing it in!</p>
                    <div className="homeImage1">
                        <img src = '../graphics/home2.png' alt=""/>
                    </div>
                <p className="bodyStyle">2. Select the foods you’re craving, we’ll keep track.</p>
                    <div className="homeImage2">
                        <img src = '../graphics/home3.png' alt=""/>
                    </div>
                <p className="bodyStyle">3. Vuala! We’ll show you which ones are good and bad, click into them to find out more!</p>

                </div>
               
                <div className="leftUpAdjust">
                    <Navbar/>                
                </div>
            </div>
        </div>
        );
    }
}

export default Home;
