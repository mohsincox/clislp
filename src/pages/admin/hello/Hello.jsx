import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { API_PUBLIC_URL } from "../../../constants";
import { useState } from "react";

function Hello() {
  const [tournamentList, setTournamentList] = useState([]);
  const [iccT20List, setIccT20List] = useState([]);
  const [dtrList, setDtrList] = useState([]);
  const [id, setId] = useState("");
  useEffect(() => {
    (async () => {
      await axios
        .get(`${API_PUBLIC_URL}commonapi/tournaments`, {})
        .then((response) => {
          console.log("All Tournament", response.data);
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
        .get(`${API_PUBLIC_URL}api/ws-dream-team-rankings/dtr/4`, {})
        .then((response) => {
          console.log("4 id tournament", response.data);
          setIccT20List(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await axios
        .get(`${API_PUBLIC_URL}api/ws-dream-team-rankings/dtr/${id}`, {})
        .then((response) => {
          console.log("DTR tournament", response.data);
          setDtrList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, [id]);

  return (
    <div>
      {tournamentList.map((tournament, index) => (
        <div key={tournament.id}>
          <p>
            {tournament.id}. {tournament.name}
          </p>
          {setId(tournament.id)}
          <>
            {dtrList.length > 0 ? (
              <div className="card">
                <h5 className="card-header tbg" style={{ color: "#FFFFFF" }}>
                  {dtrList[0]?.tournament?.name}
                </h5>
                <div className="card-body">
                  <div>
                    <div className="float-start fw-bold">Teams</div>
                    <div className="float-end fw-bold">Pts</div>
                  </div>
                  <table className="table table-striped">
                    <tbody>
                      {dtrList.map((rankTeam, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{rankTeam.user?.name}</td>
                          <td>
                            <span className="float-end">
                              {rankTeam.total_point}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="card">
                <h5 className="">
                  <span>FIFA World Cup 2022</span>
                  <span className="fs-6 fw-light"></span>
                </h5>
                <div className="card-body p-0">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Teams</th>
                        <th style={{ textAlign: "right" }}>Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <span
                              style={{
                                marginRight: "23px",
                                marginLeft: "23px",
                              }}
                            >
                              5
                            </span>
                            <span>--</span>
                          </div>
                        </td>
                        <td style={{ textAlign: "right" }}>--</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        </div>
      ))}
    </div>
  );
}

export default Hello;
