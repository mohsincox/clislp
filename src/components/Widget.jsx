import React, {useState} from "react";

const Widget = () => {

    let [wname, setWname] = useState('');
    let [wstatus, setWstatus] = useState(1);


    return <div className="container">
        <form action="">
            <table>
                <tr className="mb-5">
                    <td>Widget Name: </td>
                    <td><input type="text" className="form-control" placeholder="Widget Name" value={wname} onChange={(e) => setWname(prevState => e.target.value)} /></td>
                </tr>
                <tr className="mb-5">
                    <td>Widget Status: </td>
                    <td>
                        <select name="widgetStatus" id="" value={wstatus} onChange={(e) => setWstatus(prevState => e.target.value)} className="form-control">
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <button type="submit" className="mt-2 btn btn-primary">Submit</button>
                    </td>
                </tr>
            </table>
        </form>
    </div>
}



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function Widget() {
    let [wname, setWname] = useState('');
    let [wstatus, setWstatus] = useState(1);
    let navigate = useNavigate();

    useEffect(() => {handleLogin();}, []);

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
                            navigate("/admin/no-permission");
                        }
                    });
            })();
        }
    }, []);

    const submitForm = async (e) => {
        e.preventDefault();

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (name.trim() === "") {
            toast.error("Name field is required!");
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
            {/* <div className="container"> */}
            <div className="col-sm-8 offset-sm-2">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">User Create</h5>
                        <form onSubmit={submitForm} encType="multipart/form-data">
                            <div className="mb-3 row">
                                <label className="form-label col-sm-3">
                                    Name <span style={{ color: "#ff0000" }}>*</span>
                                </label>
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
                                <label className="form-label col-sm-3">
                                    Email <span style={{ color: "#ff0000" }}>*</span>
                                </label>
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
                                <label className="form-label col-sm-3">
                                    Password <span style={{ color: "#ff0000" }}>*</span>
                                </label>
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
                                <label className="form-label col-sm-3">
                                    Role <span style={{ color: "#ff0000" }}>*</span>
                                </label>
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

                            <div className="float-end">
                                <button
                                    className="btn btn-danger me-3"
                                    onClick={() => {
                                        navigate("/admin/users");
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={submitForm}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>
    );
}


















