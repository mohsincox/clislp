import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {API_PUBLIC_URL} from "../constants";
import {toast} from "react-toastify";
import {Collapse} from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import Image from "antd/es/image";
import { DeleteOutlined } from '@ant-design/icons';



export const Ads = () => {

    let [wid, setWid] = useState("");
    let [adsName, setAdsName] = useState("");
    let [adsStatus, setAdsStatus] = useState(1);
    let [adsImage, setAdsImage] = useState(null);
    let [adsLink, setAdsLink] = useState("http://");
    let [adsPage, setAdsPage] = useState("/");
    let [adsPosition, setAdsPosition] = useState("");
    let [adsGender, setAdsGender] = useState("");
    let [adsMinAge, setAdsMinAge] = useState("");
    let [adsMaxAge, setAdsMaxAge] = useState("");
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
            setAdsList(res.data.sort((a,b) => b.position - a.position ));
        });
    }, [])

    useEffect(() => {
        let position = adsList.map(ads => ads.position);
        let maxPosition = 0;
        if(position.length) {
            maxPosition = Math.max(...position)
        }
        setAdsPosition(maxPosition + 1);
    }, [adsList])

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
        } if (adsImage !== null) {
            const validExtensions = ["png", "jpeg", "jpg", "gif"];
            const fileExtension = adsImage.type.split("/")[1];
            const exist = validExtensions.includes(fileExtension);
            if (!exist) {
                toast.error("Please upload png, jpeg, jpg, gif format image");
                return;
            }
        }

        const formData = new FormData();
        formData.append("name", adsName);
        formData.append("status", adsStatus);
        formData.append("img_src", adsImage);
        formData.append("widget_id", wid);
        formData.append("link", adsLink);
        formData.append("page_name", adsPage);
        formData.append("position", adsPosition);
        formData.append("min_age", adsMinAge);
        formData.append("max_age", adsMaxAge);
        formData.append("gender", adsGender);


        axios.post(`${API_PUBLIC_URL}api/ads`, formData).then(res => {

            setAdsList(prevState => {
                let newList = [...prevState, res.data]

                return newList.sort((a,b) => b.position - a.position );
            });



            setWid("");
            setAdsName("");
            setAdsStatus(1);
            setAdsImage(null);
            setAdsLink("http://");
            setAdsPage("/");
            setAdsGender("");
            setAdsMinAge("");
            setAdsMaxAge("");
            toast.success("Ads create successful");
        }).catch(err => {

        })
    }

    function deleteAds(e, id) {
        axios.delete(`${API_PUBLIC_URL}api/ads/${id}`).then(res => {
            setAdsList(prevState => {
                let newAdsList = prevState;
                let filter = newAdsList.filter((ads) => ads.id != id);
                return filter;
            });
            toast.success("Ads has been deleted successfully");
        }).catch(res => {
            toast.success("Server Error cannot delete ads.");
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
                                    <select name="" className="form-control" onChange={(e) => setWid(e.target.value)}  value={wid}>
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
                                    <input type="text" className="form-control" placeholder="Ads Name" value={adsName} onChange={(e) => setAdsName(e.target.value)}/>
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="form-label col-sm-3">
                                    Status <span style={{color: "#ff0000"}}>*</span>
                                </label>
                                <div className="col-sm-9">
                                    <select name="widgetStatus" id="" value={adsStatus}
                                            onChange={(e) => setAdsStatus(e.target.value)}
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
                                    <input type="file" className="form-control"  onChange={(e) => setAdsImage(e.target.files[0])}/>
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="form-label col-sm-3">
                                    Link <span style={{color: "#ff0000"}}>*</span>
                                </label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" onChange={(e) => setAdsLink(e.target.value)} value={adsLink}/>
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="form-label col-sm-3">
                                    Page <span style={{color: "#ff0000"}}>*</span>
                                </label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" onChange={(e) => setAdsPage(e.target.value)} value={adsPage}/>
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="form-label col-sm-3">
                                    Position <span style={{color: "#ff0000"}}>*</span>
                                </label>
                                <div className="col-sm-9">
                                    <input type="number" className="form-control" onChange={(e) => setAdsPosition(e.target.value)} value={adsPosition}/>
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="form-label col-sm-3">
                                    Gender <span style={{color: "#ff0000"}}>*</span>
                                </label>
                                <div className="col-sm-9">
                                    <select className="form-control" onChange={(e) => setAdsGender(e.target.value)} value={adsGender}>
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
                                    <input type="number" className="form-control" onChange={(e) => setAdsMinAge(e.target.value)} value={adsMinAge}/>
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="form-label col-sm-3">
                                    Maximum Age <span style={{color: "#ff0000"}}>*</span>
                                </label>
                                <div className="col-sm-9">
                                    <input type="number" className="form-control" onChange={(e) => setAdsMaxAge(e.target.value)} value={adsMaxAge}/>
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
                                        <ul className="list-group">
                                        {
                                            adsList.map(ads => {
                                                    if(ads.widget_id == wl.id) {
                                                        return (
                                                            <li className="list-group-item d-flex justify-content-between align-items-center mb-2" key={ads.id}>
                                                                <div className="d-flex align-items-center">
                                                                    <Image
                                                                        width={50}
                                                                        height={50}
                                                                        src={`${API_PUBLIC_URL}${ads["img_src"]}`}
                                                                    />
                                                                    <span className="ms-2">{ads.name}</span>
                                                                </div>
                                                                <div>
                                                                    <span className="badge ant-badge-status-success badge-pill text-black ms-2">{ads.position}</span>

                                                                    <button className="btn btn-sm btn-danger ms-2" onClick={(e) => deleteAds(e, ads.id)}>delete</button>
                                                                </div>
                                                            </li>
                                                        )
                                                    }
                                            })
                                        }
                                        </ul>

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














