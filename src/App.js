//import logo from './logo.svg';
import './App.css';
import React from "react";
import Home from "./components/Home";
import Search from "./components/Search";
import Upload from "./components/Upload";
import Camera from "./components/Camera";
import Select from "./components/Select";
import background from "./images/Home.jpg";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import List_Multi from "./components/List_Multi";
import List_Single from "./components/List_Single";
import List from './components/List';

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      itemList: []
    }
  }

  addItem = itemList => {
    this.setState({
      ...this.state,
      itemList
    });
  }

  clearItemList = () => {
    this.state.itemList = [];
  }
  
  render() {
    console.log(this.state.itemList);
    return (
      <div className="App container full-background" style={{ backgroundImage: `url(${background})` }}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
              <Route path="/search">
                <Search
                  itemList={this.state.itemList}
                  addItem={this.addItem}
                />
              </Route>
              <Route path="/upload">
                <Upload
                  itemList = {this.state.itemList}
                  addItem={this.addItem}
                />
              </Route>
              <Route path="/camera">
                <Camera />
              </Route>
              <Route path="/select">
                <Select />
              </Route>
              <Route path="/list_multi">
                <List_Multi />
              </Route>
              <Route path="/list_single">
                <List_Single />
              </Route>
              <Route path="/list">
                <List itemList={this.state.itemList} />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}