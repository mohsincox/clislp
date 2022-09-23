import { NavLink, Outlet } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

function AdminLayout() {
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
              <NavLink className="nav-link" to="/admin/sliders">
                Sliders
              </NavLink>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
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
