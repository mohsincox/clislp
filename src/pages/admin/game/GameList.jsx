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
import { Button, Card, Table, Typography } from "antd";
import Space from "antd/lib/space";
const { Title } = Typography;


export default function GameList() {
  const [gameList, setGameList] = useState([]);
  const navigate = useNavigate();
  const getLoginData = localStorage.getItem("loginData");

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

  function deleteGame(id) {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .delete(`${API_PUBLIC_URL}api/games/${id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then(() => {
            toast.error("Deleted successfully");
            //   getData();
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
  }


  const columns = [
    {
      title: "SL",
      dataIndex: "id",
      key: "id",
      render: (_, record) => gameList.indexOf(record) + 1,
    },
    {
      title: "Game Name",
      dataIndex: "game_name",
      render: (_, record) =>
        record.name ? record.name : null,
    },
    {
      title: "Details",
      dataIndex: "detals",
      render: (_, record) =>
        record.detail ? record.detail : null,
    },
    
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space wrap>
          <Link to={`/admin/games/${record.id}`}>
            <Button type="primary" icon={<EditOutlined />} shape="circle" />
          </Link>

          <Button
            type="danger"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => {
              window.confirm("Are You Delete This Item?") &&
                deleteGame(record.id);
            }}
          />
        </Space>
      ),
    },
  ];
  const data = gameList;

  return (
    <>
      <Card style={{ height: 80 }}>
        <div className="float-start">
          <Title level={4}>Game List</Title>
        </div>

        <div className="float-end d-flex">
          <div>
            <Link
              to={`/admin/games/create`}
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
