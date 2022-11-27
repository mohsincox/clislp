import { ContainerOutlined, DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Card, Space, Table, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";
import "../adminResponsive.css";
const { Title } = Typography;

export default function TournamentTeamPlayerList() {
  const [tournamentTeamPlayerList, setTournamentTeamPlayerList] = useState([]);
  const navigate = useNavigate();
  const getLoginData = localStorage.getItem("loginData");

  const getData = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/tournament-team-players`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setTournamentTeamPlayerList(response.data);
        })
        .catch((error) => {
          // console.log(error);
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

  function deleteTourTeamPlayer(id) {
    const storageData = JSON.parse(getLoginData);
    const token = storageData.accessToken;
    axios
      .delete(`${API_PUBLIC_URL}api/tournament-team-players/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        toast.error("Deleted successfully");
        getData();
      })
      .catch((error) => {
        // console.log(error);
        if (error.response.status === 403) {
          toast.error("No Permission");
          navigate("/admin/no-permission");
        }
      });
  }
  // console.log(tournamentTeamPlayerList)
    const columns = [
    {
      title: "SL",
      dataIndex: "id",
      key: "id",
      render: (_, record) => tournamentTeamPlayerList.indexOf(record) + 1,
    },
    {
      title: "Tournament Name",
      dataIndex: "tournament",
      render: (_, record) =>
        record.tournament ? record.tournament["name"] : null,
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (_, record) =>
        record.tournament_team.category ? record.tournament_team.category : null,
    },
    {
      title: "Team Name",
      dataIndex: "team_name",
      render: (_, record) =>
        record.tournament_team.country ? record.tournament_team.country["name"] : null,
    },
    
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space wrap>
          <Link to={`/admin/tournament-team-players/view/${record.id}`} style={{textDecoration: "none"}}>
            <Button
              icon={<ContainerOutlined />}
              style={{
                backgroundColor: "#5cb85c",
                color: "white",
                border: "none"
              }}
              shape="circle"
            />
          </Link>

          <Button
            type="danger"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => {
              window.confirm("Are You Delete This Item?") &&
                deleteTourTeamPlayer(record.id);
            }}
          />

        </Space>
      ),
    },
  ];
  const data = tournamentTeamPlayerList;


  return (
    <>
    <Card style={{ height: 80 }}>
        <div className="float-start">
          <Title level={4}>Tournament Team Player List</Title>
        </div>

        <div className="float-end d-flex">
          <div>
            <Link
              to={`/admin/point-tables/create`}
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
