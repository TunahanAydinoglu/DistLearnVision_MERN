import Iframe from "react-iframe";
import { useEffect, useState } from "react";
import * as Icons from "../icons/index";
import Swal from "sweetalert2";
import Axios from "axios";

import "./watch.scss";
import QuestionCard from "./QuestionCard";
import { getCookie } from "../../helpers/auth";

function Watch() {
  const [episodes, setEpisodes] = useState([]);
  const [lessonData, setLessonData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [video, setVideo] = useState("");
  const [display, setDisplay] = useState("none");
  const id = window.location.search.split("=")[1];

  const token = getCookie("token");

  useEffect(() => {
    pageLoad();
    return () => {};
  }, []);
  
  const pageLoad = () => {
    getLessonById(id);
    getEpisodesByLesson(id);
    getQuestionsByLesson(id);
  };
  const getQuestionsByLesson = (lessonId) => {
    let arr = [];
    let urlQuestions =
      "http://localhost:5000/api/lessons/" + lessonId + "/questions/";
    Axios.get(urlQuestions)
      .then((res) => res.data.data)
      .then((data) => data.map((q) => arr.push(q)))
      .then(() => setQuestions(arr));
  };
  const getLessonById = (lessonId) => {
    let urlLesson = "http://localhost:5000/api/lessons/" + lessonId;
    Axios.get(urlLesson)
      .then((res) => res.data.data)
      .then((data) => {
        setVideo(data.url);
        setLessonData(data);
      });
  };
  const getEpisodesByLesson = (lessonId) => {
    let arr = [];
    let url = "http://localhost:5000/api/lessons/" + lessonId + "/episodes";
    Axios.get(url)
      .then((res) => res.data.data)
      .then((data) => data.map((c) => arr.push(c)))
      .then(() => setEpisodes(arr));
  };
  const questionAddHandler = (e) => {
    e.preventDefault();
    let url = "http://localhost:5000/api/lessons/" + id + "/questions/ask";
    console.log(id);
    const item = {
      title: e.target[0].value,
      content: e.target[1].value,
    };
    console.log(item);
    Axios.post(url, item, {
      headers: {
        Authorization: token,
      },
    })
      .then(() => successPop())
      .then(() => pageLoad())
      .catch(() => errorPop());
  };
  const successPop = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Sorunuz başarıyla eklendi.",
      showConfirmButton: true,
      timer: 1000,
    });
  };
  const errorPop = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Bir şeyler yanlış gitmiş olmalı sorunuz eklenemedi.",
    });
  };
  const displayHandler = () => {
    if (display === "none") {
      setDisplay("flex");
    } else {
      setDisplay("none");
    }
  };
  return (
    <div className="watch">
      <div className="left">
        <div className="video">
          <Iframe
            url={video}
            width="100%"
            height="100%"
            id="myId"
            className="myClassname"
            display="initial"
            allow="fullscreen"
            position="relative"
          />
        </div>
        <div className="questions-wrapper">
          <div className="wrapper-header">
            <ul>
              <li>Sorular & Cevaplar</li>
              <li>Yorumlar</li>
            </ul>
          </div>
          <div className="question-content-wrapper">
            <div className="question-search">
              <input placeholder="Sorularda ara..." />
              <span>
                <Icons.SearchFa />{" "}
              </span>
            </div>
            <div className="questions">
              <div className="questions-header">
                <span>Bu derste {questions.length} soru mevcuttur</span>
                <div className="question-add" onClick={displayHandler}>
                  Yeni bir soru ekle
                </div>
              </div>
              <div className="cards-wrapper">
                <form
                  className="question-form"
                  style={{ display }}
                  onSubmit={questionAddHandler}
                >
                  <div className="question-form-item">
                    <label htmlFor="title">Soru Başlığı :</label>
                    <input
                      id="title"
                      name="title"
                      placeholder="Bir başlık giriniz.."
                      required={true}
                    />
                  </div>
                  <div className="question-form-item">
                    <label htmlFor="content">Soru İçeriği :</label>
                    <textarea
                      id="content"
                      name="content"
                      placeholder="Soru içeriği giriniz.."
                      required={true}
                    ></textarea>
                  </div>
                  <button type="submit" className="form-button">
                    Gönder
                  </button>
                </form>
                {questions.map((q,i) => (
                  <QuestionCard
                    key={i}
                    questionId={q._id}
                    title={q.title}
                    content={q.content}
                    user={q.user}
                    likeCount={q.likeCount}
                    dislikeCount={q.dislikeCount}
                    answerCount={q.answerCount}
                    lessonId={id}
                    createdAt={q.createdAt.split("T")[0]}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <aside className="right">
        <div className="flex-wrapper">
          <h2>Ders İçerikleri</h2>
          <div className="episodes">
            <ul>
              <li
                key="0"
                onClick={() => setVideo(lessonData.url)}
                className={video === lessonData.url ? "active" : null}
              >
                <h5>Giriş Videosu</h5>
                <span>{lessonData.title}</span>
              </li>
              {episodes.map((episode, i) => (
                <li
                  key={episode._id}
                  onClick={() => setVideo(episode.url)}
                  className={video === episode.url ? "active" : null}
                >
                  <h5>{i + 1}. Bölüm</h5>
                  <span>{episode.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
     
    </div>
  );
}

export default Watch;
