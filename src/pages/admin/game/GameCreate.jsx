import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

function GameCreate() {
  const initialValues = { name: "", detail: "" };
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
    if (formValues.name.trim() === "") {
      toast.error("Game Name field is required!");
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
          .post(`${API_PUBLIC_URL}api/games`, formValues, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            toast.success("Created Successfully");
            navigate("/admin/games");
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 400) {
              toast.error(error.response.data.msg);
            }
            if (error.response.status === 401) {
              toast.error(error.response.data.msg);
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
    if (!values.name) {
      errors.name = "Game Name is required";
    }

    return errors;
  };

  return (
    <div className="container mt-2">
      <div className="col-sm-8 offset-sm-2">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Game Create</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
                <label className="form-label col-sm-3">
                  Name <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter game Name"
                    value={formValues.name}
                    name="name"
                    onChange={handleChange}
                  />
                  {/* <p className="text-danger">{formErrors.name}</p> */}
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">Detail</label>
                <div className="col-sm-9">
                  <textarea
                    className="form-control"
                    type="text"
                    placeholder="Enter Detail"
                    value={formValues.detail}
                    name="detail"
                    onChange={handleChange}
                  />
                  {/* <p className="text-danger">{formErrors.detail}</p> */}
                </div>
              </div>

              <div className="float-end">
                <button
                  className="btn btn-danger me-3"
                  onClick={() => {
                    navigate("/admin/games");
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

export default GameCreate;
