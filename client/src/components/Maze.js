import React, { Component } from 'react';

export class Maze extends Component {

    state = {
        maze: null
    }

    mazeID = () => {
        return this.props.match.params.id
    }

    componentDidMount() {
        fetch(`http://localhost:3000/api/v1/mazes/${this.mazeID()}`)
            .then(resp => resp.json())
            .then(maze => this.setState({ maze }))
    }

    getTile(nodeID) {
        const tileNode = this.state.maze.nodes.find((node) => node.id === nodeID)
        let tileString = ''

        if (tileNode.north_neighbor) {
            tileString += 'N'
        }
        if (tileNode.east_neighbor) {
            tileString += 'E'
        }
        if (tileNode.id === this.state.maze.end_node_id) {
            tileString += 'E'
        }
        if (tileNode.south_neighbor) {
            tileString += 'S'
        }
        if (tileNode.west_neighbor) {
            tileString += 'W'
        }
        if (tileNode.id === this.state.maze.start_node_id) {
            tileString += 'W'
        }
        return tileString
    }

    getGrid() {
        let gridArray = []
        for (let i = 0; i < this.state.maze.rows; i++){
            let rowArray = []
            for (let j = 0; j < this.state.maze.columns; j++) {
                this.state.maze.nodes.forEach(node => {
                    if (node.row === i && node.col === j) {
                        rowArray.push(node)
                    }
                });
            }
            gridArray.push(rowArray)
        }
        return gridArray
    }

    render() {
        if (this.state.maze) {
            const grid = this.getGrid()
            return (
                <div>
                    <table className="table">
                        <tbody>
                            {grid.map((row, index) => {
                                return (
                                    <tr key={index} >
                                        {row.map((node) => {
                                            const nodeString = this.getTile(node.id)
                                            return (
                                                <td>
                                                    <img key={node.id} alt={nodeString} src={require(`../tiles/${nodeString}.png`)} width='100' />
                                                </td>
                                            )
                                        })}    
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return (
                <div>
                    <h3>Loading...</h3>
                </div>
            )
        }
    }
}