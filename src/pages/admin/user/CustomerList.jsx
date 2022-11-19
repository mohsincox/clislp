import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";
import "../style.css";

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

  return (
    <>
      {/* <div className="container mt-2"> */}
      <div className="card">
        <div className="card-body">
          <div>
            <div className="float-start">
              <h4 className="card-title">Customer List</h4>
            </div>
            {/* <div className="float-end">
              <Link to={`/admin/users/create`} className="btn btn-info">
                + Create New
              </Link>
            </div> */}
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

          <div
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
              </div>
            </form>
            <div>
              <button
                onClick={() => window.location.reload(false)}
                className="btn btn-success pl-3"
              >
                Refresh
              </button>
            </div>
          </div>

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
                {/* <th>Edit</th>
                <th>Delete</th> */}
              </tr>
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
                  </td>
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
                </tr>
              ))}
            </tbody>
          </table>

          <ReactPaginate
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
          />
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
