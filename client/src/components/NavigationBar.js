import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";

import { PlayerList } from "./PlayerList";
import { Logout } from "./Logout";

export class NavigationBar extends Component {
  state = {
    currentPlayer: null
  };

  componentDidMount() {
    fetch(
      `http://localhost:3000/api/v1/players/${localStorage.getItem(
        "playerID"
      )}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
      .then(resp => resp.json())
      .then(player => {
        this.setState({ currentPlayer: player });
      });
  }

    playerLoggedIn = () => {
      if (this.state.currentPlayer.error === "Please log in") {
        return (  
          <div>
            <NavItem href="/signup">Signup</NavItem>
            <NavItem href="/login">Login</NavItem>
          </div>  
        )
      } else { 
        return (
          <div>
            <NavItem href="/logout">Logout</NavItem>
            <NavItem href={`/players${this.state.currentPlayer.id}`}>
                Logged in as {this.state.currentPlayer.username}{" "}
            </NavItem>
          </div>
        )
      }}

    render() {
      if (this.state.currentPlayer) {
        return (
          <div className="App container">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <Navbar fluid collapseOnSelect>
                <Navbar.Header>
                  <Navbar.Brand>
                    <Link to="/">Maze Game</Link>
                  </Navbar.Brand>
                  {/* <Navbar.Toggle /> */}
                </Navbar.Header>

                {/* <Navbar.Collapse> */}
                <Nav>
                  <NavItem href="/mazes">Mazes</NavItem>
                  <NavItem href="/players">Players</NavItem>
                </Nav>
                <Nav className='navbar-right'>
                  {this.playerLoggedIn()}
                </Nav>
                {/* </Navbar.Collapse> */}
              </Navbar>
            </nav>
          </div>
        );
      } else {
        return <h2>Loading...</h2>;
      }
  }
}
