import React, { Component } from 'react';

export class Maze extends Component {

    state = {
        maze: null, 
        playerPosition: null
    }

    mazeID = () => {
        return this.props.match.params.id
    }

    componentDidMount() {
        fetch(`http://localhost:3000/api/v1/mazes/${this.mazeID()}`)
            .then(resp => resp.json())
            .then(maze => this.setState({ maze, playerPosition: maze.start_node }))
    }

    // render() {
    //     if (this.state.maze) {
    //         let nodeString = this.getTile(this.state.playerPosition.id)
    //         return(
    //             <img alt={nodeString} src={require(`../tiles/${nodeString}.png`)} width='100' />
    //         )
    //     } else {
    //         return (
    //             <div>
    //                 <h3>Loading...</h3>
    //             </div>
    //         )
    //     }
    // }
    render() {
        if (this.state.maze) {
            const grid = this.getNeighbors(this.state.playerPosition)
            console.log('grid is',grid)
            return (
                <div className='container no-gutters' styles='max-width: 300px' >
                    {grid.map((row, index) => {
                        return (
                            <div className='row align-items-center' key={index} >
                                    {row.map((nodeID) => {
                                        if (nodeID === 0) {    
                                            return (
                                                <div className='col' key={nodeID} styles='max-width: 100px'>
                                                    <img alt={'blank'} src={require(`../tiles/blank.png`)} />

                                                </div>
                                            )
                                        } else if (nodeID==='start') {
                                            return (
                                            <div className='col' key={nodeID} styles='max-width: 100px'>
                                                <img alt={'start'} src={require(`../tiles/start.png`)} />
                                            </div>
                                            )

                                        } else if (nodeID==='end') {
                                            return (
                                            <div className='col' key={nodeID} styles='max-width: 100px'>
                                                <img alt={'end'} src={require(`../tiles/end.png`)} />
                                            </div>
                                            )

                                        } else {
                                            const node = this.findNodeByID(nodeID)
                                            const nodeString = this.getTile(node)
                                            return (
                                                <div className='col' key={nodeID} styles='max-width: 100px' >
                                                    <img alt={nodeString} src={require(`../tiles/${nodeString}.png`)} onClick={() => this.handleClick(node)} key={node.id} />
                                                </div>
                                            )
                                        }
                                    })}
                            </div>
                        )
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

    handleClick(node) {
        this.setState({ playerPosition: node })
    }

    getTile(tileNode) {
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

    getNeighbors(positionNode) {
        let localGrid = []

        if (positionNode.north_neighbor) {
            localGrid.push([0, positionNode.north_neighbor, 0])
        } else {
            localGrid.push([0, 0, 0])
        }
        let localRow = []
        if (positionNode.id === this.state.maze.start_node_id) {
            localRow.push('start')
        } else if (positionNode.west_neighbor) {
            localRow.push(positionNode.west_neighbor)
        } else {
            localRow.push(0)
        }
        localRow.push(positionNode.id)
        if (positionNode.id === this.state.maze.end_node_id) {
            localRow.push('end')
        } else if (positionNode.east_neighbor) {
            localRow.push(positionNode.east_neighbor)
        } else {
            localRow.push(0)
        }
        localGrid.push(localRow)
        if (positionNode.south_neighbor) {
            localGrid.push([0, positionNode.south_neighbor, 0])
        } else {
            localGrid.push([0, 0, 0])
        }
        return localGrid
    }

    getGrid() {
        let gridArray = []
        for (let i = 0; i < this.state.maze.rows; i++) {
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

    findNodeByID(nodeID) {
        return this.state.maze.nodes.find((node) => node.id === nodeID)
    }

}