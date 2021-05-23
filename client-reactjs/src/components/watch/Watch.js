import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import StarRatingComponent from "react-star-rating-component";
import YouTube from "react-youtube";
import QuestionCard from "./QuestionCard";
import CommentCard from "./CommentCard";
import {
  getAllAsArrayAxios,
  getSingleAxios,
  postAxiosWithAlertPop,
} from "../../helpers/axiosHelpers";
import FaceApi from "../faceapi/FaceApi";
import "./watch.scss";
import { BASE_URL } from "../../constant";

function Watch() {
  const [episodes, setEpisodes] = useState([]);
  const [lessonData, setLessonData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [comments, setComments] = useState([]);
  const [video, setVideo] = useState("");
  const [addQuestionDisplay, setAddQuestionDisplay] = useState("none");
  const [addCommentDisplay, setAddCommentDisplay] = useState("none");
  const [questionDisplay, setQuestionDisplay] = useState("flex");
  const [commentDisplay, setCommentDisplay] = useState("none");
  const [rateStar, setRateStar] = useState(null);
  const id = window.location.search.split("=")[1];

  const [player, setPlayer] = useState(null);
  const [lessonState, setLessonState] = useState(false);

  useEffect(() => {
    pageLoad();
  }, []);
  const pageLoad = () => {
    getLessonById(id);
    getEpisodesByLesson(id);
    getQuestionsAndCommentsByLesson(id);
  };
  const getQuestionsAndCommentsByLesson = async (lessonId) => {
    let defaultUrl = BASE_URL + "api/lessons/" + lessonId;
    let urlQuestions = defaultUrl + "/questions/";
    let urlComments = defaultUrl + "/comments/";

    const questionsData = await getAllAsArrayAxios(urlQuestions);
    setQuestions(questionsData);

    const commentsData = await getAllAsArrayAxios(urlComments);
    setComments(commentsData);
  };
  const getLessonById = (lessonId) => {
    let urlLesson = BASE_URL + "api/lessons/" + lessonId;
    getSingleAxios(urlLesson).then((data) => {
      setVideo(data.url);
      setLessonData(data);
    });
  };
  const getEpisodesByLesson = async (lessonId) => {
    let urlEpisodes = BASE_URL + "api/lessons/" + lessonId + "/episodes";
    const episodesData = await getAllAsArrayAxios(urlEpisodes);
    setEpisodes(episodesData);
  };
  const questionAddHandler = (e) => {
    e.preventDefault();
    let askUrl = BASE_URL + "api/lessons/" + id + "/questions/ask";
    const item = {
      title: e.target[0].value,
      content: e.target[1].value,
    };
    postAxiosWithAlertPop(
      askUrl,
      item,
      "Sorunuz başarıyla eklendi.",
      "Bir şeyler yanlış gitmiş olmalı sorunuz eklenemedi."
    ).then(() => {
      setAddQuestionDisplay("none");
      e.target[0].value = "";
      e.target[1].value = "";
      pageLoad();
    });
  };
  const commentAddHandler = (e) => {
    e.preventDefault();
    let addCommentUrl = BASE_URL + "api/lessons/" + id + "/comments/add";
    const item = {
      content: e.target[0].value,
      mark: rateStar,
    };
    postAxiosWithAlertPop(
      addCommentUrl,
      item,
      "Yorumunuz başarıyla eklendi.",
      "Bir şeyler yanlış gitmiş olmalı yorumunuz eklenemedi."
    ).then(() => {
      pageLoad();
      setAddCommentDisplay("none");
      e.target[0].value = "";
    });
  };
  const addQuestionOrCommentDisplayHandler = (item) => {
    if (item === "question") {
      addQuestionDisplay === "none"
        ? setAddQuestionDisplay("flex")
        : setAddQuestionDisplay("none");
    } else {
      addCommentDisplay === "none"
        ? setAddCommentDisplay("flex")
        : setAddCommentDisplay("none");
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
  const onReady = (event) => {
    setPlayer(event.target);
  };
  const onPlayVideo = () => {
    player.playVideo();
  };
  const onPauseVideo = () => {
    player.pauseVideo();
  };
  const lessonHandler = () => {
    setLessonState(!lessonState);
  };
  const videoOpts = {
    width: "100%",
    allow: "fullscreen",
    position: "relative",
    display: "initial",
    id: "myId",
  };

  return (
    <div className="watch">
      <div className="left">
        <YouTube
          className="video"
          videoId={video}
          opts={videoOpts}
          onReady={(e) => onReady(e)}
        />
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
              <li onClick={() => lessonHandler()}>
                Yüz Takibi {lessonState ? "Durdur" : "Baslat"}
              </li>
              {lessonState ? (
                <FaceApi
                  onPlayVideo={onPlayVideo}
                  onPauseVideo={onPauseVideo}
                />
              ) : (
                <div></div>
              )}
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
                <div
                  className="question-add"
                  onClick={() => addQuestionOrCommentDisplayHandler("question")}
                >
                  Yeni bir soru ekle
                </div>
              </div>
              <div className="cards-wrapper">
                <form
                  className="question-form"
                  style={{ display: addQuestionDisplay }}
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
                {questions.map((q) => (
                  <QuestionCard
                    key={q._id}
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
                <div
                  className="question-add"
                  onClick={() => addQuestionOrCommentDisplayHandler("comment")}
                >
                  Yeni bir yorum ekle
                </div>
              </div>
              <div className="cards-wrapper">
                <form
                  className="comment-form"
                  style={{ display: addCommentDisplay }}
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
                    <label className="star-label" htmlFor="rate">
                      Derse Puanınız :{" "}
                    </label>
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
                {comments.map((comment) => (
                  <CommentCard
                    key={comment._id}
                    commentId={comment._id}
                    content={comment.content}
                    user={comment.user}
                    mark={comment.mark}
                    likeCount={comment.likeCount}
                    dislikeCount={comment.dislikeCount}
                    lessonId={id}
                    createdAt={comment.createdAt.split("T")[0]}
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
