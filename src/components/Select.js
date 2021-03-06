import React from "react";

class Select extends React.Component {
    handleSumbit(event) {

    }

    render() {
        return (
            <div>
                <h1>Select</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="list">
                        <p>Pizza</p>
                        <input type="checkbox"></input>
                    </div>
                    <input type="submit" value="Confirm"></input>
                </form>
            </div>
        );
    }
}

export default Select;