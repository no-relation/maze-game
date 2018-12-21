import React, { Component } from "react";

export class Login extends Component {
  render() {
    return (
      <form onSubmit={this.login}>
        <h3>Login</h3>
        <div className="form-group">
          <label className="control-label">Username</label>
          <input
            name="usernameInput"
            placeholder="Enter username"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label className="control-label">Email</label>
          <input
            name="emailInput"
            placeholder="Enter email"
            className="form-control"
            type="email"
          />
        </div>
        <div className="form-group">
          <label className="control-label">Password</label>
          <input
            name="passwordInput"
            placeholder="Enter password"
            className="form-control"
            type="password"
          />
        </div>
        <button onClick={() => this.goTo(`/mazes`)} className="btn btn-primary">
          Login
        </button>
      </form>
    );
  }

  goTo = url => {
    this.props.history.push(url);
  };

  login = e => {
    e.preventDefault();
    fetch("http://localhost:3000/api/v1/auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: e.target.emailInput.value,
        password: e.target.passwordInput.value
      })
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        localStorage.setItem("token", result.token);
      });
  };
}
