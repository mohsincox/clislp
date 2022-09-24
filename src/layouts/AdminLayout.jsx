import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";

function AdminLayout() {
  const navigate = useNavigate();

  const { authUser, setAuthUser } = useContext(UserContext);
  const [name, setName] = useState("");

  const getLoginData = localStorage.getItem("loginData");

  useEffect(() => {
    if (getLoginData === null) {
      navigate("/login");
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
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <NavLink className="nav-link" to="/admin/roles">
                Role
              </NavLink>
              <NavLink className="nav-link" to="/admin/permissions">
                Permission
              </NavLink>
              <NavLink className="nav-link" to="/admin/games">
                Game
              </NavLink>
              <NavLink className="nav-link" to="/admin/countries">
                Country
              </NavLink>
              <NavLink className="nav-link" to="/admin/tournaments">
                Tournament
              </NavLink>
              <NavLink className="nav-link" to="/admin/players">
                Player
              </NavLink>
              {/* <NavLink className="nav-link" to="/admin/sliders">
                Sliders
              </NavLink> */}
              <NavLink className="nav-link" to="/admin/matches">
                Match
              </NavLink>
              <NavDropdown title={name} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
}

export default AdminLayout;
