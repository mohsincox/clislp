import React, { Component } from "react";
import { API_PUBLIC_URL } from "../constants";
import moment from "moment";

function FixtureCard({ match }) {
  return (
    <div className="card fixture-single-slide">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div className="l-group tgroup">
            {match.tournament_team_one.country == null ? (
              <img
                src={`${API_PUBLIC_URL}${match.tournament_team_one?.franchise?.logo}`}
                alt=""
                width="78px"
                height="59px"
              />
            ) : (
              <img
                src={`${API_PUBLIC_URL}${match.tournament_team_one?.country?.flag}`}
                alt=""
                width="78px"
                height="59px"
              />
            )}
            {/*{match.tournament_team_one.name}*/}
            {match.tournament_team_one?.country?.name}
            {match.tournament_team_one?.franchise?.name}
          </div>
          <div className="m-group tgroup">VS</div>
          <div className="R-group tgroup">
            {match.tournament_team_two.country == null ? (
              <img
                src={`${API_PUBLIC_URL}${match.tournament_team_two?.franchise?.logo}`}
                alt=""
                width="78px"
                height="59px"
              />
            ) : (
              <img
                src={`${API_PUBLIC_URL}${match.tournament_team_two?.country?.flag}`}
                alt=""
                width="78px"
                height="59px"
              />
            )}
            {/*{match.tournament_team_two.name}*/}
            {match.tournament_team_two?.country?.name}
            {match.tournament_team_two?.franchise?.name}
          </div>
        </div>
      </div>
      <div
        className="card-footer d-flex justify-content-between"
        style={{ background: "#EAE1FF" }}
      >
        <p className="p-0 m-0">
          {moment(match.start_date).format("ddd, MMM D")}
        </p>
        <p className="p-0 m-0"> Starts at {match.start_time}</p>
      </div>
    </div>
  );
}

export default FixtureCard;
