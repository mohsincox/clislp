import React, {Component} from 'react';
import {API_PUBLIC_URL} from "../constants";

function FixtureCard({match}) {
    console.log(match);

    return <div className="card mb-5">
        <div className="card-body">
            {match.id}
            <div className="d-flex justify-content-between align-items-center">
                <div className="l-group tgroup">
                    {match.tournament_team_one.country == null ? (
                        <img
                            src={`${API_PUBLIC_URL}${match.tournament_team_one.franchise.logo}`}
                            alt=""
                            width="78px"
                            height="59px"
                        />

                    ) : (
                        <img
                            src={`${API_PUBLIC_URL}${match.tournament_team_one.country.flag}`}
                            alt=""
                            width="78px"
                            height="59px"
                        />
                    )}
                    {/*{match.tournament_team_one.name}*/}
                    {match.tournament_team_one?.country?.name}
                    {match.tournament_team_one?.franchise?.name}
                </div>
                <div className="m-group tgroup">
                    VS
                </div>
                <div className="R-group tgroup">
                    {match.tournament_team_two.country == null ? (
                        <img
                            src={`${API_PUBLIC_URL}${match.tournament_team_two.franchise.logo}`}
                            alt=""
                            width="78px"
                            height="59px"
                        />
                    ) : (
                        <img
                            src={`${API_PUBLIC_URL}${match.tournament_team_two.country.flag}`}
                            alt=""
                            width="78px"
                            height="59px"
                        />
                    )}
                    {/*{match.tournament_team_two.name}*/}
                    {match.tournament_team_two?.country?.name}
                    {match.tournament_team_two?.franchise?.name}
                </div>
            </div>
        </div>
        <div className="card-footer d-flex justify-content-between" style={{background: "#EAE1FF"}}>
            <p className="p-0">{match.start_date}</p>
            <p className="p-0"> Starts at {match.start_time}</p>
        </div>
    </div>
}

export default FixtureCard;