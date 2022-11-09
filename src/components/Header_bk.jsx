import { Link, NavLink } from "react-router-dom";

export default function Header_bk() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{ padding: "0px" }}
      >
        <div className="container-fluid" style={{ padding: "0px"}}>
          {/* <a className="navbar-brand me-2" href="/">
              test
            </a> */}
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
                  color: "#FFFFFF ",
                }}
              >
                SL PLAY 11...
              </span>
            </div>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarButtonsExample">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {/* <a className="nav-link" href="/">
                    Dashboard
                  </a> */}
              </li>
            </ul>

            <div className="d-flex align-items-center">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    HOME
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/tournament">
                    TOURNAMENTS
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/team">
                    TEAM
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/ranking">
                    RANKINGS
                  </NavLink>
                </li>
                <li className="nav-item">
                  {/* <a className="nav-link" href="/">
                    CONTACT
                  </a> */}
                  <NavLink className="nav-link" to="/contact">
                    CONTACT
                  </NavLink>
                </li>
              </ul>
              {/* <button type="button" className="btn btn-link px-3 me-2">
                  Login
                </button>
                <button type="button" className="btn btn-primary me-3">
                  Sign up for free
                </button> */}
              <img
                src={require("../images/join_now.png")}
                alt="header"
                height="50px"
                width={"150px"}
                style={{ marginRight: "50px" }}
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
