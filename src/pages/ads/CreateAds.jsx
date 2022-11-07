import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {API_PUBLIC_URL} from "../../constants";
import DisabledAdsBlock from "../../components/DisabledAdsBlock";
import {AdsContext} from "../../context/AdsContext";
import AdsForm from "../../components/AdsForm";
import AdsUpdateFromWithWidget from "../../components/AdsUpdateFromWithWidget";


export const CreateAds = () => {
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const adsC = useContext(AdsContext);
    const [{adsCreateState}, setState] = adsC;

    useEffect(() => {
        axios.get(`${API_PUBLIC_URL}api/widget`).then((res) => {
            setState(prevState => {
                return {
                    adsCreateState: {
                        ...prevState.adsCreateState,
                        wList: res.data
                    }
                }
            });

        });
    }, []);
    useEffect(() => {
        axios.get(`${API_PUBLIC_URL}api/ads`).then((res) => {
            setState(prevState => {
                return {
                    adsCreateState: {
                        ...prevState.adsCreateState,
                        adsList: res.data.sort((a, b) => b.position - a.position)
                    }
                }
            });
        });
    }, []);
    useEffect(() => {
        let position = adsCreateState.adsList.map((ads) => ads.position);
        let maxPosition = 0;
        if (position.length) {
            maxPosition = Math.max(...position);
        }

        setState(prevState => {
            return {
                adsCreateState: {
                    ...prevState.adsCreateState,
                    adsPosition: maxPosition + 1
                }
            }
        });

    }, [adsCreateState.adsList]);

    return (
        <DisabledAdsBlock>
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Add Ads</h5>
                        </div>
                        <div className="card-body">
                            <AdsForm />
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-12">
                            <AdsUpdateFromWithWidget />
                        </div>
                    </div>
                </div>
            </div>
        </DisabledAdsBlock>
    );
};

export default CreateAds;