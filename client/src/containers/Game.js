import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
import { MazeList } from '../components/MazeList';
// import { Maze } from "../components/Maze";
// import { PlayerEdit } from "../components/PlayerEdit";
import { PlayerList } from "../components/PlayerList";

export class Game extends Component {

    render() {
        return (
            <div className='rowC' >
                <MazeList />
                <PlayerList />
            </div>
        )
    }
}

