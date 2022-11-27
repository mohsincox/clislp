import slugify from '@sindresorhus/slugify';
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function PageCreate() {
  const [allPage, setAllPage] = useState([]);
  const [currentPageId, setCurrentPageId] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
    handleLogin();
  }, []);

  const getLoginData = localStorage.getItem("loginData");

  useEffect(() => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
            .get(`${API_PUBLIC_URL}api/page`, {
              headers: {
                Authorization: token,
              },
            })
            .then((response) => {
              setAllPage(response.data)
            });
      })();
    }

  }, [])

  let modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  let formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];


  const handleLogin = () => {
    if (getLoginData === null) {
      navigate("/login");
    }
  };

  function handelName(e)
  {
    let name = e.target.value;

    if(allPage.find(p => p.name == name)) {
      setError({name: true, msg: "Name must be unique"})
    } else {
      setError(null);
    }
    setName(e.target.value)
    setSlug(slugify(e.target.value))
  }



  const submitForm = async (e) => {
    e.preventDefault();

    if(error) {
      toast.error(error.msg);
      return;
    }
    if (name.trim() === "") {
      toast.error("Name field is required!");
    }  else {
      //   const formData = new FormData();
      //   formData.append("name", name);
      //   formData.append("country_id", country_id);

      //   //   for (var [key, value] of formData.entries()) {
      //   //     console.log(key, value);
      //   //   }
      //   //   return;

      const postBody = {name, content, slug};

      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;

      await axios
        .post(`${API_PUBLIC_URL}api/page`, postBody, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log(response);

          toast.success("Successfully created!");
          navigate("/admin/pages");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 400) {
            toast.error(error.response.data.msg);
          }
          if (error.response.status === 403) {
            toast.error("No Permission");
            navigate("/admin/no-permission");
          }
        });
    }
  };

  return (
    <>
      {/* <div className="container"> */}
      <div className="col-sm-8 offset-sm-2">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Page Create</h5>
            <form onSubmit={submitForm} encType="multipart/form-data">
              <div className="mb-3 row">
                <label className="form-label col-sm-3">
                  Name <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                  <input
                      className={error && error.name ? 'form-control is-invalid' : 'form-control'}
                      type="text"
                      placeholder="Enter Name"
                      value={name}
                      name="name"
                      onChange={(e) => handelName(e)}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">
                  Slug <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                  <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Name"
                      value={slug}
                      name="name"
                      disabled={true}
                      onChange={(e) => setSlug(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="form-label col-sm-3">
                  Content <span style={{ color: "#ff0000" }}>*</span>
                </label>
                <div className="col-sm-9">
                  <ReactQuill theme="snow" value={content} onChange={setContent}
                              modules={modules}
                              formats={formats} />
                </div>
              </div>





              <div className="float-end">
                <button
                  className="btn btn-danger me-3"
                  onClick={() => {
                    navigate("/admin/pages");
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={submitForm}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
