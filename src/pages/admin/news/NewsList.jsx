import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

import {
  DeleteOutlined,
  EditOutlined,
  FormOutlined
} from "@ant-design/icons";
import { Button, Card, Space, Table, Typography } from "antd";
const { Title } = Typography;

export default function NewsList() {
  const [newsList, setNewsList] = useState([]);
  const navigate = useNavigate();
  const getLoginData = localStorage.getItem("loginData");

  const getData = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/news`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setNewsList(response.data);
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
    getData();
  }, []);

  function deleteNews(id) {
    const storageData = JSON.parse(getLoginData);
    const token = storageData.accessToken;
    axios
      .delete(`${API_PUBLIC_URL}api/news/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        toast.error("Deleted Successfully");
        getData();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 403) {
          toast.error("No Permission");
          navigate("/admin/no-permission");
        }
      });
  }

    const columns = [
    {
      title: "SL",
      dataIndex: "id",
      key: "id",
      render: (_, record) => newsList.indexOf(record) + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      render: (_, record) =>
        record.title ? record.title : null,
    },
    {
      title: "Body",
      dataIndex: "body",
      render: (_, record) =>
        record.body ? record.body : null,
    },
    {
      title: "Tournament",
      dataIndex: "tournament",
      render: (_, record) =>
        record.tournament.name ? record.tournament.name : null,
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (_, record) =>
        record.image ? (
          <img src={`${API_PUBLIC_URL}${record.image}`} width="80px" />
        ) : null,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space wrap>
          <Link to={`/admin/news/${record.id}`}>
            <Button type="primary" icon={<EditOutlined />} shape="circle" />
          </Link>

          <Button
            type="danger"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => {
              window.confirm("Are You Delete This Item?") &&
                deleteNews(record.id);
            }}
          />
        </Space>
      ),
    },
  ];
  const data = newsList;


  return (
    <>
      <Card style={{ height: 80 }}>
        <div className="float-start">
          <Title level={4}>News List</Title>
        </div>

        <div className="float-end d-flex">
          <div>
            <Link
              to={`/admin/news/create`}
              style={{ textDecoration: " none" }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "5px",
                }}
              >
                <FormOutlined /> Create New
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      <Card
        style={{
          marginTop: 16,
        }}
        type="inner"
      >
        <Table
          rowKey="id"
          scroll={{ x: "600px" }}
          columns={columns}
          dataSource={data}
          size="middle"
        />
      </Card>
    </>
  );
}
