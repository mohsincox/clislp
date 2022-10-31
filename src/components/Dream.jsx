import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {API_PUBLIC_URL} from "../constants";
import RegisterWidget from "./RegisterWidget";
import dreamSvg from "../images/dream.svg"
import CrownOutlined from "@ant-design/icons/lib/icons/CrownOutlined";

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
            <div className="container mt-3">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 mb-2 mb-sm-2 mb-md-2 mb-lg-0 mb-xl-0">
                        <span>How to Build a Dream Team & Win Prizes?</span>
                        <div style={{position: "relative"}}>
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
                    style={{color: "rgb(255, 255, 255)"}}
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
                                <b>Step 1 </b>: Signup and provide your personal information.
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
                <b>Step 3</b>: Choose your favorite.
                <br/>
                Players from this tournament
                <br/>
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
                <br/>
                exciting prizes.
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
                      style={{backgroundColor: "#FFFFFF", color: "#5709FF"}}
                  >
                    &nbsp;&nbsp;&nbsp; JOIN NOW &nbsp;&nbsp;&nbsp;
                  </button>
                </Link>
              </span>
                        </div>
                        <div style={{marginTop: "10px"}}>
                            <RegisterWidget name="Home Middle" width={550} height={290}/>
                        </div>
                    </div>

                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 mb-2 mb-sm-2 mb-md-0 mb-lg-0 mb-xl-0">
                        <span>Dream Teams Ranking</span>
                        <div className="dream-team-ranking">
                            {iccT20List.length > 0 ? (
                                <div className="card">
                                    <h5
                                        className="card-header tbg"
                                        style={{color: "#FFFFFF"}}
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
                            ) : (
                                <div className="card">
                                    <h5 className="card-header tbg d-flex justify-content-between align-items-center"
                                        style={{color: "#FFFFFF"}}>
                                        <span>Champions League </span>
                                        <span className="fs-6 fw-light">(Upcoming)</span>
                                    </h5>
                                    <div className="card-body p-0">
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th>Teams</th>
                                                <th style={{textAlign: "right"}}>Pts</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <CrownOutlined style={{color: "#FFBA07", marginRight: "5px"}}/>
                                                        <span style={{marginRight: "20px"}}>1</span>
                                                        <span>--</span>
                                                    </div>
                                                </td>
                                                <td style={{textAlign: "right"}}>--</td>
                                            </tr>

                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span style={{marginRight: "20px", marginLeft: "20px"}}>2</span>
                                                        <span>--</span>
                                                    </div>
                                                </td>
                                                <td style={{textAlign: "right"}}>--</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span style={{marginRight: "21px", marginLeft: "21px"}}>3</span>
                                                        <span>--</span>
                                                    </div>
                                                </td>
                                                <td style={{textAlign: "right"}}>--</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span style={{marginRight: "22px", marginLeft: "22px"}}>4</span>
                                                        <span>--</span>
                                                    </div>
                                                </td>
                                                <td style={{textAlign: "right"}}>--</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span style={{marginRight: "23px", marginLeft: "23px"}}>5</span>
                                                        <span>--</span>
                                                    </div>
                                                </td>
                                                <td style={{textAlign: "right"}}>--</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span style={{marginRight: "24px", marginLeft: "24px"}}>6</span>
                                                        <span>--</span>
                                                    </div>
                                                </td>
                                                <td style={{textAlign: "right"}}>--</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span style={{marginRight: "25px", marginLeft: "25px"}}>7</span>
                                                        <span>--</span>
                                                    </div>
                                                </td>
                                                <td style={{textAlign: "right"}}>--</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span style={{marginRight: "26px", marginLeft: "26px"}}>8</span>
                                                        <span>--</span>
                                                    </div>
                                                </td>
                                                <td style={{textAlign: "right"}}>--</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <span style={{marginRight: "27px", marginLeft: "27px"}}>9</span>
                                                        <span>--</span>
                                                    </div>
                                                </td>
                                                <td style={{textAlign: "right"}}>--</td>
                                            </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {asiaCupList.length > 0 && (
                                <div className="card" style={{marginTop: "10px"}}>
                                    <h5
                                        className="card-header tbg"
                                        style={{color: "#FFFFFF"}}
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

                    <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                        <div className="mb-3">
                            <RegisterWidget name="Home Right One" width={316} height={632} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
