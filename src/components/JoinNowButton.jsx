import React, {useContext, useState} from "react";
import {NavDropdown} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import useUserHook from "../Hooks/useUserHook";
import {UserContext} from "../App";


const getLoginData = localStorage.getItem("loginData");


const JoinNowButton = () => {

    const { authUser, setAuthUser } = useContext(UserContext);

    const [user, setUser] = useUserHook();



    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("loginData");
        navigate("/register");
        setAuthUser((previousState) => {
            return {...previousState, isLoggedIn: false};
        });
    };

    console.log(user)
    return <div className="join-now">
        {

            true ? <div className="join-title">
                <Link to="/register">Join Now</Link> </div> :
                (
                    <NavDropdown
                        title={
                            <div style={{display: "inline-block"}}>
                                <img
                                    src={require("../images/user.png")}
                                    alt=""
                                    width={"30px"}
                                />
                            {user.name}
                            </div>
                        }
                        id="basic-nav-dropdown"
                    >
                        <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                        <NavDropdown.Item>
                            {" "}
                            <Link to="/my-team" style={{textDecoration: "none", color: "#000"}}>
                                My Team &nbsp;&nbsp;&nbsp;
                            </Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                )

        }
    </div>

}


export default JoinNowButton;