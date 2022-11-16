import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function TournamentTeamPlayerCreate() {
  const [tournament_id, setTournament_id] = useState("");
  const [tournamentList, setTournamentList] = useState([]);
  const [tournament_team_id, setTournament_team_id] = useState("");
  const [tournamentTeamList, setTournamentTeamList] = useState([]);
  const [game_id, setGame_id] = useState("");
  const [playerList, setPlayerList] = useState([]);
  const [state, setState] = useState({ selections: [] });
  const [country_id, setCountry_id] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [isInternational, setIsInternational] = useState("");
  const [admin_cricket_player, setAdmin_cricket_player] = useState("");
  const [admin_football_player, setAdmin_football_player] = useState("");
  const [maxSelect, setMaxSelect] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    handleLogin();
    getCountryDetails();
  }, []);

  const getLoginData = localStorage.getItem("loginData");

  const handleLogin = () => {
    if (getLoginData === null) {
      navigate("/login");
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
          .get(`${API_PUBLIC_URL}api/settings/1`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            // console.log(
            //   "response.data hhhhh",
            //   response.data.admin_cricket_player,
            //   "f",
            //   response.data.admin_football_player
            // );
            setAdmin_cricket_player(response.data.admin_cricket_player);
            setAdmin_football_player(response.data.admin_football_player);
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
  }, []);

  useEffect(() => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .get(`${API_PUBLIC_URL}api/tournaments`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            // console.log(response.data);
            setTournamentList(response.data);
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
  }, []);

  useEffect(() => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .get(
            `${API_PUBLIC_URL}api/tournament-team-players/tt/${tournament_id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((response) => {
            setTournamentTeamList(response.data);
            // console.log("test-----", response.data);
            if (response.data.length > 0) {
              setGame_id(response.data[0].tournament.game_id);
              console.log("first game ID", response.data[0].tournament.game_id);

              if (response.data[0].tournament.game_id == 1) {
                setMaxSelect(admin_cricket_player);
              } else if (response.data[0].tournament.game_id == 2) {
                setMaxSelect(admin_football_player);
              } else {
                setMaxSelect(18);
              }
            }
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
  }, [tournament_id]);

  useEffect(() => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .get(`${API_PUBLIC_URL}api/tournament-teams/${tournament_team_id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            // setTournamentTeamList(response.data);
            // console.log("hamba----- ", response.data);
            setCountry_id(response.data.country_id);
            setIsInternational(response.data.category);
            // if (response.data.length > 0) {
            //   setGame_id(response.data[0].tournament.game_id);
            //   console.log("first game ID", response.data[0].tournament.game_id);
            // }
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

  useEffect(() => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .get(
            `${API_PUBLIC_URL}api/tournament-team-players/players/${game_id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((response) => {
            setPlayerList(response.data);
            // console.log("test----- Players --", response.data);
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
  }, [game_id]);

  const submitForm = async (e) => {
    e.preventDefault();

    console.log("tournament_team_id", tournament_team_id);

    if (tournament_id === "") {
      toast.error("Tournament field is required!");
    } else if (tournament_team_id === "") {
      toast.error("Team field is required!");
    } else if (state.selections.length < 1) {
      toast.error("Please Select players");
    } else {
      const postBody = {
        tournament_id: tournament_id,
        tournament_team_id: tournament_team_id,
        player_ids: JSON.stringify(state.selections),
      };

      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .post(`${API_PUBLIC_URL}api/tournament-team-players`, postBody, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setTournament_id("");
          setTournament_team_id("");
          setState({ selections: [] });

          toast.success("Successfully created!");
          navigate("/admin/tournament-team-players");
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

  function handleCheckboxChange(key) {
    let sel = state.selections;
    let find = sel.indexOf(key);
    if (find > -1) {
      sel.splice(find, 1);
    } else {
      if (sel.length >= maxSelect) {
        toast.error(`You have already ${maxSelect} players`);
      } else {
        sel.push(key);
      }
    }

    setState({
      selections: sel,
    });
  }

  const getCountryDetails = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/countries`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setCountryList(response.data);
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

  return (
    <>
      {/* <div className="container mt-2"> */}
      <div className="col-sm-12 offset-sm-0">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Tournament Team Player Create</h5>
            <form onSubmit={submitForm}>
              <div className="mb-3 row">
                <label className="form-label col-sm-3">
                  Tournament Name <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                  <select
                    className="form-select"
                    value={tournament_id}
                    name="tournament_id"
                    onChange={(e) => setTournament_id(e.target.value)}
                  >
                    <option value={""}>Select Tournament</option>
                    {tournamentList.map((item, index) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {tournamentTeamList.length > 0 && (
                <div className="mb-3 row">
                  <label className="form-label col-sm-3">
                    Select Team <span style={{ color: "#ff0000" }}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <select
                      className="form-select"
                      value={tournament_team_id}
                      name="tournament_team_id"
                      onChange={(e) => setTournament_team_id(e.target.value)}
                    >
                      <option value={""}>Select Team</option>
                      {tournamentTeamList.map((item, index) => (
                        <option key={item.id} value={item.id}>
                          {item.country != null && item.country.name}

                          {item.franchise != null && item.franchise.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {playerList.length > 0 && (
                <>
                  {isInternational == "Franchise" && (
                    <div className="mb-3 row">
                      <label className="form-label col-sm-3">
                        Country <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className="col-sm-9">
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
                    </div>
                  )}

                  <div className="mb-5">
                    <div className="float-start">Select Players:</div>
                    <div className="float-end">
                      {state.selections.length} Selected
                    </div>
                  </div>
                  <div className="row mt-4">
                    {playerList.map((player, index) => (
                      <React.Fragment key={player.id}>
                        {player.country_id == country_id && (
                          <div
                            className="col-sm-2 mb-3"
                            style={{ textAlign: "center" }}
                          >
                            <input
                              style={{ width: "20px", height: "20px" }}
                              type="checkbox"
                              checked={state.selections.includes(player.id)}
                              onChange={() => handleCheckboxChange(player.id)}
                            />
                            <span style={{ position: "relative" }}>
                              <img
                                src={`${API_PUBLIC_URL}${player.image}`}
                                alt=""
                                width="80px"
                              />
                              <img
                                src={`${API_PUBLIC_URL}${player.country.flag}`}
                                alt=""
                                width="30px"
                                style={{
                                  position: "absolute",
                                  top: "36px",
                                  left: "24px",
                                }}
                              />
                            </span>
                            <p style={{ marginBottom: "0px" }}>{player.name}</p>
                            <small>
                              {JSON.parse(player.specification)[
                                "All Rounder"
                              ] === true && (
                                <>
                                  <small>All Rounder</small>
                                  <br />
                                </>
                              )}
                              {JSON.parse(player.specification)["Batsman"] ===
                                true && (
                                <>
                                  <small>Batsman</small>
                                  <br />
                                </>
                              )}
                              {JSON.parse(player.specification)["Bowler"] ===
                                true && (
                                <>
                                  <small>Bowler</small>
                                  <br />
                                </>
                              )}
                              {JSON.parse(player.specification)["Keeper"] ===
                                true && (
                                <>
                                  <small>Wicket Keeper</small>
                                  <br />
                                </>
                              )}
                              {JSON.parse(player.specification)[
                                "Goalkeeper"
                              ] === true && (
                                <>
                                  <small>Goalkeeper</small>
                                  <br />
                                </>
                              )}
                              {JSON.parse(player.specification)["Defender"] ===
                                true && (
                                <>
                                  <small>Defender</small>
                                  <br />
                                </>
                              )}
                              {JSON.parse(player.specification)[
                                "Midfielder"
                              ] === true && (
                                <>
                                  <small>Midfielder</small>
                                  <br />
                                </>
                              )}
                              {JSON.parse(player.specification)["Forward"] ===
                                true && (
                                <>
                                  <small>Forward</small>
                                  <br />
                                </>
                              )}
                            </small>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </>
              )}

              <div className="float-end">
                <button
                  className="btn btn-danger me-3"
                  onClick={() => {
                    navigate("/admin/tournament-team-players");
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={submitForm}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
