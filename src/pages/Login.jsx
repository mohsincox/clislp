import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../constants";

function Login() {
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
        .then((res) => navigate("/"))
        .catch((err) => {
          navigate("/login");
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
        // navigate("/");
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          toast.error(error.response.data.msg);
        }
        navigate("/login");
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
    <div className="container mt-5">
      <div className="col-sm-6 offset-sm-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Login</h5>

            <center>
              {" "}
              <img
                src={require("../images/sl_logo.png")}
                alt="logo"
                width={"200px"}
                height={"70px"}
              />
            </center>
            {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Signed in successfully</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )} */}

            <form onSubmit={handleSubmit} className="mt-3">
              <div className="mb-3 row">
                <label className="form-label col-sm-3">
                  Email <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formValues.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* <p>{formErrors.email}</p> */}
              <div className="mb-3 row">
                <label className="form-label col-sm-3">
                  Password<span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formValues.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* <p>{formErrors.password}</p> */}
              <div className="float-end">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
