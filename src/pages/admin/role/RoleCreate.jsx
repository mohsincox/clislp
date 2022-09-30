import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

function RoleCreate() {
  const initialValues = { role_name: "", role_description: "" };
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
          .post(`${API_PUBLIC_URL}api/roles`, formValues, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            toast.success("Role Created Successfully");
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
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Role Create</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 row">
              <label className="form-label col-sm-3">Role Name</label>
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
              <label className="form-label col-sm-3">Role Description</label>
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

            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RoleCreate;
