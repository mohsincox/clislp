import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { API_PUBLIC_URL } from "../constants";

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
  const { id } = useParams();
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
      tournament_id: id,
      player_ids: JSON.stringify(state.selections),
    };

    console.log(postBody);
    if (state.selections.length < 1) {
      toast.error("Please Select Players");
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
          navigate("/view-team");
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

  return (
    <>
      <Header />

      <div className="container-fluid" style={{ marginBottom: "15px" }}>
        <div className="row">
          <div className="col-sm-2 d-none d-sm-block mt-3">
            <img
              src={require("../images/add_spon_dr_side.png")}
              alt=""
              width={"200px"}
            />
          </div>
          <div className="col-sm-8">
            <div style={{ marginTop: "15px" }} className="card-custom">
              <ul id="progressbar">
                <li className="passed" id="account">
                  <center>Informations</center>
                </li>
                <li id="personal">
                  <center>Tournaments</center>
                </li>
                <li className="active" id="confirm">
                  <center>Build Team</center>
                </li>
              </ul>
            </div>
            <hr />

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
              <div className="row mt-4">
                {playerList.map((player, index) => (
                  <React.Fragment key={player.id}>
                    {player.country_id == country_id && (
                      <div
                        className="col-sm-2 mb-3"
                        style={{ textAlign: "center" }}
                        key={player.id}
                      >
                        <input
                          style={{ width: "20px", height: "20px" }}
                          type="checkbox"
                          checked={state.selections.includes(player.id)}
                          onChange={() => handleCheckboxChange(player.id)}
                        />
                        <span style={{ position: "relative" }}>
                          <img
                            src={`${API_PUBLIC_URL}${player.image}`}
                            alt=""
                            width="80px"
                          />
                          <img
                            src={`${API_PUBLIC_URL}${player.country.flag}`}
                            alt=""
                            width="30px"
                            style={{
                              position: "absolute",
                              top: "36px",
                              left: "24px",
                            }}
                          />
                        </span>
                        <p style={{ marginBottom: "0px" }}>{player.name}</p>
                        <small>
                          {JSON.parse(player.specification)["All Rounder"] ===
                            true && (
                            <>
                              <small>All Rounder</small>
                              <br />
                            </>
                          )}
                          {JSON.parse(player.specification)["Batsman"] ===
                            true && (
                            <>
                              <small>Batsman</small>
                              <br />
                            </>
                          )}
                          {JSON.parse(player.specification)["Bowler"] ===
                            true && (
                            <>
                              <small>Bowler</small>
                              <br />
                            </>
                          )}
                          {JSON.parse(player.specification)["Keeper"] ===
                            true && (
                            <>
                              <small>Wicket Keeper</small>
                              <br />
                            </>
                          )}
                        </small>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ borderRadius: "0px", float: "right" }}
              >
                ({state.selections.length}/ {user_cricket_player}) VIew Team
              </button>
            </form>
          </div>
          <div className="col-sm-2 d-none d-sm-block mt-3">
            <img
              src={require("../images/add_spon_dr_side.png")}
              alt=""
              width={"200px"}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
