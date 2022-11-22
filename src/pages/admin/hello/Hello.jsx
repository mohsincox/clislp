import axios from "axios";
import React, { Fragment } from "react";
import { useEffect } from "react";
import { API_PUBLIC_URL } from "../../../constants";
import { useState } from "react";
import CrownOutlined from "@ant-design/icons/lib/icons/CrownOutlined";

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
    tournamentList.forEach((data, index) => {
      axios
        .get(`${API_PUBLIC_URL}api/ws-dream-team-rankings/dtr/${data.id}`, {})
        .then((response) => {
          setDtrList((prevState) => {
            let newState = [...prevState];
            newState.push({
              tour_id: data.id,
              randingDetails: [...response.data],
            });
            return newState;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, [tournamentList]);

  //   console.log("first========", dtrList);

  return (
    <div>
      {dtrList.map((rankTeam, index) => (
        <Fragment key={index}>
          <div>
            <p>
              {index}. TourID: {rankTeam.tour_id}
            </p>
            {rankTeam.randingDetails.length > 0 ? (
              <>
                {rankTeam.randingDetails.map((tt, ind) => (
                  <div key={ind}>
                    <p>
                      -----TEAM ID: {tt.team_id} -----TOTAL POINT:{" "}
                      {tt.total_point} -----USER: {tt.user?.name}
                    </p>
                  </div>
                ))}
              </>
            ) : (
              <p>No</p>
            )}
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export default Hello;
