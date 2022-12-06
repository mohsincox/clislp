import { Button, Card, Checkbox, Col, Form, Input, Row, Select, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import Select from "react-select";
import { toast } from "react-toastify";
import { isNull } from "underscore";
import { API_PUBLIC_URL } from "../../../constants";
import { footballPlayerSpecification } from "../../../context/helper";

const { Title } = Typography;
const { Option } = Select;

export default function PointTableEdit() {


    const [currentMatch, setCurrentMatch] = useState(null);
    const [currentPlayerSpcification, setCurrentPlayerSpcification] = useState(null);
    const [footballPoints, setFootBallPoints] = useState({
        Goal: 0,
        Assist: 0,
        Goal_Save: 0,
        Penalty_Save: 0,
        Clean_Sheet: 0,
    });
    const [match_id, setMatch_id] = useState("");
    const [matchList, setMatchList] = useState([]);
    const [tournament_team_id, setTournament_team_id] = useState("");
    const [tt_idList, setTt_idList] = useState([]);
    const [player_id, setPlayer_id] = useState("");
    const [playerList, setPlayerList] = useState([]);
    const [run, setRun] = useState("");
    const [wicket, setWicket] = useState("");
    const [man_of_the_match, setMan_of_the_match] = useState(false);
    const [fifty, setFifty] = useState(false);
    const [hundred, setHundred] = useState(false);
    const [five_wickets, setFive_wickets] = useState(false);
    let navigate = useNavigate();
    const { id } = useParams();

    const getLoginData = localStorage.getItem("loginData");
    console.log(tt_idList)
    useEffect(() => {
        getGameDetails();
        getPointTableDetails();
    }, []);

    const getPointTableDetails = () => {
        if (getLoginData === null) {
            navigate("/login");
        } else {
            const storageData = JSON.parse(getLoginData);
            const token = storageData.accessToken;
            (async () => {
                await axios
                    .get(`${API_PUBLIC_URL}api/point-tables/${id}`, {
                        headers: {
                            Authorization: token,
                        },
                    })
                    .then((response) => {
                        console.log(response.data)
                        // setStage_name(response.data.stage_name);
                        setMatch_id(response.data.match_id);
                        setTournament_team_id(response.data.tournament_team_id);
                        setPlayer_id(response.data.player_id);
                        setRun(response.data.run);
                        setWicket(response.data.wicket);
                        setMan_of_the_match(response.data.man_of_the_match);
                        setFifty(response.data.fifty);
                        setHundred(response.data.hundred);
                        setFive_wickets(response.data.five_wickets);
                        setFootBallPoints({
                            Goal: response.data.Goal,
                            Assist: response.data.Assist,
                            Goal_Save: response.data.Goal_Save,
                            Penalty_Save: response.data.Penalty_Save,
                            Clean_Sheet: response.data.Clean_Sheet,
                        })

                    });
            })();
        }
    };


    useEffect(() => {
        if (match_id && matchList.length) {
            let cMatch = matchList.find(m => m.id == match_id);
            setCurrentMatch(cMatch);
        }

    }, [match_id, matchList])

    const getGameDetails = async () => {
        if (getLoginData === null) {
            navigate("/login");
        } else {
            const storageData = JSON.parse(getLoginData);
            const token = storageData.accessToken;
            await axios
                .get(`${API_PUBLIC_URL}api/matches/active`, {
                    headers: {
                        Authorization: token,
                    },
                })
                .then((response) => {
                    setMatchList(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.status === 403) {
                        toast.error("No Permission");
                        navigate("/admin/no-permission");
                    }
                });
        }
    };

    useEffect(() => {
        if (getLoginData === null) {
            navigate("/login");
        } else {
            const storageData = JSON.parse(getLoginData);
            const token = storageData.accessToken;
            (async () => {
                await axios
                    .get(`${API_PUBLIC_URL}api/matches/pt/${match_id}`, {
                        headers: {
                            Authorization: token,
                        },
                    })
                    .then((response) => {
                        console.log(response.data)
                        var arr = [];
                        if (response.data.tournament_team_one_id !== undefined) {
                            arr.push(response.data.tournament_team_one_id);
                        }

                        if (response.data.tournament_team_two_id !== undefined) {
                            arr.push(response.data.tournament_team_two_id);
                        }
                        setTt_idList(arr);
                    })
                    .catch((error) => {
                        console.log(error);
                        if (error.response.status === 403) {
                            toast.error("No Permission");
                            navigate("/admin/no-permission");
                        }
                    });
            })();
        }
    }, [match_id]);

    useEffect(() => {
        if (getLoginData === null) {
            navigate("/login");
        } else {
            const storageData = JSON.parse(getLoginData);
            const token = storageData.accessToken;
            (async () => {
                await axios
                    .get(
                        `${API_PUBLIC_URL}api/tournament-team-players/match/${tournament_team_id}`,
                        {
                            headers: {
                                Authorization: token,
                            },
                        }
                    )
                    .then((response) => {
                        setPlayerList(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                        if (error.response.status === 403) {
                            toast.error("No Permission");
                            navigate("/admin/no-permission");
                        }
                    });
            })();
        }
    }, [tournament_team_id]);



    const handleManOfTheMatch = () => {
        setMan_of_the_match(!man_of_the_match);
    };

    const handleFifty = () => {
        setFifty(!fifty);
    };

    const handleHundred = () => {
        setHundred(!hundred);
    };

    const handleFiveWickets = () => {
        setFive_wickets(!five_wickets);
    };




    // section set player specification
    useEffect(() => {

        if (currentMatchGame() == "Football") {
            if (player_id) {
                let currentPlayer = playerList.find(player => {
                    return player_id == player.player_id
                })
                let f_PlayerSpecification = footballPlayerSpecification(currentPlayer.player)
                setCurrentPlayerSpcification(f_PlayerSpecification)
            }
        } else {
            setCurrentPlayerSpcification(null)
        }
    }, [player_id, playerList])

    const handleFootballPoints = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setFootBallPoints(prevState => {
            return {
                ...prevState,
                [name]: name === "Clean_Sheet" ? value == 0 ? 1 : 0 : parseInt(value)
            }
        })
    }

    const handleSelectMatch = (e) => {
        console.log(e)
        setMatch_id(e);

        let cMatch = matchList.find(m => m.id == e);
        console.log(cMatch)
        setCurrentMatch(cMatch);
    }

    const currentMatchGame = () => {
        // console.log(currentMatch["tournament"]["game"]["name"])
        if (isNull(currentMatch)) { return null } else {
            if (currentMatch["tournament"]["game"]["name"] === "Cricket") { return "Cricket" }
            else if (currentMatch["tournament"]["game"]["name"] === "Football") { return "Football" }
        }
    }
    console.log(currentMatch)
    const submitForm = async (e) => {
        e.preventDefault();

        if (match_id === "") {
            toast.error("Match field is required!");
        } else if (tournament_team_id === "") {
            toast.error("Team field is required!");
        } else if (player_id === "") {
            toast.error("Player field is required!");
        } else {
            const postBody = {
                match_id: match_id,
                tournament_team_id: tournament_team_id,
                player_id: player_id,
                run: run,
                wicket: wicket,
                man_of_the_match: man_of_the_match,
                fifty: fifty,
                hundred: hundred,
                five_wickets: five_wickets,
                footballPoints,
                currentMatch,
                currentPlayerSpcification
            };

            let url = `${API_PUBLIC_URL}api/point-tables/${id}`;

            if (currentMatchGame() == "Football") url = `${API_PUBLIC_URL}api/point-tables/${id}/football`;

            const storageData = JSON.parse(getLoginData);
            const token = storageData.accessToken;

            await axios
                .put(url, postBody, {
                    headers: {
                        Authorization: token,
                    },
                })
                .then((response) => {
                    setMatch_id("");
                    setTournament_team_id("");
                    setPlayer_id("");
                    setRun("");
                    setWicket("");
                    setMan_of_the_match(false);
                    setFifty(false);
                    setHundred(false);
                    setFive_wickets(false);



                    toast.success("Updated successfully");
                    navigate("/admin/point-tables");
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.status === 403) {
                        toast.error("No Permission");
                        navigate("/admin/no-permission");
                    }
                });
        }
    };

    const options = [];

    for (let i = 0; i < matchList.length; i++) {
        let countryTeamOne = "";
        let countryTeamTwo = "";
        let franchiseTeamOne = "";
        let franchiseTeamTwo = "";
        if (matchList[i].tournament_team_one.country != null) {
            countryTeamOne = matchList[i].tournament_team_one.country.name;
        }
        if (matchList[i].tournament_team_two.country != null) {
            countryTeamTwo = matchList[i].tournament_team_two.country.name;
        }
        if (matchList[i].tournament_team_one.franchise != null) {
            franchiseTeamOne = matchList[i].tournament_team_one.franchise.name;
        }
        if (matchList[i].tournament_team_two.franchise != null) {
            franchiseTeamTwo = matchList[i].tournament_team_two.franchise.name;
        }
        options.push({
            value: matchList[i].id,
            label:
                matchList[i].tournament.name +
                " -- " +
                countryTeamOne +
                franchiseTeamOne +
                " VS " +
                countryTeamTwo +
                franchiseTeamTwo +
                " " +
                matchList[i].start_date,
        });
    }

    // const teamOptions = [{
    //     value: "",
    //     label: "Select Team"
    // }];


    // {
    //     tt_idList.map((item, index) => (

    //         <Option Option key={index} value={item} >
    //             {index == 0 ? "Team One" : "Team Two"}
    //         </Option>
    //     ))
    // }

    // for (let i = 0; i < tt_idList.length; i++) {
    //     if (i == 0) {
    //         teamOptions.push({
    //             value: tt_idList[i],
    //             label: "Team One"
    //         });
    //     } else {
    //         teamOptions.push({
    //             value: tt_idList[i],
    //             label: "Team Two"
    //         });
    //     }
    // }


    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <>
            <div>
                <Card>
                    <div style={{
                        textAlign: "center"

                    }}>
                        <Title level={4}>Point Table Edit</Title>
                    </div>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 10,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        // onFinish={submitForm}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item label="Select Match">
                            <Select
                                placeholder="Select Match"
                                name="match_id"
                                value={options.filter((obj) => obj.value === match_id)}
                                onChange={(e) => handleSelectMatch(e.value)}
                                options={options}
                            >
                            </Select>
                        </Form.Item>

                        <Form.Item label="Team">
                            <Select
                                placeholder="Select Team"
                                value={tournament_team_id}
                                name="tournament_team_id"
                                onChange={(e) => setTournament_team_id(e)}
                            >
                                <Option value="">Select team</Option>

                                {tt_idList.map((item, index) => (
                                    <Option key={item} value={item} >
                                        {index == 0 ? "Team One" : "Team Two"}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        {playerList.length > 0 && (
                            <>
                                <Form.Item label="Player">
                                    <Select
                                        placeholder="Select Player"
                                        value={player_id}
                                        name="player_id"
                                        onChange={(e) => setPlayer_id(e)}
                                    >
                                        <Option value="">Select Player</Option>
                                        {playerList.map((item, index) => (
                                            <Option key={index} value={item.player.id}>
                                                {item.player.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                {currentMatchGame() === "Cricket" ? (
                                    <div className="cricket-point-form">
                                        {player_id && (
                                            <>
                                                <Form.Item
                                                    label="Run"
                                                >
                                                    <Input
                                                        placeholder="Enter Run"
                                                        value={run}
                                                        name="run"
                                                        onChange={(e) => setRun(e.target.value)}
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    label="Wicket"
                                                >
                                                    <Input
                                                        placeholder="Enter Wicket"
                                                        value={wicket}
                                                        name="wicket"
                                                        onChange={(e) => setWicket(e.target.value)}
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    label="Man of the match"
                                                >
                                                    <Checkbox
                                                        style={{ width: "20px", height: "20px" }}
                                                        checked={man_of_the_match}
                                                        onChange={handleManOfTheMatch}
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    label="Fifty"
                                                >
                                                    <Checkbox
                                                        style={{ width: "20px", height: "20px" }}
                                                        checked={fifty}
                                                        onChange={handleFifty}
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    label="Hundred"
                                                >
                                                    <Checkbox
                                                        style={{ width: "20px", height: "20px" }}
                                                        checked={hundred}
                                                        onChange={handleHundred}
                                                    />
                                                </Form.Item>

                                                <Form.Item
                                                    label="Five Wickets"
                                                >
                                                    <Checkbox
                                                        style={{ width: "20px", height: "20px" }}
                                                        checked={five_wickets}
                                                        onChange={handleFiveWickets}
                                                    />
                                                </Form.Item>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <div className="football-point-form">
                                        {player_id && (
                                            <>
                                                <hr />
                                                <div className="mb-3 row">
                                                    <div className="col-lg-12">
                                                        <div className="card">
                                                            <div className="card-header">
                                                                <h5 className="m-0">Player Score</h5>
                                                            </div>
                                                            <Card>
                                                                <Form.Item
                                                                    label="Goal"
                                                                >
                                                                    <Input
                                                                        placeholder="Enter Goal"
                                                                        value={footballPoints["Goal"]}
                                                                        name="Goal"
                                                                        onChange={(e) =>
                                                                            handleFootballPoints(e)
                                                                        }
                                                                    />
                                                                </Form.Item>
                                                                <Form.Item
                                                                    label="Assist"
                                                                >
                                                                    <Input
                                                                        placeholder="Enter Assist"
                                                                        value={footballPoints["Assist"]}
                                                                        name="Assist"
                                                                        onChange={(e) =>
                                                                            handleFootballPoints(e)
                                                                        }
                                                                    />
                                                                </Form.Item>
                                                                <Form.Item
                                                                    label="Goal Save"
                                                                >
                                                                    <Input
                                                                        placeholder="Enter Goal Save"
                                                                        value={footballPoints["Goal_Save"]}
                                                                        name="Goal_Save"
                                                                        onChange={(e) =>
                                                                            handleFootballPoints(e)
                                                                        }
                                                                    />
                                                                </Form.Item>
                                                                <Form.Item
                                                                    label="Penalty Save"
                                                                >
                                                                    <Input
                                                                        placeholder="Enter Penalty Save"
                                                                        value={footballPoints["Penalty_Save"]}
                                                                        name="Penalty_Save"
                                                                        onChange={(e) =>
                                                                            handleFootballPoints(e)
                                                                        }
                                                                    />
                                                                </Form.Item>
                                                                {currentPlayerSpcification ==
                                                                    "Goalkeeper" ||
                                                                    currentPlayerSpcification == "Defender" ? (
                                                                    <Form.Item
                                                                        label="Clean Sheet"
                                                                    >
                                                                        <Input
                                                                            placeholder="Enter Clean Sheet"
                                                                            value={
                                                                                footballPoints["Clean_Sheet"]
                                                                            }
                                                                            name="Clean_Sheet"
                                                                            onChange={(e) =>
                                                                                handleFootballPoints(e)
                                                                            }
                                                                        />
                                                                    </Form.Item>
                                                                ) : null}
                                                            </Card>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </>
                        )}

                        <Row>
                            <Col
                                span={18}
                                style={{
                                    textAlign: "right",
                                }}
                            >
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    onClick={() => submitForm()}
                                >
                                    Submit
                                </Button>

                                <Button
                                    type="danger"
                                    style={{
                                        marginLeft: "20px",
                                    }}
                                    htmlType="submit"
                                    onClick={() => {
                                        navigate("/admin/point-tables");
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>




        </>
    );
}
