import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function SliderList() {
  const [sliderList, setSliderList] = useState([]);
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
          .get(`${API_PUBLIC_URL}api/sliders`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setSliderList(response.data);
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
  }, []);

  function deleteSlider(id) {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .delete(`${API_PUBLIC_URL}api/sliders/${id}`, {
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
                .get(`${API_PUBLIC_URL}api/sliders`, {
                  headers: {
                    Authorization: token,
                  },
                })
                .then((response) => {
                  setSliderList(response.data);
                })
                .catch((error) => {
                  console.log(error);
                  if (error.response.status === 403) {
                    toast.error("No Permission");
                    navigate("/admin/no-permission");
                  }
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
      <div className="container">
        <div>
          <div className="float-start">
            <h3>Slider List</h3>
          </div>
          <div className="float-end">
            <Link to={`/admin/sliders/create`} className="btn btn-info">
              + Create New
            </Link>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Slider Name</th>
              <th>Slider Image</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {sliderList.map((slider, index) => (
              <tr key={slider.id}>
                <td>{slider.id}</td>
                <td>{slider.name}</td>
                <td>
                  <img
                    src={`${API_PUBLIC_URL}${slider.image}`}
                    alt=""
                    width="80px"
                  />
                </td>
                <td>
                  <Link
                    to={`/admin/sliders/${slider.id}`}
                    className="btn btn-success btn-sm"
                  >
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      window.confirm("Want to delete?") &&
                        deleteSlider(slider.id);
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
