import axios from "axios";
import {Tab, Tabs} from "react-bootstrap";
import {useEffect, useState} from "react";
import {API_PUBLIC_URL} from "../constants";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Fixtures.css';
import FixtureCard from "./FixtureCard";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

function SampleNextArrow(props) {
    const {className, style, onClick} = props;
    return (
        <div className="next">
            <RightOutlined
                onClick={onClick}
            />
        </div>
    );
}

function SamplePrevArrow(props) {
    const {className, style, onClick} = props;
    return (
            <div className="prev">
                <LeftOutlined
                    onClick={onClick}
                />
            </div>
        );
}


export default function Fixtures() {
    const [fixtureList, setFixtureList] = useState([]);
    useEffect(() => {
        (async () => {
            await axios
                .get(`${API_PUBLIC_URL}api/ws-fixtures`, {})
                .then((response) => {
                    setFixtureList(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        })();
    }, []);


    const settings = {
        infinite: false,
        arrow: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (
        <div className="container mt-3">
            <div className="fixture-full-container">
                <h4 className="fw-bold">FIXTURES</h4>
                <Tabs variant="pills">
                    {fixtureList.map((fixture, index) => (
                        <Tab
                            key={fixture.id}
                            eventKey={fixture.id}
                            title={fixture.name}
                            style={{marginRight: "10px"}}
                        >

                            <Slider {...settings}>
                                {fixture.matches.map((match, index) => (
                                    <div key={index} className="w-100">
                                        {match.tournament_team_one != null && match.tournament_team_two != null && (
                                            <FixtureCard match={match}/>)}
                                    </div>
                                ))}
                            </Slider>
                        </Tab>
                    ))}
                </Tabs>
            </div>
        </div>
    );
}
