import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function SliderEdit() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [im, setIm] = useState("");
  let navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    handleLogin();
  }, []);

  const getLoginData = localStorage.getItem("loginData");

  const handleLogin = () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .get(`${API_PUBLIC_URL}api/sliders/${id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setName(response.data.name);
            setIm(response.data.image);
            console.log(response.data);
          });
      })();
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      toast.error("Slider Name field is required!");
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);

      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .put(`${API_PUBLIC_URL}api/sliders/${id}`, formData, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log(response);
          setName("");
          setImage(null);

          toast.success("Successfully updated!");
          navigate("/admin/sliders");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className="container">
        <div className="col-sm-8 offset-sm-2">
          <div>
            <h3>Slider Create</h3>
          </div>
          <div>
            <form onSubmit={submitForm} encType="multipart/form-data">
              <div className="mb-3 row">
                <label className="form-label col-sm-3">Slider Name</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Slider Name"
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
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
