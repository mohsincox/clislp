import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function PlayerList() {
  const [playerList, setPlayerList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [country_id, setCountry_id] = useState("");
  const [countryList, setCountryList] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage] = useState(30);
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
    getCountryDetails();
  }, []);

  const getCountryDetails = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/countries`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setCountryList(response.data);
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

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(playerList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(playerList.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, playerList]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % playerList.length;
    setItemOffset(newOffset);
  };

  const submitSearch = async (e) => {
    e.preventDefault();

    if (searchQuery.trim() === "" && country_id === "") {
      toast.error("At least one search field is required!");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .get(
          `${API_PUBLIC_URL}api/search/player-search?searchQuery=${searchQuery}&country_id=${country_id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          console.log("response ----", response);
          setPlayerList(response.data);
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

  for (let i = 0; i < countryList.length; i++) {
    options.push({
      value: countryList[i].id,
      label: countryList[i].name,
    });
  }

  return (
    <>
      {/* <div className="container mt-2"> */}
      <div className="card">
        <div className="card-body d-md-flex flex-md-column">
          <div className="mb-5 main-title">
            <div className="float-start">
              <h4 className="card-title">Players List</h4>
            </div>
            <div className="float-end">
              <Link to={`/admin/players/create`} className="btn btn-info">
                + Create New
              </Link>
            </div>
          </div>

          <div className="mt-5">
            <form onSubmit={submitSearch}>
              <div className="mb-3 row from-action">
                <div className="offset-sm-2 col-sm-3">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search Player Name"
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
                    onChange={(e) => setCountry_id(e.value)}
                    options={options}
                    placeholder={"Select Country"}
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

          <div className="table-responsive" style={{ marginBottom: "10px" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Player Name</th>
                  <th>Game</th>
                  <th>Specification</th>
                  <th>Country</th>
                  {/* <th>Franchise</th>
                <th>Point</th>
                <th>Ranking</th> */}
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
                    <td>{itemOffset + index + 1}</td>
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
                      {JSON.parse(player.specification)["Defender"] ===
                        true && (
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
                      {JSON.parse(player.specification)["Striker"] === true && (
                        <span
                          className="badge bg-secondary"
                          style={{ marginRight: "3px" }}
                        >
                          Striker
                        </span>
                      )}
                    </td>
                    <td>
                      {player.country == null ? "" : player.country["name"]}
                    </td>
                    {/* <td>
                    {player.franchise == null ? "" : player.franchise["name"]}
                  </td>
                  <td>{player.point}</td>
                  <td>{player.ranking}</td> */}
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
      {/* </div> */}
    </>
  );
}
