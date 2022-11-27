import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function RolePermissionEditNew() {
  const [allPerm, setAllPerm] = useState([]);
  const [role, setRole] = useState({});
  const [rolePermissions, setRolePermissions] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getRolePermissionDetails();
  }, []);

  useEffect(() => {
    getPermissionDetails();
  }, [rolePermissions]);

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
            // modified data by checked value
            const modifiedData = response.data.map((item) => {
              const itemChecked = rolePermissions.find(
                (value) => value.perm_id === item.id
              )
                ? true
                : false;
              return {
                ...item,
                checked: itemChecked,
              };
            });

            setAllPerm(modifiedData);
          });
      })();
    }
  };

  const getRolePermissionDetails = () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .get(`${API_PUBLIC_URL}api/roles/${id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setRolePermissions(response.data.role_permissions);
            setRole(response.data);
          });
      })();
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    const arr = [];
    for (let i = 0; i < allPerm.length; i++) {
      if (allPerm[i].checked) {
        arr.push(allPerm[i].id);
      }
    }

    const answer = window.confirm("Do you want to update?");
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
              { permissions: JSON.stringify(arr) },
              {
                headers: {
                  Authorization: token,
                },
              }
            )
            .then((response) => {
              toast.success("Role premission Updated Successfully");
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
    }
  };

  function handleCheck(e, item) {
    const newItem = { ...item, checked: !item.checked };

    const findIndex = allPerm.findIndex((value) => value.id == item.id);

    setAllPerm(() => {
      return [
        ...allPerm.slice(0, findIndex),
        newItem,
        ...allPerm.slice(findIndex + 1),
      ];
    });
  }

  return (
    <div className="container">
      <h3>Permission Update for {role.role_name}</h3>
      <form onSubmit={submitForm}>
        {/* <ul style={{ listStyle: "none" }}>
          {allPerm.map((item, index) => {
            return (
              <li key={index}>
                <input
                  checked={item.checked ? "checked" : ""}
                  onChange={(e) => handleCheck(e, item)}
                  value={item.id}
                  style={{ margin: "10px" }}
                  type="checkbox"
                />
                <span>{item.perm_description}</span>
              </li>
            );
          })}
        </ul> */}

        <div className="row">
          <div className="col-sm-3">
            <b>Module</b>
          </div>
          <div className="col-sm-3">
            <b>Get/View</b>
          </div>
          <div className="col-sm-3">
            <b>Add/Update</b>
          </div>
          <div className="col-sm-3">
            <b>Delete</b>
          </div>
          <hr style={{ marginBottom: "0px" }} />
        </div>

        <div className="row">
          {allPerm.map((item, index) => {
            return (
              <React.Fragment key={index}>
                {index === 0 && (
                  <>
                    <div className="col-sm-3">User</div>
                  </>
                )}

                {index === 3 && (
                  <>
                    <div className="col-sm-3">Role</div>
                  </>
                )}

                {index === 6 && (
                  <>
                    <div className="col-sm-3">Game</div>
                  </>
                )}

                {index === 9 && (
                  <>
                    <div className="col-sm-3">Country</div>
                  </>
                )}

                {index === 12 && (
                  <>
                    <div className="col-sm-3">Franchise</div>
                  </>
                )}

                {index === 15 && (
                  <>
                    <div className="col-sm-3">Club</div>
                  </>
                )}

                {index === 18 && (
                  <>
                    <div className="col-sm-3">Player</div>
                  </>
                )}

                {index === 21 && (
                  <>
                    <div className="col-sm-3">Tournament</div>
                  </>
                )}

                {index === 24 && (
                  <>
                    <div className="col-sm-3">Tournament Team</div>
                  </>
                )}

                {index === 27 && (
                  <>
                    <div className="col-sm-3">Match</div>
                  </>
                )}

                {index === 30 && (
                  <>
                    <div className="col-sm-3">Tournament Team Player</div>
                  </>
                )}

                {index === 33 && (
                  <>
                    <div className="col-sm-3">Point Table</div>
                  </>
                )}

                {index === 36 && (
                  <>
                    <div className="col-sm-3">Slider</div>
                  </>
                )}

                {index === 39 && (
                  <>
                    <div className="col-sm-3">News</div>
                  </>
                )}

                {index === 42 && (
                  <>
                    <div className="col-sm-3">Settings</div>
                  </>
                )}

                {index === 45 && (
                  <>
                    <div className="col-sm-3">Ads</div>
                  </>
                )}

                {index === 48 && (
                  <>
                    <div className="col-sm-3">Page</div>
                  </>
                )}

                {index === 51 && (
                  <>
                    <div className="col-sm-3">Widget</div>
                  </>
                )}

                <div className="col-sm-3">
                  <input
                    checked={item.checked ? "checked" : ""}
                    onChange={(e) => handleCheck(e, item)}
                    value={item.id}
                    style={{ margin: "10px" }}
                    type="checkbox"
                  />
                  {/* <span>
                    {index} {item.perm_description} {item.id}
                  </span> */}
                </div>

                {(index === 2 ||
                  index === 5 ||
                  index === 8 ||
                  index === 11 ||
                  index === 14 ||
                  index === 17 ||
                  index === 20 ||
                  index === 23 ||
                  index === 26 ||
                  index === 29 ||
                  index === 32 ||
                  index === 35 ||
                  index === 38 ||
                  index === 41 ||
                  index === 44 ||
                  index === 47 ||
                  index === 50 ||
                  index === 53 ||
                  index === 56 ||
                  index === 59) && (
                  <>
                    <hr style={{ marginBottom: "0px" }} />
                  </>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <button className="btn btn-primary" style={{ marginTop: "3px" }}>
          Update
        </button>
      </form>
    </div>
  );
}
