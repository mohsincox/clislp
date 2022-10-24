import { useContext, useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import logo from '../logo.svg';
import header from './header.css';
import JoinNowButton  from './JoinNowButton'

function Header() {
    const navigate = useNavigate();

    const { authUser, setAuthUser } = useContext(UserContext);
    const [name, setName] = useState("");

    const getLoginData = localStorage.getItem("loginData");


    useEffect(() => {
        if (getLoginData === null) {
        } else {
            const data = JSON.parse(getLoginData);
            const token = data.accessToken;
            const nameUser = data.name;
            setName(nameUser);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("loginData");
        navigate("/register");
        setAuthUser((previousState) => {
            return { ...previousState, isLoggedIn: false };
        });
    };

    return (
        <div className="header-container d-flex justify-content-between align-items-center">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="header" />
                </Link>
            </div>
            <div className="main-menu">
                <ul>
                    <li className="active"><Link to="/">HOME</Link></li>
                    <li><Link to="/game-tournaments">TOURNAMENTS</Link></li>
                    <li><Link to="/ranking">RANKINGS</Link></li>
                    <li><Link to="/contact">CONTACT</Link></li>
                </ul>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto me-3">
                        <NavLink className="nav-link" to="/"></NavLink>
                        <NavLink className="nav-link" to=""></NavLink>
                        <NavLink className="nav-link" to=""></NavLink>
                    </Nav>
                </Navbar.Collapse>
            </div>
            <JoinNowButton />
        </div>

    );
}

export default Header;