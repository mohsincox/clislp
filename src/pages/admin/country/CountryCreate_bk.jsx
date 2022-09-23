import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function CountryCreatebk() {
  const [name, setName] = useState("");
  const [short_name, setShort_name] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    handleLogin();
  }, []);

  const getLoginData = localStorage.getItem("loginData");

  const storageData = JSON.parse(getLoginData);
  const token = storageData.accessToken;

  const handleLogin = () => {
    if (getLoginData === null) {
      navigate("/login");
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      toast.error("Name field is required!");
    }
    // else if (selectedFile === null) {
    //   toast.error("Image file is required!");
    // }
    else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("short_name", short_name);
      formData.append("selectedFile", selectedFile);

      // for (var [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }
      // console.log("formData", formData.name);

      console.log(formData.get("name"));
      // console.log(formData.get("selectedFile").name);
      // return null;

      await axios
        .post(`${API_PUBLIC_URL}api/countries`, formData, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log(response);
          setName("");
          setShort_name("");
          setSelectedFile(null);

          toast.success("Successfully created!");
          navigate("/admin/countries");
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
            <h3>Country Create</h3>
          </div>
          <div>
            <form onSubmit={submitForm} encType="multipart/form-data">
              <div className="mb-3 row">
                <label className="form-label col-sm-3">Country Name</label>
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
                <label className="form-label col-sm-3">Short Name</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Short Name"
                    value={short_name}
                    onChange={(e) => setShort_name(e.target.value)}
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
                    name="selectedFile"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
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
