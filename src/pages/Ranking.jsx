import axios from "axios";
import React, {useEffect, useState, useContext} from "react";
import { RangingContext } from "../context/PageContext";
import {API_PUBLIC_URL} from "../constants";
import WebLayout from "../layouts/WebLayout";
import ThreeSixThreeTemplate from "./Template/ThreeSixThreeTemplate";
import CrownOutlined from "@ant-design/icons/lib/icons/CrownOutlined";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import {Tooltip} from "antd";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import Avatar from "antd/es/avatar";
import RegisterWidget from "../components/RegisterWidget";

export default function Ranking() {
    const [tournaments, setTournaments] = useState([]);
    const [filterTournaments, setFilterTournaments] = useState([]);
    const [playerRankForCurrentTournament, setPlayerRankForCurrentTournament] = useState([])


    useEffect(() => {
        (async () => {
            try {
                let tournamentsRes = await axios.get(`${API_PUBLIC_URL}api/ws-rankings`, {})
                let modifyTournamentsData = tournamentsRes.data.length ? tournamentsRes.data.map( (tournament, index) => {
                        return index === 0 ?  {...tournament, selected: true} : {...tournament, selected: false}
                    }) : []
                setTournaments(modifyTournamentsData);
                setFilterTournaments(modifyTournamentsData);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                let selectedTournament = filterTournaments.find(tournament => tournament.selected);
                console.log(selectedTournament);
                if(selectedTournament) {
                    let getCurrentTournamentRangTeam = await axios.get(`${API_PUBLIC_URL}api/ws-dream-team-rankings/dtr/${selectedTournament.id}`);
                    setPlayerRankForCurrentTournament(getCurrentTournamentRangTeam.data)
                } else {
                    setPlayerRankForCurrentTournament([])
                }

            } catch (e) {
                console.log(e);
            }
        })();
    }, [filterTournaments])



/*
    useEffect(() => {
        (async () => {
            await axios
                .get(`${API_PUBLIC_URL}api/ws-rankings/test/${tournament_id}`, {})
                .then((response) => {
                    setRankTeamList(response.data);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.status === 403) {
                    }
                });
        })();
    }, [tournament_id]);
*/

    return (
        <RangingContext.Provider value={{tournaments, filterTournaments, setFilterTournaments}} >
            <WebLayout>
                <div className="build-team-section ku-section section-top-required">
                    <div className="container mb-5">
                        <ThreeSixThreeTemplate>
                            <div className="col-12 col-lg-6">
                                <div className="ranking-area threeSixthree-main-content-area">
                                    <div className="tournament-player-rank">
                                        <ul>
                                            <li className="rank-heading ku-card-header">
                                                <div className="player-rank-position-title rank-title rank-c">Position</div>
                                                <div className="player-rank-team-title rank-title rank-c d-flex align-items-center"><span className="me-2">Team</span> <SearchOutlined /></div>
                                                <div className="player-rank-point-title rank-title rank-c">PTS</div>
                                            </li>
                                            {

                                                playerRankForCurrentTournament.length ?
                                                    playerRankForCurrentTournament.map((player, index) =>(
                                                        <li className="rank-heading rank-content">
                                                            <div className="player-rank-position-content rank-content rank-c">{index + 1}</div>
                                                            <div className="player-rank-team-content rank-content rank-c">

                                                                <div className={`crown-gif ${index > 0 ? 'invisible' : ''}`}>
                                                                    <img src={require("../images/crown.gif")} alt=""/>
                                                                </div>

                                                                <Avatar size={"default"} icon={<UserOutlined />} />
                                                                <span className="ms-2">{player.user.name}</span>
                                                            </div>
                                                            <div className="player-rank-point-content rank-content rank-c">{player["total_point"]}</div>
                                                        </li>
                                                    ))
                                                : <li className="rank-heading p-2 text-center">No Rank Found</li>
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </ThreeSixThreeTemplate>
                    </div>
                </div>
            </WebLayout>
        </RangingContext.Provider>
    );
}
