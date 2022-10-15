import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function SliderCreate() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState();
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
    } else if (position.trim() === "") {
      toast.error("Position field is required!");
    } else if (image === null) {
      toast.error("Image file is required!");
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("position", position);
      formData.append("image", image);

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

  return (
    <>
      <div className="container mt-2">
        <div className="col-sm-8 offset-sm-2">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Slider Create</h5>
              <form onSubmit={submitForm} encType="multipart/form-data">
                <div className="mb-3 row">
                  <label className="form-label col-sm-3">
                    Slider Name <span style={{ color: "#ff0000" }}>*</span>
                  </label>
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
                  <label className="form-label col-sm-3">
                    Position <span style={{ color: "#ff0000" }}>*</span>
                  </label>
                  <div className="col-sm-9">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Enter Position"
                      value={position}
                      name="position"
                      onChange={(e) => setPosition(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label className="form-label col-sm-3">
                    Image <span style={{ color: "#ff0000" }}>*</span>
                  </label>
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
                      {image && (
                        <img src={preview} alt="" width="80px" height="50px" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="float-end">
                  <button
                    className="btn btn-danger me-3"
                    onClick={() => {
                      navigate("/admin/sliders");
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
