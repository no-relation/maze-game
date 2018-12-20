import React, { Component } from 'react';
import { tiles } from '../tiles/tiles'

export class Maze extends Component {

    state = {
        maze: null
    }

    mazeID() {
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
        if (tileNode.south_neighbor) {
            tileString += 'S'
        }
        if (tileNode.west_neighbor) {
            tileString += 'W'
        }
        return `../tiles/${tileString}.jpg`
    }

    findNumOfColumns() {
        const endNodeIndex = this.state.maze.nodes.findIndex((node) => node.id === this.state.maze.end_node_id)

        console.log('end node index',endNodeIndex)

        // going to have to lock the maze width at 5, 13, 19, 29
        const widths = [5, 13, 19, 29]
        let index = 0

        widths.forEach((width) => {
            if ((endNodeIndex+1) % width === 0){
                index = width
            }
        })
        return index
    }

    render() {
        if (this.state.maze) {
            console.log('Size:', this.state.maze.nodes.length)
            console.log('column number:', this.findNumOfColumns())

        }
        return (
            <div>
                {/* why is it trying to render before this.state.maze is found? */}
            {/* {this.state.maze.nodes.map((node) => {
                return <img key={node.id} src={this.getTile(node.id)} />
            })} */}
            </div>
        )
    }
}