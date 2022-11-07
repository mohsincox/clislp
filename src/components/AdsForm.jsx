import React, {useContext} from "react";
import {AdsContext} from "../context/AdsContext";
import {toast} from "react-toastify";
import axios from "axios";
import {API_PUBLIC_URL} from "../constants";


export default function AdsForm () {
    const adsC = useContext(AdsContext);
    const [{adsCreateState}, setState] = adsC;


    function submitForm(e) {
        e.preventDefault();
        if (!adsCreateState.wid) {
            toast.error("Please select an area");
            return;
        } else if (!adsCreateState.adsName) {
            toast.error("Name is required");
            return;
        }  else if (!adsCreateState.adsStatus) {
            toast.error("Please select status");
            return;
        } else if (!adsCreateState.adsImage) {
            toast.error("Image is required");
            return;
        } else if (!adsCreateState.adsLink) {
            toast.error("Link is required");
            return;
        } else if (!adsCreateState.adsPosition) {
            toast.error("Position is required");
            return;
        } else if (!adsCreateState.adsGender) {
            toast.error("Gender is required");
            return;
        } else if (!adsCreateState.adsMinAge) {
            toast.error("Minimum is required");
            return;
        } else if (!adsCreateState.adsMaxAge) {
            toast.error("Maximum is required");
            return;
        }

        if (adsCreateState.adsImage !== null) {
            const validExtensions = ["png", "jpeg", "jpg", "gif", "svg", "svg+xml"];
            const fileExtension = adsCreateState.adsImage.type.split("/")[1];
            const exist = validExtensions.includes(fileExtension);
            if (!exist) {
                toast.error("Please upload png, jpeg, jpg, gif format image");
                return;
            }
        }

        const formData = new FormData();
        formData.append("name", adsCreateState.adsName);
        formData.append("status", adsCreateState.adsStatus);
        formData.append("img_src", adsCreateState.adsImage);
        formData.append("widget_id", adsCreateState.wid);
        formData.append("link", adsCreateState.adsLink);
        formData.append("page_name", adsCreateState.adsPage);
        formData.append("position", adsCreateState.adsPosition);
        formData.append("min_age", adsCreateState.adsMinAge);
        formData.append("max_age", adsCreateState.adsMaxAge);
        formData.append("gender", adsCreateState.adsGender);

        axios.post(`${API_PUBLIC_URL}api/ads`, formData).then((res) => {
            setState(prevState => {
                let newList = [...prevState.adsCreateState.adsList, res.data];
                return {
                    adsCreateState: {
                        ...prevState.adsCreateState,
                        wid: "",
                        adsName: "",
                        adsStatus: 1,
                        adsImage: null,
                        adsLink: "http://",
                        adsPage: "/",
                        adsPosition: "",
                        adsGender: "",
                        adsMinAge: "",
                        adsMaxAge: "",
                        adsList: newList.sort((a, b) => b.position - a.position),
                    },
                    activeKey: [`widget-${adsCreateState.wid}`]
                }
            });
            toast.success("Ads create successful");
        }).catch((err) => {
        });
    }

    function handleForm(e) {
        let name = e.target.name;
        let value = e.target.value;

        if(e.target.files && e.target.files.length) value = e.target.files[0];


        setState(prevState => {
            return {
                adsCreateState: {...prevState.adsCreateState, [name]: value}
            }
        })
    }

    return (
        <form onSubmit={submitForm} encType="multipart/form-data">
            <div className="mb-3 row">
                <label className="form-label col-sm-3">
                    Select Area <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                    <select
                        name="wid"
                        className="form-control"
                        onChange={(e) => handleForm(e)}
                        value={adsCreateState.wid}
                    >
                        <option>Please Select One</option>
                        {adsCreateState.wList.map((wl) => (
                            <option key={wl.id} value={wl.id}>
                                {wl.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>


            <div className="mb-3 row">
                <label className="form-label col-sm-3">
                    Ads Name <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ads Name"
                        name="adsName"
                        value={adsCreateState.adsName}
                        onChange={(e) => handleForm(e)}
                    />
                </div>
            </div>

            <div className="mb-3 row">
                <label className="form-label col-sm-3">
                    Status <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                    <select
                        name="adsStatus"
                        value={adsCreateState.adsStatus}
                        onChange={(e) => handleForm(e)}
                        className="form-control"
                    >
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </select>
                </div>
            </div>

            <div className="mb-3 row">
                <label className="form-label col-sm-3">
                    Image <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                    <input
                        type="file"
                        name="adsImage"
                        className="form-control"
                        onChange={(e) => handleForm(e)}
                    />
                </div>
            </div>

            <div className="mb-3 row">
                <label className="form-label col-sm-3">
                    Link <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                    <input
                        type="text"
                        name="adsLink"
                        className="form-control"
                        onChange={(e) => handleForm(e)}
                        value={adsCreateState.adsLink}
                    />
                </div>
            </div>

            <div className="mb-3 row">
                <label className="form-label col-sm-3">
                    Page <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                    <input
                        type="text"
                        name="adsPage"
                        className="form-control"
                        onChange={(e) => handleForm(e)}
                        value={adsCreateState.adsPage}
                    />
                </div>
            </div>

            <div className="mb-3 row">
                <label className="form-label col-sm-3">
                    Position <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                    <input
                        type="number"
                        name="adsPosition"
                        className="form-control"
                        onChange={(e) => handleForm(e)}
                        value={adsCreateState.adsPosition}
                    />
                </div>
            </div>

            <div className="mb-3 row">
                <label className="form-label col-sm-3">
                    Gender <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                    <select
                        className="form-control"
                        name="adsGender"
                        onChange={(e) => handleForm(e)}
                        value={adsCreateState.adsGender}
                    >
                        <option>Please Select One</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
            </div>

            <div className="mb-3 row">
                <label className="form-label col-sm-3">
                    Minimum Age <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                    <input
                        type="number"
                        className="form-control"
                        name="adsMinAge"
                        onChange={(e) => handleForm(e)}
                        value={adsCreateState.adsMinAge}
                    />
                </div>
            </div>

            <div className="mb-3 row">
                <label className="form-label col-sm-3">
                    Maximum Age <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                    <input
                        type="number"
                        className="form-control"
                        name="adsMaxAge"
                        onChange={(e) => handleForm(e)}
                        value={adsCreateState.adsMaxAge}
                    />
                </div>
            </div>

            <div className="float-end">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={submitForm}
                >
                    Add
                </button>
            </div>
        </form>
    )
}