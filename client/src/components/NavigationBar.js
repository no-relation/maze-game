import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem, NavDropdown, MenuItem } from "react-bootstrap";

import { PlayerList } from "./PlayerList";
import { Logout } from './Logout';

export class NavigationBar extends Component {

    render() {
        let currentPlayer = localStorage.getItem('player')
        return (
            <div className="App container">
                <Navbar fluid collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">Maze Game</Link>
                        </Navbar.Brand>
                        {/* <Navbar.Toggle /> */}
                    </Navbar.Header>
                    
                    {/* <Navbar.Collapse> */}
                    { currentPlayer ?
                        <Nav >
                            <NavItem href="/signup">Signup</NavItem>
                            <NavItem href="/login">Login</NavItem>
                        </Nav> :
                        <Nav>
                            <NavItem href={`/players${currentPlayer.id}`}>{currentPlayer.username} </NavItem>
                        </Nav>
                    }
                    {/* </Navbar.Collapse> */}
                </Navbar>
            </div>
        )
    }
}