import { useContext, useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

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
    <Navbar bg="light" expand="lg" style={{ padding: "0px" }}>
      {/* <Container> */}

      {/* <Navbar.Brand href="#home" style={{ padding: "0px" }}> */}
      <Link to="/">
        <div style={{ position: "relative" }}>
          <img
            src={require("./../images/header_logo.png")}
            alt="header"
            height="50px"
            width={"300px"}
          />
          <span
            style={{
              position: "absolute",
              top: "11px",
              left: "100px",
              color: "#FFFFFF",
            }}
          >
            SL PLAY 11...
          </span>
        </div>
      </Link>
      {/* </Navbar.Brand> */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto me-3">
          <NavLink className="nav-link" to="/">
            HOME
          </NavLink>
          <NavLink className="nav-link" to="/game-tournaments">
            TOURNAMENTS
          </NavLink>
          <NavLink className="nav-link" to="/ranking">
            RANKINGS
          </NavLink>
          <NavLink className="nav-link" to="/contact">
            CONTACT
          </NavLink>

          {getLoginData === null ? (
            <NavLink className="nav-link" to="/register">
              <img
                src={require("../images/join_now.png")}
                alt="header"
                height="35px"
                width={"140px"}
                style={{ marginRight: "50px" }}
              />
            </NavLink>
          ) : (
            <NavDropdown
              title={
                <div style={{ display: "inline-block" }}>
                  <img
                    src={require("../images/user.png")}
                    alt=""
                    width={"30px"}
                  />
                  {name}
                </div>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              <NavDropdown.Item>
                {" "}
                <Link
                  to="/my-team"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  My Team &nbsp;&nbsp;&nbsp;
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
  );
}

export default Header;
