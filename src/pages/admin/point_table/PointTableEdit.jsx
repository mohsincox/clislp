import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import { API_PUBLIC_URL } from "../../../constants";

export default function PointTableEdit() {
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
          });
      })();
    }
  };

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
            var arr = [];
            if (response.data.tournament_team_one_id !== undefined) {
              arr.push(response.data.tournament_team_one_id);
            }

            if (response.data.tournament_team_two_id !== undefined) {
              arr.push(response.data.tournament_team_two_id);
            }

            console.log(arr);

            setTt_idList(arr);
            console.log("test1", response.data.tournament_team_one_id);
            console.log("test2", response.data.tournament_team_two_id);
            console.log("test3", response.data);
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
            console.log("match", response.data);
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
      };

      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .put(`${API_PUBLIC_URL}api/point-tables/${id}`, postBody, {
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

          toast.success("Successfully created!");
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

  return (
    <>
      {/* <div className="container mt-2"> */}
      <div className="col-sm-10 offset-sm-1">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Point Table Edit</h5>
            <form onSubmit={submitForm}>
              {/* <div className="mb-3 row">
                <label className="form-label col-sm-3">
                  Select Match <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                  <select
                    className="form-select"
                    value={match_id}
                    name="match_id"
                    onChange={(e) => setMatch_id(e.target.value)}
                  >
                    <option value={""}>Select Match</option>
                    {matchList.map((item, index) => (
                      <option key={item.id} value={item.id}>
                        {item.tournament.name}
                        {" -- "}
                        {item.tournament_team_one.country != null &&
                          item.tournament_team_one.country.name}
                        {item.tournament_team_one.franchise != null &&
                          item.tournament_team_one.franchise.name}{" "}
                        VS{" "}
                        {item.tournament_team_two.country != null &&
                          item.tournament_team_two.country.name}
                        {item.tournament_team_two.franchise != null &&
                          item.tournament_team_two.franchise.name}{" "}
                        {item.start_date}
                      </option>
                    ))}
                  </select>
                </div>
              </div> */}

              <div className="mb-3 row">
                <label className="form-label col-sm-3">
                  Select Match <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                  <Select
                    value={options.filter((obj) => obj.value === match_id)}
                    onChange={(e) => setMatch_id(e.value)}
                    options={options}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">
                  Team <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                  <select
                    className="form-select"
                    value={tournament_team_id}
                    name="tournament_team_id"
                    onChange={(e) => setTournament_team_id(e.target.value)}
                  >
                    <option>Select Team</option>
                    {tt_idList.map((item, index) => (
                      <option key={item} value={item}>
                        {index == 0 ? "Team One" : "Team Two"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {playerList.length > 0 && (
                <>
                  <div className="mb-3 row">
                    <label className="form-label col-sm-3">
                      Player <span style={{ color: "#ff0000" }}>*</span>
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-select"
                        value={player_id}
                        name="player_id"
                        onChange={(e) => setPlayer_id(e.target.value)}
                      >
                        <option>Select Player</option>
                        {playerList.map((item, index) => (
                          <option key={index} value={item.player.id}>
                            {item.player.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="form-label col-sm-3">Run</label>
                    <div className="col-sm-9">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Enter Run"
                        value={run}
                        name="run"
                        onChange={(e) => setRun(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="form-label col-sm-3">Wicket</label>
                    <div className="col-sm-9">
                      <input
                        className="form-control"
                        type="number"
                        placeholder="Enter Wicket"
                        value={wicket}
                        name="wicket"
                        onChange={(e) => setWicket(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="form-label col-sm-3">
                      Man of the match
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="checkbox"
                        checked={man_of_the_match}
                        onChange={handleManOfTheMatch}
                      />
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="form-label col-sm-3">Fifty</label>
                    <div className="col-sm-9">
                      <input
                        type="checkbox"
                        checked={fifty}
                        onChange={handleFifty}
                      />
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="form-label col-sm-3">Hundred</label>
                    <div className="col-sm-9">
                      <input
                        type="checkbox"
                        checked={hundred}
                        onChange={handleHundred}
                      />
                    </div>
                  </div>

                  <div className="mb-3 row">
                    <label className="form-label col-sm-3">Five Wickets</label>
                    <div className="col-sm-9">
                      <input
                        type="checkbox"
                        checked={five_wickets}
                        onChange={handleFiveWickets}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="float-end">
                <button
                  className="btn btn-danger me-3"
                  onClick={() => {
                    navigate("/admin/point-tables");
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
