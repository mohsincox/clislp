import axios from "axios";
import { Tab, Tabs } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { API_PUBLIC_URL } from "../constants";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Fixtures.css";
import FixtureCard from "./FixtureCard";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
// import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className="next">
      <RightOutlined onClick={onClick} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className="prev">
      <LeftOutlined onClick={onClick} />
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
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          infinite: false,
          slidesToShow: 3,
          slidesToScroll: 2,
          speed: 500,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrow: false,
          nextArrow: null,
          prevArrow: null,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrow: false,
          nextArrow: null,
          prevArrow: null,
        },
      },
    ],
  };

  return (
    <div className="container mt-3 ">
      <div className="fixture-full-container">
        <h4 className="fw-bold fx-title">FIXTURES</h4>
        <Tabs variant="pills">
          {fixtureList.map((fixture, index) => (
            <Tab key={fixture.id} eventKey={fixture.id} title={fixture.name}>
              {/* <div style={{ display: "flex" }}>
                <div
                  className="image-swiper-button-prev"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "5px"
                  }}
                >
                  <LeftOutlined style={{ fontSize: "35px", color: "#9C9C9C" }} />
                </div> */}

              <div
                className="image-swiper-button-prev"
                style={{
                  position: "relative",
                  top: "105px",
                  zIndex: " 999",
                  marginLeft: "-35px",
                }}
              >
                <LeftOutlined style={{ fontSize: "35px", color: "#9C9C9C" }} />
              </div>

              <Swiper
                id="swiper-color"
                spaceBetween={10}
                slidesPerView={1}
                // navigation
                navigation={{
                  nextEl: ".image-swiper-button-next",
                  prevEl: ".image-swiper-button-prev",
                  disabledClass: "swiper-button-disabled",
                }}
                modules={[Navigation]} //you can add any other module here such as navigation and whatever else
                // nagination={{ clickable: true }}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    showSwitchArrows: false,
                  },
                  768: {
                    slidesPerView: 2,
                  },

                  1024: {
                    slidesPerView: 4,
                  },
                }}
              >
                {fixture.matches.map((match, index) => (
                  <div key={index}>
                    {match.tournament_team_one != null &&
                      match.tournament_team_two != null && (
                        <SwiperSlide>
                          <FixtureCard match={match} />
                        </SwiperSlide>
                      )}
                  </div>
                ))}
              </Swiper>

              <div className="image-swiper-button-next">
                <RightOutlined
                  style={{
                    fontSize: "35px",
                    color: "#9C9C9C",
                    position: "relative",
                    top: "-7rem",
                    zIndex: "999",
                    marginLeft: "81rem",
                  }}
                />
              </div>

              {/* <div
                  className=" image-swiper-button-next"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "5px"
                  }}
                >
                  <RightOutlined style={{ fontSize: "35px", color: "#9C9C9C" }} />
                </div>
              </div> */}

              {/* <Slider {...settings}>
                {fixture.matches.map((match, index) => (
                  <div key={index} className="w-100">
                    {match.tournament_team_one != null &&
                      match.tournament_team_two != null && (
                        <FixtureCard match={match} />
                      )}
                  </div>
                ))}
              </Slider> */}
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
