import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {API_PUBLIC_URL, placeholderImageSrc} from "../constants";
import {toast} from "react-toastify";
import {Collapse} from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import Image from "antd/es/image";

export const AdsViewer = (props) => {
    const {ads} = props;
    const {style, imageStyle, width, height, name} = props.widget;
    let message = `Please add ads to "${name}" widget:`;
    return (
        <>
            {ads && ads.length ? (
                ads.map((ad) => (
                    <a
                        href={ad["link"]}
                        target="_blank"
                        key={ad.id}
                        className="d-block"
                        name={name}
                    >
                        <div
                            className={`addViwer ${
                                ads.length > 1 ? "mb-3" : ""
                            } overflow-hidden`}
                            style={{...style}}
                        >
                            <img
                                src={`${API_PUBLIC_URL}${ad["img_src"]}`}
                                alt=""
                                style={{
                                    ...imageStyle,
                                    width: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        </div>
                    </a>
                ))
            ) : (
                <a href="#" target="_blank" className="d-block" name={name}>
                    <div className={`addViwer overflow-hidden`} style={style}>
                        <img
                            src={`${placeholderImageSrc}/${width}x${height}.png?text=${message}`}
                            alt="Ads Not Found"
                            style={imageStyle}
                        />
                    </div>
                </a>
            )}
        </>
    );
};

export default AdsViewer;
