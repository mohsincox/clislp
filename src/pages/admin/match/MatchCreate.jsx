import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

function MatchCreate() {
  const initialValues = {
    stage_name: "",
    tournament_id: "",
    country_one_id: "",
    country_two_id: "",
    start_date: "",
    start_time: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [tournamentList, setTournamentList] = useState([]);
  const [countryOneList, setCountryOneList] = useState([]);
  const [countryTwoList, setCountryTwoList] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getSelectTournament();
    getSelectCountry();
  }, []);

  const getSelectTournament = async () => {
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

  const getSelectCountry = async () => {
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
          setCountryOneList(response.data);
          setCountryTwoList(response.data);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValues.stage_name.trim() == "") {
      toast.error("Stage Name field is required!");
    } else if (formValues.tournament_id.trim() == "") {
      toast.error("Tournament field is required!");
    } else if (formValues.country_one_id.trim() == "") {
      toast.error("Country one field is required!");
    } else if (formValues.country_two_id.trim() == "") {
      toast.error("Country two field is required!");
    } else {
      setFormErrors(validate(formValues));
      setIsSubmit(true);
    }
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      handleLogin();
    }
  }, [formErrors]);

  const getLoginData = localStorage.getItem("loginData");

  const handleLogin = () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .post(`${API_PUBLIC_URL}api/matches`, formValues, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            toast.success("Created Successfully");
            navigate("/admin/matches");
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
      })();
    }
  };

  const validate = (values) => {
    const errors = {};
    /*
    if (!values.stage_name) {
      toast.error("Stage Name is required");
      //   errors.stage_name = "stage_name";
    }
    if (!values.tournament_id) {
      console.log("values.tournament_id---------", values.tournament_id);
      toast.error("tournament_id is required");
      //   errors.tournament_id = "tournament_id";
    }
    if (!values.country_one_id) {
      toast.error("country_one_id is required");
      //   errors.country_one_id = "country_one_id";
    }
    if (!values.country_two_id) {
      toast.error("country_two_id is required");
      //   errors.country_two_id = "country_two_id";
    }
    if (values.country_one_id === values.country_two_id) {
      toast.error("Both countries can not be same");
      //   errors.country_two_id = "Both countries can not be same";
    }
    if (!values.start_date) {
      toast.error("start_date is required");
      //   errors.start_date = "start_date";
    }
    if (!values.start_time) {
      toast.error("start_time is required");
      //   errors.start_time = "start_time";
    }
    */
    return errors;
  };

  return (
    <div className="container">
      <div className="col-sm-8 offset-sm-2">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Match Create</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
                <label className="form-label col-sm-3">Stage Name</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Stage Name"
                    value={formValues.stage_name}
                    name="stage_name"
                    onChange={handleChange}
                  />
                  <p className="text-danger">{formErrors.stage_name}</p>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">Tournament Name</label>
                <div className="col-sm-9">
                  <select
                    className="form-select"
                    value={formValues.tournament_id}
                    name="tournament_id"
                    onChange={handleChange}
                  >
                    <option value={""}>Select Tournament</option>
                    {tournamentList.map((sm, index) => (
                      <option key={sm.id} value={sm.id}>
                        {sm.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-danger">{formErrors.tournament_id}</p>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">Country Name</label>
                <div className="col-sm-9">
                  <select
                    className="form-select"
                    value={formValues.country_one_id}
                    name="country_one_id"
                    onChange={handleChange}
                  >
                    <option value={""}>Select Country</option>
                    {countryOneList.map((sm, index) => (
                      <option key={sm.id} value={sm.id}>
                        {sm.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-danger">{formErrors.country_one_id}</p>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">Country vs</label>
                <div className="col-sm-9">
                  <select
                    className="form-select"
                    value={formValues.country_two_id}
                    name="country_two_id"
                    onChange={handleChange}
                  >
                    <option value={""}>Select Country vs</option>
                    {countryTwoList.map((sm, index) => (
                      <option key={sm.id} value={sm.id}>
                        {sm.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-danger">{formErrors.country_two_id}</p>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">Start Date</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter start_date"
                    value={formValues.start_date}
                    name="start_date"
                    onChange={handleChange}
                  />
                  <p className="text-danger">{formErrors.start_date}</p>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">Start Time</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter start_time"
                    value={formValues.start_time}
                    name="start_time"
                    onChange={handleChange}
                  />
                  <p className="text-danger">{formErrors.start_time}</p>
                </div>
              </div>

              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MatchCreate;
