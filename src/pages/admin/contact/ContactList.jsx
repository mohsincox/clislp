import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

function ContactList() {
  const [contactList, setContactList] = useState([]);
  const navigate = useNavigate();
  const getLoginData = localStorage.getItem("loginData");

  useEffect(() => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      (async () => {
        await axios
          .get(`${API_PUBLIC_URL}api/contacts`, {
            headers: {
              Authorization: token,
            },
          })
          .then((response) => {
            setContactList(response.data);
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 403) {
              toast.error("No Permission");
              navigate("/admin/no-permission");
            }
          });
      })();
    }
  }, []);

  return (
    <>
      {/* <div className="container mt-2"> */}
      <div className="card">
        <div className="card-body d-md-flex flex-md-column">
          <div className="mb-5 main-title">
            <div className="float-start">
              <h4 className="card-title">Contact Us List</h4>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  {/* <th>Created At</th> */}
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                {contactList.map((contact, index) => (
                  <tr key={contact.id}>
                    <td>{index + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    {/* <td>{contact.message}</td> */}
                    {contact.message && contact.message.length > 50 ? (
                      <td>{contact.message.substring(0, 50) + " ..."}</td>
                    ) : (
                      <td>{contact.message}</td>
                    )}

                    {/* <td>{contact.createdAt}</td> */}
                    <td>
                      <Link
                        to={`/admin/contacts/${contact.id}/detail`}
                        className="btn btn-success btn-sm"
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default ContactList;
