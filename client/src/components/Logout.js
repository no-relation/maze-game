import React, { Component } from "react";

export class Logout extends Component {
  logoutPlayer = () => {
    localStorage.clear();
  };

  goTo = url => {
    this.props.history.push(url);
  };

  render() {
    return (
      (
        <div>
          <button onClick={this.logoutPlayer}>Logout</button>
        </div>
      ),
      (
        <div>
          <button onClick={() => this.goTo(`/login`)}>Logout</button>
        </div>
      )
    );
  }
}
