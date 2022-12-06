import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Row, Typography, Upload } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";
const { Title } = Typography;

export default function CountryEdit() {
  const [name, setName] = useState("");
  const [short_name, setShort_name] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState();
  const [im, setIm] = useState("");
  let navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    handleLogin();
    getCountryDetails();
  }, []);

  const getLoginData = localStorage.getItem("loginData");

  const storageData = JSON.parse(getLoginData);
  const token = storageData.accessToken;

  const getCountryDetails = () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .get(`${API_PUBLIC_URL}api/countries/${id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            // setFormValues({
            //   ...formValues,
            //   name: response.data.name,
            //   detail: response.data.detail,
            // });
            setName(response.data.name);
            setShort_name(response.data.short_name);
            setIm(response.data.flag);
            console.log(response.data);
          });
      })();
    }
  };

  const handleLogin = () => {
    if (getLoginData === null) {
      navigate("/login");
    }
  };

  const submitForm = async (e) => {
    // e.preventDefault();

    if (selectedFile !== null) {
      const validExtensions = ["png", "jpeg", "jpg", "gif"];
      const fileExtension = selectedFile.type.split("/")[1];
      const exist = validExtensions.includes(fileExtension);
      if (!exist) {
        toast.error("Please give proper image format");
        return;
      }
    }

    if (name.trim() === "") {
      toast.error("Name field is required!");
    }
    // else if (selectedFile === null) {
    //   toast.error("Image file is required!");
    // }
    else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("short_name", short_name);
      formData.append("selectedFile", selectedFile);

      // for (var [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }
      // console.log("formData", formData.name);

      console.log(formData.get("name"));
      // console.log(formData.get("selectedFile").name);
      // return null;

      await axios
        .put(`${API_PUBLIC_URL}api/countries/${id}`, formData, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log(response);
          setName("");
          setShort_name("");
          setSelectedFile(null);

          toast.success("Updated Successfully");
          navigate("/admin/countries");
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
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  // const onSelectFile = (e) => {
  //   if (!e.target.files || e.target.files.length === 0) {
  //     setSelectedFile(undefined);
  //     return;
  //   }
  //   setSelectedFile(e.target.files[0]);
  // };

  const onSelectFile = (e) => {
    console.log('Upload event:', e);
    if (e.fileList.length === 0) {
      setSelectedFile(undefined)
      return;
    } else {
      setSelectedFile(e.fileList[0].originFileObj)

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
            <Title level={4}>Country Create</Title>
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
              label="Country Name"
            >
              <Input
                placeholder="Enter Country Name"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Short Name"
            >
              <Input
                placeholder="Enter Short Name"
                value={short_name}
                name="short_name"
                onChange={(e) => setShort_name(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="upload"
              label="Image"
              valuePropName="file"
              multiple={false}
              getValueFromEvent={onSelectFile}
              placeholder="Enter Image"
            >
              <Upload multiple={false} maxCount="1" name="selectedFile" onChange={onSelectFile} listType="picture">
                <Button icon={<UploadOutlined />}>Browse</Button>
              </Upload>
              <div style={{ marginTop: "10px" }}>
                {selectedFile ? (
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
