import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function NewsList() {
  const [newsList, setNewsList] = useState([]);
  const navigate = useNavigate();
  const getLoginData = localStorage.getItem("loginData");

  const getData = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/news`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setNewsList(response.data);
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

  function deleteNews(id) {
    const storageData = JSON.parse(getLoginData);
    const token = storageData.accessToken;
    axios
      .delete(`${API_PUBLIC_URL}api/news/${id}`, {
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
        <div className="card-body">
          <div>
            <div className="float-start">
              <h4 className="card-title">News List</h4>
            </div>
            <div className="float-end">
              <Link to={`/admin/news/create`} className="btn btn-info">
                + Create New
              </Link>
            </div>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>SL</th>
                <th>Title</th>
                <th>Body</th>
                <th>Tournament</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {newsList.map((nnn, index) => (
                <tr key={nnn.id}>
                  <td>{index + 1}</td>
                  <td>{nnn.title}</td>
                  <td>{nnn.body}</td>
                  <td>
                    {nnn.tournament == null ? "" : nnn.tournament["name"]}
                  </td>
                  <td>
                    <img
                      src={`${API_PUBLIC_URL}${nnn.image}`}
                      alt=""
                      width="80px"
                    />
                  </td>
                  <td>
                    <Link
                      to={`/admin/news/${nnn.id}`}
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
                          deleteNews(nnn.id);
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
      {/* </div> */}
    </>
  );
}
