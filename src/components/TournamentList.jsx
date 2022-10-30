import React, {Component} from 'react';
import {RangingContext} from "../context/PageContext";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import {Input, Tooltip} from "antd";

class TournamentList extends Component {
    static contextType = RangingContext;

    constructor(props) {
        super(props);
    }

    handleFilterTournaments(e) {
        let searchKeyword = e.target.value
        let {tournaments,setFilterTournaments} = this.context;
        let filterTournaments = tournaments.filter(tournament => tournament?.name?.toLowerCase().match(searchKeyword.toLowerCase()));
        setFilterTournaments(filterTournaments);
    }

    handleSelected(id) {
        let {filterTournaments,setFilterTournaments} = this.context;
        let changeSelectedTournaments = filterTournaments.map(tournament => {
            if(tournament.id == id) {
                return {...tournament, selected: true,}
            } else {
                return {...tournament, selected: false,}
            }
        });
        setFilterTournaments(changeSelectedTournaments);
    }

    render() {
        this.filterTournaments = this.context.filterTournaments
        return (
            <>
                <div className="tournament-filter-form">
                    <Input
                        className="ku-card-header"
                        placeholder="Tournaments"
                        size="large"
                        suffix={
                            <Tooltip title="Search Tournament">
                                <SearchOutlined />
                            </Tooltip>
                        }
                        onChange={(e) => this.handleFilterTournaments(e)}
                        bordered={false}
                    />
                </div>
                <div className="tournament-list">
                    <ul>
                        {
                            this.filterTournaments && this.filterTournaments.map(tournament => <li key={tournament.id} onClick={() => this.handleSelected(tournament.id)} className={tournament.selected ? 'selected' : null}>{tournament.name}</li>)
                        }
                    </ul>
                </div>
            </>
        );
    }
}

export default TournamentList;