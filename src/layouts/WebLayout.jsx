import React, { Component, useEffect } from "react";
import Header from "../components/Header";
import MobileHeader from "../components/MobileHeader";
import SlideShow from "../components/SlideShow";
import Fixtures from "../components/Fixtures";
import AddSponsor from "../components/AddSponsor";
import Dream from "../components/Dream";
import LatestNews from "../components/LatestNews";
import Footer from "../components/Footer";
import { useState } from "react";

const WebLayout = (props) => {
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
      windowHeight > 200 ? setFixed("fixed-top") : setFixed("");
    }
  };

  return (
    <div className="main-wrapper">
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

      {props.children}

      <div className="footer-section ku-section">
        <Footer />
      </div>
    </div>
  );
};

export default WebLayout;
