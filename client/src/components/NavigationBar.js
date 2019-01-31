import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'

import { Logout } from "./Logout";

export class NavigationBar extends Component {

  playerLoggedIn = () => {
    if ((!this.props.currentPlayer) || (this.props.currentPlayer.error === "Please log in")) {
      return (  
        <Nav>
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
        <Nav>
          <LinkContainer to={`/players/${this.props.currentPlayer.id}`}>
            <NavItem>
                Logged in as {this.props.currentPlayer.username}{" "}
            </NavItem>
          </LinkContainer>
          <Logout logoutPlayer={this.props.logoutPlayer} />
        </Nav>
      )
    }
  }

  render() {
    return (
      <div className="App container">
          <Navbar inverse fluid collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <Link to="/">Maze Escape</Link>
              </Navbar.Brand>
              {/* <Navbar.Toggle /> */}
            </Navbar.Header>

            {/* <Navbar.Collapse> */}
            <Nav bsStyle="pills" activeKey='1' pullRight>
              <LinkContainer to="/mazes">
                <NavItem> Mazes </NavItem>
              </LinkContainer>
            </Nav>
            <Nav>
              <LinkContainer to="/players">
                <NavItem> Players </NavItem>
              </LinkContainer>
            </Nav>
              {this.playerLoggedIn()}
            {/* </Navbar.Collapse> */}
          </Navbar>
      </div>
    );
  }
}
