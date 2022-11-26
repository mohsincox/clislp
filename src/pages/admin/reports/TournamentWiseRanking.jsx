import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";
import { Card, Table, Typography } from "antd";
const { Title } = Typography;

export default function TournamentWiseRanking() {
  const [tournament_id, setTournament_id] = useState("");
  const [tournamentList, setTournamentList] = useState([]);
  const [rankTeamList, setRankTeamList] = useState([]);
  let navigate = useNavigate();

  const getLoginData = localStorage.getItem("loginData");

  useEffect(() => {
    (async () => {
      if (getLoginData === null) {
        navigate("/login");
      } else {
        const storageData = JSON.parse(getLoginData);
        const token = storageData.accessToken;
        await axios
          .get(`${API_PUBLIC_URL}api/reports/tournament-report`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            // console.log("tour List", response.data);
            setTournamentList(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })();
  }, []);

  console.log(tournament_id);

  useEffect(() => {
    (async () => {
      if (getLoginData === null) {
        navigate("/login");
      } else {
        const storageData = JSON.parse(getLoginData);
        const token = storageData.accessToken;
        await axios
          .get(
            `${API_PUBLIC_URL}api/reports/tournament-ranking-report/${tournament_id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((response) => {
            setRankTeamList(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 403) {
              toast.error("No Permission");
              // navigate("/admin/no-permission");
            }
          });
      }
    })();
  }, [tournament_id]);

  const columns = [
    {
      title: "SL",
      dataIndex: "id",
      key: "id",
      render: (_, record) => rankTeamList.indexOf(record) + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (record.user ? record.user["name"] : null),
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
      render: (_, record) => (record.user ? record.user["phone_number"] : null),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => (record.user ? record.user["email"] : null),
    },
  ];
  const data = rankTeamList;

  // console.log("data", data)

  return (
    <>
      <div className="mb-3 row">
        <div className="col-sm-6 offset-sm-3">
          <Title level={3}>Tournament wise Customer List</Title>
          <select
            className="form-select"
            value={tournament_id}
            name="tournament_id"
            onChange={(e) => setTournament_id(e.target.value)}
          >
            <option>Please Select Tournament</option>
            {tournamentList.map((item, index) => (
              <option key={item.id} value={item.id}>
                {item.name} {item.year}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* <div>Tournament Wise Customer Report</div>
      <div className="offset-sm-1 col-sm-6">
        <p>{rankTeamList[0]?.tournament.name} Customer Report</p>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>SL</th>
              <th>Customer Name</th>
            </tr>
          </thead>
          <tbody>
            {rankTeamList.map((rankTeam, index) => (
              <tr key={rankTeam.team_id}>
                <td>{index + 1}</td>
                <td>{rankTeam.user?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      <Card
        style={{
          marginTop: 16,
        }}
        type="inner"
        // title="Inner Card title"
        // extra={<a href="#">More</a>}
      >
        <Table
          rowKey="team_id"
          scroll={{ x: "600px" }}
          columns={columns}
          dataSource={data}
          size="middle"
        />
      </Card>
    </>
  );
}
