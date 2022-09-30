import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function MatchList() {
  const [matchList, setMatchList] = useState([]);
  const navigate = useNavigate();
  const getLoginData = localStorage.getItem("loginData");

  const getData = async () => {
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

  function deleteMatch(id) {
    const storageData = JSON.parse(getLoginData);
    const token = storageData.accessToken;
    axios
      .delete(`${API_PUBLIC_URL}api/matches/${id}`, {
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
        <div className="card-body">
          <div>
            <div className="float-start">
              <h4 className="card-title">Match List</h4>
            </div>
            <div className="float-end">
              <Link to={`/admin/matches/create`} className="btn btn-info">
                + Create New
              </Link>
            </div>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>SL</th>
                <th>Stage Name</th>
                <th>Tournament</th>
                <th>VS</th>
                <th>VS img</th>
                <th>VS</th>
                <th>VS img</th>
                <th>Date</th>
                <th>Time</th>
                <th>Venue</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {matchList.map((match, index) => (
                <tr key={match.id}>
                  <td>{index + 1}</td>
                  <td>{match.stage_name}</td>
                  <td>
                    {match.tournament == null ? "" : match.tournament["name"]}
                  </td>
                  <td>
                    {/* {match.country_one == null ? "" : match.country_one["name"]} */}
                    {match.tournament_team_one != null && (
                      <span>
                        {match.tournament_team_one.name == null
                          ? ""
                          : match.tournament_team_one.name}
                      </span>
                    )}
                  </td>
                  <td>
                    {/* {match.tournament_team_one.country == null
                    ? match.tournament_team_one.franchise.logo
                    : match.tournament_team_one.country.flag} */}

                    {match.tournament_team_one != null && (
                      <span>
                        {match.tournament_team_one.country == null ? (
                          <img
                            src={`${API_PUBLIC_URL}${match.tournament_team_one.franchise.logo}`}
                            alt=""
                            width="80px"
                          />
                        ) : (
                          <img
                            src={`${API_PUBLIC_URL}${match.tournament_team_one.country.flag}`}
                            alt=""
                            width="80px"
                          />
                        )}
                      </span>
                    )}
                  </td>
                  <td>
                    {match.tournament_team_two != null && (
                      <span>
                        {match.tournament_team_two.name == null
                          ? ""
                          : match.tournament_team_two.name}
                      </span>
                    )}
                    {/* {match.country_two == null ? "" : match.country_two["name"]} */}
                  </td>
                  <td>
                    {/* {match.tournament_team_two.country == null
                    ? match.tournament_team_two.franchise.logo
                    : match.tournament_team_two.country.flag} */}
                    {match.tournament_team_two != null && (
                      <span>
                        {match.tournament_team_two.country == null ? (
                          <img
                            src={`${API_PUBLIC_URL}${match.tournament_team_two.franchise.logo}`}
                            alt=""
                            width="80px"
                          />
                        ) : (
                          <img
                            src={`${API_PUBLIC_URL}${match.tournament_team_two.country.flag}`}
                            alt=""
                            width="80px"
                          />
                        )}
                      </span>
                    )}
                  </td>
                  <td>{match.start_date}</td>
                  <td>{match.start_time}</td>
                  <td>{match.venue}</td>
                  <td>
                    <Link
                      to={`/admin/matches/${match.id}`}
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
                          deleteMatch(match.id);
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
      {/* </div> */}
    </>
  );
}
