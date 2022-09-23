import { Navbar, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

function Header() {
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
        <Nav className="ms-auto">
          <NavLink className="nav-link" to="/">
            HOME
          </NavLink>
          <NavLink className="nav-link" to="/tournament">
            TOURNAMENTS
          </NavLink>
          <NavLink className="nav-link" to="/build-team">
            TEAM
          </NavLink>
          <NavLink className="nav-link" to="/ranking">
            RANKINGS
          </NavLink>
          <NavLink className="nav-link" to="/contact">
            CONTACT
          </NavLink>

          <img
            src={require("../images/join_now.png")}
            alt="header"
            height="50px"
            width={"150px"}
            style={{ marginRight: "50px" }}
          />
        </Nav>
      </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
  );
}

export default Header;
