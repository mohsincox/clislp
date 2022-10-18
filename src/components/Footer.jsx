import React from "react";
import "./footer.css";
import RegisterWidget from "./RegisterWidget";

export default function Footer() {
  return (
    <>
      <div
        className="container-fluid"
        style={{ background: "#2E2E2E", color: "#FFFFFF" }}
      >

        <div className="container">
          <div className="row p-5">
            <div className="col-md-6">
              <h1 className="text-white">SL PLAY 11...</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                eu turpis molestie, dictum est a, mattis tellus. Sed dignissim,
                metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                interdum tellus elit sed risus.{" "}
              </p>

              {/* <i className="fa fa-car"></i>
              <i className="fa fa-car" style={{ fontSize: "48px" }}></i>
              <i
                className="fa fa-car"
                style={{ fontSize: "60px", color: "red" }}
              ></i> */}

              {/* <div className="social-media">
                <ul className="list-inline">
                  <li>
                    <a href="http://www.nextbootstrap.com/" title="">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="http://www.nextbootstrap.com/" title="">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="http://www.nextbootstrap.com/" title="">
                      <i className="fa fa-google-plus"></i>
                    </a>
                  </li>
                  <li>
                    <a href="http://www.nextbootstrap.com/" title="">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div> */}

              <div className="col item social">
                <a href="/">
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="/">
                  <i className="fa fa-twitter"></i>
                </a>
                <a href="/">
                  <i className="fa fa-youtube"></i>
                </a>
                <a href="/">
                  <i className="fa fa-linkedin"></i>
                </a>
                <a href="/">
                  <i className="fa fa-instagram"></i>
                </a>
              </div>
            </div>
            <div className="col-md-2">
              <p>INFORMATION</p>
              <span>
                About Us
                <br />
                Warranty Policy
                <br />
                Term & Conditions
                <br />
                Privacy Policy
                <br />
                Legal Documents
                <br />
                FAQ
                <br />
                Career
                <br />
                Return Policy
              </span>
              {/* <ul>
                <li>About Us</li>
                <li>Warranty Policy</li>
                <li>Term & Conditions</li>
                <li>Privacy Policy</li>
                <li>Legal Documents</li>
                <li>FAQ</li>
                <li>Career</li>
                <li>Return Policy</li>
              </ul> */}
            </div>
            <div className="col-md-2">
              <p>QUICK LINKS</p>
              <span>
                Home
                <br />
                Tournament
                <br />
                Teams
                <br />
                Fixtures
                <br />
                Ranking
                <br />
                Contact
                <br />
              </span>
            </div>
            <div className="col-md-2">
              <p>CONTACT</p>
              <p style={{ marginBottom: "5px" }}>
                <b>Address:</b>
                <br />
                <span style={{ fontSize: "13px" }}>
                  Corporate Office: Road no-1A, House No-32, Baridhara J Block,
                  Dhaka.
                </span>
              </p>

              <p style={{ marginBottom: "5px" }}>
                <b>Phone:</b>
                <br />
                <span style={{ fontSize: "13px" }}>+880 9678-161161</span>
                <br />
                <span style={{ fontSize: "13px" }}>
                  (Saturday to Thursday, 9:30 AM to 6:30 PM).
                </span>
              </p>

              <p style={{ marginBottom: "5px" }}>
                <b>Email:</b>
                <br />
                <span style={{ fontSize: "13px" }}>support@shoplover.com</span>
              </p>
            </div>
          </div>
        </div>

      </div>

      <div
        className="container-fluid"
        style={{ background: "black", color: "#FFFFFF", padding: "10px" }}
      >
        <div className="container">
          <p>© Copyright 2022 I All Rights Reserved by Shoplover.com </p>
        </div>
      </div>
    </>
  );
}
