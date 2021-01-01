import React, { useEffect, useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import AnswerCard from "./AnswerCard";

import "./answerPopup.scss";
const AnswerPopup = (props) => {
  const [formDisplay, setFormDisplay] = useState("none");
  const [answers, setAnswers] = useState([]);
  const question = props.question;
  const answerUrl =
    "http://localhost:5000/api/lessons/" +
    question.lessonId +
    "/questions/" +
    question.id +
    "/answers/";

  useEffect(() => {
    allAnswersByQuestionId(answerUrl);
    return () => {};
  }, [answerUrl]);
  const allAnswersByQuestionId = (url) => {
    let arr = [];
    Axios.get(url)
      .then((res) => res.data.data)
      .then((data) => data.map((d) => arr.push(d)))
      .then(() => setAnswers(arr));
  };
  const addAnswerSubmitHandler = (e) => {
    e.preventDefault();

    const formItem = {
      content: e.target[1].value,
    };
    Axios.post(answerUrl, formItem, {
      headers: {
        Authorization: question.token,
      },
    })
      .then(() => successPop())
      .then(() => {
        formDisplayHandler();
        allAnswersByQuestionId(answerUrl);
      })
      .catch(() => errorPop());
  };
  const formDisplayHandler = () => {
    formDisplay === "none" ? setFormDisplay("flex") : setFormDisplay("none");
  };
  const successPop = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Cevabınız başarıyla eklendi.",
      showConfirmButton: true,
      timer: 1000,
    });
  };
  const errorPop = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Bir şeyler yanlış gitmiş olmalı cevabınız gönderilemedi.",
    });
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
          {answers.map((answer, id) => (
            <AnswerCard key={id} answer={answer} answerUrl={answerUrl} />
          ))}
        </div>
      </div>
      <div className="right-side"></div>
    </div>
  );
};

export default AnswerPopup;
