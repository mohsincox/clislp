import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { API_PUBLIC_URL } from "../constants";
import WebLayout from "../layouts/WebLayout";
import BasicTemplate from "./Template/BasicTemplate";
import Select from "react-select";
// import {menuListCSS} from "react-select/dist/declarations/src/components/Menu";
<style>
  {`.css-b62m3t-container {
        background-color: red;
        color: white;
        font-size: 2em
    }`}
</style>;

function BuildTeam() {
  const [teamPlayerList, setTeamPlayerList] = useState([]);
  const [tournament_team_id, setTournament_team_id] = useState("");
  const [strikerMax, setStrikerMax] = useState(0);
  const [midfielderMax, setMidfielderMax] = useState(0);
  const [defenderMax, setDefenderMax] = useState(0);
  const [goalkeeperMax, setGoalkeeperMax] = useState(0);
  const [tournamentTeamList, setTournamentTeamList] = useState([]);

  const [user_cricket_player, setUser_cricket_player] = useState("");
  const [user_football_player, setUser_football_player] = useState("");
  const [maxSelect, setMaxSelect] = useState("");
  const [disable, setDisable] = React.useState(false);

  // console.log("authUser", authUser);
  // console.log("authUser2", authUser.user.userrole);

  // console.log("team id", tournament_team_id);

  const [state, setState] = useState({ selections: [] });
  const { tourId } = useParams();
  let navigate = useNavigate();

  let strikerInitial = 0;
  let midfielderInitial = 0;
  let defenderInitial = 0;
  let goalkeeperInitial = 0;

  const handleCheckboxChange = useCallback(
    (key) => {
      let sel = state.selections;
      let find = sel.indexOf(key);
      if (find > -1) {
        let rmv = sel.splice(find, 1);
        // console.log("splice---", rmv);
        // console.log("find---", find);
        let fff = rmv[0];

        const storageData = JSON.parse(getLoginData);
        const token = storageData.accessToken;
        (async () => {
          await axios
            .get(`${API_PUBLIC_URL}api/players/${fff}`, {
              headers: {
                Authorization: token,
              },
            })
            .then((response) => {
              // console.log("response player", response.data);
              const specificationParse = JSON.parse(
                response.data.specification
              );

              if (specificationParse["Striker"] === true) {
                strikerInitial--;
                // console.log("strikerInitial", strikerInitial);
              }

              if (specificationParse["Midfielder"] === true) {
                midfielderInitial--;
                // console.log("midfielderInitial", midfielderInitial);
              }

              if (specificationParse["Defender"] === true) {
                defenderInitial--;
                // console.log("defenderInitial", defenderInitial);
              }

              if (specificationParse["Goalkeeper"] === true) {
                goalkeeperInitial--;
                // console.log("goalkeeperInitial", goalkeeperInitial);
              }

              setState({
                selections: sel,
              });
            });
        })();
      } else {
        if (sel.length >= user_cricket_player) {
          toast.error(`You have already ${user_cricket_player} players`);
        } else {
          // console.log("key------", key);

          const storageData = JSON.parse(getLoginData);
          const token = storageData.accessToken;
          (async () => {
            await axios
              .get(`${API_PUBLIC_URL}api/players/${key}`, {
                headers: {
                  Authorization: token,
                },
              })
              .then((response) => {
                // console.log("response player", response.data);
                const specificationParse = JSON.parse(
                  response.data.specification
                );

                if (specificationParse["Striker"] === true) {
                  if (strikerInitial >= strikerMax) {
                    toast.error(`Max Striker is ${strikerMax}`);
                  } else {
                    sel.push(key);
                    strikerInitial++;
                    // console.log("strikerInitial", strikerInitial);
                  }
                }

                if (specificationParse["Midfielder"] === true) {
                  if (midfielderInitial >= midfielderMax) {
                    toast.error(`Max Midfielder is ${midfielderMax}`);
                  } else {
                    sel.push(key);
                    midfielderInitial++;
                    // console.log("midfielderInitial", midfielderInitial);
                  }
                }

                if (specificationParse["Defender"] === true) {
                  if (defenderInitial >= defenderMax) {
                    toast.error(`Max Defender is ${defenderMax}`);
                  } else {
                    sel.push(key);
                    defenderInitial++;
                    // console.log("defenderInitial", defenderInitial);
                  }
                }

                if (specificationParse["Goalkeeper"] === true) {
                  if (goalkeeperInitial >= goalkeeperMax) {
                    toast.error(`Max Goalkeeper is ${goalkeeperMax}`);
                  } else {
                    sel.push(key);
                    goalkeeperInitial++;
                    // console.log("goalkeeperInitial", goalkeeperInitial);
                  }
                }

                if (
                  specificationParse["All Rounder"] === true ||
                  specificationParse["Batsman"] === true ||
                  specificationParse["Bowler"] === true ||
                  specificationParse["Keeper"] === true
                ) {
                  sel.push(key);
                }

                setState({
                  selections: sel,
                });
              });
          })();
        }
      }
    },
    [user_cricket_player]
  );

  const getLoginData = localStorage.getItem("loginData");

  useEffect(() => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .get(`${API_PUBLIC_URL}api/settings/1`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            // console.log(
            //   "response.data hhhhh",
            //   response.data.user_cricket_player,
            //   "f",
            //   response.data.user_football_player
            // );
            setUser_cricket_player(response.data.user_cricket_player);
            setUser_football_player(response.data.user_football_player);
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 403) {
              toast.error("No Permission");
              // navigate("/");
            }
          });
      })();
    }
  }, []);

  const getTourTeamPlayerDetail = async () => {
    if (getLoginData === null) {
      navigate("/register");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(
          `${API_PUBLIC_URL}commonapi/tournament-team-player-deatil/${tourId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          setTeamPlayerList(response.data);
          // console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 403) {
            toast.error("No Permission");
            // navigate("/");
          }
        });
    }
  };

  const getTournamentTeam = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}commonapi/tournament-team/${tourId}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setTournamentTeamList(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 403) {
            toast.error("No Permission");
            // navigate("/");
          }
        });
    }
  };

  const getTournamentFootballTeamSetting = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}commonapi/tournament-football-team-setting`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          // console.log(
          //   "setTournamentFootballTeamSetting first------",
          //   response.data
          // );

          setStrikerMax(response.data.value["Striker"].Max);
          setMidfielderMax(response.data.value["Midfielder"].Max);
          setDefenderMax(response.data.value["Defender"].Max);
          setGoalkeeperMax(response.data.value["Goalkeeper"].Max);

          // console.log(
          //   "strikerMax",
          //   response.data.value["Striker"].Max
          // );
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 403) {
            toast.error("No Permission");
            // navigate("/");
          }
        });
    }
  };

  // console.log("strikerMax", strikerMax);
  // console.log("midfielderMax", midfielderMax);
  // console.log("defenderMax", defenderMax);
  // console.log("goalkeeperMax", goalkeeperMax);

  useEffect(() => {
    getTourTeamPlayerDetail();
    getTournamentTeam();
    getTournamentFootballTeamSetting();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();

    if (disable) {
      console.log("disable", disable);
      return;
    }

    const storageData = JSON.parse(getLoginData);
    const token = storageData.accessToken;

    const postBody = {
      user_id: storageData.id,
      tournament_id: tourId,
      player_ids: JSON.stringify(state.selections),
    };

    console.log(postBody);
    if (state.selections.length < user_cricket_player) {
      toast.error(`Please Select ${user_cricket_player} Players`);
    } else {
      await axios
        .post(`${API_PUBLIC_URL}api/ws-teams/build`, postBody, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setState({ selections: [] });
          // toast.success("Created successfully");
          setDisable(true);
          navigate(`/view-team/${tourId}`);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 403) {
            toast.error("No Permission");
            // navigate("/");
          }
          if (error.response.status === 400) {
            toast.error(error.response.data.msg);
          }
        });
    }
  };

  function playerSpecification(player) {
    let p = JSON.parse(player.specification);
    let specification = [];
    for (const key in p) {
      if (p[key] === true) specification.push(key);
    }
    return specification.length ? (
      <small>{specification.join(", ")}</small>
    ) : (
      <small>Not Specified</small>
    );
  }

  const options = [];

  for (let i = 0; i < tournamentTeamList.length; i++) {
    options.push({
      value: tournamentTeamList[i].id,
      // label: tournamentTeamList[i].country.name,
      label: (
        <div>
          {tournamentTeamList[i].country != null && (
            <img
              src={API_PUBLIC_URL + tournamentTeamList[i]?.country?.flag}
              height="25px"
              width="35px"
              alt=""
            />
          )}
          {tournamentTeamList[i].franchise != null && (
            <img
              src={API_PUBLIC_URL + tournamentTeamList[i]?.franchise?.logo}
              height="25px"
              width="35px"
              alt=""
            />
          )}
          {tournamentTeamList[i].country != null &&
            " " + tournamentTeamList[i]?.country?.name}
          {tournamentTeamList[i].franchise != null &&
            " " + tournamentTeamList[i]?.franchise?.name}
        </div>
      ),
    });
  }

  // test
  return (
    <WebLayout>
      <div className="build-team-section ku-section section-top-required">
        <div className="container-fluid" style={{ marginBottom: "15px" }}>
          <BasicTemplate>
            <div className="col-12 col-lg-8">
              <div style={{ marginTop: "15px" }} className="card-custom">
                <ul id="progressbar">
                  <li className="passed active" id="account">
                    <center>Informations</center>
                  </li>
                  <li className="active" id="personal">
                    <center>Tournaments</center>
                  </li>
                  <li id="confirm" className="">
                    <center>Build Team</center>
                  </li>
                </ul>
              </div>

              <div className="build-team-area-area basic-temp-main-content-area p-3 p-sm-3 p-md-3 p-lg-5 p-xl-5">
                {/* <div className="mb-3 row">
                  <div className="col-sm-6 offset-sm-3">
                    <select
                      className="form-select"
                      value={country_id}
                      name="country_id"
                      onChange={(e) => setCountry_id(e.target.value)}
                    >
                      <option>Select Country</option>
                      {countryList.map((item, index) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div> */}

                <div className="mb-3 row">
                  <style>
                    {`.css-b62m3t-container {
                     z-index: 999;
                        }`}
                  </style>
                  {/* <style>
                    {`.css-b62m3t-container {
                     z-index: 999;
                        }`}
                  </style>
                  <div className="col-sm-6 offset-sm-3">
                    <ReactSelect
                      placeholder="Select Team & Choose Players"
                      value={tournament_team_id}
                      name="tournament_team_id"
                      onChange={(item) => setTournament_team_id(item.id)}
                      options={tournamentTeamList}
                      formatOptionLabel={(item) => (
                        <div>
                          {item.country?.flag ? (
                            <img
                              src={API_PUBLIC_URL + item.country?.flag}
                              style={{
                                marginRight: "20px",
                                height: "25px",
                                width: "35px",
                              }}
                              alt="country-image"
                            />
                          ) : (
                            ""
                          )}
                          <span>{item.country?.name}</span>
                        </div>
                      )}
                    />
                  </div> */}

                  <div className="col-sm-6 offset-sm-3">
                    <Select
                      onChange={(e) => setTournament_team_id(e.value)}
                      options={options}
                      placeholder={"Select Team & Choose Players"}
                    />
                  </div>

                  {/* <div className="col-sm-6 offset-sm-3">
                    <select
                      className="form-select"
                      value={tournament_team_id}
                      name="tournament_team_id"
                      onChange={(e) => setTournament_team_id(e.target.value)}
                    >
                      <option>Select Team & Choose Players</option>
                      {tournamentTeamList.map((item, index) => (
                        <option key={item.id} value={item.id}>
                          {item.country?.name} {item.franchise?.name}
                        </option>
                      ))}
                    </select>
                  </div> */}
                </div>

                <form onSubmit={submitForm}>
                  <div className="build-player-list-single-item">
                    {teamPlayerList.map((detail, index) => (
                      <React.Fragment key={detail.id}>
                        {detail.tournament_team_id == tournament_team_id && (
                          <div
                            className="build-player-list"
                            key={detail.player?.id}
                          >
                            <label htmlFor={`player-${detail.player?.id}`}>
                              <input
                                id={`player-${detail.player?.id}`}
                                className="visually-hidden build-player-checkbox"
                                type="checkbox"
                                checked={state.selections.includes(
                                  detail.player.id
                                )}
                                onChange={() =>
                                  handleCheckboxChange(detail.player?.id)
                                }
                              />
                              <div className="player-avatar-container">
                                <div className="player-avater">
                                  <img
                                    src={`${API_PUBLIC_URL}${detail.player?.image}`}
                                    alt=""
                                  />
                                </div>
                                <div className="player-flag">
                                  <img
                                    src={`${API_PUBLIC_URL}${detail.player?.country?.flag}`}
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div className="player-details">
                                <p className="m-0 player-name">
                                  {detail.player?.name}
                                </p>
                                <p className="m-0 player-specification">
                                  {playerSpecification(detail.player)}
                                </p>
                              </div>
                            </label>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="btn ku-c-button"
                    style={{ borderRadius: "0px", float: "right" }}
                    disabled={disable}
                  >
                    ({state.selections.length}/ {user_cricket_player}) View Team
                  </button>
                </form>
              </div>
            </div>
          </BasicTemplate>
        </div>
      </div>
    </WebLayout>
  );
}

export default React.memo(BuildTeam);
