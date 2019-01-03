import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'
import { Link } from "react-router-dom";
const URL = 'http://localhost:3000/api/v1/'

export class Maze extends Component {

    state = {
        maze: null, 
        playerPosition: null,
        steps: 0,
        showWin: false,
        newHighScore: false
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
        fetch(URL + 'mazes/' + this.mazeID(), {
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
                    {grid.map((row, index) => {
                        return (
                            <div className='row no-gutter' key={index} >
                                    {row.map((nodeID, index) => {
                                        if (nodeID === 0) {    
                                            return (
                                                <div className={`float-left`} key={this.randomKey()} style={{width:170}}>
                                                    <img alt={'blank'} src={require(`../tiles/blank.png`)} />

                                                </div>
                                            )
                                        } else if (nodeID==='start') {
                                            return (
                                            <div className={`float-left`} key={nodeID} style={{width:170}}>
                                                <img alt={'start'} src={require(`../tiles/start.png`)}  />
                                            </div>
                                            )

                                        } else if (nodeID==='end') {
                                            return (
                                            <div className={`float-left`} key={nodeID} style={{width:170}}>
                                                <img alt={'end'} src={require(`../tiles/end.png`)} width='165px' onClick={this.winning} data-toggle="modal" data-target="winFlag" />
                                            </div>
                                            )

                                        } else {
                                            const node = this.findNodeByID(nodeID)
                                            const nodeString = this.getTile(node)
                                            return (
                                                <div className={`float-left`} key={nodeID} style={{width:170}} >
                                                    <img alt={nodeString} src={require(`../tiles/${nodeString}.png`)} onClick={() => this.handleClick(node)} key={node.id} />
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

    handleClick(node) {
        this.setState({ 
            playerPosition: node,
            steps: this.state.steps + 1 
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

    randomKey() {
        return Math.floor(Math.random()*1000)+1
    }

    winning = () => {
        const player = JSON.parse(localStorage.getItem('player'))
        console.log('player id is',player.id)
        fetch(URL + 'attempts', {
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
            fetch(URL + 'mazes/' + this.mazeID(), {
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