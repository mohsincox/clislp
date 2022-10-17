import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function SettingsShow() {
  const [run_point, setRun_point] = useState("");
  const [wicket_point, setWicket_point] = useState("");
  const [man_of_the_match_point, setMan_of_the_match_point] = useState("");
  const [fifty_point, setFifty_point] = useState("");
  const [hundred_point, setHundred_point] = useState("");
  const [five_wickets_point, setFive_wickets_point] = useState("");
  const [admin_cricket_player, setAdmin_cricket_player] = useState("");
  const [user_cricket_player, setUser_cricket_player] = useState("");
  const [admin_football_player, setAdmin_football_player] = useState("");
  const [user_football_player, setUser_football_player] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    handleLogin();
    getSettingsDetails();
  }, []);

  const getLoginData = localStorage.getItem("loginData");

  const getSettingsDetails = () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .get(`${API_PUBLIC_URL}api/settings/1`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setRun_point(response.data.run_point);
            setWicket_point(response.data.wicket_point);
            setMan_of_the_match_point(response.data.man_of_the_match_point);
            setFifty_point(response.data.fifty_point);
            setHundred_point(response.data.hundred_point);
            setFive_wickets_point(response.data.five_wickets_point);
            setAdmin_cricket_player(response.data.admin_cricket_player);
            setUser_cricket_player(response.data.user_cricket_player);
            setAdmin_football_player(response.data.admin_football_player);
            setUser_football_player(response.data.user_football_player);
          });
      })();
    }
  };

  const handleLogin = () => {
    if (getLoginData === null) {
      navigate("/login");
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const postBody = {
      run_point: run_point,
      wicket_point: wicket_point,
      man_of_the_match_point: man_of_the_match_point,
      fifty_point: fifty_point,
      hundred_point: hundred_point,
      five_wickets_point: five_wickets_point,
      admin_cricket_player: admin_cricket_player,
      user_cricket_player: user_cricket_player,
      admin_football_player: admin_football_player,
      user_football_player: user_football_player,
    };

    const storageData = JSON.parse(getLoginData);
    const token = storageData.accessToken;

    await axios
      .put(`${API_PUBLIC_URL}api/settings/1`, postBody, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response);

        toast.success("Updated Successfully");
        // navigate("/admin/settings");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container mt-2">
        <div className="col-sm-8 offset-sm-2">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Settings Update</h5>
              <form onSubmit={submitForm}>
                <div className="mb-3 row">
                  <label className="form-label col-sm-4">Run Point</label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Enter run_point"
                      value={run_point}
                      name="run_point"
                      onChange={(e) => setRun_point(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="form-label col-sm-4">Wicket Point</label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Enter wicket_point"
                      value={wicket_point}
                      name="wicket_point"
                      onChange={(e) => setWicket_point(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="form-label col-sm-4">
                    Man Of The Match Point
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Enter man_of_the_match_point"
                      value={man_of_the_match_point}
                      name="man_of_the_match_point"
                      onChange={(e) =>
                        setMan_of_the_match_point(e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="form-label col-sm-4">Fifty Point</label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Enter fifty_point"
                      value={fifty_point}
                      name="fifty_point"
                      onChange={(e) => setFifty_point(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="form-label col-sm-4">Hundred Point</label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Enter hundred_point"
                      value={hundred_point}
                      name="hundred_point"
                      onChange={(e) => setHundred_point(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="form-label col-sm-4">
                    Five Wickets Point
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Enter five_wickets_point"
                      value={five_wickets_point}
                      name="five_wickets_point"
                      onChange={(e) => setFive_wickets_point(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="form-label col-sm-4">
                    Admin Cricket Player Select
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Enter admin_cricket_player"
                      value={admin_cricket_player}
                      name="admin_cricket_player"
                      onChange={(e) => setAdmin_cricket_player(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="form-label col-sm-4">
                    User Cricket Player Select
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Enter user_cricket_player"
                      value={user_cricket_player}
                      name="user_cricket_player"
                      onChange={(e) => setUser_cricket_player(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="form-label col-sm-4">
                    Admin Football Player Select
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Enter admin_football_player"
                      value={admin_football_player}
                      name="admin_football_player"
                      onChange={(e) => setAdmin_football_player(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="form-label col-sm-4">
                    User Football Player Select
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Enter user_football_player"
                      value={user_football_player}
                      name="user_football_player"
                      onChange={(e) => setUser_football_player(e.target.value)}
                    />
                  </div>
                </div>

                <div className="float-end">
                  {/* <button
                    className="btn btn-danger me-3"
                    onClick={() => {
                      navigate("/admin/settings");
                    }}
                  >
                    Cancel
                  </button> */}

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={submitForm}
                  >
                    Update
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
