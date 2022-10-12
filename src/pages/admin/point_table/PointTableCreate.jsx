import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function PointTableCreate() {
  const [match_id, setMatch_id] = useState("");
  const [matchList, setMatchList] = useState([]);
  const [tt_id, setTt_id] = useState("");
  const [tt_idList, setTt_idList] = useState([]);
  const [player_id, setPlayer_id] = useState("");
  const [playerList, setPlayerList] = useState([]);
  let navigate = useNavigate();

  const getLoginData = localStorage.getItem("loginData");

  useEffect(() => {
    getGameDetails();
  }, []);

  const getGameDetails = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/matches`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setMatchList(response.data);
          console.log("first", response.data);
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
            // setCategory(response.data.category);
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
          .get(`${API_PUBLIC_URL}api/tournament-team-players/match/${tt_id}`, {
            headers: {
              Authorization: token,
            },
          })
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
  }, [tt_id]);

  const submitForm = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      {/* <div className="container mt-2"> */}
      <div className="col-sm-10 offset-sm-1">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Point Table Create</h5>
            <form onSubmit={submitForm}>
              {/* <div className="mb-3 row">
                <label className="form-label col-sm-3">
                  Group Name <span style={{ color: "#ff0000" }}>*</span>
                </label>

                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Grpup Name"
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div> */}

              <div className="mb-3 row">
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
                        {item.tournament_team_one.country == null
                          ? item.tournament_team_one.franchise.name
                          : item.tournament_team_one.country.name}{" "}
                        VS{" "}
                        {item.tournament_team_two.country == null
                          ? item.tournament_team_two.franchise.name
                          : item.tournament_team_two.country.name}{" "}
                        {item.start_date}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">
                  Team <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                  <select
                    className="form-select"
                    value={tt_id}
                    name="tt_id"
                    onChange={(e) => setTt_id(e.target.value)}
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
                <div className="mb-3 row">
                  <label className="form-label col-sm-3">
                    Player <span style={{ color: "#ff0000" }}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <select
                      className="form-select"
                      value={player_id}
                      name="player_id"
                      onChange={(e) => setTt_id(e.target.value)}
                    >
                      <option>Select Player</option>
                      {playerList.map((item, index) => (
                        <option key={item.id} value={item.id}>
                          {item.player.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div className="float-end">
                <button
                  className="btn btn-danger me-3"
                  onClick={() => {
                    navigate("/admin/tournament-teams");
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
