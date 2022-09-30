import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";

const AdminHeader = () => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useContext(UserContext);
  // console.log(authUser);
  const logout = () => {
    localStorage.removeItem("loginData");
    navigate("/login");
    setAuthUser((previousState) => {
      return { ...previousState, isLoggedIn: false };
    });
  };

  //   console.log("first", authUser.user.username);

  return (
    <>
      <nav className="navbar navbar-light bg-light p-0">
        <div className="d-flex col-12 col-md-3 col-lg-2 mb-2 mb-lg-0 flex-wrap flex-md-nowrap justify-content-between ps-3">
          <a className="navbar-brand" href="/">
            <img
              src={require("../images/sl_logo.png")}
              alt="logo"
              width={"150px"}
              height={"50px"}
            />
          </a>
          {/* <button
            className="navbar-toggler d-md-none collapsed mb-3"
            type="button"
            data-toggle="collapse"
            data-target="#sidebar"
            aria-controls="sidebar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}
        </div>
        <div className="col-12 col-md-4 col-lg-2">
          <input
            className="form-control form-control-dark"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
        </div>
        {authUser.isLoggedIn === true && (
          <div className="col-12 col-md-5 col-lg-8 d-flex align-items-center justify-content-md-end mt-3 mt-md-0 pe-3">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Hello, {authUser.user.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </nav>
    </>
  );
};

export default AdminHeader;
