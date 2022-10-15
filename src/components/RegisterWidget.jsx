import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {API_PUBLIC_URL} from "../constants";
import {toast} from "react-toastify";
import {Collapse} from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import Image from "antd/es/image";
import AdsViewer from "./AdsViewer";


export const RegisterWidget = (props) => {
    let [wList, setWList] = useState([]);
    let [adsList, setAdsList] = useState([]);
    let [registerWidget, setRegisterWidget] = useState([]);
    let [filterAds, setFilterAds] = useState([]);

    useEffect(() => {
        axios.get(`${API_PUBLIC_URL}api/widget`).then(res => {
            setWList(res.data);
        });
    }, []);


    useEffect(() => {
        axios.get(`${API_PUBLIC_URL}api/ads`).then(res => {
            setAdsList(res.data.sort((a,b) => b.position - a.position));
        });
    }, [])

    // check for widget
    useEffect(() => {
        let foundedWidget = checkForWidgetRegister(wList, props.name);
        setRegisterWidget(foundedWidget);
    }, [wList])

    function checkForWidgetRegister(widgetList, name) {
        if (widgetList.length) {
            let widgetFound = widgetList.filter(wl => wl.name == name);
            if (!widgetFound.length) throw Error("Invalid widget name");
            return widgetFound;
        }
    }

    useEffect(() => {
        if (registerWidget && registerWidget.length) {
            let newFilterAds = [];
            registerWidget.forEach(currentWidget => {
                if (adsList.length) {
                    adsList.forEach(ads => {

                        if (ads["widget_id"] == currentWidget["id"]) newFilterAds.push(ads)
                    })
                }
            });
            setFilterAds(newFilterAds);
        }
    }, [registerWidget, adsList])


    return <>
        <AdsViewer
            ads={filterAds}
            style={props.style ?? {width: 'initial', height: 'initial', overflow: 'hidden'}}
            imageStyle={props.imageStyle ?? {width: 'inherit', height: 'inherit', objectFit: 'cover'}}
        />
    </>
}

export default RegisterWidget;














