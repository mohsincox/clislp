import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function WelcomeTeam() {
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
          <div className="col-sm-8">
            <div style={{ marginTop: "50px", textAlign: "center" }}>
              <img src={require("../images/user.png")} alt="" width={"100px"} />
              <p>
                Your Team has been Confirmed
                <br />
                For Asia Cup 2022.
              </p>
              <p style={{ fontSize: "25px" }}>Best of Luck</p>
            </div>
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
      <Footer />
    </>
  );
}
