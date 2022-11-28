import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";
// import Select from "react-select";
import {
  DeleteOutlined, EditOutlined,
  FormOutlined
} from "@ant-design/icons";
import { Button, Card, Form, Select, Space, Table, Typography } from "antd";
const { Title } = Typography;

export default function MatchList() {
  const [matchList, setMatchList] = useState([]);
  const [match_searchList, setMatch_searchList] = useState([]);
  const [match_search_id, setMatch_search_id] = useState("");
  const navigate = useNavigate();
  const getLoginData = localStorage.getItem("loginData");

  const getData = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/matches`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setMatchList(response.data);
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

  function deleteMatch(id) {
    const storageData = JSON.parse(getLoginData);
    const token = storageData.accessToken;
    axios
      .delete(`${API_PUBLIC_URL}api/matches/${id}`, {
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

  useEffect(() => {
    getMatchDetails();
  }, []);

  const getMatchDetails = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/matches/active`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setMatch_searchList(response.data);
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

  const submitSearch = async (e) => {
    // e.preventDefault();

    if (match_search_id === "") {
      // toast.error("Search field is required!");
    } else if (match_search_id === "all") {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/matches`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setMatchList(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 403) {
            toast.error("No Permission");
            navigate("/admin/no-permission");
          }
        });
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .get(
          `${API_PUBLIC_URL}api/search/match-search?match_id=${match_search_id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          console.log("response ----", response);
          setMatchList(response.data);
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
  }, [match_search_id]);

  const options = [{
    label: 'Select All',
    value: "all"
  }];

  for (let i = 0; i < match_searchList.length; i++) {
    let countryTeamOne = "";
    let countryTeamTwo = "";
    let franchiseTeamOne = "";
    let franchiseTeamTwo = "";
    if (match_searchList[i].tournament_team_one.country != null) {
      countryTeamOne = match_searchList[i].tournament_team_one.country.name;
    }
    if (match_searchList[i].tournament_team_two.country != null) {
      countryTeamTwo = match_searchList[i].tournament_team_two.country.name;
    }
    if (match_searchList[i].tournament_team_one.franchise != null) {
      franchiseTeamOne = match_searchList[i].tournament_team_one.franchise.name;
    }
    if (match_searchList[i].tournament_team_two.franchise != null) {
      franchiseTeamTwo = match_searchList[i].tournament_team_two.franchise.name;
    }
    options.push({
      value: match_searchList[i].id,
      label:
        match_searchList[i].tournament.name +
        " -- " +
        countryTeamOne +
        franchiseTeamOne +
        " VS " +
        countryTeamTwo +
        franchiseTeamTwo +
        " " +
        match_searchList[i].start_date,
    });
  }

  const columns = [
    {
      title: "SL",
      dataIndex: "id",
      key: "id",
      render: (_, record) => matchList.indexOf(record) + 1,
    },
    {
      title: "Tournament",
      dataIndex: "tournament",
      render: (_, record) =>
        record.tournament ? record.tournament["name"] : "",
    },
    {
      title: "Team One",
      dataIndex: "tournament",
      render: (_, record) =>
        record.tournament_team_one != null && (
          <span>
            {record.tournament_team_one.country == null ? (
              <img
                src={`${API_PUBLIC_URL}${record.tournament_team_one?.franchise?.logo}`}
                alt=""
                width="80px"
              />
            ) : (
              <img
                src={`${API_PUBLIC_URL}${record.tournament_team_one?.country?.flag}`}
                alt=""
                width="80px"
              />
            )}
          </span>
        ),
    },
    {
      title: "Team Two",
      dataIndex: "category",
      render: (_, record) =>
        record.tournament_team_two != null && (
          <span>
            {record.tournament_team_two.country == null ? (
              <img
                src={`${API_PUBLIC_URL}${record.tournament_team_two?.franchise?.logo}`}
                alt=""
                width="80px"
              />
            ) : (
              <img
                src={`${API_PUBLIC_URL}${record.tournament_team_two?.country?.flag}`}
                alt=""
                width="80px"
              />
            )}
          </span>
        ),
    },
    {
      title: "Date",
      dataIndex: "start_date",
    },
    {
      title: "Time",
      dataIndex: "start_time",
    },
    {
      title: "Venue",
      dataIndex: "venue",
    },
    {
      title: "Status",
      dataIndex: "status",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space wrap>
          <Link to={`/admin/matches/${record.id}`}>
            <Button type="primary" icon={<EditOutlined />} shape="circle" />
          </Link>

          <Button
            type="danger"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => {
              window.confirm("Are You Delete This Item?") &&
                deleteMatch(record.id);
            }}
          />
        </Space>
      ),
    },
  ];

  const data = matchList;

  // console.log("data", data);

  return (
    <>
      <Card style={{ height: 80 }}>
        <div className="float-start">
          <Title level={4}>Match List</Title>
        </div>

        <div className="float-end d-flex">
          <Form
            name="basic"
            layout="inline"
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item name="username">
              <Select
                placeholder="Select Tournament"
                style={{
                  width: 350,
                }}
                // onChange={(e) => setTournament_id(e)}
                // onChange={(e) => console.log(e)}
                onChange={(e) => setMatch_search_id(e)}
                options={options}
              />
            </Form.Item>
          </Form>

          <div>
            <Link
              to={`/admin/users/create`}
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
        <div className="card-body   d-md-flex flex-md-column">
          <div className="mb-5 main-title">
            <div className="float-start">
              <h4 className="card-title">Match List</h4>
            </div>
            <div className="float-end">
              <Link to={`/admin/matches/create`} className="btn btn-info">
                + Create New
              </Link>
            </div>
          </div>

          <div className="mt-5">
            <form onSubmit={submitSearch}>
              <div className="mb-3 row from-action">
                <div
                  className="offset-sm-2 col-sm-3"
                  style={{ width: "400px" }}
                >
                  <Select
                    onChange={(e) => setMatch_search_id(e.value)}
                    options={options}
                    placeholder={"Select..."}
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
                  {/* <th>Stage Name</th> */}
      {/* <th>Tournament</th> */}
      {/* <th>VS</th> */}
      {/* <th>Team One</th> */}
      {/* <th>VS</th> */}
      {/* <th>Team Two</th>
      <th>Date</th>
      <th>Time</th>
      <th>Venue</th>
      <th>Status</th>
      <th>Edit</th>
      <th>Delete</th> */}
      {/*  </tr>
              </thead>
              <tbody>
                {matchList.map((match, index) => (
                  <tr key={match.id}>
                    <td>{index + 1}</td>
                    {/* <td>{match.stage_name}</td> */}
      {/*  <td>
                      {match.tournament == null ? "" : match.tournament["name"]}
                    </td>
                    {/* <td>
                    {match.tournament_team_one != null && (
                      <span>
                        {match.tournament_team_one.name == null
                          ? ""
                          : match.tournament_team_one.name}
                      </span>
                    )}
                  </td> */}
      {/*     <td>
                      {/* {match.tournament_team_one.country == null
                    ? match.tournament_team_one.franchise.logo
                    : match.tournament_team_one.country.flag} */}

      {/*     {match.tournament_team_one != null && (
                        <span>
                          {match.tournament_team_one.country == null ? (
                            <img
                              src={`${API_PUBLIC_URL}${match.tournament_team_one?.franchise?.logo}`}
                              alt=""
                              width="80px"
                            />
                          ) : (
                            <img
                              src={`${API_PUBLIC_URL}${match.tournament_team_one?.country?.flag}`}
                              alt=""
                              width="80px"
                            />
                          )}
                        </span>
                      )}
                    </td>
                    {/* <td>
                    {match.tournament_team_two != null && (
                      <span>
                        {match.tournament_team_two.name == null
                          ? ""
                          : match.tournament_team_two.name}
                      </span>
                    )}
                  </td> */}
      {/*    <td>
                      {/* {match.tournament_team_two.country == null
                    ? match.tournament_team_two.franchise.logo
                    : match.tournament_team_two.country.flag} */}
      {/*    {match.tournament_team_two != null && (
                        <span>
                          {match.tournament_team_two.country == null ? (
                            <img
                              src={`${API_PUBLIC_URL}${match.tournament_team_two?.franchise?.logo}`}
                              alt=""
                              width="80px"
                            />
                          ) : (
                            <img
                              src={`${API_PUBLIC_URL}${match.tournament_team_two?.country?.flag}`}
                              alt=""
                              width="80px"
                            />
                          )}
                        </span>
                      )}
                    </td>
                    <td>{match.start_date}</td>
                    <td>{match.start_time}</td>
                    <td>{match.venue}</td>
                    <td>{match.status}</td>
                    <td>
                      <Link
                        to={`/admin/matches/${match.id}`}
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
                            deleteMatch(match.id);
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
