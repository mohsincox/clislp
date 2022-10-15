import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {API_PUBLIC_URL} from "../constants";
import {toast} from "react-toastify";
import {Collapse} from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import Image from "antd/es/image";


export const AdsViewer = ({ ads, style, imageStyle }) => {

    return <>
        {
            (ads && ads.length) ? (
                ads.map(ad => (
                    <a href={ad["link"]} target="_blank"  key={ad.id} className="d-block">
                    <div className="addViwer mb-3 overflow-hidden" style={style}>
                        <img src={`${API_PUBLIC_URL}${ad["img_src"]}`} alt="" style={imageStyle}/>
                    </div>
                    </a>
                ))
            ) : null
        }

    </>
}

export default AdsViewer;














