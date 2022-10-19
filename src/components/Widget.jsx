import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {API_PUBLIC_URL} from "../constants";
import {toast} from "react-toastify";

export const Widget = () => {

    let [wname, setWname] = useState('');
    let [wstatus, setWstatus] = useState(1);
    let [wList, setWList] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_PUBLIC_URL}api/widget`).then(res => {
            setWList(res.data);
        });
    }, []);

    function submitForm(e) {
        e.preventDefault();
        if(wname === "") {
            toast.error("Name is required");
            return;
        }
        axios.post(`${API_PUBLIC_URL}api/widget`, {
            name: wname,
            status: wstatus
        }).then(res => {
            setWList(prevState => {
                let newWList = [...prevState];
                console.log(newWList);
                newWList.push(res.data);
                setWname("");
                setWstatus(1);
                return newWList;
            });
            toast.success("Widget Created");
        }).catch(err => {
            console.log(err);
            toast.error("Widget name must be unique");
            return;
        })
    }

    function deleteWidget(e) {
        let id = e.target.value;

        axios.delete(`${API_PUBLIC_URL}api/widget/${id}`).then(res => {
            setWList(prevState => {
                let newList = prevState;
                let filterList = wList.filter(wl => wl.id != id);
                return filterList;
            })
            toast.success("Widget has been deleted successfully");
        }).catch(err => {
            toast.error("Please try latter. can not delete widget");
        })
    }

    function widgetList() {
        if(wList.length) {
            return wList.map(wl => {
                return <tr key={wl.id}>
                    <td>{wl.id}</td>
                    <td>{wl.name}</td>
                    <td>{wl.status ? 'Active' : 'Inactive'}</td>
                    <td>
                        <button onClick={deleteWidget} value={wl.id} className="btn btn-sm btn-danger">Delete</button>
                    </td>
                </tr>;
            });
        }


        return <tr>
            <td className="text-center" colSpan={4}>No data found.</td>
        </tr>


    }

    return <>
        <div className="row">
            <div className="col-md-4">
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title">Add Widgets</h5>
                    </div>
                    <div className="card-body">

                        <form onSubmit={submitForm} encType="multipart/form-data">
                            <div className="mb-3 row">
                                <label className="form-label col-sm-3">
                                    Name <span style={{color: "#ff0000"}}>*</span>
                                </label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" placeholder="Widget Name" value={wname}
                                           onChange={(e) => setWname(prevState => e.target.value)}/>
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="form-label col-sm-3">
                                    Status <span style={{color: "#ff0000"}}>*</span>
                                </label>
                                <div className="col-sm-9">
                                    <select name="widgetStatus" id="" value={wstatus}
                                            onChange={(e) => setWstatus(prevState => e.target.value)}
                                            className="form-control">
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>
                            </div>


                            <div className="float-end">
                                <button className="btn btn-danger me-3" onClick={ () => {navigate("/admin/users"); }} >Cancel</button>

                                <button type="button" className="btn btn-primary" onClick={submitForm}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title">Widget List</h5>

                    </div>
                    <div className="card-body">
                        <table className="table table-responsive table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>name</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {widgetList()}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    </>
}

export default Widget;

/*

export default function Widget() {
    let [wname, setWname] = useState('');
    let [wstatus, setWstatus] = useState(1);
    let navigate = useNavigate();


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
            {/!* <div className="container"> *!/}

            {/!* </div> *!/}
        </>
    );
}



*/















