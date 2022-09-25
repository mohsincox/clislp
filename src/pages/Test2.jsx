import React, { useState } from "react";
import { Container } from "react-bootstrap";

function Test2() {
  const [showhide, setShowhide] = useState("");

  const handleshowhide = (event) => {
    const getuser = event.target.value;
    setShowhide(getuser);
  };

  return (
    <React.Fragment>
      <Container>
        <div className="row fthight">
          <div className="col-sm-6">
            <h4 className="mt-3">
              Show Hide DIV Element on Selection option in ReactJs
            </h4>

            <div className="col-md-10 form-group mb-3">
              <label className="mb-2">Username</label>
              <input type="text" name="username" className="form-control" />
            </div>

            <div className="col-md-10 form-group mb-3">
              <label className="mb-2">User Type</label>
              <select
                name="usertype"
                className="form-control"
                onChange={(e) => handleshowhide(e)}
              >
                <option value="">--Select User Type--</option>
                <option value="1">User Type 1</option>
                <option value="2">User Type 2</option>
                <option value="3">User Type 3</option>
              </select>
            </div>

            {showhide === "1" && (
              <div className="col-md-10 form-group">
                <label className="mb-2">User Address 1</label>
                <textarea name="address1" className="form-control"></textarea>
              </div>
            )}

            {showhide === "2" && (
              <div className="col-md-10 form-group">
                <label className="mb-2">User Address 2</label>
                <textarea name="address2" className="form-control"></textarea>
              </div>
            )}

            {showhide === "3" && (
              <div className="col-md-10 form-group">
                <label className="mb-2">User Address 3</label>
                <textarea name="address3" className="form-control"></textarea>
              </div>
            )}
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}
export default Test2;
