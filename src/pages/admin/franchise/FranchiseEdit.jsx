import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Select, Typography, Upload } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

const { Title } = Typography;
const { Option } = Select;

export default function FranchiseEdit() {
  const [name, setName] = useState("");
  const [country_id, setCountry_id] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [logo, setLogo] = useState(null);
  const [preview, setPreview] = useState();
  const [im, setIm] = useState("");
  let navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    handleLogin();
    getFranchiseDetails();
  }, []);

  const getLoginData = localStorage.getItem("loginData");

  const handleLogin = () => {
    if (getLoginData === null) {
      navigate("/login");
    }
  };

  const getFranchiseDetails = () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .get(`${API_PUBLIC_URL}api/franchises/${id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setName(response.data.name);
            setCountry_id(response.data.country_id);
            setIm(response.data.logo);
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
            }
            navigate("/admin/no-permission");
          });
      })();
    }
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      toast.error("Franchise Name field is required!");
    } else if (country_id === "") {
      toast.error("Country Name field is required!");
    }
    // else if (logo === null) {
    //   toast.error("Image file is required!");
    // }
    else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("country_id", country_id);
      formData.append("logo", logo);

      //   for (var [key, value] of formData.entries()) {
      //     console.log(key, value);
      //   }
      //   return;

      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .put(`${API_PUBLIC_URL}api/franchises/${id}`, formData, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log(response);
          setName("");
          setCountry_id("");
          setCountryList([]);
          setLogo(null);

          toast.success("Updated Successfully");
          navigate("/admin/franchises");
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
    console.log('Upload event:', e);
    if (e.fileList.length === 0) {
      setLogo(undefined)
      return;
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
            <Title level={4}>Franchise Edit</Title>
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
              label="Franchise Name"
            >
              <Input
                placeholder="Enter Franchise Name"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>

            <Form.Item label="Origin Country" >
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
                {logo ? (
                  <img src={preview} alt="" width="80px" height="50px" />
                ) : (
                  <img
                    src={`${API_PUBLIC_URL}${im}`}
                    alt=""
                    width="80px"
                    height="50px"
                  />
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
                    navigate("/admin/franchises");
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
