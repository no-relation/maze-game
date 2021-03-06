import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { API } from "./API.js"

export class Maze extends Component {

    state = {
        maze: null, 
        playerPosition: null,
        steps: 0,
        showWin: false,
        newHighScore: false,
        iconFacing: 'east'
    }

    handleShow = () => {
        this.setState({ showWin: true })
    }

    handleClose = () => {
        this.setState({ showWin: false })
    }

    mazeID = () => {
        return this.props.match.params.id
    }

    componentDidMount() {
        fetch(API + '/mazes/' + this.mazeID(), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(resp => resp.json())
            .then(maze => this.setState({ maze, playerPosition: maze.start_node }))
    }

    render() {
        if (this.state.maze) {
            const grid = this.getNeighbors(this.state.playerPosition)

            return (
            <div>
                <div>
                    { this.state.showWin &&
                    <Modal.Dialog >
                        <Modal.Header>
                            <Modal.Title>You found the exit!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Your score: {this.state.steps} </p>
                            {this.showNewHighScore()}
                            <p>Would you like to try again?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className='btn btn-success' onClick={this.restartMaze}>Try Again?</button>
                            <Link to='/mazes'>
                                <button className='btn btn-warning'>Back to Maze List</button>
                            </Link>
                        </Modal.Footer>
                    </Modal.Dialog>
                    }
                </div>
                            
                <h1>{`Steps: ${this.state.steps}`} </h1>
                    <div className='container no-gutter' style={ {width: 510}} >
                    {grid.map((row, rindex) => {
                        return (
                            <div className='row no-gutter' key={rindex} >
                                {row.map((nodeID, tindex) => {
                                    if (nodeID === 0) {    
                                        return (
                                            <div className={`float-left`} 
                                            key={tindex+3} 
                                            style={{ width: 170, height: 170, backgroundImage: 'url(' + require('../tiles/blank.png') + ')' }}>
                                                {/* <img alt={'blank'} src={require(`../tiles/blank.png`)} /> */}

                                            </div>
                                        )
                                    } else if (nodeID==='start') {
                                        return (
                                            <div className={`float-left`} 
                                            key={nodeID} 
                                            style={{ width: 170, height: 170, backgroundImage: 'url(' + require('../tiles/start.png') + ')' }}>
                                        </div>
                                        )

                                    } else if (nodeID==='end') {
                                        return (
                                            <div className={`float-left`} 
                                            key={nodeID} 
                                            style={{ width: 170, height: 170, backgroundImage: 'url(' + require('../tiles/end.png') + ')' }} 
                                            onClick={this.winning} 
                                            data-toggle="modal" 
                                            data-target="winFlag">
                                        </div>
                                        )

                                    } else {
                                        const node = this.findNodeByID(nodeID)
                                        const nodeString = this.getTile(node)
                                        let playerNodeDiv = '';
                                        if (nodeID === this.state.playerPosition.id) { 
                                            playerNodeDiv = <img src={require(`../tiles/${this.state.iconFacing}face.png`)} style={{ width: 50, position: 'relative', top: 20, left: 0, }} alt='You are here' />
                                        } else {
                                            playerNodeDiv = <img src={require(`../tiles/circle.png`)} style={{ width: 50, position: 'relative', top: 50, left: 0, opacity: 0.50}} alt='You can go here' />
                                        }

                                        return (
                                            <div className={`float-left`} 
                                                key={nodeID} 
                                                style={{ width: 170, height: 170, backgroundImage: 'url(' + require(`../tiles/${nodeString}.png`) + ')' }} 
                                                onClick={(e) => this.handleClick(e, node)} >
                                            {playerNodeDiv}
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        )
                    })}
                </div>
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

    handleClick(e, node) {
        console.log('current:', this.state.playerPosition, 'clicked:', node)
        let facing;
        if (node.id === this.state.playerPosition.north_neighbor) {
            facing = 'north'
        } else if (node.id === this.state.playerPosition.east_neighbor) {
            facing = 'east'
        } else if (node.id === this.state.playerPosition.south_neighbor) {
            facing = 'south'
        } else if (node.id === this.state.playerPosition.west_neighbor) {
            facing = 'west'
        } else {
            facing = 'east'
        }
        this.setState({ 
            playerPosition: node,
            steps: this.state.steps + 1,
            iconFacing: facing 
        })
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

    // getGrid() {
    //     let gridArray = []
    //     for (let i = 0; i < this.state.maze.rows; i++) {
    //         let rowArray = []
    //         for (let j = 0; j < this.state.maze.columns; j++) {
    //             this.state.maze.nodes.forEach(node => {
    //                 if (node.row === i && node.col === j) {
    //                     rowArray.push(node)
    //                 }
    //             });
    //         }
    //         gridArray.push(rowArray)
    //     }
    //     return gridArray
    // }

    findNodeByID(nodeID) {
        return this.state.maze.nodes.find((node) => node.id === nodeID)
    }

    winning = () => {
        const player = JSON.parse(localStorage.getItem('player'))
        fetch(API + '/attempts', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                player_id: player.id,
                maze_id: parseInt(this.mazeID()),
                score: this.state.steps
            })
        })

        if (this.state.maze.high_score === 0 || this.state.steps < this.state.maze.high_score) {
            this.setState({ newHighScore: true })
            fetch(API + '/mazes/' + this.mazeID(), {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ high_score: this.state.steps})
            })

        }
        this.handleShow()
    }

    showNewHighScore = () => {
        if (this.state.newHighScore) {
            return (
                <p>You set a new high score!</p>
            )
        } else {
            return (
                <p>You did not beat the high score of {this.state.maze.high_score}</p>
            )
        }
    }

    restartMaze = () => {
        this.setState({
            playerPosition: this.state.maze.start_node,
            steps: 0,
            showWin: false,
            newHighScore:  false
        })
    }

}