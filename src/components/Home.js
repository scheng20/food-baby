import React from "react";

class Home extends React.Component {
    constructor(props) {
        super(props);
        //this.props.clearItemList;
    }

    render() {
        return (
            <div>
                <h1>Welcome Message</h1>
                <div>
                    <button><a href="/search">Search</a></button>
                    <button><a href="/upload">Upload</a></button>
                    <button><a href="/camera">Camera</a></button>
                </div>
                <div className="tips">

                </div>
                <div className="explanation">

                </div>
            </div>
        );
    }
}

export default Home;