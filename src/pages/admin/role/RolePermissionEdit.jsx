import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function RolePermissionEdit() {
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
            // console.log("Result:", rolePermissions);
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

            // console.log("ResponseData:", modifiedData);
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
            // console.log("response.data User", rolePermissions);
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
      // Save it!
      // console.log("Thing was saved to the database.");
    } else {
      // Do nothing!
      // console.log("Thing was not saved to the database.");
    }
  };

  function handleCheck(e, item) {
    // const fileteredData = allPerm.filter((value) => value.id != item.id);
    const newItem = { ...item, checked: !item.checked };

    // search index no
    const findIndex = allPerm.findIndex((value) => value.id == item.id);

    // console.log("findIndex", findIndex);

    setAllPerm(() => {
      return [
        ...allPerm.slice(0, findIndex),
        newItem,
        ...allPerm.slice(findIndex + 1),
      ];
    });

    // console.log("item:", item);
  }

  return (
    <div className="container">
      <h3>Permission Update for {role.role_name}</h3>
      <form onSubmit={submitForm}>
        <ul style={{ listStyle: "none" }}>
          {allPerm.map((item, index) => {
            // console.log("SelectedItem: ", item);

            return (
              <li key={index}>
                <input
                  checked={item.checked ? "checked" : ""}
                  onChange={(e) => handleCheck(e, item)}
                  value={item.id}
                  style={{ margin: "10px" }}
                  type="checkbox"
                />
                <span>{item.perm_name}</span>
              </li>
            );
          })}
        </ul>

        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
}
