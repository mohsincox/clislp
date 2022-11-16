import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import SlideShow from "./../components/SlideShow";
import Fixtures from "./../components/Fixtures";
import Matches from "../components/Matches";
import AddSponsor from "./../components/AddSponsor";
import Dream from "./../components/Dream";
import LatestNews from "../components/LatestNews";
import Footer from "../components/Footer";
import axios from "axios";
import { API_PUBLIC_URL } from "../constants";
import { useNavigate, useParams } from "react-router-dom";
import MobileHeader from "../components/MobileHeader";

export default function Page() {
  const [pageData, setPagesData] = useState({});
  const [fixed, setFixed] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);

    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      console.log("W height", windowHeight);
      windowHeight > 200 ? setFixed("fixed-top") : setFixed("");
    }
  };

  let navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      await axios.get(`${API_PUBLIC_URL}api/page/${id}`).then((response) => {
        setPagesData(response.data);
      });
    })();
  }, []);

  return (
    <div>
      <div className="header-section ku-section">
        <div
          className={`${fixed} desktop-header d-xxl-block d-xl-block d-lg-block d-md-none d-sm-none d-none`}
        >
          <Header fixed={fixed} />
        </div>
        <div
          className={`${fixed} mobile-header d-xxl-none d-xl-none d-lg-none d-md-block d-sm-block d-block`}
        >
          <MobileHeader />
        </div>
      </div>

      <div className="container mt-5 mb-5">
        <div
          className="page"
          style={{
            minHeight: "500px",
            width: "100%",
            border: "1px solid #ddd",
            padding: "20px",
          }}
        >
          <h1
            className="text-center mb-2 text-uppercase"
            // style={{ borderBottom: "2px solid #ddd" }}
          >
            {pageData.name}
          </h1>
          <hr />
          <div
            className="post__content"
            dangerouslySetInnerHTML={{ __html: pageData.content }}
          ></div>
        </div>
      </div>
      <div className="footer-section ku-section">
      <Footer />
      </div>
    </div>
  );
}
