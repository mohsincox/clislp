import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import Select from "react-select";
import { API_PUBLIC_URL } from "../../../constants";
import "../style.css";
import { Card, Button, Table, Form, Input, Space, Select } from "antd";
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

export default function TournamentTeamList() {
  const [tournamentTeamList, setTournamentTeamList] = useState([]);
  const [tournamentList, setTournamentList] = useState([]);
  const [tournament_id, setTournament_id] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const getLoginData = localStorage.getItem("loginData");

  const getData = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/tournament-teams`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setTournamentTeamList(response.data);
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

  const getTournamentDetails = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
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
    }
  };

  useEffect(() => {
    getData();
    getTournamentDetails();
  }, []);

  function deleteFranchise(id) {
    const storageData = JSON.parse(getLoginData);
    const token = storageData.accessToken;
    axios
      .delete(`${API_PUBLIC_URL}api/tournament-teams/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        toast.error("Deleted successfully");
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

  const submitSearch = async (e) => {
    // e.preventDefault();

    if (searchQuery.trim() === "" && tournament_id === "") {
      // toast.error("At least one search field is required!");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .get(
          `${API_PUBLIC_URL}api/search/tournament-team-search?searchQuery=${searchQuery}&tournament_id=${tournament_id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          console.log("response ----", response);
          setTournamentTeamList(response.data);

          // console.log(response.data);
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

  useEffect(() => {
    submitSearch();
  }, [searchQuery, tournament_id]);

  const options = [];

  for (let i = 0; i < tournamentList.length; i++) {
    options.push({
      value: tournamentList[i].id,
      label: tournamentList[i].name,
    });
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const columns = [
    {
      title: "SL",
      dataIndex: "id",
      key: "id",
      render: (_, record) => tournamentTeamList.indexOf(record) + 1,
    },
    {
      title: "Group Name",
      dataIndex: "name",
      key: "name",
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
      key: "category",
    },
    {
      title: "Country",
      dataIndex: "country",
      render: (_, record) => (record.country ? record.country["name"] : null),
    },
    {
      title: "Franchise",
      dataIndex: "franchise",
      render: (_, record) =>
        record.franchise ? record.franchise["name"] : null,
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space wrap>
          <Link to={`/admin/tournament-teams/${record.id}`}>
            <Button type="primary" icon={<EditOutlined />} shape="circle" />
          </Link>

          <Button
            type="danger"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => {
              window.confirm("Are You Delete This Item?") &&
                deleteFranchise(record.id);
            }}
          />
        </Space>
      ),
    },
  ];
  const data = tournamentTeamList;

  // console.log("data", data);

  // console.log("options", options);

  // console.log("query", searchQuery);
  return (
    <>
      <Card style={{ height: 80 }}>
        <div className="float-start">
          <Title level={4}>Tournament Team List</Title>
        </div>

        <div className="float-end d-flex">
          <div>
            <Link
              to={`/admin/tournament-teams/create`}
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
      >
        <Form
          name="basic"
          layout="inline"
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form.Item name="username">
            <Input
              prefix={<SearchOutlined style={{ fontSize: "15px" }} />}
              placeholder="Search Group Name"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Select
              placeholder="Select Tournament"
              style={{
                width: 150,
              }}
              onChange={(e) => setTournament_id(e)}
              options={options}
            />
          </Form.Item>
        </Form>
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
        <div className="card-body  d-md-flex flex-md-column">
          <div className="mb-5 main-title">
            <div className="float-start">
              <h4 className="card-title">Tournament Team List</h4>
            </div>
            <div className="float-end">
              <Link
                to={`/admin/tournament-teams/create`}
                className="btn btn-info"
              >
                + Create New
              </Link>
            </div>
          </div>

          <div className="mt-5">
            <form onSubmit={submitSearch}>
              <div className="mb-3 row from-action">
                <div className="offset-sm-2 col-sm-3">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search Group Name"
                    value={searchQuery}
                    name="searchQuery"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="col-sm-3">
                  <Select
                    onChange={(e) => setTournament_id(e.value)}
                    options={options}
                    placeholder={"Select Tournament"}
                  />
                </div>

                <div className="col-sm-1 from-action-btn">
                  <button
                    type="button"
                    className="btn btn-primary from-action-btn-btn"
                    onClick={submitSearch}
                  >
                    Search
                  </button>
                </div>
                <div className="col-sm-1 from-action-btn">
                  <button
                    onClick={() => window.location.reload(false)}
                    className="btn btn-success pl-3 from-action-btn-btn"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div class="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Group Name</th>
                  <th>Tournament Name</th>
                  <th>Category</th>
                  <th>Country</th>
                  <th>Franchise</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {tournamentTeamList.map((tTeam, index) => (
                  <tr key={tTeam.id}>
                    <td>{index + 1}</td>
                    <td>{tTeam.name}</td>
                    <td>
                      {tTeam.tournament == null ? "" : tTeam.tournament["name"]}
                    </td>
                    <td>{tTeam.category}</td>
                    <td>
                      {tTeam.country == null ? "" : tTeam.country["name"]}
                    </td>
                    <td>
                      {tTeam.franchise == null ? "" : tTeam.franchise["name"]}
                    </td>
                    <td>
                      <Link
                        to={`/admin/tournament-teams/${tTeam.id}`}
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
                            deleteFranchise(tTeam.id);
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
