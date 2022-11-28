import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_PUBLIC_URL } from "../../../constants";
import moment from "moment";

function ContactDetail() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [message, setMessage] = useState("");
  let navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    handleLogin();
    getContactDetails();
  }, []);

  const getLoginData = localStorage.getItem("loginData");

  const getContactDetails = () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .get(`${API_PUBLIC_URL}api/contacts/${id}/detail`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setName(response.data.name);
            setEmail(response.data.email);
            setMessage(response.data.message);
            setCreatedAt(response.data.createdAt);
            // console.log(response.data);
          });
      })();
    }
  };

  const handleLogin = () => {
    if (getLoginData === null) {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="container mt-2">
        <Link to={`/admin/contacts`}> Back </Link>
        <div className="col-sm-12 offset-sm-0 mt-2">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Contact Information</h5>
              <p>
                <b>Name: </b>
                {name}
              </p>
              <p>
                <b>Email: </b>
                {email}
              </p>
              <p>
                <b>Date: </b>
                {moment(createdAt).format("DD/MM/YYYY")}
              </p>
              <p>
                <b>Message: </b>
                <br />
                {message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactDetail;
