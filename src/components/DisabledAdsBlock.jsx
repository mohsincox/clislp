import React from 'react';
import { useDetectAdBlock } from "adblock-detect-react";


const DisabledAdsBlock = (props) => {
    const adBlockDetected = useDetectAdBlock();
    return adBlockDetected ? <div className="ad-block-off-request">
        <div>
            <h1>Please Disabled Ad Blocker</h1>
            <a href="" className="btn btn-warning btn-lg">Refresh</a>
        </div>
    </div> : props.children
}

export default DisabledAdsBlock;