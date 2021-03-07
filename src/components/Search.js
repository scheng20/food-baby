import React from "react";
import './component.css';
import {
    Link 
 } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

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
        this.setState({item: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const newItemList = this.props.itemList;
        newItemList.push(this.state.item);
        this.props.addItem(newItemList);
        this.setState({item: ''});
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
          );
    }
    
    render() {
        console.log(this.state);
        return (
            <div>
                <h1>Search</h1>
                <form onSubmit={this.handleSubmit}>
                <SearchIcon icon={faSearch} />
                    <SearchBar type="text" onChange={this.handleChange}></SearchBar>
                    <input type="submit" value="Add"></input>
                    <FontAwesomeIcon icon={faPlus}/>
                </form>
                <ConfirmButton><Link to="/list">Confirm</Link></ConfirmButton>
                
            </div>
        );
    }
}

export default Search;