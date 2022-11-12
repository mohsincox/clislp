import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import { API_PUBLIC_URL } from "../../../constants";

export default function TournamentTeamList() {
  const [tournamentTeamList, setTournamentTeamList] = useState([]);
  const [tournamentList, setTournamentList] = useState([]);
  const [tournament_id, setTournament_id] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
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

  const getTournamentDetails = async () => {
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
    getTournamentDetails();
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

  const submitSearch = async (e) => {
    e.preventDefault();

    // if (searchQuery.trim() === "") {
    //   toast.error("Search field is required!");
    // } else {
    const storageData = JSON.parse(getLoginData);
    const token = storageData.accessToken;

    await axios
      .get(
        `${API_PUBLIC_URL}api/search/tournament-team-search?searchQuery=${searchQuery}&tournament_id=${tournament_id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        console.log("response ----", response);
        setTournamentTeamList(response.data);

        // toast.success("Successfully created!");
        // navigate("/admin/users");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          toast.error(error.response.data.msg);
        }
        if (error.response.status === 403) {
          toast.error("No Permission");
          navigate("/admin/no-permission");
        }
      });
    // }
  };

  const options = [];

  for (let i = 0; i < tournamentList.length; i++) {
    options.push({
      value: tournamentList[i].id,
      label: tournamentList[i].name,
    });
  }

  return (
    <>
      {/* <div className="container mt-2"> */}
      <div className="card">
        <div className="card-body">
          <div>
            <div className="float-start">
              <h4 className="card-title">Tournament Team List</h4>
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

          <div className="mt-5">
            <form onSubmit={submitSearch}>
              <div className="mb-3 row">
                <div className="offset-sm-2 col-sm-3">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search Group Name"
                    value={searchQuery}
                    name="searchQuery"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="col-sm-3">
                  {/* <input
                    className="form-control"
                    type="text"
                    placeholder="Search Name, "
                    value={searchQuery}
                    name="searchQuery"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  /> */}

                  <Select
                    onChange={(e) => setTournament_id(e.value)}
                    options={options}
                    placeholder={"Select Tournament"}
                  />

                  {/* <select
                    className="form-select"
                    value={country_id}
                    name="country_id"
                    onChange={(e) => setCountry_id(e.target.value)}
                  >
                    <option>Select Country</option>
                    {countryList.map((item, index) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select> */}
                </div>

                <div className="col-sm-1">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={submitSearch}
                  >
                    Search
                  </button>
                </div>
                <div className="col-sm-2">
                  <button
                    onClick={() => window.location.reload(false)}
                    className="btn btn-success pl-3"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </form>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Group Name</th>
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
                        window.confirm("Are You Delete This Item?") &&
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
      </div>
      {/* </div> */}
    </>
  );
}
