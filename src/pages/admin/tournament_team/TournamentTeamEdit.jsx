import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function TournamentTeamEdit() {
  const [name, setName] = useState("");
  const [tournament_id, setTournament_id] = useState("");
  const [tournamentList, setTournamentList] = useState([]);
  const [category, setCategory] = useState("");
  const [country_id, setCountry_id] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [franchise_id, setFranchise_id] = useState("");
  const [franchiseList, setFranchiseList] = useState([]);
  let navigate = useNavigate();
  const { id } = useParams();

  const getLoginData = localStorage.getItem("loginData");

  useEffect(() => {
    getSelectTournamentDetails();
    getSelectCountryDetails();
    getSelectFranchiseDetails();
    getTournamentTeamDetails();
  }, []);

  const getTournamentTeamDetails = () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .get(`${API_PUBLIC_URL}api/tournament-teams/${id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setName(response.data.name);
            setTournament_id(response.data.tournament_id);
            setCategory(response.data.category);
            setCountry_id(response.data.country_id);
            setFranchise_id(response.data.franchise_id);
            console.log(response.data);
          });
      })();
    }
  };

  const getSelectTournamentDetails = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/tournaments`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setTournamentList(response.data);
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

  useEffect(() => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .get(`${API_PUBLIC_URL}api/tournaments/${tournament_id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setCategory(response.data.category);
            console.log(response.data.category);
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 403) {
              toast.error("No Permission");
              navigate("/admin/no-permission");
            }
          });
      })();
    }
  }, [tournament_id]);

  const getSelectCountryDetails = async () => {
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

  const getSelectFranchiseDetails = async () => {
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

  const submitForm = async (e) => {
    e.preventDefault();

    console.log("cou ffffffffff", country_id);
    console.log("fra ffffffffff", franchise_id);
    // return;

    // const letters = /^[A-Za-z]+$/;
    const letters = /^[a-zA-Z\s]*$/;
    if (name.trim() === "") {
      toast.error("Team Name field is required!");
    } else if (!name.match(letters)) {
      toast.error("Please input alphabet characters only");
    } else if (tournament_id === "") {
      toast.error("Tournament field is required!");
    } else if (category === "") {
      toast.error("Category field is required!");
    } else if (category === "International" && country_id === 0) {
      toast.error("Country field is required!");
    } else if (category === "Franchise" && franchise_id === 0) {
      toast.error("Franchise field is required!");
    } else {
      //   const formData = new FormData();
      //   formData.append("name", name);
      //   formData.append("tournament_id", tournament_id);

      //   for (var [key, value] of formData.entries()) {
      //     console.log(key, value);
      //   }
      //   return;

      const postBody = {
        name: name,
        tournament_id: tournament_id,
        category: category,
        country_id: country_id,
        franchise_id: franchise_id,
      };

      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .put(`${API_PUBLIC_URL}api/tournament-teams/${id}`, postBody, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setName("");
          setTournament_id("");
          setCategory("");
          setCountry_id("");
          setFranchise_id("");

          toast.success("Successfully created!");
          navigate("/admin/tournament-teams");
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
      {/* <div className="container mt-2"> */}
      <div className="col-sm-8 offset-sm-2">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Tournament Team Edit</h5>
            <form onSubmit={submitForm} encType="multipart/form-data">
              <div className="mb-3 row">
                <label className="form-label col-sm-3">
                  Group Name <span style={{ color: "#ff0000" }}>*</span>
                </label>

                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Group Name"
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">
                  Tournament Name <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                  <select
                    className="form-select"
                    value={tournament_id}
                    name="tournament_id"
                    onChange={(e) => setTournament_id(e.target.value)}
                  >
                    <option value={""}>Select Tournament</option>
                    {tournamentList.map((item, index) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* <div className="mb-3 row">
                <label className="form-label col-sm-3">
                  Team Category <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                  <select
                    name="category"
                    value={category}
                    className="form-control"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    <option value="International">International</option>
                    <option value="Franchise">Franchise</option>
                  </select>
                </div>
              </div> */}

              {category === "International" && (
                <div className="mb-3 row">
                  <label className="form-label col-sm-3">
                    Country Name <span style={{ color: "#ff0000" }}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <select
                      className="form-select"
                      value={country_id}
                      name="country_id"
                      onChange={(e) => setCountry_id(e.target.value)}
                    >
                      <option value={""}>Select Country</option>
                      {countryList.map((item, index) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {category === "Franchise" && (
                <div className="mb-3 row">
                  <label className="form-label col-sm-3">
                    Franchise Name <span style={{ color: "#ff0000" }}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <select
                      className="form-select"
                      value={franchise_id}
                      name="franchise_id"
                      onChange={(e) => setFranchise_id(e.target.value)}
                    >
                      <option value={""}>Select Franchise</option>
                      {franchiseList.map((item, index) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div className="float-end">
                <button
                  className="btn btn-danger me-3"
                  onClick={() => {
                    navigate("/admin/tournament-teams");
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
      {/* </div> */}
    </>
  );
}
