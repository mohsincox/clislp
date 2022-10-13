import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {API_PUBLIC_URL} from "../constants";
import {toast} from "react-toastify";
import {Collapse} from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";


export const Ads = () => {

    let [wid, setWid] = useState(null);
    let [adsName, setAdsName] = useState("");
    let [adsStatus, setAdsStatus] = useState(1);
    let [adsImage, setAdsImage] = useState(null);
    let [adsLink, setAdsLink] = useState("");
    let [adsPage, setAdsPage] = useState("");
    let [adsPosition, setAdsPosition] = useState(null);
    let [adsGender, setAdsGender] = useState(null);
    let [adsMinAge, setAdsMinAge] = useState(null);
    let [adsMaxAge, setAdsMaxAge] = useState(null);
    // let [ad, setWstatus] = useState(1);


    let [wList, setWList] = useState([]);
    let [adsList, setAdsList] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_PUBLIC_URL}api/widget`).then(res => {
            setWList(res.data);
        });
    }, []);

    useEffect(() => {
        axios.get(`${API_PUBLIC_URL}api/ads`).then(res => {
            setAdsList(res.data);
        });
    }, [])

    function submitForm(e) {
        e.preventDefault();
        if(!adsName) {
            toast.error("Name is required");
            return;
        } else if (!wid) {
            toast.error("Please select an area");
            return;
        } else if(!adsStatus) {
            toast.error("Please select status");
            return;
        } else if(!adsImage) {
            toast.error("Image is required");
            return;
        } else if(!adsLink) {
            toast.error("Link is required");
            return;
        } else if(!adsPosition) {
            toast.error("Position is required");
            return;
        } else if(!adsGender) {
            toast.error("Gender is required");
            return;
        } else if(!adsMinAge) {
            toast.error("Minimum is required");
            return;
        } else if(!adsMaxAge) {
            toast.error("Maximum is required");
            return;
        }

        axios.post(`${API_PUBLIC_URL}api/ads`, {
                name: adsName,
                status: adsStatus,
                img_src: adsImage,
                widget_id: wid,
                link: adsLink,
                page_name: adsPage,
                position: adsPosition,
                min_age: adsMinAge,
                max_age: adsMaxAge,
                gender: adsGender
            }
        ).then(res => {

            setAdsList(res.data);

            setWid(null);
            setAdsName("");
            setAdsStatus(1);
            setAdsImage(null);
            setAdsLink("");
            setAdsPage("");
            setAdsPosition(null);
            setAdsGender(null);
            setAdsMinAge(null);
            setAdsMaxAge(null);
            toast.success("Ads create successful");
        }).catch(err => {

        })
    }





    return <>
        <div className="row">
            <div className="col-md-4">
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title">Add Ads</h5>
                    </div>
                    <div className="card-body">

                        <form onSubmit={submitForm} encType="multipart/form-data">
                            <div className="mb-3 row">
                                <label className="form-label col-sm-3">
                                    Select Area <span style={{color: "#ff0000"}}>*</span>
                                </label>
                                <div className="col-sm-9">
                                    <select name="" className="form-control" onChange={(e) => setWid(prevState => e.target.value)}>
                                        <option>Please Select One</option>
                                        {
                                            wList.map(wl => (
                                                <option key={wl.id} value={wl.id}>{wl.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label className="form-label col-sm-3">
                                    Ads Name <span style={{color: "#ff0000"}}>*</span>
                                </label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" placeholder="Widget Name" value={adsName} onChange={(e) => setAdsName(prevState => e.target.value)}/>
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="form-label col-sm-3">
                                    Status <span style={{color: "#ff0000"}}>*</span>
                                </label>
                                <div className="col-sm-9">
                                    <select name="widgetStatus" id="" value={adsStatus}
                                            onChange={(e) => setAdsStatus(prevState => e.target.value)}
                                            className="form-control">
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="form-label col-sm-3">
                                    Image <span style={{color: "#ff0000"}}>*</span>
                                </label>
                                <div className="col-sm-9">
                                    <input type="file" className="form-control"  onChange={(e) => setAdsImage(prevState => e.target.value)}/>
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="form-label col-sm-3">
                                    Link <span style={{color: "#ff0000"}}>*</span>
                                </label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" onChange={(e) => setAdsLink(prevState => e.target.value)}/>
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="form-label col-sm-3">
                                    Page <span style={{color: "#ff0000"}}>*</span>
                                </label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" onChange={(e) => setAdsPage(prevState => e.target.value)}/>
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="form-label col-sm-3">
                                    Position <span style={{color: "#ff0000"}}>*</span>
                                </label>
                                <div className="col-sm-9">
                                    <input type="number" className="form-control" onChange={(e) => setAdsPosition(prevState => e.target.value)}/>
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="form-label col-sm-3">
                                    Gender <span style={{color: "#ff0000"}}>*</span>
                                </label>
                                <div className="col-sm-9">
                                    <select className="form-control" onChange={(e) => setAdsGender(prevState => e.target.value)} >
                                        <option>Please Select One</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="form-label col-sm-3">
                                    Minimum Age <span style={{color: "#ff0000"}}>*</span>
                                </label>
                                <div className="col-sm-9">
                                    <input type="number" className="form-control" onChange={(e) => setAdsMinAge(prevState => e.target.value)}/>
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="form-label col-sm-3">
                                    Maximum Age <span style={{color: "#ff0000"}}>*</span>
                                </label>
                                <div className="col-sm-9">
                                    <input type="number" className="form-control" onChange={(e) => setAdsMaxAge(prevState => e.target.value)}/>
                                </div>
                            </div>


                            <div className="float-end">
                                <button type="button" className="btn btn-primary" onClick={submitForm}>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-md-8">

                <div className="row">
                {
                    wList.map(wl => (
                            <div className="col-md-6" key={wl.id}>
                                <Collapse expandIconPosition="end" className="mb-5">
                                    <CollapsePanel key={wl.id} header={<h5 className="card-title">{wl.name}</h5>}>
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
                                            </tbody>
                                        </table>
                                    </CollapsePanel>
                                </Collapse>
                            </div>
                    ))
                }
                </div>


            </div>
        </div>
    </>
}

export default Ads;

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















