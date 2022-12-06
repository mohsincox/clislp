import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Select, Typography, Upload } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

const { Title } = Typography;
const { Option } = Select;

export default function ClubCreate() {
  const [name, setName] = useState("");
  const [game_id, setGame_id] = useState("");
  const [gameList, setGameList] = useState([]);
  const [country_id, setCountry_id] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [franchise_id, setFranchise_id] = useState("");
  const [franchiseList, setFranchiseList] = useState([]);
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    handleLogin();
  }, []);

  const getLoginData = localStorage.getItem("loginData");

  const handleLogin = () => {
    if (getLoginData === null) {
      navigate("/login");
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
          .get(`${API_PUBLIC_URL}api/games`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setGameList(response.data);
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
  }, []);

  useEffect(() => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
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
      })();
    }
  }, []);

  useEffect(() => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
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
      })();
    }
  }, []);

  const submitForm = async (e) => {
    // e.preventDefault();

    if (name.trim() === "") {
      toast.error("Franchise Name field is required!");
    } else if (game_id === "") {
      toast.error("Game Name field is required!");
    } else if (country_id === "") {
      toast.error("Country Name field is required!");
    } else if (franchise_id === "") {
      toast.error("Franchise Name field is required!");
    }
    // else if (logo === null) {
    //   toast.error("Image file is required!");
    // }
    else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("game_id", game_id);
      formData.append("country_id", country_id);
      formData.append("franchise_id", franchise_id);
      formData.append("logo", logo);

      //   for (var [key, value] of formData.entries()) {
      //     console.log(key, value);
      //   }
      //   return;

      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .post(`${API_PUBLIC_URL}api/clubs`, formData, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log(response);
          setName("");
          setGame_id("");
          setGameList([]);
          setCountry_id("");
          setCountryList([]);
          setFranchise_id("");
          setFranchiseList([]);
          setLogo(null);

          toast.success("Created Successfully");
          navigate("/admin/clubs");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 400) {
            toast.error(error.response.data.msg);
          }
          if (error.response.status === 401) {
            toast.error(error.response.data.msg);
          }
          if (error.response.status === 403) {
            toast.error("No Permission");
            navigate("/admin/no-permission");
          }
        });
    }
  };

  useEffect(() => {
    if (!logo) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(logo);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [logo]);

  // const onSelectFile = (e) => {
  //   if (!e.target.files || e.target.files.length === 0) {
  //     setLogo(undefined);
  //     return;
  //   }
  //   setLogo(e.target.files[0]);
  // };


  const onSelectFile = (e) => {
    // console.log('Upload event:', e);
    if (e.fileList.length === 0) {
      setLogo(null)
    } else {
      setLogo(e.fileList[0].originFileObj)

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
            <Title level={4}>Club Create</Title>
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
              name="club-name-field"
              label="Club Name"
              rules={[{ required: true }]}
            >
              <Input
                placeholder="Enter Club Name"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>

            <Form.Item name="game-field" label="Game" rules={[{ required: true }]}>
              <Select
                placeholder="Select Game"
                value={game_id}
                name="game_id"
                onChange={(e) => setGame_id(e)}
              >
                <Option value="">Select Game</Option>
                {gameList.map((sm, index) => (
                  <Option key={sm.id} value={sm.id}>
                    {sm.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="origin-country-field" label="Origin Country" rules={[{ required: true }]}>
              <Select
                placeholder="Select Country"
                value={country_id}
                name="country_id"
                onChange={(e) => setCountry_id(e)}
              >
                <Option value="">Select Country</Option>
                {countryList.map((sm, index) => (
                  <Option key={sm.id} value={sm.id}>
                    {sm.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="origin-franchise-field" label="Origin Franchise" rules={[{ required: true }]}>
              <Select
                placeholder="Select Franchise"
                value={franchise_id}
                name="franchise_id"
                onChange={(e) => setFranchise_id(e)}
              >
                <Option value="">Select Franchise</Option>
                {franchiseList.map((sm, index) => (
                  <Option key={sm.id} value={sm.id}>
                    {sm.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Logo"
              valuePropName="file"
              multiple={false}
              // getValueFromEvent={onSelectFile}
              placeholder="Enter Image"
            >
              <Upload multiple={false} maxCount="1" placeholder="Enter Image"
                name="logo"
                onChange={onSelectFile} listType="picture">
                <Button icon={<UploadOutlined />}>Browse</Button>
              </Upload>
              <div style={{ marginTop: "10px" }}>
                {logo && (
                  <img src={preview} alt="" width="80px" height="50px" />
                )}
              </div>
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
                    navigate("/admin/clubs");
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
