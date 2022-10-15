import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function TournamentTeamPlayerView() {
  const [teamDetail, setTeamDetail] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const getLoginData = localStorage.getItem("loginData");
  useEffect(() => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const data = JSON.parse(getLoginData);
      const token = data.accessToken;

      axios
        .get(`${API_PUBLIC_URL}api/tournament-team-players/${id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setTeamDetail(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 403) {
            toast.error("No Permission");
            navigate("/admin/no-permission");
          }
        });
    }
  }, []);

  return (
    <>
      <div className="row mt-4">
        <Link to={`/admin/tournament-team-players`}> Back </Link>
        {teamDetail.tournament_team?.country != null && (
          <h5 className="text-center mb-3">
            Team Name: {teamDetail.tournament_team?.country.name}
          </h5>
        )}

        {teamDetail.tournament_team?.franchise != null && (
          <h5 className="text-center mb-3">
            Team Name: {teamDetail.tournament_team?.franchise.name}
          </h5>
        )}

        {/* {teamDetail.tournament_team_player_details?.map((p, index) => (
          <p key={index}>{p.player_id}</p>
        ))} */}

        {teamDetail.tournament_team_player_details?.map((p, index) => (
          <React.Fragment key={index}>
            {p.player != null && (
              <div className="col-sm-2 mb-3" style={{ textAlign: "center" }}>
                <span style={{ position: "relative" }}>
                  <img
                    src={`${API_PUBLIC_URL}${p.player.image}`}
                    alt=""
                    width="80px"
                  />
                  {p.player.country != null && (
                    <img
                      src={`${API_PUBLIC_URL}${p.player.country.flag}`}
                      alt=""
                      width="30px"
                      style={{
                        position: "absolute",
                        top: "36px",
                        left: "24px",
                      }}
                    />
                  )}
                </span>
                <p style={{ marginBottom: "0px" }}>{p.player["name"]}</p>
                <small>
                  {JSON.parse(p.player.specification)["All Rounder"] ===
                    true && (
                    <>
                      <small>All Rounder</small>
                      <br />
                    </>
                  )}
                  {JSON.parse(p.player.specification)["Batsman"] === true && (
                    <>
                      <small>Batsman</small>
                      <br />
                    </>
                  )}
                  {JSON.parse(p.player.specification)["Bowler"] === true && (
                    <>
                      <small>Bowler</small>
                      <br />
                    </>
                  )}
                  {JSON.parse(p.player.specification)["Keeper"] === true && (
                    <>
                      <small>Wicket Keeper</small>
                      <br />
                    </>
                  )}
                  {JSON.parse(p.player.specification)["Goalkeeper"] ===
                    true && (
                    <>
                      <small>Goalkeeper</small>
                      <br />
                    </>
                  )}
                  {JSON.parse(p.player.specification)["Defender"] === true && (
                    <>
                      <small>Defender</small>
                      <br />
                    </>
                  )}
                  {JSON.parse(p.player.specification)["Midfielder"] ===
                    true && (
                    <>
                      <small>Midfielder</small>
                      <br />
                    </>
                  )}
                  {JSON.parse(p.player.specification)["Forward"] === true && (
                    <>
                      <small>Forward</small>
                      <br />
                    </>
                  )}
                </small>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
