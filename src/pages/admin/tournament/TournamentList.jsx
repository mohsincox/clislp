import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function TournamentList() {
  const [tournamentList, setTournamentList] = useState([]);
  const navigate = useNavigate();
  const getLoginData = localStorage.getItem("loginData");

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
            setTournamentList(response.data);
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 403) {
              toast.error("No Permission");
            }
            navigate("/admin/no-permission");
          });
      })();
    }
  }, []);

  function deleteTournament(id) {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .delete(`${API_PUBLIC_URL}api/countries/${id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then(() => {
            toast.error("Deleted successfully");
            //   getData();
            const storageData = JSON.parse(getLoginData);
            const token = storageData.accessToken;
            (async () => {
              await axios
                .get(`${API_PUBLIC_URL}api/countries`, {
                  headers: {
                    Authorization: token,
                  },
                })
                .then((response) => {
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
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 403) {
              toast.error("No Permission");
            }
            navigate("/admin/no-permission");
          });
      })();
    }
  }

  return (
    <>
      <div className="container">
        <div>
          <div className="float-start">
            <h3>Tournament List</h3>
          </div>
          <div className="float-end">
            <Link to={`/admin/tournaments/create`} className="btn btn-info">
              + Create New
            </Link>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Tournament</th>
              <th>Game</th>
              <th>Month</th>
              <th>Year</th>
              <th>Logo</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tournamentList.map((tournament, index) => (
              <tr key={tournament.id}>
                <td>{tournament.id}</td>
                <td>{tournament.name}</td>
                <td>
                  {tournament.game == null ? "" : tournament.game["name"]}
                </td>
                <td>{tournament.month}</td>
                <td>{tournament.year}</td>
                <td>
                  <img
                    src={`${API_PUBLIC_URL}${tournament.logo}`}
                    alt=""
                    width="80px"
                  />
                </td>
                <td>
                  <Link
                    to={`/admin/tournaments/${tournament.id}`}
                    className="btn btn-success btn-sm"
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      window.confirm("Want to delete?") &&
                        deleteTournament(tournament.id);
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
    </>
  );
}
