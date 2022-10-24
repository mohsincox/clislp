import axios from "axios";
import { useEffect, useState } from "react";

import { API_PUBLIC_URL } from "../constants";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function SlideShow() {
  const [sliderList, setSliderList] = useState([]);
  const contentStyle = {
    height: '80vh',
    color: '#fff',
    textAlign: 'center',
    background: 'red',
    border: "5px solid #eee"
  };
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
    slidesToScroll: 1
  };
  return (
      <Slider {...settings}>
        {sliderList.map(slider => (
            <div key={slider.id} style={contentStyle}>
              <img
                  className="d-block w-100"
                  src={`${API_PUBLIC_URL}${slider.image}`}
                  alt={`First slide id ${slider.id}`}
                  height={"600px"}
              />
            </div>
        ))}
      </Slider>
  );
}
