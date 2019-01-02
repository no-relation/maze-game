import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Game } from "./Game";
import { Login } from "../components/Login";
import { PlayerList } from "../components/PlayerList";
import { PlayerEdit } from "../components/PlayerEdit";
import { PlayerDetail } from "../components/PlayerDetail";
import { MazeList } from "../components/MazeList";
import { Maze } from "../components/Maze";
import { SignUp } from "../components/SignUp";
import { Logout } from "../components/Logout";
import { NavigationBar } from "../components/NavigationBar"
import { PrivateRoute } from '../components/PrivateRoute';

let currentPlayer;

try {
  currentPlayer = JSON.parse(localStorage.getItem('player'))

} catch (error) {
  console.log('Could not find player')
}
class App extends Component {

  state = {
    currentPlayer: currentPlayer
  }

  setCurrentPlayer = (player) => {
    this.setState ({ currentPlayer: player })
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="container">
            <NavigationBar currentPlayer={this.state.currentPlayer} setCurrentPlayer={this.setCurrentPlayer} />
            <Switch>
              <PrivateRoute path="/game" component={Game} />
              <PrivateRoute path="/players/:id/edit" component={PlayerEdit} />
              <PrivateRoute path="/players/:id" component={PlayerDetail} />
              <Route path="/players/" component={PlayerList} />
              <PrivateRoute path="/signup" component={SignUp} />
              <PrivateRoute path="/mazes/:id" component={Maze} />
              <PrivateRoute path="/mazes" component={MazeList} />
              <Route path="/login" render={(props) =>  <Login {...props} setCurrentPlayer={this.setCurrentPlayer} />} />
              <Route path="/logout" render={(props) => <Logout {...props} setCurrentPlayer={this.setCurrentPlayer}/>} />
              <Route path="/" render={(props) => <Login {...props} setCurrentPlayer={this.setCurrentPlayer} />} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
