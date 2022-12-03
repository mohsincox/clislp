import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Card } from "antd";
import { Column } from "@ant-design/plots";
import axios from "axios";
import { API_PUBLIC_URL } from "../../constants";

function Dashboard() {
  const [userCount, setUserCount] = useState({});
  const [tournamentCount, setTournamentCount] = useState({});
  const [tourWiseUserCount, setTourWiseUserCount] = useState([]);
  const navigate = useNavigate();
  const getLoginData = localStorage.getItem("loginData");
  useEffect(() => {
    if (getLoginData === null) {
      navigate("/admin-login");
    } else {
      const data = JSON.parse(getLoginData);
      const token = data.accessToken;
    }
  }, []);

  useEffect(() => {
    getUserCount();
    getTournamentCount();
    getTourWiseUserCount();
  }, []);

  const getUserCount = async () => {
    if (getLoginData === null) {
      navigate("/admin-login");
    } else {
      await axios
        .get(`${API_PUBLIC_URL}api/dashboard/user-count`, {})
        .then((response) => {
          setUserCount(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getTournamentCount = async () => {
    if (getLoginData === null) {
      navigate("/admin-login");
    } else {
      await axios
        .get(`${API_PUBLIC_URL}api/dashboard/tournament-count`, {})
        .then((response) => {
          setTournamentCount(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getTourWiseUserCount = async () => {
    if (getLoginData === null) {
      navigate("/admin-login");
    } else {
      await axios
        .get(`${API_PUBLIC_URL}api/dashboard/tournament-wise-user-count`, {})
        .then((response) => {
          setTourWiseUserCount(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  let data = [];

  for (let i = 0; i < tourWiseUserCount.length; i++) {
    data.push({
      Tournament: tourWiseUserCount[i].tournament?.name,
      Customer: tourWiseUserCount[i].user_count,
    });
  }

  const config = {
    data,
    xField: "Tournament",
    yField: "Customer",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      tournament: {
        alias: "Tour",
      },
      users: {
        alias: "User",
      },
    },
  };

  return (
    <>
      <div>Dashboard</div>
      <>
        <Row>
          <Col span={8}>
            <div
              style={{
                padding: "30px",
              }}
            >
              <Card
                style={{
                  backgroundColor: "#875fc0",
                  borderRadius: "20px",
                }}
              >
                <p style={{ textAlign: "center", marginBottom: "0px" }}>
                  Total
                </p>
                <p style={{ textAlign: "center" }}>Customers</p>
                <h3 style={{ color: "#FFFFFF", textAlign: "center" }}>
                  {userCount.user_count ? userCount.user_count : 0}
                </h3>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <path
                    fill="gray"
                    fill-opacity="1"
                    d="M0,128L34.3,112C68.6,96,137,64,206,96C274.3,128,343,224,411,250.7C480,277,549,235,617,213.3C685.7,192,754,192,823,181.3C891.4,171,960,149,1029,117.3C1097.1,85,1166,43,1234,58.7C1302.9,75,1371,149,1406,186.7L1440,224L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
                  ></path>
                </svg>
              </Card>
            </div>
          </Col>
          <Col span={8}>
            <div
              style={{
                padding: "30px",
              }}
            >
              <Card
                style={{
                  backgroundColor: "#749FFA",
                  borderRadius: "20px",
                }}
              >
                <p style={{ textAlign: "center", marginBottom: "0px" }}>
                  Total
                </p>
                <p style={{ textAlign: "center" }}>Tournaments</p>
                <h3 style={{ color: "#FFFFFF", textAlign: "center" }}>
                  {tournamentCount.tournament_count
                    ? tournamentCount.tournament_count
                    : 0}
                </h3>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <path
                    fill="rgba(255,255,255,0.3)"
                    fill-opacity="1"
                    d="M0,128L34.3,112C68.6,96,137,64,206,96C274.3,128,343,224,411,250.7C480,277,549,235,617,213.3C685.7,192,754,192,823,181.3C891.4,171,960,149,1029,117.3C1097.1,85,1166,43,1234,58.7C1302.9,75,1371,149,1406,186.7L1440,224L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
                  ></path>
                </svg>
              </Card>
            </div>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <div
              style={{
                padding: "30px",
              }}
            >
              <Card>
                <Column {...config} />
                <h6 style={{ textAlign: "center", marginTop: "5px" }}>
                  Tournament wise customers
                </h6>
              </Card>
            </div>
          </Col>
        </Row>
      </>
    </>
  );
}

export default Dashboard;
