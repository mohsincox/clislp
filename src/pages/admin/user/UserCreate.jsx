import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function UserCreate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role_id, setRole_id] = useState("");
  const [roleList, setRoleList] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    handleLogin();
  }, []);

  const getLoginData = localStorage.getItem("loginData");

  const handleLogin = () => {
    if (getLoginData === null) {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .get(`${API_PUBLIC_URL}api/roles`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setRoleList(response.data);
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 403) {
              toast.error("No Permission");
            }
            navigate("/admin/no-permission");
          });
      })();
    }
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (name.trim() === "") {
      toast.error("Name field is required!");
    } else if (email.trim() === "") {
      toast.error("Email field is required!");
    } else if (!regex.test(email)) {
      toast.error("Not valid email format!");
    } else if (password === "") {
      toast.error("Password field is required!");
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
    } else if (role_id === "") {
      toast.error("Role field is required!");
    } else {
      //   const formData = new FormData();
      //   formData.append("name", name);
      //   formData.append("country_id", country_id);

      //   //   for (var [key, value] of formData.entries()) {
      //   //     console.log(key, value);
      //   //   }
      //   //   return;

      const postBody = {
        name: name,
        email: email,
        password: password,
        role_id: role_id,
      };

      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .post(`${API_PUBLIC_URL}api/users`, postBody, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log(response);
          setName("");
          setEmail("");
          setPassword("");
          setRole_id("");
          setRoleList([]);

          toast.success("Successfully created!");
          navigate("/admin/users");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 400) {
            toast.error(error.response.data.msg);
          }
          if (error.response.status === 403) {
            toast.error("No Permission");
            navigate("/admin/no-permission");
          }
        });
    }
  };

  return (
    <>
      <div className="container">
        <div className="col-sm-8 offset-sm-2">
          <div>
            <h3>User Create</h3>
          </div>
          <div>
            <form onSubmit={submitForm} encType="multipart/form-data">
              <div className="mb-3 row">
                <label className="form-label col-sm-3">Name</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">Email</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Email"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">Password</label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Password"
                    value={password}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">Role</label>
                <div className="col-sm-9">
                  <select
                    className="form-select"
                    value={role_id}
                    name="role_id"
                    onChange={(e) => setRole_id(e.target.value)}
                  >
                    <option value="">Select Role</option>
                    {roleList.map((item, index) => (
                      <option key={item.id} value={item.id}>
                        {item.role_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
