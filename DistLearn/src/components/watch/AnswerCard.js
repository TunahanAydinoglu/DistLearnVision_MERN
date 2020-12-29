import React, { useEffect, useState } from "react";
import Axios from "axios";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "./answerCard.scss";
import { getCookie } from "../../helpers/auth";

const AnswerCard = (props) => {
  const answer = props.answer;
  const [userImage, setUserImage] = useState("");
  const [user, setUser] = useState(null);
  const [rankingCount, setRankingCount] = useState(answer.sumCount);
  const token = getCookie("token");
  const likeUrl = props.answerUrl + answer._id;

  useEffect(() => {
    getUser(answer.user);
    return () => {};
  }, [answer.user]);
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
  const likeButtonHandler = () => {
    let config = {
      headers: {
        Authorization: token,
      },
    };
    let url = likeUrl + "/like";
    Axios.get(url, config)
      .then(() => setRankingCount(rankingCount + 1))
      .catch(() => undoLikeHandler());
  };
  const undoLikeHandler = () => {
    let config = {
      headers: {
        Authorization: token,
      },
    };
    let url = likeUrl + "/undo_like";
    Axios.get(url, config).then(() => setRankingCount(rankingCount - 1));
  };
  const dislikeHandler = () => {
    let url = likeUrl + "/dislike";
    Axios.get(url, {
      headers: {
        Authorization: token,
      },
    })
      .then(() => setRankingCount(rankingCount - 1))
      .catch(() => undoDislikeHandler());
  };
  const undoDislikeHandler = () => {
    let url = likeUrl + "/undo_dislike";
    Axios.get(url, {
      headers: {
        Authorization: token,
      },
    }).then(() => setRankingCount(rankingCount + 1));
  };
  return (
    <div className="answer-card">
      <aside className="answer-card-left-side">
        <img alt="tuna" src={userImage} />
      </aside>
      <div className="answer">
        <p className="answer-content">{answer.content}</p>
        <div className="answer-footer">
          <span>{answer.userName}</span>
          <span>{answer.createdAt.split("T")[0]}</span>
        </div>
      </div>
      <div className="answer-ranking">
        <BiUpArrow className="up-button" onClick={likeButtonHandler} />
        {rankingCount}
        <BiDownArrow className="down-button" onClick={dislikeHandler}/>
      </div>
    </div>
  );
};

export default AnswerCard;
