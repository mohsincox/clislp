import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { API_PUBLIC_URL } from "../constants";

export default function Ranking() {
  const [tournament_id, setTournament_id] = useState("");
  const [tournamentList, setTournamentList] = useState([]);
  const [rankTeamList, setRankTeamList] = useState([]);
  useEffect(() => {
    (async () => {
      await axios
        .get(`${API_PUBLIC_URL}api/ws-rankings`, {})
        .then((response) => {
          setTournamentList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  console.log(tournament_id);

  useEffect(() => {
    (async () => {
      await axios
        .get(`${API_PUBLIC_URL}api/ws-rankings/test/${tournament_id}`, {})
        .then((response) => {
          setRankTeamList(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 403) {
          }
        });
    })();
  }, [tournament_id]);

  return (
    <>
      <Header />
      <hr />
      <div className="container-fluid" style={{ marginBottom: "15px" }}>
        <div className="row">
          <div className="col-sm-3">
            <p>Tournament</p>
            <ul className="list-group">
              {tournamentList.map((tournament, index) => (
                <li
                  className="list-group-item"
                  key={tournament.id}
                  onClick={(event) => {
                    setTournament_id(tournament.id);
                  }}
                >
                  {tournament.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="offset-sm-1 col-sm-6">
            <p>{rankTeamList[0]?.tournament.name} Ranking</p>
            {/* <ul className="list-group">
              {rankTeamList.map((rankTeam, index) => (
                <li className="list-group-item" key={rankTeam.team_id}>
                  User: {rankTeam.user.name} ---- Point: {rankTeam.total_point}
                </li>
              ))}
            </ul> */}
            <table className="table table-bordered">
              <thead>
                <tr>
                  {/* <th>SL</th> */}
                  <th>Team</th>
                  <th>Point</th>
                </tr>
              </thead>
              <tbody>
                {rankTeamList.map((rankTeam, index) => (
                  <tr key={rankTeam.team_id}>
                    {/* <td>{index + 1}</td> */}
                    <td>{rankTeam.user?.name}</td>
                    <td>{rankTeam.total_point}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-sm-2 d-none d-sm-block">
            <img
              src={require("../images/add_spon_dr_side.png")}
              alt=""
              width={"200px"}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
