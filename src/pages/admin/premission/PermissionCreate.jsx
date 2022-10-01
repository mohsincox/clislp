import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

function PermissionCreate() {
  const initialValues = { perm_name: "", perm_description: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      handleLogin();
    }
  }, [formErrors]);

  const getLoginData = localStorage.getItem("loginData");

  const handleLogin = () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .post(`${API_PUBLIC_URL}api/permissions`, formValues, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            toast.success("Permission Created Successfully");
            navigate("/admin/permissions");
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
    if (!values.perm_name) {
      errors.perm_name = "Permission Name is required";
    }
    if (!values.perm_description) {
      errors.perm_description = "Permission description is required";
    }
    return errors;
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Form</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 row">
              <label className="form-label col-sm-3">Premission Name</label>
              <div className="col-sm-9">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Premission Name"
                  value={formValues.perm_name}
                  name="perm_name"
                  onChange={handleChange}
                />
                {/* <p className="text-danger">{formErrors.perm_name}</p> */}
              </div>
            </div>

            <div className="mb-3 row">
              <label className="form-label col-sm-3">
                Premission Description
              </label>
              <div className="col-sm-9">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Premission Description"
                  value={formValues.perm_description}
                  name="perm_description"
                  onChange={handleChange}
                />
                {/* <p className="text-danger">{formErrors.perm_description}</p> */}
              </div>
            </div>

            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PermissionCreate;
