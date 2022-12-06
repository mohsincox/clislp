import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";
const { Title } = Typography;

function RoleEdit() {
  const initialValues = { role_name: "", role_description: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues.role_name.trim() === "") {
      toast.error("Role Name field is required!");
    } else if (formValues.role_description.trim() === "") {
      toast.error("Role Description field is required!");
    } else {
      setFormErrors(validate(formValues));
      setIsSubmit(true);
    }
  };

  useEffect(() => {
    getRoleDetails();
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      handleLogin();
    }
  }, [formErrors]);

  const getLoginData = localStorage.getItem("loginData");

  const getRoleDetails = () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .get(`${API_PUBLIC_URL}api/roles/${id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setFormValues({
              ...formValues,
              role_name: response.data.role_name,
              role_description: response.data.role_description,
            });
            console.log(response.data);
          });
      })();
    }
  };

  const handleLogin = () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .put(`${API_PUBLIC_URL}api/roles/${id}`, formValues, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            toast.success("Updated Successfully");
            navigate("/admin/roles");
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 400) {
              toast.error(error.response.data.message);
            }
            if (error.response.status === 401) {
              toast.error(error.response.data.message);
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
    // if (!values.role_name) {
    //   errors.role_name = "Role Name is required";
    // }
    // if (!values.role_description) {
    //   errors.role_description = "Role description is required";
    // }
    return errors;
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Card>
        <div style={{
          textAlign: "center"

        }}>
          <Title level={4}>Role Edit</Title>
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
          onFinish={handleSubmit}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Role Name"
            rules={[
              {
                required: true,
                message: "Enter Role Name",
              },
            ]}
          >
            <Input name="role_name" value={formValues.role_name} onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Role Description"
            rules={[
              {
                required: true,
                message: "Enter Role Description",
              },
            ]}
          >
            <Input name="role_description" value={formValues.role_description} onChange={handleChange} />
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
                  navigate("/admin/roles");
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

export default RoleEdit;
