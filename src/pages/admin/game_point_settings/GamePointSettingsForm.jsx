import React, {Component} from 'react';
import MustAdminAuth from "../../../components/MustAdminAuth";
import axios from "axios";
import {API_PUBLIC_URL} from "../../../constants";
import login from "../../Login";
import {toast} from "react-toastify";

class GamePointSettingsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gamePointSettings: null,
            keys: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.updateGameSetting = this.updateGameSetting.bind(this);
    }

    componentDidMount() {
        let res = axios.get(`${API_PUBLIC_URL}api/game_point_setting/FootBall_Point_Settings`).then(res => {
            this.setState({gamePointSettings: res.data})
            let newKeys = [];
            for (const key in res.data.value) {
                newKeys.push(key)
            }
            this.setState({keys: newKeys})
        }).catch(err => {
            console.log(err);
        })
    }
    handleChange(e) {
        let name = e.target.name;
        let value = e.target.value;
        let [playerSpecification, scoreType]= name.split('---');
        this.setState(prevState => {
            let newState = {...prevState};
            if(!isNaN(value)) newState["gamePointSettings"]["value"][playerSpecification][scoreType] = parseInt(value);
            else newState["gamePointSettings"]["value"][playerSpecification][scoreType] = 0
            return newState
        });
    }

    updateGameSetting () {
        axios.put(`${API_PUBLIC_URL}api/game_point_setting/FootBall_Point_Settings`, {value: this.state.gamePointSettings.value}).then(res => {
            console.log(res.data);
            toast.success("Football Point Settings Updated Successfully");
        }).catch(err => {
            console.log(err)
        });
    }


    render() {
        return (
            <MustAdminAuth>
                <h4>Football Point Settings</h4>
                <hr/>
                <div className="row">
                    {
                        this.state.keys.map((k, index) => (
                            <div className="col-lg-3" key={index}>
                                <h4>{k}</h4>
                                <div className="form-group">
                                    {
                                        this.state.gamePointSettings ? Object.keys(this.state.gamePointSettings.value[k]).map((innerKey,index) => (
                                            <label key={index}>
                                                {innerKey}
                                                <input type="text" name={`${k}---${innerKey}`} value={this.state.gamePointSettings.value[k][innerKey]} className="form-control" onChange={this.handleChange}/>
                                            </label>
                                        )) : null
                                    }
                                </div>
                            </div>
                        ))
                }
                </div>
                <div className="mt-5">
                    <button className="btn btn-primary w-100" onClick={this.updateGameSetting}>
                        Update
                    </button>
                </div>
            </MustAdminAuth>

        );
    }
}

export default GamePointSettingsForm;