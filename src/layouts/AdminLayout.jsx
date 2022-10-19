import {
  DesktopOutlined,
  FileOutlined,
  DashboardOutlined,
  TrophyOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";

import React, { useContext, useEffect, useState } from "react";
import "./adminLayout.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { Dropdown } from "react-bootstrap";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(
    <Link to={`/admin`} style={{ textDecoration: "none" }}>
      Dashboard
    </Link>,
    "1",
    <DashboardOutlined />
  ),
  //   getItem(<Link to={`/admin/new`}>New</Link>, "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem(
      <Link to={`/admin/users`} style={{ textDecoration: "none" }}>
        User List
      </Link>,
      "3"
    ),
    getItem(
      <Link to={`/admin/roles`} style={{ textDecoration: "none" }}>
        Role
      </Link>,
      "4"
    ),
  ]),


  //   getItem("Team", "sub2", <TeamOutlined />, [
  //     getItem("Team 1", "6"),
  //     getItem("Team 2", "8"),
  //   ]),
  getItem("Tournament", "sub2", <TrophyOutlined />, [
    getItem(
      <Link to={`/admin/tournaments`} style={{ textDecoration: "none" }}>
        Tournament List
      </Link>,
      "6"
    ),
    getItem(
      <Link to={`/admin/tournament-teams`} style={{ textDecoration: "none" }}>
        Tournament Team
      </Link>,
      "8"
    ),
    getItem(
      <Link to={`/admin/matches`} style={{ textDecoration: "none" }}>
        Match
      </Link>,
      "9"
    ),
    getItem(
      <Link
        to={`/admin/tournament-team-players`}
        style={{ textDecoration: "none" }}
      >
        Team Player
      </Link>,
      "10"
    ),
    getItem(
      <Link to={`/admin/point-tables`} style={{ textDecoration: "none" }}>
        Point Table
      </Link>,
      "99"
    ),
  ]),
  // getItem("Files", "10", <FileOutlined />),
  getItem("Settings", "sub3", <SettingOutlined />, [
    getItem(
      <Link to={`/admin/games`} style={{ textDecoration: "none" }}>
        Game
      </Link>,
      "11"
    ),
    getItem(
      <Link to={`/admin/countries`} style={{ textDecoration: "none" }}>
        Country
      </Link>,
      "12"
    ),
    getItem(
      <Link to={`/admin/franchises`} style={{ textDecoration: "none" }}>
        Franchise
      </Link>,
      "13"
    ),
    getItem(
      <Link to={`/admin/clubs`} style={{ textDecoration: "none" }}>
        Club
      </Link>,
      "98"
    ),
    getItem(
      <Link to={`/admin/players`} style={{ textDecoration: "none" }}>
        Player
      </Link>,
      "15"
    ),
    getItem(
      <Link to={`/admin/sliders`} style={{ textDecoration: "none" }}>
        Slider
      </Link>,
      "16"
    ),
    getItem(
      <Link to={`/admin/news`} style={{ textDecoration: "none" }}>
        News
      </Link>,
      "17"
    ),
    getItem(
      <Link to={`/admin/settings`} style={{ textDecoration: "none" }}>
        Settings
      </Link>,
      "18"
    ),
  ]),


  getItem("Adds", "sub4", <SettingOutlined />, [
    getItem(
        <Link to={`/admin/widget`} style={{ textDecoration: "none" }}>
          Add Widget
        </Link>,
        "100"
    ),
    getItem(
        <Link to={`/admin/ads`} style={{ textDecoration: "none" }}>
          Add Ads
        </Link>,
        "101"
    )
  ]),

  getItem("Pages", "sub5", <UserOutlined />, [
    getItem(
        <Link to={`/admin/pages`} style={{ textDecoration: "none" }}>
          Page List
        </Link>,
        "102"
    ),
  ]),
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useContext(UserContext);
  const getLoginData = localStorage.getItem("loginData");

  useEffect(() => {
    if (getLoginData === null) {
    } else {
      const data = JSON.parse(getLoginData);
      const token = data.accessToken;
      const nameUser = data.name;
      setName(nameUser);
      const role_name = data.userrole.role.role_name;
      console.log(role_name);
      if (role_name === "customer") {
        navigate("/");
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("loginData");
    navigate("/admin-login");
    setAuthUser((previousState) => {
      return { ...previousState, isLoggedIn: false };
    });
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div>
          <img
            src={require("../images/sl_logo.png")}
            alt="logo"
            width={"200px"}
            height={"60px"}
          />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {/* <p className="float-end">testing </p> */}
          {/* <div style={{ display: "inline-block" }}>
            <img src={require("../images/user.png")} alt="" width={"30px"} />
            {name}
          </div> */}

          <div className="float-end pe-3">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {authUser.user.name} &nbsp;
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            {/* <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {/* Bill is a cat. */}
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Shoplover ©2022
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
