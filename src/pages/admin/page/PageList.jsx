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

export default function PageList() {
  const [pageList, setPageList] = useState([]);
  const navigate = useNavigate();
  const getLoginData = localStorage.getItem("loginData");

  const getData = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/page`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setPageList(response.data);
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

  function deletePage(id) {
    const storageData = JSON.parse(getLoginData);
    const token = storageData.accessToken;
    axios
      .delete(`${API_PUBLIC_URL}api/page/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        toast.success("Deleted successfully");
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
  console.log(pageList)

  const columns = [
    {
      title: "SL",
      dataIndex: "id",
      key: "id",
      render: (_, record) => pageList.indexOf(record) + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (_, record) =>
        record.name ? record.name : null,
    },
    {
      title: "Slug",
      dataIndex: "slug",
      render: (_, record) =>
        record.slug ? record.slug : null,
    },
    
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space wrap>
          <Link to={`/admin/pages/${record.id}`}>
            <Button type="primary" icon={<EditOutlined />} shape="circle" />
          </Link>

          <Button
            type="danger"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => {
              window.confirm("Are You Delete This Item?") &&
                deletePage(record.id);
            }}
          />
        </Space>
      ),
    },
  ];
  const data = pageList;

  return (
    <>
      <Card style={{ height: 80 }}>
        <div className="float-start">
          <Title level={4}>Page List</Title>
        </div>

        <div className="float-end d-flex">
          <div>
            <Link
              to={`/admin/pages/create`}
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
