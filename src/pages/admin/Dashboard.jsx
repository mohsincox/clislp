import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    // const token = localStorage.getItem("token");
    const getLoginData = localStorage.getItem("loginData");
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const data = JSON.parse(getLoginData);
      const token = data.accessToken;
    }
  }, []);

  return (
    <>
      <div style={{ height: "400px" }}>Dashboard</div>
    </>
  );
}

export default Dashboard;
