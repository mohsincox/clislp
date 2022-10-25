import axios from "axios";
import {useEffect, useState} from "react";

import {API_PUBLIC_URL} from "../constants";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function SlideShow() {
    const [sliderList, setSliderList] = useState([]);

    useEffect(() => {
        (async () => {
            await axios
                .get(`${API_PUBLIC_URL}api/ws-sliders`, {})
                .then((response) => {
                    setSliderList(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        })();
    }, []);


    const settings = {
        infinite: true,
        arrow: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    initialSlide: 1
                }
            }
        ]
    };
    return (
        <Slider {...settings}>
            {sliderList.map(slider => (
                <div key={slider.id}>
                    <div  className="ku-main-slider">
                        <img
                            src={`${API_PUBLIC_URL}${slider.image}`}
                            alt={`First slide id ${slider.id}`}
                        />
                    </div>
                </div>
            ))}
        </Slider>
    );
}
