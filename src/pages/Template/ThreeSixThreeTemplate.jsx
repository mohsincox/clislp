import React, {Component} from 'react';
import RegisterWidget from "../../components/RegisterWidget";
import TournamentList from "../../components/TournamentList";


class ThreeSixThreeTemplate extends Component {
    render() {

        return (
            <div className="row">
                <div className="col-12 col-lg-3 d-none d-lg-block">
                    <TournamentList />
                </div>
                {this.props.children}
                <div className="col-12 col-lg-3 d-none d-lg-block">
                    <RegisterWidget name="Reg Left" style={{width: "100%", height: "300px"}} />
                </div>
            </div>
        );
    }
}

export default ThreeSixThreeTemplate;