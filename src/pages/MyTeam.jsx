import axios from "axios";
import React, {useEffect, useState, useContext} from "react";
import {RangingContext} from "../context/PageContext";
import {API_PUBLIC_URL} from "../constants";
import WebLayout from "../layouts/WebLayout";
import ThreeSixThreeTemplate from "./Template/ThreeSixThreeTemplate";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import Avatar from "antd/es/avatar";
import UseUserHook from "../Hooks/useUserHook";
import ViewTeam from "../components/ViewTeam";
import MyTeampTemplate from "./Template/MyTeampTemplate";

export default function MyTeam() {
    const [tournaments, setTournaments] = useState([]);
    const [filterTournaments, setFilterTournaments] = useState([]);
    const [playerRankForCurrentTournament, setPlayerRankForCurrentTournament] = useState([])
    const [userCurrentTeam, setUserCurrentTeam] = useState([])
    let [user] = UseUserHook();

    useEffect(() => {
        (async () => {
            try {
                let tournamentsRes = await axios.get(`${API_PUBLIC_URL}api/ws-rankings`, {})
                let modifyTournamentsData = tournamentsRes.data.length ? tournamentsRes.data.map((tournament, index) => {
                    return index === 0 ? {...tournament, selected: true} : {...tournament, selected: false}
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
                if (selectedTournament) {
                    let getCurrentTournamentRangTeam = await axios.get(`${API_PUBLIC_URL}api/ws-my-team/${user.id}/test/${selectedTournament.id}`);
                    let getAllCurrentTournamentRank = await axios.get(`${API_PUBLIC_URL}api/ws-dream-team-rankings/dtr/${selectedTournament.id}`);
                    setUserCurrentTeam(getCurrentTournamentRangTeam.data);
                    setPlayerRankForCurrentTournament(getAllCurrentTournamentRank.data);
                } else {
                    setUserCurrentTeam([])
                }
            } catch (e) {
                console.log(e);
            }
        })();
    }, [filterTournaments]);


    function myRank() {
        if(playerRankForCurrentTournament.length) {
            return playerRankForCurrentTournament.findIndex(playerRank => {
                return playerRank.user_id == user.id
            })
        }
        return null;
    }


    function getAllPlayerTotalPoint() {
        return userCurrentTeam.reduce( (previousValue, {total_point}) => {
            return previousValue + total_point;
        }, 0 );
    }

    return (
        <RangingContext.Provider value={{tournaments, filterTournaments, setFilterTournaments}}>
            <WebLayout>
                <div className="build-team-section ku-section section-top-required">
                    <div className="container mb-5">
                        <MyTeampTemplate>
                            <div className="col-12 col-lg-6">
                                <div className="team-view-area threeSixthree-main-content-area">
                                    <div className="tournament-player-rank">
                                        <ul>
                                            <li className="rank-heading ku-card-header text-center">
                                                <div className="rank-title rank-c">Your Selected Team</div>
                                            </li>
                                        </ul>
                                        <div className="build-player-list-single-item px-4">
                                            {
                                                userCurrentTeam.length ?
                                                    userCurrentTeam.map(({player}, index) => (
                                                        <ViewTeam player={player} key={player.id} />
                                                    ))
                                                    : <div className="rank-heading p-2 text-center">Team Not Found</div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                {
                                    userCurrentTeam.length ?
                                        <div className="team-view-bottom-area mt-0 py-4">
                                            <div className="d-inline-flex justify-content-center flex-column text-center">
                                                <p>My Points</p>
                                                <button className="btn btn btn-lg  text-white" style={{minWidth: "200px", borderRadius: "0", background: "#565656"}}>
                                                    {getAllPlayerTotalPoint()}
                                                </button>
                                            </div>
                                            <div className="d-inline-flex justify-content-center flex-column text-center">
                                                <p>My Rank</p>
                                                <button className="btn btn btn-success btn-lg text-white" style={{minWidth: "200px", borderRadius: "0", background: "#5ABE2B"}}>
                                                    {myRank() + 1}
                                                </button>
                                            </div>

                                        </div> : null

                                }
                            </div>
                        </MyTeampTemplate>
                    </div>
                </div>
            </WebLayout>
        </RangingContext.Provider>
    );
}
