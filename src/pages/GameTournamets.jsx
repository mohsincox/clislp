import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_PUBLIC_URL } from "../constants";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import WebLayout from "../layouts/WebLayout";
import BasicTemplate from "./Template/BasicTemplate";
import TwoColTemplate from "./Template/TwoColTemplate";

const GameTournaments = () => {
  const [cricketTourList, setCricketTourList] = useState([]);
  const [upcommingTourList, setUpcommingTourList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_PUBLIC_URL}api/ws-tournaments/game-tournaments-active`, {})
      .then((response) => {
        setCricketTourList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${API_PUBLIC_URL}api/ws-tournaments/game-tournaments-upcomming`, {})
      .then((response) => {
        setUpcommingTourList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <WebLayout>
      <div className="tournament-game-section ku-section section-top-required">
        <div className="container" style={{ marginBottom: "15px" }}>
          <TwoColTemplate>
            <div className="col-12 col-sm-12 col-md-9 col-lg-9 mt-3">
              <div className="game-tournament-area basic-temp-main-content-area p-1 p-sm-1 p-md-1 p-lg-4 p-xl-4">
                <div className="row">
                  <div className="col-12 col-md-12 col-lg-7">
                    <h4 className="game-tournament-heading">
                      Current Tournaments
                    </h4>
                    {cricketTourList.map((gameTours, index) => (
                      <React.Fragment key={index}>
                        <p style={{ fontSize: "13px", marginBottom: "5px" }}>
                          {gameTours.name}
                        </p>
                        {gameTours.tournaments.map((tours, index) => (
                          <Link
                            to={`/build-team/${tours.id}`}
                            style={{ textDecoration: "none" }}
                            key={tours.id}
                            className="single-tour-item"
                          >
                            <div className="tournament-item me-3">
                              <div className="tournament-logo">
                                <img
                                  src={`${API_PUBLIC_URL}${tours.logo}`}
                                  alt=""
                                />
                              </div>
                              <div className="tournament-details">
                                <p className="text-center">
                                  {tours.name} <br /> {tours.year}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="col-12 col-md-12 col-lg-5">
                    <div className="upcoming-tournaments">
                      <h4 className="game-tournament-heading inactive">
                        Upcoming Tournaments
                      </h4>
                      {upcommingTourList.map((gameTours, index) => (
                        <React.Fragment key={index}>
                          <p style={{ fontSize: "13px", marginBottom: "5px" }}>
                            {gameTours.name}
                          </p>
                          {gameTours.tournaments.map((tours, index) => (
                            <Link
                              to="#"
                              style={{ textDecoration: "none" }}
                              key={tours.id}
                              className="single-tour-item"
                            >
                              <div className="tournament-item me-3">
                                <div className="tournament-logo">
                                  <img
                                    src={`${API_PUBLIC_URL}${tours.logo}`}
                                    alt=""
                                  />
                                </div>
                                <div className="tournament-details">
                                  <p className="text-center">
                                    {tours.name} <br /> {tours.year}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TwoColTemplate>
        </div>
      </div>
    </WebLayout>
  );
};

export default GameTournaments;
