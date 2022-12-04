import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function PlayerEdit() {
  const [name, setName] = useState("");
  const [game_id, setGame_id] = useState("");
  const [gameList, setGameList] = useState([]);
  const [country_id, setCountry_id] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [franchise_id, setFranchise_id] = useState("");
  const [franchiseList, setFranchiseList] = useState([]);
  const [point, setPoint] = useState("");
  const [ranking, setRanking] = useState("");
  const [isAllRounder, setIsAllRounder] = useState(false);
  const [isBatsman, setIsBatsman] = useState(false);
  const [isBowler, setIsBowler] = useState(false);
  const [isKeeper, setIsKeeper] = useState(false);
  const [isGoalkeeper, setIsGoalkeeper] = useState(false);
  const [isDefender, setIsDefender] = useState(false);
  const [isMidfielder, setIsMidfielder] = useState(false);
  const [isForward, setIsForward] = useState(false);
  const [isStriker, setIsStriker] = useState(false);
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState();
  const [im, setIm] = useState("");
  let navigate = useNavigate();
  const { id } = useParams();

  const getLoginData = localStorage.getItem("loginData");

  useEffect(() => {
    getPlayerDetails();
    getGameDetails();
    getCountryDetails();
    getFranchiseDetails();
  }, []);

  const getGameDetails = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
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
            navigate("/admin/no-permission");
          }
        });
    }
  };

  // useEffect(() => {
  //   if (getLoginData === null) {
  //     navigate("/login");
  //   } else {
  //     const storageData = JSON.parse(getLoginData);
  //     const token = storageData.accessToken;
  //     (async () => {
  //       await axios
  //         .get(`${API_PUBLIC_URL}api/games/${game_id}`, {
  //           headers: {
  //             Authorization: token,
  //           },
  //         })
  //         .then((response) => {
  //           setGame_id(response.data.id);
  //           console.log("setGame_id", response.data.id);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           if (error.response.status === 403) {
  //             toast.error("No Permission");
  //             navigate("/admin/no-permission");
  //           }
  //         });
  //     })();
  //   }
  // }, [game_id]);

  const getCountryDetails = async () => {
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

  const getFranchiseDetails = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/franchises`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setFranchiseList(response.data);
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
          setGame_id(response.data.game_id);
          setCountry_id(response.data.country_id);
          setFranchise_id(response.data.franchise_id);
          setPoint(response.data.point);
          setRanking(response.data.ranking);
          setIsAllRounder(specificationParse["All Rounder"]);
          setIsBatsman(specificationParse["Batsman"]);
          setIsBowler(specificationParse["Bowler"]);
          setIsKeeper(specificationParse["Keeper"]);
          if (specificationParse["Goalkeeper"] === undefined) {
            setIsGoalkeeper(false);
          } else {
            setIsGoalkeeper(specificationParse["Goalkeeper"]);
          }

          if (specificationParse["Defender"] === undefined) {
            setIsDefender(false);
          } else {
            setIsDefender(specificationParse["Defender"]);
          }

          if (specificationParse["Midfielder"] === undefined) {
            setIsMidfielder(false);
          } else {
            setIsMidfielder(specificationParse["Midfielder"]);
          }

          if (specificationParse["Forward"] === undefined) {
            setIsForward(false);
          } else {
            setIsForward(specificationParse["Forward"]);
          }

          if (specificationParse["Striker"] === undefined) {
            setIsStriker(false);
          } else {
            setIsStriker(specificationParse["Striker"]);
          }

          // setIsDefender(specificationParse["Defender"]);
          // setIsMidfielder(specificationParse["Midfielder"]);
          // setIsForward(specificationParse["Forward"]);
          setStatus(response.data.status);
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

  const handleGoalkeeper = () => {
    setIsGoalkeeper(!isGoalkeeper);
  };

  const handleDefender = () => {
    setIsDefender(!isDefender);
  };

  const handleMidfielder = () => {
    setIsMidfielder(!isMidfielder);
  };

  const handleForward = () => {
    setIsForward(!isForward);
  };

  const handleStriker = () => {
    setIsStriker(!isStriker);
  };

  const handelSpecification = (e) => {
    if (e.target.name == "Goalkeeper") {
      setIsGoalkeeper(true);
      setIsDefender(false);
      setIsMidfielder(false);
      setIsStriker(false);
    } else if (e.target.name == "Defender") {
      setIsGoalkeeper(false);
      setIsDefender(true);
      setIsMidfielder(false);
      setIsStriker(false);
    } else if (e.target.name == "Midfielder") {
      setIsGoalkeeper(false);
      setIsDefender(false);
      setIsMidfielder(true);
      setIsStriker(false);
    } else if (e.target.name == "Striker") {
      setIsGoalkeeper(false);
      setIsDefender(false);
      setIsMidfielder(false);
      setIsStriker(true);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    console.log("game_id", game_id);
    console.log("game_id typeOf", typeof game_id);
    // return;

    if (name.trim() === "") {
      toast.error("Player Name field is required!");
    } else if (game_id === "") {
      toast.error("Game field is required!");
    } else if (game_id === 0) {
      toast.error("Game field is required!");
    } else if (isNaN(game_id)) {
      toast.error("Game field is required!");
    } else if (game_id === undefined) {
      toast.error("Game field is required!");
    } else if (country_id === "") {
      toast.error("Country field is required!");
    } else if (status === "") {
      toast.error("Status field is required!");
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("country_id", country_id);
      formData.append("game_id", game_id);
      formData.append("franchise_id", franchise_id);
      formData.append("point", point);
      formData.append("ranking", ranking);
      formData.append("isAllRounder", isAllRounder);
      formData.append("isBatsman", isBatsman);
      formData.append("isBowler", isBowler);
      formData.append("isKeeper", isKeeper);
      formData.append("isGoalkeeper", isGoalkeeper);
      formData.append("isDefender", isDefender);
      formData.append("isMidfielder", isMidfielder);
      formData.append("isForward", isForward);
      formData.append("isStriker", isStriker);
      formData.append("status", status);
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
          setGame_id("");
          setCountry_id("");
          setFranchise_id("");
          setPoint("");
          setRanking("");
          setIsAllRounder(false);
          setIsBatsman(false);
          setIsBowler(false);
          setIsKeeper(false);
          setIsGoalkeeper(false);
          setIsDefender(false);
          setIsMidfielder(false);
          setIsForward(false);
          setIsStriker(false);
          setStatus("");
          setImage(null);
          toast.success("Successfully created!");
          navigate("/admin/players");
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

  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(undefined);
      return;
    }
    setImage(e.target.files[0]);
  };

  const handleGameSelect = (e) => {
    if (parseInt(e.target.value) === isNaN) {
      setGame_id("");
    } else {
      setGame_id(parseInt(e.target.value));
    }

    console.log(parseInt(e.target.value));
  };

  return (
    <>
      <div className="container mt-2">
        <div className="col-sm-8 offset-sm-2">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Player Edit</h5>
              <form onSubmit={submitForm} encType="multipart/form-data">
                <div className="mb-3 row">
                  <label className="form-label col-sm-3">
                    Player Name <span style={{ color: "#ff0000" }}>*</span>
                  </label>

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
                  <label className="form-label col-sm-3">
                    Game <span style={{ color: "#ff0000" }}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <select
                      className="form-select"
                      value={game_id}
                      name="game_id"
                      // onChange={(e) => setGame_id(e.target.value)}
                      onChange={(e) => handleGameSelect(e)}
                    >
                      <option value={""}>Select Game</option>
                      {gameList.map((item, index) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {game_id === 1 && (
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
                )}

                {/* {game_id === 2 && (
                  <div className="mb-3 row">
                    <label className="form-label col-sm-3">Specification</label>
                    <div className="col-sm-9">
                      <div>
                        <input
                          type="checkbox"
                          checked={isGoalkeeper}
                          onChange={handleGoalkeeper}
                        />
                        Goalkeeper
                      </div>

                      <div>
                        <input
                          type="checkbox"
                          checked={isDefender}
                          onChange={handleDefender}
                        />
                        Defender
                      </div>

                      <div>
                        <input
                          type="checkbox"
                          checked={isMidfielder}
                          onChange={handleMidfielder}
                        />
                        Midfielder
                      </div>

                      <div>
                        <input
                          type="checkbox"
                          checked={isStriker}
                          onChange={handleStriker}
                        />
                        Striker
                      </div>
                    </div>
                  </div>
                )} */}

                {game_id === 2 && (
                  <div className="mb-3 row">
                    <label className="form-label col-sm-3">Specification</label>
                    <div className="col-sm-9">
                      <div>
                        <input
                          type="radio"
                          name="Goalkeeper"
                          checked={isGoalkeeper}
                          onChange={(e) => handelSpecification(e)}
                        />
                        Goalkeeper
                      </div>

                      <div>
                        <input
                          type="radio"
                          name="Defender"
                          checked={isDefender}
                          onChange={(e) => handelSpecification(e)}
                        />
                        Defender
                      </div>

                      <div>
                        <input
                          type="radio"
                          name="Midfielder"
                          checked={isMidfielder}
                          onChange={(e) => handelSpecification(e)}
                        />
                        Midfielder
                      </div>

                      <div>
                        <input
                          type="radio"
                          name="Striker"
                          checked={isStriker}
                          onChange={(e) => handelSpecification(e)}
                        />
                        Striker
                      </div>
                    </div>
                  </div>
                )}

                <div className="mb-3 row">
                  <label className="form-label col-sm-3">
                    Country <span style={{ color: "#ff0000" }}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <select
                      className="form-select"
                      value={country_id}
                      name="country_id"
                      onChange={(e) => setCountry_id(e.target.value)}
                    >
                      <option>Select Country</option>
                      {countryList.map((item, index) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="form-label col-sm-3">Franchise</label>
                  <div className="col-sm-9">
                    <select
                      className="form-select"
                      value={franchise_id}
                      name="franchise_id"
                      onChange={(e) => setFranchise_id(e.target.value)}
                    >
                      <option>Select Franchise</option>
                      {franchiseList.map((item, index) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
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
                  <label className="form-label col-sm-3">
                    Status <span style={{ color: "#ff0000" }}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <select
                      name="status"
                      value={status}
                      className="form-control"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
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
                      // onChange={(e) => setImage(e.target.files[0])}
                      onChange={onSelectFile}
                    />

                    <div style={{ marginTop: "10px" }}>
                      {image ? (
                        <img src={preview} alt="" width="80px" height="50px" />
                      ) : (
                        <img
                          src={`${API_PUBLIC_URL}${im}`}
                          alt=""
                          width="80px"
                          height="50px"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="float-end">
                  <button
                    className="btn btn-danger me-3"
                    onClick={() => {
                      navigate("/admin/players");
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={submitForm}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
