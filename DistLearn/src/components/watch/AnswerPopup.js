import React from "react";
import AnswerCard from "./AnswerCard";

import "./answerPopup.scss";
const AnswerPopup = (props) => {
  const question = props.question;
  return (
    <div className="answer-popup">
      <aside className="left-side">
        <div className="user">
          <img alt="user" src={question.userImage} />
          <h4 className="user-name">{question.userName}</h4>
          <span>{question.createdAt}</span>
        </div>
      </aside>
      <div className="middle">
        <div className="question">
          <div className="question-content">
            <h3>{question.title}</h3>
            <textarea
              defaultValue={question.content}
              readOnly={true}
            ></textarea>
          </div>
        </div>
       <div className="answers">
          <AnswerCard answer={question}/>
          <AnswerCard answer={question}/>
       </div>
      </div>
      <div className="right-side"></div>
    </div>
  );
};

export default AnswerPopup;
