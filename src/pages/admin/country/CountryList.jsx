import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function CountryList() {
  const [countriesData, setCountriesData] = useState({
    countries: [],
    currentPage: 1,
    pageSize: 5,
    totalCountries: 0,
    totalPages: 0,
  });
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
            setCountriesData(response.data);
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
                  setCountriesData(response.data);
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

  const handleNextPage = () => {
    if (countriesData.currentPage < countriesData.totalPages) {
      handlePagination(countriesData.currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (countriesData.currentPage > 1) {
      handlePagination(countriesData.currentPage - 1);
    }
  };

  const handlePagination = (currentPage) => {
    const storageData = JSON.parse(getLoginData);
    const token = storageData.accessToken;
    (async () => {
      await axios
        .get(
          `${API_PUBLIC_URL}api/countries?page=${currentPage}&limit=${countriesData.pageSize}`,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((response) => {
          console.log("🚀 ~ .then ~ response.data:", response.data);
          setCountriesData(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 403) {
            toast.error("No Permission");
            navigate("/admin/no-permission");
          }
        });
    })();
  };

  const pageNumbers = Array.from(
    { length: countriesData.totalPages },
    (_, index) => index + 1
  );

  return (
    <>
      {/* <div className="container mt-2"> */}
      <div className="card">
        <div className="card-body d-md-flex flex-md-column">
          <div className="mb-5 main-title">
            <div className="float-start">
              <h4 className="card-title">Country List</h4>
            </div>
            <div className="float-end">
              <Link to={`/admin/countries/create`} className="btn btn-info">
                + Create New
              </Link>
            </div>
          </div>

          <div class="table-responsive">
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
                {countriesData?.countries.map((country, index) => (
                  <tr key={country.id}>
                    <td>
                      {countriesData.pageSize *
                        (countriesData.currentPage - 1) +
                        (index + 1)}
                    </td>
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

          <div className="d-flex justify-content-between align-items-center my-3">
            <span className="badge bg-primary">
              Page {countriesData.currentPage} of {countriesData.totalPages}
            </span>
            <div>
              <button
                className="btn btn-outline-primary me-2"
                onClick={handlePreviousPage}
                disabled={countriesData.currentPage === 1}
              >
                Previous
              </button>
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  className={`btn btn-outline-primary me-1 ${
                    countriesData.currentPage === page ? "active" : ""
                  }`}
                  onClick={() => handlePagination(page)}
                >
                  {page}
                </button>
              ))}
              <button
                className="btn btn-outline-primary ms-2"
                onClick={handleNextPage}
                disabled={
                  countriesData.currentPage === countriesData.totalPages
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
