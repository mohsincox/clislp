import { DeleteOutlined, EditOutlined, FormOutlined } from "@ant-design/icons";
import { Button, Card, Form, Space, Table, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";
import "../style.css";
const { Title } = Typography;

export default function PointTableList() {
  const [pointTableList, setPointTableList] = useState([]);
  const [match_id, setMatch_id] = useState("");
  const [matchList, setMatchList] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 30;
  const navigate = useNavigate();
  const getLoginData = localStorage.getItem("loginData");

  const getData = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/point-tables`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setPointTableList(response.data);
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


  const getPointDetails = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/point-tables`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setPointTableList(response.data);
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
    getPointDetails();
  }, []);

  function deletePointTable(id) {
    const storageData = JSON.parse(getLoginData);
    const token = storageData.accessToken;
    axios
      .delete(`${API_PUBLIC_URL}api/point-tables/${id}`, {
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
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(pointTableList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(pointTableList.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, pointTableList]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % pointTableList.length;
    setItemOffset(newOffset);
  };

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

  const submitSearch = async (e) => {
    // e.preventDefault();

    if (match_id === "") {
      // toast.error("Search field is required!");
    } else if (match_id.value === "all") {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .get(`${API_PUBLIC_URL}api/point-tables`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log("response ----", response);
          setPointTableList(response.data);
        })
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .get(
          `${API_PUBLIC_URL}api/search/point-table-search?match_id=${match_id.value}`,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          console.log("response ----", response);
          setPointTableList(response.data);
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
  }, [match_id]);

  const options = [{
    label: 'Select all Match',
    value: 'all'
  }];


  for (let i = 0; i < matchList.length; i++) {
    let countryTeamOne = "";
    let countryTeamTwo = "";
    let franchiseTeamOne = "";
    let franchiseTeamTwo = "";
    if (matchList[i].tournament_team_one.country != null) {
      countryTeamOne = matchList[i].tournament_team_one.country.name;
    }
    if (matchList[i].tournament_team_two.country != null) {
      countryTeamTwo = matchList[i].tournament_team_two.country.name;
    }
    if (matchList[i].tournament_team_one.franchise != null) {
      franchiseTeamOne = matchList[i].tournament_team_one.franchise.name;
    }
    if (matchList[i].tournament_team_two.franchise != null) {
      franchiseTeamTwo = matchList[i].tournament_team_two.franchise.name;
    }
    options.push({
      value: matchList[i].id,
      label:
        matchList[i].tournament.name +
        " -- " +
        countryTeamOne +
        franchiseTeamOne +
        " VS " +
        countryTeamTwo +
        franchiseTeamTwo +
        " " +
        matchList[i].start_date,
    });
  }


  //new

  const columns = [
    {
      title: "SL",
      dataIndex: "id",
      key: "id",
      render: (_, record) => pointTableList.indexOf(record) + 1,
    },
    {
      title: "Tournament",
      dataIndex: "tournament",
      render: (_, record) =>
        record.match.tournament ? record.match.tournament["name"] : null,
    },
    {
      title: "Team One",
      dataIndex: "team_one",
      render: (_, record) =>
        record.match.tournament_team_one.country ? record.match.tournament_team_one.country["name"] : null,
    },
    {
      title: "Team Two",
      dataIndex: "team_two",
      render: (_, record) =>
        record.match.tournament_team_two.country ? record.match.tournament_team_two.country["name"] : null,
    },
    {
      title: "Player",
      dataIndex: "player",
      render: (_, record) =>
        record.player ? record.player["name"] : null,
    },
    {
      title: "Team",
      dataIndex: "team",
      render: (_, record) =>
        record.tournament_team.country ? record.tournament_team.country["name"] : null,
    },
    {
      title: "Goal",
      dataIndex: "goal",
      render: (_, record) =>
        record.Goal,
    },
    {
      title: "Assist",
      dataIndex: "assist",
      render: (_, record) =>
        record.Assist,
    },
    {
      title: "Goal Save",
      dataIndex: "goal_save",
      render: (_, record) =>
        record.Goal_Save,
    },
    {
      title: "Penalty Save",
      dataIndex: "penalty_save",
      render: (_, record) =>
        record.Penalty_Save,
    },
    {
      title: "Clean Sheet",
      dataIndex: "clean_sheet",
      render: (_, record) =>
        record.Clean_Sheet,
    },
    {
      title: "Run",
      dataIndex: "run",
      render: (_, record) =>
        (record.run == 0) ? 0 : (record.run == null) ? null : record.run,
    },
    {
      title: "Wicket",
      dataIndex: "wicket",
      render: (_, record) =>
        (record.wicket == 0) ? 0 : (record.wicket == null) ? null : record.wicket,
    },
    {
      title: "Man of the match",
      dataIndex: "man_of_the_match",
      render: (_, record) =>
        (record.man_of_the_match == true) ? 'True' : (record.man_of_the_match == false) ? 'False' : record.man_of_the_match,
    },
    {
      title: "Fifty",
      dataIndex: "fifty",
      render: (_, record) =>
        (record.fifty == true) ? 'True' : (record.fifty == false) ? 'False' : record.fifty,
    },
    {
      title: "Hundred",
      dataIndex: "hundred",
      render: (_, record) =>
        (record.hundred == true) ? 'True' : (record.hundred == false) ? 'False' : record.hundred,
    },
    {
      title: "Five Wickets",
      dataIndex: "five_wickets",
      render: (_, record) =>
        (record.five_wickets == true) ? 'True' : (record.five_wickets == false) ? 'False' : record.five_wickets,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space wrap>
          <Link to={`/admin/point-tables/${record.id}`}>
            <Button type="primary" icon={<EditOutlined />} shape="circle" />
          </Link>

          <Button
            type="danger"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => {
              window.confirm("Are You Delete This Item?") &&
                deletePointTable(record.id);
            }}
          />

        </Space>
      ),
    },
  ];
  const data = pointTableList;

  return (
    <>
      <Card style={{ height: 80 }}>
        <div className="float-start">
          <Title level={4}>Point Table List</Title>
        </div>

        <div className="float-end d-flex">
          <Form>
            <Form.Item style={{
              width: 500,
              height: 32,
              marginRight: 15
            }}>
              <Select
                placeholder="Select Match"
                onChange={(e) => setMatch_id(e)}
                options={options}
              />
            </Form.Item>
          </Form>
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

      {/* <Card
        style={{
          marginTop: 16,

        }}

      >
        <Form style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"

        }} >
          <Form.Item style={{
            width: 500,
            marginRight: 15
          }}>
            <Select
              placeholder="Select..."
              style={{
                width: 200,
              }}
              onChange={(e) => setMatch_id(e)}
              options={options}
            />
          </Form.Item>
          <Form.Item>
            <button
              onClick={() => window.location.reload(false)}
              className="btn btn-success pl-3 from-action-btn-btn" >
              Refresh
            </button>

          </Form.Item>

        </Form>
      </Card> */}

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
