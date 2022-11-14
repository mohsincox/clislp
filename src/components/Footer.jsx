import React, { useEffect, useState } from "react";
import "./footer.css";
import RegisterWidget from "./RegisterWidget";
import axios from "axios";
import { API_PUBLIC_URL } from "../constants";
import logo from "../logo.svg";

export default function Footer() {
  const [pagesData, setPagesData] = useState([]);
  useEffect(() => {
    (async () => {
      await axios.get(`${API_PUBLIC_URL}api/page`).then((response) => {
        setPagesData(response.data);
      });
    })();
  }, []);

  return (
    <>
      <div
        className="container-fluid"
        style={{ background: "#141527", color: "#FFFFFF" }}
      >
        <div className="wrapper">
          <div className="row p-md-5 p-sm-2">
            <div className="col-md-6">
              <img
                src={logo}
                alt=""
                className="mb-2"
                style={{ width: "20%" }}
              />
              <p>
                The fight for excellence of sports has begun. Shoplover brings
                Shoplover Play 11 Football & Cricket fantasy game to increase
                the excitement of sports lovers. Come to these dream fields now
                with your dream team to experience the full-on craze of your
                favourite sports.
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
                <a
                  href="https://www.facebook.com/shoplover.ecommerce"
                  target="_blank"
                >
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="https://twitter.com/ShoploverBD" target="_blank">
                  <i className="fa fa-twitter"></i>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCsjWm-rGA3WSHo3kjsW-EDA"
                  target="_blank"
                >
                  <i className="fa fa-youtube"></i>
                </a>
                <a
                  href="https://www.linkedin.com/company/77150386"
                  target="_blank"
                >
                  <i className="fa fa-linkedin"></i>
                </a>
                <a
                  href="https://www.instagram.com/shoplover.ecommerce/"
                  target="_blank"
                >
                  <i className="fa fa-instagram"></i>
                </a>
              </div>
            </div>
            <div className="col-md-2">
              <p>INFORMATION</p>
              <ul
                style={{
                  listStyle: "none",
                  color: "#fff",
                  padding: "0px",
                  margin: "0px",
                }}
              >
                {pagesData.map((page) => (
                  <li style={{ marginBottom: "3px" }} key={page.id}>
                    <a
                      style={{ color: "#fff", textDecoration: "none" }}
                      href={`/pages/${page.slug}`}
                    >
                      {page.name}
                    </a>
                  </li>
                ))}
              </ul>
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
                <a
                  href="/login"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  Login
                </a>
                <br />
              </span>
            </div>
            <div className="col-md-2">
              <p>CONTACT</p>
              <p style={{ marginBottom: "5px" }}>
                <b>Address:</b>
                <br />
                <span style={{ fontSize: "13px" }}>
                  Corporate Office: Road No-1A, House No-32, Baridhara J Block,
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
        style={{ background: "#36384D", color: "#FFFFFF", padding: "10px" }}
      >
        <div className="container">
          <p className="text-center m-0">
            © Copyright 2022 I All Rights Reserved by Shoplover.com{" "}
          </p>
        </div>
      </div>
    </>
  );
}
