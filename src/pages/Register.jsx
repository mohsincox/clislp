import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../constants";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Register() {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    // confirmPassword: "",
    phone_number: "",
    gender: "",
    age: "",
    policy: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

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
    setFormValues({ ...formValues, [name]: value });
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
    } else if (formValues.password === "") {
      toast.error("Password is required!");
    } else if (formValues.password.length < 6) {
      toast.error("Password must be at least 6 characters");
    } else if (formValues.policy === "") {
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
        .then((res) => navigate("/tournament"))
        .catch((err) => {
          navigate("/register");
        });
    }
  }, []);

  useEffect(() => {
    console.log("formErrors", formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("formValues", formValues);

      console.log(formValues.email);

      handleRegister();
    }
  }, [formErrors]);

  const handleRegister = () => {
    axios
      .post(`${API_PUBLIC_URL}api/auth/signup`, formValues)
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

  return (
    <>
      {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Signed in successfully</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )} */}
      <Header />
      {/* <div style={{ marginTop: "15px" }} className="card-custom">
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
      <hr /> */}
      <div className="container-fluid" style={{ marginBottom: "15px" }}>
        <div className="row">
          <div className="col-sm-2 d-none d-sm-block mt-3">
            <img
              src={require("../images/add_spon_dr_side.png")}
              alt=""
              width={"200px"}
            />
          </div>
          <div className="col-sm-8">
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
            <hr />
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">
                  Name <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Name"
                  value={formValues.name}
                  onChange={handleChange}
                />
                {/* <p className="text-danger">{formErrors.name}</p> */}
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Email address <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={formValues.email}
                  onChange={handleChange}
                />
                {/* <p className="text-danger">{formErrors.email}</p> */}
              </div>

              <div className="row">
                <div className="mb-3 col-sm-6 col-6">
                  <label className="form-label">Gender</label>
                  <select
                    className="form-select"
                    name="gender"
                    value={formValues.gender}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="mb-3 col-sm-6 col-6">
                  <label className="form-label">Age</label>
                  <input
                    type="text"
                    className="form-control"
                    name="age"
                    placeholder="Age"
                    value={formValues.age}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Password <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={formValues.password}
                  onChange={handleChange}
                />
                {/* <p className="text-danger">{formErrors.password}</p> */}
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone_number"
                  placeholder="Phone Number"
                  value={formValues.phone_number}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="policy"
                  // value={formValues.policy}
                  checked={formValues.policy}
                  onChange={handleChange}
                />
                <label className="form-check-label">
                  I accept the terms and privacy policy{" "}
                  <span style={{ color: "#ff0000" }}>*</span>
                </label>
                {/* <p className="text-danger">{formErrors.policy}</p> */}
              </div>

              {/* <br />
              <br />
              <br />
              <br />

              <input
                type="checkbox"
                name="status"
                // value="status"
                value={formValues.status}
                checked={carActive.Active}
                onChange={carStatus}
              /> */}

              <div className="d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ borderRadius: "0px" }}
                >
                  Continue
                </button>
              </div>
            </form>
            <p>
              If you already have an account, <Link to={`/login`}> Login </Link>
            </p>
          </div>
          <div className="col-sm-2 d-none d-sm-block mt-3">
            <img
              src={require("../images/add_spon_dr_side.png")}
              alt=""
              width={"200px"}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
