import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function TournamentEdit() {
  const [name, setName] = useState("");
  const [game_id, setGame_id] = useState("");
  const [gameList, setGameList] = useState([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [logo, setLogo] = useState(null);
  const [im, setIm] = useState("");
  let navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    handleLogin();
    getTournamentDetails();
  }, []);

  const getLoginData = localStorage.getItem("loginData");

  const handleLogin = () => {
    if (getLoginData === null) {
      navigate("/login");
    }
  };

  const getTournamentDetails = () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .get(`${API_PUBLIC_URL}api/tournaments/${id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setName(response.data.name);
            setGame_id(response.data.game_id);
            setMonth(response.data.month);
            setYear(response.data.year);
            setIm(response.data.logo);
            console.log(response.data);
          });
      })();
    }
  };

  useEffect(() => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .get(`${API_PUBLIC_URL}api/games`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setGameList(response.data);
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 403) {
              toast.error("No Permission");
            }
            navigate("/admin/no-permission");
          });
      })();
    }
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();

    if (game_id == "") {
      toast.error("Game Name field is required!");
    } else if (name.trim() == "") {
      toast.error("Tournament Name field is required!");
    }
    // else if (logo === null) {
    //   toast.error("Image file is required!");
    // }
    else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("game_id", game_id);
      formData.append("month", month);
      formData.append("year", year);
      formData.append("logo", logo);

      // for (var [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }
      // console.log("formData", formData.name);

      console.log(formData.get("name"));
      // console.log(formData.get("selectedFile").name);
      // return null;

      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .put(`${API_PUBLIC_URL}api/tournaments/${id}`, formData, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log(response);
          setName("");
          setGame_id("");
          setGameList([]);
          setMonth("");
          setYear("");
          setLogo(null);

          toast.success("Successfully created!");
          navigate("/admin/tournaments");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 400) {
            toast.error(error.response.data.msg);
          }
          if (error.response.status === 401) {
            toast.error(error.response.data.msg);
          }
          if (error.response.status === 403) {
            toast.error("No Permission");
            navigate("/admin/no-permission");
          }
        });
    }
  };

  return (
    <>
      <div className="container">
        <div className="col-sm-8 offset-sm-2">
          <div>
            <h3>Tournament Edit</h3>
          </div>
          <div>
            <form onSubmit={submitForm} encType="multipart/form-data">
              <div className="mb-3 row">
                <label className="form-label col-sm-3">Game Name</label>
                <div className="col-sm-9">
                  <select
                    className="form-select"
                    value={game_id}
                    name="game_id"
                    onChange={(e) => setGame_id(e.target.value)}
                  >
                    <option value="">Select Game</option>
                    {gameList.map((sm, index) => (
                      <option key={sm.id} value={sm.id}>
                        {sm.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">Tournament Name</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Country Name"
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">Month</label>
                <div className="col-sm-9">
                  <select
                    className="form-select"
                    value={month}
                    name="month"
                    onChange={(e) => setMonth(e.target.value)}
                  >
                    <option value="">Select Month</option>
                    <option value={"January"}>January</option>
                    <option value={"February"}>February</option>
                    <option value={"March"}>March</option>
                    <option value={"April"}>April</option>
                    <option value={"May"}>May</option>
                    <option value={"June"}>June</option>
                    <option value={"July"}>July</option>
                    <option value={"August"}>August</option>
                    <option value={"September"}>September</option>
                    <option value={"October"}>October</option>
                    <option value={"November"}>November</option>
                    <option value={"December"}>December</option>
                  </select>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">Year</label>
                <div className="col-sm-9">
                  <select
                    className="form-select"
                    value={year}
                    name="year"
                    onChange={(e) => setYear(e.target.value)}
                  >
                    <option value="">Select Month</option>
                    <option value={"2022"}>2022</option>
                    <option value={"2023"}>2023</option>
                    <option value={"2024"}>2024</option>
                    <option value={"2025"}>2025</option>
                    <option value={"2026"}>2026</option>
                  </select>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">Logo</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="file"
                    placeholder="Enter Image"
                    name="logo"
                    onChange={(e) => setLogo(e.target.files[0])}
                  />

                  <div style={{ marginTop: "10px" }}>
                    <img
                      src={`${API_PUBLIC_URL}${im}`}
                      alt=""
                      width="80px"
                      height="50px"
                    />
                  </div>
                </div>
              </div>

              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
