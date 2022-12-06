import { Button, Card, Col, Form, Input, Row, Select, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

const { Title } = Typography;
const { Option } = Select;

export default function TournamentTeamEdit() {
  const [name, setName] = useState("");
  const [tournament_id, setTournament_id] = useState("");
  const [tournamentList, setTournamentList] = useState([]);
  const [category, setCategory] = useState("");
  const [country_id, setCountry_id] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [franchise_id, setFranchise_id] = useState("");
  const [franchiseList, setFranchiseList] = useState([]);
  let navigate = useNavigate();
  const { id } = useParams();

  const getLoginData = localStorage.getItem("loginData");

  useEffect(() => {
    getSelectTournamentDetails();
    getSelectCountryDetails();
    getSelectFranchiseDetails();
    getTournamentTeamDetails();
  }, []);

  const getTournamentTeamDetails = () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .get(`${API_PUBLIC_URL}api/tournament-teams/${id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setName(response.data.name);
            setTournament_id(response.data.tournament_id);
            setCategory(response.data.category);
            setCountry_id(response.data.country_id);
            setFranchise_id(response.data.franchise_id);
            console.log(response.data);
          });
      })();
    }
  };

  const getSelectTournamentDetails = async () => {
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
          .get(`${API_PUBLIC_URL}api/tournaments/${tournament_id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setCategory(response.data.category);
            console.log(response.data.category);
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

  const getSelectCountryDetails = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/countries`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setCountryList(response.data);
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

  const getSelectFranchiseDetails = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/franchises`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setFranchiseList(response.data);
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

  const submitForm = async (e) => {
    // e.preventDefault();

    console.log("cou ffffffffff", country_id);
    console.log("fra ffffffffff", franchise_id);
    // return;

    // const letters = /^[A-Za-z]+$/;
    const letters = /^[a-zA-Z\s]*$/;
    if (name.trim() === "") {
      toast.error("Team Name field is required!");
    } else if (!name.match(letters)) {
      toast.error("Please input alphabet characters only");
    } else if (tournament_id === "") {
      toast.error("Tournament field is required!");
    } else if (category === "") {
      toast.error("Category field is required!");
    } else if (category === "International" && country_id === 0) {
      toast.error("Country field is required!");
    } else if (category === "Franchise" && franchise_id === 0) {
      toast.error("Franchise field is required!");
    } else {
      //   const formData = new FormData();
      //   formData.append("name", name);
      //   formData.append("tournament_id", tournament_id);

      //   for (var [key, value] of formData.entries()) {
      //     console.log(key, value);
      //   }
      //   return;

      const postBody = {
        name: name,
        tournament_id: tournament_id,
        category: category,
        country_id: country_id,
        franchise_id: franchise_id,
      };

      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .put(`${API_PUBLIC_URL}api/tournament-teams/${id}`, postBody, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setName("");
          setTournament_id("");
          setCategory("");
          setCountry_id("");
          setFranchise_id("");

          toast.success("Successfully updated!");
          navigate("/admin/tournament-teams");
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
            <Title level={4}>Tournament Team Edit</Title>
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
            <Form.Item
              label="Group Name"
              rules={[
                {
                  required: true,
                  message: "Please input your group name!",
                },
              ]}
            >
              <Input name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>

            <Form.Item label="Tournament Name" rules={[{ required: true }]}>
              <Select
                placeholder="Select Tournament"
                value={tournament_id}
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

            {category === "International" && (
              <Form.Item label="Country Name" >
                <Select
                  placeholder="Select Country"
                  value={country_id}
                  name="country_id"
                  onChange={(e) => setCountry_id(e)}
                >
                  <Option value="">Select Country</Option>
                  {countryList.map((item, index) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}

            {category === "Franchise" && (
              <Form.Item label="Franchise Name" >
                <Select
                  placeholder="Select Franchise"
                  value={franchise_id}
                  name="franchise_id"
                  onChange={(e) => setFranchise_id(e)}
                >
                  <Option value="">Select Franchise</Option>
                  {franchiseList.map((item, index) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}

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
                    navigate("/admin/tournament-teams");
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
