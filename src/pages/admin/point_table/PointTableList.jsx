import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";
import Select from "react-select";
import "../adminResponsive.css";

export default function PointTableList() {
  const [pointTableList, setPointTableList] = useState([]);
  const [match_id, setMatch_id] = useState("");
  const [matchList, setMatchList] = useState([]);
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
        .get(`${API_PUBLIC_URL}api/point-tables`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setPointTableList(response.data);
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

  function deletePointTable(id) {
    const storageData = JSON.parse(getLoginData);
    const token = storageData.accessToken;
    axios
      .delete(`${API_PUBLIC_URL}api/point-tables/${id}`, {
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
  const currentItems = pointTableList.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(pointTableList.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    getMatchDetails();
  }, []);

  const getMatchDetails = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/matches/active`, {
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

  const submitSearch = async (e) => {
    e.preventDefault();

    // if (searchQuery.trim() === "") {
    //   toast.error("Search field is required!");
    // } else {
    const storageData = JSON.parse(getLoginData);
    const token = storageData.accessToken;

    await axios
      .get(
        `${API_PUBLIC_URL}api/search/point-table-search?match_id=${match_id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        console.log("response ----", response);
        setPointTableList(response.data);
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

  for (let i = 0; i < matchList.length; i++) {
    let countryTeamOne = "";
    let countryTeamTwo = "";
    let franchiseTeamOne = "";
    let franchiseTeamTwo = "";
    if (matchList[i].tournament_team_one.country != null) {
      countryTeamOne = matchList[i].tournament_team_one.country.name;
    }
    if (matchList[i].tournament_team_two.country != null) {
      countryTeamTwo = matchList[i].tournament_team_two.country.name;
    }
    if (matchList[i].tournament_team_one.franchise != null) {
      franchiseTeamOne = matchList[i].tournament_team_one.franchise.name;
    }
    if (matchList[i].tournament_team_two.franchise != null) {
      franchiseTeamTwo = matchList[i].tournament_team_two.franchise.name;
    }
    options.push({
      value: matchList[i].id,
      label:
        matchList[i].tournament.name +
        " -- " +
        countryTeamOne +
        franchiseTeamOne +
        " VS " +
        countryTeamTwo +
        franchiseTeamTwo +
        " " +
        matchList[i].start_date,
    });
  }

  return (
    <>
      {/* <div className="container mt-2"> */}
      <div className="card">
        <div className="card-body card-body d-md-flex flex-md-column">
          <div className="row">

            <div  className="mb-5 main-title">
              <div className="float-start">
                <h4 className="card-title">Point Table List</h4>
              </div>
              <div className="float-end create-button">
                <Link
                  to={`/admin/point-tables/create`}
                  className="btn btn-info"
                >
                  + Create New
                </Link>
              </div>
            </div>

            <div className="">
              <form onSubmit={submitSearch}>
                <div className="mb-3 row from-action">
                  <div className="offset-sm-1 col-sm-7">
                    {/* <input
                      className="form-control"
                      type="text"
                      placeholder="Search Name, Phone Number or Email"
                      value={searchQuery}
                      name="searchQuery"
                      onChange={(e) => setSearchQuery(e.target.value)}
                    /> */}

                    <Select
                      onChange={(e) => setMatch_id(e.value)}
                      options={options}
                      placeholder={"Select..."}
                    />
                  </div>
                  <div className="col-sm-1 from-action-btn">
                    <button
                      type="button"
                      className="btn btn-primary from-action-btn-btn"
                      onClick={submitSearch}
                    >
                      Search
                    </button>
                  </div>
                  <div className="col-sm-2 from-action-btn">
                    <button
                      onClick={() => window.location.reload(false)}
                      className="btn btn-success pl-3 from-action-btn-btn"
                    >
                      Refresh
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Tournament</th>
                    <th>Team One</th>
                    <th>Team Two</th>
                    <th>Player</th>
                    <th>Team</th>
                    <th>Run</th>
                    <th>Wicket</th>
                    <th>Man of the match</th>
                    <th>Fifty</th>
                    <th>Hundred</th>
                    <th>Five Wickets</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((pointTable, index) => (
                    <tr key={pointTable.id}>
                      <td>{index + indexOfFirstItem + 1}</td>
                      {/* <td>{pointTable.id}</td> */}
                      <td>
                        {pointTable.match.tournament == null
                          ? ""
                          : pointTable.match.tournament["name"]}
                      </td>
                      <td>
                        {pointTable.match.tournament_team_one != null && (
                          <span>
                            {pointTable.match.tournament_team_one.country !=
                              null && (
                              <img
                                src={`${API_PUBLIC_URL}${pointTable.match.tournament_team_one.country.flag}`}
                                alt=""
                                width="80px"
                              />
                            )}

                            {pointTable.match.tournament_team_one.franchise !=
                              null && (
                              <img
                                src={`${API_PUBLIC_URL}${pointTable.match.tournament_team_one.franchise.logo}`}
                                alt=""
                                width="80px"
                              />
                            )}
                          </span>
                        )}
                      </td>
                      <td>
                        {pointTable.match.tournament_team_two != null && (
                          <span>
                            {pointTable.match.tournament_team_two.country !=
                              null && (
                              <img
                                src={`${API_PUBLIC_URL}${pointTable.match.tournament_team_two.country.flag}`}
                                alt=""
                                width="80px"
                              />
                            )}

                            {pointTable.match.tournament_team_two.franchise !=
                              null && (
                              <img
                                src={`${API_PUBLIC_URL}${pointTable.match.tournament_team_two.franchise.logo}`}
                                alt=""
                                width="80px"
                              />
                            )}
                          </span>
                        )}
                      </td>

                      <td>{pointTable.player.name}</td>
                      <td>
                        {pointTable.tournament_team?.country?.name}{" "}
                        {pointTable.tournament_team?.franchise?.name}
                      </td>
                      <td>{pointTable.run}</td>
                      <td>{pointTable.wicket}</td>
                      <td>
                        {pointTable.man_of_the_match === false
                          ? "False"
                          : pointTable.man_of_the_match === true
                          ? "True"
                          : pointTable.man_of_the_match}
                      </td>
                      {/* <td>{pointTable.man_of_the_match}</td> */}
                      <td>
                        {pointTable.fifty === false
                          ? "False"
                          : pointTable.fifty === true
                          ? "True"
                          : pointTable.fifty}
                      </td>
                      <td>
                        {pointTable.hundred === false
                          ? "False"
                          : pointTable.hundred === true
                          ? "True"
                          : pointTable.hundred}
                      </td>
                      <td>
                        {pointTable.five_wickets === false
                          ? "False"
                          : pointTable.five_wickets === true
                          ? "True"
                          : pointTable.five_wickets}
                      </td>
                      <td>
                        <Link
                          to={`/admin/point-tables/${pointTable.id}`}
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
                              deletePointTable(pointTable.id);
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

            <center          style={{
              display: "flex",
              justifyConten: "center",
              overflow: "scroll",
            }}>
              <nav className="mt-3">
                <ul className="pagination">
                  {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                      <Link
                        to={"/admin/point-tables"}
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
      </div>
      {/* </div> */}
    </>
  );
}
