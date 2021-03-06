//import logo from './logo.svg';
import './App.css';
import React from "react";
import Home from "./components/Home";
import Search from "./components/Search";
import Upload from "./components/Upload";
import Camera from "./components/Camera";
import Select from "./components/Select";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: []
    }
  }

  addItem = (item) => {
    this.state.itemList.push(item);
  }

  clearItemList = () => {
    this.state.itemList = [];
  }
  
  render() {
    return (
      <div className="App">

        <Router>
          <div>
              <Link to="/">Home</Link>
              <Link to="/search">search</Link>
              <Link to="/upload">upload</Link>
              <Link to="/camera">camera</Link>
            <Switch>
              <Route exact path="/">
                <Home clearItemList={this.clearItemList}/>
              </Route>
              <Route path="/search">
                <Search clearItemList={this.clearItemList}/>
              </Route>
              <Route path="/upload">
                <Upload clearItemList={this.clearItemList}/>
              </Route>
              <Route path="/camera">
                <Camera />
              </Route>
              <Route path="/select">
                <Select />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
