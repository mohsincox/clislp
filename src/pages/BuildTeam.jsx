import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../App";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { API_PUBLIC_URL } from "../constants";

export default function BuildTeam() {
  const { authUser, setAuthUser } = useContext(UserContext);

  const [playerList, setPlayerList] = useState([]);

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
      if (sel.length >= 2) {
        toast.error("You have already 2 players");
      } else {
        sel.push(key);
      }
    }

    setState({
      selections: sel,
    });
  }

  const getLoginData = localStorage.getItem("loginData");

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
            navigate("/admin/no-permission");
          }
        });
    }
  };

  useEffect(() => {
    getData();
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
    if (state.selections.length < 2) {
      toast.error("Please Select 2 Players");
    } else {
      await axios
        .post(`${API_PUBLIC_URL}api/ws-teams/build`, postBody, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setState({ selections: [] });
          toast.success("Successfully created!");
          navigate("/view-team");
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

  const logout = () => {
    localStorage.removeItem("loginData");
    navigate("/register");
    setAuthUser((previousState) => {
      return { ...previousState, isLoggedIn: false };
    });
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

            <form onSubmit={submitForm}>
              <div className="row mt-4">
                {playerList.map((player, index) => (
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
                      {JSON.parse(player.specification)["Batsman"] === true && (
                        <>
                          <small>Batsman</small>
                          <br />
                        </>
                      )}
                      {JSON.parse(player.specification)["Bowler"] === true && (
                        <>
                          <small>Bowler</small>
                          <br />
                        </>
                      )}
                      {JSON.parse(player.specification)["Keeper"] === true && (
                        <>
                          <small>Wicket Keeper</small>
                          <br />
                        </>
                      )}
                    </small>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ borderRadius: "0px", float: "right" }}
              >
                ({state.selections.length}/ 2) VIew Team
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
      <p>Build Team Page</p>
      <button onClick={logout}>Logout</button>
    </>
  );
}
