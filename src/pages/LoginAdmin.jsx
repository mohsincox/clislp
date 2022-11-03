import axios from "axios";
import React, { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../constants";
import WebLayout from "../layouts/WebLayout";
import {Input} from "antd";
import EyeTwoTone from "@ant-design/icons/lib/icons/EyeTwoTone";
import EyeInvisibleOutlined from "@ant-design/icons/lib/icons/EyeInvisibleOutlined";

function LoginAdmin() {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (formValues.email.trim() === "") {
      toast.error("Email is required!");
    } else if (!regex.test(formValues.email)) {
      toast.error("Not valid email format!");
    } else if (formValues.password === "") {
      toast.error("Password is required!");
    } else {
      setFormErrors(validate(formValues));
      setIsSubmit(true);
    }
  };

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
        .then((res) => navigate("/admin"))
        .catch((err) => {
          navigate("/admin-login");
        });
    }
  }, []);

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      handleLogin();
    }
  }, [formErrors]);

  const handleLogin = () => {
    axios
      .post(`${API_PUBLIC_URL}api/auth/signin`, formValues)
      .then((response) => {
        console.log("response", response);
        console.log("response.data", response.data);
        // localStorage.setItem("token", user.data.accessToken);
        localStorage.setItem("loginData", JSON.stringify(response.data));
        console.log("user is successfully login");
        // navigate("/admin");
        window.location.href = "/admin";
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          toast.error(error.response.data.msg);
        }
        navigate("/admin-login");
      });
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };



  return (
      <WebLayout>
        <div className="registration-section ku-section section-top-required mb-5">
          <div className="container" style={{ marginBottom: "15px" }}>
            <div className="row">
              <div className="col-lg-6 offset-lg-3">
                <div className="login-area basic-temp-main-content-area p-3 p-sm-3 p-md-3 p-lg-5 p-xl-5">
                  <h2 className="text-center text-uppercase mb-4" style={{color: "#C50B0E"}}>Login to Play11</h2>
                  <form onSubmit={handleSubmit} className="mt-3">
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
                    </div>

                    <div className="d-flex justify-content-center align-items-center mt-5">
                      <button
                          type="submit"
                          className="btn btn-lg ku-c-button"
                          style={{ borderRadius: "0px", minWidth: "200px" }}
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WebLayout>
  );
}

export default LoginAdmin;
