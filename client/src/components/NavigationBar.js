import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'

import { PlayerList } from "./PlayerList";
import { Logout } from "./Logout";

export class NavigationBar extends Component {

  componentDidMount() {
    // fetch(
    //   `http://localhost:3000/api/v1/players/${localStorage.getItem(
    //     "playerID"
    //   )}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`
    //     }
    //   }
    // )
    //   .then(resp => resp.json())
    //   .then(player => {
    //     this.setState({ currentPlayer: player });
    //   });
  }

    playerLoggedIn = () => {
      if ((!this.props.currentPlayer) || (this.props.currentPlayer.error === "Please log in")) {
        return (  
          <Nav className='navbar-right'> 
            <LinkContainer to='/signup' >
              <NavItem>Signup</NavItem>
            </LinkContainer>
            <LinkContainer to="/login">
              <NavItem>Login</NavItem>
            </LinkContainer>
          </Nav>  
        )
      } else { 
        return (
          <Nav className='navbar-right'> 
            <LinkContainer to="/logout">
              <NavItem>Logout</NavItem>
            </LinkContainer>
            <LinkContainer to={`/players/${this.props.currentPlayer.id}`}>
              <NavItem>
                  Logged in as {this.props.currentPlayer.username}{" "}
              </NavItem>
            </LinkContainer>
          </Nav>  
        )
      }}

    render() {
      // if (this.props.currentPlayer) {
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
                  <LinkContainer to="/mazes">
                    <NavItem>Mazes</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/players">
                    <NavItem>Players</NavItem>
                  </LinkContainer>
                </Nav>
                  {this.playerLoggedIn()}
                {/* </Navbar.Collapse> */}
              </Navbar>
            </nav>
          </div>
        );
      // } else {
      //   return <h2>Loading...</h2>;
      // }
  }
}
