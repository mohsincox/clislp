import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function RolePermissionEdit() {
  const [permissions, setPermissions] = useState({
    allPermissions: [],
  });
  const [userPermissions, setUserPermissions] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getPermissionDetails();
    getUserPermissionDetails();
  }, []);

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
            setPermissions({ ...permissions, allPermissions: response.data });
            console.log(response.data);
          });
      })();
    }
  };

  const getUserPermissionDetails = () => {
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
            setUserPermissions(response.data.role_permissions);
            console.log("response.data User", response.data.role_permissions);
          });
      })();
    }
  };

  const arr = [];
  for (let i = 0; i < userPermissions.length; i++) {
    arr.push(userPermissions[i].perm_id);
  }
  console.log("arr-----------", arr);

  const submitForm = (e) => {
    e.preventDefault();

    const answer = window.confirm("are you sure?");
    // if (answer) {
    //   if (getLoginData === null) {
    //     navigate("/login");
    //   } else {
    //     const storageData = JSON.parse(getLoginData);
    //     const token = storageData.accessToken;
    //     (async () => {
    //       await axios
    //         .post(
    //           `${API_PUBLIC_URL}api/roles/permissions/${id}`,
    //           { permissions: JSON.stringify(selectedPerm) },
    //           {
    //             headers: {
    //               Authorization: token,
    //             },
    //           }
    //         )
    //         .then((response) => {
    //           toast.success("Role premission Created Successfully");
    //           navigate("/admin/roles");
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //           if (error.response.status === 400) {
    //             toast.error(error.response.data.message);
    //           }
    //           if (error.response.status === 401) {
    //             toast.error(error.response.data.message);
    //           }
    //           if (error.response.status === 403) {
    //             toast.error("No Permission");
    //             navigate("/admin/no-permission");
    //           }
    //         });
    //     })();
    //   }
    //   // Save it!
    //   console.log("Thing was saved to the database.");
    // } else {
    //   // Do nothing!
    //   console.log("Thing was not saved to the database.");
    // }
  };

  function checkObjectInArray(obj, array, uniqueParam) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][uniqueParam] === obj[uniqueParam]) {
        return true;
      }
    }
    return false;
  }

  // useEffect(() => {
  //   let permissionsData = { ...permissions };
  //   let allPermissionsData = getPermissionsMasterData();
  //   allPermissionsData.forEach((item, index) => {
  //     item.isChecked = checkObjectInArray(item, role.permissions, "id");
  //     permissionsData.allPermissions.push(item);
  //   });
  //   setPermissions(permissionsData);
  // }, [setPermissions]);

  const checkPermission = (e, index) => {
    // const checkedStatus = e.target.checked;
    console.log("first e.target.checked", e.target.checked);
    console.log("first e", e);
    console.log("first e target", e.target);
    console.log("first e.target.value", e.target.value);
    let permissionsData = { ...permissions };
    console.log("permissionsData---", permissionsData);
    const checkedStatus = e.target.checked;
    permissionsData.allPermissions[index].isChecked = checkedStatus;
    setPermissions(permissionsData);
  };

  return (
    <div className="container">
      <h4>Edit</h4>
      <form onSubmit={submitForm}>
        {permissions.allPermissions.map((item, index) => {
          return (
            <span key={index}>
              <input
                value={item.id}
                style={{ margin: "10px" }}
                type="checkbox"
                checked={item.isChecked ? true : false}
                // checked={arr.includes(item.id) ? true : false}
                onChange={(e) => checkPermission(e, index)}
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
