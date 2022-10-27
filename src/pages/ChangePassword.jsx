import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { API_PUBLIC_URL } from "../constants";

export default function ChangePassword() {
  const [email, setEmail] = useState("");
  const [old_password, setOld_password] = useState("");
  const [new_password, setNew_password] = useState("");
  const [confirm_password, setConfirm_password] = useState("");

  const navigate = useNavigate();
  const getLoginData = localStorage.getItem("loginData");

  useEffect(() => {
    if (getLoginData === null) {
      navigate("/register");
    } else {
      const data = JSON.parse(getLoginData);
      const authEmail = data.email;
      setEmail(authEmail);
    }
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      toast.error("Email is required!");
    } else if (old_password.trim() === "") {
      toast.error("Old Password field is required!");
    } else if (new_password.trim() === "") {
      toast.error("New Password field is required!");
    } else if (new_password.length < 6) {
      toast.error("New Password must be at least 6 characters!");
    } else if (confirm_password.trim() === "") {
      toast.error("Confirm Password field is required!");
    } else if (new_password.trim() !== confirm_password.trim()) {
      toast.error("New Password and Confirm Password must be same");
    } else {
      const postBody = {
        email: email,
        old_password: old_password,
        new_password: new_password,
      };

      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .post(`${API_PUBLIC_URL}api/auth-users/change-password`, postBody, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log(response);
          setEmail("");
          setOld_password("");
          setNew_password("");
          setConfirm_password("");

          toast.success("Password change successfully");
          navigate("/");
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
          }
        });
    }
  };

  return (
    <>
      <Header />
      <hr />
      <div className="container-fluid" style={{ marginBottom: "15px" }}>
        <div className="row">
          <div className="col-sm-2 d-none d-sm-block">
            <img
              src={require("../images/add_spon_dr_side.png")}
              alt=""
              width={"200px"}
            />
          </div>

          <div className="col-sm-6 offset-sm-1">
            <div style={{ marginTop: "50px" }}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Change Password</h5>
                  <form onSubmit={submitForm}>
                    <div className="mb-3 row">
                      <label className="form-label col-sm-4">
                        Old Password <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className="col-sm-8">
                        <input
                          className="form-control"
                          type="password"
                          placeholder="Enter Old Password"
                          value={old_password}
                          name="old_password"
                          onChange={(e) => setOld_password(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="form-label col-sm-4">
                        New Password <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className="col-sm-8">
                        <input
                          className="form-control"
                          type="password"
                          placeholder="Enter New Password"
                          value={new_password}
                          name="new_password"
                          onChange={(e) => setNew_password(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mb-3 row">
                      <label className="form-label col-sm-4">
                        Confirm Password{" "}
                        <span style={{ color: "#ff0000" }}>*</span>
                      </label>
                      <div className="col-sm-8">
                        <input
                          className="form-control"
                          type="password"
                          placeholder="Enter Confirm Password"
                          value={confirm_password}
                          name="confirm_password"
                          onChange={(e) => setConfirm_password(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="float-end">
                      <button
                        className="btn btn-danger me-3"
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={submitForm}
                      >
                        Change Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-1"></div>
          <div className="col-sm-2 d-none d-sm-block">
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
