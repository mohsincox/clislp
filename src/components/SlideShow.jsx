import axios from "axios";
import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { API_PUBLIC_URL } from "../constants";

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
  return (
    <Carousel>
      {sliderList.map((slider, index) => (
        <Carousel.Item interval={2000} key={slider.id}>
          <img
            className="d-block w-100"
            src={`${API_PUBLIC_URL}${slider.image}`}
            alt="First slide id {slider.id}"
            height={"400px"}
          />
          {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
