import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_PUBLIC_URL } from "../constants";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

const GameTournaments = () => {
  const [cricketTourList, setCricketTourList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getLoginData = localStorage.getItem("loginData");
    if (getLoginData === null) {
      navigate("/register");
    } else {
      const data = JSON.parse(getLoginData);
      const token = data.accessToken;

      axios
        .get(`${API_PUBLIC_URL}api/ws-tournaments/game-tournaments`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setCricketTourList(response.data);
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
          <div className="col-sm-8 mt-3">
            {cricketTourList.map((gameTours, index) => (
              <React.Fragment key={index}>
                <div className="row">
                  <p>{gameTours.name}</p>
                  {gameTours.tournaments.map((tours, index) => (
                    <div className="col-2" key={tours.id}>
                      {/* <Link
                      to={`/build-team/${tours.id}`}
                      style={{ textDecoration: "none" }}
                    > */}
                      <div className="card">
                        <img src={`${API_PUBLIC_URL}${tours.logo}`} alt="" />
                      </div>
                      <p
                        className="text-center"
                        style={{ marginBottom: "0px", fontSize: "12px" }}
                      >
                        {tours.name} <br /> {tours.year}
                      </p>
                      {/* </Link> */}
                    </div>
                  ))}
                </div>
                <hr />
              </React.Fragment>
            ))}
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
    </>
  );
};

export default GameTournaments;
