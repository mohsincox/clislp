import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function TournamentTeamList() {
  const [tournamentTeamList, setTournamentTeamList] = useState([]);
  const navigate = useNavigate();
  const getLoginData = localStorage.getItem("loginData");

  const getData = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/tournament-teams`, {
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
            navigate("/admin/no-permission");
          }
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  function deleteFranchise(id) {
    const storageData = JSON.parse(getLoginData);
    const token = storageData.accessToken;
    axios
      .delete(`${API_PUBLIC_URL}api/tournament-teams/${id}`, {
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
      <div className="container">
        <div>
          <div className="float-start">
            <h3>Tournament Team List</h3>
          </div>
          <div className="float-end">
            <Link
              to={`/admin/tournament-teams/create`}
              className="btn btn-info"
            >
              + Create New
            </Link>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>T. Team Name</th>
              <th>Tournament Name</th>
              <th>Category</th>
              <th>Country</th>
              <th>Franchise</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tournamentTeamList.map((tTeam, index) => (
              <tr key={tTeam.id}>
                <td>{tTeam.id}</td>
                <td>{tTeam.name}</td>
                <td>
                  {tTeam.tournament == null ? "" : tTeam.tournament["name"]}
                </td>
                <td>{tTeam.category}</td>
                <td>{tTeam.country == null ? "" : tTeam.country["name"]}</td>
                <td>
                  {tTeam.franchise == null ? "" : tTeam.franchise["name"]}
                </td>
                <td>
                  <Link
                    to={`/admin/tournament-teams/${tTeam.id}`}
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
                        deleteFranchise(tTeam.id);
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
