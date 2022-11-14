import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import WebLayout from "../layouts/WebLayout";
import BasicTemplate from "./Template/BasicTemplate";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import Avatar from "antd/es/avatar";
import congratulationGif from "../images/congratulation.gif";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_PUBLIC_URL } from "../constants";
import { toast } from "react-toastify";
import useUserHook from "../Hooks/useUserHook";

export default function WelcomeTeam() {
  let [conGif, setConGif] = useState(congratulationGif);
  const [tourName, setTourName] = useState("");
  const [tourYear, setTourYear] = useState("");
  const navigate = useNavigate();
  const { tourId } = useParams();

  let [userInfo] = useUserHook();

  useEffect(() => {
    setTimeout(function () {
      setConGif(null);
    }, 2000);
  });

  const getLoginData = localStorage.getItem("loginData");
  useEffect(() => {
    if (getLoginData === null) {
      navigate("/register");
    } else {
      const data = JSON.parse(getLoginData);
      const token = data.accessToken;

      axios
        .get(`${API_PUBLIC_URL}commonapi/tournament/${tourId}`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setTourName(response.data.name);
          setTourYear(response.data.year);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 403) {
            toast.error("No Permission");
            // navigate("/");
          }
        });
    }
  }, []);

  return (
    <WebLayout>
      <div className="build-team-section ku-section section-top-required">
        <div className="container-fluid" style={{ marginBottom: "15px" }}>
          <BasicTemplate>
            <div className="col-12 col-lg-8">
              <div className="welcome-team-area basic-temp-main-content-area p-3 p-sm-3 p-md-3 p-lg-5 p-xl-5 bg-transparent">
                <div
                  style={{
                    marginTop: "50px",
                    textAlign: "center",
                    background: `url(${conGif})`,
                  }}
                >
                  {userInfo && userInfo?.userInfo?.image ? (
                    <Avatar
                      size={150}
                      src={`${API_PUBLIC_URL}${userInfo.userInfo.image}`}
                    />
                  ) : (
                    <Avatar size={150} icon={<UserOutlined />} />
                  )}
                  {/* <Avatar size={150} icon={<UserOutlined />} /> */}
                  <p className="mt-5">
                    Your Team has been Confirmed
                    <br />
                    For {tourName}.
                  </p>
                  <h4>Best of Luck</h4>
                </div>
              </div>
            </div>
          </BasicTemplate>
        </div>
      </div>
    </WebLayout>
  );
}
