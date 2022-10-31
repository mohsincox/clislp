import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { API_PUBLIC_URL } from "../constants";
import WebLayout from "../layouts/WebLayout";
import BasicTemplate from "./Template/BasicTemplate";
// import {menuListCSS} from "react-select/dist/declarations/src/components/Menu";

export default function BuildTeam() {
  const [playerList, setPlayerList] = useState([]);
  const [country_id, setCountry_id] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [user_cricket_player, setUser_cricket_player] = useState("");
  const [user_football_player, setUser_football_player] = useState("");
  const [maxSelect, setMaxSelect] = useState("");

  // console.log("authUser", authUser);
  // console.log("authUser2", authUser.user.userrole);

  const [state, setState] = useState({ selections: [] });
  const { tourId } = useParams();
  let navigate = useNavigate();

  function handleCheckboxChange(key) {
    let sel = state.selections;
    let find = sel.indexOf(key);
    if (find > -1) {
      sel.splice(find, 1);
    } else {
      if (sel.length >= user_cricket_player) {
        toast.error(`You have already ${user_cricket_player} players`);
      } else {
        sel.push(key);
      }
    }

    setState({
      selections: sel,
    });
  }

  const getLoginData = localStorage.getItem("loginData");

  useEffect(() => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .get(`${API_PUBLIC_URL}api/settings/1`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            console.log(
              "response.data hhhhh",
              response.data.user_cricket_player,
              "f",
              response.data.user_football_player
            );
            setUser_cricket_player(response.data.user_cricket_player);
            setUser_football_player(response.data.user_football_player);
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 403) {
              toast.error("No Permission");
              // navigate("/");
            }
          });
      })();
    }
  }, []);

  const getData = async () => {
    if (getLoginData === null) {
      navigate("/register");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/players/active`, {
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
            // navigate("/");
          }
        });
    }
  };

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
            // navigate("/");
          }
        });
    }
  };

  useEffect(() => {
    getData();
    getCountryDetails();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();

    const storageData = JSON.parse(getLoginData);
    const token = storageData.accessToken;

    const postBody = {
      user_id: storageData.id,
      tournament_id: tourId,
      player_ids: JSON.stringify(state.selections),
    };

    console.log(postBody);
    if (state.selections.length < user_cricket_player) {
      toast.error(`Please Select ${user_cricket_player} Players`);
    } else {
      await axios
        .post(`${API_PUBLIC_URL}api/ws-teams/build`, postBody, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setState({ selections: [] });
          // toast.success("Created successfully");
          navigate(`/view-team/${tourId}`);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 403) {
            toast.error("No Permission");
            // navigate("/");
          }
          if (error.response.status === 400) {
            toast.error(error.response.data.msg);
          }
        });
    }
  };

  function playerSpecification(player) {
    let p = JSON.parse(player.specification);
    let specification = [];
    for (const key in p) {
      if (p[key] === true) specification.push(key);
    }
    return specification.length ? (
      <small>{specification.join(", ")}</small>
    ) : (
      <small>Not Specified</small>
    );
  }

  return (
    <WebLayout>
      <div className="build-team-section ku-section section-top-required">
        <div className="container-fluid" style={{ marginBottom: "15px" }}>
          <BasicTemplate>
            <div className="col-12 col-lg-8">
              <div style={{ marginTop: "15px" }} className="card-custom">
                <ul id="progressbar">
                  <li className="passed active" id="account">
                    <center>Informations</center>
                  </li>
                  <li className="active" id="personal">
                    <center>Tournaments</center>
                  </li>
                  <li id="confirm" className="">
                    <center>Build Team</center>
                  </li>
                </ul>
              </div>

              <div className="build-team-area-area basic-temp-main-content-area p-3 p-sm-3 p-md-3 p-lg-5 p-xl-5">
                <div className="mb-3 row">
                  <div className="col-sm-6 offset-sm-3">
                    <select
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
                    </select>
                  </div>
                </div>

                <form onSubmit={submitForm}>
                  <div className="build-player-list-single-item">
                    {playerList.map((player, index) => (
                      <React.Fragment key={player.id}>
                        {player.country_id == country_id && (
                          <div className="build-player-list" key={player.id}>
                            <label htmlFor={`player-${player.id}`}>
                              <input
                                id={`player-${player.id}`}
                                className="visually-hidden build-player-checkbox"
                                type="checkbox"
                                checked={state.selections.includes(player.id)}
                                onChange={() => handleCheckboxChange(player.id)}
                              />
                              <div className="player-avatar-container">
                                <div className="player-avater">
                                  <img
                                    src={`${API_PUBLIC_URL}${player.image}`}
                                    alt=""
                                  />
                                </div>
                                <div className="player-flag">
                                  <img
                                    src={`${API_PUBLIC_URL}${player.country.flag}`}
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div className="player-details">
                                <p className="m-0 player-name">{player.name}</p>
                                <p className="m-0 player-specification">
                                  {playerSpecification(player)}
                                </p>
                              </div>
                            </label>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="btn ku-c-button"
                    style={{ borderRadius: "0px", float: "right" }}
                  >
                    ({state.selections.length}/ {user_cricket_player}) View Team
                  </button>
                </form>
              </div>
            </div>
          </BasicTemplate>
        </div>
      </div>
    </WebLayout>
  );
}
