import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function CountryList() {
  const [countryList, setCountryList] = useState([]);
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
          .get(`${API_PUBLIC_URL}api/countries`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setCountryList(response.data);
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

  function deleteCountry(id) {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .delete(`${API_PUBLIC_URL}api/countries/${id}`, {
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
                .get(`${API_PUBLIC_URL}api/countries`, {
                  headers: {
                    Authorization: token,
                  },
                })
                .then((response) => {
                  setCountryList(response.data);
                })
                .catch((error) => {
                  console.log(error);
                  if (error.response.status === 403) {
                    toast.error("No Permission");
                  }
                  navigate("/admin/no-permission");
                });
            })();
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 403) {
              toast.error("No Permission");
            }
            navigate("/admin/no-permission");
          });
      })();
    }
  }

  return (
    <>
      <div className="container mt-2">
        <div>
          <div className="float-start">
            <h3>Country List</h3>
          </div>
          <div className="float-end">
            <Link to={`/admin/countries/create`} className="btn btn-info">
              + Create New
            </Link>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Country</th>
              <th>Short Name</th>
              <th>Flag</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {countryList.map((country, index) => (
              <tr key={country.id}>
                <td>{index + 1}</td>
                <td>{country.name}</td>
                <td>{country.short_name}</td>
                <td>
                  <img
                    src={`${API_PUBLIC_URL}${country.flag}`}
                    alt=""
                    width="80px"
                  />
                </td>
                <td>
                  <Link
                    to={`/admin/countries/${country.id}`}
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
                        deleteCountry(country.id);
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
    </>
  );
}
