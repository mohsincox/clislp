import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function ClubList() {
  const [clubList, setClubList] = useState([]);
  const navigate = useNavigate();
  const getLoginData = localStorage.getItem("loginData");

  const getData = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/clubs`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setClubList(response.data);
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

  function deleteClub(id) {
    const storageData = JSON.parse(getLoginData);
    const token = storageData.accessToken;
    axios
      .delete(`${API_PUBLIC_URL}api/clubs/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        toast.error("Deleted Successfully");
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

  return (
    <>
      {/* <div className="container mt-2"> */}
      <div className="card">
        <div className="card-body d-md-flex flex-md-column">
          <div className="mb-5 main-title">
            <div className="float-start">
              <h4 className="card-title">Club List</h4>
            </div>
            <div className="float-end create-button">
              <Link to={`/admin/clubs/create`} className="btn btn-info">
                + Create New
              </Link>
            </div>
          </div>


          <div class="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>SL</th>
                <th>Club Name</th>
                <th>Game</th>
                <th>Country</th>
                <th>Franchise</th>
                <th>Logo</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {clubList.map((club, index) => (
                <tr key={club.id}>
                  <td>{index + 1}</td>
                  <td>{club.name}</td>
                  <td>{club.game?.name}</td>
                  <td>{club.country?.name}</td>
                  <td>{club.franchise?.name}</td>
                  <td>
                    <img
                      src={`${API_PUBLIC_URL}${club.logo}`}
                      alt=""
                      width="80px"
                    />
                  </td>
                  <td>
                    <Link
                      to={`/admin/clubs/${club.id}`}
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
                          deleteClub(club.id);
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
      </div>
      {/* </div> */}
    </>
  );
}
