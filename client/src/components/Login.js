import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import { API } from './API.js'

export class Login extends Component {
  
  state = {
    errorMessage: null
  }

  errorBox() {
    let errorMessage = this.state.errorMessage
    if (errorMessage) {
      return (
        <Alert bsStyle="danger" role="alert">
          {errorMessage}
        </Alert>
      )    
    }
  }

  render() {
    return (
      <div>
        {this.errorBox()}
        <form onSubmit={e => this.login(e)}>
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
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }

  goTo = url => {
    this.props.history.push(url);
  };

  login = e => {
    e.preventDefault();
    fetch(`${API}/auth` , {
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
        if (result.error === "email or password are incorrect") {
          this.setState({ errorMessage: result.error })
        } else {
          localStorage.setItem("token", result.token);
          localStorage.setItem("player", JSON.stringify(result.player));
          this.props.setCurrentPlayer(result.player);
          this.goTo(`/mazes`);
        }
      });
  };
}
