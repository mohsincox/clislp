import { useContext, useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import logo from "../logo.svg";
import header from "./header.css";
import JoinNowButton from "./JoinNowButton";
import Avatar from "antd/es/avatar";
import { Dropdown, Menu, Space } from "antd";
import DownOutlined from "@ant-design/icons/lib/icons/DownOutlined";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";

function MobileHeader() {
  const navigate = useNavigate();

  const { authUser, setAuthUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [showMenu, setShowMenu] = useState(false);

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

  return (
    <div className="sm-header">
      <div className="row">
        <div className="col-9">
          <div className="sm-header-left">
            <div className="mobile-menu">
              <div className="bars" onClick={() => setShowMenu(true)}>
                <i className="fa fa-bars" aria-hidden="true"></i>
              </div>

              {showMenu ? (
                <div className="mobile-menu-content">
                  <i
                    className="fa fa-times"
                    aria-hidden="true"
                    onClick={() => setShowMenu(false)}
                  ></i>
                  <ul>
                    <li className="active">
                      <Link to="/">HOME</Link>
                    </li>
                    <li>
                      <Link to="/game-tournaments">TOURNAMENTS</Link>
                    </li>
                    <li>
                      <Link to="/ranking">RANKINGS</Link>
                    </li>
                    <li>
                      <Link to="/contact">CONTACT</Link>
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>
            <div className="branding">SL PLAY 11...</div>
          </div>
        </div>
        <div className="col-3">
          <div className="sm-header-right">
            {getLoginData == null ? (
              <Link to="/register">Join Now</Link>
            ) : (
              <Dropdown
                overlay={menu}
                trigger={["click"]}
                placement="bottomRight"
                arrow
                overlayStyle={{ minWidth: "150px" }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Avatar size="large" icon={<UserOutlined />} />
                    <DownOutlined
                      style={{ color: "#000", fontWeight: "bold" }}
                    />
                  </Space>
                </a>
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileHeader;
