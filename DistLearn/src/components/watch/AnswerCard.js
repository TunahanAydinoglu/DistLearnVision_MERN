import React from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";

import "./answerCard.scss";

const AnswerCard = (props) => {
  const answer = props.answer;
  return (
    <div className="answer-card">
      <aside className="left-side">
        <img alt="tuna" src={answer.userImage} />
      </aside>
      <div className="answer">
        <p className="answer-content">{answer.content}</p>
        <div className="answer-footer">
          <span>{answer.userName}</span>
          <span>{answer.createdAt}</span>
        </div>
      </div>
      <div className="answer-ranking">
        <BiUpArrow className="up-button" />
        21
        <BiDownArrow className="down-button" />
      </div>
    </div>
  );
};

export default AnswerCard;
