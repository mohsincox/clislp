import React, {Component} from 'react';
import RegisterWidget from "../../components/RegisterWidget";
import {Input, Select} from "antd";
import EyeTwoTone from "@ant-design/icons/lib/icons/EyeTwoTone";
import EyeInvisibleOutlined from "@ant-design/icons/lib/icons/EyeInvisibleOutlined";
import {Link} from "react-router-dom";

class BasicTemplate extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-lg-2 d-none d-lg-block mt-3">
                    <RegisterWidget name="Reg. Left" width={300} height={632} />
                </div>
                {this.props.children}
                <div className="col-lg-2 d-none d-lg-block mt-3">
                    <RegisterWidget name="Reg. Right" width={300} height={632} />
                </div>
            </div>
        );
    }
}

export default BasicTemplate;