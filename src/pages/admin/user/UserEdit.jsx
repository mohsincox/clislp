import { Button, Card, Col, Form, Input, Row, Select, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";
const { Title } = Typography;
const { Option } = Select;

export default function UserEdit() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role_id, setRole_id] = useState("");
  const [roleList, setRoleList] = useState([]);
  let navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    handleLogin();
  }, []);

  const getLoginData = localStorage.getItem("loginData");

  const handleLogin = () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .get(`${API_PUBLIC_URL}api/users/${id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setName(response.data.name);
            setEmail(response.data.email);
            setRole_id(response.data.role_id);
            console.log(response.data);
          });
      })();
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
          .get(`${API_PUBLIC_URL}api/roles`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setRoleList(response.data);
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
    e.preventDefault();

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (name.trim() === "") {
      toast.error("Name field is required!");
    } else if (email.trim() === "") {
      toast.error("Email field is required!");
    } else if (!regex.test(email)) {
      toast.error("Not valid email format!");
    } else if (role_id === "") {
      toast.error("Role field is required!");
    } else {
      //   const formData = new FormData();
      //   formData.append("name", name);
      //   formData.append("country_id", country_id);

      //   //   for (var [key, value] of formData.entries()) {
      //   //     console.log(key, value);
      //   //   }
      //   //   return;

      const postBody = {
        name: name,
        email: email,
        role_id: role_id,
      };

      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .put(`${API_PUBLIC_URL}api/users/${id}`, postBody, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log(response);
          setName("");
          setEmail("");
          setRole_id("");
          setRoleList([]);

          toast.success("Successfully updated!");
          navigate("/admin/users");
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
            <Title level={4}>User Edit</Title>
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
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>

            <Form.Item label="Role" rules={[{ required: true }]}>
              <Select
                placeholder="Select a option and change input text above"
                value={role_id}
                name="role_id"
                onChange={(e) => setRole_id(e)}
                allowClear
              >
                {roleList.map((item, index) => (
                  <Option key={item.id} value={item.id}>
                    {item.role_name}
                  </Option>
                ))}
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
                    navigate("/admin/users");
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
