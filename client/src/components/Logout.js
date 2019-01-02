import React, { Component } from "react";
import { withRouter, Link } from 'react-router-dom'

class _Logout extends Component {
  logoutPlayer = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('player');
    this.props.setCurrentPlayer(null);
    this.props.history.push("/login");
  };

  render() {
    return (
      <div>
        <Link to="/" onClick={this.logoutPlayer}>Logout</Link>
      </div>
    );
  }
}

export const Logout = withRouter(_Logout)