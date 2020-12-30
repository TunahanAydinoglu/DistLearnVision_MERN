import Iframe from "react-iframe";
import { useEffect, useState } from "react";
import * as Icons from "../icons/index";
import Swal from "sweetalert2";
import Axios from "axios";
import { ToastContainer } from "react-toastify";
import StarRatingComponent from "react-star-rating-component";

import "./watch.scss";
import QuestionCard from "./QuestionCard";
import { getCookie } from "../../helpers/auth";
import CommentCard from "./CommentCard";

function Watch() {
  const [episodes, setEpisodes] = useState([]);
  const [lessonData, setLessonData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [comments, setComments] = useState([]);
  const [video, setVideo] = useState("");
  const [display, setDisplay] = useState("none");
  const [questionDisplay, setQuestionDisplay] = useState("flex");
  const [commentDisplay, setCommentDisplay] = useState("none");
  const [rateStar, setRateStar] = useState(null);
  const id = window.location.search.split("=")[1];

  const token = getCookie("token");

  useEffect(() => {
    pageLoad();
  }, []);

  const pageLoad = () => {
    getLessonById(id);
    getEpisodesByLesson(id);
    getQuestionsAndCommentsByLesson(id);
  };
  const getQuestionsAndCommentsByLesson = (lessonId) => {
    let arrQuestions = [];
    let arrComments = [];
    let defaultUrl = "http://localhost:5000/api/lessons/" + lessonId;
    let urlQuestions = defaultUrl + "/questions/";
    let urlComments = defaultUrl + "/comments/";

    Axios.get(urlQuestions)
      .then((res) => res.data.data)
      .then((data) => data.map((q) => arrQuestions.push(q)))
      .then(() => setQuestions(arrQuestions));

    Axios.get(urlComments)
      .then((res) => res.data.data)
      .then((data) => data.map((q) => arrComments.push(q)))
      .then(() => setComments(arrComments));
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
    const item = {
      title: e.target[0].value,
      content: e.target[1].value,
    };
    Axios.post(url, item, {
      headers: {
        Authorization: token,
      },
    })
      .then(() => successPop("Sorunuz başarıyla eklendi."))
      .then(() => pageLoad())
      .then(() => {
        setDisplay("none");
      })
      .catch(() =>
        errorPop("Bir şeyler yanlış gitmiş olmalı sorunuz eklenemedi.")
      );
  };
  const commentAddHandler = (e) => {
    e.preventDefault();
    let url = "http://localhost:5000/api/lessons/" + id + "/comments/add";
    const item = {
      content: e.target[0].value,
      mark: rateStar,
    };
    Axios.post(url, item, {
      headers: {
        Authorization: token,
      },
    })
      .then(() => successPop("Yorumunuz başarıyla eklendi."))
      .then(() => pageLoad())
      .then(() => {
        setDisplay("none");
      })
      .catch(() =>
        errorPop("Bir şeyler yanlış gitmiş olmalı yorumunuz eklenemedi.")
      );
  };
  const successPop = (message) => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: message,
      showConfirmButton: true,
      timer: 1000,
    });
  };
  const errorPop = (message) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
    });
  };
  const displayHandler = () => {
    if (display === "none") {
      setDisplay("flex");
    } else {
      setDisplay("none");
    }
  };
  const questionCommendDisplayHandler = (selectedPanel) => {
    selectedPanel === "question"
      ? setQuestionDisplay("flex")
      : setQuestionDisplay("none");
    selectedPanel === "comment"
      ? setCommentDisplay("flex")
      : setCommentDisplay("none");
  };
  const onStarClick = (nextValue, prevValue, name) => {
    setRateStar(nextValue);
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
              <li
                className={questionDisplay === "flex" ? "active" : null}
                onClick={() => questionCommendDisplayHandler("question")}
              >
                Sorular & Cevaplar
              </li>
              <li
                className={commentDisplay === "flex" ? "active" : null}
                onClick={() => questionCommendDisplayHandler("comment")}
              >
                Yorumlar
              </li>
            </ul>
          </div>
          <div
            className="question-content-wrapper"
            style={{ display: questionDisplay }}
          >
            {/* <div className="question-search">
              <input placeholder="Sorularda ara..." />
              <span>
                <Icons.SearchFa />
              </span>
            </div> */}
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
                {questions.map((q, i) => (
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
          <div
            className="comment-content-wrapper"
            style={{ display: commentDisplay }}
          >
            <div className="comments">
              <div className="comments-header">
                <span>Bu derste {comments.length} yorum mevcuttur</span>
                <div className="question-add" onClick={displayHandler}>
                  Yeni bir yorum ekle
                </div>
              </div>
              <div className="cards-wrapper">
                <form
                  className="comment-form"
                  style={{ display }}
                  onSubmit={commentAddHandler}
                >
                  <div className="comment-form-item">
                    <label htmlFor="content">Yorum İçeriği :</label>
                    <textarea
                      id="content"
                      name="content"
                      placeholder="Yorumunuzu giriniz.."
                      required={true}
                    ></textarea>
                  </div>
                  <div className="comment-form-item form-star">
                    <label className="star-label" htmlFor="rate">Derse Puanınız : </label>
                    <StarRatingComponent
                      name="rate"
                      required={true}
                      starCount={5}
                      value={rateStar}
                      onStarClick={onStarClick}
                    />
                  </div>
                  <button type="submit" className="form-button">
                    Gönder
                  </button>
                </form>
                {comments.map((q, i) => (
                  <CommentCard
                    key={i}
                    questionId={q._id}
                    content={q.content}
                    user={q.user}
                    mark={q.mark}
                    likeCount={q.likeCount}
                    dislikeCount={q.dislikeCount}
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
      <ToastContainer />
    </div>
  );
}

export default Watch;
