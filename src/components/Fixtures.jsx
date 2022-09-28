import axios from "axios";
import { Tab, Tabs } from "react-bootstrap";
import { useEffect, useState } from "react";
import { API_PUBLIC_URL } from "../constants";

export default function Fixtures() {
  const [fixtureList, setFixtureList] = useState([]);
  useEffect(() => {
    (async () => {
      await axios
        .get(`${API_PUBLIC_URL}api/ws-fixtures`, {})
        .then((response) => {
          setFixtureList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  return (
    <div className="container mt-3">
      <p>FIXTURES</p>

      <Tabs variant="pills">
        {fixtureList.map((fixture, index) => (
          <Tab
            key={fixture.id}
            eventKey={fixture.id}
            title={fixture.name}
            style={{ marginRight: "10px" }}
          >
            {/* {fixture.name} */}
            <>
              <div className="row">
                {fixture.matches.map((match, index) => (
                  <div
                    key={index}
                    className="col-sm-3"
                    style={{ marginTop: "10px" }}
                  >
                    {match.tournament_team_one != null &&
                      match.tournament_team_two != null && (
                        <div className="card">
                          <div className="card-body">
                            <p>{match.stage_name}</p>
                            <div className="row">
                              <div className="col-sm-5">
                                {/* <img
                              src={`${API_PUBLIC_URL}${match.country_one.flag}`}
                              alt=""
                              width="78px"
                              height="59px"
                            /> */}
                                {match.tournament_team_one.country == null ? (
                                  <img
                                    src={`${API_PUBLIC_URL}${match.tournament_team_one.franchise.logo}`}
                                    alt=""
                                    width="78px"
                                    height="59px"
                                  />
                                ) : (
                                  <img
                                    src={`${API_PUBLIC_URL}${match.tournament_team_one.country.flag}`}
                                    alt=""
                                    width="78px"
                                    height="59px"
                                  />
                                )}
                              </div>
                              <div
                                className="col-sm-2 text-center"
                                style={{ fontSize: "15px" }}
                              >
                                VS
                              </div>
                              <div className="col-sm-5">
                                {/* <img
                              src={`${API_PUBLIC_URL}${match.country_two.flag}`}
                              alt=""
                              width="78px"
                              height="59px"
                            /> */}

                                {match.tournament_team_two.country == null ? (
                                  <img
                                    src={`${API_PUBLIC_URL}${match.tournament_team_two.franchise.logo}`}
                                    alt=""
                                    width="78px"
                                    height="59px"
                                  />
                                ) : (
                                  <img
                                    src={`${API_PUBLIC_URL}${match.tournament_team_two.country.flag}`}
                                    alt=""
                                    width="78px"
                                    height="59px"
                                  />
                                )}
                              </div>
                            </div>
                            <div>
                              <div className="float-start">
                                {match.tournament_team_one.name}
                              </div>
                              <div className="float-end">
                                {match.tournament_team_two.name}
                              </div>
                            </div>
                          </div>
                          <div className="card-footer">
                            <div className="float-start">
                              {match.start_date}
                            </div>
                            <div className="float-end">
                              Starts at {match.start_time}
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
}
