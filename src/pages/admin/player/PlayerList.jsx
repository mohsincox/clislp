import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function PlayerList() {
  const [playerList, setPlayerList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(30);
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = playerList.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(playerList.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {/* <div className="container mt-2"> */}
      <div className="card">
        <div className="card-body">
          <div>
            <div className="float-start">
              <h4 className="card-title">Players List</h4>
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
                <th>SL</th>
                <th>Player Name</th>
                <th>Game</th>
                <th>Specification</th>
                <th>Country</th>
                <th>Franchise</th>
                <th>Point</th>
                <th>Ranking</th>
                <th>Status</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((player, index) => (
                // (JSON.parse(player.specification))
                <tr key={player.id}>
                  <td>{index + indexOfFirstItem + 1}</td>
                  <td>{player.name}</td>
                  <td>{player.game == null ? "" : player.game["name"]}</td>
                  <td>
                    {JSON.parse(player.specification)["All Rounder"] ===
                      true && (
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
                    {JSON.parse(player.specification)["Goalkeeper"] ===
                      true && (
                      <span
                        className="badge bg-secondary"
                        style={{ marginRight: "3px" }}
                      >
                        Goalkeeper
                      </span>
                    )}
                    {JSON.parse(player.specification)["Defender"] === true && (
                      <span
                        className="badge bg-secondary"
                        style={{ marginRight: "3px" }}
                      >
                        Defender
                      </span>
                    )}
                    {JSON.parse(player.specification)["Midfielder"] ===
                      true && (
                      <span
                        className="badge bg-secondary"
                        style={{ marginRight: "3px" }}
                      >
                        Midfielder
                      </span>
                    )}
                    {JSON.parse(player.specification)["Forward"] === true && (
                      <span
                        className="badge bg-secondary"
                        style={{ marginRight: "3px" }}
                      >
                        Forward
                      </span>
                    )}
                  </td>
                  <td>
                    {player.country == null ? "" : player.country["name"]}
                  </td>
                  <td>
                    {player.franchise == null ? "" : player.franchise["name"]}
                  </td>
                  <td>{player.point}</td>
                  <td>{player.ranking}</td>
                  <td>{player.status}</td>
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
                        window.confirm("Are You Delete This Item?") &&
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

          <center>
            <nav className="mt-3">
              <ul className="pagination">
                {pageNumbers.map((number) => (
                  <li key={number} className="page-item">
                    <Link
                      to={"/admin/players"}
                      onClick={() => paginate(number)}
                      className="page-link"
                    >
                      {number}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </center>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
