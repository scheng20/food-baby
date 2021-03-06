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
import List_Multi from "./components/List_Multi";
import List_Single from "./components/List_Single";

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     tab: 'home'
  //   }
  // }
  

  render() {
    return (
      <div className="App">

        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/search">search</Link>
              </li>
              <li>
                <Link to="/upload">upload</Link>
              </li>
              <li>
                <Link to="/camera">camera</Link>
              </li>
              <li>
                <Link to="/list_multi">list_multi</Link>
              </li>
              <li>
                <Link to="/list_single">list_single</Link>
              </li>
            </ul>
            <Switch>
              <Route exact path="/">
                <Home onButtonClick={this.changeTabComponent}/>
              </Route>
              <Route path="/search">
                <Search />
              </Route>
              <Route path="/upload">
                <Upload />
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
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
