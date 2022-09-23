import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { API_PUBLIC_URL } from "../constants";
const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const getLoginData = localStorage.getItem("loginData");
    if (getLoginData === null) {
      navigate("/register");
    } else {
      const data = JSON.parse(getLoginData);
      const token = data.accessToken;

      axios
        .get(`${API_PUBLIC_URL}api/users`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => console.log(res))
        .catch((err) => {
          navigate("/register");
        });
    }
  }, []);

  const { authUser, setAuthUser } = useContext(UserContext);
  console.log("authUser", authUser);
  console.log("authUser2", authUser.user.userrole);
  const logout = () => {
    localStorage.removeItem("loginData");
    navigate("/register");
    setAuthUser((previousState) => {
      return { ...previousState, isLoggedIn: false };
    });
  };

  return (
    // <div style={{ textAlign: "center" }}>
    <div>
      <p>Profile Page</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
