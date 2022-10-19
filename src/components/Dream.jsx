import React from "react";
import { Link } from "react-router-dom";
import RegisterWidget from "./RegisterWidget";

export default function Dream() {
  return (
    <>
      <div className="container" style={{ marginTop: "30px" }}>
        <div className="row">
          <div className="col-sm-5">
            <span>How to Build a Dream Team & Win Prizes?</span>
            <div style={{ position: "relative" }}>
              <img
                src={require("../images/dream.png")}
                alt=""
                width={450}
                height={660}
              />
              <span
                style={{
                  position: "absolute",
                  top: "30px",
                  left: "50px",
                  color: "#FFFFFF",
                }}
              >
                <button
                  className="btn border border-light"
                  style={{ color: "rgb(255, 255, 255)" }}
                >
                  BUILD YOUR DREAM TEAM
                </button>
              </span>

              <span
                style={{
                  position: "absolute",
                  top: "100px",
                  left: "50px",
                  color: "#FFFFFF",
                }}
              >
                <b>Step 1</b>: Signup and provide your personal
                <br />
                informations.
              </span>

              <span
                style={{
                  position: "absolute",
                  top: "170px",
                  left: "50px",
                  color: "#FFFFFF",
                }}
              >
                <b>Step 2</b>:Select a Tournament.
              </span>

              <span
                style={{
                  position: "absolute",
                  top: "220px",
                  left: "50px",
                  color: "#FFFFFF",
                }}
              >
                <b>Step 3</b>: Choose your favourite
                <br />
                Players from this tournament and
                <br />
                build a team.
              </span>

              <span
                style={{
                  position: "absolute",
                  top: "310px",
                  left: "50px",
                  color: "#FFFFFF",
                }}
              >
                <b>Step 4</b>: Join Contest and win
                <br />
                excting prizes.
              </span>

              <span
                style={{
                  position: "absolute",
                  top: "440px",
                  left: "50px",
                  color: "#FFFFFF",
                }}
              >
                Want to Build your team?
              </span>

              <span
                style={{
                  position: "absolute",
                  top: "480px",
                  left: "50px",
                  color: "#FFFFFF",
                }}
              >
                <Link to="/register">
                  <button
                    className="btn"
                    style={{ backgroundColor: "#FFFFFF", color: "#5709FF" }}
                  >
                    &nbsp;&nbsp;&nbsp; JOIN NOW &nbsp;&nbsp;&nbsp;
                  </button>
                </Link>
              </span>
            </div>
            <div style={{ marginTop: "10px" }}>
              <RegisterWidget name="Middle Widget" style={{width: "100%", height: "215px"}} />
            </div>
          </div>

          <div className="col-sm-4">
            <span>Dream Teams Ranking</span>
            <div className="card">
              <div className="card-body">
                <div className="card">
                  <h5
                    className="card-header bg-primary"
                    style={{ color: "#FFFFFF" }}
                  >
                    Asia Cup
                  </h5>
                  <div className="card-body">
                    <div>
                      <div className="float-start">Teams</div>
                      <div className="float-end">Pts</div>
                    </div>
                    <table className="table table-striped">
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Royals Eleven</td>
                          <td>
                            <span className="float-end">15</span>
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Super Class Boys</td>
                          <td>
                            <span className="float-end">13</span>
                          </td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Happy Club</td>
                          <td>
                            <span className="float-end">11</span>
                          </td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>Super Class Boys</td>
                          <td>
                            <span className="float-end">10</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="card" style={{ marginTop: "10px" }}>
                  <h5
                    className="card-header bg-primary"
                    style={{ color: "#FFFFFF" }}
                  >
                    Champions League
                  </h5>
                  <div className="card-body">
                    <div>
                      <div className="float-start">Teams</div>
                      <div className="float-end">Pts</div>
                    </div>
                    <table className="table table-striped">
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Royals Eleven</td>
                          <td>
                            <span className="float-end">15</span>
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Super Class Boys</td>
                          <td>
                            <span className="float-end">13</span>
                          </td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Happy Club</td>
                          <td>
                            <span className="float-end">11</span>
                          </td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>Super Class Boys</td>
                          <td>
                            <span className="float-end">10</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="card" style={{ marginTop: "10px" }}>
                  <h5
                    className="card-header bg-primary"
                    style={{ color: "#FFFFFF" }}
                  >
                    Asia Cup
                  </h5>
                  <div className="card-body">
                    <div>
                      <div className="float-start">Teams</div>
                      <div className="float-end">Pts</div>
                    </div>
                    <table className="table table-striped">
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Royals Eleven</td>
                          <td>
                            <span className="float-end">15</span>
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Super Class Boys</td>
                          <td>
                            <span className="float-end">13</span>
                          </td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Happy Club</td>
                          <td>
                            <span className="float-end">11</span>
                          </td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>Super Class Boys</td>
                          <td>
                            <span className="float-end">10</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-3">
            {/*<p></p>*/}
            {/*<div>*/}
            {/*  <img src={require("../images/add_spon_dr_side.png")} alt="" />*/}
            {/*</div>*/}
            {/*<p></p>*/}
            {/*<div>*/}
            {/*  <img src={require("../images/add_spon_dr_side.png")} alt="" />*/}
            {/*</div>*/}
            <div className="mb-5">
              <RegisterWidget name="Right Sidebar One" style={{width: "100%", height: "400px"}} />
            </div>

            <div className="mb-5">
              <RegisterWidget name="Right Sidebar Two" style={{width: "100%", height: "400px"}} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
