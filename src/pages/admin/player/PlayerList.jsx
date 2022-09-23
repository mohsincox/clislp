import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function PlayerList() {
  const [playerList, setPlayerList] = useState([]);
  const navigate = useNavigate();
  const getLoginData = localStorage.getItem("loginData");

  const getData = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/players`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setPlayerList(response.data);
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

  function deletePlayer(id) {
    const storageData = JSON.parse(getLoginData);
    const token = storageData.accessToken;
    axios
      .delete(`${API_PUBLIC_URL}api/players/${id}`, {
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
            <h3>Players List</h3>
          </div>
          <div className="float-end">
            <Link to={`/admin/players/create`} className="btn btn-info">
              + Create New
            </Link>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Player Name</th>
              <th>Specification</th>
              <th>Country</th>
              <th>Jersey No</th>
              <th>Batting Position</th>
              <th>Point</th>
              <th>Ranking</th>
              <th>Image</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {playerList.map((player, index) => (
              // (JSON.parse(player.specification))
              <tr key={player.id}>
                <td>{player.id}</td>
                <td>{player.name}</td>
                <td>
                  {JSON.parse(player.specification)["All Rounder"] === true && (
                    <span
                      className="badge bg-secondary"
                      style={{ marginRight: "3px" }}
                    >
                      All Rounder
                    </span>
                  )}
                  {JSON.parse(player.specification)["Batsman"] === true && (
                    <span
                      className="badge bg-secondary"
                      style={{ marginRight: "3px" }}
                    >
                      Batsman
                    </span>
                  )}
                  {JSON.parse(player.specification)["Bowler"] === true && (
                    <span
                      className="badge bg-secondary"
                      style={{ marginRight: "3px" }}
                    >
                      Bowler
                    </span>
                  )}
                  {JSON.parse(player.specification)["Keeper"] === true && (
                    <span
                      className="badge bg-secondary"
                      style={{ marginRight: "3px" }}
                    >
                      Wicket Keeper
                    </span>
                  )}
                </td>
                <td>{player.country["name"]}</td>
                <td>{player.jersey_no}</td>
                <td>{player.batting_position}</td>
                <td>{player.point}</td>
                <td>{player.ranking}</td>
                <td>
                  <img
                    src={`${API_PUBLIC_URL}${player.image}`}
                    alt=""
                    width="80px"
                  />
                </td>
                <td>
                  <Link
                    to={`/admin/players/${player.id}`}
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
                        deletePlayer(player.id);
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
