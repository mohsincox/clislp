import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";
import "../style.css";
import { Card, Button, Table, Form, Input } from "antd";
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

export default function CustomerList() {
  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
        .get(`${API_PUBLIC_URL}api/users/customers`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setUserList(response.data);
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

  function deleteUser(id) {
    const storageData = JSON.parse(getLoginData);
    const token = storageData.accessToken;
    axios
      .delete(`${API_PUBLIC_URL}api/users/${id}`, {
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
    setCurrentItems(userList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(userList.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, userList]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % userList.length;
    setItemOffset(newOffset);
  };

  const submitSearch = async (e) => {
    // e.preventDefault();

    if (searchQuery.trim() === "") {
      // toast.error("Search field is required!");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .get(
          `${API_PUBLIC_URL}api/search/customer-search?searchQuery=${searchQuery}`,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          //   console.log("response ----", response);
          setUserList(response.data);

          // toast.success("Successfully created!");
          // navigate("/admin/users");
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

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    submitSearch();
  }, [searchQuery]);

  const columns = [
    {
      title: "SL",
      dataIndex: "id",
      key: "id",
      render: (_, record) => currentItems.indexOf(record) + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    // {
    //   title: "Phone Number",
    //   dataIndex: "phone_number",
    //   key: "phone_number",
    // },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (item) =>
        Object.values(item) === null ? " " : Object.values(item)[1],
    },
    {
      title: "Register",
      dataIndex: "createdAt",
      key: "date",
      render: (_, record) => moment(record.createdAt).calendar(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link
          to={`/admin/users/${record.id}/detail`}
          style={{ textDecoration: " none" }}
        >
          <Button
            style={{
              backgroundColor: "#5cb85c",
              color: "white",
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              textDecoration: " none",
            }}
          >
            <ContainerOutlined /> Detail
          </Button>
        </Link>
      ),
    },

    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Link
    //       to={`/admin/users/${record.id}`}
    //       style={{ textDecoration: " none" }}
    //     >
    //       <Button
    //         type="primary"
    //         htmlType="submit"
    //         style={{
    //           display: "flex",
    //           alignItems: "center",
    //           borderRadius: "5px",
    //           textDecoration: " none",
    //         }}
    //       >
    //         <EditOutlined /> Edit
    //       </Button>
    //     </Link>
    //   ),
    // },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Button
    //       type="danger"
    //       htmlType="submit"
    //       style={{
    //         display: "flex",
    //         alignItems: "center",
    //         borderRadius: "5px",
    //       }}
    //       onClick={() => {
    //         window.confirm("Are You Delete This Item?") &&
    //           deleteUser(record.id);
    //       }}
    //     >
    //       <DeleteOutlined /> Delete
    //     </Button>
    //   ),
    // },
  ];

  const data = currentItems;

  return (
    <>
      {/* <div className="container mt-2"> */}

      <Card>
        <div className="float-start">
        <Title level={3}>Customer List</Title>
        </div>

        <div className="float-end d-flex">
          <Form
            name="basic"
            layout="inline"
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item name="username">
              <Input
                prefix={<SearchOutlined style={{ fontSize: "15px" }} />}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Item>
          </Form>
        </div>
        {/* <div className="float-end">
              <Link to={`/admin/users/create`} className="btn btn-info">
                + Create New
              </Link>
            </div> */}
      </Card>

      <Card
        style={{
          marginTop: 16,
        }}
        type="inner"
        // title="Inner Card title"
        // extra={<a href="#">More</a>}
      >
        <Table
          rowKey="id"
          scroll={{ x: "600px" }}
          columns={columns}
          dataSource={data}
        />
      </Card>

      {/* <div className="input-group rounded">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
            />
            <span className="input-group-text border-0" id="search-addon">
              <i className="fas fa-search"></i>
            </span>
            <button>Search</button>
          </div> */}

      {/* <div
            className="mt-5"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <form onSubmit={submitSearch}>
              <div className="mb-3 row">
                <div className="col-sm-11">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Name, Phone Number or Email"
                    value={searchQuery}
                    name="searchQuery"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="col-sm-1">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={submitSearch}
                  >
                    Search
                  </button>
                </div>
                {/* <div className="col-sm-2">
                  <button
                    onClick={() => window.location.reload(false)}
                    className="btn btn-success pl-3"
                  >
                    Refresh
                  </button>
                </div> */}
      {/*   </div>
            </form>
            <div>
              <button
                onClick={() => window.location.reload(false)}
                className="btn btn-success pl-3"
              >
                Refresh
              </button>
            </div>
          </div> */}
      {/* 
      <table className="table">
        <thead>
          <tr>
            <th>SL</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Detail</th> */}
      {/* <th>Edit</th>
                <th>Delete</th> */}
      {/* </tr>
        </thead>
        <tbody>
          {currentItems.map((user, index) => (
            <tr key={user.id}>
              <td>{itemOffset + index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td>{user.role == null ? "" : user.role.role_name}</td>
              <td>{user.createdAt}</td>
              <td>
                <Link
                  to={`/admin/users/${user.id}/detail`}
                  className="btn btn-success btn-sm"
                >
                  Detail
                </Link>
              </td> */}
      {/* <td>
                    <Link
                      to={`/admin/users/${user.id}`}
                      className="btn btn-success btn-sm"
                    >
                      Edit
                    </Link>
                  </td> */}
      {/* <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        window.confirm("Are You Delete This Item?") &&
                          deleteUser(user.id);
                      }}
                    >
                      Delete
                    </button>
                  </td> */}
      {/* </tr>
          ))}
        </tbody>
      </table> */}

      {/* <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
        disabledLinkClassName="disabled"
      /> */}

      {/* </div> */}
    </>
  );
}
