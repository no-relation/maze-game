import React, { Component } from "react";
import { API } from "./API.js"

export class SignUp extends Component {
  constructor() {
    super();
    this.state = this.getInitialState();
  }

  getInitialState = () => ({ username: "", email: "", password: "" });

  handleChange = e => {
    e.persist();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch(`${API}/players/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        player: {
          username: e.target.username.value,
          email: e.target.email.value,
          password: e.target.password.value
        }
      })
    })
      .then(() => {
        
        this.setState(this.getInitialState())
        this.goTo('/login')
      })
  };

  goTo = url => {
    this.props.history.push(url);
  };

  render() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          this.handleSubmit(e);
        }}
      >
        <h3>SignUp</h3>
        <div className="form-group">
          <label className="control-label">Username</label>
          <input
            name="username"
            placeholder="Enter username"
            value={this.state.username}
            className="form-control"
            type="text"
            onChange={e => this.handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label className="control-label">Email</label>
          <input
            name="email"
            placeholder="Enter email"
            value={this.state.email}
            className="form-control"
            type="email"
            onChange={e => this.handleChange(e)}
          />
        </div>

        <div className="form-group">
          <label className="control-label">Password</label>
          <input
            name="password"
            placeholder="Enter password"
            value={this.state.password}
            className="form-control"
            type="password"
            onChange={e => this.handleChange(e)}
          />
        </div>
        <button className='btn btn-success' >Sign Up</button>
      </form>
    );
  }
}
