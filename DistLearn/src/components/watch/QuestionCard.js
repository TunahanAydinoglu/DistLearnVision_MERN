import React, { useEffect, useState } from "react";
import * as Icons from "../icons/index";
import Axios from "axios";
import { getCookie } from "../../helpers/auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "./questionCard.scss";
import Popup from "../toolbox/Popup";
import AnswerPopup from "./AnswerPopup";

const QuestionCard = (props) => {
  const questionId = props.questionId;
  const title = props.title;
  const content = props.content;
  const userId = props.user;
  const lessonId = props.lessonId;
  const createdAt = props.createdAt;
  const answerCount = props.answerCount;
  const [user, setUser] = useState({});
  const [like, setLike] = useState(props.likeCount);
  const [dislike, setDislike] = useState(props.dislikeCount);
  const [isOpenAnswerModal, setIsOpenAnswerModal] = useState(false);
  const [userImage, setUserImage] = useState("");
  let token = getCookie("token");

  useEffect(() => {
    getUser(userId, user);
    return () => {};
  }, [userId, user]);

  const togglePopupAnswer = (e, id) => {
    e.preventDefault();
    setIsOpenAnswerModal(!isOpenAnswerModal);
  };
  const getUser = (userId, user) => {
    const url = "http://localhost:5000/api/users/profile/" + userId;
    Axios.get(url)
      .then((res) => res.data.data)
      .then((data) => setUser(data))
      .then(() => {
        let pat = "http://localhost:5000/uploads/" + user.profile_image;
        setUserImage(pat);
      });
  };
  const likeHandler = () => {
    let config = {
      headers: {
        Authorization: token,
      },
    };
    let url =
      "http://localhost:5000/api/lessons/" +
      lessonId +
      "/questions/" +
      questionId +
      "/like";
    Axios.get(url, config)
      .then(() => {
        toast.success("Beğeniniz eklendi :) ", {
          position: "bottom-right",
          autoClose: 4000,
        });
      })
      .then(() => setLike(like + 1));
  };
  const undoLikeHandler = () => {
    let config = {
      headers: {
        Authorization: token,
      },
    };
    let url =
      "http://localhost:5000/api/lessons/" +
      lessonId +
      "/questions/" +
      questionId +
      "/undo_like";
    Axios.get(url, config).then(() => {
      toast.error("Beğeniniz geri alındı :(", {
        position: "bottom-right",
        autoClose: 4000,
      });
      setLike(like - 1);
    });
  };
  const dislikeHandler = () => {
    let url =
      "http://localhost:5000/api/lessons/" +
      lessonId +
      "/questions/" +
      questionId +
      "/dislike";
    Axios.get(url, {
      headers: {
        Authorization: token,
      },
    })
      .then(() => {
        toast.error("Dislike eklendi :(", {
          position: "bottom-right",
          autoClose: 4000,
        });
      })
      .then(() => setDislike(dislike + 1));
  };
  const undoDislikeHandler = () => {
    let url =
      "http://localhost:5000/api/lessons/" +
      lessonId +
      "/questions/" +
      questionId +
      "/undo_dislike";
    Axios.get(url, {
      headers: {
        Authorization: token,
      },
    }).then(() => {
      toast.warn("Dislike geri alındı :) ", {
        position: "bottom-right",
        autoClose: 4000,
      });
      setDislike(dislike - 1);
    });
  };
  return (
    <div className="question-card">
      <div className="card-wrapper">
        <div className="image">
          <img alt="" src={userImage} />
        </div>
        <div className="content-wrapper">
          <h2>{title}</h2>
          <p className="content">{content}</p>
          <div className="content-bottom">
            <div>
              <span>{user.name}</span>
            </div>
            <div>
              <span>{createdAt}</span>
              <span className="read-more" onClick={togglePopupAnswer}>devamini oku</span>
            </div>
          </div>
        </div>
        <div className="icons">
          <div className="comments">
            <div onClick={togglePopupAnswer}><Icons.Reply /></div> <span>({answerCount})</span>
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
            <div className="dropdown">
              <span>
                <Icons.ArrowBottom />
              </span>
              <div className="dropdown-content">
                <ul>
                  <li onClick={undoLikeHandler}>Like geri al</li>
                  <li onClick={undoDislikeHandler}>Dislike geri al</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      {isOpenAnswerModal && (
        <Popup content={<AnswerPopup />} handleClose={togglePopupAnswer} />
      )}
    </div>
  );
};

export default QuestionCard;
