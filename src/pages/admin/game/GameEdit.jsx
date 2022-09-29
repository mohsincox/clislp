import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

function GameEdit() {
  const initialValues = { name: "", detail: "" };
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
    if (formValues.name.trim() === "") {
      toast.error("Game Name field is required!");
    } else {
      setFormErrors(validate(formValues));
      setIsSubmit(true);
    }
  };

  useEffect(() => {
    getGameDetails();
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      handleLogin();
    }
  }, [formErrors]);

  const getLoginData = localStorage.getItem("loginData");

  const getGameDetails = () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .get(`${API_PUBLIC_URL}api/games/${id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setFormValues({
              ...formValues,
              name: response.data.name,
              detail: response.data.detail,
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
          .put(`${API_PUBLIC_URL}api/games/${id}`, formValues, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            toast.success("Successfully Updated");
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
            <h5 className="card-title">Game Edit Form</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
                <label className="form-label col-sm-3">
                  Name <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Game Name"
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

export default GameEdit;
