import React, { Component } from "react";

export class PlayerEdit extends Component {
  state = {
    player: null
  };

  savePlayer = e => {
    e.preventDefault();
    let { usernameInput, emailInput, passwordInput } = e.target;
    let playerID = this.props.match.params.id;
    fetch(`http://localhost:3000/api/v1/players/${playerID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value
      })
    })
      .then(res => res.json())
      .then(() => {
        this.props.history.push(`/players/${playerID}`);
      });
  };

  componentDidMount() {
    let playerID = this.props.match.params.id;

    fetch(`http://localhost:3000/api/v1/players/${playerID}`)
      .then(res => res.json())
      .then(player => this.setState({ player }));
  }

  render() {
    if (this.state.player == null) return <h2>Loading...</h2>;
    const { username, email, password } = this.state.player;
    return (
      <form onSubmit={this.savePlayer}>
        <h3>Edit Player</h3>
        <div className="form-group">
          <label>Username</label>
          <input
            defaultValue={username}
            name="usernameInput"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            defaultValue={email}
            name="emailInput"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            defaultValue={password}
            name="passwordInput"
            className="form-control"
            type="text"
          />
        </div>
        <button className="btn btn-primary">Save</button>
      </form>
    );
  }
}
