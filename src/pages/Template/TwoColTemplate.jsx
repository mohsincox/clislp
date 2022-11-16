import React, {Component} from 'react';
import RegisterWidget from "../../components/RegisterWidget";
import TournamentList from "../../components/TournamentList";


class TwoColTemplate extends Component {
    render() {

        return (
            <>
                <div className="row mb-3">
                    <div className="col-12 col-md-12 col-lg-6 col-xl-6">
                        <RegisterWidget name="Tournamet Top Left" width={810}  />
                    </div>
                    <div className="col-12 col-md-12 col-lg-6 col-xl-6">
                        <RegisterWidget name="Tournamet Top Right" width={810}  />
                    </div>
                </div>
                <div className="row">
                    {this.props.children}
                    <div className="col-12 col-lg-3 d-none d-lg-block">
                        <RegisterWidget name="Tournamet Right" width={296}  />
                    </div>
                </div>
            </>

        );
    }
}

export default TwoColTemplate;