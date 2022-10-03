import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function CountryEdit() {
  const [name, setName] = useState("");
  const [short_name, setShort_name] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState();
  const [im, setIm] = useState("");
  let navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    handleLogin();
    getCountryDetails();
  }, []);

  const getLoginData = localStorage.getItem("loginData");

  const storageData = JSON.parse(getLoginData);
  const token = storageData.accessToken;

  const getCountryDetails = () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .get(`${API_PUBLIC_URL}api/countries/${id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            // setFormValues({
            //   ...formValues,
            //   name: response.data.name,
            //   detail: response.data.detail,
            // });
            setName(response.data.name);
            setShort_name(response.data.short_name);
            setIm(response.data.flag);
            console.log(response.data);
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

    if (selectedFile !== null) {
      const validExtensions = ["png", "jpeg", "jpg", "gif"];
      const fileExtension = selectedFile.type.split("/")[1];
      const exist = validExtensions.includes(fileExtension);
      if (!exist) {
        toast.error("Please give proper image format");
        return;
      }
    }

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
        .put(`${API_PUBLIC_URL}api/countries/${id}`, formData, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log(response);
          setName("");
          setShort_name("");
          setSelectedFile(null);

          toast.success("Updated Successfully");
          navigate("/admin/countries");
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
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  return (
    <>
      <div className="container mt-2">
        <div className="col-sm-8 offset-sm-2">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Country Edit</h5>
              <form onSubmit={submitForm} encType="multipart/form-data">
                <div className="mb-3 row">
                  <label className="form-label col-sm-3">
                    Country Name <span style={{ color: "#ff0000" }}>*</span>
                  </label>
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
                      type="type"
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
                      // onChange={(e) => setSelectedFile(e.target.files[0])}
                      onChange={onSelectFile}
                    />

                    <div style={{ marginTop: "10px" }}>
                      {selectedFile ? (
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
                      navigate("/admin/countries");
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
