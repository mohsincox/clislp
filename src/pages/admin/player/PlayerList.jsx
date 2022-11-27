import {
  DeleteOutlined,
  EditOutlined,
  FormOutlined, SearchOutlined
} from "@ant-design/icons";
import { Button, Card, Form, Input, Space, Table, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";
const { Title } = Typography;

export default function PlayerList() {
  const [playerTeamList, setPlayerTeamList] = useState([]);
  const [playerList, setPlayerList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [country_id, setCountry_id] = useState("");
  const [countryList, setCountryList] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage] = useState(30);
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
        .get(`${API_PUBLIC_URL}api/players`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setPlayerList(response.data);
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
    getCountryDetails();
  }, []);

  const getCountryDetails = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
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
            navigate("/admin/no-permission");
          }
        });
    }
  };

  function deletePlayer(id) {
    const storageData = JSON.parse(getLoginData);
    const token = storageData.accessToken;
    axios
      .delete(`${API_PUBLIC_URL}api/players/${id}`, {
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
    setCurrentItems(playerList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(playerList.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, playerList]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % playerList.length;
    setItemOffset(newOffset);
  };

  // const submitSearch = async (e) => {
  //   // e.preventDefault();

  //   if (searchQuery.trim() === "") {
  //     // toast.error("At least one search field is required!");
  //   } else {
  //     const storageData = JSON.parse(getLoginData);
  //     const token = storageData.accessToken;

  //     await axios
  //       .get(
  //         `${API_PUBLIC_URL}api/search/player-search?searchQuery=${searchQuery}`,
  //         {
  //           headers: {
  //             Authorization: token,
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         console.log("response ----", response);
  //         setPlayerList(response.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         if (error.response.status === 400) {
  //           toast.error(error.response.data.msg);
  //         }
  //         if (error.response.status === 403) {
  //           toast.error("No Permission");
  //           navigate("/admin/no-permission");
  //         }
  //       });
  //   }
  // };

  const submitSearch = async (e) => {
    // e.preventDefault();

    if (searchQuery.trim() === "" && country_id === "") {
      // toast.error("At least one search field is required!");
    } else if (searchQuery.trim() != "" && country_id === "") {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .get(
          `${API_PUBLIC_URL}api/search/player-search?searchQuery=${searchQuery}&country_id=${country_id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          console.log("response ----", response);
          setPlayerList(response.data);

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
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .get(
          `${API_PUBLIC_URL}api/search/player-search?searchQuery=${searchQuery}&country_id=${country_id.value}`,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          console.log("response ----", response);
          setPlayerList(response.data);

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
  }, [searchQuery, country_id]);

  const options = [];

  for (let i = 0; i < countryList.length; i++) {
    options.push({
      value: countryList[i].id,
      label: countryList[i].name,
    });
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  console.log(playerList)
  const columns = [
    {
      title: "SL",
      dataIndex: "id",
      key: "id",
      render: (_, record) => playerList.indexOf(record) + 1,
    },
    {
      title: "Player Name",
      dataIndex: "player_name",
      render: (_, record) =>
        record.name ? record.name : null,
    },
    {
      title: "Game",
      dataIndex: "game",
      render: (_, record) =>
        record.game ? record.game.name : null,
    },
    {
      title: "Specification",
      dataIndex: "specification",
      render: (_, record) => {
        let spec = JSON.parse(record.specification)
        if (spec['All Rounder'] === true) {
          return (<span
            className="badge bg-secondary"
            style={{ marginRight: "3px" }}
          >
            All Rounder
          </span>)
        } else if (spec['Batsman'] === true) {
          return (<span
            className="badge bg-secondary"
            style={{ marginRight: "3px" }}
          >
            Batsman
          </span>)
        } else if (spec['Bowler'] === true) {
          return (<span
            className="badge bg-secondary"
            style={{ marginRight: "3px" }}
          >
            Bowler
          </span>)
        } else if (spec['Defender'] === true) {
          return (<span
            className="badge bg-secondary"
            style={{ marginRight: "3px" }}
          >
            Defender
          </span>)
        } else if (spec['Forward'] === true) {
          return (<span
            className="badge bg-secondary"
            style={{ marginRight: "3px" }}
          >
            Forward
          </span>)
        } else if (spec['Goalkeeper'] === true) {
          return (<span
            className="badge bg-secondary"
            style={{ marginRight: "3px" }}
          >
            Goalkeeper
          </span>)
        } else if (spec['Keeper'] === true) {
          return (<span
            className="badge bg-secondary"
            style={{ marginRight: "3px" }}
          >
            Keeper
          </span>)
        } else if (spec['Midfielder'] === true) {
          return (<span
            className="badge bg-secondary"
            style={{ marginRight: "3px" }}
          >
            Midfielder
          </span>)
        }
      }

      // record.game.name ? record.game.name : null,
    },
    {
      title: "Country",
      dataIndex: "country",
      render: (_, record) =>
        record.country ? record.country.name : null,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_, record) =>
        record.status ? record.status : null,
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
          <Link to={`/admin/players/${record.id}`}>
            <Button type="primary" icon={<EditOutlined />} shape="circle" />
          </Link>

          <Button
            type="danger"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => {
              window.confirm("Are You Delete This Item?") &&
                deletePlayer(record.id);
            }}
          />
        </Space>
      ),
    },
  ];
  const data = playerList;

  return (
    <>
      <Card style={{ height: 80 }}>
        <div className="float-start">
          <Title level={4}>Player List</Title>
        </div>

        <div className="float-end d-flex">
          <div>
            <Link
              to={`/admin/players/create`}
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
          span={12}
        >
          <Form.Item name="username">
            <Input
              prefix={<SearchOutlined style={{ fontSize: "15px" }} />}
              placeholder="Search Player Name"
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: 350,
              }}
            />
          </Form.Item>

          <Form.Item style={{
            width: 350,
          }}>
            <Select
              placeholder="Select Country"
              style={{
                width: 200,
              }}
              onChange={(e) => setCountry_id(e)}
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


    </>
  );
}
