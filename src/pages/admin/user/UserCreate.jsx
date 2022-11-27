import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";
import { Card, Col, Row, Select, Space } from "antd";
import { Button, Form, Input } from "antd";

const { Option } = Select;

export default function UserCreate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role_id, setRole_id] = useState("");
  const [roleList, setRoleList] = useState([]);
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
    // e.preventDefault();

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (name.trim() === "") {
      toast.error("Name field is required!");
    } else if (email.trim() === "") {
      toast.error("Email field is required!");
    } else if (!regex.test(email)) {
      toast.error("Not valid email format!");
    } else if (password === "") {
      toast.error("Password field is required!");
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
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
        password: password,
        role_id: role_id,
      };

      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .post(`${API_PUBLIC_URL}api/users`, postBody, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log(response);
          setName("");
          setEmail("");
          setPassword("");
          setRole_id("");
          setRoleList([]);

          toast.success("Successfully created!");
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
      {/* <div className="container"> */}

      <Card>
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
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input onChange={(e) => setName(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>

          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
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
                  navigate("/admin/users");
                }}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* <div className="col-sm-8 offset-sm-2">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">User Create</h5>
            <form onSubmit={submitForm} encType="multipart/form-data">
              <div className="mb-3 row">
                <label className="form-label col-sm-3">
                  Name <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">
                  Email <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Email"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">
                  Password <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Password"
                    value={password}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">
                  Role <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                  <select
                    className="form-select"
                    value={role_id}
                    name="role_id"
                    onChange={(e) => setRole_id(e.target.value)}
                  >
                    <option value="">Select Role</option>
                    {roleList.map((item, index) => (
                      <option key={item.id} value={item.id}>
                        {item.role_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="float-end">
                <button
                  className="btn btn-danger me-3"
                  onClick={() => {
                    navigate("/admin/users");
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={submitForm}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> */}
      {/* </div> */}
    </>
  );
}
