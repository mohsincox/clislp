import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";
import { Card, Button, Table, Form, Input, Space } from "antd";
import {
  EditOutlined,
  FormOutlined,
  DeleteOutlined,
  ContainerOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Typography } from "antd";
const { Title } = Typography;

export default function TournamentList() {
  const [tournamentList, setTournamentList] = useState([]);
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
          .get(`${API_PUBLIC_URL}api/tournaments`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setTournamentList(response.data);
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

  function deleteTournament(id) {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .delete(`${API_PUBLIC_URL}api/tournaments/${id}`, {
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
                .get(`${API_PUBLIC_URL}api/tournaments`, {
                  headers: {
                    Authorization: token,
                  },
                })
                .then((response) => {
                  setTournamentList(response.data);
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
      render: (_, record) => tournamentList.indexOf(record) + 1,
    },
    {
      title: "Tournament",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Game",
      dataIndex: "game",
      render: (_, record) => (record.game ? record.game["name"] : null),
    },
    {
      title: "Type",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Upcomming",
      dataIndex: "upcomming",
      key: "upcomming",
    },
    {
      title: "Logo",
      dataIndex: "logo",
      render: (_, record) =>
        record.logo ? (
          <img src={`${API_PUBLIC_URL}${record.logo}`} width="80px" />
        ) : null,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space wrap>
          <Link to={`/admin/tournaments/${record.id}`}>
            <Button type="primary" icon={<EditOutlined />} shape="circle" />
          </Link>

          <Button
            type="danger"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => {
              window.confirm("Are You Delete This Item?") &&
                deleteTournament(record.id);
            }}
          />
        </Space>
      ),
    },
  ];

  const data = tournamentList;

  console.log("data", data);

  return (
    <>
      <Card
      // type="inner"
      // title="Inner Card title"
      // extra={<a href="#">More</a>}
      style={{ height: 80 }}
      >
        <div className="float-start">
          <Title level={3}>Tournament List</Title>
        </div>

        <div className="float-end d-flex">
          <div>
            <Link
              to={`/admin/tournaments/create`}
              style={{ textDecoration: " none" }}
            >
              <Button
                type="primary"
                htmlType="submit"
                // onClick={() => submitSearch()}
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

      {/* <div className="container mt-2"> */}
      {/* <div className="card">
        <div className="card-body d-md-flex flex-md-column">
          <div className="mb-5 mt-3 mx-2 main-title">
            <div className="float-start">
              <h4 className="card-title">Tournament List</h4>
            </div>
            <div className="float-end">
              <Link to={`/admin/tournaments/create`} className="btn btn-info">
                + Create New
              </Link>
            </div>
          </div>

          <div div class="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Tournament</th>
                  <th>Game</th>
                  <th>Type</th>
                  <th>Month</th>
                  <th>Year</th>
                  <th>Status</th>
                  <th>Upcomming</th>
                  <th>Logo</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {tournamentList.map((tournament, index) => (
                  <tr key={tournament.id}>
                    <td>{index + 1}</td>
                    <td>{tournament.name}</td>
                    <td>
                      {tournament.game == null ? "" : tournament.game["name"]}
                    </td>
                    <td>{tournament.category}</td>
                    <td>{tournament.month}</td>
                    <td>{tournament.year}</td>
                    <td>{tournament.status}</td>
                    <td>{tournament.upcomming}</td>
                    <td>
                      <img
                        src={`${API_PUBLIC_URL}${tournament.logo}`}
                        alt=""
                        width="80px"
                      />
                    </td>
                    <td>
                      <Link
                        to={`/admin/tournaments/${tournament.id}`}
                        className="btn btn-success btn-sm"
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          window.confirm("Are You Delete This Item?") &&
                            deleteTournament(tournament.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div> */}
      {/* </div> */}
    </>
  );
}
