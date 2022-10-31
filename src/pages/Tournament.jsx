import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_PUBLIC_URL } from "../constants";
import Header from "../components/Header";
import "./regStepOne.css";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import WebLayout from "../layouts/WebLayout";
import BasicTemplate from "./Template/BasicTemplate";

const Tournament = () => {
  const [activeTourList, setActiveTourList] = useState([]);
  //   const [cricketTourList, setCricketTourList] = useState([]);
  //   const [footballTourList, setFootballTourList] = useState([]);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     const getLoginData = localStorage.getItem("loginData");
  //     if (getLoginData === null) {
  //       navigate("/register");
  //     } else {
  //       const data = JSON.parse(getLoginData);
  //       const token = data.accessToken;

  //       axios
  //         .get(`${API_PUBLIC_URL}api/ws-tournaments/cricket`, {
  //           headers: {
  //             Authorization: token,
  //           },
  //         })
  //         .then((response) => {
  //           setCricketTourList(response.data);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           if (error.response.status === 403) {
  //             toast.error("No Permission");
  //             // navigate("/");
  //           }
  //         });
  //     }
  //   }, []);

  //   useEffect(() => {
  //     const getLoginData = localStorage.getItem("loginData");
  //     if (getLoginData === null) {
  //       navigate("/register");
  //     } else {
  //       const data = JSON.parse(getLoginData);
  //       const token = data.accessToken;

  //       axios
  //         .get(`${API_PUBLIC_URL}api/ws-tournaments/football`, {
  //           headers: {
  //             Authorization: token,
  //           },
  //         })
  //         .then((response) => {
  //           setFootballTourList(response.data);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           if (error.response.status === 403) {
  //             toast.error("No Permission");
  //             // navigate("/");
  //           }
  //         });
  //     }
  //   }, []);

  useEffect(() => {
    const getLoginData = localStorage.getItem("loginData");
    if (getLoginData === null) {
      navigate("/register");
    } else {
      const data = JSON.parse(getLoginData);
      const token = data.accessToken;

      axios
        .get(`${API_PUBLIC_URL}api/ws-tournaments/game-tournaments-active`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setActiveTourList(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 403) {
            toast.error("No Permission");
            // navigate("/");
          }
        });
    }
  }, []);

  return (
    <WebLayout>
      <div className="tournament-section ku-section section-top-required">
        <div className="container-fluid" style={{ marginBottom: "15px" }}>
          <BasicTemplate>
            <div className="col-12 col-lg-8">
              <div style={{ marginTop: "15px" }} className="card-custom">
                <ul id="progressbar">
                  <li className="passed active" id="account">
                    <center>Information</center>
                  </li>
                  <li className="active" id="personal">
                    <center>Tournaments</center>
                  </li>
                  <li id="confirm">
                    <center>Build Team</center>
                  </li>
                </ul>
              </div>
              <div className="tournament-area basic-temp-main-content-area p-3 p-sm-3 p-md-3 p-lg-5 p-xl-5">
                {activeTourList.map((gameTours, index) => (
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

                {/* <div>
                                    <p>Cricket</p>
                                    {
                                        cricketTourList.map((cricketTour, index) => (
                                            <Link
                                                to={`/build-team/${cricketTour.id}`}
                                                style={{textDecoration: "none"}}
                                                key={cricketTour.id}
                                                className="single-tour-item"
                                            >
                                                <div className="tournament-item me-3">
                                                    <div className="tournament-logo">
                                                        <img
                                                            src={`${API_PUBLIC_URL}${cricketTour.logo}`}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="tournament-details">
                                                        <p className="text-center">
                                                            {cricketTour.name} <br/> {cricketTour.year}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div> */}

                {/* <div className="row">
                                    <p>Football</p>



                                    {
                                        footballTourList.length ? (
                                            footballTourList.map((footballTour, index) => (
                                                <Link
                                                    to={`/build-team/${footballTour.id}`}
                                                    style={{textDecoration: "none"}}
                                                    key={footballTour.id}
                                                    className="single-tour-item"
                                                >
                                                    <div className="tournament-item me-3">
                                                        <div className="tournament-logo">
                                                            <img
                                                                src={`${API_PUBLIC_URL}${footballTour.logo}`}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="tournament-details">
                                                            <p className="text-center">
                                                                {footballTour.name} <br/> {footballTour.year}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))
                                        ) :
                                            <Link to="/">
                                                <div className="tournament-item me-3">
                                                    <div className="tournament-logo" style={{fontSize: "10px"}}>
                                                        Sorry! Event Not Found
                                                    </div>
                                                    <div className="tournament-details">
                                                        <p className="text-center">
                                                            Tournament no found
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>



                                    }
                                </div> */}
              </div>
            </div>
          </BasicTemplate>
        </div>
      </div>
    </WebLayout>
  );
};

export default Tournament;
