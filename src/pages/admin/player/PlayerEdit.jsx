import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function PlayerEdit() {
  const [name, setName] = useState("");
  const [country_id, setCountry_id] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [point, setPoint] = useState("");
  const [ranking, setRanking] = useState("");
  const [jersey_no, setJersey_no] = useState("");
  const [batting_position, setBatting_position] = useState("");
  const [isAllRounder, setIsAllRounder] = useState(false);
  const [isBatsman, setIsBatsman] = useState(false);
  const [isBowler, setIsBowler] = useState(false);
  const [isKeeper, setIsKeeper] = useState(false);
  const [image, setImage] = useState(null);
  const [im, setIm] = useState("");
  let navigate = useNavigate();
  const { id } = useParams();

  const getLoginData = localStorage.getItem("loginData");

  useEffect(() => {
    getSelectDetails();
    getPlayerDetails();
  }, []);

  const getSelectDetails = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/countries`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setCountryList(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 403) {
            toast.error("No Permission");
            navigate("/admin/no-permission");
          }
        });
    }
  };

  const getPlayerDetails = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/players/${id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          const specificationParse = JSON.parse(response.data.specification);
          setName(response.data.name);
          setCountry_id(response.data.country_id);
          setPoint(response.data.point);
          setRanking(response.data.ranking);
          setJersey_no(response.data.jersey_no);
          setBatting_position(response.data.batting_position);
          setIsAllRounder(specificationParse["All Rounder"]);
          setIsBatsman(specificationParse["Batsman"]);
          setIsBowler(specificationParse["Bowler"]);
          setIsKeeper(specificationParse["Keeper"]);
          setIm(response.data.image);
        });
    }
  };

  const handleAllRounder = () => {
    setIsAllRounder(!isAllRounder);
  };

  const handleBatsman = () => {
    setIsBatsman(!isBatsman);
  };

  const handleBowler = () => {
    setIsBowler(!isBowler);
  };

  const handleKeeper = () => {
    setIsKeeper(!isKeeper);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (name == "") {
      toast.error("Player Name field is required!");
    } else if (country_id == "") {
      toast.error("Country field is required!");
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("country_id", country_id);
      formData.append("jersey_no", jersey_no);
      formData.append("batting_position", batting_position);
      formData.append("point", point);
      formData.append("ranking", ranking);
      formData.append("isAllRounder", isAllRounder);
      formData.append("isBatsman", isBatsman);
      formData.append("isBowler", isBowler);
      formData.append("isKeeper", isKeeper);
      formData.append("image", image);

      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .put(`${API_PUBLIC_URL}api/players/${id}`, formData, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setName("");
          setCountry_id("");
          setPoint("");
          setRanking("");
          setJersey_no("");
          setBatting_position("");
          setIsAllRounder(false);
          setIsBatsman(false);
          setIsBowler(false);
          setIsKeeper(false);
          setImage(null);
          toast.success("Successfully created!");
          navigate("/admin/players");
        })
        .catch((error) => {
          console.log(error);
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
            <h3>Player Edit</h3>
          </div>
          <div>
            <form onSubmit={submitForm} encType="multipart/form-data">
              <div className="mb-3 row">
                <label className="form-label col-sm-3">Player Name</label>

                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Player Name"
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">Country Name</label>
                <div className="col-sm-9">
                  <select
                    className="form-select"
                    value={country_id}
                    name="country_id"
                    onChange={(e) => setCountry_id(e.target.value)}
                  >
                    <option>Select Country</option>
                    {countryList.map((sm, index) => (
                      <option key={sm.id} value={sm.id}>
                        {sm.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">Specification</label>
                <div className="col-sm-9">
                  <div>
                    <input
                      type="checkbox"
                      checked={isAllRounder}
                      onChange={handleAllRounder}
                    />
                    All Rounder
                  </div>

                  <div>
                    <input
                      type="checkbox"
                      checked={isBatsman}
                      onChange={handleBatsman}
                    />
                    Batsman
                  </div>

                  <div>
                    <input
                      type="checkbox"
                      checked={isBowler}
                      onChange={handleBowler}
                    />
                    Bowler
                  </div>

                  <div>
                    <input
                      type="checkbox"
                      checked={isKeeper}
                      onChange={handleKeeper}
                    />
                    Wicket Keeper
                  </div>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">Jersey No</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Enter Jersey No"
                    value={jersey_no}
                    onChange={(e) => setJersey_no(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">Batting Position</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Enter Batting Position"
                    value={batting_position}
                    onChange={(e) => setBatting_position(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">Point</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Enter Point"
                    value={point}
                    onChange={(e) => setPoint(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">Current Ranking</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Enter Current Ranking"
                    value={ranking}
                    onChange={(e) => setRanking(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">Image</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="file"
                    placeholder="Enter Image"
                    name="image"
                    onChange={(e) => setImage(e.target.files[0])}
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
