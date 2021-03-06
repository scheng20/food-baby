import React from "react";

class Upload extends React.Component {
    constructor(props) {
        super(props);
        //this.props.clearItemList;
    }

    render() {
        return (
            <div>
                <h1>Upload</h1>
                <button><a href="/select">Upload</a></button>
            </div>
        );
    }
}

export default Upload;