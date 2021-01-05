import React, { useEffect, useState } from "react";
import * as Icons from "../icons/index";
import "./questionCard.scss";
import Popup from "../toolbox/Popup";
import AnswerPopup from "./AnswerPopup";
import {
  getDislikeOrUndoDislikeWithToast,
  getLikeOrUndoLikeWithToast,
  getSingleAxios,
} from "../../helpers/axiosHelpers";

const QuestionCard = (props) => {
  const userId = props.user;
  const lessonId = props.lessonId;
  const questionId = props.questionId;
  const [user, setUser] = useState({});
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [answerCount, setAnswerCount] = useState(0);
  const [isOpenAnswerModal, setIsOpenAnswerModal] = useState(false);
  const [userImage, setUserImage] = useState("");
  const itemUrl =
    "http://localhost:5000/api/lessons/" +
    lessonId +
    "/questions/" +
    questionId;

  let question = {
    id: props.questionId,
    title: props.title,
    content: props.content,
    createdAt: props.createdAt,
    userImage: userImage,
    userName: user.name,
    lessonId: lessonId,
  };
  useEffect(() => {
    getUser(userId);
    getQuestionByIdForLikeHandler(itemUrl);
    return () => {};
  }, [userId,itemUrl]);

  const getQuestionByIdForLikeHandler = (itemUrl) => {
    getSingleAxios(itemUrl).then((data) => {
      setLike(data[0].likeCount);
      setDislike(data[0].dislikeCount);
      setAnswerCount(data[0].answerCount);
    });
  };
  const togglePopupAnswer = (e) => {
    e.preventDefault();
    if (isOpenAnswerModal) {
      getQuestionByIdForLikeHandler(itemUrl);
      setIsOpenAnswerModal(!isOpenAnswerModal);
    } else {
      setIsOpenAnswerModal(!isOpenAnswerModal);
    }
  };

  const getUser = (userId) => {
    const url = "http://localhost:5000/api/users/profile/" + userId;
    getSingleAxios(url).then((data) => {
      setUser(data);
      setUserImage("http://localhost:5000/uploads/" + data.profile_image);
    });
  };
  const likeHandler = async () => {
    let rate = await getLikeOrUndoLikeWithToast(
      itemUrl,
      "Beğeniniz eklendi :) ",
      "Beğeniniz geri alındı :("
    );
    setLike(like + rate);
  };

  const dislikeHandler = async () => {
    let rate = await getDislikeOrUndoDislikeWithToast(
      itemUrl,
      "Dislike eklendi :(",
      "Dislike geri alındı :) "
    );
    setDislike(dislike + rate);
  };
  return (
    <div className="question-card">
      <div className="card-wrapper">
        <div className="image">
          <img alt="" src={userImage} />
        </div>
        <div className="content-wrapper">
          <h2>{question.title}</h2>
          <p className="content">{question.content}</p>
          <div className="content-bottom">
            <div>
              <span>{user.name}</span>
            </div>
            <div>
              <span>{question.createdAt}</span>
              <span className="read-more" onClick={togglePopupAnswer}>
                Devamını oku
              </span>
            </div>
          </div>
        </div>
        <div className="icons">
          <div className="comments">
            <div onClick={togglePopupAnswer}>
              <Icons.Reply />
            </div>
            <span>({answerCount})</span>
          </div>
          <div>
            <div>
              <div onClick={likeHandler}>
                <Icons.LikeFa />
              </div>
              <span>({like})</span>
            </div>
            <div>
              <div onClick={dislikeHandler}>
                <Icons.DislikeFa />
              </div>
              <span>({dislike})</span>
            </div>
            {/* <div className="dropdown">
              <span>
                <Icons.ArrowBottom />
              </span>
              <div className="dropdown-content">
                <ul>
                  <li onClick={undoLikeHandler}>Like geri al</li>
                  <li onClick={undoDislikeHandler}>Dislike geri al</li>
                </ul>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {isOpenAnswerModal && (
        <Popup
          content={<AnswerPopup question={question} />}
          handleClose={togglePopupAnswer}
        />
      )}
    </div>
  );
};

export default QuestionCard;
