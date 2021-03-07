import React from "react";
import "../App.css";
import "../index.css";

class Home extends React.Component {
    render() {
        return (
            <div className="container">
                <div>
                    <h1>Hi there, <br /> welcome to food-baby</h1>
                    <p1>1. Search for your food by taking a picture or typing it in!</p1>
                    <p2>2. Select the foods you’re craving, we’ll keep track.</p2>
                    <p3>3. Vuala! We’ll show you which ones are good and bad, click into them to find out more!</p3>
                    <div>
                        <button><a href="/search">Search</a></button>
                        <button><a href="/upload">Upload</a></button>
                        <button><a href="/camera">Camera</a></button>
                    </div>
                    <containerHome></containerHome>
                    <div className="tips">

                    </div>
                    <div className="explanation">

                    </div>
                </div></div>
        );
    }
}

export default Home;
