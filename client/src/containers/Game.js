import React, { Component } from "react";
import { Maze } from "../components/Maze";

export class Game extends Component {
  timer = () => {};

  render() {
    return (
      <div>
        <button>Start</button>
        <Maze />
      </div>
    );
  }
}
