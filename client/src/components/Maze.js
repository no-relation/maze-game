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


    render() {
        if (this.state.maze) {
            console.log(this.state.maze.nodes)
            return (
                <div>
                {this.state.maze.nodes.map((node) => {
                    const nodeString = this.getTile(node.id)
                    return <img key={node.id} alt={nodeString} src={require(`../tiles/${nodeString}.png`)} width='100' />
                })}
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