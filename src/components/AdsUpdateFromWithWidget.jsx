import {Collapse} from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import Image from "antd/es/image";
import {API_PUBLIC_URL} from "../constants";
import React, {useContext, useState} from "react";
import {AdsContext} from "../context/AdsContext";
import {toast} from "react-toastify";
import axios from "axios";

export default function AdsUpdateFromWithWidget() {


    const adsC = useContext(AdsContext);
    const [{adsCreateState, activeKey}, setState] = adsC;

    function updateAdsFormData(e, ads) {

        setState((prevState) => {
            let newAdsList = prevState.adsCreateState.adsList;
            let updatedAdsList = newAdsList.map((adsL) => {
                let adsLdata = adsL;
                if (adsLdata.id == ads.id) {
                    if (e.target.name == "img_src") {
                        adsLdata[e.target.name] = e.target.files[0];
                        adsLdata["preview_img"] = URL.createObjectURL(e.target.files[0]);
                    } else {
                        adsLdata[e.target.name] = e.target.value;
                    }
                }
                return adsLdata;
            });

            return {
                adsCreateState: {
                    ...prevState.adsCreateState,
                    adsList: updatedAdsList
                }
            }
        })
    }

    function updateAds(e, ads) {
        e.preventDefault();
        if (!ads["name"]) {
            toast.error("Name is required");
            return;
        } else if (!ads["link"]) {
            toast.error("Link is required");
            return;
        } else if (!ads["page_name"]) {
            toast.error("Position is required");
            return;
        } else if (!ads["position"]) {
            toast.error("Gender is required");
            return;
        } else if (!ads["min_age"]) {
            toast.error("Minimum is required");
            return;
        } else if (!ads["max_age"]) {
            toast.error("Maximum is required");
            return;
        }

        if (typeof ads["img_src"] !== "string") {
            const validExtensions = ["png", "jpeg", "jpg", "gif", "svg", "svg+xml"];
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

        axios
            .put(`${API_PUBLIC_URL}api/ads/${ads["id"]}`, formData)
            .then((res) => {
                setTimeout(function () {
                    setState(prevState => {
                        let newList = [...prevState.adsCreateState.adsList];
                        return {
                            adsCreateState: {
                                ...prevState.adsCreateState,
                                adsList: newList.sort((a, b) => b.position - a.position)
                            }
                        }
                    })
                }, 300);

                toast.success("Ads updated successful");
            })
            .catch((err) => {
                console.error("========", err, "=======");
                toast.error("Ads updated unsuccessful");
            });
    }

    function deleteAds(e, id) {
        axios
            .delete(`${API_PUBLIC_URL}api/ads/${id}`)
            .then((res) => {
                setState((prevState) => {
                    let newAdsList = prevState.adsCreateState.adsList;
                    let filter = newAdsList.filter((ads) => ads.id != id);
                    return {
                        adsCreateState: {
                            ...prevState.adsCreateState,
                            adsList: filter
                        }
                    }
                })
                toast.success("Ads has been deleted successfully");
            })
            .catch((res) => {
                toast.success("Server Error cannot delete ads.");
            });
    }

    function handleChange(key) {
        setState({activeKey: key});
    }

    return (
        <>
            {
                adsCreateState.wList.map((wl) => (
                    <Collapse expandIconPosition="end" className="mb-2" key={wl.id} activeKey={activeKey}
                              onChange={handleChange}>
                        <CollapsePanel
                            key={`widget-${wl.id}`}
                            header={<h5 className="card-title">{wl.name}</h5>}
                        >
                            <ul className="list-group">
                                {adsCreateState.adsList.map((ads) => {
                                    if (ads.widget_id == wl.id) {
                                        return (
                                            <Collapse
                                                expandIconPosition="end"
                                                className="mb-1"
                                                key={`ads-${ads.id}`}
                                                style={{transition: "all 1s"}}
                                            >
                                                <CollapsePanel
                                                    key={ads.id}
                                                    header={<strong>{ads.name}</strong>}
                                                >
                                                    <div className="form-group mb-2">
                                                        <label htmlFor="adsName">Name:</label>
                                                        <input
                                                            type="text"
                                                            id="adsName"
                                                            name="name"
                                                            className="form-control"
                                                            defaultValue={ads.name}
                                                            onChange={(e) => updateAdsFormData(e, ads)}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="adsStatus">Status:</label>
                                                        <select
                                                            name="status"
                                                            id="adsStatus"
                                                            defaultValue={ads.status}
                                                            className="form-control"
                                                            onChange={(e) => updateAdsFormData(e, ads)}
                                                        >
                                                            <option value="1">Active</option>
                                                            <option value="0">Inactive</option>
                                                        </select>
                                                    </div>

                                                    <div className="form-group mb-2">
                                                        <label htmlFor="adsLink">Link:</label>
                                                        <input
                                                            type="text"
                                                            id="adsLink"
                                                            name="link"
                                                            className="form-control"
                                                            defaultValue={ads.link}
                                                            onChange={(e) => updateAdsFormData(e, ads)}
                                                        />
                                                    </div>
                                                    <div className="form-group mb-2">
                                                        <label htmlFor="adsImage">Ads Image:</label>
                                                        <div>
                                                            {ads["preview_img"] ? (
                                                                <Image
                                                                    width={50}
                                                                    height={50}
                                                                    src={ads["preview_img"]}
                                                                />
                                                            ) : (
                                                                <Image
                                                                    width={50}
                                                                    height={50}
                                                                    src={`${API_PUBLIC_URL}${ads["img_src"]}`}
                                                                />
                                                            )}
                                                        </div>
                                                        <input
                                                            type="file"
                                                            id="adsImage"
                                                            name="img_src"
                                                            className="form-control"
                                                            onChange={(e) => updateAdsFormData(e, ads)}
                                                        />
                                                    </div>

                                                    <div className="form-group mb-2">
                                                        <label htmlFor="adsLink">Page:</label>
                                                        <input
                                                            type="text"
                                                            id="adsLink"
                                                            name="page_name"
                                                            className="form-control"
                                                            defaultValue={ads["page_name"]}
                                                            onChange={(e) => updateAdsFormData(e, ads)}
                                                        />
                                                    </div>

                                                    <div className="form-group mb-2">
                                                        <label htmlFor="adsLink">Position:</label>
                                                        <input
                                                            type="text"
                                                            id="adsLink"
                                                            name="position"
                                                            className="form-control"
                                                            defaultValue={ads.position}
                                                            onChange={(e) => updateAdsFormData(e, ads)}
                                                        />
                                                    </div>

                                                    <div className="form-group mb-2">
                                                        <label htmlFor="adsGender">
                                                            Select Gender:
                                                        </label>
                                                        <select
                                                            id="adsGender"
                                                            className="form-control"
                                                            defaultValue={ads.gender}
                                                            name="gender"
                                                            onChange={(e) => updateAdsFormData(e, ads)}
                                                        >
                                                            <option>Please Select One</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                        </select>
                                                    </div>

                                                    <div className="form-group mb-2">
                                                        <label htmlFor="adsLink">Minimum Age:</label>
                                                        <input
                                                            type="number"
                                                            id="adsLink"
                                                            name="min_age"
                                                            className="form-control"
                                                            defaultValue={ads["min_age"]}
                                                            onChange={(e) => updateAdsFormData(e, ads)}
                                                        />
                                                    </div>

                                                    <div className="form-group mb-2">
                                                        <label htmlFor="adsLink">Maximum Age:</label>
                                                        <input
                                                            type="number"
                                                            id="adsLink"
                                                            name="max_age"
                                                            className="form-control"
                                                            defaultValue={ads["max_age"]}
                                                            onChange={(e) => updateAdsFormData(e, ads)}
                                                        />
                                                    </div>

                                                    <div
                                                        className="d-flex justify-content-end"
                                                        style={{
                                                            marginTop: "20px",
                                                            background: "#f7f7f7",
                                                            marginLeft: "-16px",
                                                            padding: "10px 20px",
                                                            marginRight: "-16px",
                                                            marginBottom: "-16px",
                                                        }}
                                                    >
                                                        <button
                                                            className="btn btn-sm btn-danger ms-2"
                                                            onClick={(e) => deleteAds(e, ads.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-primary ms-2"
                                                            onClick={(e) => updateAds(e, ads)}
                                                        >
                                                            Update
                                                        </button>
                                                    </div>
                                                </CollapsePanel>
                                            </Collapse>
                                        );
                                    }
                                })}
                            </ul>
                        </CollapsePanel>
                    </Collapse>
                ))

            }
        </>
    )

}