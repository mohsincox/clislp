import React, {Component} from 'react';
import Header from "../components/Header";
import MobileHeader from "../components/MobileHeader";
import SlideShow from "../components/SlideShow";
import Fixtures from "../components/Fixtures";
import AddSponsor from "../components/AddSponsor";
import Dream from "../components/Dream";
import LatestNews from "../components/LatestNews";
import Footer from "../components/Footer";

class WebLayout extends Component {
    render() {
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

                {this.props.children}

                <div className="footer-section ku-section">
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default WebLayout;