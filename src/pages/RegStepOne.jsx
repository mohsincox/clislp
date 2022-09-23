import React from "react";
import Header from "../components/Header";
import "./regStepOne.css";

export default function RegStepOne() {
  return (
    <>
      <Header />
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
      <div className="container-fluid" style={{ marginBottom: "15px" }}>
        <div className="row">
          <div className="col-sm-2 d-none d-sm-block">
            <img
              src={require("../images/add_spon_dr_side.png")}
              alt=""
              width={"200px"}
            />
          </div>
          <div className="col-sm-8">
            <form>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" />
              </div>

              <div className="row">
                <div className="mb-3 col-sm-6 col-6">
                  <label className="form-label">Gender</label>
                  <select className="form-select" defaultValue="">
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="mb-3 col-sm-6 col-6">
                  <label className="form-label">Age</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input type="text" className="form-control" />
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" />
                <label className="form-check-label">
                  I accept the terms and privacy policy
                </label>
              </div>
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
          </div>
          <div className="col-sm-2 d-none d-sm-block">
            <img
              src={require("../images/add_spon_dr_side.png")}
              alt=""
              width={"200px"}
            />
          </div>
        </div>
      </div>
    </>
  );
}
