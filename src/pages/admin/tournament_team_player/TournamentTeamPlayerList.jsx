import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";
import "../adminResponsive.css";

export default function TournamentTeamPlayerList() {
  const [tournamentTeamPlayerList, setTournamentTeamPlayerList] = useState([]);
  const navigate = useNavigate();
  const getLoginData = localStorage.getItem("loginData");

  const getData = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/tournament-team-players`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setTournamentTeamPlayerList(response.data);
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
    getData();
  }, []);

  function deleteTourTeamPlayer(id) {
    const storageData = JSON.parse(getLoginData);
    const token = storageData.accessToken;
    axios
      .delete(`${API_PUBLIC_URL}api/tournament-team-players/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        toast.error("Deleted successfully");
        getData();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 403) {
          toast.error("No Permission");
          navigate("/admin/no-permission");
        }
      });
  }

  return (
    <>
      {/* <div className="container mt-2"> */}
      <div className="card">
        <div className="card-body d-md-flex flex-md-column">
          <div className="mb-5 main-title">
            <div className="float-start" style={{ textAlign: "center" }}>
              <h4 className="card-title">Tournament Team Player List</h4>
            </div>
            <div className="float-end">
              <Link
                to={`/admin/tournament-team-players/create`}
                className="btn btn-info"
              >
                Create or Update
              </Link>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Tournament Name</th>
                  <th>Category</th>
                  <th>Team Name</th>
                  {/* <th>Franchise</th> */}
                  <th>View Team</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {tournamentTeamPlayerList.map((tTeamPlayer, index) => (
                  <tr key={tTeamPlayer.id}>
                    <td>{index + 1}</td>
                    <td>
                      {tTeamPlayer.tournament == null
                        ? ""
                        : tTeamPlayer.tournament["name"]}
                    </td>
                    <td>{tTeamPlayer.tournament_team.category}</td>
                    <td>
                      {tTeamPlayer.tournament_team.country != null &&
                        tTeamPlayer.tournament_team.country["name"]}

                      {tTeamPlayer.tournament_team.franchise != null &&
                        tTeamPlayer.tournament_team.franchise["name"]}
                    </td>
                    {/* <td>
                    {tTeamPlayer.tournament_team.franchise == null
                      ? ""
                      : tTeamPlayer.tournament_team.franchise["name"]}
                  </td> */}
                    <td>
                      <Link
                        to={`/admin/tournament-team-players/view/${tTeamPlayer.id}`}
                        className="btn btn-success btn-sm"
                      >
                        View Team
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          window.confirm("Are You Delete This Item?") &&
                            deleteTourTeamPlayer(tTeamPlayer.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
