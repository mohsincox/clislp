import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { API_PUBLIC_URL } from "../constants";

export default function MyTeam() {
  const [tournament_id, setTournament_id] = useState("");
  const [tournamentList, setTournamentList] = useState([]);
  const [teamDetail, setTeamDetail] = useState([]);
  const [user_id, setUser_id] = useState("");
  const navigate = useNavigate();

  const getLoginData = localStorage.getItem("loginData");
  useEffect(() => {
    if (getLoginData === null) {
      navigate("/register");
    } else {
      const data = JSON.parse(getLoginData);
      const token = data.accessToken;
      const userId = data.id;
      setUser_id(userId);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await axios
        .get(`${API_PUBLIC_URL}api/ws-my-team/tournaments`, {})
        .then((response) => {
          setTournamentList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await axios
        .get(
          `${API_PUBLIC_URL}api/ws-my-team/${user_id}/test/${tournament_id}`,
          {}
        )
        .then((response) => {
          setTeamDetail(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 403) {
          }
        });
    })();
  }, [tournament_id]);

  return (
    <>
      <Header />
      <hr />
      <div className="container-fluid" style={{ marginBottom: "15px" }}>
        <div className="row">
          <div className="col-sm-3">
            <p>Tournament</p>
            <ul className="list-group">
              {tournamentList.map((tournament, index) => (
                <li
                  className="list-group-item"
                  key={tournament.id}
                  onClick={(event) => {
                    setTournament_id(tournament.id);
                  }}
                >
                  {tournament.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="offset-sm-0 col-sm-7">
            <div className="row mt-4">
              <p className="text-center">
                {teamDetail[0]?.tournament.name} Selected Team
              </p>
              {/* <div className="col-sm-2 mb-3" style={{ textAlign: "center" }}>
                  <img src={require("../images/player.png")} alt="" />
                  <p style={{ marginBottom: "0px" }}>{teamDetail[0].id}</p>
                  <small>{teamDetail[0].id}</small>
                </div> */}

              {teamDetail.map((p, index) => (
                <React.Fragment key={index}>
                  <div
                    className="col-sm-2 mb-3"
                    style={{ textAlign: "center" }}
                  >
                    <span style={{ position: "relative" }}>
                      <img
                        src={`${API_PUBLIC_URL}${p.player?.image}`}
                        alt=""
                        width="80px"
                      />
                      <img
                        src={`${API_PUBLIC_URL}${p.player?.country?.flag}`}
                        alt=""
                        width="30px"
                        style={{
                          position: "absolute",
                          top: "36px",
                          left: "24px",
                        }}
                      />
                    </span>
                    <p style={{ marginBottom: "0px" }}>{p.player?.name}</p>
                    {p.player && (
                      <small>
                        {JSON.parse(p.player.specification)["All Rounder"] ===
                          true && (
                          <>
                            <small>All Rounder</small>
                            <br />
                          </>
                        )}
                        {JSON.parse(p.player.specification)["Batsman"] ===
                          true && (
                          <>
                            <small>Batsman</small>
                            <br />
                          </>
                        )}
                        {JSON.parse(p.player.specification)["Bowler"] ===
                          true && (
                          <>
                            <small>Bowler</small>
                            <br />
                          </>
                        )}
                        {JSON.parse(p.player.specification)["Keeper"] ===
                          true && (
                          <>
                            <small>Wicket Keeper</small>
                            <br />
                          </>
                        )}
                      </small>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="col-sm-2 d-none d-sm-block">
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
