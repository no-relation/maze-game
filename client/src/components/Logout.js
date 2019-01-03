import React, { Component } from "react";
import { Link } from 'react-router-dom'

export class Logout extends Component {
  render() {
    return (
      <div>
        <Link to="/" onClick={this.props.logoutPlayer}>Logout</Link>
      </div>
    );
  }
}

// export const Logout = withRouter(_Logout)