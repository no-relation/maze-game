import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";

import { PlayerList } from "./PlayerList";
import { Logout } from './Logout';

export class NavigationBar extends Component {

    render() {
        return (
            <div className="App container">
                <Navbar fluid collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">Maze Game</Link>
                        </Navbar.Brand>
                    </Navbar.Header>
                    
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem href="/signup">Signup</NavItem>
                            <NavItem href="/login">Login</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}