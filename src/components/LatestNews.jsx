import axios from "axios";
import React, {useEffect, useState} from "react";
import {API_PUBLIC_URL} from "../constants";
import RegisterWidget from "./RegisterWidget";
import './LatestNews.css'

export default function LatestNews() {
    const [newsList, setNewsList] = useState([]);
    let contentMaxLength = 200;
    useEffect(() => {
        (async () => {
            await axios
                .get(`${API_PUBLIC_URL}api/ws-news`, {})
                .then((response) => {
                    setNewsList((prevState) => {
                        let newState = [...response.data];
                        let newNewsList = newState.map((newL) => {
                            if(newL.body.length >= contentMaxLength) {
                                return {...newL, showFullBody: false}
                            } else {
                                return {...newL, showFullBody: true}
                            }
                        });
                        return newNewsList;
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        })();
    }, []);

    function handleShowFullBody(e, id) {
        setNewsList((prevState) => {
            let newS = [...prevState];

            return newS.map(news => {
                if(news.id == id) {
                    return {...news, showFullBody: !news.showFullBody}
                }

                return news

            })
        })
    }

    return (
        <>
            <div className="container" style={{marginTop: "20px"}}>
                <h5>Latest News</h5>
                <div className="row">
                    <div className="col-sm-8">
                        {

                            newsList.map((nnn, index) => (

                            <div className="single-latest-new mb-3" key={nnn.id}>
                                <div className="l-new-left">
                                    <h6 className="m-0 text-danger mb-2">{nnn.tournament["name"]}</h6>
                                    <h5 className="m-0 text-black text-uppercase mb-2">{nnn.title}</h5>
                                    <p style={{lineHeight: "36px", fontSize: "16px"}}>
                                        {
                                            nnn.showFullBody ? nnn.body : (<>
                                                {nnn.body.substr(0, contentMaxLength)}
                                                <button className="px-0 btn btn-link btn-sm d-block text-decoration-none fw-bold text-black" onClick={(e) => { handleShowFullBody(e, nnn.id) }}>
                                                    Read More....
                                                </button>
                                            </>)
                                        }
                                    </p>
                                </div>

                                <div className="l-news-right">
                                    <img
                                        src={`${API_PUBLIC_URL}${nnn.image}`}
                                        alt="news"
                                        style={{width: "100%", height: "100%"}}
                                    />
                                </div>



                            </div>


                            // <div key={nnn.id} className="card" style={{background: "#F6F6F8", marginBottom: "15px"}}>
                            //     <div
                            //         className="card-header d-flex justify-content-between flex-row bg-primary align-items-center">
                            //         <h4 className="m-0 text-white">{nnn.title}</h4>
                            //         {
                            //             nnn.tournament != null ? <button
                            //                 className="btn bnt-sm btn-outline-dark">{nnn.tournament["name"]}</button> : null
                            //         }
                            //     </div>
                            //     <div className="card-body bg-white mt-2" style={{paddingTop: "0px", paddingBottom: "0px"}}>
                            //         <div className="float-start" style={{
                            //             overflow: "hidden",
                            //             width: "160px",
                            //             height: "160px",
                            //             marginRight: "16px",
                            //             marginTop: "16px",
                            //             marginBottom: "0px"
                            //         }}>
                            //             <img
                            //                 src={`${API_PUBLIC_URL}${nnn.image}`}
                            //                 alt="news"
                            //                 style={{width: "100%", height: "100%"}}
                            //             />
                            //         </div>
                            //
                            //
                            //     </div>
                            // </div>


                            ))}
                    </div>

                    <div className="col-sm-4">
                        <div className="mb-3">
                            <RegisterWidget name="Home Right Two" width={400}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
