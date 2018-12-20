import React, { Component } from "react";
// import { MazeList } from "../components/MazeList";
// import { PlayerEdit } from "../components/PlayerEdit";
// import { Player } from "../components/Player";

export class Game extends Component {
  constructor() {
    super();
    this.state = {
      time: 0,
      intervalID: ""
    };
  }

  timer = () => {
    this.setState({ time: this.state.time + 1 });
  };

  startTime = () => {
    const intervalID = setInterval(this.timer, 1000);
    this.setState({ intervalID: intervalID });
  };

  stopTime = () => {
    clearInterval(this.state.intervalID);
  };

  render() {
    return (
      <div>
        <button className="btn btn-success" onClick={() => this.startTime()}>
          Start
        </button>
        <button className="btn btn-danger" onClick={() => this.stopTime()}>
          Stop
        </button>
        <span>
          <strong>{this.state.time}</strong>
        </span>

        {/* <MazeList /> */}
      </div>
    );
  }
}
