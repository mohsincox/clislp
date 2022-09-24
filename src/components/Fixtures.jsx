import axios from "axios";
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
      <span className="me-2">FIXTURES</span>
      {/* <button className="btn btn-primary me-2">Asia Cup</button> */}
      {fixtureList.map((fixture, index) => (
        <button
          key={fixture.id}
          className="btn btn-primary me-2"
          style={{
            backgroundColor: "rgba(87, 9, 255, 0.12)",
            color: "#5709FF",
          }}
        >
          {fixture.name}
        </button>
      ))}
      {/* <button
        className="btn btn-primary me-2"
        style={{ backgroundColor: "rgba(87, 9, 255, 0.12)", color: "#5709FF" }}
      >
        Champions League
      </button>
      <button
        className="btn btn-primary me-2"
        style={{ backgroundColor: "rgba(87, 9, 255, 0.12)", color: "#5709FF" }}
      >
        ICC T20i World Cup
      </button>
      <button
        className="btn btn-primary me-2"
        style={{ backgroundColor: "rgba(87, 9, 255, 0.12)", color: "#5709FF" }}
      >
        Seria A
      </button> */}
    </div>
  );
}
