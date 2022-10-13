import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_PUBLIC_URL } from "../../../constants";

export default function PointTableList() {
  const [pointTableList, setPointTableList] = useState([]);
  const navigate = useNavigate();
  const getLoginData = localStorage.getItem("loginData");

  const getData = async () => {
    if (getLoginData === null) {
      navigate("/login");
    } else {
      const storageData = JSON.parse(getLoginData);
      const token = storageData.accessToken;
      await axios
        .get(`${API_PUBLIC_URL}api/point-tables`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log("response.data", response.data);
          setPointTableList(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 403) {
            toast.error("No Permission");
            navigate("/admin/no-permission");
          }
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  function deletePointTable(id) {
    const storageData = JSON.parse(getLoginData);
    const token = storageData.accessToken;
    axios
      .delete(`${API_PUBLIC_URL}api/point-tables/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        toast.error("Deleted successfully");
        getData();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 403) {
          toast.error("No Permission");
          navigate("/admin/no-permission");
        }
      });
  }

  return (
    // <>
    //   {/* <div className="container mt-2"> */}
    //   <div className="card">
    //     <div className="card-body">
    //       <div>
    //         <div className="float-start">
    //           <h4 className="card-title">Match List</h4>
    //         </div>
    //         <div className="float-end">
    //           <Link to={`/admin/point-tables/create`} className="btn btn-info">
    //             + Create New
    //           </Link>
    //         </div>
    //       </div>

    //       <table className="table">
    //         <thead>
    //           <tr>
    //             <th>SL</th>
    //             <th>Tournament</th>
    //             <th>Team One</th>
    //             <th>Team Two</th>
    //             <th>Edit</th>
    //             <th>Delete</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {pointTableList.map((pointTable, index) => (
    //             <tr key={pointTable.id}>
    //               <td>{index + 1}</td>
    //               <td>
    //                 {pointTable.match.tournament == null
    //                   ? ""
    //                   : pointTable.match.tournament["name"]}
    //               </td>
    //               <td>
    //                 {pointTable.match.tournament_team_one != null && (
    //                   <span>
    //                     {pointTable.match.tournament_team_one.country ==
    //                     null ? (
    //                       <img
    //                         src={`${API_PUBLIC_URL}${pointTable.match.tournament_team_one.franchise.logo}`}
    //                         alt=""
    //                         width="80px"
    //                       />
    //                     ) : (
    //                       <img
    //                         src={`${API_PUBLIC_URL}${pointTable.match.tournament_team_one.country.flag}`}
    //                         alt=""
    //                         width="80px"
    //                       />
    //                     )}
    //                   </span>
    //                 )}
    //               </td>
    //               <td>
    //                 {pointTable.match.tournament_team_two != null && (
    //                   <span>
    //                     {pointTable.match.tournament_team_two.country ==
    //                     null ? (
    //                       <img
    //                         src={`${API_PUBLIC_URL}${pointTable.match.tournament_team_two.franchise.logo}`}
    //                         alt=""
    //                         width="80px"
    //                       />
    //                     ) : (
    //                       <img
    //                         src={`${API_PUBLIC_URL}${pointTable.match.tournament_team_two.country.flag}`}
    //                         alt=""
    //                         width="80px"
    //                       />
    //                     )}
    //                   </span>
    //                 )}
    //               </td>
    //               <td>
    //                 <Link
    //                   to={`/admin/point-tables/${pointTable.id}`}
    //                   className="btn btn-success btn-sm"
    //                 >
    //                   Edit
    //                 </Link>
    //               </td>
    //               <td>
    //                 <button
    //                   className="btn btn-danger btn-sm"
    //                   onClick={() => {
    //                     window.confirm("Are You Delete This Item?") &&
    //                       deletePointTable(pointTable.id);
    //                   }}
    //                 >
    //                   Delete
    //                 </button>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    //   {/* </div> */}
    // </>

    <>
      {/* <div className="container mt-2"> */}
      <div className="card">
        <div className="card-body">
          <div>
            <div className="float-start">
              <h4 className="card-title">Point Table List</h4>
            </div>
            <div className="float-end">
              <Link to={`/admin/point-tables/create`} className="btn btn-info">
                + Create New
              </Link>
            </div>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>SL</th>
                <th>Tournament</th>
                <th>Team One</th>
                <th>Team Two</th>
                <th>Player</th>
                <th>Team</th>
                <th>Run</th>
                <th>Wicket</th>
                <th>Man of the match</th>
                <th>Fifty</th>
                <th>Hundred</th>
                <th>Five Wickets</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {pointTableList.map((pointTable, index) => (
                <tr key={pointTable.id}>
                  <td>{index + 1}</td>
                  <td>
                    {pointTable.match.tournament == null
                      ? ""
                      : pointTable.match.tournament["name"]}
                  </td>
                  <td>
                    {pointTable.match.tournament_team_one != null && (
                      <span>
                        {pointTable.match.tournament_team_one.country ==
                        null ? (
                          <img
                            src={`${API_PUBLIC_URL}${pointTable.match.tournament_team_one.franchise.logo}`}
                            alt=""
                            width="80px"
                          />
                        ) : (
                          <img
                            src={`${API_PUBLIC_URL}${pointTable.match.tournament_team_one.country.flag}`}
                            alt=""
                            width="80px"
                          />
                        )}
                      </span>
                    )}
                  </td>
                  <td>
                    {pointTable.match.tournament_team_two != null && (
                      <span>
                        {pointTable.match.tournament_team_two.country ==
                        null ? (
                          <img
                            src={`${API_PUBLIC_URL}${pointTable.match.tournament_team_two.franchise.logo}`}
                            alt=""
                            width="80px"
                          />
                        ) : (
                          <img
                            src={`${API_PUBLIC_URL}${pointTable.match.tournament_team_two.country.flag}`}
                            alt=""
                            width="80px"
                          />
                        )}
                      </span>
                    )}
                  </td>

                  <td>{pointTable.player.name}</td>
                  <td>
                    {pointTable.tournament_team?.country?.name}{" "}
                    {pointTable.tournament_team?.franchise?.name}
                  </td>
                  <td>{pointTable.run}</td>
                  <td>{pointTable.wicket}</td>
                  <td>
                    {pointTable.man_of_the_match === false
                      ? "False"
                      : pointTable.man_of_the_match === true
                      ? "True"
                      : pointTable.man_of_the_match}
                  </td>
                  {/* <td>{pointTable.man_of_the_match}</td> */}
                  <td>
                    {pointTable.fifty === false
                      ? "False"
                      : pointTable.fifty === true
                      ? "True"
                      : pointTable.fifty}
                  </td>
                  <td>
                    {pointTable.hundred === false
                      ? "False"
                      : pointTable.hundred === true
                      ? "True"
                      : pointTable.hundred}
                  </td>
                  <td>
                    {pointTable.five_wickets === false
                      ? "False"
                      : pointTable.five_wickets === true
                      ? "True"
                      : pointTable.five_wickets}
                  </td>
                  <td>
                    <Link
                      to={`/admin/point-tables/${pointTable.id}`}
                      className="btn btn-success btn-sm"
                    >
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        window.confirm("Are You Delete This Item?") &&
                          deletePointTable(pointTable.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
