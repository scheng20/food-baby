import React from "react";
import './component.css';
import {
    Link
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import Navbar from "./Navbar"

const SearchBar = styled.input`
    padding: 0.5em;
    margin: 0.5em;
    //background-color: #F8F4EA;
    border: none;
    border-radius: 15px;
    outline: none;
    width: 250px;
    font-size: 1em;
`;

const SearchIcon = styled(FontAwesomeIcon)`
    
`;

const ConfirmButton = styled.button`
    background-color: 'black';
    font-color: 'white';
`;

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({ item: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const newItemList = this.props.itemList;
        newItemList.push(this.state.item);
        this.props.addItem(newItemList);
        this.setState({ item: '' });
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
    }

    render() {
        console.log(this.state);
        return (
            <div className = "container">
                <div className = "row top-bar">
                    <div className = "col">
                        <h1 className = "h1-not-abs">Search</h1>
                    </div>
                    <div className = "col">
                        <a href="/">
                        <i class="fas fa-home fas-brown fa-lg"></i>
                        </a>
                    </div>
                </div>
                <form className = "search-bar" onSubmit={this.handleSubmit}>
                    <i class="fas fa-search fa-brown"></i>
                    <SearchBar type="text" onChange={this.handleChange}></SearchBar>
                    <input className = "btn btn-primary" type="submit" value="Add"></input>
                </form>
                <p className = "search-item"> Added Items: </p>
                {
                    this.props.itemList.map((item) => (
                        <p className = "search-item"> {item} </p>
                    ))
                }
                <div className = "search-confirm">
                    <ConfirmButton className = "btn btn-primary"><Link className = "btn-label" to="/list">Confirm</Link></ConfirmButton>
                </div>
                <Navbar/>
            </div>
        );
    }
}

export default Search;