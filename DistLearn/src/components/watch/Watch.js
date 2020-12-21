import React from "react";
import Iframe from "react-iframe";

import "./watch.scss";

function Watch() {
  return (
    <div className="watch">
      <div className="left">
        <div className="video">
          <Iframe
            url="https://www.youtube.com/embed/0578heSEY38"
            width="100%"
            height="100%"
            id="myId"
            className="myClassname"
            display="initial"
            allow="fullscreen"
            position="relative"
          />
        </div>
        <div className="questions"></div>
      </div>
      <div className="right">
        <div className="flex-wrapper">
          <h2>Ders İçerikleri</h2>
          <div className="episodes">
            <ul>
              <li>
                <h5>1. Bolum </h5>
                <span>Sql Injection dersleri cs s shkjdf s</span>
              </li>{" "}
              <li>
                <h5>1. Bolum </h5>
                <span>Sql Injection dersleri cs s shkjdf s</span>
              </li>{" "}
              <li>
                <h5>1. Bolum </h5>
                <span>Sql Injection dersleri cs s shkjdf s</span>
              </li>{" "}
              <li>
                <h5>1. Bolum </h5>
                <span>Sql Injection dersleri cs s shkjdf s</span>
              </li>{" "}
              <li>
                <h5>1. Bolum </h5>
                <span>Sql Injection dersleri cs s shkjdf s</span>
              </li>{" "}
              <li>
                <h5>1. Bolum </h5>
                <span>Sql Injection dersleri cs s shkjdf s</span>
              </li>{" "}
              <li>
                <h5>1. Bolum </h5>
                <span>Sql Injection dersleri cs s shkjdf s</span>
              </li>{" "}
              <li>
                <h5>1. Bolum </h5>
                <span>Sql Injection dersleri cs s shkjdf s</span>
              </li>{" "}
              <li>
                <h5>1. Bolum </h5>
                <span>Sql Injection dersleri cs s shkjdf s</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Watch;
