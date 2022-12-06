import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";
const { Title } = Typography;

function GameCreate() {
  const initialValues = { name: "", detail: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues.name.trim() === "") {
      toast.error("Game Name field is required!");
    } else {
      setFormErrors(validate(formValues));
      setIsSubmit(true);
    }
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      handleLogin();
    }
  }, [formErrors]);

  const getLoginData = localStorage.getItem("loginData");

  const handleLogin = () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .post(`${API_PUBLIC_URL}api/games`, formValues, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            toast.success("Created Successfully");
            navigate("/admin/games");
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
      })();
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Game Name is required";
    }

    return errors;
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
            <Title level={4}>Game Create</Title>
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
              name="name-field"
              label="Name"
              rules={[{ required: true }]}
            >
              <Input
                placeholder="Enter game Name"
                value={formValues.name}
                name="name"
                onChange={handleChange}
              />
            </Form.Item>

            <Form.Item
              label="Detail"
            >
              <Input
                placeholder="Enter Detail"
                value={formValues.detail}
                name="detail"
                onChange={handleChange}
              />
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
                  onClick={handleSubmit}
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
                    navigate("/admin/games");
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

export default GameCreate;
