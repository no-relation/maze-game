import React, { Component } from 'react';
import { Maze } from "../components/Maze";
import { PlayerEdit } from "../components/PlayerEdit";
import { Player } from "../components/Player";

export class Game extends Component {

    timer = () => {

    }

    render() {
        return (
            <div>
                <Maze />
            </div>
        )
    }
}