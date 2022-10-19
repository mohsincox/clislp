import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function PageList() {
  const [pageList, setPageList] = useState([]);
  const navigate = useNavigate();
  const getLoginData = localStorage.getItem("loginData");

  const getData = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/page`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setPageList(response.data);
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

  function deletePage(id) {
    const storageData = JSON.parse(getLoginData);
    const token = storageData.accessToken;
    axios
      .delete(`${API_PUBLIC_URL}api/page/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        toast.success("Deleted successfully");
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
              <h4 className="card-title">Page List</h4>
            </div>
            <div className="float-end">
              <Link to={`/admin/pages/create`} className="btn btn-info">
                + Create New
              </Link>
            </div>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>SL</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {pageList.map((page, index) => (
                <tr key={page.id}>
                  <td>{index + 1}</td>
                  <td>{page.name}</td>
                  <td>{page.slug}</td>

                  <td>
                    <Link
                      to={`/admin/pages/${page.id}`}
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
                          deletePage(page.id);
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
