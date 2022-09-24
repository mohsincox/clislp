import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { API_PUBLIC_URL } from "../constants";
import { toast } from "react-toastify";
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

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const getLoginData = localStorage.getItem("loginData");
    if (getLoginData === null) {
      navigate("/register");
    } else {
      const authData = JSON.parse(getLoginData);

      console.log("authData 1", authData);
      console.log("authData 2", authData.userrole);
      console.log("authData 3", authData.userrole);
      console.log("authData 4", authData.userrole.role);
      console.log("authData 5", authData.userrole.role.role_permissions);
      const arr = [];
      for (let i = 0; i < authData.userrole.role.role_permissions.length; i++) {
        arr.push(authData.userrole.role.role_permissions[i].perm_id);
      }
      console.log("arr-----------", arr);

      if (arr.indexOf(5) === -1) {
        toast.error("No Permission");
        navigate("/admin/no-permission");
      } else {
      }

      // if (arr.indexOf(4) !== -1) {
      //   alert("Value exists!");
      // } else {
      //   toast.error("No Permission");
      //   navigate("/admin/no-permission");
      // }
    }
  }, []);

  const { authUser, setAuthUser } = useContext(UserContext);
  // console.log("authUser", authUser);
  // console.log("authUser2", authUser.user.userrole);
  // console.log("authUser3", authUser.user.userrole.name);
  // console.log("authUser4", authUser.user.userrole.role);
  // console.log("authUser5", authUser.user.userrole.role.role_permissions);

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
