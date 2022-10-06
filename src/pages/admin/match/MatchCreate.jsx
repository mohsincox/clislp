import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_PUBLIC_URL } from "./../../../constants";
import axios from "axios";
import { toast } from "react-toastify";

export default function MatchCreate() {
  // const [stage_name, setStage_name] = useState("");
  const [tournament_id, setTournament_id] = useState("");
  const [tournament_team_one_id, setTournament_team_one_id] = useState("");
  const [tournament_team_two_id, setTournament_team_two_id] = useState("");
  const [start_date, setStart_date] = useState("");
  const [start_time, setStart_time] = useState("");
  const [venue, setVenue] = useState("");
  const [tournamentList, setTournamentList] = useState([]);
  const [tourTeamList, setTourTeamList] = useState([]);
  const navigate = useNavigate();

  const getLoginData = localStorage.getItem("loginData");

  useEffect(() => {
    getSelectTournament();
  }, []);

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
            console.log("setTourTeamList", response.data);
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

    // if (stage_name.trim() === "") {
    //   toast.error("Stage Name field is required!");
    // } else
    if (tournament_id === "") {
      toast.error("Tournament field is required!");
    } else if (tournament_team_one_id === "") {
      toast.error("Tournament Team One field is required!");
    } else if (tournament_team_two_id === "") {
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
        // stage_name: stage_name,
        tournament_id: tournament_id,
        tournament_team_one_id: tournament_team_one_id,
        tournament_team_two_id: tournament_team_two_id,
        start_date: start_date,
        start_time: start_time,
        venue: venue,
      };

      // console.log("first.......", start_date);
      // return;

      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .post(`${API_PUBLIC_URL}api/matches`, postBody, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          // setStage_name("");
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
      {/* <div className="container mt-2"> */}
      <div className="col-sm-10 offset-sm-1">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Match Create</h5>
            <form onSubmit={submitForm}>
              {/* <div className="mb-3 row">
                <label className="form-label col-sm-3">
                  Stage Name <span style={{ color: "#ff0000" }}>*</span>
                </label>
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
              </div> */}

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
                  Tournament Team One{" "}
                  <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                  <select
                    className="form-select"
                    value={tournament_team_one_id}
                    name="tournament_team_one_id"
                    onChange={(e) => setTournament_team_one_id(e.target.value)}
                  >
                    <option value={""}>Select team one</option>
                    {tourTeamList.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.country == null
                          ? item.franchise.name
                          : item.country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">
                  Tournament Team Two{" "}
                  <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                  <select
                    className="form-select"
                    value={tournament_team_two_id}
                    name="tournament_team_two_id"
                    onChange={(e) => setTournament_team_two_id(e.target.value)}
                  >
                    <option value={""}>Select team Two</option>
                    {tourTeamList.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.country == null
                          ? item.franchise.name
                          : item.country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">Start Date</label>
                <div className="col-sm-9">
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

              {/* <div className="form-group col-md-4">
                <label className="mb-2">Country</label>
                <select
                  name="country"
                  className="form-control"
                  onChange={(e) => setTournament_id(e.target.value)}
                >
                  <option value={""}>Select Tournament</option>
                  {tournamentList.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div> */}

              {/* <div className="form-group col-md-4">
                <label className="mb-2">State</label>
                <select name="state" className="form-control">
                  <option value={""}>Select State</option>
                  {teamTourList.map((st, index) => (
                    <option key={index} value={st.id}>
                      {st.name}
                    </option>
                  ))}
                </select>
              </div> */}

              <div className="float-end">
                <button
                  className="btn btn-danger me-3"
                  onClick={() => {
                    navigate("/admin/matches");
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
