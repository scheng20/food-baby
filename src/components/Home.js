import React from "react";
import "../App.css";
import "../index.css";


class Home extends React.Component {
    render() {
        return (
            <div className="container">
            <div className ="negBot">


                <h1>Hi there, <br/> welcome to food-baby</h1>
                <div className="bodyStart">
                    <div className="col-60">
                        <div className="homeImage">
                        <img src = '../graphics/home1.png' alt=""/>
                        </div>
                <p className="bodyStyle">1. Search for your food by taking a picture or typing it in!</p>
                <p className="bodyStyle">2. Select the foods you’re craving, we’ll keep track.</p>
                <p className="bodyStyle">3. Vuala! We’ll show you which ones are good and bad, click into them to find out more!</p>
                    </div>
                </div>
                <div className="leftUpAdjust">
                    <button1><a href="/search">Search</a></button1>
                    <button2><a href="/upload">Upload</a></button2>
                    <button3><a href="/camera">Camera</a></button3>
                    <rect className="bottomBar"></rect>
                </div>
            </div></div>
        );
    }
}

export default Home;
