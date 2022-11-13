import { useContext, useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import logo from "../logo.svg";
import header from "./header.css";
import JoinNowButton from "./JoinNowButton";
import { Dropdown, Menu, Space } from "antd";
import Avatar from "antd/es/avatar";
import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";
import { now } from "underscore";
import user from "../images/user.png";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import useUserHook from "../Hooks/useUserHook";
import { API_PUBLIC_URL } from "../constants";

function Header(props) {
  const navigate = useNavigate();

  const { authUser, setAuthUser } = useContext(UserContext);
  const [name, setName] = useState("");
  let currentPath = window.location.pathname;

  let [userInfo] = useUserHook();

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

  const menu = (
    <Menu
      items={[
        {
          label: (
            <Link to="#" style={{ textDecoration: "none", color: "#000" }}>
              {name}
            </Link>
          ),
          key: "1",
        },
        {
          type: "divider",
        },
        {
          label: (
            <Link
              to="/my-team"
              style={{ textDecoration: "none", color: "#000" }}
            >
              My Team
            </Link>
          ),
          key: "2",
        },
        {
          label: (
            <Link
              to="/change-password"
              style={{ textDecoration: "none", color: "#000" }}
            >
              Change Password
            </Link>
          ),
          key: "3",
        },
        {
          type: "divider",
        },
        {
          label: (
            <button
              className="btn btn-link p-0"
              style={{ textDecoration: "none", color: "#000" }}
              onClick={logout}
            >
              Logout
            </button>
          ),
          key: "4",
        },
      ]}
    />
  );

  // console.log("fixed", props.fixed);

  return (
    <div className="header-container d-flex justify-content-between align-items-center">
      <div className={`${props.fixed ? "logo2" : "logo"}`}>
        <Link to="/">
          <img src={logo} alt="header" />
        </Link>
      </div>
      <div className="main-menu">
        <ul>
          <li className={currentPath == "/" ? "active" : null}>
            <Link to="/">HOME</Link>
          </li>
          <li className={currentPath == "/game-tournaments" ? "active" : null}>
            <Link to="/game-tournaments">TOURNAMENTS</Link>
          </li>
          <li className={currentPath == "/ranking" ? "active" : null}>
            <Link to="/ranking">RANKINGS</Link>
          </li>
          <li className={currentPath == "/contact" ? "active" : null}>
            <Link to="/contact">CONTACT</Link>
          </li>
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
      {getLoginData === null ? (
        <JoinNowButton />
      ) : (
        <div style={{ marginRight: "30px" }}>
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            placement="bottomRight"
            arrow
            overlayStyle={{ minWidth: "150px" }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {userInfo && userInfo?.userInfo?.image ? (
                  <Avatar
                    size="large"
                    src={`${API_PUBLIC_URL}${userInfo.userInfo.image}`}
                  />
                ) : (
                  <Avatar size="large" icon={<UserOutlined />} />
                )}
                <DownOutlined style={{ color: "#000", fontWeight: "bold" }} />
              </Space>
            </a>
          </Dropdown>
        </div>
      )}
    </div>
  );
}

export default Header;
