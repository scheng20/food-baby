import React from "react";

class Tabs extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <h1>Food Baby</h1>
                </div>
                <div>
                    <ul>
                        <li><a href="#0" onClick={() => this.props.onTabChange('home')}>Home</a></li>
                        <li><a href="#0" onClick={() => this.props.onTabChange('search')}>Search</a></li>
                        <li><a href="#0" onClick={() => this.props.onTabChange('upload')}>Upload</a></li>
                        <li><a href="#0" onClick={() => this.props.onTabChange('camera')}>Camera</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Tabs;