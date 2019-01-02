import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'

// import { PlayerList } from "./PlayerList";
// import { Logout } from "./Logout";

export class NavigationBar extends Component {

    playerLoggedIn = () => {
      if ((!this.props.currentPlayer) || (this.props.currentPlayer.error === "Please log in")) {
        return (  
          // <Nav className='navbar-right'> 
          <Nav>
            <LinkContainer to='/signup' >
              <NavItem>Signup</NavItem>
            </LinkContainer>
            <LinkContainer to="/login">
              <NavItem>Login</NavItem>
            </LinkContainer>
          </Nav>
          // </Nav>  
        )
      } else { 
        return (
          // <Nav className='navbar-right'> 
          <Nav>
            <LinkContainer to={`/players/${this.props.currentPlayer.id}`}>
              <NavItem>
                  Logged in as {this.props.currentPlayer.username}{" "}
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/logout">
              <NavItem>Logout</NavItem>
            </LinkContainer>
          </Nav>
          // </Nav>  
        )
      }}

    render() {
      // if (this.props.currentPlayer) {
        return (
          <div className="App container">
            {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> */}
              <Navbar inverse fluid collapseOnSelect>
                <Navbar.Header>
                  <Navbar.Brand>
                    <Link to="/">Maze Game</Link>
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
            {/* </nav> */}
          </div>
        );
      // } else {
      //   return <h2>Loading...</h2>;
      // }
  }
}
