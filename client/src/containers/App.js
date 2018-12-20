import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Game } from "./Game";
import { MazeList } from "../components/MazeList";
import { Maze } from "../components/Maze";

// import { Login } from "../components/Login";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className='container'>
            <Switch>
              {/* <Route path='/login' component={Login} /> */}
              <Route path='/game' component={Game} />
                <Route path='/mazes/:id' component = {Maze}/> */}
                <Route path='/mazes' component = {MazeList} /> 
              {/* <Route path='/players/:id/edit' component={PlayerEdit} />
              <Route path='/players/:id' component={Player} /> */}
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
