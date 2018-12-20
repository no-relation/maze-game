import React, { Component } from 'react';
// import { Maze } from "../components/Maze";
import { Link } from "react-router-dom";
// import { LinkContainer } from "react-router-bootstrap";

const URL = "http://localhost:3000/api/v1/mazes/"

export class MazeList extends Component {

    constructor() {
        super()
        this.state = {
            allMazes: []
        }
    }

    componentDidMount() {
        fetch(URL)
            .then(resp => resp.json())
            .then(data => this.setState({allMazes: data}))
    }

    makeNewMaze = (difficulty) => {

    }

    render() {
        return (
            <div>
                <h1>Choose a Maze</h1>
                <ul className="list-group">
                    {this.state.allMazes.map((maze) => {
                        return <li key={maze.id} className='list-group-item'>
                            <Link to={`/mazes/${maze.id}`}>
                                <span className='badge'>{maze.nodes.length} </span>
                                {`Maze #${maze.id}`}
                            </Link>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}