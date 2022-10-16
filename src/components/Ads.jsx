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

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

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

    function updateAdsFormData(e, ads) {
        setAdsList(prevState => {
            let newAdsList = prevState;
            return newAdsList.map((adsL) => {
                let adsLdata = adsL;
                if(adsLdata.id == ads.id) {
                    if(e.target.name == "img_src") {
                         adsLdata[e.target.name] = e.target.files[0];
                         adsLdata["preview_img"] = URL.createObjectURL(e.target.files[0]);
                    } else {
                        adsLdata[e.target.name] = e.target.value;
                    }

                }
                return adsLdata;
            });
        });
    }

    function updateAds(e, ads) {
        e.preventDefault();
        if(!ads["name"]) {
            toast.error("Name is required");
            return;
        } else if(!ads["link"]) {
            toast.error("Link is required");
            return;
        } else if(!ads["page_name"]) {
            toast.error("Position is required");
            return;
        } else if(!ads["position"]) {
            toast.error("Gender is required");
            return;
        } else if(!ads["min_age"]) {
            toast.error("Minimum is required");
            return;
        } else if(!ads["max_age"]) {
            toast.error("Maximum is required");
            return;
        }

        if (typeof ads["img_src"] !== "string") {
            const validExtensions = ["png", "jpeg", "jpg", "gif"];
            const fileExtension = ads["img_src"].type.split("/")[1];
            const exist = validExtensions.includes(fileExtension);
            if (!exist) {
                toast.error("Please upload png, jpeg, jpg, gif format image");
                return;
            }
        }

        const formData = new FormData();
        formData.append("name", ads["name"]);
        formData.append("status", ads["status"]);
        formData.append("img_src", ads["img_src"]);
        formData.append("widget_id", ads["widget_id"]);
        formData.append("link", ads["link"]);
        formData.append("page_name", ads["page_name"]);
        formData.append("position", ads["position"]);
        formData.append("min_age", ads["min_age"]);
        formData.append("max_age", ads["max_age"]);
        formData.append("gender", ads["gender"]);


        axios.put(`${API_PUBLIC_URL}api/ads/${ads["id"]}`, formData).then(res => {
            setTimeout(function() {
                setAdsList(prevState => {
                    let newList = [...prevState]
                    return newList.sort((a,b) => b.position - a.position );
                });
            }, 300);

            toast.success("Ads updated successful");
        }).catch(err => {
            console.error("========", err, "=======");
            toast.err("Ads updated unsuccessful");
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
                                <Collapse expandIconPosition="end" className="mb-2">
                                    <CollapsePanel key={`widget-${wl.id}`} header={<h5 className="card-title">{wl.name}</h5>}>
                                        <ul className="list-group">
                                        {
                                            adsList.map(ads => {
                                                    if(ads.widget_id == wl.id) {
                                                        return (
                                                            <Collapse expandIconPosition="end" className="mb-1" key={`ads-${ads.id}`} style={{transition: "all 1s"}}>
                                                                <CollapsePanel key={ads.id} header={<strong>{ads.name}</strong>}>
                                                                    <div className="form-group mb-2">
                                                                        <label htmlFor="adsName">Name:</label>
                                                                        <input type="text" id="adsName" name="name" className="form-control" defaultValue={ads.name} onChange={(e) => updateAdsFormData(e, ads)}/>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label htmlFor="adsStatus">Status:</label>
                                                                        <select name="status" id="adsStatus" defaultValue={ads.status} className="form-control" onChange={(e) => updateAdsFormData(e, ads)}>
                                                                            <option value="1">Active</option>
                                                                            <option value="0">Inactive</option>
                                                                        </select>
                                                                    </div>

                                                                    <div className="form-group mb-2">
                                                                        <label htmlFor="adsLink">Link:</label>
                                                                        <input type="text" id="adsLink" name="link" className="form-control" defaultValue={ads.link} onChange={(e) => updateAdsFormData(e, ads)}/>
                                                                    </div>
                                                                    <div className="form-group mb-2">
                                                                        <label htmlFor="adsImage">Ads Image:</label>
                                                                        <div>

                                                                            {ads['preview_img'] ? <Image
                                                                                width={50}
                                                                                height={50}
                                                                                src={ads['preview_img']}
                                                                            /> : <Image
                                                                                width={50}
                                                                                height={50}
                                                                                src={`${API_PUBLIC_URL}${ads["img_src"]}`}
                                                                            />}

                                                                        </div>
                                                                        <input type="file" id="adsImage" name="img_src" className="form-control" onChange={(e) => updateAdsFormData(e, ads)}/>
                                                                    </div>


                                                                    <div className="form-group mb-2">
                                                                        <label htmlFor="adsLink">Page:</label>
                                                                        <input type="text" id="adsLink" name="page_name" className="form-control" defaultValue={ads["page_name"]} onChange={(e) => updateAdsFormData(e, ads)}/>
                                                                    </div>

                                                                    <div className="form-group mb-2">
                                                                        <label htmlFor="adsLink">Position:</label>
                                                                        <input type="text" id="adsLink" name="position" className="form-control" defaultValue={ads.position} onChange={(e) => updateAdsFormData(e, ads)}/>
                                                                    </div>

                                                                    <div className="form-group mb-2">
                                                                        <label htmlFor="adsGender">Select Gender:</label>
                                                                        <select id="adsGender" className="form-control" defaultValue={ads.gender} name="gender" onChange={(e) => updateAdsFormData(e, ads)}>
                                                                            <option>Please Select One</option>
                                                                            <option value="male">Male</option>
                                                                            <option value="female">Female</option>
                                                                        </select>
                                                                    </div>

                                                                    <div className="form-group mb-2">
                                                                        <label htmlFor="adsLink">Minimum Age:</label>
                                                                        <input type="number" id="adsLink" name="min_age" className="form-control" defaultValue={ads["min_age"]} onChange={(e) => updateAdsFormData(e, ads)}/>
                                                                    </div>

                                                                    <div className="form-group mb-2">
                                                                        <label htmlFor="adsLink">Maximum Age:</label>
                                                                        <input type="number" id="adsLink" name="max_age" className="form-control" defaultValue={ads["max_age"]} onChange={(e) => updateAdsFormData(e, ads)}/>
                                                                    </div>

                                                                    <div className="d-flex justify-content-end" style={{marginTop: "20px",
                                                                        background: "#f7f7f7",
                                                                        marginLeft: "-16px",
                                                                        padding: "10px 20px",
                                                                        marginRight: "-16px",
                                                                        marginBottom: "-16px"}}>
                                                                        <button className="btn btn-sm btn-danger ms-2" onClick={(e) => deleteAds(e, ads.id)}>Delete</button>
                                                                        <button className="btn btn-sm btn-primary ms-2" onClick={(e) => updateAds(e, ads)}>Update</button>
                                                                    </div>
                                                                </CollapsePanel>
                                                            </Collapse>

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














