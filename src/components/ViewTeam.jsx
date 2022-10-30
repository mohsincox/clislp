import {API_PUBLIC_URL} from "../constants";
import React from "react";
import {playerSpecification} from "../context/helper";

export default function ViewTeam(props) {
    let {player} = props;
    return (
        <div className="build-player-list" key={player.id}>
            <label htmlFor={`player-${player.id}`}>
                <div className="player-avatar-container">
                    <div className="player-avater">
                        <img src={`${API_PUBLIC_URL}${player.image}`} alt=""/>
                    </div>
                    <div className="player-flag">
                        <img src={`${API_PUBLIC_URL}${player.country.flag}`} alt=""/>
                    </div>
                </div>
                <div className="player-details">
                    <p className="m-0 player-name">{player.name}</p>
                    <p className="m-0 player-specification">{playerSpecification(player)}</p>
                </div>
            </label>
        </div>
    )
}