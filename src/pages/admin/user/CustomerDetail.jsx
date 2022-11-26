import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function CustomerDetail() {
  const [tournament_id, setTournament_id] = useState("");
  const [tournamentList, setTournamentList] = useState([]);
  const [rankTeamList, setRankTeamList] = useState([]);
  let navigate = useNavigate();
  const [teamDetail, setTeamDetail] = useState([]);
  const { id } = useParams();
  const [total, setTotal] = useState(0);

  const getLoginData = localStorage.getItem("loginData");

  useEffect(() => {
    (async () => {
      if (getLoginData === null) {
        navigate("/login");
      } else {
        const storageData = JSON.parse(getLoginData);
        const token = storageData.accessToken;
        await axios
          .get(`${API_PUBLIC_URL}api/reports/tournament-report`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            // console.log("tour List", response.data);
            setTournamentList(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await axios
        .get(`${API_PUBLIC_URL}api/ws-my-team/${id}/test/${tournament_id}`, {})
        .then((response) => {
          setTeamDetail(response.data);
          // console.log("tP", response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 403) {
          }
        });
    })();
  }, [tournament_id]);

  console.log(tournament_id);

  useEffect(() => {
    (async () => {
      if (getLoginData === null) {
        navigate("/login");
      } else {
        const storageData = JSON.parse(getLoginData);
        const token = storageData.accessToken;
        await axios
          .get(
            `${API_PUBLIC_URL}api/reports/tournament-ranking-report/${tournament_id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((response) => {
            setRankTeamList(response.data);
            // console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 403) {
              toast.error("No Permission");
              // navigate("/admin/no-permission");
            }
          });
      }
    })();
  }, [tournament_id]);

  return (
    <>
      <div className="mb-3 row">
        <Link to={`/admin/customers`}> Back </Link>
        <h3 className="text-center">Tournament wise customer's team</h3>
        <div className="col-sm-6 offset-sm-3">
          <select
            className="form-select"
            value={tournament_id}
            name="tournament_id"
            onChange={(e) => setTournament_id(e.target.value)}
          >
            <option>Select Tournament</option>
            {tournamentList.map((item, index) => (
              <option key={item.id} value={item.id}>
                {item.name} {item.year}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* <div>customer detail view team</div> */}
      <div className="row">
        {/* <div className="col-sm-3"> */}
        {/* <ul className="list-group">
              {rankTeamList.map((rankTeam, index) => (
                <li className="list-group-item" key={rankTeam.team_id}>
                  User: {rankTeam.user.name} ---- Point: {rankTeam.total_point}
                </li>
              ))}
            </ul> */}
        {tournament_id && (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Position</th>
                <th>Name</th>
                <th>Point</th>
              </tr>
            </thead>
            <tbody>
              {rankTeamList.map((rankTeam, index) => (
                <tr key={rankTeam.team_id}>
                  {rankTeam.user_id == id && (
                    <>
                      <td>{index + 1}</td>
                      <td>{rankTeam.user?.name}</td>
                      <td>{rankTeam.total_point}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {teamDetail.length
          ? teamDetail.map((p, index) => (
              <React.Fragment key={index}>
                <div className="col-sm-2 mb-3" style={{ textAlign: "center" }}>
                  <span style={{ position: "relative" }}>
                    <img
                      src={`${API_PUBLIC_URL}${p.player?.image}`}
                      alt=""
                      width="80px"
                    />
                    <img
                      src={`${API_PUBLIC_URL}${p.player?.country?.flag}`}
                      alt=""
                      width="30px"
                      style={{
                        position: "absolute",
                        top: "36px",
                        left: "24px",
                      }}
                    />
                  </span>
                  <p style={{ marginBottom: "0px" }}>{p.player?.name}</p>
                  {p.player && (
                    <small>
                      {JSON.parse(p.player.specification)["All Rounder"] ===
                        true && (
                        <>
                          <small>All Rounder</small>
                          <br />
                        </>
                      )}
                      {JSON.parse(p.player.specification)["Batsman"] ===
                        true && (
                        <>
                          <small>Batsman</small>
                          <br />
                        </>
                      )}
                      {JSON.parse(p.player.specification)["Bowler"] ===
                        true && (
                        <>
                          <small>Bowler</small>
                          <br />
                        </>
                      )}
                      {JSON.parse(p.player.specification)["Keeper"] ===
                        true && (
                        <>
                          <small>Wicket Keeper</small>
                          <br />
                        </>
                      )}
                    </small>
                  )}
                </div>
              </React.Fragment>
            ))
          : tournament_id && (
              <p>This customer has no team for this tournament</p>
            )}
      </div>
    </>
  );
}
