import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_PUBLIC_URL } from "../constants";
import RegisterWidget from "./RegisterWidget";
import dreamSvg from "../images/dream.svg"

export default function Dream() {
    const [iccT20List, setIccT20List] = useState([]);
    const [asiaCupList, setAsiaCupList] = useState([]);

    useEffect(() => {
        (async () => {
            await axios
                .get(`${API_PUBLIC_URL}api/ws-dream-team-rankings/dtr/4`, {})
                .then((response) => {
                    setIccT20List(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await axios
                .get(`${API_PUBLIC_URL}api/ws-dream-team-rankings/dtr/1`, {})
                .then((response) => {
                    setAsiaCupList(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        })();
    }, []);

    return (
        <>
            <div className="container" style={{ marginTop: "30px" }}>
                <div className="row">
                    <div className="col-sm-5">
                        <span>How to Build a Dream Team & Win Prizes?</span>
                        <div style={{ position: "relative" }}>
                            <img
                                src={dreamSvg}
                                alt=""
                                width="100%"
                                height={660}
                                style={{objectFit: "cover"}}
                            />
                            <span
                                style={{
                                    position: "absolute",
                                    top: "30px",
                                    left: "50px",
                                    color: "#FFFFFF",
                                }}
                            >
                <button
                    className="btn border border-light"
                    style={{ color: "rgb(255, 255, 255)" }}
                >
                  BUILD YOUR DREAM TEAM
                </button>
              </span>

                            <span
                                style={{
                                    position: "absolute",
                                    top: "100px",
                                    left: "50px",
                                    color: "#FFFFFF",
                                }}
                            >
                <b>Step 1</b>: Signup and provide your personal
                <br />
                informations.
              </span>

                            <span
                                style={{
                                    position: "absolute",
                                    top: "170px",
                                    left: "50px",
                                    color: "#FFFFFF",
                                }}
                            >
                <b>Step 2</b>:Select a Tournament.
              </span>

                            <span
                                style={{
                                    position: "absolute",
                                    top: "220px",
                                    left: "50px",
                                    color: "#FFFFFF",
                                }}
                            >
                <b>Step 3</b>: Choose your favourite
                <br />
                Players from this tournament and
                <br />
                build a team.
              </span>

                            <span
                                style={{
                                    position: "absolute",
                                    top: "310px",
                                    left: "50px",
                                    color: "#FFFFFF",
                                }}
                            >
                <b>Step 4</b>: Join Contest and win
                <br />
                excting prizes.
              </span>

                            <span
                                style={{
                                    position: "absolute",
                                    top: "440px",
                                    left: "50px",
                                    color: "#FFFFFF",
                                }}
                            >
                Want to Build your team?
              </span>

                            <span
                                style={{
                                    position: "absolute",
                                    top: "480px",
                                    left: "50px",
                                    color: "#FFFFFF",
                                }}
                            >
                <Link to="/register">
                  <button
                      className="btn"
                      style={{ backgroundColor: "#FFFFFF", color: "#5709FF" }}
                  >
                    &nbsp;&nbsp;&nbsp; JOIN NOW &nbsp;&nbsp;&nbsp;
                  </button>
                </Link>
              </span>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            <RegisterWidget
                                name="Middle Widget"
                                style={{ width: "100%", height: "215px" }}
                            />
                        </div>
                    </div>

                    <div className="col-sm-4">
                        <span>Dream Teams Ranking</span>
                        <div className="card">
                            <div className="card-body">
                                {iccT20List.length > 0 && (
                                    <div className="card">
                                        <h5
                                            className="card-header tbg"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            ICC T20 World Cup
                                        </h5>
                                        <div className="card-body">
                                            <div>
                                                <div className="float-start">Teams</div>
                                                <div className="float-end">Pts</div>
                                            </div>
                                            <table className="table table-striped">
                                                <tbody>
                                                {iccT20List.map((rankTeam, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{rankTeam.user?.name}</td>
                                                        <td>
                                <span className="float-end">
                                  {rankTeam.total_point}
                                </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {asiaCupList.length > 0 && (
                                    <div className="card" style={{ marginTop: "10px" }}>
                                        <h5
                                            className="card-header tbg"
                                            style={{ color: "#FFFFFF" }}
                                        >
                                            Asia Cup
                                        </h5>
                                        <div className="card-body">
                                            <div>
                                                <div className="float-start">Teams</div>
                                                <div className="float-end">Pts</div>
                                            </div>
                                            <table className="table table-striped">
                                                <tbody>
                                                {asiaCupList.map((rankTeam, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{rankTeam.user?.name}</td>
                                                        <td>
                                <span className="float-end">
                                  {rankTeam.total_point}
                                </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-3">
                        {/*<p></p>*/}
                        {/*<div>*/}
                        {/*  <img src={require("../images/add_spon_dr_side.png")} alt="" />*/}
                        {/*</div>*/}
                        {/*<p></p>*/}
                        {/*<div>*/}
                        {/*  <img src={require("../images/add_spon_dr_side.png")} alt="" />*/}
                        {/*</div>*/}
                        <div className="mb-5">
                            <RegisterWidget
                                name="Right Sidebar One"
                                style={{ width: "100%", height: "400px" }}
                            />
                        </div>

                        <div className="mb-5">
                            <RegisterWidget
                                name="Right Sidebar Two"
                                style={{ width: "100%", height: "400px" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
