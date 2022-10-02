import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function FranchiseEdit() {
  const [name, setName] = useState("");
  const [country_id, setCountry_id] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState();
  const [im, setIm] = useState("");
  let navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    handleLogin();
    getFranchiseDetails();
  }, []);

  const getLoginData = localStorage.getItem("loginData");

  const handleLogin = () => {
    if (getLoginData === null) {
      navigate("/login");
    }
  };

  const getFranchiseDetails = () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .get(`${API_PUBLIC_URL}api/franchises/${id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setName(response.data.name);
            setCountry_id(response.data.country_id);
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
            }
            navigate("/admin/no-permission");
          });
      })();
    }
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      toast.error("Franchise Name field is required!");
    } else if (country_id === "") {
      toast.error("Country Name field is required!");
    }
    // else if (logo === null) {
    //   toast.error("Image file is required!");
    // }
    else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("country_id", country_id);
      formData.append("logo", logo);

      //   for (var [key, value] of formData.entries()) {
      //     console.log(key, value);
      //   }
      //   return;

      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .put(`${API_PUBLIC_URL}api/franchises/${id}`, formData, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log(response);
          setName("");
          setCountry_id("");
          setCountryList([]);
          setLogo(null);

          toast.success("Successfully created!");
          navigate("/admin/franchises");
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
    if (!logo) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(logo);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [logo]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setLogo(undefined);
      return;
    }
    setLogo(e.target.files[0]);
  };

  return (
    <>
      <div className="container mt-2">
        <div className="col-sm-8 offset-sm-2">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Franchise Edit</h5>
              <form onSubmit={submitForm} encType="multipart/form-data">
                <div className="mb-3 row">
                  <label className="form-label col-sm-3">
                    Franchise Name <span style={{ color: "#ff0000" }}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Franchise Name"
                      value={name}
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="form-label col-sm-3">
                    Origin Country <span style={{ color: "#ff0000" }}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <select
                      className="form-select"
                      value={country_id}
                      name="country_id"
                      onChange={(e) => setCountry_id(e.target.value)}
                    >
                      <option value="">Select Country</option>
                      {countryList.map((sm, index) => (
                        <option key={sm.id} value={sm.id}>
                          {sm.name}
                        </option>
                      ))}
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
                      // onChange={(e) => setLogo(e.target.files[0])}
                      onChange={onSelectFile}
                    />

                    <div style={{ marginTop: "10px" }}>
                      {logo ? (
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
                      navigate("/admin/franchises");
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
