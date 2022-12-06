import {
  CloseOutlined, DashboardOutlined, DownOutlined,
  MenuUnfoldOutlined, ProfileFilled, SettingOutlined, TrophyOutlined,
  UserOutlined
} from "@ant-design/icons";
import {
  Avatar,
  Breadcrumb, Drawer, Dropdown, Layout,
  Menu, Space
} from "antd";

import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import "./adminLayout.css";
// import { Dropdown } from "react-bootstrap";
import logo from "../logo.svg";
import "../pages/admin/adminResponsive.css";

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
      <Link to={`/admin/customers`} style={{ textDecoration: "none" }}>
        Customer List
      </Link>,
      "333"
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
    getItem(
      <Link
        to={`/admin/game_point_settings`}
        style={{ textDecoration: "none" }}
      >
        Game Point Settings
      </Link>,
      "200"
    ),
    getItem(
      <Link to={`/admin/game_team_settings`} style={{ textDecoration: "none" }}>
        Game Team Settings
      </Link>,
      "201"
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
    ),
  ]),

  getItem("Pages", "sub5", <UserOutlined />, [
    getItem(
      <Link to={`/admin/pages`} style={{ textDecoration: "none" }}>
        Page List
      </Link>,
      "102"
    ),
  ]),

  getItem("Reports", "sub6", <ProfileFilled />, [
    getItem(
      <Link to={`/admin/contacts`} style={{ textDecoration: "none" }}>
        Contact Us List
      </Link>,
      "97"
    ),
    getItem(
      <Link
        to={`/admin/reports/tournament-customer`}
        style={{ textDecoration: "none" }}
      >
        Tournament wise customer
      </Link>,
      "96"
    ),
  ]),
];

const AdminFormLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useContext(UserContext);
  const getLoginData = localStorage.getItem("loginData");
  const [open, setOpen] = useState(false);
  const [fixed, setFixed] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);

    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      // console.log("width", windowHeight);
      windowHeight > 200 ? setFixed("fixed-top") : setFixed("");
    }
  };

  const showDrawer = () => {
    setOpen(!open);
  };
  const onClose = () => {
    setOpen(false);
  };

  // const [width, setWidth] = useState(window.innerWidth);

  // useEffect(() => {
  //   function handleResize() {
  //     setWidth(window.innerWidth);
  //   }
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, [width]);

  // useEffect(() => {
  //   width < 480 ? setCollapsed(true) : setCollapsed(false);
  // }, [width]);

  useEffect(() => {
    if (getLoginData === null) {
    } else {
      const data = JSON.parse(getLoginData);
      const token = data.accessToken;
      const nameUser = data.name;
      setName(nameUser);
      const role_name = data.userrole.role.role_name;
      console.log(role_name);
      if (role_name === "Customer") {
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

  const menu = (
    <Menu
      items={[
        {
          label: (
            <Link to="#" style={{ textDecoration: "none", color: "#000" }}>
              {name}
            </Link>
          ),
          key: "1",
        },
        {
          type: "divider",
        },

        {
          label: (
            <Link
              to="/admin/change-password"
              style={{ textDecoration: "none", color: "#000" }}
            >
              Change Password
            </Link>
          ),
          key: "2",
        },
        {
          type: "divider",
        },
        {
          label: (
            <button
              className="btn btn-link p-0"
              style={{ textDecoration: "none", color: "#000" }}
              onClick={logout}
            >
              Logout
            </button>
          ),
          key: "3",
        },
      ]}
    />
  );

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      {/* on mobile screen */}
      <Drawer
        // title="Basic Drawer"
        width="75%"
        placement="left"
        onClose={onClose}
        open={open}
        drawerStyle={{
          backgroundColor: "#001529",
        }}
        closeIcon={
          <CloseOutlined
            style={{
              color: "white",
            }}
          />
        }
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Drawer>

      {/* on desktop screen */}

      <style>
        {`@media only screen and (max-width: 767px) 
        {
         .admin-sidebar
         {
           display: none
          }
        }`}
      </style>
      <Sider
        className="admin-sidebar"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      // breakpoint={"md"}
      // collapsedWidth={0}
      // trigger={null}
      >
        <div>
          <a href="/admin">
            {collapsed ? (
              <img
                src={logo}
                alt="logo"
                width={"100px"}
                height={"50px"}
                style={{ paddingRight: "20px" }}
              />
            ) : (
              <img src={logo} alt="logo" width={"200px"} height={"60px"} />
            )}
          </a>
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
          className={` site-layout-background`}
          style={{
            padding: 0,
          }}
        >
          {/* <p className="float-end">testing </p> */}
          {/* <div style={{ display: "inline-block" }}>
              <img src={require("../images/user.png")} alt="" width={"30px"} />
              {name}
            </div> */}

          <div className="nav-bar">
            <div className="small-screen-button">
              <MenuUnfoldOutlined onClick={showDrawer} />
            </div>

            <Dropdown
              overlay={menu}
              trigger={["click"]}
              placement="bottomLeft"
              arrow
              overlayStyle={{ minWidth: "150px" }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar size="large" icon={<UserOutlined />} />
                  <DownOutlined style={{ color: "#000", fontWeight: "bold" }} />
                </Space>
              </a>
            </Dropdown>
          </div>

          {/* <div className="float-end pe-3">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {name} &nbsp;
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link
                    to="/admin/change-password"
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    {" "}
                    Change Password{" "}
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div> */}
        </Header>
        <Content
          style={{
            margin: "0 16px",
            // marginTop: "16px",
            // display: "flex",
            // justifyContent: "center",
          }}
        >
          <div style={{
            marginTop: "16px",
            display: "flex",
            justifyContent: "center"
          }} className="abc">
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
                // minHeight: 360,
                width: "50%"
              }}
            >
              {/* Bill is a cat. */}
              <Outlet />
            </div>
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

export default AdminFormLayout;