import React, { Component } from 'react';
import { tiles } from '../tiles/tiles'

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
        if (tileNode.south_neighbor) {
            tileString += 'S'
        }
        if (tileNode.west_neighbor) {
            tileString += 'W'
        }
        return require(`../tiles/${tileString}.jpg`)
    }


    render() {
        // console.log(this.state.maze)
        // return 'TESTING'
        if (this.state.maze) {
            console.log('Size:', this.state.maze.nodes)
            return (
                <div>
                {/* why is it trying to render before this.state.maze is found? */}
                {this.state.maze.nodes.map((node) => {
                    return <img key={node.id} src={this.getTile(node.id)} />
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