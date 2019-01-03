import React, { Component } from "react";

export class PlayerDetail extends Component {
  state = {
    player: null,
    isCurrentPlayer: false
  };

  playerID() {
    return this.props.match.params.id;
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/players/${this.playerID()}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(player => {
        this.setState (state => {
          state.player = player
          if (player.id.toString() === this.playerID()) {
            state.isCurrentPlayer = true
          }
          return state
        })
      })
  }

  renderEditDelete() {
    if (this.state.isCurrentPlayer) {
      return (
        <div>
          <button className="btn btn-primary" onClick={this.editPlayer}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={this.destroyPlayer}>
            Delete
          </button>
        </div>
      )
    }
  }

  render() {
    let { player, errorMessage } = this.state;
    if (errorMessage)
      return (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      );
    if (player === null) return <h3>Loading...</h3>;
    return (
      <div>
        <h3>{player.username}</h3>
        <p>Email: {player.email}</p>
        {this.renderEditDelete()}
      </div>
    );
  }

  editPlayer = () => {
    this.props.history.push(`/players/${this.playerID()}/edit`);
  };

  destroyPlayer = () => {

    fetch(`http://localhost:3000/api/v1/players/${this.playerID()}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(() => this.props.logoutPlayer())
  };
}
