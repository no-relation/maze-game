import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { FaTrashAlt, FaSpinner } from "react-icons/fa";
import { API } from "./API.js"

export class MazeList extends Component {

    constructor() {
        super()
        this.state = {
            allMazes: [],
            isOpen: false,
            isLoading: false
        }
    }

    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

    getMazes() {
        this.setState({ isLoading: true })
        fetch(API + '/mazes/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(resp => resp.json())
            .then(data => this.setState({ allMazes: data, isLoading: false }))
        }
    componentDidMount() {
        this.getMazes()
    }

    newMaze(size) {
        this.setState({ isOpen: false, isLoading: true })
        let side;
        // small = 7-12 tiles on a side
        // medium = 13-18 tiles on a side
        // large = 19-24
        // huge = 25-30
        switch (size) {
            case 'test':
                side = 4
                break;
            case 'small':
                side = Math.floor(Math.random() * 5) + 7
                break;
            case 'medium':
                side = Math.floor(Math.random() * 5) + 13
                break;
            case 'large':
                side = Math.floor(Math.random() * 5) + 19
                break;            
            case 'huge':
                side = Math.floor(Math.random() * 5) + 25
                break;
            default:
                side = 10
        }

        fetch(API + '/mazes/' ,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                rows: side,
                columns: side
            })
        })
            .then(resp => resp.json())
            .then(receivedMaze => {
                this.setState({ allMazes: [ ...this.state.allMazes, receivedMaze], isLoading: false })
            })
    }

    deleteMaze(maze) {
        fetch(API + '/mazes/' + maze.id, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }

        })
            .then(() => this.getMazes())
    }


    render() {
        const dropdownClass = `dropdown-menu ${this.state.isOpen ? 'show' : ''}`
        if (this.state.isLoading) {
            return (
                <div className='fa-3x'>
                    <FaSpinner className='fa-spin' />
                    <h3>Loading...</h3>
                </div>
            )
        } else {
            return(
                <div>
                    <h3>Choose a Maze</h3>
                    <ListGroup>
                    {this.state.allMazes.map((maze) => {
                        return <ListGroupItem key={maze.id}>
                            <Link to={`/mazes/${maze.id}`}>
                                {`Maze #${maze.id} `}
                            </Link>
                            <button className='btn btn-default' onClick={() =>  this.deleteMaze(maze)} ><FaTrashAlt /> </button>
                            <span className='badge'>{`${maze.nodes.length} Tiles`} </span>
                            <p>{`Best Score: ${maze.high_score}`}</p>
                        </ListGroupItem>
                        })}
                    </ListGroup>
            
                    <div className='dropdown'>
                        <button className='btn btn-primary dropdown-toggle' type='button' id='new-maze' data-toggle="dropdown" open={this.state.isOpen} onClick={this.toggleOpen}>Get New Maze
                        </button>
                        <div className={dropdownClass} aria-labelledby="dropdownMenuButton">
                            <h6 className="dropdown-header">What size?</h6>
                            {/* <button className="dropdown-item" onClick={() => this.newMaze('test')} >Testing</button> */}
                            <button className="dropdown-item" onClick={() => this.newMaze('small')} >Small</button>
                            <button className="dropdown-item" onClick={() => this.newMaze('medium')} >Medium</button>
                            <button className="dropdown-item" onClick={() => this.newMaze('large')} >Large</button>
                            <button className="dropdown-item" onClick={() => this.newMaze('huge')} >Huge</button>
                        </div>
                    </div>
                </div>
            )
        }   
    }
}