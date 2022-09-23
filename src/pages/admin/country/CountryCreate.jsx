import { useState } from "react";

export default function CountryCreate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const onChangeHandler = (fieldName, value) => {
    if (fieldName === "name") {
      setName(value);
    } else if (fieldName === "email") {
      setEmail(value);
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (name.trim() === "" || email.trim() == "") {
      alert("required both field");
    } else {
      alert(name + " " + email);
      setName("");
      setEmail("");
    }
  };
  return (
    <div className="App">
      <form
        onSubmit={(e) => {
          onSubmitHandler(e);
        }}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => {
            onChangeHandler("name", e.target.value);
          }}
        />{" "}
        <br />
        <input
          type="email"
          value={email}
          onChange={(e) => {
            onChangeHandler("email", e.target.value);
          }}
        />{" "}
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { API_PUBLIC_URL } from "../../../constants";
// import CountryCreate from "./CountryCreate";

// function CountryCreate() {
//   const initialValues = { name: "", short_name: "", selectedFile: null };
//   const [formValues, setFormValues] = useState(initialValues);
//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmit, setIsSubmit] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     // const { name, value } = e.target;
//     // setFormValues({ ...formValues, [name]: value });
//     if (e.target.name == "selectedFile") {
//       //   console.log("first------------", e.target.files[0]);
//       setFormValues({ ...formValues, selectedFile: e.target.files[0] });
//     } else {
//       const { name, value } = e.target;
//       setFormValues({ ...formValues, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setFormErrors(validate(formValues));
//     setIsSubmit(true);
//   };

//   useEffect(() => {
//     console.log(formErrors);
//     if (Object.keys(formErrors).length === 0 && isSubmit) {
//       console.log(formValues);
//       handleLogin();
//     }
//   }, [formErrors]);

//   const getLoginData = localStorage.getItem("loginData");

//   const handleLogin = () => {
//     if (getLoginData === null) {
//       navigate("/login");
//     } else {
//       const storageData = JSON.parse(getLoginData);
//       const token = storageData.accessToken;
//       (async () => {
//         await axios
//           .post(`${API_PUBLIC_URL}api/countries`, formValues, {
//             headers: {
//               Authorization: token,
//             },
//           })
//           .then((response) => {
//             toast.success("Country Created Successfully");
//             navigate("/admin/countries");
//           })
//           .catch((error) => {
//             console.log(error);
//             if (error.response.status === 400) {
//               toast.error(error.response.data.msg);
//             }
//             if (error.response.status === 401) {
//               toast.error(error.response.data.msg);
//             }
//             if (error.response.status === 403) {
//               toast.error("No Permission");
//               navigate("/admin/no-permission");
//             }
//           });
//       })();
//     }
//   };

//   const validate = (values) => {
//     const errors = {};
//     if (!values.name) {
//       errors.name = "Country Name is required";
//     }
//     if (!values.short_name) {
//       errors.short_name = "Short Name is required";
//     }
//     return errors;
//   };

//   return (
//     <div className="container">
//       {Object.keys(formErrors).length === 0 && isSubmit ? (
//         <div className="ui message success">Signed in successfully</div>
//       ) : (
//         <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
//       )}
//       <div className="card">
//         <div className="card-body">
//           <h5 className="card-title">Country Create</h5>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3 row">
//               <label className="form-label col-sm-3"> Name</label>
//               <div className="col-sm-9">
//                 <input
//                   className="form-control"
//                   type="text"
//                   placeholder="Enter game Name"
//                   value={formValues.name}
//                   name="name"
//                   onChange={handleChange}
//                 />
//                 <p className="text-danger">{formErrors.name}</p>
//               </div>
//             </div>

//             <div className="mb-3 row">
//               <label className="form-label col-sm-3">Detail</label>
//               <div className="col-sm-9">
//                 <input
//                   className="form-control"
//                   type="text"
//                   placeholder="Enter Short Name"
//                   value={formValues.short_name}
//                   name="short_name"
//                   onChange={handleChange}
//                 />
//                 <p className="text-danger">{formErrors.short_name}</p>
//               </div>
//             </div>

//             <div className="mb-3 row">
//               <label className="form-label col-sm-3">Flag</label>
//               <div className="col-sm-9">
//                 <input
//                   className="form-control"
//                   type="file"
//                   placeholder="Enter Short Name"
//                   value={formValues.selectedFile}
//                   name="selectedFile"
//                   onChange={handleChange}
//                 />
//                 <p className="text-danger">{formErrors.selectedFile}</p>
//               </div>
//             </div>

//             {/* <div className="mb-3 row">
//                 <label className="form-label col-sm-3">Image</label>
//                 <div className="col-sm-9">
//                   <input
//                     className="form-control"
//                     type="file"
//                     placeholder="Enter Image"
//                     name="selectedFile"
//                     onChange={(e) => setSelectedFile(e.target.files[0])}
//                   />
//                 </div>
//               </div> */}

//             <button className="btn btn-primary">Submit</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CountryCreate;
