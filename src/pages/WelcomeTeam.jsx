import React, {useEffect, useState} from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import WebLayout from "../layouts/WebLayout";
import BasicTemplate from "./Template/BasicTemplate";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import Avatar from "antd/es/avatar";
import congratulationGif from  "../images/congratulation.gif";

export default function WelcomeTeam() {
    let [conGif, setConGif] = useState(congratulationGif);

    useEffect(() => {
        setTimeout(function() {
            setConGif(null);
        }, 2000);
    })
    return (
        <WebLayout>
            <div className="build-team-section ku-section section-top-required">

                <div className="container-fluid" style={{marginBottom: "15px"}}>
                    <BasicTemplate>
                        <div className="col-12 col-lg-8">
                            <div className="welcome-team-area basic-temp-main-content-area p-3 p-sm-3 p-md-3 p-lg-5 p-xl-5 bg-transparent">
                                <div style={{marginTop: "50px", textAlign: "center", background: `url(${conGif})`}}>
                                    <Avatar size={150} icon={<UserOutlined />} />
                                    <p className="mt-5">
                                        Your Team has been Confirmed
                                        <br/>
                                        For Asia Cup 2022.
                                    </p>
                                    <h4>Best of Luck</h4>
                                </div>
                            </div>
                        </div>
                    </BasicTemplate>
                </div>

            </div>


        </WebLayout>
    );
}
