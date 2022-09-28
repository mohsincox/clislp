import React, { useState } from "react";
import { Container } from "react-bootstrap";

function Test2() {
  const [name, setName] = useState("");
  const [newdate, setNewdate] = useState([]);

  const handlename = (e) => {
    const getnamevalue = e.target.value;
    setName(getnamevalue);
    //console.log(getdatevalue);
  };
  const handledate = (e) => {
    const getdatevalue = e.target.value;
    setNewdate(getdatevalue);
    //console.log(getdatevalue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("get name" + name + " get date" + newdate);
  };

  return (
    <React.Fragment>
      <Container>
        <div className="row fthight">
          <div className="col-sm-8  mt-3">
            <h4 className="mb-4">How to select date picker in react js </h4>

            <form onSubmit={handleSubmit}>
              <div className="row mb-4 ">
                <label className="col-sm-2 col-form-label">
                  Name<span className="astriccolor">*</span>
                </label>
                <div className="col-sm-5">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={(e) => handlename(e)}
                  />
                  <span className="text-danger"> </span>
                </div>
              </div>

              <div className="row mb-4 ">
                <label className="col-sm-2 col-form-label">
                  Date<span className="astriccolor">*</span>
                </label>
                <div className="col-sm-5">
                  <input
                    type="date"
                    className="form-control"
                    name="todate"
                    placeholder="dd-mm-yyyy"
                    onChange={(e) => handledate(e)}
                  />
                </div>
              </div>

              <div className="row mb-4 ">
                <label className="col-sm-2 col-form-label"></label>
                <div className="col-sm-5">
                  <button className="btn btn-success"> Submit </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}
export default Test2;
