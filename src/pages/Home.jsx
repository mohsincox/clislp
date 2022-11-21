import React from "react";
import Header from "./../components/Header";
import SlideShow from "./../components/SlideShow";
import Fixtures from "./../components/Fixtures";
import Matches from "../components/Matches";
import AddSponsor from "./../components/AddSponsor";
import Dream from "./../components/Dream";
import LatestNews from "../components/LatestNews";
import Footer from "../components/Footer";
import MobileHeader from "../components/MobileHeader";
import WebLayout from "../layouts/WebLayout";

export default function Home() {
    return (
        <WebLayout>
            <div className="slider-section ku-section">
                <SlideShow/>
            </div>
            {/* <hr className="mt-3"/> */}
            <div className="fixtures-section ku-section">
                <Fixtures/>
            </div>
            {/* <hr  /> */}
            <div className="add-sponsor-section ku-section">
                <AddSponsor/>
            </div>
            <div className="dream-section ku-section">
                <Dream/>
            </div>
            <div className="latest-news-section ku-section">
                <LatestNews/>
            </div>
        </WebLayout>
    );
}
