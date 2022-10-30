import React, {Component} from 'react';
import RegisterWidget from "../../components/RegisterWidget";
import TournamentList from "../../components/TournamentList";


class TwoColTemplate extends Component {
    render() {

        return (
            <>
                <div className="row mb-3">
                    <div className="col-12 col-md-12 col-lg-6 col-xl-6">
                        <RegisterWidget name="Header Left" style={{width: "100%", height: "80px"}} />
                    </div>
                    <div className="col-12 col-md-12 col-lg-6 col-xl-6">
                        <RegisterWidget name="Header Right" style={{width: "100%", height: "80px"}} />
                    </div>
                </div>
                <div className="row">
                    {this.props.children}
                    <div className="col-12 col-lg-3 d-none d-lg-block">
                        <RegisterWidget name="Reg Right" style={{width: "100%", height: "300px", marginBottom: '5px'}} />
                    </div>
                </div>
            </>

        );
    }
}

export default TwoColTemplate;