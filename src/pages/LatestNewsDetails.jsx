import React, {useEffect, useState} from "react";
import Header from "./../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import {API_PUBLIC_URL} from "../constants";
import {useNavigate, useParams} from "react-router-dom";
import MobileHeader from "../components/MobileHeader";

export default function LatestNewsDetails() {

    let navigate = useNavigate();
    const {id} = useParams();

    const [fixed, setFixed] = useState("");
    const [newsDetails, setNewsDetails] = useState([]);
    let contentMaxLength = 200;
    useEffect(() => {
        (async () => {
            await axios.get(`${API_PUBLIC_URL}api/ws-news/${id}`, {})
                .then((response) => {
                    console.log(response.data);
                    setNewsDetails(response.data);
                }).catch((error) => {
                    console.log(error);
                });
        })();
    }, []);

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



    return (
        <div>
            <div className="header-section ku-section">
                <div
                    className={`${fixed} desktop-header d-xxl-block d-xl-block d-lg-block d-md-none d-sm-none d-none`}
                >
                    <Header fixed={fixed}/>
                </div>
                <div
                    className={`${fixed} mobile-header d-xxl-none d-xl-none d-lg-none d-md-block d-sm-block d-block`}
                >
                    <MobileHeader/>
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
                    <h4
                        className="m-0 text-uppercase"
                    >
                        {newsDetails.title}
                    </h4>
                    <h6
                        className="mb-2 pb-3 text-uppercase m-0 text-danger"
                        style={{ borderBottom: "2px solid #ddd" }}
                    >
                        {newsDetails.tournament?.name}
                    </h6>
                    <div>
                        <img
                            src={`${API_PUBLIC_URL}${newsDetails.image}`}
                            alt="news"
                            style={{width: "100%", height: "100%"}}
                        />
                    </div>

                    <div
                        className="post__content"
                        dangerouslySetInnerHTML={{ __html: newsDetails.body }}
                    ></div>


                </div>
            </div>
            <div className="footer-section ku-section">
                <Footer/>
            </div>
        </div>
    );
}
