import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../constants";

import WebLayout from "../layouts/WebLayout";
import { Input, Select } from "antd";
import EyeTwoTone from "@ant-design/icons/lib/icons/EyeTwoTone";
import EyeInvisibleOutlined from "@ant-design/icons/lib/icons/EyeInvisibleOutlined";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import RegisterWidget from "../components/RegisterWidget";
import BasicTemplate from "./Template/BasicTemplate";

function Register() {
  const { Option } = Select;
  const initialValues = {
    name: "",
    email: "",
    password: "",
    // confirmPassword: "",
    phone_number: "",
    gender: "",
    age: "",
    policy: false,
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState();

  // const CarState = {
  //   Active: "",
  // };

  // const [carActive, setCarActive] = useState(CarState);

  // const carStatus = (e) => {
  //   const { checked } = e.target;

  //   console.log("checked " + checked);

  //   setCarActive((carActive) => ({
  //     ...carActive,
  //     Active: checked,
  //   }));
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "policy") {
      setFormValues((prevState) => {
        let newFormValues = { ...prevState };
        newFormValues[name] = !prevState[name];
        return newFormValues;
      });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleGender = (value) => {
    setFormValues({ ...formValues, ["gender"]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (formValues.name.trim() === "") {
      toast.error("Name is required!");
    } else if (formValues.email.trim() === "") {
      toast.error("Email is required!");
    } else if (!regex.test(formValues.email)) {
      toast.error("Not valid email format!");
    } else if (formValues.gender === "") {
      toast.error("Gender is required!");
    } else if (formValues.age === "") {
      toast.error("Age is required!");
    } else if (formValues.password === "") {
      toast.error("Password is required!");
    } else if (formValues.password.length < 6) {
      toast.error("Password must be at least 6 characters");
    } else if (formValues.policy === false) {
      toast.error("Policy is required!");
    } else {
      setFormErrors(validate(formValues));
      setIsSubmit(true);
    }
  };

  // useEffect(() => {
  //   const getLoginData = localStorage.getItem("loginData");

  //   if (getLoginData !== null) {
  //     const data = JSON.parse(getLoginData);
  //     const token = data.accessToken;

  //     axios
  //       .get(`${API_PUBLIC_URL}api/users`, {
  //         headers: {
  //           Authorization: token,
  //         },
  //       })
  //       .then((response) => navigate("/tournament"))
  //       .catch((error) => {
  //         navigate("/register");
  //       });
  //   }
  // }, []);

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const getLoginData = localStorage.getItem("loginData");
    if (getLoginData !== null) {
      const data = JSON.parse(getLoginData);
      const token = data.accessToken;
      axios
        .get(`${API_PUBLIC_URL}api/ws-sliders`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => navigate("/"))
        .catch((err) => {
          navigate("/register");
        });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("formValues", formValues);

      console.log(formValues.email);

      handleRegister();
    }
  }, [formErrors]);

  const handleRegister = () => {
    // console.log("formValues", formValues);

    if (image !== null) {
      const validExtensions = ["png", "jpeg", "jpg", "gif"];
      const fileExtension = image.type.split("/")[1];
      const exist = validExtensions.includes(fileExtension);
      if (!exist) {
        toast.error(
          "Please give proper image format (Ex. png, jpeg, jpg, gif)"
        );
        return;
      }
    }

    var form_data = new FormData();

    for (var key in formValues) {
      form_data.append(key, formValues[key]);
    }

    form_data.append("image", image);

    // return;

    axios
      .post(`${API_PUBLIC_URL}api/auth/signup`, form_data)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("loginData", JSON.stringify(response.data));
        console.log("user is successfully login");
        navigate("/tournament");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          toast.error(error.response.data.msg);
        }
        navigate("/register");
      });
  };

  const validate = (values) => {
    const errors = {};
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // if (!values.name) {
    //   errors.name = "Name is required!";
    // }
    // if (!values.email) {
    //   errors.email = "Email is required!";
    // } else if (!regex.test(values.email)) {
    //   errors.email = "This is not a valid email format!";
    // }
    // if (!values.password) {
    //   errors.password = "Password is required";
    // } else if (values.password.length < 6) {
    //   errors.password = "Password must be at least 6 characters";
    // }

    // if (!values.confirmPassword) {
    //   errors.confirmPassword = "Confirm Password is required";
    // } else if (values.password !== values.confirmPassword) {
    //   errors.confirmPassword = "Password and Confirm Password does not match.";
    // }

    // if (!values.policy) {
    //   errors.policy = "Policy is required!";
    // }

    return errors;
  };

  // for upload iamge
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    setLoading(true);
    getBase64(file, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
    setImage(file);
    return false;
  };

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const handleUploadChange = (info) => {
    console.log(info, info.file.status);
    getBase64(info.file.originFileObj, (url) => {
      setLoading(false);
      setImageUrl(url);
    });
    return;
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <WebLayout>
      <div className="registration-section ku-section section-top-required">
        <div className="container-fluid" style={{ marginBottom: "15px" }}>
          <BasicTemplate>
            <div className="col-lg-8">
              <div style={{ marginTop: "15px" }} className="card-custom">
                <ul id="progressbar">
                  <li className="active" id="account">
                    <center>Informations</center>
                  </li>
                  <li id="personal">
                    <center>Tournaments</center>
                  </li>
                  <li id="confirm">
                    <center>Build Team</center>
                  </li>
                </ul>
              </div>
              <div className="registration-area basic-temp-main-content-area p-3 p-sm-3 p-md-3 p-lg-5 p-xl-5">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="regi-left">
                        <div className="mb-3">
                          <label className="form-label">Name</label>
                          <Input
                            size="large"
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formValues.name}
                            onChange={handleChange}
                          />
                          {/* <p className="text-danger">{formErrors.name}</p> */}
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Email address</label>

                          <Input
                            size="large"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formValues.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            className="form-label"
                            style={{ color: "#176AFC", fontWeight: 500 }}
                          >
                            Phone Number
                          </label>
                          <Input
                            size="large"
                            type="text"
                            name="phone_number"
                            placeholder="Phone Number"
                            value={formValues.phone_number}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="row">
                          <div className="mb-3 col-sm-6 col-6">
                            <label className="form-label">Gender</label>
                            <Select
                              size="large"
                              name="gender"
                              value={formValues.gender}
                              onChange={handleGender}
                              style={{ width: "100%" }}
                            >
                              <Option value="" disabled>
                                Please Select One
                              </Option>
                              <Option value="Male"></Option>
                              <Option value="Female"></Option>
                            </Select>
                          </div>

                          <div className="mb-3 col-sm-6 col-6">
                            <label className="form-label">Age</label>
                            <Input
                              size="large"
                              type="text"
                              name="age"
                              placeholder="Age"
                              value={formValues.age}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Password</label>

                          <Input.Password
                            size="large"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formValues.password}
                            onChange={handleChange}
                            iconRender={(visible) =>
                              visible ? (
                                <EyeTwoTone twoToneColor="#C50B0E" />
                              ) : (
                                <EyeInvisibleOutlined />
                              )
                            }
                          />

                          {/* <p className="text-danger">{formErrors.password}</p> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="regi-right">
                        <div className="mb-3">
                          <label className="form-label">
                            Upload Your Profile Picture
                          </label>
                          <div className="text-center">
                            <Upload
                              size="large"
                              name="avatar"
                              listType="picture-card"
                              className="avatar-uploader"
                              showUploadList={false}
                              beforeUpload={beforeUpload}
                            >
                              {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt="avatar"
                                  style={{
                                    width: "100%",
                                  }}
                                />
                              ) : (
                                uploadButton
                              )}
                            </Upload>
                          </div>
                        </div>
                        <div className="mb-3 form-check mt-3">
                          <label className="form-check-label privacy-policy">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              name="policy"
                              value={formValues.policy}
                              checked={formValues.policy}
                              onChange={handleChange}
                            />
                            <p>I accept the terms and privacy policy</p>
                          </label>
                          {/* <p className="text-danger">{formErrors.policy}</p> */}
                        </div>
                        <div className="d-grid gap-2">
                          <button
                            type="submit"
                            className="btn btn-lg"
                            style={{ borderRadius: "0px" }}
                          >
                            Continue
                          </button>
                        </div>
                        <p className="mt-3 text-center">
                          If you already have an account,{" "}
                          <Link to={`/login`}> Login </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </BasicTemplate>
        </div>
      </div>
    </WebLayout>
  );
}

export default Register;
