import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Select, Typography, Upload } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";
const { Title } = Typography;
const { Option } = Select;

export default function TournamentCreate() {
  const [name, setName] = useState("");
  const [game_id, setGame_id] = useState("");
  const [gameList, setGameList] = useState([]);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [status, setStatus] = useState("Active");
  const [upcomming, setUpcomming] = useState("No");
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState();
  const [category, setCategory] = useState("");
  const [disable, setDisable] = React.useState(false);
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

  const submitForm = async (e) => {
    // e.preventDefault();

    if (disable) {
      console.log("disable", disable);
      return;
    }

    if (game_id === "") {
      toast.error("Game Name field is required!");
    } else if (name.trim() === "") {
      toast.error("Tournament Name field is required!");
    } else if (category.trim() === "") {
      toast.error("Tournament Type field is required!");
    } else if (status === "") {
      toast.error("Status field is required!");
    } else if (upcomming === "") {
      toast.error("Upcomming field is required!");
    }
    // else if (logo === null) {
    //   toast.error("Image file is required!");
    // }
    else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("game_id", game_id);
      formData.append("month", month);
      formData.append("year", year);
      formData.append("category", category);
      formData.append("status", status);
      formData.append("upcomming", upcomming);
      formData.append("logo", logo);

      // for (var [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }
      // console.log("formData", formData);

      // console.log(formData.get("name"));
      // console.log(formData.get("selectedFile").name);
      // return null;

      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .post(`${API_PUBLIC_URL}api/tournaments`, formData, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log(response);
          setName("");
          setGame_id("");
          setGameList([]);
          setMonth("");
          setYear("");
          setCategory("");
          setStatus("");
          setUpcomming("");
          setLogo(null);
          setDisable(true);

          toast.success("Successfully created!");
          navigate("/admin/tournaments");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 400) {
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
  //   console.log('Upload event:', e);
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

  // console.log(logo)

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  return (
    <>
      <Card>
        <div style={{
          textAlign: "center"

        }}>
          <Title level={4}>Tournament Create</Title>
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
          onFinish={submitForm}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item name="game_name" label="Game Name" rules={[{ required: true }]}>
            <Select
              placeholder="Select Game"
              value={game_id}
              name="game_id"
              onChange={(e) => setGame_id(e)}
            >
              {gameList.map((item, index) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Tournament Name"
            name="tournament_name"
            rules={[
              {
                required: true,
                message: "Enter Tournament Name",
              },
            ]}
          >
            <Input value={name} name="name" placeholder="Enter Tournament Name" onChange={(e) => setName(e.target.value)} />
          </Form.Item>

          <Form.Item name="tournament_type" label="Tournament Type" rules={[{ required: true }]}>
            <Select
              placeholder="Select Category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e)}
            >
              <Option value="">Select Category</Option>
              <Option value="International">International</Option>
              <Option value="Franchise">Franchise</Option>
            </Select>
          </Form.Item>

          <Form.Item name="month-field" label="Month">
            <Select
              placeholder="Select Month"
              value={month}
              name="month"
              onChange={(e) => setMonth(e)}
            >
              <Option value="">Select Month</Option>
              <Option value="January">January</Option>
              <Option value="February">February</Option>
              <Option value="March">March</Option>
              <Option value="April">April</Option>
              <Option value="May">May</Option>
              <Option value="June">June</Option>
              <Option value="July">July</Option>
              <Option value="August">August</Option>
              <Option value="September">September</Option>
              <Option value="October">October</Option>
              <Option value="November">November</Option>
              <Option value="December">December</Option>
            </Select>
          </Form.Item>

          <Form.Item name="year-field" label="Year">
            <Select
              placeholder="Select Year"
              value={year}
              name="year"
              onChange={(e) => setYear(e)}
            >
              <Option value="">Select Year</Option>
              <Option value="2022">2022</Option>
              <Option value="2023">2023</Option>
              <Option value="2024">2024</Option>
              <Option value="2025">2025</Option>
              <Option value="2026">2026</Option>
            </Select>
          </Form.Item>

          <Form.Item name="status-field" label="Status" rules={[{ required: true }]}>
            <Select
              placeholder="Select Status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e)}
            >
              <Option value="">Select Status</Option>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item name="upcomming-field" label="Upcomming" rules={[{ required: true }]}>
            <Select
              placeholder="Select Upcomming"
              name="upcomming"
              value={upcomming}
              onChange={(e) => setUpcomming(e)}
            >
              <Option value="">Select Upcomming</Option>
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="upload"
            label="Logo"
            valuePropName="file"
            multiple={false}
          // getValueFromEvent={onSelectFile}
          >
            <Upload multiple={false} maxCount="1" name="logo" onChange={onSelectFile} listType="picture">
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
                onClick={submitForm}
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
                  navigate("/admin/tournaments");
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
}
