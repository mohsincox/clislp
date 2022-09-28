import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_PUBLIC_URL } from "./../../../constants";
import axios from "axios";
import { toast } from "react-toastify";

export default function MatchEdit() {
  const [stage_name, setStage_name] = useState("");
  const [tournament_id, setTournament_id] = useState("");
  const [tournament_team_one_id, setTournament_team_one_id] = useState("");
  const [tournament_team_two_id, setTournament_team_two_id] = useState("");
  const [start_date, setStart_date] = useState("");
  const [start_time, setStart_time] = useState("");
  const [venue, setVenue] = useState("");
  const [tournamentList, setTournamentList] = useState([]);
  const [tourTeamList, setTourTeamList] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const getLoginData = localStorage.getItem("loginData");

  useEffect(() => {
    getSelectTournament();
    getMatchDetails();
  }, []);

  const getMatchDetails = () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .get(`${API_PUBLIC_URL}api/matches/${id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setStage_name(response.data.stage_name);
            setTournament_id(response.data.tournament_id);
            setTournament_team_one_id(response.data.tournament_team_one_id);
            setTournament_team_two_id(response.data.tournament_team_two_id);
            setStart_date(response.data.start_date);
            setStart_time(response.data.start_time);
            setVenue(response.data.venue);
            console.log(response.data);
          });
      })();
    }
  };

  const getSelectTournament = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/tournaments`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setTournamentList(response.data);
          console.log(response.data);
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
          .get(`${API_PUBLIC_URL}api/ws-fixtures/tt/${tournament_id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setTourTeamList(response.data);
            console.log(response.data);
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

  const submitForm = async (e) => {
    e.preventDefault();

    if (stage_name.trim() == "") {
      toast.error("Stage Name field is required!");
    } else if (tournament_id == "") {
      toast.error("Tournament field is required!");
    } else if (tournament_team_one_id == "") {
      toast.error("Tournament Team One field is required!");
    } else if (tournament_team_two_id == "") {
      toast.error("Tournament Team Two field is required!");
    } else if (tournament_team_one_id === tournament_team_two_id) {
      toast.error("Both Team can not be same");
    } else {
      //   const formData = new FormData();
      //   formData.append("name", name);
      //   formData.append("tournament_id", tournament_id);

      //   for (var [key, value] of formData.entries()) {
      //     console.log(key, value);
      //   }
      //   return;

      const postBody = {
        stage_name: stage_name,
        tournament_id: tournament_id,
        tournament_team_one_id: tournament_team_one_id,
        tournament_team_two_id: tournament_team_two_id,
        start_date: start_date,
        start_time: start_time,
        venue: venue,
      };

      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .put(`${API_PUBLIC_URL}api/matches/${id}`, postBody, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setStage_name("");
          setTournament_id("");
          setTournament_team_one_id("");
          setTournament_team_two_id("");
          setVenue("");

          toast.success("Successfully created!");
          navigate("/admin/matches");
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
      <div className="container">
        <div className="col-sm-8 offset-sm-2">
          <div>
            <h3>Match Create</h3>
          </div>
          <div>
            <form onSubmit={submitForm}>
              <div className="mb-3 row">
                <label className="form-label col-sm-3">Stage Name</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Stage Name"
                    value={stage_name}
                    name="stage_name"
                    onChange={(e) => setStage_name(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">Tournament Name</label>
                <div className="col-sm-9">
                  <select
                    className="form-select"
                    value={tournament_id}
                    name="tournament_id"
                    onChange={(e) => setTournament_id(e.target.value)}
                  >
                    <option value={""}>Select Tournament</option>
                    {tournamentList.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">
                  Tournament Team One
                </label>
                <div className="col-sm-9">
                  <select
                    className="form-select"
                    value={tournament_team_one_id}
                    name="tournament_team_one_id"
                    onChange={(e) => setTournament_team_one_id(e.target.value)}
                  >
                    <option value={""}>Select team one</option>
                    {tourTeamList.map((st, index) => (
                      <option key={index} value={st.id}>
                        {st.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">
                  Tournament Team Two
                </label>
                <div className="col-sm-9">
                  <select
                    className="form-select"
                    value={tournament_team_two_id}
                    name="tournament_team_two_id"
                    onChange={(e) => setTournament_team_two_id(e.target.value)}
                  >
                    <option value={""}>Select team Two</option>
                    {tourTeamList.map((st, index) => (
                      <option key={index} value={st.id}>
                        {st.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">Start Date</label>
                <div className="col-sm-9">
                  {/* <input
                    className="form-control"
                    type="text"
                    placeholder="Enter start date"
                    value={start_date}
                    name="start_date"
                    onChange={(e) => setStart_date(e.target.value)}
                  /> */}
                  <input
                    className="form-control"
                    type="date"
                    placeholder="dd-mm-yyyy"
                    value={start_date}
                    name="start_date"
                    onChange={(e) => setStart_date(e.target.value)}
                    min="2022-01-01"
                    max="2030-12-31"
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">Start Time</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter start time"
                    value={start_time}
                    name="start_time"
                    onChange={(e) => setStart_time(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">Venue</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Venue"
                    value={venue}
                    name="venue"
                    onChange={(e) => setVenue(e.target.value)}
                  />
                </div>
              </div>

              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
