import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";
import "../adminResponsive.css";

export default function UserList() {
  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(30);
  const navigate = useNavigate();
  const getLoginData = localStorage.getItem("loginData");

  const getData = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/users`, {
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userList.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(userList.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const submitSearch = async (e) => {
    e.preventDefault();

    if (searchQuery.trim() === "") {
      toast.error("Search field is required!");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .get(
          `${API_PUBLIC_URL}api/search/user-search?searchQuery=${searchQuery}`,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          console.log("response ----", response);
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

  return (
    <>
      {/* <div className="container mt-2"> */}
      {/* <style>
        {`@media only screen and (max-width: 480px) 
        {
           .from-action 
           {
              display: flex;
              flex-direction: column;
              gap: 10px
            }
            .create-button{
              margin-bottom:10px
            }
        }`
        }
      </style> */}
      <div className="card">
        <div className="card-body d-md-flex flex-md-column">
          <div className="mb-5 main-title">
            <div className="float-start main-title">
              <h4 className="card-title">User List</h4>
            </div>
            <div className="float-end create-button">
              <Link to={`/admin/users/create`} className="btn btn-info">
                + Create New
              </Link>
            </div>
          </div>

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

          <div className="mt-5">
            <form onSubmit={submitSearch}>
              <div className="mb-3 row from-action">
                <div className="offset-md-3 col-md-6">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Search Name, Phone Number or Email"
                    value={searchQuery}
                    name="searchQuery"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* <div className="button-group"> */}
                <div className="col-md-1 from-action-btn">
                  <button
                 
                    type="button"
                    className="btn btn-primary from-action-btn-btn"
                    onClick={submitSearch}
                  >
                    Search
                  </button>
                </div>
                <div className="col-md-1 from-action-btn">
                  <button
                    onClick={() => window.location.reload(false)}
                    className="btn btn-success pl-3 from-action-btn-btn"
                  >
                    Refresh
                  </button>
                </div>
                {/* </div> */}
              </div>
            </form>
          </div>

          <div class="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Role</th>
                  <th>Created At</th>
                  <th>Detail</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + indexOfFirstItem + 1}</td>
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
                    </td>
                    <td>
                      <Link
                        to={`/admin/users/${user.id}`}
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
                            deleteUser(user.id);
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

          <center
            style={{
              display: "flex",
              justifyConten: "center",
              overflow: "scroll",
            }}
          >
            <nav className="mt-3">
              <ul className="pagination">
                {pageNumbers.map((number) => (
                  <li key={number} className="page-item">
                    <Link
                      to={"/admin/users"}
                      onClick={() => paginate(number)}
                      className="page-link"
                    >
                      {number}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </center>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
