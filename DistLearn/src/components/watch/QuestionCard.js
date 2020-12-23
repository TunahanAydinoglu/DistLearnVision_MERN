import React from "react";
import "./questionCard.scss";
import tuna from "./tuna.jpg";
import * as Icons from "../icons/index";

function QuestionCard() {
  return (
    <div className="question-card">
      <div className="card-wrapper">
        <div className="image">
          <img alt="" src={tuna} />
        </div>
        <div className="content-wrapper">
          <h2>Soru basligi burasidir</h2>
          <span className="content">
            Soru icerik alani burasidir Soru icerik alani burasidir Soru icerik
            alani burasidir Soru icerik alani burasidir Soru icerik alani
            burasidir
          </span>
          <div className="content-bottom">
            <div>
            <span>Kullanici adi</span>
            <span>Sure</span>
            </div>
            <a href="/">devamini oku</a>
          </div>
        </div>
        <div className="icons">
          <div className="comments">
            <Icons.Reply /> <span>(12)</span>
          </div>
          <div>
            <div>
              <Icons.LikeFa /> <span>(12)</span>
            </div>
            <div>
              <Icons.DislikeFa /> <span>(12)</span>
            </div>
            <div>
              <Icons.ArrowBottom />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
