import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_PUBLIC_URL } from "../constants";
import Header from "../components/Header";
import "./regStepOne.css";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

const Tournament = () => {
  const [cricketTourList, setCricketTourList] = useState([]);
  const [footballTourList, setFootballTourList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getLoginData = localStorage.getItem("loginData");
    if (getLoginData === null) {
      navigate("/register");
    } else {
      const data = JSON.parse(getLoginData);
      const token = data.accessToken;

      axios
        .get(`${API_PUBLIC_URL}api/ws-tournaments/cricket`, {
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

  useEffect(() => {
    const getLoginData = localStorage.getItem("loginData");
    if (getLoginData === null) {
      navigate("/register");
    } else {
      const data = JSON.parse(getLoginData);
      const token = data.accessToken;

      axios
        .get(`${API_PUBLIC_URL}api/ws-tournaments/football`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setFootballTourList(response.data);
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
          <div className="col-sm-8">
            <div style={{ marginTop: "15px" }} className="card-custom">
              <ul id="progressbar">
                <li className="passed" id="account">
                  <center>Informations</center>
                </li>
                <li className="active" id="personal">
                  <center>Tournaments</center>
                </li>
                <li id="confirm">
                  <center>Build Team</center>
                </li>
              </ul>
            </div>
            <hr />
            <div className="row">
              <p>Cricket</p>
              {cricketTourList.map((cricketTour, index) => (
                <div className="col-2" key={cricketTour.id}>
                  <Link
                    to={`/build-team/${cricketTour.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="card">
                      <img
                        src={`${API_PUBLIC_URL}${cricketTour.logo}`}
                        alt=""
                      />
                    </div>
                    <p
                      className="text-center"
                      style={{ marginBottom: "0px", fontSize: "12px" }}
                    >
                      {cricketTour.name} <br /> {cricketTour.year}
                    </p>
                  </Link>
                </div>
              ))}

              {/* <div className="col-2">
                <div className="card">
                  <img src={require("../images/T20worldcup.png")} alt="" />
                </div>
                <p
                  className="text-center"
                  style={{ marginBottom: "0px", fontSize: "12px" }}
                >
                  ICC T20 <br /> World Cup
                </p>
              </div>

              <div className="col-2">
                <div className="card">
                  <img src={require("../images/asiacup.png")} alt="" />
                </div>
                <p
                  className="text-center"
                  style={{ marginBottom: "0px", fontSize: "12px" }}
                >
                  Asia Cup <br /> 2022
                </p>
              </div>

              <div className="col-2">
                <div className="card">
                  <img src={require("../images/T20worldcup.png")} alt="" />
                </div>
                <p
                  className="text-center"
                  style={{ marginBottom: "0px", fontSize: "12px" }}
                >
                  ICC T20 <br /> World Cup
                </p>
              </div> */}
            </div>
            <hr />
            <div className="row">
              <p>Football</p>

              {footballTourList.map((footballTour, index) => (
                <div className="col-2" key={footballTour.id}>
                  <div className="card">
                    <center>
                      <img
                        src={`${API_PUBLIC_URL}${footballTour.logo}`}
                        alt=""
                        width="41px"
                      />
                    </center>
                  </div>
                  <p
                    className="text-center"
                    style={{ marginBottom: "0px", fontSize: "12px" }}
                  >
                    {footballTour.name} <br /> {footballTour.year}
                  </p>
                </div>
              ))}
            </div>
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

export default Tournament;
