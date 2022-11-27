import {
  DeleteOutlined,
  EditOutlined,
  FormOutlined, LockOutlined
} from "@ant-design/icons";
import { Button, Card, Space, Table, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";
const { Title } = Typography;

export default function RoleList() {
  const [roleList, setRoleList] = useState([]);
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
          .get(`${API_PUBLIC_URL}api/roles`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setRoleList(response.data);
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

  function deleteRole(id) {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .delete(`${API_PUBLIC_URL}api/roles/${id}`, {
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
                .get(`${API_PUBLIC_URL}api/roles`, {
                  headers: {
                    Authorization: token,
                  },
                })
                .then((response) => {
                  setRoleList(response.data);
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
              navigate("/admin/no-permission.");
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
      render: (_, record) => roleList.indexOf(record) + 1,
    },
    {
      title: "Role Name",
      dataIndex: "role_name",
      key: "role_name ",
    },
    {
      title: "Role Description",
      dataIndex: "role_description",
      key: "role_description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space wrap>
          <Link to={`/admin/roles/${record.id}`}>
            <Button type="primary" icon={<EditOutlined />} shape="circle" />
          </Link>

          <Link to={`/admin/roles/permissions/${record.id}/edit`}>
            <Button
              type="primary"
              style={{
                backgroundColor: "#5cb85c",
                color: "white",
                border: "none",
              }}
              icon={<LockOutlined />}
              shape="circle"
            />
          </Link>

          <Button
            type="danger"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => {
              window.confirm("Are You Delete This Item?") &&
                deleteRole(record.id);
            }}
          />
        </Space>
      ),
    },
  ];
  const data = roleList;

  return (
    <>
      <Card       style={{ height: 80 }}>
      <div className="float-start">
          <Title level={4}>Role List</Title>
        </div>

        <div className="float-end d-flex">
          <div>
            <Link
              to={`/admin/roles/create`}
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
   

      {/* <div className="card">
        <div className="card-body d-md-flex flex-md-column">
          <div className="mb-5 main-title">
            <div className="float-start">
              <h4 className="card-title">Role List</h4>
            </div>
            <div className="float-end">
              <Link to={`/admin/roles/create`} className="btn btn-info">
                + Create New
              </Link>
            </div>
          </div>

          <div class="table-responsive">
            <table className="table ">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Role Name</th>
                  <th>Role Description</th>
                  <th>Edit</th>
                  <th>Permission Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {roleList.map((role, index) => (
                  <tr key={role.id}>
                    <td>{index + 1}</td>
                    <td>{role.role_name}</td>
                    <td>{role.role_description}</td>
                    <td>
                      <Link
                        to={`/admin/roles/${role.id}`}
                        className="btn btn-success btn-sm"
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/admin/roles/permissions/${role.id}/edit`}
                        className="btn btn-success btn-sm"
                      >
                        Permission Update
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          window.confirm("Are You Delete This Item?") &&
                            deleteRole(role.id);
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
