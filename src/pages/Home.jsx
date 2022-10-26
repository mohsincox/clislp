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

export default function Home() {
    return (
        <div className="main-wrapper">
            <div className="header-section ku-section">
                <div className="desktop-header d-xxl-block d-xl-block d-lg-block d-md-none d-sm-none d-none">
                    <Header/>
                </div>
                <div className="mobile-header d-xxl-none d-xl-none d-lg-none d-md-block d-sm-block d-block">
                    <MobileHeader />
                </div>
            </div>

            <div className="slider-section ku-section">
                <SlideShow/>
            </div>

            <hr/>
            <div className="fixtures-section ku-section">
                <Fixtures/>
            </div>
            <hr/>

            <div className="add-sponsor-section ku-section">
                <AddSponsor/>
            </div>
            <div className="dream-section ku-section">
                <Dream/>
            </div>
            <div className="latest-news-section ku-section">
                <LatestNews/>
            </div>

            <div className="footer-section ku-section">
                <Footer/>
            </div>
        </div>
    );
}
