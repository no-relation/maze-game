import React, { Component } from "react";
import { Link } from "react-router-dom";
import { API } from "./API.js"

export class PlayerList extends Component {
  state = {
    players: []
  };

  componentDidMount() {
    fetch(`${API}/players`)
      .then(res => res.json())
      .then(players => {
        this.setState({ players });
      });
  }

  render() {
    const { players } = this.state;
    return (
      <table className="table">
        <thead>
          <tr>
            <td>Username</td>
            <td>Email</td>
            {/* <td>Password</td> */}
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player.id} >
              <td>
                <Link to={`/players/${player.id}`}>{player.username}</Link>
              </td>
              <td>{player.email}</td>
              <td>{player.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
