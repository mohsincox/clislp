import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

function RoleEdit() {
  const initialValues = { role_name: "", role_description: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues.role_name.trim() === "") {
      toast.error("Role Name field is required!");
    } else if (formValues.role_description.trim() === "") {
      toast.error("Role Description field is required!");
    } else {
      setFormErrors(validate(formValues));
      setIsSubmit(true);
    }
  };

  useEffect(() => {
    getRoleDetails();
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      handleLogin();
    }
  }, [formErrors]);

  const getLoginData = localStorage.getItem("loginData");

  const getRoleDetails = () => {
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
            setFormValues({
              ...formValues,
              role_name: response.data.role_name,
              role_description: response.data.role_description,
            });
            console.log(response.data);
          });
      })();
    }
  };

  const handleLogin = () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .put(`${API_PUBLIC_URL}api/roles/${id}`, formValues, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            toast.success("Updated Successfully");
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
  };

  const validate = (values) => {
    const errors = {};
    // if (!values.role_name) {
    //   errors.role_name = "Role Name is required";
    // }
    // if (!values.role_description) {
    //   errors.role_description = "Role description is required";
    // }
    return errors;
  };

  return (
    <div className="container">
      <div className="col-sm-8 offset-sm-2">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Role Edit</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
                <label className="form-label col-sm-3">
                  Role Name <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Role Name"
                    value={formValues.role_name}
                    name="role_name"
                    onChange={handleChange}
                  />
                  {/* <p className="text-danger">{formErrors.role_name}</p> */}
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">
                  Role Description <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Role Description"
                    value={formValues.role_description}
                    name="role_description"
                    onChange={handleChange}
                  />
                  {/* <p className="text-danger">{formErrors.role_description}</p> */}
                </div>
              </div>

              <div className="float-end">
                <button
                  className="btn btn-danger me-3"
                  onClick={() => {
                    navigate("/admin/roles");
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleEdit;
