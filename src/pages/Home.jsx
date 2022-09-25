import React from "react";
import Header from "./../components/Header";
import SlideShow from "./../components/SlideShow";
import Fixtures from "./../components/Fixtures";
import Matches from "../components/Matches";
import AddSponsor from "./../components/AddSponsor";
import Dream from "./../components/Dream";
import LatestNews from "../components/LatestNews";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <SlideShow />
      <Fixtures />
      <hr />
      {/* <Matches />
      <hr /> */}
      <AddSponsor />
      <Dream />
      <LatestNews />
      <Footer />
    </div>
  );
}
