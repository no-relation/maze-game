import React, { Component } from 'react';
// import { Maze } from "../components/Maze";
import { Link } from "react-router-dom";
// import { LinkContainer } from "react-router-bootstrap";
import { DropdownButton, MenuItem, ListGroup, ListGroupItem } from 'react-bootstrap'

const URL = "http://localhost:3000/api/v1/mazes/"

export class MazeList extends Component {

    constructor() {
        super()
        this.state = {
            allMazes: [],
            isOpen: false
        }
    }

    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

    componentDidMount() {
        fetch(URL)
            .then(resp => resp.json())
            .then(data => this.setState({allMazes: data}))
    }

    newMaze(size) {
        let side;
        // small = 7-12 tiles on a side
        // medium = 13-18 tiles on a side
        // large = 19-24
        // huge = 25-30
        switch (size) {
            case 'small':
            side = Math.floor(Math.random * 5) + 7
            break;
            case 'medium':
            side = Math.floor(Math.random * 5) + 13
            break;
            case 'large':
            side = Math.floor(Math.random * 5) + 19
            break;            
            case 'huge':
            side = Math.floor(Math.random * 5) + 25
            break;
            default:
                side = 10
        }
        
        fetch(URL ,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"                    
            },
            body: JSON.stringify({
                rows: side,
                columns: side
            })
        })
    }


    render() {
        const dropdownClass = `dropdown-menu${this.state.isOpen ? 'show' : ''}`
        return (
            <div>
                <h3>Choose a Maze</h3>
                <ListGroup>
                    {this.state.allMazes.map((maze) => {
                        return <ListGroupItem key={maze.id}>
                            <Link to={`/mazes/${maze.id}`}>
                                {`Maze #${maze.id}`}
                                <span className='badge'>{`${maze.nodes.length} Tiles`}</span>
                            </Link>
                        </ListGroupItem>
                    })}
                </ListGroup>
                <div>
                    <DropdownButton bsStyle='primary' title='Get New Maze' id='new-maze' open={this.state.isOpen} onToggle={this.toggleOpen}>
                        <MenuItem eventKey='small'>Small</MenuItem>
                        <MenuItem eventKey='medium'>Medium</MenuItem>
                        <MenuItem eventKey='large'>Large</MenuItem>
                        <MenuItem eventKey='huge'>Huge</MenuItem>
                    </DropdownButton>
                </div>
            </div>
        )
    }
}