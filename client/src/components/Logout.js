import React, { Component } from "react";

export class Logout extends Component {
  logoutPlayer = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('player');
    this.props.setCurrentPlayer(null);
    this.props.history.push("/login");
  };

  render() {
    return (
      <div>
        <button onClick={this.logoutPlayer}>Logout</button>
      </div>
    );
  }
}
