import React, { Component } from "react";

export class PlayerDetail extends Component {
  state = {
    player: null
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
        if (!player.error) this.setState({ player });
        else this.setState({ errorMessage: player.error });
      });
  }

  render() {
    let { player, errorMessage } = this.state;
    if (errorMessage)
      return (
        <div class="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      );
    if (player === null) return <h3>Loading...</h3>;
    return (
      <div>
        <h3>{player.username}</h3>
        {/* <img className="img-thumbnail" src={player.image_url} /> */}
        <p>Email: {player.email}</p>
        <p>Password: {player.password}</p>
        <button className="btn btn-primary" onClick={this.editPlayer}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={this.destroyPlayer}>
          Delete
        </button>
      </div>
    );
  }

  editPlayer = () => {
    this.props.history.push(`/players/${this.playerID()}/edit`);
  };

  destroyPlayer = () => {
    fetch(`http://localhost:3000/api/v1/players/${this.playerID()}`, {
      method: "DELETE"
    }).then(() => this.props.history.push(`/players/`));
  };
}
