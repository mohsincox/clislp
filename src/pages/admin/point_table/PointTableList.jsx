import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";
import Select from "react-select";
import ReactPaginate from "react-paginate";
import "../style.css";

export default function PointTableList() {
  const [pointTableList, setPointTableList] = useState([]);
  const [match_id, setMatch_id] = useState("");
  const [matchList, setMatchList] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 30;
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

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(pointTableList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(pointTableList.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, pointTableList]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % pointTableList.length;
    setItemOffset(newOffset);
  };

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

    if (match_id === "") {
      toast.error("Search field is required!");
    } else {
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
    }
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
        <div className="card-body d-md-flex flex-md-column">
          <div className="row">
            <div className="mb-5 main-title">
              <div className="float-start">
                <h4 className="card-title">Point Table List</h4>
              </div>
              <div className="float-end">
                <Link
                  to={`/admin/point-tables/create`}
                  className="btn btn-info"
                >
                  + Create New
                </Link>
              </div>
            </div>

            <div className="mt-5">
              <form onSubmit={submitSearch}>
                <div className="mb-3 row from-action">
                  <div
                    className="offset-sm-2 col-sm-3"
                    style={{ width: "400px" }}
                  >
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
                  <div className="col-sm-1 from-action-btn">
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

            <div className="table-responsive" style={{ marginBottom: "20px" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Tournament</th>
                    <th>Team One</th>
                    <th>Team Two</th>
                    <th>Player</th>
                    <th>Team</th>
                    <th>Goal</th>
                    <th>Assist</th>
                    <th>Goal Save</th>
                    <th>Penalty Save</th>
                    <th>Clean Sheet</th>
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
                      <td>{itemOffset + index + 1}</td>
                      <td>
                        {pointTable.match.tournament == null
                          ? ""
                          : pointTable.match.tournament["name"]}
                      </td>
                      <td>
                        {pointTable.match.tournament_team_one != null && (
                          <span>
                            {/* {pointTable.match.tournament_team_one.country !=
                              null && (
                              <img
                                src={`${API_PUBLIC_URL}${pointTable.match.tournament_team_one.country.flag}`}
                                alt=""
                                width="80px"
                              />
                            )} */}
                            {pointTable.match.tournament_team_one.country !=
                              null && (
                              <span>
                                {
                                  pointTable?.match?.tournament_team_one
                                    ?.country?.name
                                }
                              </span>
                            )}

                            {pointTable.match.tournament_team_one.franchise !=
                              null && (
                              <span>
                                {
                                  pointTable?.match?.tournament_team_one
                                    ?.franchise?.name
                                }
                              </span>
                            )}

                            {/* {pointTable.match.tournament_team_one.franchise !=
                              null && (
                              <img
                                src={`${API_PUBLIC_URL}${pointTable.match.tournament_team_one.franchise.logo}`}
                                alt=""
                                width="80px"
                              />
                            )} */}
                          </span>
                        )}
                      </td>
                      <td>
                        {pointTable.match.tournament_team_two != null && (
                          <span>
                            {/* {pointTable.match.tournament_team_two.country !=
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
                            )} */}

                            {pointTable.match.tournament_team_two.country !=
                              null && (
                              <span>
                                {
                                  pointTable?.match?.tournament_team_two
                                    ?.country?.name
                                }
                              </span>
                            )}

                            {pointTable.match.tournament_team_two.franchise !=
                              null && (
                              <span>
                                {
                                  pointTable?.match?.tournament_team_two
                                    ?.franchise?.name
                                }
                              </span>
                            )}
                          </span>
                        )}
                      </td>

                      <td>{pointTable.player.name}</td>
                      <td>
                        {pointTable.tournament_team?.country?.name}{" "}
                        {pointTable.tournament_team?.franchise?.name}
                      </td>
                      <td>{pointTable.Goal}</td>
                      <td>{pointTable.Assist}</td>
                      <td>{pointTable.Goal_Save}</td>
                      <td>{pointTable.Penalty_Save}</td>
                      <td>{pointTable.Clean_Sheet}</td>
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

            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageLinkClassName="page-num"
              previousLinkClassName="page-num"
              nextLinkClassName="page-num"
              activeLinkClassName="active"
              disabledLinkClassName="disabled"
            />
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
