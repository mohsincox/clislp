import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../App";
import {API_PUBLIC_URL} from "../constants";
import Header from "../components/Header";
import "./regStepOne.css";
import Footer from "../components/Footer";
import {toast} from "react-toastify";
import WebLayout from "../layouts/WebLayout";
import BasicTemplate from "./Template/BasicTemplate";
import { default as SelectedTeam } from '../components/ViewTeam'

const ViewTeam = () => {
    const [teamDetail, setTeamDetail] = useState([]);
    const navigate = useNavigate();

    const getLoginData = localStorage.getItem("loginData");
    useEffect(() => {
        if (getLoginData === null) {
            navigate("/register");
        } else {
            const data = JSON.parse(getLoginData);
            const token = data.accessToken;
            const userId = data.id;

            axios
                .get(`${API_PUBLIC_URL}api/ws-teams/view-detail/${userId}`, {
                    headers: {
                        Authorization: token,
                    },
                })
                .then((response) => {
                    setTeamDetail(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.status === 403) {
                        toast.error("No Permission");
                        // navigate("/");
                    }
                });
        }
    }, []);

    const {authUser, setAuthUser} = useContext(UserContext);
    // console.log("authUser", authUser);
    // console.log("authUser2", authUser.user.userrole);
    const logout = () => {
        localStorage.removeItem("loginData");
        navigate("/register");
        setAuthUser((previousState) => {
            return {...previousState, isLoggedIn: false};
        });
    };

    const submitForm = async (e) => {
        e.preventDefault();

        const data = JSON.parse(getLoginData);
        const token = data.accessToken;
        const userId = data.id;

        await axios
            .get(`${API_PUBLIC_URL}api/ws-teams/confirm/${userId}`, {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                toast.success("Confirm Successfully");
                navigate("/welcome-team");
            })
            .catch((error) => {
                console.log(error);
                if (error.response.status === 403) {
                    toast.error("No Permission");
                    // navigate("/");
                }
            });
    };


    return (
        <WebLayout>
            <div className="build-team-section ku-section section-top-required">

                <div className="container-fluid" style={{marginBottom: "15px"}}>
                    <BasicTemplate>
                        <div className="col-12 col-lg-8">
                            <div style={{marginTop: "15px"}} className="card-custom">
                                <ul id="progressbar">
                                    <li className="passed active" id="account">
                                        <center>Informations</center>
                                    </li>
                                    <li className="active" id="personal">
                                        <center>Tournaments</center>
                                    </li>
                                    <li id="confirm" className="active">
                                        <center>Build Team</center>
                                    </li>
                                </ul>
                            </div>

                            <div className="build-team-area-area basic-temp-main-content-area p-3 p-sm-3 p-md-3 p-lg-5 p-xl-5">
                                <div className="row">
                                    <center>
                                        <h5>Your Selected Team</h5>
                                    </center>

                                    <form onSubmit={submitForm}>

                                        <div className="build-player-list-single-item">
                                            {teamDetail.map(({player}, index) => (<React.Fragment key={player.id}>
                                                {
                                                    <SelectedTeam player={player} key={player.id}/>
                                                }
                                            </React.Fragment>))}
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary ku-c-button"
                                            style={{borderRadius: "0px", float: "right"}}
                                        >
                                            Confirm Team
                                        </button>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </BasicTemplate>
                </div>
            </div>

        </WebLayout>
    );
};

export default ViewTeam;
