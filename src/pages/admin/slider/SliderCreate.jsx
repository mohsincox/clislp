import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function SliderCreate() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    handleLogin();
  }, []);

  const getLoginData = localStorage.getItem("loginData");

  const handleLogin = () => {
    if (getLoginData === null) {
      navigate("/login");
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      toast.error("Slider Name field is required!");
    } else if (image === null) {
      toast.error("Image file is required!");
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);

      console.log(formData.get("name"));

      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .post(`${API_PUBLIC_URL}api/sliders`, formData, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log(response);
          setName("");
          setImage(null);

          toast.success("Successfully created!");
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
