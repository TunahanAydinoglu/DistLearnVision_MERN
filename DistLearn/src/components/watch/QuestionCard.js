import React, { useEffect, useState } from "react";
import * as Icons from "../icons/index";
import Axios from "axios";
import { getCookie } from "../../helpers/auth";
import { toast } from "react-toastify";
import "./questionCard.scss";
import Popup from "../toolbox/Popup";
import AnswerPopup from "./AnswerPopup";

const QuestionCard = (props) => {
  const userId = props.user;
  const lessonId = props.lessonId;
  const questionId = props.questionId;
  const [user, setUser] = useState({});
  const [like, setLike] = useState(props.likeCount);
  const [dislike, setDislike] = useState(props.dislikeCount);
  const [isOpenAnswerModal, setIsOpenAnswerModal] = useState(false);
  const [userImage, setUserImage] = useState("");
  let token = getCookie("token");
  let question = {
    id: props.questionId,
    title: props.title,
    content: props.content,
    createdAt: props.createdAt,
    answerCount: props.answerCount,
    userImage: userImage,
    userName: user.name,
    token: token,
    lessonId: lessonId,
  };
  useEffect(() => {
    getUser(userId);
    return () => {};
  }, [userId]);

  const togglePopupAnswer = (e) => {
    e.preventDefault();
    setIsOpenAnswerModal(!isOpenAnswerModal);
  };

  const getUser = (userId) => {
    const url = "http://localhost:5000/api/users/profile/" + userId;
    Axios.get(url)
      .then((res) => res.data.data)
      .then((data) => {
        setUser(data);
        let pat = "http://localhost:5000/uploads/" + data.profile_image;
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
        setLike(like + 1);
      })
      .catch(() => undoLikeHandler());
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
        setDislike(dislike + 1);
      })
      .catch(() => undoDislikeHandler());
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
            <span>({question.answerCount})</span>
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
