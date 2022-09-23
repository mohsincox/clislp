import React from "react";

export default function LatestNews() {
  return (
    <>
      <div className="container" style={{ marginTop: "20px" }}>
        <h5>Latest News</h5>
        <div className="row">
          <div className="col-sm-8">
            <div className="card" style={{ background: "#F6F6F8" }}>
              <div
                className="card-body"
                style={{ paddingTop: "0px", paddingBottom: "0px" }}
              >
                <div className="row">
                  <div className="col-sm-8">
                    <p style={{ color: "#5709FF" }}>ASIA Cup</p>
                    <h6>TWO SUPER GIANT WILL PLAY AGAINST</h6>
                    <span style={{ fontSize: "12px" }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
                      dignissim, metus nec fringilla accumsan, risus sem
                      sollicitudin lacus, ut interdum tellus elit sed risus.
                      Maecenas eget condimentum .{" "}
                    </span>
                    <p>Read More</p>
                  </div>
                  <div className="col-sm-4">
                    <img
                      src={require("../images/news1.png")}
                      alt="news1"
                      height="165px"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="card"
              style={{ background: "#F6F6F8", marginTop: "15px" }}
            >
              <div
                className="card-body"
                style={{ paddingTop: "0px", paddingBottom: "0px" }}
              >
                <div className="row">
                  <div className="col-sm-8">
                    <p style={{ color: "#5709FF" }}>ASIA CUP</p>
                    <h6>Is Bangladesh will smile this time?</h6>
                    <span style={{ fontSize: "12px" }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
                      dignissim, metus nec fringilla accumsan, risus sem
                      sollicitudin lacus, ut interdum tellus elit sed risus.
                      Maecenas eget condimentum .{" "}
                    </span>
                    <p>Read More</p>
                  </div>
                  <div className="col-sm-4">
                    <img
                      src={require("../images/news2.png")}
                      alt="news1"
                      height="165px"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="card"
              style={{ background: "#F6F6F8", marginTop: "15px" }}
            >
              <div
                className="card-body"
                style={{ paddingTop: "0px", paddingBottom: "0px" }}
              >
                <div className="row">
                  <div className="col-sm-8">
                    <p style={{ color: "#5709FF" }}>ASIA CUP</p>
                    <h6>Agfanistan : The Dark horse of this season</h6>
                    <span style={{ fontSize: "12px" }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Etiam eu turpis molestie, dictum est a, mattis tellus. Sed
                      dignissim, metus nec fringilla accumsan, risus sem
                      sollicitudin lacus, ut interdum tellus elit sed risus.
                      Maecenas eget condimentum .{" "}
                    </span>
                    <p>Read More</p>
                  </div>
                  <div className="col-sm-4">
                    <img
                      src={require("../images/news3.png")}
                      alt="news1"
                      height="165px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <img
              src={require("../images/add_spon_news.png")}
              alt=""
              width="315px"
            />
            <img
              style={{ marginTop: "10px" }}
              src={require("../images/add_spon_news.png")}
              alt=""
              width="315px"
            />
          </div>
        </div>
      </div>
    </>
  );
}
