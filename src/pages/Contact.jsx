import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SlideShow from "../components/SlideShow";
import WebLayout from "../layouts/WebLayout";
import { Input } from "antd";
import { toast } from "react-toastify";
import axios from "axios";
import { API_PUBLIC_URL } from "../constants";

const { TextArea } = Input;

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      toast.error("Name field is required!");
    } else if (email.trim() === "") {
      toast.error("Email field is required!");
    } else if (message.trim() === "") {
      toast.error("Message field is required!");
    } else {
      console.log("submitted");
      console.log("name", name);
      console.log("email", email);
      console.log("message", message);

      const postBody = {
        name: name,
        email: email,
        message: message,
      };

      await axios
        .post(`${API_PUBLIC_URL}api/contacts`, postBody, {})
        .then((response) => {
          setName("");
          setEmail("");
          setMessage("");

          toast.success("Contact form send successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <WebLayout>
      <div className="slider-section ku-section">
        <SlideShow />
      </div>
      <div className="registration-section ku-section section-top-required mb-5">
        <h2 className="text-center my-5">Contact us</h2>
        <section className="container mb-4">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="contact-us-area basic-temp-main-content-area p-3 p-sm-3 p-md-3 p-lg-5 p-xl-5">
                <h4 className="text-center">Do you have any questions?</h4>
                <p className="text-center">
                  Please do not hesitate to contact us directly. Our team will
                  come back to you within a matter of hours to help you.
                </p>
                <form
                  id="contact-form"
                  name="contact-form"
                  onSubmit={submitForm}
                >
                  <div className="mb-3">
                    <label className="form-label">Your Name</label>
                    <Input
                      size="large"
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name:"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Your Email</label>
                    <Input
                      size="large"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your Email:"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Your Message:</label>
                    <TextArea
                      rows={6}
                      placeholder="Write your query here..."
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <div className="text-center text-md-left mt-5">
                    <button className="btn btn-lg ku-c-button">Submit</button>
                  </div>
                </form>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-lg-8 offset-lg-2">
                <div className="mapouter">
                  <div className="gmap_canvas">
                    <iframe
                      width="100%"
                      height="436"
                      id="gmap_canvas"
                      src="https://maps.google.com/maps?q=shoplover&t=&z=13&ie=UTF8&iwloc=&output=embed"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight="0"
                      marginWidth="0"
                    ></iframe>
                  </div>
                </div>

                <div className="address px-5 py-4">
                  <div className="adl">
                    <div className="icon">
                      <i className="fa fa-map-marker fa-2x"></i>
                    </div>
                    <div className="address-details">
                      <h6 className="text-white">Address:</h6>
                      <p className="m-0">
                        Road no-1A, House No-32,
                        <br />
                        Baridhara J Block, Dhaka
                      </p>
                    </div>
                  </div>
                  <div className="adr">
                    <div>
                      <div className="adr">
                        <div className="icon">
                          <i className="fa fa-phone fa-2x"></i>
                        </div>
                        <div className="address-details">
                          <p className="m-0">+880 9678-161161</p>
                        </div>
                      </div>
                      <div className="adr">
                        <div className="icon">
                          <i className="fa fa-envelope fa-2x"></i>
                        </div>
                        <div className="address-details">
                          <p className="m-0">support@shoplover.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </WebLayout>
  );
};

export default Contact;
