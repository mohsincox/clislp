import { Dropdown, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { PUBLIC_URL } from "../../../constans";

const AdminSidebar = () => {
  return (
    <>
      <nav
        id="sidebar"
        // className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
        className="col-md-3 col-lg-2 d-md-block bg-light sidebar"
      >
        <div className="position-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to={`/admin`}>
                <i className="fa fa-dashboard" aria-hidden="true"></i>{" "}
                <span className="ml-2">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/admin/roles`}>
                <i className="fa fa-list-ul" aria-hidden="true"></i>{" "}
                <span className="ml-2">Role</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/admin/users`}>
                <i className="fa fa-users" aria-hidden="true"></i>{" "}
                <span className="ml-2">User</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/admin/games`}>
                <i className="fa fa-gamepad" aria-hidden="true"></i>{" "}
                <span className="ml-2">Game</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/admin/countries`}>
                <i className="fa fa-flag" aria-hidden="true"></i>{" "}
                <span className="ml-2">Country</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/admin/franchises`}>
                <i className="fa fa-font-awesome" aria-hidden="true"></i>{" "}
                <span className="ml-2">Franchise</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/admin/tournaments`}>
                <i className="fa fa-tumblr" aria-hidden="true"></i>{" "}
                <span className="ml-2">Tournament</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/admin/players`}>
                <i className="fa fa-slideshare" aria-hidden="true"></i>{" "}
                <span className="ml-2">Player</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/admin/sliders`}>
                <i className="fa fa-image" aria-hidden="true"></i>{" "}
                <span className="ml-2">Slider</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/admin/tournament-teams`}>
                <i className="fa fa-tumblr-square" aria-hidden="true"></i>{" "}
                <span className="ml-2">Tournament Teams</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/admin/matches`}>
                <i className="fa fa-flash" aria-hidden="true"></i>{" "}
                <span className="ml-2">Match</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/admin/news`}>
                <i className="fa fa-newspaper-o" aria-hidden="true"></i>{" "}
                <span className="ml-2">News</span>
              </Link>
            </li>

            {/* <li className="nav-item">
              <NavDropdown title={"name"} id="basic-nav-dropdown">
                <NavDropdown.Item>Logout</NavDropdown.Item>
              </NavDropdown>
            </li>

            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default AdminSidebar;
