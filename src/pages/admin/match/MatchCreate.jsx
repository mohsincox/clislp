import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "./../../../constants";
const { Title } = Typography;
const { Option } = Select;

export default function MatchCreate() {
  // const [stage_name, setStage_name] = useState("");
  const [tournament_id, setTournament_id] = useState("");
  const [tournament_team_one_id, setTournament_team_one_id] = useState("");
  const [tournament_team_two_id, setTournament_team_two_id] = useState("");
  const [start_date, setStart_date] = useState("");
  const [start_time, setStart_time] = useState("");
  const [venue, setVenue] = useState("");
  const [tournamentList, setTournamentList] = useState([]);
  const [tourTeamList, setTourTeamList] = useState([]);
  const [status, setStatus] = useState("Active");
  const navigate = useNavigate();

  const getLoginData = localStorage.getItem("loginData");
  // console.log(venue)


  const setDateInput = (e) => {
    if (e === null || e === "") {
      setStart_date(null)
    } else {
      var d = new Date(e._d),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2)
        month = '0' + month;
      if (day.length < 2)
        day = '0' + day;
      // console.log(start_date)
      setStart_date([year, month, day].join('-'))
    }
  }

  useEffect(() => {
    getSelectTournament();
  }, []);

  const getSelectTournament = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/tournaments`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setTournamentList(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 403) {
            toast.error("No Permission");
            navigate("/admin/no-permission");
          }
        });
    }
  };

  useEffect(() => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .get(`${API_PUBLIC_URL}api/ws-fixtures/tt/${tournament_id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setTourTeamList(response.data);
            console.log("setTourTeamList", response.data);
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 403) {
              toast.error("No Permission");
              navigate("/admin/no-permission");
            }
          });
      })();
    }
  }, [tournament_id]);

  const submitForm = async (e) => {
    // e.preventDefault();

    // if (stage_name.trim() === "") {
    //   toast.error("Stage Name field is required!");
    // } else
    if (tournament_id === "") {
      toast.error("Tournament field is required!");
    } else if (tournament_team_one_id === "") {
      toast.error("Tournament Team One field is required!");
    } else if (tournament_team_two_id === "") {
      toast.error("Tournament Team Two field is required!");
    } else if (tournament_team_one_id === tournament_team_two_id) {
      toast.error("Both Team can not be same");
    } else if (status === "") {
      toast.error("Status field is required!");
    } else {
      //   const formData = new FormData();
      //   formData.append("name", name);
      //   formData.append("tournament_id", tournament_id);

      //   for (var [key, value] of formData.entries()) {
      //     console.log(key, value);
      //   }
      //   return;

      const postBody = {
        // stage_name: stage_name,
        tournament_id: tournament_id,
        tournament_team_one_id: tournament_team_one_id,
        tournament_team_two_id: tournament_team_two_id,
        start_date: start_date,
        start_time: start_time,
        venue: venue,
        status: status,
      };

      // console.log("first.......", start_date);
      // return;

      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .post(`${API_PUBLIC_URL}api/matches`, postBody, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          // setStage_name("");
          setTournament_id("");
          setTournament_team_one_id("");
          setTournament_team_two_id("");
          setVenue("");
          setStatus("");

          toast.success("Created Successfully");
          navigate("/admin/matches");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 403) {
            toast.error("No Permission");
            navigate("/admin/no-permission");
          }
        });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div>
        <Card>
          <div style={{
            textAlign: "center"

          }}>
            <Title level={4}>Match Create</Title>
          </div>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 10,
            }}
            initialValues={{
              remember: true,
            }}
            // onFinish={submitForm}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item name="tournament-name" label="Tournament Name" rules={[{ required: true }]}>
              <Select
                placeholder="Select Tournament"
                // value={tournament_id}
                name="tournament_id"
                onChange={(e) => setTournament_id(e)}
              >
                <Option value="">Select Tournament</Option>
                {tournamentList.map((item, index) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="tournament-team-one" label="Tournament Team One" rules={[{ required: true }]}>
              <Select
                placeholder="Select Team One"
                // value={tournament_team_one_id}
                name="tournament_team_one_id"
                onChange={(e) => setTournament_team_one_id(e)}
              >
                <Option value="">Select team one</Option>
                {tourTeamList.map((item, index) => (
                  <Option key={index} value={item.id}>
                    {item.country == null
                      ? item.franchise.name
                      : item.country.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="tournament-team-two" label="Tournament Team Two" rules={[{ required: true }]}>
              <Select
                placeholder="Select Team Two"
                // value={tournament_team_one_id}
                name="tournament_team_two_id"
                onChange={(e) => setTournament_team_two_id(e)}
              >
                <Option value="">Select team two</Option>
                {tourTeamList.map((item, index) => (
                  <Option key={index} value={item.id}>
                    {item.country == null
                      ? item.franchise.name
                      : item.country.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Start Date"
            >
              <DatePicker
                name="start_date"
                onChange={(e) => setDateInput(e)}
                allowClear={false}
              />
            </Form.Item>
            <Form.Item
              label="Start Time"
            >
              <Input
                placeholder="Enter start time"
                value={start_time}
                name="start_time"
                onChange={(e) => setStart_time(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Venue"
            >
              <Input
                placeholder="Enter Venue"
                value={venue}
                name="venue"
                onChange={(e) => setVenue(e.target.value)}
              />
            </Form.Item>

            <Form.Item name="status-field" label="Status" rules={[{ required: true }]}>
              <Select
                placeholder="Select Status"
                value={status}
                name="status"
                onChange={(e) => setStatus(e)}
              >
                <Option value="">Select Tournament</Option>
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
              </Select>
            </Form.Item>

            <Row>
              <Col
                span={18}
                style={{
                  textAlign: "right",
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => submitForm()}
                >
                  Submit
                </Button>

                <Button
                  type="danger"
                  style={{
                    marginLeft: "20px",
                  }}
                  htmlType="submit"
                  onClick={() => {
                    navigate("/admin/matches");
                  }}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </>
  );
}
