import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function RolePermissionEdit() {
  const [allPerm, setAllPerm] = useState([]);
  const [selectedPerm, setSelectedPerm] = useState([]);
  const [existPerm, setExistPerm] = useState([4, 8]);
  const navigate = useNavigate();
  const { id } = useParams();

  //   useEffect(() => {
  //     setExistPerm([4, 8])
  //   }, []);

  useEffect(() => {
    setSelectedPerm([4, 8]);
  }, []);

  useEffect(() => {
    getPermissionDetails();
  }, []);

  useEffect(() => {
    console.log(selectedPerm);
  }, [selectedPerm]);

  const getLoginData = localStorage.getItem("loginData");

  const getPermissionDetails = () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .get(`${API_PUBLIC_URL}api/permissions`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setAllPerm(response.data);
            console.log(response.data);
          });
      })();
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    const answer = window.confirm("are you sure?");
    if (answer) {
      if (getLoginData === null) {
        navigate("/login");
      } else {
        const storageData = JSON.parse(getLoginData);
        const token = storageData.accessToken;
        (async () => {
          await axios
            .post(
              `${API_PUBLIC_URL}api/roles/permissions/${id}`,
              { permissions: JSON.stringify(selectedPerm) },
              {
                headers: {
                  Authorization: token,
                },
              }
            )
            .then((response) => {
              toast.success("Role premission Created Successfully");
              navigate("/admin/roles");
            })
            .catch((error) => {
              console.log(error);
              if (error.response.status === 400) {
                toast.error(error.response.data.message);
              }
              if (error.response.status === 401) {
                toast.error(error.response.data.message);
              }
              if (error.response.status === 403) {
                toast.error("No Permission");
                navigate("/admin/no-permission");
              }
            });
        })();
      }
      // Save it!
      console.log("Thing was saved to the database.");
    } else {
      // Do nothing!
      console.log("Thing was not saved to the database.");
    }
  };

  return (
    <div className="container">
      <h4>Edit</h4>
      <form onSubmit={submitForm}>
        {allPerm.map((item, index) => {
          return (
            <span key={index}>
              <input
                // checked={existPerm.includes(item.id) ? true : false}
                onChange={(e) => {
                  // add to list
                  if (e.target.checked) {
                    setSelectedPerm([...selectedPerm, item.id]);
                  } else {
                    // remove from list
                    setSelectedPerm(
                      selectedPerm.filter((selected) => selected.id !== item.id)
                    );
                  }
                }}
                value={item.id}
                style={{ margin: "10px" }}
                type="checkbox"
              />
              <span style={{ width: "300px" }}>
                {item.perm_name}{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <div className="vr" />
            </span>
          );
        })}
        <br />
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
