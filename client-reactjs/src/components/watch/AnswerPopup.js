import React, { useEffect, useState } from "react";
import AnswerCard from "./AnswerCard";

import "./answerPopup.scss";
import {
  getAllAsArrayAxios,
  postAxiosWithAlertPop,
} from "../../helpers/axiosHelpers";
import { BASE_URL } from "../../constant";
const AnswerPopup = (props) => {
  const [formDisplay, setFormDisplay] = useState("none");
  const [answers, setAnswers] = useState([]);
  const question = props.question;
  const answerUrl =
    BASE_URL +
    "api/lessons/" +
    question.lessonId +
    "/questions/" +
    question.id +
    "/answers/";

  useEffect(() => {
    allAnswersByQuestionId(answerUrl);
    return () => {};
  }, [answerUrl]);
  const allAnswersByQuestionId = async (url) => {
    const data = await getAllAsArrayAxios(url);
    setAnswers(data);
  };
  const addAnswerSubmitHandler = (e) => {
    e.preventDefault();
    const formItem = {
      content: e.target[1].value,
    };
    postAxiosWithAlertPop(
      answerUrl,
      formItem,
      "Cevabınız başarıyla eklendi.",
      "Bir şeyler yanlış gitmiş olmalı cevabınız gönderilemedi."
    ).then(() => {
      formDisplayHandler();
      allAnswersByQuestionId(answerUrl);
    });
  };
  const formDisplayHandler = () => {
    formDisplay === "none" ? setFormDisplay("flex") : setFormDisplay("none");
  };

  return (
    <div className="answer-popup">
      <aside className="left-side">
        <div className="user">
          <img alt="user" src={question.userImage} />
          <h4 className="user-name">{question.userName}</h4>
          <span>{question.createdAt}</span>
        </div>
        <span className="add-answer" onClick={formDisplayHandler}>
          Cevap Ekle
        </span>
      </aside>
      <div className="middle">
        <div className="question">
          <div className="question-content">
            <h3>{question.title}</h3>
            <textarea defaultValue={question.content} readOnly={true} />
          </div>
        </div>
        <form
          className="add-answer-form"
          onSubmit={addAnswerSubmitHandler}
          style={{ display: formDisplay }}
        >
          <fieldset>
            <legend>Cevap Gönder</legend>
            <textarea />
            <button type="submit">Gönder</button>
          </fieldset>
        </form>
        <div className="answers">
          {answers.map((answer) => (
            <AnswerCard
              key={answer._ıd}
              answer={answer}
              answerUrl={answerUrl}
            />
          ))}
        </div>
      </div>
      <div className="right-side"></div>
    </div>
  );
};

export default AnswerPopup;
