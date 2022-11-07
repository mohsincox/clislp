import {Component, createContext, useState} from "react";

export let AdsContext = createContext({});



export class AdsContextWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adsCreateState: {
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
                wList: [],
                adsList: [],
            },
            activeKey: [],
        }
    }


    render() {
        return <AdsContext.Provider value={[this.state, this.setState.bind(this)]}>
            {this.props.children}
        </AdsContext.Provider>
    }
}

