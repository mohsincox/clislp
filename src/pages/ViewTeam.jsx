import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { API_PUBLIC_URL } from "../constants";
import Header from "../components/Header";
import "./regStepOne.css";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

const ViewTeam = () => {
  const [teamDetail, setTeamDetail] = useState([]);
  const navigate = useNavigate();

  const getLoginData = localStorage.getItem("loginData");
  useEffect(() => {
    if (getLoginData === null) {
      navigate("/register");
    } else {
      const data = JSON.parse(getLoginData);
      const token = data.accessToken;
      const userId = data.id;

      axios
        .get(`${API_PUBLIC_URL}api/ws-teams/view-detail/${userId}`, {
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
            // navigate("/");
          }
        });
    }
  }, []);

  const { authUser, setAuthUser } = useContext(UserContext);
  // console.log("authUser", authUser);
  // console.log("authUser2", authUser.user.userrole);
  const logout = () => {
    localStorage.removeItem("loginData");
    navigate("/register");
    setAuthUser((previousState) => {
      return { ...previousState, isLoggedIn: false };
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const data = JSON.parse(getLoginData);
    const token = data.accessToken;
    const userId = data.id;

    await axios
      .get(`${API_PUBLIC_URL}api/ws-teams/confirm/${userId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        toast.success("Successfully confirm!");
        navigate("/welcome-team");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 403) {
          toast.error("No Permission");
          // navigate("/");
        }
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
            <div className="row">
              <center>
                <h5>Your Selected Team</h5>
              </center>

              <form onSubmit={submitForm}>
                <div className="row mt-4">
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
                            src={`${API_PUBLIC_URL}${p.player.image}`}
                            alt=""
                            width="80px"
                          />
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
                        </span>
                        <p style={{ marginBottom: "0px" }}>
                          {p.player["name"]}
                        </p>
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
                      </div>
                    </React.Fragment>
                  ))}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ borderRadius: "0px", float: "right" }}
                >
                  Confirm Team
                </button>
              </form>
            </div>
            {/* <hr /> */}
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
      <p>ViewTeam Page</p>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default ViewTeam;
