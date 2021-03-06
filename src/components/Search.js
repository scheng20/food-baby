import React from "react";

class Search extends React.Component {
    constructor(props) {
        super(props);
        //this.props.clearItemList;
        this.state = {
            item: ""
        }
    }

    handleSubmit = () => {
        alert(this.state.item);
    }

    render() {
        return (
            <div>
                <h1>Search</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name={this.state.item}></input>
                    <input type="submit" value="Search"></input>
                </form>
            </div>
        );
    }
}

export default Search;