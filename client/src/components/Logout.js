import React, { Component } from "react";

export class Logout extends Component {
  logoutPlayer = () => {
    localStorage.clear();
  };

  render() {
    return (
      <div>
        <button onClick={this.logoutPlayer}>Logout</button>
      </div>
    );
  }
}
