import React, { Component } from "react";
import { MazeList } from "../components/MazeList";
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
