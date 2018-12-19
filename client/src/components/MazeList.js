import React, { Component } from 'react';
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

    render() {
        return (
            <div>
                <h1>Maze List Goes here</h1>
                <ul className="list-group">
                    {this.state.allMazes.map((maze) => {
                        return <li className='list-group-item'>
                            <span className='badge'>{maze.nodes.length} </span>
                            {`Maze #${maze.id}`}
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}